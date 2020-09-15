const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  console.log(req.url);
  res.setHeader("Content-Type", "text/plain;utf8");
  res.end("你好世界\n");
});

server.listen(port, () => {
  console.log("服务器正在运行");
});
