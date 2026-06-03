# node_server 接口文档（本地学习版）

## 启动服务（Windows）

```powershell
cd d:\Project\LearningOS\node_server
npm install
npm run dev
```

默认端口：`3333`（可通过环境变量覆盖）

```powershell
$env:PORT=3334; npm run dev
```

访问地址：
- 本机：http://localhost:3333/
- 局域网：http://你的IP:3333/

快速验证：

```powershell
Invoke-RestMethod -Uri http://localhost:3333/
Invoke-RestMethod -Uri http://localhost:3333/api/home
```

相关文件：
- [package.json](file:///d:/Project/LearningOS/node_server/package.json)
- [server.js](file:///d:/Project/LearningOS/node_server/src/server.js)

## 通用约定

基础返回结构：

```json
{ "code": 200, "message": "ok", "data": {} }
```

鉴权方式：
- 登录成功会返回 `token`，形如：`demo-token-1`
- 推荐请求头：`Authorization: Bearer <token>`
- 兼容：部分接口也支持在 body 里传 `token`

## 默认账号（可直接登录）

- admin / 123456
- user / 123456
- zhangsan / 123456
- lisi / 123456
- wangwu / 123456

## 接口一览

### 根路径

#### GET /
返回服务信息与接口列表。

```bash
curl http://localhost:3333/
```

### 认证与用户

#### POST /api/login
body：

```json
{ "username": "admin", "password": "123456" }
```

返回示例（data）：

```json
{ "token": "demo-token-1", "user": { "id": 1, "username": "admin", "name": "管理员" } }
```

```bash
curl -X POST http://localhost:3333/api/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"123456\"}"
```

#### POST /api/logout

```bash
curl -X POST http://localhost:3333/api/logout
```

#### POST /api/register
body：

```json
{ "username": "newuser", "password": "123456", "name": "新用户" }
```

```bash
curl -X POST http://localhost:3333/api/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"newuser\",\"password\":\"123456\",\"name\":\"新用户\"}"
```

#### GET /api/me（需要登录）

```bash
curl http://localhost:3333/api/me -H "Authorization: Bearer demo-token-1"
```

### 首页

#### GET /api/home

```bash
curl http://localhost:3333/api/home
```

### 内容（Items）

#### GET /api/items
query（可选）：
- `page`、`pageSize`：分页（不传则返回全部）
- `keyword`：标题/摘要搜索
- `categoryId`：分类过滤
- `tagId`：标签过滤

```bash
curl "http://localhost:3333/api/items?page=1&pageSize=10&keyword=API"
```

#### GET /api/items/:id
说明：返回更完整的详情结构（包含 author/category/tags 等字段），并会自增 `viewCount`。

```bash
curl http://localhost:3333/api/items/1
```

#### POST /api/items（需要登录）
body（常用字段）：

```json
{
  "title": "标题",
  "summary": "摘要",
  "content": "正文",
  "categoryId": 2,
  "tagIds": [3, 4],
  "cover": "/assets/fig1.png"
}
```

```bash
curl -X POST http://localhost:3333/api/items ^
  -H "Authorization: Bearer demo-token-1" ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"新文章\",\"summary\":\"摘要\",\"content\":\"正文\",\"categoryId\":2,\"tagIds\":[3,4]}"
```

#### POST /api/items/:id（需要登录）
用于更新（body 传需要变更的字段即可）。

```bash
curl -X POST http://localhost:3333/api/items/1 ^
  -H "Authorization: Bearer demo-token-1" ^
  -H "Content-Type: application/json" ^
  -d "{\"summary\":\"更新后的摘要\"}"
```

#### POST /api/items/:id/delete（需要登录）

```bash
curl -X POST http://localhost:3333/api/items/1/delete -H "Authorization: Bearer demo-token-1"
```

#### GET /api/items/:id/comments

```bash
curl http://localhost:3333/api/items/1/comments
```

#### POST /api/items/:id/comments（需要登录）
body：

```json
{ "content": "写得很好，学习了" }
```

```bash
curl -X POST http://localhost:3333/api/items/1/comments ^
  -H "Authorization: Bearer demo-token-1" ^
  -H "Content-Type: application/json" ^
  -d "{\"content\":\"写得很好，学习了\"}"
```

#### POST /api/items/:id/comments/:commentId/delete（需要登录）

```bash
curl -X POST http://localhost:3333/api/items/1/comments/10/delete -H "Authorization: Bearer demo-token-1"
```

#### POST /api/items/:id/like（需要登录）

```bash
curl -X POST http://localhost:3333/api/items/1/like -H "Authorization: Bearer demo-token-1"
```

#### POST /api/items/:id/unlike（需要登录）

```bash
curl -X POST http://localhost:3333/api/items/1/unlike -H "Authorization: Bearer demo-token-1"
```

#### GET /api/items/:id/related

```bash
curl http://localhost:3333/api/items/1/related
```

### 分类与标签

#### GET /api/categories

```bash
curl http://localhost:3333/api/categories
```

#### GET /api/tags

```bash
curl http://localhost:3333/api/tags
```

### 通知（Notifications）

#### GET /api/notifications（需要登录）

```bash
curl http://localhost:3333/api/notifications -H "Authorization: Bearer demo-token-1"
```

#### POST /api/notifications/:id/read（需要登录）

```bash
curl -X POST http://localhost:3333/api/notifications/1/read -H "Authorization: Bearer demo-token-1"
```

## 常见问题

- 端口占用：`[EADDRINUSE]` 时换端口启动：`$env:PORT=3334; npm run dev`
- 鉴权失败：检查是否带了 `Authorization: Bearer demo-token-xxx`
