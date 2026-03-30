import Ticket from '../models/ticketModel.js';
import Event from '../models/eventModel.js';

export const bookTicket = async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const ticket = await Ticket.create({
        event_id: event.id,
        user_id: req.user.id,
        qr_code: `QR-${Date.now()}-${req.user.id}`
    });

    res.json(ticket);
};

export const getMyTickets = async (req, res) => {
    const tickets = await Ticket.findAll({ where: { user_id: req.user.id }, include: ['event'] });
    res.json(tickets);
};