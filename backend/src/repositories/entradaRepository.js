const database = require('../config/database/database');

class EntradaRepository {
  async entradasPeriodo(params) {
    const query = `
      SELECT
        entradas.id,
        entradas.data_entrada "dataEntrada"
      FROM entradas
      WHERE date_trunc('day', entradas.data_entrada) BETWEEN date_trunc('day', $1::timestamp) AND date_trunc('day', $2::timestamp)
      ORDER BY entradas.data_entrada
    `;

    const result = await database.execute(query, [params.inicio, params.fim]);

    return result;
  }
}

const entradaRepository = new EntradaRepository();

module.exports = { entradaRepository, EntradaRepository };