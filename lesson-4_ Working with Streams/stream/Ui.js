const Readable = require('stream').Readable;

class Ui extends Readable {
  constructor(customers, options = {}) {
    super(options);

    this.customersList = customers;
    this.init();
  }

  init() {
    this.on('data', chunk => {
      console.log("--DATA--");  
    });
  }

  _read() {
    console.log('a');
    let data = this.customersList.shift();
    
    if (!data) {
       //сообщаем, что данные закончились
       this.push(null);
    } else {
       this.push(data);
    }
  }
}

module.exports = Ui;