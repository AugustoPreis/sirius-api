const bcrypt = require('bcrypt');
const { isValidString } = require('./validators');

function hashPassword(password, salt = 10) {
  if (!isValidString(password)) {
    return null;
  }

  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hash) {
  if (!isValidString(password) || !isValidString(hash)) {
    return false;
  }

  return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };