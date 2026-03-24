const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const USERS = [
  { id: 1, username: 'admin', password: '123456', name: '管理员' },
  { id: 2, username: 'user', password: '123456', name: '普通用户' }
];

const ITEMS = [
  { id: 1, title: '示例一', summary: '这是第一个示例', content: '示例一的详细内容' },
  { id: 2, title: '示例二', summary: '这是第二个示例', content: '示例二的详细内容' },
  { id: 3, title: '示例三', summary: '这是第三个示例', content: '示例三的详细内容' }
];

app.get('/', (req, res) => {
  res.json({
    code: 200,
    message: 'ok',
    data: {
      service: 'node_server',
      endpoints: [
        'GET /api/home',
        'POST /api/login',
        'GET /api/items',
        'GET /api/items/:id'
      ]
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) {
    res.status(401).json({ code: 401, message: '用户名或密码错误' });
    return;
  }
  const token = 'demo-token-' + user.id;
  res.json({
    code: 200,
    message: 'ok',
    data: {
      token,
      user: { id: user.id, username: user.username, name: user.name }
    }
  });
});

app.get('/api/home', (req, res) => {
  res.json({
    code: 200,
    message: 'ok',
    data: {
      title: '首页',
      message: '欢迎使用 Node.js 示例后端',
      time: new Date().toISOString()
    }
  });
});

app.get('/api/items', (req, res) => {
  res.json({
    code: 200,
    message: 'ok',
    data: {
      total: ITEMS.length,
      list: ITEMS.map(i => ({ id: i.id, title: i.title, summary: i.summary }))
    }
  });
});

app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = ITEMS.find(i => i.id === id);
  if (!item) {
    res.status(404).json({ code: 404, message: '未找到该条目' });
    return;
  }
  res.json({
    code: 200,
    message: 'ok',
    data: item
  });
});

function getIPv4() {
  const ifs = os.networkInterfaces();
  for (const name of Object.keys(ifs)) {
    for (const iface of ifs[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

app.listen(PORT, '0.0.0.0', () => {
  const ip = getIPv4();
  console.log(`Server listening on:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  if (ip) {
    console.log(`- Network: http://${ip}:${PORT}`);
  }
});
