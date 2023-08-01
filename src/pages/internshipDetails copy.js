import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import styles from './companyDetails.module.css';
import CustomNavbar from './navbar3';
import InternshipPage from './internshippage';

const CompanyDetailsPage = () => {
    const [company, setCompany] = useState(null);
    const [internships, setInternships] = useState([]);


    useEffect(() => {
        const cid = sessionStorage.getItem('cid');
        const cmail = sessionStorage.getItem('cmail');

        const fetchCompanyDetails = async () => {
            try {

                const response = await fetch(`http://localhost:3005/companies/${cid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setCompany(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchInternships = async () => {
            try {
                console.log(cmail);
                const response = await fetch(`http://localhost:3005/internships/${cmail}`, {
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

        fetchCompanyDetails();
        fetchInternships();
    }, [company]);

    const handleApply = async () => {

        try {

            const cid = sessionStorage.getItem('cid');
            const email = sessionStorage.getItem('email');
            // const userEmail = sessionStorage.getItem('userEmail');
            // const userName = sessionStorage.getItem('userName');

            const applicationData = {
                companyId: cid,
                userEmail: email,
                applicationStatus: 'applied',
            };
            console.log('Application Details:', applicationData);

            const response = await fetch('http://localhost:3005/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });

            if (response.ok) {

                alert('Application complete!');
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        } catch (error) {
            console.error('Internal server error');
        }
    };
    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CustomNavbar />
            <div className={styles.wrapper}>
                <div className={styles.internshipDetailsCard}>
                    <h2 className={styles.h2}>{company.name}</h2>
                    <div className={styles.detailsContainer}>
                        <div className={styles.center}>
                            <h6 className={styles.h6}>Details</h6>
                            <p className={styles.id}>ID: {company.id}</p>
                            <p className={styles.label}>Location:</p>
                            <p>{company.location}</p>
                            <p className={styles.label}>Website:</p>
                            <p>{company.website}</p>
                            <p className={styles.label}>Number:</p>
                            <p>{company.number}</p>
                            <br />
                            <br />
                            <h6 className={styles.h6}>Detailed Description:</h6>
                            <p>{company.profile}</p>
                            <br />
                            <div>
                                <h6 className={styles.h6}>Available Internships</h6>
                                <InternshipPage internships={internships} />
                            </div>
                            <br />
                            <button
                                style={{
                                    margin: '10px auto',
                                    width: '80%',
                                    border: 'none',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    borderRadius: '5px',
                                    color: 'white',
                                    backgroundColor: '#01b399',
                                    marginLeft: '100px',
                                }}
                                onClick={handleApply}
                            >
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetailsPage;
