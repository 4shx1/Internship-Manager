import React from 'react';
import styles from './reviewList.module.css';
import AverageStars from './avgRating';

const ReviewList = ({ reviews, averageRating }) => {
    return (
        <div>

            <AverageStars averageRating={averageRating} />
            <ul className={styles.reviewList}>
                {reviews.map((review) => (
                    <li key={review._id} className={styles.reviewItem}>
                        <p className={styles.user}>{review.user}</p>
                        <p className={styles.comment}>{review.comment}</p>
                        {/* Display the rating using star icons */}
                        <div className={styles.starRating}>
                            {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    className={index < review.rating ? styles.filled : styles.empty}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
