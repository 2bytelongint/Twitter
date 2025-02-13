import express from 'express';

import {createTweet, getTweet} from '../../controller/tweet-controller.js';
import { toggleLike } from '../../controller/like-controller.js';
import { createComment } from '../../controller/comment-controller.js';
import { createUser, login } from '../../controller/user-controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.post('/tweets',authenticate, createTweet);

router.get('/tweets/:id', getTweet)

router.post('/likes/toggle', toggleLike);

router.post('/comments', createComment);

//user
router.post('/users', createUser);
router.post('/login', login);



export default router;

