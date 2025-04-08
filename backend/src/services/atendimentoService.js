const { StatusCodes } = require('http-status-codes');
const { RequestError } = require('../utils/RequestError');
const { atendimentoRepository } = require('../repositories/atendimentoRepository');
const { isValidString, isValidNumber } = require('../utils/validators');

class AtendimentoService {

  async listarPorFuncionario(dados) {
    const { idFuncionario, dia, ordem, pagina, itensPagina } = dados;
    const params = {
      pagina: 1,
      itensPagina: 10,
      ordem: 'DESC',
    };

    if (!idFuncionario) {
      throw new RequestError('ID do funcionário não informado', StatusCodes.BAD_REQUEST);
    }

    if (!dia) {
      throw new RequestError('Dia não informado', StatusCodes.BAD_REQUEST);
    }

    if (isValidNumber(parseInt(pagina))) {
      params.pagina = parseInt(pagina);
    }

    if (isValidNumber(parseInt(itensPagina))) {
      params.itensPagina = parseInt(itensPagina);
    }

    if (isValidString(ordem) && ['ASC', 'DESC'].includes(ordem.toUpperCase())) {
      params.ordem = ordem.toUpperCase();
    }

    params.idFuncionario = parseInt(idFuncionario);
    params.dia = new Date(dia);

    const result = await atendimentoRepository.listarPorFuncionario(params);

    const total = result[0]?.total || 0;
    const data = result.map((atendimento) => {
      delete atendimento.total;

      return atendimento;
    });

    return { data, total };
  }

  async qtdAtendimentos(dados) {
    const { dia, idFuncionario, inativos } = dados;
    const params = {
      dia: null,
      inativos: inativos === 'true',
    };

    if (!dia) {
      throw new RequestError('Dia não informado', StatusCodes.BAD_REQUEST);
    }

    if (isValidNumber(parseInt(idFuncionario))) {
      params.idFuncionario = parseInt(idFuncionario);
    }

    params.dia = new Date(dia);

    const atendimentos = await atendimentoRepository.qtdAtendimentos(params);

    return atendimentos;
  }

  async cadastrar(dados) {
    const { idFuncionario, dataInicio, dataFim } = dados;

    if (!idFuncionario) {
      throw new RequestError('ID do funcionário não informado', StatusCodes.BAD_REQUEST);
    }

    if (!dataInicio || !dataFim) {
      throw new RequestError('As datas de início e fim devem ser informadas', StatusCodes.BAD_REQUEST);
    }

    const atendimento = {
      idFuncionario: parseInt(idFuncionario),
      dataInicio: new Date(dataInicio),
      dataFim: new Date(dataFim),
      dataCadastro: new Date(),
    };

    atendimento.id = await atendimentoRepository.salvar(atendimento);

    return {
      id: atendimento.id,
      dataCadastro: atendimento.dataCadastro,
    };
  }
}

const atendimentoService = new AtendimentoService();

module.exports = { atendimentoService, AtendimentoService };