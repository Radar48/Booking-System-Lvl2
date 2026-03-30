import express from "express";
import ChatMessage from "../models/ChatMessageModel.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Send a new message
router.post("/messages", protect, async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.id; // from JWT middleware

        if (!text) {
            return res.status(400).json({ error: "Message text is required" });
        }

        const message = await ChatMessage.create({
            user_id: userId,
            message: text
        });

        res.json(message);
    } catch (err) {
        console.error("Chat POST error:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
});


// Get all messages
router.get("/", async (req, res) => {
    try {
        const messages = await ChatMessage.findAll({ order: [["createdAt", "ASC"]] });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Clear all messages (admin only)
router.get("/", protect, async (req, res) => {
    const messages = await ChatMessage.findAll();
    res.json(messages);
});

router.delete("/", protect, isAdmin, async (req, res) => {
    await ChatMessage.destroy({ where: {} });
    res.json({ message: "Chat cleared for everyone" });
});

// Clear messages for one user
router.delete("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        await ChatMessage.destroy({ where: { user_id: userId } });
        res.json({ message: `Chat cleared for user ${userId}` });
    } catch (err) {
        res.status(500).json({ error: "Failed to clear user chat" });
    }
});

export default router;