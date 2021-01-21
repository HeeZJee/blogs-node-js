const http = require("http");

const host = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req);
  console.log(res);
  console.log("request made");
});

server.listen(port, host, () => {
  console.log(`listening http://${host}:${port}`);
});
