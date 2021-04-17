const {
  validate,
  validateFields
} = require('./');

const fakeValidateTypes = {
  data: '',
  name: '',
  instance: ''
};
const fakePayloadAttribute = (payload) => ({
  data: {
    payload
  }
});
const fakeValidData = {
  data: {
    payload: {
      name: 'John',
      email: 'john@gmail.com',
      password: 'b5123321',
    },
    meta: {
      source: 'ui',
      algorithm: 'hex',
    },
  },
  name: 'J',
  instance: '',
};
const fakeInValidData = {
  data: {
    payload: {
      kylity: 'John',
      email: 'john@gmail.com',
      password: 'b5123321',
    },
    meta: {
      source: 'ui',
      algorithm: 'hex',
    },
  },
  name: 'J',
};
const fakeInValidData2 = {
  data: {
    kykyciky: {
      kylity: 'John',
      email: 'john@gmail.com',
      password: 'b5123321',
    },
  },
};

describe('Test validate func', () => {

  test('Test validate arguments', async () => {
    expect(() => validate()).toThrow(TypeError);
  });

  test(`Test payload's type`, () => {
    expect(() => validate(fakeValidateTypes))
      .toThrow(`${fakeValidateTypes.name}: payload should be an object`);
  });

  test('Test payload attribute: name', () => {
    expect(() => validate(fakePayloadAttribute({
        'foo': 'bar'
      })))
      .toThrow(`${fakeValidateTypes.name}: payload should have required field name`);

    expect(() => validate(fakePayloadAttribute({
        'name': ''
      })))
      .toThrow(`${fakeValidateTypes.name}: payload.name should not be empty`);

    expect(() => validate(fakePayloadAttribute({
        'name': 123
      })))
      .toThrow(`${fakeValidateTypes.name}: payload.name should should be a string`);
  });

  test('Test payload attribute: email', () => {
    expect(() => validate(fakePayloadAttribute({
        'name': 'John',
        'foo': 'bar'
      })))
      .toThrow(`${fakeValidateTypes.name}: payload should have required field email`);

    expect(() => validate(fakePayloadAttribute({
        'name': 'John',
        'email': ''
      })))
      .toThrow(`${fakeValidateTypes.name}: payload.email should not be empty`);

    expect(() => validate(fakePayloadAttribute({
        'name': 'John',
        'email': 123
      })))
      .toThrow(`${fakeValidateTypes.name}: payload.email should should be a string`);
  });

  test('Test payload attribute: password', () => {
    expect(() => validate(fakePayloadAttribute({
        'name': 'John',
        'email': 'smt@mail.com',
        'foo': 'bar'
      })))
      .toThrow(`${fakeValidateTypes.name}: payload should have required field password`);

    expect(() => validate(fakePayloadAttribute({
        'name': 'John',
        'email': 'smt@mail.com',
        'password': ''
      })))
      .toThrow(`${fakeValidateTypes.name}: payload.password should not be empty`);

    expect(() => validate(fakePayloadAttribute({
        'name': 'John',
        'email': 'smt@mail.com',
        'password': 123
      })))
      .toThrow(`${fakeValidateTypes.name}: payload.password should should be a string`);
  });

  test('Test valid data', () => {
    expect(() => validate(fakeValidData)).not.toThrow();
  });
});

describe('Test validateFields func', () => {
  test('Test valid data', () => {
    expect(() => validate(fakeValidData)).not.toThrow();
  });

  test('Test allowed property', () => {
    expect(() => validateFields(fakeInValidData2))
      .toThrow(`${fakeInValidData2.name}: data contains not allowed field — kykyciky`);
  });

  test('Test allowed field of property', () => {
    expect(() => validateFields(fakeInValidData))
      .toThrow(`${fakeInValidData.name}: data contains not allowed field — kylity`);
  });
});