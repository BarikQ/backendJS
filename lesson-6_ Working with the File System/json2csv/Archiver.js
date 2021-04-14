const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

class Archiver {
  constructor() {

  }

  archive(filename, algorithm) {
    const readStream = fs.createReadStream(filename);
    let writeStream = fs.createWriteStream(`${filename}.gz`);
    let gzip;

    switch (algorithm.algorithm) {
      case ('deflate'):
        gzip = zlib.createDeflate();
        console.log('DEFLATE');
      break;
      case ('gzip'):
        gzip = zlib.createGzip();
        console.log('GZIP');
      break;
      default:
        throw new Error('Wrong compression algorithm!');
    }

    const zipPromise = new Promise((resolve, reject) => {
      async function arch() {
        try {
          await pipelineAsync(
            readStream,
            gzip,
            writeStream
          );
  
          resolve(`${filename}.gz`);
        }
  
        catch (error) {
          reject('OSHIBKA V ARCH');
        }
      }

      arch();
    });

    zipPromise.then(file => {
      return file;
    })
    .catch(err => {
      console.error(err);
    });

    return zipPromise;
  }

  extract(archiveFile, extractFile, algorithm) {
    const readStream = fs.createReadStream(archiveFile);
    let writeStream = fs.createWriteStream(extractFile);
    let unzip = zlib.createUnzip();

    const unzipPromise = new Promise((resolve, reject) => {
      (async function arch() {
        try {
          await pipelineAsync(
            readStream,
            unzip,
            writeStream
          );

          resolve(extractFile);
        }
  
        catch (error) {
          reject(error);
        }
      })();
    });
  
    unzipPromise
    .then(fileName => {
      return fileName;
    })
    .catch(error => {
      console.error(error);
    });

    return unzipPromise;
  }
}

module.exports = Archiver;