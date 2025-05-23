const { StatusCodes } = require('http-status-codes');
const { startOfDay, endOfDay, format } = require('date-fns');
const { RequestError } = require('../utils/RequestError');
const { entradaRepository } = require('../repositories/entradaRepository');
const { vendaRepository } = require('../repositories/vendaRepository');
const { mapaCalorRepository } = require('../repositories/mapaCalorRepository');
const { round } = require('../utils/round');

class DashboardService {

  /*
    Método que busca as informações do dashboard inicial conforme período informado
      Nº de entradas na loja
      Qtd. Vendas realizadas
      Valor Vendido
      Ticket Médio (Valor vendido / Qtd. Vendas)
      % Conversão (% de entradas que resultaram em vendas)
      Gráfico "Distribuição de gênero das vendas"
      Gráfico "Entradas X Vendas"
      Mapas de calor
  */
  async dashboard(dados) {
    if (!dados.inicio || !dados.fim) {
      throw new RequestError('Período inválido/não informado', StatusCodes.BAD_REQUEST);
    }

    const periodo = {
      inicio: startOfDay(new Date(dados.inicio)),
      fim: endOfDay(new Date(dados.fim)),
    }

    const entradas = await entradaRepository.entradasPeriodo(periodo) || 0;
    const vendas = await vendaRepository.vendasPeriodo(periodo) || 0;
    const mapasCalor = await mapaCalorRepository.mapasCalorPeriodo(periodo);
    const graficos = this.graficos(entradas, vendas);
    let valorVendido = 0;
    let ticketMedio = 0;
    let percentualConversao = 0;

    //Calcula apenas se tiver vendas, para evitar divisão por zero
    if (vendas.length > 0) {
      valorVendido = vendas.reduce((acc, venda) => acc + Number(venda.valor), 0);
      ticketMedio = round(valorVendido / vendas.length, 2);
      percentualConversao = round((vendas.length / entradas.length), 2); // (0 = 0%) | (1 = 100%)
    }

    return {
      entradas: entradas.length,
      vendas: vendas.length,
      valorVendido,
      ticketMedio,
      percentualConversao,
      graficos,
      mapasCalor
    };
  }

  graficos(entradas, vendas) {
    const entradasXVendas = this.graficoEntradasXVendas(entradas, vendas);
    const distribuicaoGenero = this.graficoDistribuicaoGenero(vendas);

    return { entradasXVendas, distribuicaoGenero };
  }

  graficoEntradasXVendas(entradas, vendas) {
    const mapaEntradas = {};
    const mapaVendas = {};

    entradas.forEach(({ dataEntrada }) => {
      const hora = new Date(dataEntrada).getHours();

      mapaEntradas[hora] = (mapaEntradas[hora] || 0) + 1;
    });

    vendas.forEach(({ dataVenda }) => {
      const hora = new Date(dataVenda).getHours();

      mapaVendas[hora] = (mapaVendas[hora] || 0) + 1;
    });

    const horasPresentes = Array
      .from(new Set([...Object.keys(mapaEntradas), ...Object.keys(mapaVendas)]))
      .map((item) => Number(item))
      .sort((a, b) => a - b);

    const horasFormatadas = horasPresentes.map(h => `${String(h).padStart(2, '0')}:00`);
    const entradasPorHora = horasPresentes.map(h => mapaEntradas[h] || 0);
    const vendasPorHora = horasPresentes.map(h => mapaVendas[h] || 0);

    return {
      horas: horasFormatadas,
      entradas: entradasPorHora,
      vendas: vendasPorHora,
    };
  }

  graficoDistribuicaoGenero(vendas) {
    const qtdVendas = vendas.length;

    if (qtdVendas === 0) {
      return { percentualHomens: 0, percentualMulheres: 0 };
    }

    const qtdVendasHomem = vendas.filter((venda) => venda.genero === 'M').length;

    const percentualHomens = round((qtdVendasHomem / qtdVendas) * 100, 2);
    const percentualMulheres = 100 - percentualHomens;

    return {
      homens: percentualHomens,
      mulheres: percentualMulheres,
    };
  }
}

const dashboardService = new DashboardService();

module.exports = { dashboardService, DashboardService };