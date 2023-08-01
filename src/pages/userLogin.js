import React, { useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

function UserLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3005/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Successful login
                console.log('User logged in successfully');
                sessionStorage.setItem('email', email);
                navigate('/uhome');
            } else {
                // Failed login
                const errorData = await response.json();
                console.error(errorData.message);
                alert(errorData, "\n Login Failed");
            }

            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Internal server error');
        }
    };

    return (
        <div className={styles.card}>
            <h2>User Login</h2>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default UserLoginForm;
