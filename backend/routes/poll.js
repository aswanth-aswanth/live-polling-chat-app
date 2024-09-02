import { Router } from 'express';
import {
  getAllPolls,
  getPollById,
  createPoll,
} from '../controllers/pollController.js';
import authenticateToken from '../middlewares/auth.js';
import { nonAuthUser } from '../middlewares/auth.js';

const router = Router();

router.get('/', nonAuthUser, getAllPolls);
router.get('/:id', nonAuthUser, getPollById);
router.post('/', authenticateToken, createPoll);

export default router;
