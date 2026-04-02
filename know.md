下面是启动服务的命令（Windows 环境）：

为了让 Node.js 服务在修改代码后能够自动更新重启，我们通常使用 nodemon 这个工具
。我已经为你配置好了。


"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
现在服务正在通过 nodemon 运行。
你可以尝试在 server.js 中随意修改一点内容并保存文件，保存后你会在终端看到 nodemon 自动检测到了文件变动并为你重启了服务！



直接运行   npm run dev








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