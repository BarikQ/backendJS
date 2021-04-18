import express from 'express';

export const router = express.Router();

import { get, post } from './handlers';
import { getByHash, 
  putByHash, 
  deleteByHash, 
  enrollByHash, 
  expelByHash,
} from './hash';

router.get('/', get);
router.post('/', post);

router.get('/:classHash', getByHash);
router.put('/:classHash', putByHash);
router.delete('/:classHash', deleteByHash);

router.post('/:classHash/enroll', enrollByHash);
router.post('/:classHash/expel', expelByHash);

export { router as classes };