import getPassword from './env';

// const password = getPassword();
const password = 'barik1999';

export const authenticate = (req, res, next) => {
  const auth = req.header('authorization');

  if (auth && auth.includes(`:${password}`)) {
    next();
  } else {
    res.status(401).json({ message : 'Wront auth credentials' });
  }
};