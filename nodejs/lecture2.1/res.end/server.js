const http = require("http");

const server = http.createServer((req, res) => {

    res.write('This is coming from nodejs server\n');

    if (req.url === '/first') {
      return res.end('This is the first response\n');    
    }

    res.end('This is default response!\n');
    
});

server.listen(3100, (req, res) => {
  console.log('Server is listening on port 3100');
});