const { StatusCodes } = require("http-status-codes");
const { fotoFuncionarioService } = require("../services/fotoFuncionarioService");

class FotoFuncionarioController {

  async listar(req, res, next) {
    try {
      const result = await fotoFuncionarioService.listar(req.query, req.user);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  async buscarPorUUID(req, res, next) {
    try {
      req.query.uuid = req.params.uuid;

      const result = await fotoFuncionarioService.buscarPorUUID(req.query, req.user);

      res.setHeader('Content-Type', 'image/png');                          // Tipo
      res.setHeader('Content-Disposition', 'inline; filename="foto.png"'); // Nome
      res.setHeader('Content-Length', result.length);                      // Tamanho
      res.setHeader('Cache-Control', 'no-cache');                          // Cache
      res.setHeader('Pragma', 'no-cache');                                 // Cache
      res.setHeader('Expires', '0');                                       // Cache

      res.status(StatusCodes.OK).send(result);
    } catch (err) {
      next(err);
    }
  }

  async cadastrar(req, res, next) {
    try {
      const result = await fotoFuncionarioService.cadastrar(req.body, req.user);

      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deletar(req, res, next) {
    try {
      req.query.uuid = req.params.uuid;

      const result = await fotoFuncionarioService.deletar(req.query, req.user);

      res.status(StatusCodes.NO_CONTENT).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const fotoFuncionarioController = new FotoFuncionarioController();

module.exports = { fotoFuncionarioController, FotoFuncionarioController };