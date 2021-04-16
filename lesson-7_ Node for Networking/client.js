const net = require('net');

const client = new net.Socket();
const PORT = 8080;
const filter = {
  filter: {
    // id: 0,
    name: {
      first: 'J',
      last: 'a',
    },
    email: '@gmail.com',
  },
  meta: {
    format: 'json',
    archive: false,
  }
};

client.connect(PORT, () => {
  console.log('Connecting...');
});

client.on('connect', () => {
  console.log('Connected!');
  client.write(JSON.stringify(filter));
});

client.on('close', () => {
  console.log('Disconected');
});

client.on('error', (error) => {
  console.error(error);
});

client.on('data', (data) => {
  console.log(data.toString());
});

let timeout = setTimeout(() => client.end(), 5000);