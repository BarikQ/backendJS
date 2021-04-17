const {
  Ui,
  AccountManager,
  Guardian,
  Logger,
  Decryptor
} = require('./stream');

function toHex(str, hex) {
  try {
    hex = unescape(encodeURIComponent(str)).split('').map(function (v) {
      return v.charCodeAt(0).toString(16);
    }).join('');
  } catch (e) {
    hex = str;
    console.log('invalid text input: ' + str);
  }
  return hex;
}

function fromHex(hex, str) {
  try {
    str = decodeURIComponent(hex.replace(/(..)/g, '%$1'));
  } catch (e) {
    str = hex;
    console.log('invalid hex input: ' + hex);
  }
  return str;
}

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


const ui = new Ui(customers, rsOptions);
const guardian = new Guardian(tsOptions);
const logger = new Logger(tsOptions);
const manager = new AccountManager(wsOptions);

const decryptor = new Decryptor(tsOptions);
const ui2 = new Ui(customers2, rsOptions);

// ui.pipe(guardian).pipe(logger).pipe(manager);
ui2.pipe(decryptor).pipe(manager);