const database = require('../config/database/database');

class FuncionarioRepository {

  async listar(params) {
    const query = `
      SELECT
        funcionarios.id,
        funcionarios.nome,
        funcionarios.data_cadastro "dataCadastro",
        COUNT(funcionarios.id) OVER() "total"
      FROM funcionarios
      WHERE funcionarios.nome ILIKE '%' || $1 || '%'
        AND funcionarios.ativo IS TRUE
      ORDER BY funcionarios.nome
      LIMIT $3 OFFSET (($2 - 1) * $3)
    `;

    const result = await database.execute(query, [
      params.nome,
      params.pagina,
      params.itensPagina,
    ]);

    return result;
  }

  async buscarPorId(params) {
    const query = `
      SELECT
        funcionarios.id,
        funcionarios.nome,
        funcionarios.data_admissao "dataAdmissao",
        funcionarios.observacoes
      FROM funcionarios
      WHERE funcionarios.id = $1
        AND funcionarios.ativo IS TRUE
    `;

    const result = await database.execute(query, [params.id]);

    return result[0];
  }

  async salvar(params) {
    const query = `
      INSERT INTO funcionarios (
        nome,
        data_admissao,
        observacoes,
        ativo,
        data_cadastro
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
      ) RETURNING id
    `;

    const result = await database.execute(query, [
      params.nome,
      params.dataAdmissao,
      params.observacoes,
      params.ativo,
      params.dataCadastro,
    ]);

    return result[0].id;
  }

  async alterar(params) {
    const query = `
      UPDATE funcionarios
      SET nome = $2,
        data_admissao = $3,
        observacoes = $4
      WHERE id = $1
        AND ativo IS TRUE
    `;

    const result = await database.execute(query, [
      params.id,
      params.nome,
      params.dataAdmissao,
      params.observacoes,
    ]);

    return result;
  }

  async inativar(params) {
    const query = `
      UPDATE funcionarios
      SET ativo = FALSE
      WHERE id = $1
        AND ativo IS TRUE
    `;

    const result = await database.execute(query, [params.id]);

    return result;
  }
}

const funcionarioRepository = new FuncionarioRepository();

module.exports = { funcionarioRepository, FuncionarioRepository };