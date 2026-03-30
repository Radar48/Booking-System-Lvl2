Task 2 – WebSockets for Real-Time Communication
📌 Overview
This task implements real-time features using Socket.IO on top of an Express backend and a React frontend.
It enables bidirectional communication between server and clients, supporting chat applications and user-specific notifications.

🎯 Objectives
- Set up WebSockets with Express and a frontend framework.
- Handle bidirectional real-time communication.
- Implement user-specific notifications/messages.
- Optimize real-time data updates efficiently.

🛠️ Tech Stack
- Backend: Node.js, Express, Socket.IO, Sequelize ORM (Postgres)
- Frontend: React, Axios, Socket.IO Client
- Testing: Thunder Client / Postman for API validation

- Features:
- Bidirectional communication: Clients send messages → server broadcasts updates.
- User-specific notifications: Each user joins a room (socket.join(userId)), enabling private messages.
- Persistence: Messages stored in ChatMessage table via Sequelize.

🎨 Frontend Implementation
- Socket Client (services/socket.js):
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
export default socket;
- Chat Component (Chat.js):
- Connects to Socket.IO server.
- Emits joinRoom with userId.
- Listens for chatMessage events.
- Sends messages via socket.emit("chatMessage", { userId, text }).
- Fetches history with axios.get("/api/chat").
- Notifications:
- Each user receives messages in their room.
- Admin can broadcast system-wide notifications.

⚡ Optimization
- Guard against null userId before joining rooms.
- Efficient updates: Only emit to relevant rooms instead of broadcasting globally.
- Database indexing: Index user_id in ChatMessage for faster queries.
- Frontend rendering: Use React hooks (useEffect, useState) to minimize re-renders.

🚀 How to Run
- Backend:
cd backend
npm install
npm run dev
- Runs Express + Socket.IO server.
- Frontend:
cd frontend
npm install
npm start
- Runs React app on http://localhost:3000.

✅ Task 2 Completion
- WebSockets set up with Express and React.
- Bidirectional communication implemented.
- User-specific notifications/messages supported.
- Real-time updates optimized for performance.

