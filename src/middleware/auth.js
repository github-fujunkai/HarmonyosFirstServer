const { getUsers, findUserById } = require('../data/store');

function parseBearerToken(req) {
  const header = req.headers.authorization || '';
  const m = /^Bearer\s+(.+)$/i.exec(header);
  return m ? m[1] : null;
}

function authUserFromToken(token) {
  if (!token) return null;
  const m = /^demo-token-(\d+)$/.exec(token);
  if (!m) return null;
  const userId = Number(m[1]);
  if (Number.isNaN(userId)) return null;
  return findUserById(userId) || null;
}

function requireAuth(req, res) {
  const token = parseBearerToken(req) || (req.body && req.body.token) || null;
  const user = authUserFromToken(token);
  if (!user) {
    res.status(401).json({ code: 401, message: '未登录或 token 无效' });
    return null;
  }
  return user;
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    avatar: user.avatar || '/assets/account.png',
    bio: user.bio || ''
  };
}

function listPublicUsers() {
  return getUsers().map(publicUser);
}

module.exports = {
  parseBearerToken,
  authUserFromToken,
  requireAuth,
  publicUser,
  listPublicUsers
};
