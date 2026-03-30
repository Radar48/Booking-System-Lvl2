import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../services/stripe';
import CheckoutButton from '../components/CheckoutButton';
import './Events.css';

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        API.get(`/events/${id}`).then(res => setEvent(res.data));
    }, [id]);

    const bookTicket = async () => {
        try {
            await API.post(`/tickets/book/${id}`);
            alert('🎉 Ticket booked successfully!');
        } catch (err) {
            alert('❌ Failed to book ticket. Please try again.');
        }
    };

    if (!event) return <p>Loading...</p>;

    return (
        <div className="event-details-container">
            <h2>{event.title}</h2>
            <p className="event-description">{event.description}</p>
            <div className="event-meta">
                <p><strong>📍 Location:</strong> {event.location}</p>
                <p><strong>📅 Date:</strong> {event.date}</p>
                <p><strong>💵 Price:</strong> $ {event.price}</p>
            </div>

            <div className="event-actions">
                <button onClick={bookTicket} className="btn-primary">Book Ticket</button>
                <Elements stripe={stripePromise}>
                <CheckoutButton eventId={event.id} />
                </Elements>
            </div>
        </div>
    );
}