import React from 'react';
import defaultBg from '../assets/cloudy landscape.jpg';
import cyberpunkBg from '../assets/backgrounds/cyberpunk background.jpg';

const backgrounds = [
  {
    id: 1,
    name: 'Default',
    image: defaultBg,
    description: 'The default cloudy landscape background'
  },
  {
    id: 2,
    name: 'Cyberpunk',
    image: cyberpunkBg,
    description: 'A futuristic cyberpunk cityscape'
  }
];

function BackgroundsPage() {
  const handleBackgroundSelect = (backgroundImage) => {
    document.documentElement.style.setProperty('--app-background', `url(${backgroundImage})`);
    localStorage.setItem('selectedBackground', backgroundImage);
  };

  return (
    <div className="backgrounds-container">
      <h1>Choose Your Background</h1>
      <div className="backgrounds-grid">
        {backgrounds.map((bg) => (
          <div 
            key={bg.id} 
            className="background-card"
            onClick={() => handleBackgroundSelect(bg.image)}
          >
            <div className="background-image-container">
              <img src={bg.image} alt={bg.name} className="background-preview" />
            </div>
            <h2>{bg.name}</h2>
            <p>{bg.description}</p>
          </div>
        ))}
      </div>
      <p className="backgrounds-note">
        Note: To add more backgrounds, please save your desired images in the src/assets/backgrounds folder.
      </p>
    </div>
  );
}

export default BackgroundsPage; 