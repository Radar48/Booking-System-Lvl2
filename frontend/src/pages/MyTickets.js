import { useEffect, useState } from 'react';
import API from '../services/api';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../services/stripe';
import CheckoutButton from '../components/CheckoutButton';
import './Events.css';

export default function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/tickets/my')
        .then(res => setTickets(res.data))
        .catch(err => console.error("Failed to fetch tickets:", err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading your tickets...</p>;
    if (tickets.length === 0) return <p>You have no tickets yet.</p>;

    return (
        <div className="tickets-container">
            <h2>My Tickets</h2>
            <div className="tickets-grid">
                {tickets.map(ticket => (
                    <div key={ticket.id} className="ticket-card">
                        <h3>{ticket.event.title}</h3>
                        <p><strong>📅 Date:</strong> {ticket.event.date}</p>
                        <p><strong>📍 Location:</strong> {ticket.event.location}</p>
                        <p><strong>💵 Price:</strong> $ {ticket.event.price}</p>
                        <p><strong>Status:</strong> {ticket.status}</p>

                        {ticket.status === "unpaid" && (
                        <Elements stripe={stripePromise}>
                            <CheckoutButton eventId={ticket.event.id} ticketId={ticket.id} />
                        </Elements>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}