const { Router } = require('express');
const { authHandler, adminHandler } = require('../middlewares/authHandler');
const { fotoFuncionarioController } = require('../controllers/fotoFuncionarioController');

const routes = Router();

routes.get('/', authHandler, (req, res, next) => {
  fotoFuncionarioController.listar(req, res, next);
});

routes.get('/:uuid', (req, res, next) => {
  fotoFuncionarioController.buscarPorUUID(req, res, next);
});

routes.post('/', [authHandler, adminHandler], (req, res, next) => {
  fotoFuncionarioController.cadastrar(req, res, next);
});

routes.delete('/:uuid', [authHandler, adminHandler], (req, res, next) => {
  fotoFuncionarioController.deletar(req, res, next);
});

module.exports = routes;