import React, { useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

function CompanyLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3005/companies/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Successful login
                console.log('Company logged in successfully');

                sessionStorage.setItem('email', email);   //email stored
                
                navigate('/chome');
            } else {
                // Failed login
                const errorData = await response.json();
                console.error(errorData.message);
            }

            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Internal server error');
        }
    };

    return (
        <div className={styles.card}>
            <h2>Company Login</h2>
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

export default CompanyLoginForm;
