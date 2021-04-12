const Transform = require('stream').Transform;
const crypto = require('crypto');

const algorithm = 'aes192';
const password = '1qaZxsw2@3edcVfr4';

class Guardian extends Transform {
  constructor(options = {}) {
    super(options);
    this.init();
  }

  init() {
    // this.key = crypto.scryptSync(password, 'salt', 24);
    // this.iv = crypto.randomBytes(16);

    // this.cipher = crypto.createCipheriv(algorithm, this.key, this.iv);
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
    // this.cipher.on('readable', () => {
    //   let data = this.cipher.read();
    //   this.encrypted = data.toString('hex');
    //   console.log('EVENT', data, data.toString('hex'));
    // });

    // this.cipher.on('end', () => {
    //   console.log('END', this.encrypted);
    // });
  }

  encrypt(data, key, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    return Buffer.concat([cipher.update(data), cipher.final()]);
  }

  _transform(chunk, encoding, done) {
    const iv = crypto.randomBytes(16);

    const promise = new Promise((resolve, reject) => {
        crypto.scrypt(password, 'salt', 24, (error, derivedKey) => {
          if (error) {
            throw new Error(`Nu pizdec, key hasn't been created`);
          }

          resolve(derivedKey);
        });
      })
      .then(key => {
        const encryptedEmail = this.encrypt(chunk.email, key, iv).toString('hex');
        const encryptedPassword = this.encrypt(chunk.password, key, iv).toString('hex');

        let user = {
          meta: {
            source: 'ui',
          },
          iv: iv.toString('hex'),
          payload: {
            name: chunk.name,
            email: encryptedEmail,
            password:  encryptedPassword,
          },
        };

        try {
          console.log('SENDING...', user);
          done(null, user);
        } catch (error) {
          done(error, user);
        }
      })
      .catch(error => {
        console.error(error.name);
      });
  }
}

module.exports = Guardian;