function ok(res, data, message = 'ok') {
  res.json({ code: 200, message, data });
}

function fail(res, status, code, message) {
  res.status(status).json({ code, message });
}

module.exports = { ok, fail };
