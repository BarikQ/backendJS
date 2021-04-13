const Writable = require('stream').Writable;
const crypto = require('crypto');

const algorithm = 'aes192';
const password = '1qaZxsw2@3edcVfr4';
const privateKey = 
`-----BEGIN CERTIFICATE-----
MIICbjCCAdcCFBFnohBn71qHZUTwIzFF8ZBKXt9zMA0GCSqGSIb3DQEBCwUAMHYx
CzAJBgNVBAYTAkJZMQ4wDAYDVQQIDAVNaW5zazEOMAwGA1UEBwwFTWluc2sxITAf
BgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDEkMCIGCSqGSIb3DQEJARYV
eWFyLmJhcmlrOTlAZ21haWwuY29tMB4XDTIxMDQxMjE4MjgzM1oXDTIxMDUxMjE4
MjgzM1owdjELMAkGA1UEBhMCQlkxDjAMBgNVBAgMBU1pbnNrMQ4wDAYDVQQHDAVN
aW5zazEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMSQwIgYJKoZI
hvcNAQkBFhV5YXIuYmFyaWs5OUBnbWFpbC5jb20wgZ8wDQYJKoZIhvcNAQEBBQAD
gY0AMIGJAoGBAKeOmGckFUImB9LkAG0VQOdAcFh05mSu+S1VlMb9RI5RI2HYY3lR
VO1+PRGVjWjY62UphoPF+IALVkmINREha+GgPvjsNKyzNBHnxn3vktfMABj8q+Vy
LoMCuU+xD8wx8L972GuVyxevYkfEUlZGejcN/Ge1moW2+zP98/alGtAzAgMBAAEw
DQYJKoZIhvcNAQELBQADgYEAUuTla9t4zLBd/qY5xHfxQjNQ256QC8v/hrxq2c87
8ReYwSyaeE649YkBYHfvoFzfTcaR6YlPSKHklt/6jncu+c92z6B477h1RoxmaF2x
WuEIu4Dq/sRo+qHg+wmO1rml/YthyGMTtOO+wm1rCx6puiN532b1ElfewqBwKYyT
PU0=
-----END CERTIFICATE-----`;

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
        // console.log(this.usersList);
      });
  }

  decrypt(data, key, iv) {
    iv = Buffer.from(iv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const encryptedData = Buffer.from(data, 'hex');
    
    return Buffer.concat([decipher.update(encryptedData), decipher.final()]).toString();
  }

  _write(chunk, encoding, done) {
    const verify = crypto.createVerify('RSA-SHA256');
    const user = {...chunk};
    delete user.signature;
    console.log(JSON.stringify(user));
    verify.update(JSON.stringify(user));
    verify.end();
    console.log(verify.verify(privateKey, chunk.signature));

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