const express = require('express');
const { ok, fail } = require('../lib/respond');
const { requireAuth } = require('../middleware/auth');
const { listCategories, listTags, listNotifications, markNotificationRead, listDevices, getDeviceById } = require('../data/store');

function createMiscRouter() {
  const router = express.Router();

  router.get('/categories', (req, res) => {
    ok(res, { total: listCategories().length, list: listCategories() });
  });

  router.get('/tags', (req, res) => {
    ok(res, { total: listTags().length, list: listTags() });
  });

  router.get('/notifications', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;
    const list = listNotifications(user.id);
    ok(res, { total: list.length, list });
  });

  router.post('/notifications/:id/read', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;
    const n = markNotificationRead({ userId: user.id, notificationId: req.params.id });
    if (!n) {
      fail(res, 404, 404, '未找到该通知');
      return;
    }
    ok(res, n);
  });

  router.get('/devices', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;
    const { page, pageSize, keyword, type, status } = req.query || {};
    const { total, list } = listDevices({ userId: user.id, page, pageSize, keyword, type, status });
    ok(res, {
      total,
      list: list.map(d => ({
        id: d.id,
        name: d.name,
        type: d.type,
        model: d.model,
        status: d.status,
        location: d.location,
        lastSeenAt: d.lastSeenAt
      }))
    });
  });

  router.get('/devices/:id', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;
    const device = getDeviceById({ userId: user.id, id: req.params.id });
    if (!device) {
      fail(res, 404, 404, '未找到该设备');
      return;
    }
    ok(res, device);
  });

  return router;
}

module.exports = { createMiscRouter };
