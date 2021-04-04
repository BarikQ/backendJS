const EventEmitter = require('events');

class Bank extends EventEmitter {
  constructor() {
    super();
    this.users = [];
  }

  register(newUser) {
    let isNew = true;
    
    this.users.forEach(element => {
      if (element.name === newUser.name) {
        console.log("This person already exists");
        isNew = false;
        this.emit('error', new Error('This user already exist!'));

        return null;
      }     
    });

    if (isNew) {
      if (newUser.balance <= 0) {
        this.emit('error', new Error('User balance is <= 0'));
        return null;
      }

      let user = {
        name: newUser.name,
        balance: newUser.balance,
        id: this.users.length,
      };
  
      this.users.push(user);

      return user.id;
    }
    
    return null;
  }

  findPerson(personId) {
    let isExist = false;

    this.users.forEach(user => {
      if (user.id === personId) {
        isExist = true;

        return isExist;
      }
    });

    return isExist;
  }
}

const bank = new Bank();

bank.on('add', function(personId, currencyAmount) {

  if (!this.findPerson(personId)) {
    this.emit('error', new Error('Person doesn\'t exist'));
  }

  if (currencyAmount <= 0) {
    this.emit('error', new Error('Add amount is below or equal to 0'));
  }

  this.users.forEach(user => {
    if (user.id === personId) {
      user.balance += currencyAmount;
    }
  });
});

bank.on('get', function(personId, cb) {
  if (!this.findPerson(personId)) {
    this.emit('error', new Error('Person doesn\'t exist'));
  }

  this.users.forEach(user => {
    if (user.id === personId) {
      cb(user.balance);
    }
  });
});

bank.on('withdraw', function(personId, currencyAmount) {
  if (!this.findPerson(personId)) {
    this.emit('error', new Error('Person doesn\'t exist'));
  }

  if (currencyAmount < 0) {
    this.emit('error', new Error('Add amount is below or equal to 0'));
  }

  this.users.forEach(user => {
    if (user.id === personId) {
      if (user.balance - currencyAmount < 0) {
        this.emit('error', new Error('Wrong withdraw amount'));
        return;
      }

      user.balance -= currencyAmount;
    }
  });
});

bank.on('error', function(error) {
  console.log(`ERROR: ${error.message}`);
});

const personFirstId = bank.register({    
  name: 'Pitter Black',    
  balance: 100,
});

const personSecondId = bank.register({    
  name: 'Oliver White',
  balance: 700,
});

// bank.emit('send', personFirstId, personSecondId, 50);
// bank.emit('get', personSecondId, (balance) => {
  // console.log(`I have ${balance}₴`); // I have 750₴
// });

console.log(bank.users);
