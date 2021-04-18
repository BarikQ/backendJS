import express from 'express';

export const router = express.Router();

// Utils
import { limiter, validator, authenticate } from '../../utils';

import { login, logout } from './route';

router.post('/login', [limiter(10, 1000 * 60), authenticate], login);
router.post('/logout', [limiter(10, 1000 * 60)], logout);

export { router as auth };