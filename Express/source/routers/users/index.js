import express from 'express';

import { get, post } from './route';
import { getByHash, putByHash, deleteByHash } from './hash';

// Utils
import { limiter, validator } from '../../utils';

// Schemas
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', [limiter(2, 1000 * 5)], get);
router.post('/', [validator(createUser)], post);

router.get('/:userHash', getByHash);
router.put('/:userHash', putByHash);
router.delete('/:userHash', deleteByHash);

export { router as users };
