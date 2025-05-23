const { Router } = require('express');
const { authHandler } = require('../middlewares/authHandler');
const { dashboardController } = require('../controllers/dashboardController');

const routes = Router();

routes.get('/', [authHandler], (req, res, next) => {
  dashboardController.dashboard(req, res, next);
})

module.exports = routes;