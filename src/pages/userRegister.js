import React, { useState } from 'react';
import styles from './userRegistrationForm.module.css';
import CustomNavbar from './navbar';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('user');
    const [userFirstName, setUserFirstName] = useState('');
    const [userMiddleName, setUserMiddleName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userCourse, setUserCourse] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userQualification, setUserQualification] = useState('');
    const [uError, setuError] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyProfile, setCompanyProfile] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [companyPassword, setCompanyPassword] = useState('');
    const [companyUsername, setCompanyUsername] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [companyNumber, setCompanyNumber] = useState('');
    const [companyDate, setCompanyDate] = useState('');
    const [cError, setcError] = useState('');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleUserRegistration = async (e) => {
        e.preventDefault();

        if (
            !userFirstName ||
            !userLastName ||
            // !userCourse ||
            !userGender ||
            !userPhone ||
            !userEmail ||
            !userPassword ||
            !userAddress ||
            !userQualification
        ) {
            setuError('Please fill in all user registration fields');
        } else {
            try {
                const response = await fetch('http://localhost:3005/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: userFirstName,
                        middleName: userMiddleName,
                        lastName: userLastName,
                        course: userCourse,
                        gender: userGender,
                        phone: userPhone,
                        email: userEmail,
                        password: userPassword,
                        address: userAddress,
                        qualification: userQualification,
                    }),
                });

                if (response.ok) {
                    // User registration successful
                    setUserFirstName('');
                    setUserMiddleName('');
                    setUserLastName('');
                    setUserCourse('');
                    setUserGender('');
                    setUserPhone('');
                    setUserEmail('');
                    setUserPassword('');
                    setUserAddress('');
                    setUserQualification('');
                    setuError('');

                    alert('Registration successful. Please sign in.');
                    navigate('/');
                } else {
                    // Handle error response
                    const data = await response.json();
                    setuError(data.error);
                }
            } catch (error) {
                // Handle network error
                setuError('An error occurred while making the user registration request.');
            }
        }
    };


    const handleCompanyRegistration = async (e) => {
        e.preventDefault();

        if (
            !companyName ||
            !companyProfile ||
            !companyEmail ||
            !companyLocation ||
            !companyPassword ||
            !companyUsername ||
            !companyWebsite ||
            !companyNumber ||
            !companyDate
        ) {
            setcError('Please fill in all company registration fields');
        } else {
            try {
                const response = await fetch('http://localhost:3005/companies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: companyName,
                        profile: companyProfile,
                        email: companyEmail,
                        location: companyLocation,
                        password: companyPassword,
                        username: companyUsername,
                        website: companyWebsite,
                        number: companyNumber,
                        date: companyDate,
                    }),
                });

                if (response.ok) {
                    // Company registration successful
                    setCompanyName('');
                    setCompanyProfile('');
                    setCompanyEmail('');
                    setCompanyLocation('');
                    setCompanyPassword('');
                    setCompanyUsername('');
                    setCompanyWebsite('');
                    setCompanyNumber('');
                    setCompanyDate('');
                    setcError('');
                    navigate('/');

                    alert('Registration successful. Please sign in.');
                } else {
                    // Handle error response
                    const data = await response.json();
                    setcError(data.error);
                    alert('Registration failed.');
                }
            } catch (error) {
                // Handle network error
                setcError('An error occurred while making the company registration request.');
            }
        }
    };
    return (
        <div>
            <CustomNavbar />
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={styles.tabWrapper}>
                        <div
                            className={`${styles.tab} ${activeTab === 'user' ? styles.active : ''}`}
                            onClick={() => handleTabChange('user')}
                        >
                            User Registration
                        </div>
                        <div
                            className={`${styles.tab} ${activeTab === 'company' ? styles.active : ''}`}
                            onClick={() => handleTabChange('company')}
                        >
                            Company Registration
                        </div>
                    </div>

                    <form className={`${styles.form} ${activeTab === 'user' ? styles.active : ''}`} onSubmit={handleUserRegistration}>
                        {uError && <div className={styles.error}>{uError}</div>}
                        <label>
                            First Name:
                            <input type="text" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Middle Name:
                            <input type="text" value={userMiddleName} onChange={(e) => setUserMiddleName(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Last Name:
                            <input type="text" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
                        </label>
                        <br />
                        {/* <label>
                            Course:
                            <input type="text" value={userCourse} onChange={(e) => setUserCourse(e.target.value)} />
                        </label>
                        <br /> */}
                        <label>
                            Gender:
                            <div className={styles.radioGroup}>
                                <label>
                                    <input type="radio" name="gender" value="male" onChange={(e) => setUserGender(e.target.value)} />
                                    Male
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="female" onChange={(e) => setUserGender(e.target.value)} />
                                    Female
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="other" onChange={(e) => setUserGender(e.target.value)} />
                                    Other
                                </label>
                            </div>
                        </label>
                        <br />
                        <label>
                            Phone:
                            <input type="text" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Address:
                            <textarea className={styles.textarea} value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Qualification:
                            <select
                                value={userQualification}
                                onChange={(e) => setUserQualification(e.target.value)}
                            >
                                <option value="">Select Qualification</option>
                                <option value="High School Diploma or Equivalent">High School Diploma or Equivalent</option>
                                <option value="Undergraduate Degree">Undergraduate Degree</option>
                                <option value="Graduate Degree">Graduate Degree</option>
                            </select>
                        </label>

                        <br />
                        <button type="submit" className={styles.button}>Register</button>
                    </form>

                    <form className={`${styles.form} ${activeTab === 'company' ? styles.active : ''}`} onSubmit={handleCompanyRegistration}>
                        {cError && <div className={styles.error}>{cError}</div>}
                        <label>
                            Company Name:
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Profile:
                            <textarea className={styles.textarea} value={companyProfile} onChange={(e) => setCompanyProfile(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Location:
                            <input type="text" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" value={companyPassword} onChange={(e) => setCompanyPassword(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Username:
                            <input type="text" value={companyUsername} onChange={(e) => setCompanyUsername(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Website:
                            <input type="text" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Number:
                            <input type="text" value={companyNumber} onChange={(e) => setCompanyNumber(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Date:
                            <input type="text" value={companyDate} onChange={(e) => setCompanyDate(e.target.value)} />
                        </label>
                        <br />
                        <button type="submit" className={styles.button}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
