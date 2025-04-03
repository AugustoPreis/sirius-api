function paramToBody(paramKey, type) {
  return (req, _, next) => {
    const key = ['get', 'delete'].includes(req.method.toLowerCase()) ? 'query' : 'body';
    const param = req.params[paramKey];

    if (type === 'string') {
      req[key][paramKey] = param;
    }

    if (type === 'number') {
      req[key][paramKey] = parseInt(param);
    }

    delete req.params[paramKey];

    next();
  };
}

module.exports = { paramToBody };