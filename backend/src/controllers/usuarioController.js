const { StatusCodes } = require('http-status-codes');
const { usuarioService } = require('../services/usuarioService');

class UsuarioController {
  async listar(req, res, next) {
    try {
      const result = await usuarioService.listar(req.query, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      req.query.id = req.params.id;

      const result = await usuarioService.buscarPorId(req.query, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await usuarioService.login(req.body);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async cadastrar(req, res, next) {
    try {
      const result = await usuarioService.cadastrar(req.body, req.user);

      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

  async alterar(req, res, next) {
    try {
      req.body.id = req.params.id;

      const result = await usuarioService.alterar(req.body, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async inativar(req, res, next) {
    try {
      req.query.id = req.params.id;

      const result = await usuarioService.inativar(req.query, req.user);

      res.status(StatusCodes.NO_CONTENT).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const usuarioController = new UsuarioController();

module.exports = { usuarioController, UsuarioController };