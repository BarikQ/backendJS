const { Convert, Filter, Archiever } = require('./tools/index.js');
const { pipeline } = require('stream');
const zlib = require('zlib');
const net = require('net');
const fs = require('fs');

const server = net.createServer();
const PORT = 8080;

let usersBase = 0;
let filter = 0;

server.on('connection', (socket) => {
  socket.on('data', (msg) => {

    let object = JSON.parse(msg.toString());
    let filtred = filter.filter(object.filter);

    const converter = new Convert({ objectMode: true }, object.meta);
    let gzip;

    if (object.meta.archive === true) {
      gzip = zlib.createGzip();
    } else {
      gzip = socket;
    }

    pipeline(filtred, converter, gzip, socket, error => {
      if (error) {
        console.log('PIZDEC');
        throw new Error(error);
      }
    });

  });

  socket.on('end', () => {
    console.log('User is disconnected');
  });

  socket.on('error', (error) => {
    throw new Error(error);
  });
});

server.on('listening', () => {
  console.log('Server started!');
});

server.on('close', () => {
  console.log('Server closed');
});

server.on('error', (error) => {
  console.error(error);
});

(async function() {
  let readUsersBase = new Promise((resolve, reject) => {
    fs.readFile('./data/users.json', 'utf8', (error, data) => {
      if (error) {
        throw new Error(error);
      }

      console.log("Read");
      resolve(JSON.parse(data));
    });
  });

  readUsersBase
  .then(data => {
    usersBase = data;
    filter = new Filter(usersBase);

    server.listen(PORT);
  });
})();
