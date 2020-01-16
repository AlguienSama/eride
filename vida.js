const http = require('http');

const port = process.env.PORT || 8000;

http.createServer(function (req, res) {
  res.write("Éride live");
  res.end();
}).listen(port);
