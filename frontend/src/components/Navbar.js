import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
    };

    // Decode token safely
    let role = null;
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            role = payload.role;
        } catch (err) {
            console.error("Failed to decode token:", err);
        }
    }


    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/tickets">My Tickets</Link>
                {role === 'admin' && (
                    <Link to="/create-event">Create Event</Link>
                )}
                <Link to="/chat">Chat</Link>
            </div>

            <div className="nav-right">
                {!token ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
}