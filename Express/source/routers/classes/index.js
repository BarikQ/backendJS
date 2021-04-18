import express from 'express';

export const router = express.Router();

// Utils
import { limiter, validator } from '../../utils';

import { get, post } from './route';
import { getByHash, putByHash,  deleteByHash } from './hash';
import { enrollByHash, expelByHash } from './education';

router.get('/', get);
router.post('/', post);

router.get('/:classHash', getByHash);
router.put('/:classHash', putByHash);
router.delete('/:classHash', deleteByHash);

router.post('/:classHash/enroll', enrollByHash);
router.post('/:classHash/expel', expelByHash);

export { router as classes };