const Writable = require('stream').Writable;
const crypto = require('crypto');

const algorithm = 'aes192';
const password = '1qaZxsw2@3edcVfr4';

class AccountManager extends Writable {
  constructor(options = {}) {
    super(options);

    this.init();
    this.usersList = [];
  }

  init() {
    this.on('drain', () => {
        console.log('\n------ writable on drain');
      })
      .on('error', (err) => {
        console.log('\n------ writable on error', err);
      })
      .on('finish', () => {
        console.log('\n------ writable on finish');
        console.log(this.usersList);
      });
  }

  decrypt(data, key, iv) {
    iv = Buffer.from(iv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const encryptedData = Buffer.from(data, 'hex');
    
    return Buffer.concat([decipher.update(encryptedData), decipher.final()]).toString();
  }

  _write(chunk, encoding, done) {
    const promise = new Promise((resolve, reject) => {
        crypto.scrypt(password, 'salt', 24, (error, derivedKey) => {
          if (error) {
            throw new Error(`Nu pizdec, key hasn't been created #2`);
          }

          resolve(derivedKey);
        });
      })
      .then(key => {
        const decryptedEmail = this.decrypt(chunk.payload.email, 
          key, chunk.iv);
        const decryptedPassword = this.decrypt(chunk.payload.password,
          key, chunk.iv);
      
        chunk.payload.email = decryptedEmail;
        chunk.payload.password = decryptedPassword;

        this.usersList.push(chunk);
        done();
      })
      .catch(error => {
        console.log('\n', error);
        
        process.exit();
      });
  }
}

module.exports = AccountManager;