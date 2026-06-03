function nextId(list) {
  const maxId = list.reduce((max, cur) => Math.max(max, cur.id), 0);
  return maxId + 1;
}

function isoDaysAgo(daysAgo) {
  const d = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  return d.toISOString();
}

function seed() {
  const users = [
    { id: 1, username: 'admin', password: '123456', name: '管理员', avatar: '/assets/girl01.jpg', bio: '系统管理员，负责内容审核与运营。' },
    { id: 2, username: 'user', password: '123456', name: '普通用户', avatar: '/assets/girl02.jpg', bio: '喜欢记录日常，也爱写技术笔记。' },
    { id: 3, username: 'zhangsan', password: '123456', name: '张三', avatar: '/assets/account.png', bio: '前端开发者，专注移动端体验。' },
    { id: 4, username: 'lisi', password: '123456', name: '李四', avatar: '/assets/account.png', bio: 'Node.js 爱好者，热衷 API 设计。' },
    { id: 5, username: 'wangwu', password: '123456', name: '王五', avatar: '/assets/account.png', bio: '产品同学，关注业务落地与数据。' }
  ];

  const categories = [
    { id: 1, name: '文学' },
    { id: 2, name: '技术' },
    { id: 3, name: '生活' },
    { id: 4, name: '产品' }
  ];

  const tags = [
    { id: 1, name: '随笔' },
    { id: 2, name: '读书' },
    { id: 3, name: 'Express' },
    { id: 4, name: 'API' },
    { id: 5, name: '前端' },
    { id: 6, name: '面试' },
    { id: 7, name: '复盘' }
  ];

  const items = [
    {
      id: 1,
      title: '示例一',
      summary: '这是第一个示例',
      content: '示例一的详细内容',
      authorId: 1,
      categoryId: 2,
      tagIds: [3, 4],
      cover: '/assets/fig1.png',
      createdAt: isoDaysAgo(14),
      updatedAt: isoDaysAgo(14),
      viewCount: 132,
      likeCount: 8
    },
    {
      id: 2,
      title: '示例二',
      summary: '这是第二个示例',
      content: '示例二的详细内容',
      authorId: 2,
      categoryId: 3,
      tagIds: [1, 7],
      cover: '/assets/fig2.png',
      createdAt: isoDaysAgo(12),
      updatedAt: isoDaysAgo(10),
      viewCount: 256,
      likeCount: 18
    },
    {
      id: 3,
      title: '示例三',
      summary: '这是第三个示例',
      content: '示例三的详细内容',
      authorId: 3,
      categoryId: 1,
      tagIds: [2, 1],
      cover: '/assets/fig3.png',
      createdAt: isoDaysAgo(9),
      updatedAt: isoDaysAgo(8),
      viewCount: 88,
      likeCount: 3
    }
  ];

  const more = [
    {
      title: '一次接口重构复盘：从可用到可维护',
      summary: '把单文件服务拆成路由、数据层和中间件，顺手补上更真实的业务接口。',
      content:
        '在 demo 阶段单文件足够快，但当接口数量增加后，职责边界会变得模糊。' +
        '\n\n这次重构的目标：\n1）保留原有接口；\n2）按业务拆分；\n3）补齐基础数据模型，让前端更像在对接真实项目。\n',
      authorId: 4,
      categoryId: 2,
      tagIds: [3, 4, 7],
      cover: '/assets/fig4.png'
    },
    {
      title: '内容列表页：分页、搜索与筛选的接口设计',
      summary: '列表接口除了 total/list，还需要分页参数、关键字、分类与标签筛选。',
      content:
        '列表接口常见 query：page/pageSize/keyword/categoryId/tag。' +
        '\n\n为了兼容旧调用，默认不传 query 仍返回完整列表。\n',
      authorId: 3,
      categoryId: 2,
      tagIds: [4, 5]
    },
    {
      title: '读书摘记：从百草园到三味书屋',
      summary: '一些旧时光的味道，读来仍有趣味。',
      content:
        '不必说碧绿的菜畦，光滑的石井栏，高大的皂荚树，紫红的桑椹……' +
        '\n\n读书摘记适合做成可搜索的条目，配合标签更好检索。\n',
      authorId: 2,
      categoryId: 1,
      tagIds: [2, 1]
    },
    {
      title: '登录与鉴权：为什么 demo token 也要有统一规范',
      summary: '就算是 demo token，也建议统一走 Authorization: Bearer ...',
      content:
        '客户端可通过 Authorization 头或 body.token 传递 token。' +
        '\n\n服务端统一解析，路由层只关心 requireAuth 返回的 user。\n',
      authorId: 1,
      categoryId: 2,
      tagIds: [4, 6]
    },
    {
      title: '产品日常：需求评审不只是过一遍 PRD',
      summary: '把需求拆成用户故事、验收标准与数据指标，团队协作更顺畅。',
      content:
        '评审要对齐：目标、范围、边界、异常路径、埋点与验收。' +
        '\n\n接口层面要考虑：权限、幂等、分页、错误码、性能。\n',
      authorId: 5,
      categoryId: 4,
      tagIds: [7]
    }
  ];

  for (let i = 0; i < 25; i++) {
    const base = more[i % more.length];
    const id = nextId(items);
    const day = 30 - i;
    items.push({
      id,
      title: `${base.title} #${i + 1}`,
      summary: base.summary,
      content: base.content + `\n\n（自动生成的测试数据：#${i + 1}）\n`,
      authorId: base.authorId,
      categoryId: base.categoryId,
      tagIds: base.tagIds,
      cover: base.cover || (i % 2 === 0 ? '/assets/fig1.png' : '/assets/fig2.png'),
      createdAt: isoDaysAgo(day),
      updatedAt: isoDaysAgo(Math.max(0, day - 1)),
      viewCount: 50 + i * 7,
      likeCount: (i * 3) % 37
    });
  }

  const comments = [];
  const commentTemplates = [
    '写得很清晰，尤其是边界条件那块。',
    '这个接口返回结构很适合做列表页。',
    '建议把错误码也统一封装一下，方便前端提示。',
    '这里如果加上分页就更像真实项目了。',
    '点赞，学习了。'
  ];
  for (const item of items.slice(0, 18)) {
    const count = (item.id % 4) + 1;
    for (let i = 0; i < count; i++) {
      const id = nextId(comments);
      const user = users[(item.id + i) % users.length];
      comments.push({
        id,
        itemId: item.id,
        userId: user.id,
        content: commentTemplates[(item.id + i) % commentTemplates.length],
        createdAt: isoDaysAgo((item.id % 10) + i)
      });
    }
  }

  const notifications = [];
  for (const u of users) {
    notifications.push(
      { id: nextId(notifications), userId: u.id, type: 'system', title: '欢迎使用', content: '这是一个用于学习的后端服务。', createdAt: isoDaysAgo(20), read: true },
      { id: nextId(notifications), userId: u.id, type: 'todo', title: '完善个人信息', content: '可以在 /api/me 查看并补充头像与简介。', createdAt: isoDaysAgo(6), read: false }
    );
  }

  const likes = [];
  for (const item of items.slice(0, 20)) {
    const likeUser = users[item.id % users.length];
    likes.push({ id: nextId(likes), itemId: item.id, userId: likeUser.id, createdAt: isoDaysAgo(item.id % 9) });
  }

  const devices = [];
  const deviceTemplates = [
    { type: 'gateway', model: 'GW-100', firmware: '1.2.0' },
    { type: 'sensor', model: 'TH-200', firmware: '2.0.3' },
    { type: 'camera', model: 'CAM-10', firmware: '3.1.1' },
    { type: 'light', model: 'LGT-01', firmware: '1.0.8' }
  ];
  const locations = ['客厅', '卧室', '书房', '厨房', '阳台'];
  const totalDevices = 50;
  for (let i = 0; i < totalDevices; i++) {
    const owner = users[0];
    const tpl = deviceTemplates[i % deviceTemplates.length];
    const id = nextId(devices);
    const days = 40 - (i % 35);
    const online = i % 3 !== 0;
    const lastSeenAt = online ? new Date(Date.now() - (i % 90) * 60 * 1000).toISOString() : isoDaysAgo((i % 10) + 1);
    devices.push({
      id,
      ownerId: owner.id,
      name: `${tpl.type.toUpperCase()}-${id}`,
      type: tpl.type,
      model: tpl.model,
      firmware: tpl.firmware,
      status: online ? 'online' : 'offline',
      ip: `192.168.${owner.id}.${100 + (i % 100)}`,
      mac: `AA:BB:CC:${String(owner.id).padStart(2, '0')}:${String(id).padStart(2, '0')}:DD`,
      location: locations[i % locations.length],
      lastSeenAt,
      createdAt: isoDaysAgo(days),
      updatedAt: isoDaysAgo(Math.max(0, days - 1))
    });
  }

  return { users, categories, tags, items, comments, notifications, likes, devices };
}

const db = seed();

function getUsers() {
  return db.users;
}

function findUserByCredentials(username, password) {
  return db.users.find(u => u.username === username && u.password === password) || null;
}

function findUserById(id) {
  return db.users.find(u => u.id === id) || null;
}

function usernameExists(username) {
  return db.users.some(u => u.username === username);
}

function createUser({ username, password, name }) {
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const user = {
    id: nextId(db.users),
    username,
    password,
    name: normalizedName ? normalizedName : username,
    avatar: '/assets/account.png',
    bio: ''
  };
  db.users.push(user);
  return user;
}

function listCategories() {
  return db.categories.slice();
}

function listTags() {
  return db.tags.slice();
}

function listItems({ page, pageSize, keyword, categoryId, tagId } = {}) {
  let list = db.items.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (keyword) {
    const q = String(keyword).trim().toLowerCase();
    if (q) {
      list = list.filter(i => (i.title || '').toLowerCase().includes(q) || (i.summary || '').toLowerCase().includes(q));
    }
  }

  if (categoryId) {
    const cid = Number(categoryId);
    if (!Number.isNaN(cid)) {
      list = list.filter(i => i.categoryId === cid);
    }
  }

  if (tagId) {
    const tid = Number(tagId);
    if (!Number.isNaN(tid)) {
      list = list.filter(i => Array.isArray(i.tagIds) && i.tagIds.includes(tid));
    }
  }

  const total = list.length;
  if (!page || !pageSize) return { total, list };

  const p = Math.max(1, Number(page) || 1);
  const ps = Math.max(1, Math.min(100, Number(pageSize) || 10));
  const start = (p - 1) * ps;
  return { total, list: list.slice(start, start + ps) };
}

function getItemById(id) {
  const nid = Number(id);
  if (Number.isNaN(nid)) return null;
  return db.items.find(i => i.id === nid) || null;
}

function createItem({ title, summary, content, authorId, categoryId, tagIds, cover }) {
  const cid = Number(categoryId);
  const item = {
    id: nextId(db.items),
    title,
    summary: summary || '',
    content: content || '',
    authorId: authorId || 1,
    categoryId: Number.isNaN(cid) ? 2 : cid,
    tagIds: Array.isArray(tagIds) ? tagIds.map(Number).filter(n => !Number.isNaN(n)) : [],
    cover: cover || '/assets/fig1.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 0,
    likeCount: 0
  };
  db.items.push(item);
  return item;
}

function updateItem(id, patch) {
  const item = getItemById(id);
  if (!item) return null;
  if (typeof patch.title === 'string') item.title = patch.title.trim();
  if (typeof patch.summary === 'string') item.summary = patch.summary.trim();
  if (typeof patch.content === 'string') item.content = patch.content;
  if (patch.categoryId !== undefined) {
    const cid = Number(patch.categoryId);
    if (!Number.isNaN(cid)) item.categoryId = cid;
  }
  if (Array.isArray(patch.tagIds)) item.tagIds = patch.tagIds.map(Number).filter(n => !Number.isNaN(n));
  if (typeof patch.cover === 'string') item.cover = patch.cover;
  item.updatedAt = new Date().toISOString();
  return item;
}

function deleteItem(id) {
  const nid = Number(id);
  const idx = db.items.findIndex(i => i.id === nid);
  if (idx === -1) return null;
  const removed = db.items.splice(idx, 1)[0];
  db.comments = db.comments.filter(c => c.itemId !== removed.id);
  db.likes = db.likes.filter(l => l.itemId !== removed.id);
  return removed;
}

function listCommentsByItemId(itemId) {
  const nid = Number(itemId);
  if (Number.isNaN(nid)) return [];
  return db.comments
    .filter(c => c.itemId === nid)
    .slice()
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

function addComment({ itemId, userId, content }) {
  const nid = Number(itemId);
  if (Number.isNaN(nid)) return null;
  const item = getItemById(nid);
  if (!item) return null;
  const c = {
    id: nextId(db.comments),
    itemId: nid,
    userId,
    content: String(content || '').trim(),
    createdAt: new Date().toISOString()
  };
  if (!c.content) return null;
  db.comments.push(c);
  return c;
}

function deleteComment({ itemId, commentId }) {
  const iid = Number(itemId);
  const cid = Number(commentId);
  if (Number.isNaN(iid) || Number.isNaN(cid)) return null;
  const idx = db.comments.findIndex(c => c.itemId === iid && c.id === cid);
  if (idx === -1) return null;
  return db.comments.splice(idx, 1)[0];
}

function listNotifications(userId) {
  const uid = Number(userId);
  if (Number.isNaN(uid)) return [];
  return db.notifications
    .filter(n => n.userId === uid)
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function markNotificationRead({ userId, notificationId }) {
  const uid = Number(userId);
  const nid = Number(notificationId);
  if (Number.isNaN(uid) || Number.isNaN(nid)) return null;
  const n = db.notifications.find(x => x.userId === uid && x.id === nid) || null;
  if (!n) return null;
  n.read = true;
  return n;
}

function isLikedByUser({ itemId, userId }) {
  const iid = Number(itemId);
  const uid = Number(userId);
  if (Number.isNaN(iid) || Number.isNaN(uid)) return false;
  return db.likes.some(l => l.itemId === iid && l.userId === uid);
}

function likeItem({ itemId, userId }) {
  const iid = Number(itemId);
  const uid = Number(userId);
  if (Number.isNaN(iid) || Number.isNaN(uid)) return null;
  const item = getItemById(iid);
  if (!item) return null;
  if (isLikedByUser({ itemId: iid, userId: uid })) return item;
  db.likes.push({ id: nextId(db.likes), itemId: iid, userId: uid, createdAt: new Date().toISOString() });
  item.likeCount += 1;
  return item;
}

function unlikeItem({ itemId, userId }) {
  const iid = Number(itemId);
  const uid = Number(userId);
  if (Number.isNaN(iid) || Number.isNaN(uid)) return null;
  const item = getItemById(iid);
  if (!item) return null;
  const idx = db.likes.findIndex(l => l.itemId === iid && l.userId === uid);
  if (idx === -1) return item;
  db.likes.splice(idx, 1);
  item.likeCount = Math.max(0, item.likeCount - 1);
  return item;
}

function listDevices({ userId, page, pageSize, keyword, type, status } = {}) {
  const uid = Number(userId);
  if (Number.isNaN(uid)) return { total: 0, list: [] };

  let list = db.devices
    .filter(d => d.ownerId === uid)
    .slice()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  if (keyword) {
    const q = String(keyword).trim().toLowerCase();
    if (q) {
      list = list.filter(d => (d.name || '').toLowerCase().includes(q) || (d.model || '').toLowerCase().includes(q));
    }
  }

  if (type) {
    const t = String(type).trim().toLowerCase();
    if (t) list = list.filter(d => String(d.type || '').toLowerCase() === t);
  }

  if (status) {
    const s = String(status).trim().toLowerCase();
    if (s) list = list.filter(d => String(d.status || '').toLowerCase() === s);
  }

  const total = list.length;
  const p = Math.max(1, Number(page) || 1);
  const ps = Math.max(1, Math.min(100, Number(pageSize) || 10));
  const start = (p - 1) * ps;
  return { total, list: list.slice(start, start + ps) };
}

function getDeviceById({ userId, id }) {
  const uid = Number(userId);
  const did = Number(id);
  if (Number.isNaN(uid) || Number.isNaN(did)) return null;
  return db.devices.find(d => d.ownerId === uid && d.id === did) || null;
}

module.exports = {
  nextId,
  getUsers,
  findUserByCredentials,
  findUserById,
  usernameExists,
  createUser,
  listCategories,
  listTags,
  listItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  listCommentsByItemId,
  addComment,
  deleteComment,
  listNotifications,
  markNotificationRead,
  isLikedByUser,
  likeItem,
  unlikeItem,
  listDevices,
  getDeviceById
};
