import './Navbar.css';
import { useState, useEffect } from "react";
import socket from "../services/socket";
import axios from "axios";

export default function Chat({ userId, role }){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    console.log("Chat Props:", userId, role)

    useEffect(() => {
        axios.get("http://localhost:5000/api/chat").then(res => {
            setMessages(res.data);
        });

        socket.on("chatMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("chatMessage");
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            if (!userId) {
                console.error("No userId Provided in the chat component.");
                return;
            }
            socket.emit("chatMessage", { userId, text: input });
            setInput("");
        }
    };

    // Admin-only global clear
    const clearChatGlobal = async () => {
        const confirmClear = window.confirm("Clear chat for everyone?");
        if (confirmClear) {
            await axios.delete("http://localhost:5000/api/chat");
            setMessages([]);
        }
    };

    // Personal clear
    const clearChatPersonal = async () => {
        const confirmClear = window.confirm("Clear your own chat messages?");
        if (confirmClear) {
            await axios.delete(`http://localhost:5000/api/chat/user/${userId}`);
            setMessages((prev) => prev.filter(msg => msg.user_id !== userId));
        }
    };

    return (
        <div className="chat-container">
            <h2>Event Chat</h2>
            <div className="chat-box">
                {messages.map((msg, i) => (
                <p key={i}><strong>{msg.user_id}:</strong> {msg.message || msg.text}</p>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message...' />
            <button onClick={sendMessage}>Send</button>

            {/* Show global clear only for admins */}
            {role === "admin" && (
                <button 
                onClick={clearChatGlobal} 
                style={{ marginLeft: "10px", background: "#ff6f61", color: "white" }}
                >
                Clear Chat (Everyone)
                </button>
            )}

            {/* Everyone can clear their own messages */}
            <button 
                onClick={clearChatPersonal} 
                style={{ marginLeft: "10px", background: "#ff9966", color: "white" }}
            >
                Clear My Chat
            </button>
        </div>
    );
}