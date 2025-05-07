const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');

const routes = Router();

routes.use('/usuarios', usuarioRoutes);

module.exports = {
  routes,
  usuarioRoutes,
};