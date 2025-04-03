const database = require('../config/database/database');

class FotoFuncionarioRepository {

  async listar(params) {
    const query = `
      SELECT
        fotos_funcionario.id,
        fotos_funcionario.uuid,
        fotos_funcionario.data_cadastro "dataCadastro"
      FROM fotos_funcionario
      WHERE fotos_funcionario.id_funcionario = $1
      ORDER BY fotos_funcionario.id
    `;

    const result = await database.execute(query, [params.idFuncionario]);

    return result;
  }

  async buscarPorUUID(params) {
    const query = `
      SELECT
        fotos_funcionario.foto
      FROM fotos_funcionario
      WHERE fotos_funcionario.id_funcionario = $1
        AND fotos_funcionario.uuid = $2
    `;

    const result = await database.execute(query, [params.idFuncionario, params.uuid]);

    return result[0];
  }

  async salvar(params) {
    const query = `
      INSERT INTO fotos_funcionario (
        id_funcionario,
        uuid,
        foto,
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
      params.uuid,
      params.foto,
      params.dataCadastro,
    ]);

    return result[0].id;
  }

  async deletar(params) {
    const query = `
      DELETE FROM fotos_funcionario
      WHERE id_funcionario = $1
        AND id = $2
    `;

    await database.execute(query, [params.idFuncionario, params.id]);
  }
}

const fotoFuncionarioRepository = new FotoFuncionarioRepository();

module.exports = { fotoFuncionarioRepository, FotoFuncionarioRepository };