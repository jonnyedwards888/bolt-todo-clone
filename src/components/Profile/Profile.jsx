import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';

function Profile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePicture: null
  });
  const [isDirty, setIsDirty] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData(parsedProfile);
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsDirty(true);
    setSaveSuccess(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
        setIsDirty(true);
        setSaveSuccess(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('profileData', JSON.stringify(profileData));
      setIsDirty(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile data:', error);
      alert('Error saving profile data. Please try again.');
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <h1 className={styles.title}>My Profile</h1>
        
        <div className={styles.photoContainer}>
          <div className={styles.photoUpload}>
            {profileData.profilePicture ? (
              <img 
                src={profileData.profilePicture} 
                alt="Profile" 
                className={styles.photo}
              />
            ) : (
              <div className={styles.photoPlaceholder}>
                Click to upload photo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
              aria-label="Upload profile picture"
            />
          </div>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your phone number"
            />
          </div>

          <button 
            className={styles.saveButton}
            onClick={handleSave}
            disabled={!isDirty}
          >
            Save Changes
          </button>

          {saveSuccess && (
            <div className={styles.saveSuccess}>
              Changes saved successfully!
            </div>
          )}
        </form>
      </div>

      <Link to="/" className={styles.backButton}>
        Back to Tasks
      </Link>
    </div>
  );
}

export default Profile; 