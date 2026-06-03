function normalizeLegacyParams(req, _res, next) {
  req.url = req.url.replace(/(\/api\/items)\/:(\d+)(?=\/|$)/g, '$1/$2');
  next();
}

module.exports = { normalizeLegacyParams };
