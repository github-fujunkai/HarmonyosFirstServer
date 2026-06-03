const express = require('express');
const cors = require('cors');
const path = require('path');

const { getIPv4 } = require('./lib/network');
const { normalizeLegacyParams } = require('./middleware/normalizeLegacyParams');
const { registerRoutes } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3333;

const ip = getIPv4() || 'localhost';

app.use(cors());
app.use(express.json());
app.use(normalizeLegacyParams);

app.use('/assets', express.static(path.join(__dirname, 'assets')));
registerRoutes(app);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  if (ip !== 'localhost') {
    console.log(`- Network: http://${ip}:${PORT}`);
  }
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`[EADDRINUSE] 端口 ${PORT} 已被占用。`);
    console.error(`- 解决办法 1：停止占用该端口的进程（Windows: netstat -ano | findstr :${PORT} 然后 taskkill /PID <PID> /F）`);
    console.error(`- 解决办法 2：换一个端口启动（PowerShell: $env:PORT=3334; npm run dev）`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
