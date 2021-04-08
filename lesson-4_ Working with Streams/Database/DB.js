const EventEmitter = require('events');
const fs = require('fs');

class DataBase extends EventEmitter {
  constructor() {
    super();

    this.logsObject = JSON.parse(fs.readFileSync('./Database/logs.json', 'utf8'));
    this.logs = [];
    // this.logs = fs.readFile('./Database/logs.json', 'utf8', (error, data) => {
    //   if (error) {
    //     throw new Error(error);
    //   }

    //   console.log(JSON.parse(data));
    //   return JSON.parse(data);
    // });

    // fs.writeFile('./Database/logs.json', "", (error) => {
    //   if (error) {
    //     throw new Error(error);
    //   }
    // });

    this.init();
  }

  init() {
    this.on('data', (data) => {
      const log = {
        source: '?',
        payload: data.payload,
        created: new Date(),
      };

      if (!this.logsObject.logs) {
        this.logsObject.logs = [];
      }

      this.logsObject.logs.push(log);
    });

    this.on('end', () => {
      fs.writeFile('./Database/logs.json', JSON.stringify(this.logsObject, null, 4) + '\n', {flag: null}, () => {
      });
    });
  }
}

module.exports = DataBase;