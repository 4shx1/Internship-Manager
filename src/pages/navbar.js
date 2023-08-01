import React, { useState } from 'react';
import styles from './navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import UserLoginForm from './userLogin';
import CompanyLoginForm from './companyLogin';

function CustomNavbar() {
    const navigate = useNavigate();
    const [showUserLoginModal, setShowUserLoginModal] = useState(false);
    const [showCompanyLoginModal, setShowCompanyLoginModal] = useState(false);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleUserLoginClick = () => {
        setShowUserLoginModal(true);
    };

    const handleCompanyLoginClick = () => {
        setShowCompanyLoginModal(true);
    };

    const handleUserLoginModalClose = () => {
        setShowUserLoginModal(false);
    };

    const handleCompanyLoginModalClose = () => {
        setShowCompanyLoginModal(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLogo} onClick={handleLogoClick}>
                <h2>MBITS.INTERN</h2>
            </div>
            <ul className={styles.navbarLinks}>
                <li>Internships</li>
                <li>
                    <button className={styles.navbarButton} onClick={handleUserLoginClick}>
                        User Login
                    </button>
                </li>
                <li>
                    <button className={styles.navbarButton} onClick={handleCompanyLoginClick}>
                        Company Login
                    </button>
                </li>
                <li>
                    <button className={styles.navbarButtonPrimary} onClick={handleRegisterClick}>
                        Register
                    </button>
                </li>
            </ul>

            {/* User Login Modal */}
            <Modal
                isOpen={showUserLoginModal}
                onRequestClose={handleUserLoginModalClose}
                className={styles.modalContainer}
                overlayClassName={styles.modalOverlay}
                contentLabel="User Login"
            >
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={handleUserLoginModalClose}>
                        &times;
                    </button>
                    <div className={styles.modalCard}>
                        <UserLoginForm />
                    </div>
                </div>
            </Modal>

            {/* Company Login Modal */}
            <Modal
                isOpen={showCompanyLoginModal}
                onRequestClose={handleCompanyLoginModalClose}
                className={styles.modalContainer}
                overlayClassName={styles.modalOverlay}
                contentLabel="Company Login"
            >
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={handleCompanyLoginModalClose}>
                        &times;
                    </button>
                    <div className={styles.modalCard}>
                        <CompanyLoginForm />
                    </div>
                </div>
            </Modal>
        </nav>
    );
}

export default CustomNavbar;
