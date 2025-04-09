import React from "react";

interface XPBarProps {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  isLevelingUp: boolean;
}

function XPBar({ currentXP, level, xpToNextLevel, isLevelingUp }: XPBarProps) {
  const xpInCurrentLevel = currentXP % xpToNextLevel;
  const progressPercent = (xpInCurrentLevel / xpToNextLevel) * 100;

  return (
    <div
      className={`xp-bar-container ${isLevelingUp ? "level-up-animation" : ""}`}
    >
      <div className="xp-bar" style={{ width: `${progressPercent}%` }}>
        <span className="xp-text">
          Level {level} - {xpInCurrentLevel}/{xpToNextLevel} XP
        </span>
      </div>
    </div>
  );
}

export default XPBar;
