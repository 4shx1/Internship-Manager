import React from 'react';
import styles from './navbar.module.css';
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
    const navigate = useNavigate();

    const back = async () => {
        navigate('/chome');
    }

    const handleLogoutClick = async () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>

            <nav className={styles.navbar}>
                <div className={styles.navbarLogo} onClick={back}>
                    <h2>MBITS.INTERN</h2>
                </div>
                <ul className={styles.navbarLinks}>
                    <li>
                        <button className={styles.navbarButtonPrimary} onClick={handleLogoutClick}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default CustomNavbar;
