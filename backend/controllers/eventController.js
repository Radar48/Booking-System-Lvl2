import Event from '../models/eventModel.js';

export const getEvents = async (req, res) => {
    const events = await Event.findAll();
    res.json(events);
};

export const getEventById = async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
};

export const createEvent = async (req, res) => {
    const event = await Event.create({ ...req.body, created_by: req.user.id });
    res.json(event);
};