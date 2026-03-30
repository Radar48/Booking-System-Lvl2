import express from 'express';
import { getEvents, getEventById, createEvent } from '../controllers/eventController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, isAdmin, createEvent);

export default router;