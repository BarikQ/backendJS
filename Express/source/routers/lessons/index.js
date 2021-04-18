import express from 'express';

export const router = express.Router();

import { get, post } from './handlers';
import { getByHash, putByHash, deleteByHash } from './hash';
import { addVideo } from './hash/videos';
import { getVideoByHash, deleteVideoByHash } from './hash/videos/hash';
import { addKeynode } from './hash/keynotes';
import { getKeynoteByHash, deleteKeynoteByHash } from './hash/keynotes/hash';


router.get('/', get);
router.post('/', post);

router.get('/:lessonHash', getByHash);
router.put('/:lessonHash', putByHash);
router.delete('/:lessonHash', deleteByHash);

router.post('/:lessonHash/videos', addVideo);
router.get('/:lessonHash/videos/:videoHash', getVideoByHash);
router.delete('/:lessonHash/videos/:videoHash', deleteVideoByHash);

router.post('/:lessonHash/keynotes', addKeynode);
router.get('/:lessonHash/keynotes/:keynoteHash', getKeynoteByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', deleteKeynoteByHash);


export { router as lessons };
