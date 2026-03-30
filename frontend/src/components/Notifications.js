import { useEffect, useState } from "react";
import socket from "../services/socket";
import './Navbar.css';

export default function Notifications({ userId }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Join personal room
        socket.emit("joinRoom", userId);

        // Listen for notifications
        socket.on("notification", (note) => {
            setNotifications((prev) => [...prev, note]);
        });

        return () => {
            socket.off("notification");
        };
    }, [userId]);

    return (
        <div className="notifications-container">
            <h3>Notifications</h3>
            {notifications.map((note, i) => (
                <p key={i}>{note.text}</p>
            ))}
        </div>
    );
}