const { Router } = require('express');
const { mapaCalorController } = require('../controllers/mapaCalorController');

const routes = Router();

routes.get('/:uuid', (req, res, next) => {
  mapaCalorController.buscarPorUUID(req, res, next);
});

module.exports = routes;