const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const funcionarioRoutes = require('./funcionarioRoutes');
const atendimentoRoutes = require('./atendimentoRoutes');

const routes = Router();

routes.use('/usuarios', usuarioRoutes);
routes.use('/funcionarios', funcionarioRoutes);
routes.use('/atendimentos', atendimentoRoutes);

module.exports = {
  routes,
  usuarioRoutes,
  funcionarioRoutes,
  atendimentoRoutes,
};