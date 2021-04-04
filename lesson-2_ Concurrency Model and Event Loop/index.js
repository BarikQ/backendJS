class TimersManager {

  constructor() {
    this.timers = [];
    this.state = 0;
    this.logs = [];
  }

  checkParameters(timerParameters) {
    if (this.state) {
      throw Error("Timers already started!");
    }

    if (!timerParameters.name || typeof timerParameters.name != "string") {
      throw Error("Wrong type: name field");
    }

    if (!timerParameters.delay || typeof timerParameters.delay != "number") {
      throw Error("Wrong type: delay field");
    }

    if (timerParameters.interval == undefined || typeof timerParameters.interval != "boolean") {
      throw Error("Wrong type: interval field");
    }

    if (!timerParameters.job || typeof timerParameters.job != "function") {
      throw Error("Wrong type: job field");
    }

    if (timerParameters.delay < 0 || timerParameters.delay > 5000) {
      throw Error("Wrong value: delay field");
    }

    this.timers.forEach(timer => {
      if (timer.parameters === timerParameters) {
        throw Error("This timer already exist");
      }
    });
  }

  add(timerParameters, ...args) {
    console.log(`ADD ${timerParameters.name}`);

    this.checkParameters(timerParameters);

    let timerObject = {
      timer: setTimeout(() => {
          timerParameters.job(args[0], args[1]);
      },timerParameters.delay),

      parameters: timerParameters,
      startTime: 0,
      remainingTime: timerParameters.delay,
      arguments: args,
    }

    clearTimeout(timerObject.timer);

    this._log(timerParameters, args, "Timer created", new Date());
    this.timers.push(timerObject);

    return this;
  }

  remove(timerTarget) {
    console.log(`REMOVE ${timerTarget.name}`);

    let timerIndex = null;
    let currentTimer = null;

    this.timers.forEach(timer => {
      if (timer.parameters.name === timerTarget.name) {
        currentTimer = timer;
      }
    });

    if (this.getTimerIndex(timerTarget) > -1) {
      this.timers.splice(timerIndex, 1);
    }

    this._log(timerTarget, currentTimer.arguments, "Timer was removed", new Date());

    return this;
  }

  start() {
    console.log("START");
    this.state = 1;

    this.timers.forEach(timer => {
      timer.startTime = Date.now();

      timer.timer = setTimeout(() => {
        try {
          timer.parameters.job(timer.arguments[0], timer.arguments[1]);

          this._log(timer.parameters, 
            timer.arguments, 
            timer.parameters.job(timer.arguments[0], timer.arguments[1]), 
            new Date());
        
        } catch (error) {
          this._log(timer.parameters, 
            timer.arguments, 
            error, 
            new Date());
        }

      }, timer.remainingTime);

      console.log(timer.parameters.name, timer.remainingTime);
    });
  }
  
  stop() {
    console.log("STOP");
    this.state = 0;

    this.timers.forEach(timer => {
      timer.remainingTime = timer.parameters.delay - (Date.now() - timer.startTime);
      console.log(timer.parameters.name, timer.remainingTime);
      clearTimeout(timer.timer);
    });
  }
 
  pause(timerTarget) {
    console.log(`PAUSE ${timerTarget.name}`);

    this.timers.forEach(timer => {
      if (timerTarget === timer.parameters) {
        timer.remainingTime = timer.parameters.delay - (Date.now() - timer.startTime);
        this._log(timer.parameters, timer.arguments, "Timer is paused", new Date());
        
        clearTimeout(timer.timer);

        console.log(timer.parameters.name, timer.remainingTime);
      }
    });

    return this;
  }
 
  resume(timerTarget) {
    console.log(`RESUME ${timerTarget.name}`);

    this.timers.forEach(timer => {
      timer.startTime = Date.now();

      if (timerTarget === timer.parameters) {
        timer.timer = setTimeout(() => {
          try {

            timer.parameters.job(timer.arguments[0], timer.arguments[1]);
            this._log(timer.parameters, 
              timer.arguments, 
              timer.parameters.job(timer.arguments[0], timer.arguments[1]), 
              new Date());
              
          } catch (error) {
            this._log(timer.parameters, 
              timer.arguments, 
              error, 
              new Date());
          }
        }, 
        timer.remainingTime);
      }
 
      console.log(timer.parameters.name, timer.remainingTime);
    });

    return this;
  }

  _log(timerTarget, args, state, date) {
    const newLog = {
      name: timerTarget.name,
      in: args,
      out: state,
      created: date,
    };
    let isNew = true;

    if (newLog.out != undefined) {
        if (newLog.out.toString().includes("Error")) {
        newLog.out = {
          name: newLog.out.name,
          message: newLog.out.message,
          stack: newLog.out.stack,
        };
      }
    }

    this.logs.forEach((log, index) => {
      if (log.name === newLog.name) {
        if (newLog.out == undefined) {
          newLog.out = null;
        }
        log.out = newLog.out;
        log.date = new Date();
        isNew = false;
      }
    })

    if (isNew) this.logs.push(newLog);
    this.logs.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });
  }

  print() {
    console.log(this.logs);
  }

  getTimerIndex(timerTarget) {
    let timerIndex = -1;

    this.timers.forEach((timer, index) => {
      if (timerTarget === timer.parameters) {
        timerIndex = index;
        clearTimeout(timer.timer);
      }
    });
    
    return timerIndex;
  }

  destroyTimers() {
    let longestTimerDelay = null;
    let longestTimer = null;
    const destroyDelay = 10000;

    if (this.timers.length != 0) {
      longestTimerDelay = this.timers[0].parameters.delay;
      longestTimer = this.timers[0].timer;

      this.timers.forEach(timer => {
        if (timer.parameters.delay > longestTimerDelay) {
          longestTimerDelay = timer.parameters.delay;
          longestTimer = timer;
        }
      });
    } else {
      console.log("NET");
    }

    setTimeout(() => {
      this.timers.forEach(timer => {
        clearTimeout(timer.timer);
        console.log(timer.timer);
        this._log(timer.parameters, timer.arguments, "Timer destroyed", new Date());
      });

      this.timers = [];
      console.log(this.timers);
    }, destroyDelay + longestTimerDelay);
  }
}

 const manager = new TimersManager();

 const t1 = {
  name: 't1',
  delay: 2000,
  interval: false,
  job: () => { console.log('t1') }
 };

 const t2 = {
  name: 't2',
  delay: 5000,
  interval: false,
  job: (a, b) => a + b
 };

 const t3 = {
  name: 't3',
  delay: 4000,
  interval: false,
  job: (a, b) => a * b
 };

 const t4 = {
  name: 't4',
  delay: 1000,
  interval: false,
  job: () => { throw new Error("We have a problem!") }
 };

manager.add(t1).add(t2, 1, 2).add(t3, 2, 3).add(t4); 
manager.destroyTimers();
manager.start();
// setTimeout(() => manager.pause(t2).pause(t3), 1000);

setTimeout(() => manager.print(), 6000);
// setTimeout(() => manager.resume(t2).resume(t3), 8000);

