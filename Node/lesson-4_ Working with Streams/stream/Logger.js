const Transform = require('stream').Transform;
const DataBase = require('./../Database/DB');

const db = new DataBase();

class Logger extends Transform {
  constructor(options) {
    super(options);

    this.init();
  }

  init() {
    console.log("--LOGGER INIT--");

    this.on('finish', () => {
      console.log('\n------ LOGGER on finish');
      db.emit('end');
    });

    // this.on('close', ()=>
    // {
    //    console.log('\n------ LOGGER on close');
    // })
    // .on('drain', ()=>
    // {
    //    console.log('\n------ LOGGER on drain');
    // })
    // .on('error', (err)=>
    // {
    //    console.log('\n------ LOGGER on error', err);
    // })
    // .on('finish', ()=>
    // {
    //    console.log('\n------ LOGGER on finish');
    //    db.emit('end');
    // })
    // .on('end', ()=>
    // {
    //    console.log('\n------ LOGGER on end');
    // })
    // .on('pipe', ()=>
    // {
    //    console.log('\n------ LOGGER on pipe');
    // });
  }

  _transform(chunk, encoding, done) {
    console.log('--LOGGER--');
    db.emit('data', chunk);

    try {
      done(null, chunk);
    } 
    catch(error) {
      done(error, chunk);
    }
  }
}

module.exports = Logger;