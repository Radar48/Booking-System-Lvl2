import express from 'express';
import http from "http";
import { Server } from "socket.io";   
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; 
import webhookRouter from "./routes/webhook.js";
import ChatMessage from "./models/ChatMessageModel.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

// Stripe webhook must come before normal JSON middleware
app.use("/webhook", webhookRouter);

// Normal routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payments', paymentRoutes);
app.use("/api/chat", chatRoutes);

// HTTP server once
const server = http.createServer(app);

// Attach Socket.io
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("chatMessage", async (msg) => {
        if (!msg.userId) {
            console.error("Missing userId in chatMessage:", msg);
            return;
        }
        await ChatMessage.create({ user_id: msg.userId, message: msg.text });
        io.emit("chatMessage", msg);
    });

    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Sync DB and start server
sequelize.sync().then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});