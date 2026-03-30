import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Auth.css'; 

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

    const handleRegister = async () => {
        try {
            await API.post('/auth/register', form);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Create Your Account 🎉</h2>
            <input className="auth-input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="auth-input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="auth-input" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            
            <select className="auth-select" onChange={e => setForm({ ...form, role: e.target.value })} value={form.role}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <button className="auth-button" onClick={handleRegister}>Register</button>
            <p className="auth-link">Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}