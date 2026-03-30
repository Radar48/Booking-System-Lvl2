import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Auth.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem("token", res.data.token);
            alert('Login successful!');
            navigate('/');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Welcome Back ✨</h2>
            <input className="auth-input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="auth-input" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button className="auth-button" onClick={handleLogin}>Login</button>
            <p className="auth-link">Don’t have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
}