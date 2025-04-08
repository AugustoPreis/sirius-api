const { StatusCodes } = require('http-status-codes');
const { atendimentoService } = require('../services/atendimentoService');

class AtendimentoController {

  async listar(req, res, next) {
    try {
      const result = await atendimentoService.listarPorFuncionario(req.query, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async ranking(req, res, next) {
    try {
      const result = await atendimentoService.ranking(req.query, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async qtdAtendimentos(req, res, next) {
    try {
      const result = await atendimentoService.qtdAtendimentos(req.query, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async cadastrar(req, res, next) {
    try {
      const result = await atendimentoService.cadastrar(req.body, req.user);

      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const atendimentoController = new AtendimentoController();

module.exports = { atendimentoController, AtendimentoController };