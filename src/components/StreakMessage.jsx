import React, { useEffect, useState } from 'react';

const StreakMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // Message disappears after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message || !isVisible) return null;

  return (
    <div className="streak-message">
      {message.split('').map((char, index) => (
        <span 
          key={index} 
          style={{ 
            animationDelay: `${index * 0.05}s`,
            display: 'inline-block'
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default StreakMessage; 