import express from 'express';

import { get, post } from './handlers';
import { getByHash } from './hash';

export const router = express.Router();

router.get('/', get);
router.post('/', post);

router.get('/:userHash', getByHash);
// router.put('/:userHash', updateByHash);

export { router as users };
