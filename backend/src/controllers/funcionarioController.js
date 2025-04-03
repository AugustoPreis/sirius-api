const { StatusCodes } = require('http-status-codes');
const { funcionarioService } = require('../services/funcionarioService');

class FuncionarioController {

  async listar(req, res, next) {
    try {
      const result = await funcionarioService.listar(req.query, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      req.query.id = req.params.id;

      const result = await funcionarioService.buscarPorId(req.query, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async cadastrar(req, res, next) {
    try {
      const result = await funcionarioService.cadastrar(req.body, req.user);

      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

  async alterar(req, res, next) {
    try {
      req.body.id = req.params.id;

      const result = await funcionarioService.alterar(req.body, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async inativar(req, res, next) {
    try {
      req.body.id = req.params.id;

      const result = await funcionarioService.inativar(req.body, req.user);

      res.status(StatusCodes.NO_CONTENT).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const funcionarioController = new FuncionarioController();

module.exports = { funcionarioController, FuncionarioController };