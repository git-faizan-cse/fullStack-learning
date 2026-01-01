const express = require('express');

// create a express server 
const server = express();

// listen for default request / handle default request 

server.get('/', (req, res) => {
    res.send('Well Come to Express Server');
}); 

server.post('/', (req, res) => {
    res.status(201).send('This is a post request');
});

server.put('/', (req, res) => {
    res.send('This is a put request');
});

server.delete('/', (req, res) => {
    res.send('This is a delete request');
});

// listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});