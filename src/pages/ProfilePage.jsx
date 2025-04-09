import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: null
  });
  const [isDirty, setIsDirty] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load profile data from localStorage on component mount
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
      // Validate file size (max 5MB)
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
    <div className="content-area">
      <div className="profile-page">
        <h1>Profile Settings</h1>
        <div className="profile-content">
          <div className="profile-picture-container">
            <div className="profile-picture">
              {profileData.profilePicture ? (
                <img src={profileData.profilePicture} alt="Profile" />
              ) : (
                <div className="profile-picture-placeholder">
                  Click to upload image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="profile-picture-input"
                onChange={handleImageUpload}
                aria-label="Upload profile picture"
              />
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
              />
            </div>

            <div className="xp-level">
              Level 1 - 0 XP
            </div>

            <button 
              className="save-button" 
              onClick={handleSave}
              disabled={!isDirty}
            >
              Save Changes
            </button>

            {saveSuccess && (
              <div className="save-success">
                Changes saved successfully!
              </div>
            )}
          </div>
        </div>

        <Link to="/" className="back-button">
          Back to Tasks
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
