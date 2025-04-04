const { Router } = require('express');
const { atendimentoController } = require('../controllers/atendimentoController');

const routes = Router();

routes.get('/', (req, res, next) => {
  atendimentoController.listar(req, res, next);
});

routes.get('/quantidade-por-funcionario', (req, res, next) => {
  atendimentoController.qtdAtendimentos(req, res, next);
});

routes.post('/', (req, res, next) => {
  atendimentoController.cadastrar(req, res, next);
});

module.exports = routes;