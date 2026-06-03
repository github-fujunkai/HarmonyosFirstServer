const express = require('express');
const { ok, fail } = require('../lib/respond');
const { requireAuth, publicUser } = require('../middleware/auth');
const { findUserByCredentials, usernameExists, createUser } = require('../data/store');

function createAuthRouter() {
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { username, password } = req.body || {};
    const user = findUserByCredentials(username, password);
    if (!user) {
      fail(res, 401, 401, '用户名或密码错误');
      return;
    }
    const token = 'demo-token-' + user.id;
    ok(res, { token, user: { id: user.id, username: user.username, name: user.name } });
  });

  router.post('/logout', (req, res) => {
    ok(res, null);
  });

  router.post('/register', (req, res) => {
    const { username, password, name } = req.body || {};
    const normalizedUsername = typeof username === 'string' ? username.trim() : '';
    if (!normalizedUsername || typeof password !== 'string' || password.length < 1) {
      fail(res, 400, 400, 'username/password 不能为空');
      return;
    }
    if (usernameExists(normalizedUsername)) {
      fail(res, 409, 409, '用户名已存在');
      return;
    }
    const user = createUser({ username: normalizedUsername, password, name });
    ok(res, { id: user.id, username: user.username, name: user.name });
  });

  router.get('/me', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;
    ok(res, publicUser(user));
  });

  return router;
}

module.exports = { createAuthRouter };
