import React, { useState, useEffect } from 'react';
import Navbar from "./navbar2";
import InternshipPage from "./internshippage";
import UserInfo from "./userProfile";
import CompanyPage from './companypage';

const UserHome = () => {
    const [userInfo, setUserInfo] = useState('');
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        // Fetch user information
        const fetchUserInfo = async () => {
            const storedEmail = sessionStorage.getItem('email');
            try {
                const response = await fetch(`http://localhost:3005/users/${storedEmail}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const userData = await response.json();
                   
                    setUserInfo(userData);

                } 
                else {
                    const errorData = await response.json();
                    console.error(errorData.message);
                }
            } catch (error) {
                console.error('Internal server error');
            }
        };
    
  

        // Fetch internships
        const fetchInternships = async () => {
            try {
                const response = await fetch('http://localhost:3005/internships', {
                    method: 'GET',
                });

                if (response.ok) {
                    const internshipsData = await response.json();
                    setInternships(internshipsData);
                } else {
                    const errorData = await response.json();
                    console.error(errorData.message);
                }
            } catch (error) {
                console.error('Internal server error');
            }
        };

        fetchUserInfo();
        fetchInternships();
    }, []);
    useEffect(() => {
        console.log(userInfo);
      }, [userInfo]);
    
    return (
        <div>
            <Navbar />
            {userInfo && <UserInfo userInfo={userInfo} />}
            <h3>Available Internsips</h3>
            <InternshipPage internships={internships} />

            <h3>Registered Companies</h3>
            <CompanyPage/>
            
        </div>
    );
}

export default UserHome;
