import express from "express";
import Stripe from "stripe";
import Payment from "../models/paymentModel.js";
import Ticket from "../models/ticketModel.js";
import Event from "../models/eventModel.js";
import { io } from "../server.js"; 

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe requires raw body for signature verification
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const { eventId, ticketId, userId } = paymentIntent.metadata;

            // Update payment record
            await Payment.update(
                { status: "paid" },
                { where: { user_id: userId, event_id: eventId } }
            );

            // Update ticket status
            await Ticket.update(
                { status: "paid" },
                { where: { id: ticketId } }
            );

            // Fetch event title for notification
            const eventRecord = await Event.findByPk(eventId);

            // Emit real-time notification
            io.to(userId).emit("notification", {
                text: `🎉 Your ticket for "${eventRecord.title}" is confirmed!`
            });
        }

        res.json({ received: true });
    } catch (err) {
        console.error("Webhook error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

export default router;