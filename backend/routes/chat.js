import { Router } from 'express';
import { getChatMessages } from '../controllers/chatController.js';

const router = Router();

router.get('/:pollId', getChatMessages);

export default router;
