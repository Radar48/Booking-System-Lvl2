import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import './Events.css';

export default function EventsList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/events')
        .then(res => setEvents(res.data))
        .catch(err => console.error("Failed to fetch events:", err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading events...</p>;
    if (events.length === 0) return <p>No events available right now.</p>;

    return (
        <div className="events-list-container">
            <h2>Upcoming Events</h2>
            <div className="events-grid">
                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <h3>{event.title}</h3>
                        <p className="event-date">📅 {event.date}</p>
                        <p className="event-location">📍 {event.location}</p>
                        <p className="event-price">💵 $ {event.price}</p>
                        <p className="event-description">
                            {event.description?.slice(0, 100)}...
                        </p>
                        <div className="event-actions">
                        <Link to={`/events/${event.id}`} className="btn-primary">
                            View Details
                        </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}