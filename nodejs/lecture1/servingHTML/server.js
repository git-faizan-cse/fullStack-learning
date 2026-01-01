// Create a Server in NODEJS.

// 1. Import the lib/module.

const http = require('http');

// 2. Create Server.

const server = http.createServer((req,res) =>{
    console.log(req.url);
    res.write('Welcome to my application ');
    if (req.url ==='/product') {
        return res.end('Welocome to Product Page.');
    }
    else if (req.url === '/user') {
        return res.end('Welcome to User Page.');
    }
    res.end('Welcome to NodeJS Ninja server.');
});

// port no to listen client 

server.listen(3100, () => {
    console.log('Server is listening on port 3100');
});

// console.log('Server is listening on port 3100');






