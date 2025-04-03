const { StatusCodes } = require('http-status-codes');
const { funcionarioRepository } = require('../repositories/funcionarioRepository');
const { isValidString, isValidNumber } = require('../utils/validators');
const { RequestError } = require('../utils/RequestError');

class FuncionarioService {

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

    const result = await funcionarioRepository.listar(params);

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

    const funcionarioDB = await funcionarioRepository.buscarPorId({ id });

    if (!funcionarioDB) {
      throw new RequestError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    return funcionarioDB;
  }

  async cadastrar(dados, usuarioLogado) {
    if (!usuarioLogado.adm) {
      throw new RequestError('Apenas admins podem cadastrar funcionários', StatusCodes.UNAUTHORIZED);
    }

    const { nome } = dados;

    if (!isValidString(nome, { minLength: 3, maxLength: 100 })) {
      throw new RequestError('O nome é obrigatório e deve conter entre 3 e 100 caracteres', StatusCodes.BAD_REQUEST);
    }

    const funcionario = {
      nome: nome.trim(),
      ativo: true,
      dataCadastro: new Date(),
    };

    funcionario.id = await funcionarioRepository.salvar(funcionario);

    return {
      id: funcionario.id,
      nome: funcionario.nome,
    };
  }

  async alterar(dados, usuarioLogado) {
    if (!usuarioLogado.adm) {
      throw new RequestError('Apenas admins podem alterar funcionários', StatusCodes.UNAUTHORIZED);
    }

    const { id, nome } = dados;

    if (!isValidNumber(parseInt(id))) {
      throw new RequestError('O ID do funcionário é obrigatório', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(nome, { minLength: 3, maxLength: 100 })) {
      throw new RequestError('O nome é obrigatório e deve conter entre 3 e 100 caracteres', StatusCodes.BAD_REQUEST);
    }

    const funcionarioDB = await funcionarioRepository.buscarPorId({ id });

    if (!funcionarioDB) {
      throw new RequestError('Funcionário não encontrado', StatusCodes.NOT_FOUND);
    }

    funcionarioDB.nome = nome.trim();

    await funcionarioRepository.alterar(funcionarioDB);

    return {
      id: funcionarioDB.id,
      nome: funcionarioDB.nome,
    };
  }

  async inativar(dados, usuarioLogado) {
    if (!usuarioLogado.adm) {
      throw new RequestError('Apenas admins podem inativar funcionários', StatusCodes.UNAUTHORIZED);
    }

    const id = parseInt(dados.id);

    if (!isValidNumber(id)) {
      throw new RequestError('O ID do funcionário é obrigatório', StatusCodes.BAD_REQUEST);
    }

    const funcionarioDB = await funcionarioRepository.buscarPorId({ id });

    if (!funcionarioDB) {
      throw new RequestError('Funcionário não encontrado', StatusCodes.NOT_FOUND);
    }

    await funcionarioRepository.inativar(funcionarioDB);
  }
}

const funcionarioService = new FuncionarioService();

module.exports = { funcionarioService, FuncionarioService };