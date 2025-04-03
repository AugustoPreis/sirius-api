const database = require('../config/database/database');

class UsuarioRepository {
  async buscarPorId(params) {
    const query = `
      SELECT
        usuarios.id,
        usuarios.nome,
        usuarios.login,
        usuarios.adm
      FROM usuarios
      WHERE usuarios.id = $1
        AND usuarios.ativo IS TRUE
    `;

    const result = await database.execute(query, [params.id]);

    return result[0];
  }

  async buscarPorLogin(params) {
    const query = `
      SELECT
        usuarios.id,
        usuarios.senha
      FROM usuarios
      WHERE usuarios.login ILIKE $1
        AND usuarios.ativo IS TRUE
    `;

    const result = await database.execute(query, [params.login]);

    return result[0];
  }

  async buscarDadosUsuarioLogado(params) {
    const query = `
      SELECT
        usuarios.id,
        usuarios.nome,
        usuarios.adm
      FROM usuarios
      WHERE usuarios.id = $1
    `;

    const result = await database.execute(query, [params.id]);

    return result[0];
  }

  async listar(params) {
    const query = `
      SELECT
        usuarios.id,
        usuarios.nome,
        usuarios.adm,
        usuarios.data_cadastro "dataCadastro",
        COUNT(usuarios.id) OVER() "total"
      FROM usuarios
      WHERE usuarios.nome ILIKE '%' || $1 || '%'
        AND usuarios.ativo IS TRUE
      ORDER BY usuarios.nome
      LIMIT $3 OFFSET(($2 - 1) * $3)
    `;

    const result = await database.execute(query, [
      params.nome,
      params.pagina,
      params.itensPagina,
    ]);

    return result;
  }

  async salvar(params) {
    const query = `
      INSERT INTO usuarios (
        nome,
        login,
        senha,
        adm,
        ativo,
        data_cadastro
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      ) RETURNING id
    `;

    const result = await database.execute(query, [
      params.nome,
      params.login,
      params.senha,
      params.adm,
      params.ativo,
      params.dataCadastro,
    ]);

    return result[0].id;
  }

  async atualizar(params) {
    const query = `
      UPDATE usuarios
      SET
        nome = $2,
        login = $3,
        adm = $4
        ${params.senha ? ', senha = $5' : ''}
      WHERE id = $1
    `;

    const binds = [
      params.id,
      params.nome,
      params.login,
      params.adm,
    ];

    if (params.senha) {
      binds.push(params.senha);
    }

    await database.execute(query, binds);
  }

  async inativar(params) {
    const query = `
      UPDATE usuarios
      SET ativo = FALSE
      WHERE id = $1
        AND ativo IS TRUE
    `;

    await database.execute(query, [params.id]);
  }
}

const usuarioRepository = new UsuarioRepository();

module.exports = { usuarioRepository, UsuarioRepository };