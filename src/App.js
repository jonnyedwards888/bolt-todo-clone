import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CharactersPage from './pages/CharactersPage';
import BackgroundsPage from './pages/BackgroundsPage';
import CalendarPage from './pages/CalendarPage';
import ModeButton from './components/ModeButton';
import './App.css';
import './styles/Calendar.css';
import './styles/ModeButton.css';
import './styles/TopButtons.css';

function App() {
  const [isGameMode, setIsGameMode] = useState(true);

  useEffect(() => {
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
      document.documentElement.style.setProperty('--app-background', `url(${savedBackground})`);
    }
  }, []);

  const handleModeChange = (gameMode) => {
    setIsGameMode(gameMode);
  };

  return (
    <div className="App">
      <ModeButton onModeChange={handleModeChange} />
      {isGameMode && (
        <div className="xp-display-area">
          <h2 className="xp-title">MyXP!</h2>
          <div className="xp-bar-container">
            <div className="xp-bar" style={{ width: '20%' }}>
              <span className="xp-text">Level 1 - 20 XP</span>
            </div>
          </div>
          <div className="nav-buttons">
            <Link to="/calendar" className="character-nav-link">Calendar</Link>
            <Link to="/characters" className="character-nav-link">Characters</Link>
            <Link to="/backgrounds" className="backgrounds-nav-link">Backgrounds</Link>
            <Link to="/profile" className="profile-button">Profile</Link>
          </div>
        </div>
      )}
      {!isGameMode && (
        <div className="nav-buttons-simple">
          <Link to="/calendar" className="nav-link">Calendar</Link>
          <Link to="/characters" className="nav-link">Characters</Link>
          <Link to="/backgrounds" className="nav-link">Backgrounds</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>
      )}
      <div className="content-area">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/backgrounds" element={<BackgroundsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App; 