const { Router } = require('express');
const { authHandler } = require('../middlewares/authHandler');
const { funcionarioController } = require('../controllers/funcionarioController');

const routes = Router();

routes.get('/', authHandler, (req, res, next) => {
  funcionarioController.listar(req, res, next);
});

routes.get('/:id', authHandler, (req, res, next) => {
  funcionarioController.buscarPorId(req, res, next);
});

routes.post('/', authHandler, (req, res, next) => {
  funcionarioController.cadastrar(req, res, next);
});

routes.put('/:id', authHandler, (req, res, next) => {
  funcionarioController.alterar(req, res, next);
});

routes.delete('/:id', authHandler, (req, res, next) => {
  funcionarioController.inativar(req, res, next);
});

module.exports = routes;