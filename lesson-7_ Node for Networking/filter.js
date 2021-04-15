class Filter {
  constructor(dataBase) {
    this.base = dataBase;
  }

  filter(query) {
    return this.base.filter((user) => {
      let res;

      for (let key in user) {

        for (let prop in query) {
          if (res === false) {
            break;
          }

          if (key === prop) {
            // console.log(true);
            res = this.typeFilter(user, key, query);

            if (res) {
              // console.log(true, user[key], query[key]);
              // console.log('1');
              continue;
            } else {
              // console.log('2');
              break;
            }
          }

        }
      
        if (res === true) {
          continue;
        } 
        if (res === false) {
          break;
        }

      }

      if (res === true) {
        // console.log(user);
        return user;
      }

    });
  }

  typeFilter(field, key, query) {
    let result = false;

    switch (typeof field[key]) {
      case ('string'):
        // console.log(field[key], query[key], key);
        return (field[key].includes(query[key])) ? true : false;

      break;

      case ('number'):
        // console.log(field[key], query[key], key);
        return (field[key] === query[key]) ? true : false;

      break;

      case ('object'):
        let res;
        // console.log(field[key], query[key], key);
        for (let prop in field[key]) {
          if (res === false) {
            return false;
          }
          res = this.typeFilter(field[key], prop, query[key]);
        }

        return res;

      break;

      default:
        throw new Error(`Format doesn't fit`);  
      break;

    }

    return result;
  }
}

module.exports = Filter;