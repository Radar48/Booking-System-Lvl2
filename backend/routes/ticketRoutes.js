import express from 'express';
import { bookTicket, getMyTickets } from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/book/:id', protect, bookTicket);
router.get('/my', protect, getMyTickets);

export default router;