const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { getEnvConfig } = require('../config/dotenv');
const { RequestError } = require('../utils/RequestError');
const { comparePassword, hashPassword } = require('../utils/crypto');
const { isValidString, isValidNumber } = require('../utils/validators');
const { usuarioRepository } = require('../repositories/usuarioRepository');

class UsuarioService {

  async login(dados) {
    const { login, senha } = dados;

    if (!isValidString(login) || !isValidString(senha)) {
      throw new RequestError('Parâmetros inválidos', StatusCodes.BAD_REQUEST);
    }

    const usuarioDB = await usuarioRepository.buscarPorLogin({ login });

    if (!usuarioDB || !comparePassword(senha, usuarioDB.senha)) {
      throw new RequestError('Login ou senha inválidos', StatusCodes.UNAUTHORIZED);
    }

    const usuarioLogado = await usuarioRepository.buscarDadosUsuarioLogado({ id: usuarioDB.id });

    const token = jwt.sign(
      usuarioLogado,
      getEnvConfig().jwt.secretKey,
      { expiresIn: '1d', },
    );

    return { ...usuarioLogado, token };
  }

  async listar(dados) {
    const { nome, pagina, itensPagina } = dados;
    const params = {
      nome: '',
      pagina: 1,
      itensPagina: 10,
    }

    if (isValidString(nome)) {
      params.nome = nome.trim();
    }

    if (isValidNumber(parseInt(pagina))) {
      params.pagina = parseInt(pagina);
    }

    if (isValidNumber(parseInt(itensPagina))) {
      params.itensPagina = parseInt(itensPagina);
    }

    const result = await usuarioRepository.listar(params);

    const total = result[0]?.total || 0;
    const data = result.map((usuario) => {
      delete usuario.total;

      return usuario;
    });

    return { data, total };
  }

  async buscarPorId(dados) {
    const id = parseInt(dados.id);

    if (!isValidNumber(id)) {
      throw new RequestError('O ID do usuário é obrigatório', StatusCodes.BAD_REQUEST);
    }

    const usuarioDB = await usuarioRepository.buscarPorId({ id });

    if (!usuarioDB) {
      throw new RequestError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    return usuarioDB;
  }

  async cadastrar(dados) {
    const { nome, login, senha, adm } = dados;

    if (!isValidString(nome, { minLength: 3, maxLength: 100 })) {
      throw new RequestError('O nome é obrigatório e deve conter entre 3 e 100 caracteres', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(login, { minLength: 3, maxLength: 100 })) {
      throw new RequestError('O login é obrigatório e deve conter entre 3 e 100 caracteres', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(senha, { minLength: 6, maxLength: 20 })) {
      throw new RequestError('A senha é obrigatória e deve conter entre 6 e 20 caracteres', StatusCodes.BAD_REQUEST);
    }

    const usuarioComLogin = await usuarioRepository.buscarPorLogin({ login });

    if (usuarioComLogin) {
      throw new RequestError('Já existe um usuário cadastrado com esse login', StatusCodes.BAD_REQUEST);
    }

    const usuario = {
      nome: nome.trim(),
      adm: !!adm,
      ativo: true,
      dataCadastro: new Date(),

      //não remover espaços em branco do login e da senha
      //pode ter sido adicionado propositalmente pelo usuário
      login,
      senha: hashPassword(senha),
    };

    usuario.id = await usuarioRepository.salvar(usuario);

    return {
      id: usuario.id,
      nome: usuario.nome,
      adm: usuario.adm,
    };
  }

  async alterar(dados, usuarioLogado) {
    const { id, nome, login, senha, adm } = dados;
    let atualizaSenha = false;

    if (!isValidNumber(parseInt(id))) {
      throw new RequestError('O ID do usuário é obrigatório', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(nome, { minLength: 3, maxLength: 100 })) {
      throw new RequestError('O nome é obrigatório e deve conter entre 3 e 100 caracteres', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(login, { minLength: 3, maxLength: 100 })) {
      throw new RequestError('O login é obrigatório e deve conter entre 3 e 100 caracteres', StatusCodes.BAD_REQUEST);
    }

    //verifica se a senha é valida apenas quando ela for informada (senha opcional na alteração de usuário)
    if (isValidString(senha)) {
      atualizaSenha = true;

      if (!isValidString(senha, { minLength: 6, maxLength: 20 })) {
        throw new RequestError('A senha é obrigatória e deve conter entre 6 e 20 caracteres', StatusCodes.BAD_REQUEST);
      }
    }

    const usuarioDB = await usuarioRepository.buscarPorId({ id });

    if (!usuarioDB) {
      throw new RequestError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    const usuarioComLogin = await usuarioRepository.buscarPorLogin({ login });

    if (usuarioComLogin && usuarioComLogin.id !== usuarioDB.id) {
      throw new RequestError('Já existe um usuário cadastrado com esse login', StatusCodes.BAD_REQUEST);
    }

    if (usuarioDB.id === usuarioLogado.id && !adm) {
      throw new RequestError('Não é possível remover o acesso de administrador do próprio usuário', StatusCodes.FORBIDDEN);
    }

    const usuario = {
      id,
      nome: nome.trim(),
      adm: !!adm,

      //não remover espaços em branco do login e da senha
      //pode ter sido adicionado propositalmente pelo usuário
      login,
    };

    if (atualizaSenha) {
      usuario.senha = hashPassword(senha);
    }

    await usuarioRepository.alterar(usuario);

    return {
      nome: usuario.nome,
      adm: usuario.adm,
    };
  }

  async inativar(dados, usuarioLogado) {
    const id = parseInt(dados.id);

    if (!isValidNumber(id)) {
      throw new RequestError('O ID do usuário é obrigatório', StatusCodes.BAD_REQUEST);
    }

    if (usuarioLogado.id === id) {
      throw new RequestError('Não é possível inativar o próprio usuário', StatusCodes.FORBIDDEN);
    }

    const usuarioDB = await usuarioRepository.buscarPorId({ id });

    if (!usuarioDB) {
      throw new RequestError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    await usuarioRepository.inativar({ id });
  }
}

const usuarioService = new UsuarioService();

module.exports = { usuarioService, UsuarioService };