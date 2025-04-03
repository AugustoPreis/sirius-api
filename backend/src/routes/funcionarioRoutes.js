const { Router } = require('express');
const { authHandler, adminHandler } = require('../middlewares/authHandler');
const { paramToBody } = require('../middlewares/paramToBody');
const { funcionarioController } = require('../controllers/funcionarioController');
const fotoFuncionarioRoutes = require('./fotoFuncionarioRoutes');

const routes = Router();

routes.get('/', authHandler, (req, res, next) => {
  funcionarioController.listar(req, res, next);
});

routes.get('/:id', authHandler, (req, res, next) => {
  funcionarioController.buscarPorId(req, res, next);
});

routes.post('/', [authHandler, adminHandler], (req, res, next) => {
  funcionarioController.cadastrar(req, res, next);
});

routes.put('/:id', [authHandler, adminHandler], (req, res, next) => {
  funcionarioController.alterar(req, res, next);
});

routes.delete('/:id', [authHandler, adminHandler], (req, res, next) => {
  funcionarioController.inativar(req, res, next);
});

routes.use('/:idFuncionario/fotos', paramToBody('idFuncionario', 'number'), fotoFuncionarioRoutes);

module.exports = routes;