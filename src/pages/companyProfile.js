import React, { useEffect, useState } from 'react';
import styles from './companyInfo.module.css';

function CompanyInfo({ company }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {
      const cid = sessionStorage.getItem('cid');
      console.log(cid)
      const response = await fetch(`http://localhost:3005/applications/${cid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const applicationsData = await response.json();
        setApplications(applicationsData);
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!company) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles['company-details']}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{company.name}</h2>
          <p className={styles.info}>
            <strong>ID:</strong> {company.id}
          </p>
          <p className={styles.info}>
            <strong>Email:</strong> {company.email}
          </p>
          <p className={styles.info}>
            <strong>Location:</strong> {company.location}
          </p>
          <p className={styles.info}>
            <strong>Username:</strong> {company.username}
          </p>
          <p className={styles.info}>
            <strong>Website:</strong> {company.website}
          </p>
          <p className={styles.info}>
            <strong>Number:</strong> {company.number}
          </p>
        </div>
      </div>

      <div className={styles['table-container']}>
        <h3>Enrollments</h3>
        <table>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Application Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id.$oid}>
                <td>{application.userEmail}</td>
                <td>{application.applicationStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyInfo;