const database = require('../config/database/database');

class MapaCalorRepository {
  async mapasCalorPeriodo(params) {
    const query = `
      SELECT
        mapas_calor.id,
        mapas_calor.uuid,
        mapas_calor.data_mapa "dia"
      FROM mapas_calor
      WHERE date_trunc('day', mapas_calor.data_mapa) BETWEEN date_trunc('day', $1::timestamp) AND date_trunc('day', $2::timestamp)
      ORDER BY mapas_calor.data_mapa
    `;

    const result = await database.execute(query, [params.inicio, params.fim]);

    return result;
  }

  async buscarPorUUID(uuid) {
    const query = `
      SELECT
        mapas_calor.mapa
      FROM mapas_calor
      WHERE mapas_calor.uuid = $1
    `;

    const result = await database.execute(query, [uuid]);

    return result[0];
  }
}

const mapaCalorRepository = new MapaCalorRepository();

module.exports = { mapaCalorRepository, MapaCalorRepository };