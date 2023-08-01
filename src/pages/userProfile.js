import React, { useState, useEffect } from 'react';
import styles from './companyInfo.module.css';

function UserInfo() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const storedEmail = sessionStorage.getItem('email');
            // Make a GET request to retrieve user data
            const response = await fetch(`http://localhost:3005/users/${storedEmail}`, {
                method: 'GET',
            });
            

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.header}>
            <h2 className={styles.heading}>{userData.firstName} {userData.lastName}</h2>
            <p className={styles.info}><strong>Email:</strong> {userData.email}</p>
            {/* <p className={styles.info}><strong>Course:</strong> {userData.course}</p> */}
            <p className={styles.info}><strong>Gender:</strong> {userData.gender}</p>
            <p className={styles.info}><strong>Phone:</strong> {userData.phone}</p>
            <p className={styles.info}><strong>Address:</strong> {userData.address}</p>
            <p className={styles.info}><strong>Qualification:</strong> {userData.qualification}</p>
        </div>
    );
}

export default UserInfo;
