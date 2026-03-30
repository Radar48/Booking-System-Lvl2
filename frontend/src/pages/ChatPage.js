import Chat from "../components/Chat";
import Notifications from "../components/Notifications";
import './Home.css';

export default function ChatPage({ userId, role }) {
    return (
        <div className="chat-page-container">
            <h2>Community Chat & Notifications</h2>
            <div className="chat-page-grid">
                <Chat userId={userId} role={role} />   {/* Pass props */}
                <Notifications userId={userId} />
            </div>
        </div>
    );
}