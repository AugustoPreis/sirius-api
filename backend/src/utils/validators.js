function isString(value) {
  return typeof value === 'string';
}

function isValidString(value, config) {
  if (!isString(value)) {
    return false;
  }

  if (!config) {
    return value.trim() != '';
  }

  const { minLength, maxLength, trim = true } = config;

  if (trim) {
    value = value.trim();
  }

  if (minLength && value.length < minLength) {
    return false;
  }

  if (maxLength && value.length > maxLength) {
    return false;
  }

  return true;
}

function isNumber(value) {
  return typeof value === 'number';
}

function isValidNumber(value) {
  return isNumber(value) && Number.isFinite(value) && !Number.isNaN(value);
}

module.exports = {
  isString,
  isValidString,
  isNumber,
  isValidNumber,
};