import React from 'react';
import styles from './averageStars.module.css';

const AverageStars = ({ averageRating }) => {
    return (
        <div className={styles.averageStars}>
            <p className={styles.averageRating}>Average Rating: {averageRating}/5</p>
            {/* Display the average rating using star icons */}
            <div className={styles.starRating}>
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={index < averageRating ? styles.filled : styles.empty}
                    >
                        ★
                    </span>
                ))}
            </div>
        </div>
    );
};

export default AverageStars;
