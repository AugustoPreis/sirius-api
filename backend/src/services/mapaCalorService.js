const { StatusCodes } = require('http-status-codes');
const { RequestError } = require('../utils/RequestError');
const { isValidString } = require('../utils/validators');
const { mapaCalorRepository } = require('../repositories/mapaCalorRepository');

class MapaCalorService {

  async buscarPorUUID(uuid) {
    if (!isValidString(uuid)) {
      throw new RequestError('UUID inválido/não informado', StatusCodes.BAD_REQUEST);
    }

    const mapaCalor = await mapaCalorRepository.buscarPorUUID(uuid);

    if (!mapaCalor) {
      throw new RequestError('Mapa de calor não encontrado', StatusCodes.NOT_FOUND);
    }

    return mapaCalor.mapa;
  }
}

const mapaCalorService = new MapaCalorService();

module.exports = { mapaCalorService, MapaCalorService };