import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './internshipPage.module.css';

// Import your images
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';
// Add more image imports as needed

const InternshipCard = ({ internship, imageSource }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        sessionStorage.setItem('id', internship.id);
        navigate(`/internships/details`);
    };

    return (
        <button className={styles.internshipCard} onClick={handleClick}>
            <img src={imageSource} alt="Internship" />
            <h3>{internship.name}</h3>
            <p>
                <strong>Qualification:</strong> {internship.qualification}
            </p>
            <p>
                <strong>Duration:</strong> {internship.duration} | <strong>Stipend:</strong> {internship.stipend}
            </p>
            <p>
                Posted On: {new Date(internship.postedOn).toDateString()} | Last Date: {new Date(internship.lastDate).toDateString()}
            </p>
        </button>
    );
};

const InternshipPage = ({ internships }) => {
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        // Generate random image sources for each internship
        const images = [image1, image2, image3]; // Add more image sources as needed

        const dataWithImages = internships.map((internship, index) => {
            const randomIndex = Math.floor(Math.random() * images.length);
            const imageSource = images[randomIndex];

            // Check if the internship object has the 'id' property defined
            const internshipWithId = { ...internship, id: internship.id || index + 1 };

            return { internship: internshipWithId, imageSource };
        });

        setImageData(dataWithImages);
    }, [internships]);

    return (
        <div>
            <div className={styles.internshipList}>
                {imageData.map((data) => (
                    <InternshipCard key={data.internship.id} internship={data.internship} imageSource={data.imageSource} />
                ))}
            </div>
        </div>
    );
};

export default InternshipPage;
