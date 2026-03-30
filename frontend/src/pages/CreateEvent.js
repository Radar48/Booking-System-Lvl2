import { useState } from 'react';
import API from '../services/api';
import { getUserRole } from '../services/auth';
import './Auth.css';

export default function CreateEvent() {
    const role = getUserRole();
    const [form, setForm] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        price: ''
    });
    const [loading, setLoading] = useState(false);

    if (role !== 'admin') {
        return (
        <div className="access-denied">
            <h2>🚫 Access Denied</h2>
            <p>Only admins can create events.</p>
        </div>
        );
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
            if (!form.title || !form.date || !form.location || !form.price) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            setLoading(true);
            await API.post('/events', form);
            alert('🎉 Event created successfully!');
            setForm({ title: '', description: '', date: '', location: '', price: '' });
        } catch (err) {
            alert('❌ Failed to create event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-event-container">
            <h2>Create Event</h2>
            <form className="create-event-form">
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />
                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <button type="button" onClick={handleCreate} disabled={loading}>
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
}