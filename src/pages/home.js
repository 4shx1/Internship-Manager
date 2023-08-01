import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import SearchBar from "./searchBar";
import styles from "./home.module.css";



const Home = () => {
    const [companyCount, setCompanyCount] = useState(0);
    const [internshipCount, setInternshipCount] = useState(0);
    const [companyNames, setCompanyNames] = useState([]);

    useEffect(() => {
        // Fetch the company names from the API endpoint
        fetch("http://localhost:3005/companies")
            .then((response) => response.json())
            .then((data) => {
                setCompanyNames(data.map((company) => company.name));
            })
            .catch((error) => {
                console.log("Error fetching data from API:", error);
            });

        // Fetch the necessary data from the API endpoint
        fetch("http://localhost:3005/stats")
            .then((response) => response.json())
            .then((data) => {
                setCompanyCount(data.companies);
                setInternshipCount(data.internships);
            })
            .catch((error) => {
                console.log("Error fetching data from API:", error);
            });

        // Fetch internships
    }, []);



    return (
        <div>
            <Navbar />
            <div className={styles["home-container"]}>
                <h2 className={styles.title}>Smarter decisions start with MBITS.INTERN</h2>
                <h2 className={styles.subtitle}>Learn, Practice, and get hired!</h2>
                <div className={styles.search}>
                    <SearchBar  />
                </div>
            <div className={styles.banner}>
                {companyNames.length > 0 && (
                    <ul className={styles["company-banner"]}>
                        {companyNames.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                )}
            </div>
                <div className={styles.stats}>
                    <p>
                        Join thousands of users on MBITS.INTERN! We have {companyCount} companies offering exciting internships,
                        <br />
                        with {internshipCount} opportunities waiting for you. Don't miss out — start your journey today!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
