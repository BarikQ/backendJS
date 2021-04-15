const Filter = require('./filter');
const net = require('net');
const fs = require('fs');

const server = net.createServer();
const PORT = 8080;

let usersBase = 0;
let filter = 0;

server.on('connection', (socket) => {
  socket.on('data', (msg) => {

    let filtred = filter.filter(JSON.parse(msg.toString()));
    console.log(filtred, '\n', filtred.length);
    socket.write(JSON.stringify(filtred));

  });

  socket.on('end', () => {
    console.log('User is disconnected');
  });

  socket.on('error', (error) => {
    console.log(error);
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
    fs.readFile('users.json', 'utf8', (error, data) => {
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
