function round(value, precision) {
  const factor = Math.pow(10, precision);

  return Math.round(value * factor) / factor;
}

module.exports = { round };