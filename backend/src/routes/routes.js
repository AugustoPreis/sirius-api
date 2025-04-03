const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const funcionarioRoutes = require('./funcionarioRoutes');

const routes = Router();

routes.use('/usuarios', usuarioRoutes);
routes.use('/funcionarios', funcionarioRoutes);

module.exports = {
  routes,
  usuarioRoutes,
  funcionarioRoutes,
};