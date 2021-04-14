const fs = require("fs");
const os = require("os");

// const Archiver = require('./Archiver');
// const archiver = new Archiver();
// archiver.archive('ky');

class Converter {
  constructor(allowedFields) {
    this.fields = allowedFields;
  }

  convert(filename, newFilename, options) {
    const readFile = new Promise((resolve, reject) => {
        fs.readFile(filename, options, (error, data) => {
          if (error) {
            reject(error);
          }

          resolve(data);
        });
    })
    
    .then((data) => {
      let dataArray = JSON.parse(data);
      let newFile = ``;

      for (let prop in dataArray[0]) {
        if (!this.fields.includes(prop)) {
          continue;
        }

        newFile += prop + ";";
      }
      newFile += os.EOL;

      for (let index = 0; index < dataArray.length; index++) {
        let element = dataArray[index];

        for (let prop in element) {
          if (!this.fields.includes(prop)) {
            continue;
          } 

          if (typeof element[prop] == "string") {
            let str = element[prop].replace(/(?:\r\n|\r|\n)/g, `\\n`);
            newFile += str + ';';
          } else {
            newFile += element[prop] + ";";
          }
        }
        newFile += os.EOL;
      }

      return newFile;
    })

    .then((data) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(newFilename, data, options, (error) => {
          if (error) {
            reject(error);
          }
  
          resolve(newFilename);
        });
      });
    })

    .then((fileDestination) => {
      console.log("CSV WAS CREATED");

      return fileDestination;
    })

    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });

    return readFile;
  }
}

module.exports = Converter;