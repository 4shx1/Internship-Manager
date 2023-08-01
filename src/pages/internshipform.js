import React, { useState } from 'react';
import styles from './internshipForm.module.css';
import CustomNavbar from './navbar2';
import { useNavigate } from 'react-router-dom';

const AddInternshipForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        qualification: '',
        duration: '',
        stipend: '',
        postedOn: '',
        lastDate: '',
        companyName: '',
        facultyName: '',
        email: '',
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:3005/internships', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // Internship added successfully
                    console.log('Internship added successfully');
                    setFormData({
                        name: '',
                        description: '',
                        qualification: '',
                        duration: '',
                        stipend: '',
                        postedOn: '',
                        lastDate: '',
                        companyName: '',
                        facultyName: '',
                        email: '',
                        username: '',
                        password: '',
                    });
                    setErrors({});
                    navigate('/chome');
                } else {
                    // Handle error response
                    const data = await response.json();
                    setErrors(data.errors);
                }
            } catch (error) {
                // Handle network error
                console.error('An error occurred while adding the internship:', error);
            }
        }
    };

    const validateForm = (data) => {
        const errors = {};

        // Validate the form fields here
        if (!data.name) {
            errors.name = 'Name is required';
        }

        if (!data.description) {
            errors.description = 'Description is required';
        }

        if (!data.qualification) {
            errors.qualification = 'Qualification is required';
        }

        if (!data.duration) {
            errors.duration = 'Duration is required';
        }

        if (!data.postedOn) {
            errors.postedOn = 'Posted On is required';
        }

        if (!data.lastDate) {
            errors.lastDate = 'Last Date is required';
        }

        if (!data.companyName) {
            errors.companyName = 'Company Name is required';
        }

        if (!data.facultyName) {
            errors.facultyName = 'Faculty Name is required';
        }

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (!data.username) {
            errors.username = 'Username is required';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };


    return (
        <div>
            <CustomNavbar />
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <h2>Enter Internship Details</h2>
                    <div className={styles.form}>
                        <form onSubmit={handleSubmit}>

                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? styles.error : ''}
                                required
                            />
                            {errors.name && <span className={styles.error}>{errors.name}</span>}

                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={errors.description ? styles.error : ''}
                                required
                            ></textarea>
                            {errors.description && <span className={styles.error}>{errors.description}</span>}

                            <label htmlFor="qualification">Qualification:</label>
                            <select
                                id="qualification"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                className={errors.qualification ? styles.error : ''}
                                required
                            >
                                <option value="">Select Educational Qualification</option>
                                <option value="High School Diploma or Equivalent">High School Diploma or Equivalent</option>
                                <option value="Undergraduate Degree">Undergraduate Degree</option>
                                <option value="Graduate Degree">Graduate Degree</option>
                            </select>

                            {errors.qualification && <span className={styles.error}>{errors.qualification}</span>}

                            <label htmlFor="duration">Duration:</label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className={errors.duration ? styles.error : ''}
                                required
                            />
                            {errors.duration && <span className={styles.error}>{errors.duration}</span>}

                            <label htmlFor="stipend">Stipend:</label>
                            <input
                                type="text"
                                id="stipend"
                                name="stipend"
                                value={formData.stipend}
                                onChange={handleChange}
                            />

                            <label htmlFor="postedOn">Posted On:</label>
                            <input
                                type="date"
                                id="postedOn"
                                name="postedOn"
                                value={formData.postedOn}
                                onChange={handleChange}
                                className={errors.postedOn ? styles.error : ''}
                                required
                            />
                            {errors.postedOn && <span className={styles.error}>{errors.postedOn}</span>}

                            <label htmlFor="lastDate">Last Date:</label>
                            <input
                                type="date"
                                id="lastDate"
                                name="lastDate"
                                value={formData.lastDate}
                                onChange={handleChange}
                                className={errors.lastDate ? styles.error : ''}
                                required
                            />
                            {errors.lastDate && <span className={styles.error}>{errors.lastDate}</span>}

                            <label htmlFor="companyName">Company Name:</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={errors.companyName ? styles.error : ''}
                                required
                            />
                            {errors.companyName && <span className={styles.error}>{errors.companyName}</span>}

                            <label htmlFor="facultyName">Faculty Name:</label>
                            <input
                                type="text"
                                id="facultyName"
                                name="facultyName"
                                value={formData.facultyName}
                                onChange={handleChange}
                                className={errors.facultyName ? styles.error : ''}
                                required
                            />
                            {errors.facultyName && <span className={styles.error}>{errors.facultyName}</span>}

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? styles.error : ''}
                                required
                            />
                            {errors.email && <span className={styles.error}>{errors.email}</span>}

                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={errors.username ? styles.error : ''}
                                required
                            />
                            {errors.username && <span className={styles.error}>{errors.username}</span>}

                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? styles.error : ''}
                                required
                            />
                            {errors.password && <span className={styles.error}>{errors.password}</span>}

                            <button type="submit" className={styles.button}>
                                Add Internship
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddInternshipForm;
