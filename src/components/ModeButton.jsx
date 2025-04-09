// components/ModeButton.jsx
import React, { useState } from "react";
import controllerIcon from "../assets/controller.png";
import "./ModeButton.css";

const ModeButton = ({ onModeChange }) => {
  const [isGameMode, setIsGameMode] = useState(true);

  const toggleMode = () => {
    const newMode = !isGameMode;
    setIsGameMode(newMode);
    onModeChange(newMode);
  };

  return (
    <button className="mode-btn" onClick={toggleMode}>
      <img 
        src={controllerIcon} 
        alt={isGameMode ? "Switch to Normal Mode" : "Switch to Game Mode"} 
        className="mode-icon" 
      />
    </button>
  );
};

export default ModeButton;