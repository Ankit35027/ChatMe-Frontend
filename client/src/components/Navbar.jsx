import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link to="/" className="logo" style={{ lineHeight: '1' }}>ChatMe</Link>
                    <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>Capture. Organize. Achieve.</span>
                </div>
                <div className="nav-links">
                    <button onClick={toggleTheme} title="Toggle Theme" style={{ fontSize: '1.2rem' }}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    {user ? (
                        <>
                            <span style={{ marginRight: '1rem', fontWeight: '600' }}>{user.username}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><button>Login</button></Link>
                            <Link to="/signup"><button>Signup</button></Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
