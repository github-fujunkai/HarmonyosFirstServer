下面是启动服务的命令（Windows 环境）：

- 进入项目目录
  - cd d:\Project\HarmonyOS\node_server
- 安装依赖（首次或依赖变化时）
  - npm install
- 启动服务
  - npm start

可选：修改端口
- PowerShell
  - $env:PORT=4000; npm start
- CMD
  - set PORT=4000 && npm start

访问地址
- 本机: http://localhost:3000/
- 局域网: http://你的IP:3000/（示例: http://192.168.1.77:3000/）

快速验证
- PowerShell: Invoke-RestMethod -Uri http://localhost:3000/api/home
- curl: curl http://localhost:3000/api/home

相关文件
- [package.json](file:///d:/Project/HarmonyOS/node_server/package.json)
- [server.js](file:///d:/Project/HarmonyOS/node_server/src/server.js)

停止服务：在运行窗口按 Ctrl+C。