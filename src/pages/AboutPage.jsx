import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="content-area">
      <div className="about-page">
        <h1>About</h1>
        <p>This is a todo list app that helps you track your tasks and earn XP for completing them!</p>
        <Link to="/" className="back-button">
          Back to Tasks
        </Link>
      </div>
    </div>
  );
}

export default AboutPage; 