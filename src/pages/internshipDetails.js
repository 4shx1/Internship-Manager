import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import styles from './internshipDetails.module.css';
import ReviewList from './allReview';
import ReviewForm from './addUserReview';
import CustomNavbar from './navbar3'
import certificate from '../images/certi.png';


const InternshipDetailsPage = () => {
    const [internship, setInternship] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const newId = sessionStorage.getItem('id');
        console.log(newId);
        const fetchInternshipDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3005/internships/${newId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: newId }),
                });
                const data = await response.json();
                setInternship(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAverageRating = async () => {
            try {
                const response = await fetch(`http://localhost:3005/internships/${newId}/average-review`);
                const data = await response.json();
                console.log(data);
                setAverageRating(data.averageRating);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchAverageRating();
        fetchInternshipDetails();
    }, []);

    if (!internship) {
        return <div>Loading...</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const handleReviewSubmit = (reviewData) => {
        console.log(reviewData);
    };

    return (
        <div>
            <CustomNavbar />
            <div className={styles.wrapper}>
                <div className={styles.internshipDetailsCard}>
                    <h2 className={styles.h2}>{internship.name}</h2>
                    <div className={styles.detailsContainer}>
                        <div>
                            <div className={styles.bubblesContainer}>
                                <div className={styles.bubble}>
                                    <i className="fas fa-graduation-cap"></i>
                                    <p>: {internship.qualification}</p>
                                </div>
                                <div className={styles.bubble}>
                                    <i className="fas fa-money-bill-alt"></i>
                                    <p>: {internship.stipend}</p>
                                </div>
                                <div className={styles.bubble}>
                                    <i className="far fa-clock"></i>
                                    <p>: {internship.duration}</p>
                                </div>
                                <div className={styles.bubble}>
                                    <i className="far fa-star"></i>
                                    <p>: {averageRating}/5</p>
                                </div>
                            </div>
                            <h6 className={styles.h6}>Details</h6>
                            <p className={styles.id}>ID: {internship.id}</p>
                            <p>{internship.description}</p>
                        </div>

                        {/* <div>
                            <h3>Important Dates</h3>
                            <p>Posted On: {new Date(internship.postedOn).toDateString()}</p>
                            <p>Last Date: {new Date(internship.lastDate).toDateString()}</p>
                            <h3>Company Details</h3>
                            <p>Company Name: {internship.companyName}</p>
                            <p>Faculty Name: {internship.facultyName}</p>
                            <p>Email: {internship.email}</p>
                            <p>Username: {internship.username}</p>
                        </div> */}
                    </div>
                    <h5 style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>sample certificate:</h5>
                    <div className={styles.certi}>
                        <img src={certificate} alt="Internship" />
                    </div>
                    {/* dummy stuff */}
                    <div className={styles.dummyCard}>
                        <h3>Advantages of Participating</h3>
                        <div className={styles.internshipContainer}>
                            <div className={styles.internshipCard}>
                                <i className="fas fa-check-circle fa-3x" style={{ color: ' #01B399' }}></i>
                                <h4>Enhance Your Skills</h4>
                                <p>Gain valuable hands-on experience and improve your skills in various areas.</p>
                            </div>
                            <div className={styles.internshipCard}>
                                <i className="fas fa-globe fa-3x" style={{ color: ' #01B399' }}></i>
                                <h4>Industry Exposure</h4>
                                <p>Get a glimpse into the real-world work environment of the industry.</p>
                            </div>
                            <div className={styles.internshipCard}>
                                <i className="fas fa-users fa-3x" style={{ color: ' #01B399' }}></i>
                                <h4>Networking Opportunities</h4>
                                <p>Build connections with professionals and expand your professional network.</p>
                            </div>
                            <div className={styles.internshipCard}>
                                <i className="fas fa-certificate fa-3x" style={{ color: ' #01B399' }}></i>
                                <h4>Certificates Provided</h4>
                                <p>Receive certificates upon successful completion of the internship.</p>
                            </div>
                            <div className={styles.internshipCard}>
                                <i className="fas fa-hands-helping fa-3x" style={{ color: ' #01B399' }}></i>
                                <h4>Placement Assistance</h4>
                                <p>Get assistance and support for finding job placements after completing the program.</p>
                            </div>

                        </div>
                    </div>
                    <div className={styles.dummyCard}>
                        <h3 className={styles.styles_h3}>Course Objectives:</h3>
                        <ul className={styles.styles_ul}>
                            <li className={styles.styles_li}>
                                To gain practical experience in [specific field or industry].
                            </li>
                            <li className={styles.styles_li}>
                                To develop and enhance professional skills relevant to the internship.
                            </li>
                            <li className={styles.styles_li}>
                                To apply academic knowledge and theories to real-world work scenarios.
                            </li>
                            <li className={styles.styles_li}>
                                To learn effective communication and collaboration skills within a professional setting.
                            </li>
                            <li className={styles.styles_li}>
                                To build a professional network and develop relationships with industry professionals.
                            </li>
                            <li className={styles.styles_li}>
                                To reflect upon and evaluate the internship experience and its impact on personal and professional growth.
                            </li>
                        </ul>
                        <h3 className={styles.styles_h3}>Course Schedule and Activities:</h3>
                        <h4 className={styles.styles_h4}>Week 1:</h4>
                        <ul className={styles.styles_ul}>
                            <li className={styles.styles_li}>
                                Orientation and introduction to the organization/department.
                            </li>
                            <li className={styles.styles_li}>
                                Familiarization with workplace policies, procedures, and tools.
                            </li>
                            <li className={styles.styles_li}>
                                Setting internship goals and expectations.
                            </li>
                        </ul>
                        <h4 className={styles.styles_h4}>Weeks 2-5:</h4>
                        <ul className={styles.styles_ul}>
                            <li className={styles.styles_li}>
                                Assisting with [specific tasks/projects].
                            </li>
                            <li className={styles.styles_li}>
                                Participating in [department/team] meetings and discussions.
                            </li>
                            <li className={styles.styles_li}>
                                Collaborating with colleagues to achieve team objectives.
                            </li>
                            <li className={styles.styles_li}>
                                Engaging in training sessions or workshops related to [specific skills].
                            </li>
                            <li className={styles.styles_li}>
                                Regular check-ins with the supervisor/mentor for feedback and guidance.
                            </li>
                        </ul>
                        <h4 className={styles.styles_h4}>Weeks 6-8:</h4>
                        <ul className={styles.styles_ul}>
                            <li className={styles.styles_li}>
                                Taking on more independent responsibilities within the internship.
                            </li>
                            <li className={styles.styles_li}>
                                Undertaking [specific projects/tasks] with minimal supervision.
                            </li>
                            <li className={styles.styles_li}>
                                Shadowing and learning from professionals in different roles/departments.
                            </li>
                            <li className={styles.styles_li}>
                                Attending industry events, conferences, or seminars (if applicable).
                            </li>
                            <li className={styles.styles_li}>
                                Documenting and reporting progress on assigned projects.
                            </li>
                        </ul>
                        <h4 className={styles.styles_h4}>Weeks 9-10:</h4>
                        <ul className={styles.styles_ul}>
                            <li className={styles.styles_li}>
                                Finalizing and presenting a comprehensive project or report summarizing the internship experience.
                            </li>
                            <li className={styles.styles_li}>
                                Conducting a self-evaluation and reflecting on personal and professional growth.
                            </li>
                            <li className={styles.styles_li}>
                                Receiving feedback and evaluation from the supervisor/mentor.
                            </li>
                            <li className={styles.styles_li}>
                                Wrapping up administrative tasks, such as final documentation or reports.
                            </li>
                        </ul>
                        <h3 className={styles.styles_h3}>Assessment and Grading:</h3>
                        <ul className={styles.styles_ul}>
                            <li className={styles.styles_li}>
                                Performance evaluation by the supervisor/mentor based on criteria discussed during orientation.
                            </li>
                            <li className={styles.styles_li}>
                                Quality and timeliness of deliverables.
                            </li>
                            <li className={styles.styles_li}>
                                Active participation and engagement in the internship.
                            </li>
                            <li className={styles.styles_li}>
                                Reflective report or project summarizing the internship experience.
                            </li>
                        </ul>
                        <p className={styles.styles_p}>Note: The grading scheme and credit allocation, if applicable, will be discussed and determined in consultation with the internship coordinator or academic advisor.</p>
                    </div>

                    {/* Reviews */}
                    <div className={styles.reviewCard}>
                        <h3>Reviews</h3>
                        <ReviewList reviews={internship.reviews} averageRating={averageRating} />
                        <ReviewForm onSubmit={handleReviewSubmit} />
                    </div>

                    <button
                        style={{
                            margin: '10px auto', 
                            width: '80%',
                            border: 'none',
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            borderRadius:'5px',
                            color:'white',
                            backgroundColor:'#01b399',
                            marginLeft:'100px'
                        }}
                        onClick={() => alert('Application complete!')}>Apply</button>
                </div>
            </div>
        </div>

    );
};

export default InternshipDetailsPage;
