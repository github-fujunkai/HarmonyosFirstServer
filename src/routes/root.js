const express = require('express');
const { ok } = require('../lib/respond');

function createRootRouter() {
  const router = express.Router();

  router.get('/', (req, res) => {
    ok(res, {
      service: 'node_server',
      endpoints: [
        'GET /api/home',
        'POST /api/login',
        'POST /api/logout',
        'POST /api/register',
        'GET /api/items',
        'GET /api/items/:id',
        'POST /api/items',
        'POST /api/items/:id',
        'POST /api/items/:id/delete',
        'GET /api/me',
        'GET /api/categories',
        'GET /api/tags',
        'GET /api/items/:id/comments',
        'POST /api/items/:id/comments',
        'POST /api/items/:id/like',
        'POST /api/items/:id/unlike',
        'GET /api/notifications',
        'POST /api/notifications/:id/read',
        'GET /api/devices',
        'GET /api/devices/:id'
      ]
    });
  });

  return router;
}

module.exports = { createRootRouter };
