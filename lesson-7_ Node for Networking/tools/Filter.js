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
            res = this.typeFilter(user, key, query);

            if (!res) {
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
        return user;
      }

    });
  }

  typeFilter(field, key, query) {
    let result = false;

    switch (typeof field[key]) {
      case ('string'):
        return (field[key].includes(query[key])) ? true : false;

      case ('number'):
        return (field[key] === query[key]) ? true : false;

      case ('object'):
        let res;
        for (let prop in field[key]) {
          if (res === false) {
            return false;
          }
          res = this.typeFilter(field[key], prop, query[key]);
        }

        return res;

      default:
        throw new Error(`Format doesn't fit`);  

    }
  }
}

module.exports = Filter;