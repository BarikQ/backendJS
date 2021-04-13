const Transform = require('stream').Transform;
const crypto = require('crypto');

const algorithm = 'aes192';
const password = '1qaZxsw2@3edcVfr4';
const privateKey = 
`-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCnjphnJBVCJgfS5ABtFUDnQHBYdOZkrvktVZTG/USOUSNh2GN5
UVTtfj0RlY1o2OtlKYaDxfiAC1ZJiDURIWvhoD747DSsszQR58Z975LXzAAY/Kvl
ci6DArlPsQ/MMfC/e9hrlcsXr2JHxFJWRno3DfxntZqFtvsz/fP2pRrQMwIDAQAB
AoGBAIPaXmurpV7sdnOqH/u3Id/YgY/aTgMk/ciC9BSy8OPdTa6NjZnGOsK4+G2B
9klvia2Nw+CmRSrdwQUUPk5AspcP5bMSviSHyvnh1CWjIFrAakWErZhh75hKJBJP
N0atac4UNZEP6FQMu6JozLsgLcRNOjiyh57+JS1gkv2uZc2hAkEA3COFa+1diA+m
6HUc+zCR74B2ZOVrSd696zDlbb+YNQ9ghavgxEwv0JmnWXoCU3iKZuWdPMj7qdDr
q9LqPrf6DwJBAMLaQANSA92v/tbSbH6R5cF4R2aTwqcwmu35GBp7ZlaqZJc0rUK+
9ecqFTTmuUS/iFdvZcKKkTr9ycWCSmcLO50CQDtfqUCuyKdF8XKJA8QMGZBLSaN0
7TcDSJ4Clh6/qkHFX/ctoHXRRqQwjR5o9e+ld07BZ2NZoebvXmD9hghcfqkCQBf6
hcAi2qjwXJsRIBrfV3fclmTQMDck6xv3+Hhh0TE/HMvixqOdHmPJMPzmm8wTCfNA
mTQ8myy4SJlOtFtD7Z0CQFw6NihPC5umrsPI1jCtlyhxmHpOlxOlgnKJG1iGOIoW
JwFLAui13e28rpzbvc6huAVYSmBX2aGJmgh18/PjtZI=
-----END RSA PRIVATE KEY-----`;

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

        return user;
      })
      .then(user => {
        const sign = crypto.createSign('RSA-SHA256');
        console.log(JSON.stringify(user));
        sign.update(JSON.stringify(user));
        sign.end();
        user.signature = sign.sign(privateKey, 'hex');
        // console.log(user);

        try {
          // console.log('SENDING...', user);
          done(null, user);
        } catch (error) {
          done(error, user);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

module.exports = Guardian;