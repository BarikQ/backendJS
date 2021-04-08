const Transform = require('stream').Transform;

class Decryptor extends Transform {
  constructor(options) {
    super(options);
  
    this.init();
  }

  init() {
    console.log("DECRYPTOR init");

    this.on('finish', () => {
      console.log('\n------ DECRYPTOR on finish');
    });
  }

  _transform(chunk, encoding, done) {
    try {
      const algorithm = chunk.meta.algorithm;
      let newObject = {
        name: chunk.payload.name,
      };

      switch (algorithm) {
        case 'hex':
          newObject.email = Buffer.from(chunk.payload.email, algorithm).toString('utf8');
          newObject.password = Buffer.from(chunk.payload.password, algorithm).toString('utf8');
        break;
        case 'base64':
          newObject.email = Buffer.from(chunk.payload.email, algorithm).toString('utf8');
          newObject.password = Buffer.from(chunk.payload.password, algorithm).toString('utf8');
        break;
      }

      done(null, newObject);
    } catch(error) {
      done(error, chunk);
    }
  }
}

module.exports = Decryptor;