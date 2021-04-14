const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

class Archiver {
  constructor() {

  }

  archive(filename) {
    // console.log('11111111111111111111111');

    const gzip = zlib.createGzip();
    const readStream = fs.createReadStream(filename);
    let writeStream = fs.createWriteStream(`${filename}.gz`);

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

    {
    // readStream.pipe(gzip).pipe(writeStream).on('finish', () => {
    //   console.log('zapisano');

    //   return `${filename}.gz`;
    // });

    // async function arch() {
    //   try {
    //     await pipelineAsync(
    //       readStream,
    //       gzip,
    //       writeStream
    //     );

    //     return `${filename}.gz`; 
    //   }

    //   catch (error) {
    //     console.error("Pipeline is fucked", error);
    //   }
    // }

    // arch().then(file => {
    //   console.log('GFDSHS', file);
    // });

    // return `${filename}.gz`;
    }
  }

  extract(archiveFile, extractFile) {
    const readStream = fs.createReadStream(archiveFile);
    let writeStream = fs.createWriteStream(extractFile);
    const unArch = zlib.createGunzip();

    const unzipPromise = new Promise((resolve, reject) => {
      (async function arch() {
        try {
          await pipelineAsync(
            readStream,
            unArch,
            writeStream
          );

          resolve(extractFile);
        }
  
        catch (error) {
          // console.error("Pipeline is 4tenie", error);
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