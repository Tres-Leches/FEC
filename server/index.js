const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router');

const server = express();
const port = 8000;

server.use('/', expressStaticGzip(path.join(__dirname, '../client/dist'), {
  enableBrotli: true,
}));
server.use(express.static(path.join(__dirname, '../client/dist')));
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use('/api', router);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
