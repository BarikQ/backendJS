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
  
        return -1;
      }     
    });

    if (isNew) {
      if (newUser.balance <= 0) {
        this.emit('error', new Error('User balance is <= 0'));
  
        return -1;
      }

      let user = {
        name: newUser.name,
        balance: newUser.balance,
        id: this.users.length,
        limit: newUser.limit,
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
  
    return -1;
  }

  if (currencyAmount <= 0) {
    this.emit('error', new Error('Add amount is below or equal to 0'));
  
    return -1;
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
  
    return -1;
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
  
    return -1;
  }

  if (currencyAmount < 0) {
    this.emit('error', new Error('Add amount is below or equal to 0'));
  
    return -1;
  }

  this.users.forEach(user => {
    if (user.id === personId) {
      if (user.balance - currencyAmount < 0) {
        this.emit('error', new Error('Wrong withdraw amount'));
  
        return -1;
      }

      if (!user.limit(currencyAmount, user.balance, user.balance - currencyAmount)) {
        this.emit('error', new Error(`[${user.id}] send limit`));
  
        return -1;
      }

      user.balance -= currencyAmount;
      
      return 1; 
    }
  });
});

bank.on('send', function(senderId, recieverId, sendAmount) {
  if (!this.findPerson(senderId) || !this.findPerson(recieverId)) {
    this.emit('error', new Error('Sender/reciever doesn\'t exist'));
  }

  if (sendAmount <= 0) {
    this.emit('error', new Error('Send amount is below or equal to 0'));
  }

  let sender = null;
  let reciever = null;

  this.users.forEach(user => {
    if (user.id === senderId) {
      sender = user;

    }

    if (user.id === recieverId) {
      reciever = user;
    }
  });

  if (!sender.limit(sendAmount, sender.balance, sender.balance - sendAmount)) {
    this.emit('error', new Error(`[${sender.id}] withdraw limit`));

    return 0;
  }

  if (sender.balance - sendAmount <= 0) {
    this.emit('withdraw', senderId, sendAmount);

    return 0;
  }
  this.emit('withdraw', senderId, sendAmount);

  this.emit('add', recieverId, sendAmount);
});

bank.on('changeLimit', function(personId, cb) {
  if (!this.findPerson(personId)) {
    this.emit('error', new Error('Person doesn\'t exist'));
  
    return;
  }

  this.users.forEach(user => {
    if (user.id === personId) {
      user.limit = cb;
    }
  });
});

bank.on('error', function(error) {
  console.log(`ERROR: ${error.message}`);
});

const personFirstId = bank.register({    
  name: 'Pitter Black',    
  balance: 100,
  limit: amount => amount < 10,
});

const personSecondId = bank.register({    
  name: 'Oliver White',
  balance: 700,
  limit: amount => amount < 10,
});

bank.emit('withdraw', personSecondId, 20);
// bank.emit('send', personFirstId, personSecondId, 20);
bank.emit('get', personSecondId, (balance) => {
  console.log(`I have ${balance}₴`); // I have 750₴
});
bank.emit('changeLimit', personSecondId, (amount, currentBalance, updatedBalance) => {
  return amount < 100 && updatedBalance > 600;
});
bank.emit('withdraw', personSecondId, 99);
bank.emit('get', personSecondId, (balance) => {
  console.log(`I have ${balance}₴`); // I have 750₴
});

// console.log(bank.users);
