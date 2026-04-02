const express = require('express');
const cors = require('cors');
const os = require('os');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

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

const ip = getIPv4() || 'localhost';

app.use(cors());
app.use(express.json());

// 暴露静态资源目录，让前端可以通过 /assets/xxx.png 访问图片
app.use('/assets', express.static(path.join(__dirname, 'assets')));

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
    data: [{
        img: `http://${ip}:${PORT}/assets/account.png`,
        title: "《从百草园到三味书屋》",
        desc:'不必说碧绿的菜畦，光滑的石井栏，高大的皂荚树，紫红的桑椹；也不必说鸣蝉在树叶里长吟，肥胖的黄蜂伏在菜花上，轻捷的叫天子（云雀）忽然从草间直窜向云霄里去了。单是周围的短短的泥墙根一带，就有无限趣味。油蛉在这里低唱，蟋蟀们在这里弹琴。翻开断砖来，有时会遇见蜈蚣；还有斑蝥，倘若用手指按住它的脊梁，便会拍的一声，从后窍喷出一阵烟雾。何首乌藤和木莲藤缠络着，木莲有莲房一般的果实，何首乌有拥肿的根。有人说，何首乌根是有像人形的，吃了便可以成仙，我于是常常拔它起来，牵连不断地拔起来，也曾因此弄坏了泥墙，却从来没有见过有一块根像人样。如果不怕刺，还可以摘到覆盆子，像小珊瑚珠攒成的小球，又酸又甜，色味都比桑椹要好得远。',
        icon: `http://${ip}:${PORT}/assets/right_grey.png`
      },{
        img: `http://${ip}:${PORT}/assets/account.png`,
        title: "《藤野先生》",
        desc:'东京也无非是这样。上野的樱花烂熳的时节，望去确也像绯红的轻云，但花下也缺不了成群结队的 “清国留学生” 的速成班，头顶上盘着大辫子，顶得学生制帽的顶上高高耸起，形成一座富士山。也有解散辫子，盘得平的，除下帽来，油光可鉴，宛如小姑娘的发髻一般，还要将脖子扭几扭。实在标致极了。',
        icon: `http://${ip}:${PORT}/assets/right_grey.png`
      }]
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  if (ip !== 'localhost') {
    console.log(`- Network: http://${ip}:${PORT}`);
  }
});
