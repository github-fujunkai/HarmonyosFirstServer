const express = require('express');
const { ok, fail } = require('../lib/respond');
const { requireAuth, publicUser, listPublicUsers } = require('../middleware/auth');
const {
  listItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  listCommentsByItemId,
  addComment,
  deleteComment,
  listCategories,
  listTags,
  findUserById,
  isLikedByUser,
  likeItem,
  unlikeItem
} = require('../data/store');

function decorateItem(item) {
  if (!item) return null;
  const author = findUserById(item.authorId);
  const categories = listCategories();
  const tags = listTags();
  const category = categories.find(c => c.id === item.categoryId) || null;
  const itemTags = (item.tagIds || [])
    .map(id => tags.find(t => t.id === id))
    .filter(Boolean);

  return {
    ...item,
    author: publicUser(author),
    category,
    tags: itemTags
  };
}

function createItemsRouter() {
  const router = express.Router();

  router.get('/items', (req, res) => {
    const { page, pageSize, keyword, categoryId, tagId } = req.query || {};
    const { total, list } = listItems({ page, pageSize, keyword, categoryId, tagId });
    ok(res, {
      total,
      list: list.map(i => ({ id: i.id, title: i.title, summary: i.summary }))
    });
  });

  router.get('/items/:id', (req, res) => {
    const item = getItemById(req.params.id);
    if (!item) {
      fail(res, 404, 404, '未找到该条目');
      return;
    }
    item.viewCount += 1;
    ok(res, decorateItem(item));
  });

  router.post('/items', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;

    const { title, summary, content, categoryId, tagIds, cover } = req.body || {};
    const normalizedTitle = typeof title === 'string' ? title.trim() : '';
    if (!normalizedTitle) {
      fail(res, 400, 400, 'title 不能为空');
      return;
    }

    const item = createItem({
      title: normalizedTitle,
      summary: typeof summary === 'string' ? summary.trim() : '',
      content: typeof content === 'string' ? content : '',
      authorId: user.id,
      categoryId,
      tagIds,
      cover
    });
    ok(res, decorateItem(item));
  });

  router.post('/items/:id', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;

    const item = getItemById(req.params.id);
    if (!item) {
      fail(res, 404, 404, '未找到该条目');
      return;
    }

    const updated = updateItem(req.params.id, req.body || {});
    ok(res, decorateItem(updated));
  });

  router.post('/items/:id/delete', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;

    const removed = deleteItem(req.params.id);
    if (!removed) {
      fail(res, 404, 404, '未找到该条目');
      return;
    }
    ok(res, removed);
  });

  router.get('/items/:id/comments', (req, res) => {
    const item = getItemById(req.params.id);
    if (!item) {
      fail(res, 404, 404, '未找到该条目');
      return;
    }
    const users = listPublicUsers();
    const list = listCommentsByItemId(req.params.id).map(c => ({
      ...c,
      user: users.find(u => u.id === c.userId) || null
    }));
    ok(res, { total: list.length, list });
  });

  router.post('/items/:id/comments', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;

    const c = addComment({ itemId: req.params.id, userId: user.id, content: (req.body || {}).content });
    if (!c) {
      fail(res, 400, 400, 'content 不能为空或条目不存在');
      return;
    }
    ok(res, c);
  });

  router.post('/items/:id/comments/:commentId/delete', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;

    const removed = deleteComment({ itemId: req.params.id, commentId: req.params.commentId });
    if (!removed) {
      fail(res, 404, 404, '未找到该评论');
      return;
    }
    ok(res, removed);
  });

  router.post('/items/:id/like', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;
    const item = likeItem({ itemId: req.params.id, userId: user.id });
    if (!item) {
      fail(res, 404, 404, '未找到该条目');
      return;
    }
    ok(res, { id: item.id, likeCount: item.likeCount, liked: isLikedByUser({ itemId: item.id, userId: user.id }) });
  });

  router.post('/items/:id/unlike', (req, res) => {
    const user = requireAuth(req, res);
    if (!user) return;
    const item = unlikeItem({ itemId: req.params.id, userId: user.id });
    if (!item) {
      fail(res, 404, 404, '未找到该条目');
      return;
    }
    ok(res, { id: item.id, likeCount: item.likeCount, liked: isLikedByUser({ itemId: item.id, userId: user.id }) });
  });

  router.get('/items/:id/related', (req, res) => {
    const item = getItemById(req.params.id);
    if (!item) {
      fail(res, 404, 404, '未找到该条目');
      return;
    }
    const { list } = listItems({ categoryId: item.categoryId });
    const related = list.filter(i => i.id !== item.id).slice(0, 6).map(i => ({ id: i.id, title: i.title, summary: i.summary }));
    ok(res, { total: related.length, list: related });
  });

  return router;
}

module.exports = { createItemsRouter };
