import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            login(data, data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container auth-container">
                <div className="auth-form">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Access your professional workspace.</p>
                    </div>
                    {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">Login</button>
                    </form>
                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
