const {
  Ui,
  AccountManager,
  Guardian,
  Logger,
  Decryptor
} = require('./stream');

const rsOptions = {
  objectMode: true,
};
const wsOptions = {
  objectMode: true,
};
const tsOptions = {
  readableObjectMode: true,
  writableObjectMode: true,
  decodeStrings: false,
};

const customers = [{
    name: "Pitter Black",
    email: 'pblack@gmail.com',
    password: 'pblack_22',
  },
  {
    name: "Oliver White",
    email: 'owhite@gmail.com',
    password: 'owhite_33',
  },
];

const customers2 = [{
  payload: {
    name: 'Pitter Black',
    email: '70626c61636b40656d61696c2e636f6d',
    password: '70626c61636b5f313233'
  },
  meta: {
    algorithm: 'hex'
  }
}];

console.log("USERS", customers, '\n');
const ui = new Ui(customers, rsOptions);
const guardian = new Guardian(tsOptions);
const manager = new AccountManager(wsOptions);

ui.pipe(guardian).pipe(manager);