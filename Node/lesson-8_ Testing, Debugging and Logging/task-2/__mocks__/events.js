class EventEmitter {
  constructor() {
    this.eventsList = {};
    this.listeners = {};
  }
  
  on (event, cb) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(cb);
  }

  emit (event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event]
        .forEach(listener => {
          listener.call(this, ...args);
        });
    }
  }
}

module.exports = EventEmitter;