const  Transform  = require('stream').Transform;

class Guardian extends Transform {
  constructor(options = {}) {
    super(options);
    this.init();
  }

  init() {
    // this.on('close', ()=>
    // {
    //    console.log('\n------ Transform on close');
    // })
    // .on('drain', ()=>
    // {
    //    console.log('\n------ Transform on drain');
    // })
    // .on('error', (err)=>
    // {
    //    console.log('\n------ Transform on error', err);
    // })
    // .on('finish', ()=>
    // {
    //    console.log('\n------ Transform on finish');
    // })
    // .on('end', ()=>
    // {
    //    console.log('\n------ Transform on end');
    // })
    // .on('pipe', ()=>
    // {
    //    console.log('\n------ Transform on pipe');
    // });
  }

  _transform(chunk, encoding, done) {
    console.log('b');
    let user = {
      meta: {
        source: 'ui',
      },
      payload: {
        name: chunk.name,
        emai: Buffer.from(chunk.email, 'utf8').toString('hex'),
        password: Buffer.from(chunk.password, 'utf8').toString('hex'),
      }
    };

    try {
      // this.push(user);
      done(null, user);
    } catch(error) {
      done(error, user);
    }
  }
}

module.exports = Guardian;