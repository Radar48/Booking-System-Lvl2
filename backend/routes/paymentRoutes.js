import express from "express";
import stripe from "stripe";
import { io } from "../server.js"; 
import Ticket from "../models/ticketModel.js";
import Event from "../models/eventModel.js";

const router = express.Router();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

router.post("/checkout", async (req, res) => {
    try {
        const { eventId, ticketId, userId } = req.body;

        // Fetch event price from DB
        const event = await Event.findByPk(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Create PaymentIntent
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: event.price * 100, 
            currency: "kes",         
            metadata: { eventId, ticketId, userId }
        });

        res.json({ clientSecret: paymentIntent.client_secret });

        // After payment succeeds, Stripe webhook will confirm
        io.to(userId).emit("notification", {
            text: `🎉 Your ticket for "${event.title}" is confirmed!`
        });

        // Update ticket status in DB
        await Ticket.update(
            { status: "paid" },
            { where: { id: ticketId } }
        );

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Payment failed" });
    }
});

export default router;