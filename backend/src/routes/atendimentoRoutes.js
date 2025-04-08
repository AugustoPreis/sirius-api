const { Router } = require('express');
const { authHandler } = require('../middlewares/authHandler');
const { atendimentoController } = require('../controllers/atendimentoController');

const routes = Router();

routes.get('/', authHandler, (req, res, next) => {
  atendimentoController.listar(req, res, next);
});

routes.get('/ranking', authHandler, (req, res, next) => {
  atendimentoController.ranking(req, res, next);
});

routes.get('/quantidade-por-funcionario', authHandler, (req, res, next) => {
  atendimentoController.qtdAtendimentos(req, res, next);
});

routes.post('/', authHandler, (req, res, next) => {
  atendimentoController.cadastrar(req, res, next);
});

module.exports = routes;