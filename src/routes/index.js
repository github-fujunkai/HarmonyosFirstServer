const { createRootRouter } = require('./root');
const { createAuthRouter } = require('./auth');
const { createHomeRouter } = require('./home');
const { createItemsRouter } = require('./items');
const { createMiscRouter } = require('./misc');

function registerRoutes(app) {
  app.use('/', createRootRouter());

  const api = require('express').Router();
  api.use('/', createAuthRouter());
  api.use('/', createHomeRouter());
  api.use('/', createItemsRouter());
  api.use('/', createMiscRouter());

  app.use('/api', api);
}

module.exports = { registerRoutes };
