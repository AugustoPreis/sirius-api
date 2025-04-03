const database = require('../config/database/database');

class FuncionarioRepository {

  async listar(params) {
    const query = `
      SELECT
        funcionarios.id,
        funcionarios.nome,
        funcionarios.data_cadastro "dataCadastro"
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
        funcionarios.nome
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
        ativo,
        data_cadastro
      ) VALUES (
        $1,
        $2,
        $3
      ) RETURNING id
    `;

    const result = await database.execute(query, [
      params.nome,
      params.ativo,
      params.dataCadastro,
    ]);

    return result[0].id;
  }

  async alterar(params) {
    const query = `
      UPDATE funcionarios
      SET nome = $2
      WHERE id = $1
        AND ativo IS TRUE
    `;

    const result = await database.execute(query, [params.id, params.nome]);

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