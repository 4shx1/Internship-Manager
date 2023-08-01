import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './internshipPage.module.css';

// Import your images
import image1 from '../images/company.jpeg';

// Add more image imports as needed

const CompanyCard = ({ company, imageSource }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(company.id)
        sessionStorage.setItem('cid', company.id);
        sessionStorage.setItem('cmail', company.email);
        navigate(`/companies/details`);
    };

    return (
        <div>
      
        <button className={styles.internshipCard} onClick={handleClick}>
            <img src={imageSource} alt="images" />
            <h3>{company.name}</h3>
            <p>
                <strong>Location:</strong> {company.location}
            </p>
            <p>
                <strong>Website:</strong> {company.website}
            </p>
        </button>
        </div>
    );
};

const CompanyPage = () => {
    const [companies, setCompanies] = useState([]);
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            // Make an API call to fetch company data
            const response = await fetch('http://localhost:3005/allcompanies');
            const data = await response.json();
            console.log('Fetched data:', data);

            // Generate random image sources for each company
            const images = [image1]; // Add more image sources as needed

            const dataWithImages = data.map((company, index) => {
                const randomIndex = Math.floor(Math.random() * images.length);
                const imageSource = images[randomIndex];

                // Check if the company object has the 'id' property defined
                const companyWithId = { ...company, id: company.id || index + 1 };

                return { company: companyWithId, imageSource };
            });

            setCompanies(dataWithImages);
            setImageData(dataWithImages);
        } catch (error) {
            console.log('Error fetching companies:', error);
        }
    };


    const getImageSource = (companyId) => {
        const companyData = imageData.find((data) => data.company.id === companyId);
        return companyData ? companyData.imageSource : '';
    };

    return (
        <div>
            <div className={styles.internshipList}>
                {companies.map((company) => (
                    <CompanyCard
                        key={company.company.id}
                        company={company.company}
                        imageSource={getImageSource(company.company.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CompanyPage;
