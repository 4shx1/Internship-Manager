import React, { useState, useEffect } from 'react';
import Navbar from "./navbar2";
import CompanyInfo from "./companyProfile";
import styles from "./companyHome.module.css";
import { useNavigate } from 'react-router-dom';
import InternshipPage from "./internshippage";

const CompanyHome = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        // Fetch company data
        const fetchCompanyData = async () => {
            const storedEmail = sessionStorage.getItem('email');
            try {
                const response = await fetch('http://localhost:3005/companies/details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: storedEmail }),
                });

                if (response.ok) {
                    const companyData = await response.json();
                    setCompany(companyData);
                } else {
                    const errorData = await response.json();
                    console.error(errorData.message);
                }
            } catch (error) {
                console.error('Internal server error');
            }
        };

        // Fetch internships
        const fetchInternships = async () => {
            const storedEmail = sessionStorage.getItem('email');
            try {
                console.log(storedEmail);
                const response = await fetch(`http://localhost:3005/internships/${storedEmail}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const internships = await response.json();
                    setInternships(internships);
                } else {
                    const errorData = await response.json();
                    console.error(errorData.message);
                }
            } catch (error) {
                console.error('Internal server error');
            }
        };

        fetchCompanyData();
        fetchInternships();
    }, []);

    function handleCreateInternship() {
        // Add your logic for creating new internships here
        console.log('Create new internship');
        navigate('/int');
    }

    return (
        <div>
            <Navbar />
            <CompanyInfo company={company} />
            <div className={styles.container}>
                <h3 className={styles.centeredHeading}>
                    Click{' '}
                    <button className={styles.highlightButton} onClick={handleCreateInternship}>
                        here
                    </button>{' '}
                    to create new internships
                </h3>
            </div>
            <h4>Your Internships:</h4>
            <InternshipPage internships={internships} /> {/* Pass internships as a prop */}
        </div>
    );
};
export default CompanyHome;
