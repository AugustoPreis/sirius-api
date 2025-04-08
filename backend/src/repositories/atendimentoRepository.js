const database = require('../config/database/database');

class AtendimentoRepository {

  async listarPorFuncionario(params) {
    const query = `
      SELECT
        atendimentos.id,
        atendimentos.data_inicio "dataInicio",
        atendimentos.data_fim "dataFim",
        atendimentos.data_cadastro "dataCadastro",
        COUNT(atendimentos.id) OVER() "total"
      FROM atendimentos
      WHERE atendimentos.id_funcionario = $1
        AND date_trunc('day', atendimentos.data_inicio) = date_trunc('day', $2::timestamp)
      ORDER BY atendimentos.data_inicio ${params.ordem === 'ASC' ? 'ASC' : 'DESC'}
      LIMIT $4 OFFSET (($3 - 1) * $4)
    `;

    const result = await database.execute(query, [
      params.idFuncionario,
      params.dia,
      params.pagina,
      params.itensPagina,
    ]);

    return result;
  }

  async qtdAtendimentos(params) {
    const query = `
      SELECT
        count(atendimentos.id) "quantidade",
        json_build_object(
          'id', funcionarios.id,
          'nome', funcionarios.nome
        ) "funcionario"
      FROM atendimentos
        INNER JOIN funcionarios ON funcionarios.id = atendimentos.id_funcionario
      WHERE date_trunc('day', atendimentos.data_inicio) = date_trunc('day', $1::timestamp)
        AND (
          $2::bool IS TRUE
          OR funcionarios.ativo IS TRUE
        )
        AND (
          $3::int IS NULL
          OR funcionarios.id = $3::int
        )
      GROUP BY funcionarios.id
      ORDER BY funcionarios.nome
    `;

    const result = await database.execute(query, [params.dia, params.inativos, params.idFuncionario]);

    return result;
  }

  async ranking(params) {
    const query = `
      SELECT
        funcionarios.nome,
        (
          SELECT
            json_agg(
              json_build_object(
                'dia', to_char(current_timestamp - (INTERVAL '1 day' * serie), 'dd/MM'),
                'atendimentos', (
                  SELECT
                    count(atendimentos.id)
                  FROM atendimentos
                  WHERE atendimentos.id_funcionario = funcionarios.id
                    AND date_trunc('day', atendimentos.data_inicio) = date_trunc('day', current_timestamp - (INTERVAL '1 day' * serie))
                )
              )
            )
          FROM generate_series($2 - 1, 0, -1) AS serie
        ) "dias"
      FROM atendimentos
        INNER JOIN funcionarios ON funcionarios.id = atendimentos.id_funcionario
      WHERE	date_trunc('day', atendimentos.data_inicio)
              BETWEEN
            date_trunc('day', current_timestamp - (($2 - 1) * INTERVAL '1 day'))
              AND
            date_trunc('day', current_timestamp)
      GROUP BY funcionarios.id
      ORDER BY count(atendimentos.id) DESC
      LIMIT $1
    `;

    const result = await database.execute(query, [
      params.limite,
      params.dias,
    ]);

    return result;
  }

  async salvar(params) {
    const query = `
      INSERT INTO atendimentos (
        id_funcionario,
        data_inicio,
        data_fim,
        data_cadastro
      ) VALUES (
        $1, 
        $2, 
        $3, 
        $4 
      ) RETURNING id
    `;

    const result = await database.execute(query, [
      params.idFuncionario,
      params.dataInicio,
      params.dataFim,
      params.dataCadastro,
    ]);

    return result[0].id;
  }
}

const atendimentoRepository = new AtendimentoRepository();

module.exports = { atendimentoRepository, AtendimentoRepository };