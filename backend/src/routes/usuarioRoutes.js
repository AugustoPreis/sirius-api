const { Router } = require('express');
const { authHandler } = require('../middlewares/authHandler');
const { usuarioController } = require('../controllers/usuarioController');

const routes = Router();

routes.post('/login', (req, res, next) => {
  usuarioController.login(req, res, next)
});

routes.get('/', authHandler, (req, res, next) => {
  usuarioController.listar(req, res, next);
});

routes.get('/:id', authHandler, (req, res, next) => {
  usuarioController.buscarPorId(req, res, next);
});

routes.post('/', authHandler, (req, res, next) => {
  usuarioController.cadastrar(req, res, next);
});

routes.put('/:id', authHandler, (req, res, next) => {
  usuarioController.alterar(req, res, next);
});

routes.delete('/:id', authHandler, (req, res, next) => {
  usuarioController.inativar(req, res, next);
});

module.exports = routes;