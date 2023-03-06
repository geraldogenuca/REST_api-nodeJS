require('dotenv').config();

const http = require('http');
const { listen } = require('./app');
const app = require('./app');
const port = process.env.HOST_PORT || 4001;
const server = http.createServer(app);

server.listen(port, () => console.log(`APP funfando in PORT : ${port} !`))