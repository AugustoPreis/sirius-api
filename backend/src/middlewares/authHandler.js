const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { RequestError } = require('../utils/RequestError');
const { isValidString } = require('../utils/validators');
const { getEnvConfig } = require('../config/dotenv');

function authHandler(req, _, next) {
  const token = req.headers.authorization;

  if (!isValidString(token)) {
    throw new RequestError('Usuário não autenticado', StatusCodes.UNAUTHORIZED);
  }

  const envConfig = getEnvConfig();

  jwt.verify(token, envConfig.jwt.secretKey, (err, decodedUser) => {
    if (err) {
      throw new RequestError(handleErrorMessage(err.message), StatusCodes.UNAUTHORIZED);
    }

    req.user = decodedUser;

    next();
  });
}

function adminHandler(req, _, next) {
  if (!req.user.adm) {
    throw new RequestError('Você não possui permissão para realizar esta ação', StatusCodes.FORBIDDEN);
  }

  next();
}

function handleErrorMessage(message) {
  switch (message) {
    case 'jwt expired':
      return 'Login expirado';
    case 'invalid token':
      return 'Login inválido';
    default:
      return 'Usuário não autenticado';
  }
}

module.exports = { authHandler, adminHandler };