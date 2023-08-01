import React, { useState, useEffect } from 'react';
import styles from './reviewForm.module.css';

const ReviewForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        // Retrieve the user details when the component mounts
        fetch(`http://localhost:3005/users/${sessionStorage.getItem('email')}`)
            .then((response) => response.json())
            .then((data) => {

                // Store the user details in state
                setUserDetails(data);

            })
            .catch((error) => {
                console.error('Error retrieving user details:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const review = {
            comment,
            rating,
            user: `${userDetails.firstName} ${userDetails.middleName} ${userDetails.lastName}`,
        };
        const newId = sessionStorage.getItem('id');
        console.log(newId);
        // Make an API POST request to submit the review
        fetch(`http://localhost:3005/internships/${newId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        })
            .then((response) => response.json())
            .then((data) => {

                // Handle the API response, e.g., display a success message
                console.log('Review submitted successfully:', data);
                // Call the onSubmit callback passed as a prop
                onSubmit(review);
                setComment('');
                setRating(0);
            })
            .catch((error) => {
                // Handle any error that occurred during the API request
                console.error('Error submitting the review:', error);
            });
    };

    return (
        <div>
            <h3>Add a Review</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    {/* Display the rating using star icons */}
                    <div className={styles.starRating}>
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={index < rating ? styles.filled : styles.empty}
                                onClick={() => setRating(index + 1)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        required
                        className={styles.textarea}
                    ></textarea>
                </div>
                <div className={styles.invisible}>
                    <label htmlFor="user">User:</label>
                    <p>{`${userDetails.firstName} ${userDetails.middleName} ${userDetails.lastName}`}</p>
                </div>
                <button type="submit" className={styles.submitButton} style={{
                    border: 'solid 2px #01b399',
                    backgroundColor: '#fff',
                    color: "#01b399",
                    width:'50%',
                    marginLeft:'25%'
                }}>Submit</button>
            </form>
        </div>
    );
};

export default ReviewForm;
