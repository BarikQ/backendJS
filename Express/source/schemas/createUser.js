export const createUser = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
    },
    email: {
      type: 'string',
      format: 'email'
    },
    phone: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    sex: {
      type: 'string',
      minLength: 1,
    },
    role: {
      type: 'string',
    },
  },
  required: ['name'],
  additionalProperties: false,
};
