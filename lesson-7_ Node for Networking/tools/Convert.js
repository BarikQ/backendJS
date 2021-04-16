const os = require("os");
const { Transform } = require('stream');

class Convert extends Transform {
  constructor(options, meta) {
    super(options);
    this.meta = meta;
    this.times = 0;
  }

  init() {
  }

  _transform(chunk, encoding, done) {
    let file = '';

    if (this.meta.format !== 'csv') {
      file = chunk;
      
      try {
        done(null, JSON.stringify(file));
        return;
      }
      catch (error) {
        done(error, JSON.stringify(file));
        return;
      }
    }

    if (this.times === 0) {
      for (let key in chunk) {
        file += key + ';';
      }
      file += os.EOL;
    }
    this.times++;

    for (let key in chunk) {
      file += JSON.stringify(chunk[key]) + ';';
    }  
    file += os.EOL;

    try {
      done(null, JSON.stringify(file));
    }
    catch (error) {
      done(error, JSON.stringify(file));
    }
  }
}

module.exports = Convert;