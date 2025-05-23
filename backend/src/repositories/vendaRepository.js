const database = require('../config/database/database');

class VendaRepository {
  async vendasPeriodo(params) {
    const query = `
      SELECT
        vendas.id,
        vendas.valor,
        vendas.genero_cliente "genero",
        vendas.data_venda "dataVenda"
      FROM vendas
      WHERE date_trunc('day', vendas.data_venda) BETWEEN date_trunc('day', $1::timestamp) AND date_trunc('day', $2::timestamp)
    `;

    const result = await database.execute(query, [params.inicio, params.fim]);

    return result;
  }
}

const vendaRepository = new VendaRepository();

module.exports = { vendaRepository, VendaRepository };