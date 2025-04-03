const express = require('express');
const bodyParser = require('body-parser');
const { version } = require('../package.json');
const { errorHandler } = require('./middlewares/errorHandler');
const { getEnvConfig } = require('./config/dotenv');
const { routes } = require('./routes/routes');

function init() {
  const config = getEnvConfig();
  const app = express();

  app.use(bodyParser.json());
  app.use(routes);
  app.use(errorHandler);
  app.listen(config.port, () => {
    console.log(`Servidor iniciado na porta ${config.port}, v${version}`);
  });

  return app;
}

module.exports = { init };