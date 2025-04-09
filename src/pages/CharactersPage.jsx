import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gokuImg from '../assets/characters/goku.jpg';
import asukaImg from '../assets/characters/asuka langley.jpeg';
import gogginsImg from '../assets/characters/david goggins.png';

// Character data with their specific motivational messages
export const CHARACTERS = {
  goku: {
    name: "Goku",
    image: gokuImg,
    description: "The determined Saiyan warrior who never gives up!",
    messages: [
      "Keep pushing beyond your limits! 💪",
      "You're getting stronger with every task you complete! 🔥",
      "This isn't even your final form! Keep going! ⚡",
      "Channel your inner Saiyan strength! 🌟",
      "Time to go Ultra Instinct on these tasks! ✨",
      "Your power level increases with every completion! 📈"
    ]
  },
  goggins: {
    name: "David Goggins",
    image: gogginsImg,
    description: "The toughest man alive, here to push you to your limits!",
    messages: [
      "STAY HARD! GET AFTER IT! 💪",
      "Who's gonna carry the boats?! YOU ARE! 🚢",
      "You're capable of 10X more than you think! 🔥",
      "Time to callous your mind! Keep pushing! 💯",
      "Don't stop when you're tired, stop when you're done! ⚡",
      "Take their souls! Complete those tasks! 👊"
    ]
  },
  asuka: {
    name: "Asuka Langley",
    image: asukaImg,
    description: "The fierce EVA pilot who never backs down!",
    messages: [
      "What are you, stupid? Get these tasks done! 💫",
      "Show them what an elite task-completer can do! ⚡",
      "You're the best! Now prove it! 🌟",
      "Victory is the only option! Keep going! 🔥",
      "Channel your inner EVA pilot! 🤖",
      "Pathetic! You're better than this! Complete your tasks! 💪"
    ]
  }
};

function CharactersPage() {
  const navigate = useNavigate();
  const [selectedChar, setSelectedChar] = useState(
    localStorage.getItem('selectedCharacter') || 'goku'
  );

  const handleSelectCharacter = (characterId) => {
    setSelectedChar(characterId);
    localStorage.setItem('selectedCharacter', characterId);
    localStorage.setItem('characterMessages', JSON.stringify(CHARACTERS[characterId].messages));
    
    // Add a small delay before navigating back to show the selection animation
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div className="characters-container">
      <h1>Choose Your Motivator</h1>
      <div className="characters-grid">
        {Object.entries(CHARACTERS).map(([id, character]) => (
          <div 
            key={id} 
            className={`character-card ${selectedChar === id ? 'selected' : ''}`}
            onClick={() => handleSelectCharacter(id)}
          >
            <div className="character-image-container">
              <img 
                src={character.image} 
                alt={character.name} 
                className="character-image"
              />
            </div>
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <div className="message-preview">
              <h3>Sample Messages:</h3>
              <ul>
                {character.messages.slice(0, 2).map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="back-button">
        Back to Tasks
      </Link>
    </div>
  );
}

export default CharactersPage; 