const { v4 } = require('uuid');
const { StatusCodes } = require('http-status-codes');
const { fotoFuncionarioRepository } = require('../repositories/fotoFuncionarioRepository');
const { RequestError } = require('../utils/RequestError');
const { isValidString } = require('../utils/validators');

class FotoFuncionarioService {
  async listar(dados) {
    const { idFuncionario } = dados;

    const params = {
      idFuncionario: parseInt(idFuncionario),
    }

    const result = await fotoFuncionarioRepository.listar(params);

    return result;
  }

  async buscarPorUUID(dados) {
    const { idFuncionario, uuid } = dados;

    if (!isValidString(uuid)) {
      throw new RequestError('O UUID é obrigatório', StatusCodes.BAD_REQUEST);
    }

    const params = {
      idFuncionario: parseInt(idFuncionario),
      uuid,
    };

    const fotoFuncionarioDB = await fotoFuncionarioRepository.buscarPorUUID(params);

    if (!fotoFuncionarioDB) {
      throw new RequestError('Foto não encontrada', StatusCodes.NOT_FOUND);
    }

    return fotoFuncionarioDB.foto;
  }

  async cadastrar(dados) {
    const { idFuncionario, foto } = dados;
    const uuid = v4();

    //TODO: validar o tipo da foto
    if (!Buffer.isBuffer(foto)) {
      throw new RequestError('Foto não informada ou inválida', StatusCodes.BAD_REQUEST);
    }

    const fotoFuncionario = {
      idFuncionario,
      uuid,
      foto,
      dataCadastro: new Date(),
    }

    fotoFuncionario.id = await fotoFuncionarioRepository.salvar(fotoFuncionario);

    return {
      id: fotoFuncionario.id,
      uuid: fotoFuncionario.uuid,
    }
  }

  async deletar(dados) {
    const { idFuncionario, uuid } = dados;

    if (!isValidString(uuid)) {
      throw new RequestError('O UUID da foto é obrigatório', StatusCodes.BAD_REQUEST);
    }

    const fotoDB = await fotoFuncionarioRepository.buscarPorUUID({ uuid, idFuncionario });

    if (!fotoDB) {
      throw new RequestError('Foto não encontrada', StatusCodes.NOT_FOUND);
    }

    await fotoFuncionarioRepository.deletar(fotoDB);
  }
}

const fotoFuncionarioService = new FotoFuncionarioService();

module.exports = { fotoFuncionarioService, FotoFuncionarioService }