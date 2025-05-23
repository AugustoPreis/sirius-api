const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const mapaCalorRoutes = require('./mapaCalorRoutes');

const routes = Router();

routes.use('/usuarios', usuarioRoutes);
routes.use('/dashboard', dashboardRoutes);
routes.use('/mapas-calor', mapaCalorRoutes);

module.exports = {
  routes,
  usuarioRoutes,
};