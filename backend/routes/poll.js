import { Router } from 'express';
import {
  getAllPolls,
  getPollById,
  createPoll,
} from '../controllers/pollController.js';

const router = Router();

router.get('/', getAllPolls);
router.get('/:id', getPollById);
router.post('/', createPoll);

export default router;
