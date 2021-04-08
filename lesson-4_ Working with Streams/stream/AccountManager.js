const Writable = require('stream').Writable;

class AccountManager extends Writable {
  constructor(options = {}) {
    super(options);

    this.init();
    this.usersList = [];
  }

  init() {
    this.on('drain', ()=>
    {
       console.log('\n------ writable on drain');
    })
    .on('error', (err)=>
    {
       console.log('\n------ writable on error', err);
    })
    .on('finish', ()=>
    {
       console.log('\n------ writable on finish');
       console.log(this.usersList);
    });
  }

  _write(chunk, encoding, done) {
    console.log('c');

    this.usersList.push(chunk);
    done();
  }
}

module.exports = AccountManager;