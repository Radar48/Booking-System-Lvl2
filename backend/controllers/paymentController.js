import Stripe from 'stripe';
import Event from '../models/eventModel.js';
import Payment from '../models/paymentModel.js';
import Ticket from '../models/ticketModel.js';
import { io } from '../server.js'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutPayment = async (req, res) => {
    try {
        const { eventId, ticketId } = req.body;
        const event = await Event.findByPk(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(event.price * 100),
            currency: 'Usd',
            automatic_payment_methods: { enabled: true },
        });

        // Save payment record
        await Payment.create({
            user_id: req.user.id,
            event_id: event.id,
            amount: event.price,
            status: 'pending',
            payment_method: 'stripe'
        });

        res.json({ clientSecret: paymentIntent.client_secret });

        // Emit notification (user-specific room)
        io.to(req.user.id).emit("notification", {
            text: `🎉 Your ticket for "${event.title}" is confirmed!`
        });

        // Update ticket status
        await Ticket.update(
            { status: "paid" },
            { where: { id: ticketId } }
        );

    } catch (err) {
        res.status(500).json({ message: 'Payment failed', error: err.message });
    }
};