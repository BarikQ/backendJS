const EventEmitter = require('events');
const { Bank } = require('./');

jest.mock('events');
const bank = new Bank();
const fakeCustomerName = { 'name': 'John' };
const fakeCustomerNameCopy = fakeCustomerName;
let fakeCustomer = null;

describe('Test Bank class', () => {

  test('Test bank instance', () => {
    expect(bank).toBeInstanceOf(EventEmitter);
  });

  test('Test bank register', () => {
    fakeCustomer = bank.register(fakeCustomerName);

    expect(typeof fakeCustomer).toBe('number');
    expect(bank.customers.length).toBe(1);
    expect(Object.keys(bank.customers[0])).toEqual(['name', 'id']);
  });

  test('Test register duplicate customer', () => {
    expect(() => bank.register(fakeCustomerNameCopy))
      .toThrow(`duplicated customer for name: '${fakeCustomerNameCopy.name}`);
    expect(bank.customers.length).toBe(1);
  });

  test('Test enroll fail', () => {
    expect(() => bank.emit('add', fakeCustomer, -1))
      .toThrow('amount should be grater than 0');

    expect(() => bank.emit('add', -1, 100))
      .toThrow(`customer with id '${-1}' not found`);
  });


  test('Test enroll success', () => {
    bank.emit('add', fakeCustomer, 100);

    expect(bank.customers[0].balance).toEqual(100);
  });
});