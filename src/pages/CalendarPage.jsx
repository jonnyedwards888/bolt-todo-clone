import React, { useState } from 'react';
import "../styles/Calendar.css";

function CalendarPage() {
  const [view, setView] = useState("week");

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">🗓️ Calendar Page</h1>

      <div className="calendar-toggle">
        <button
          className="calendar-btn"
          onClick={() => setView("week")}
        >
          Week View
        </button>
        <button
          className="calendar-btn"
          onClick={() => setView("month")}
        >
          Month View
        </button>
      </div>

      <div className="calendar-content">
        {view === "week" ? (
          <div>
            <h2>This Week's Tasks</h2>
            <ul>
              <li>📌 Monday: Work on React</li>
              <li>📌 Wednesday: Refactor Header</li>
              <li>📌 Friday: Polish UI + Playtest</li>
            </ul>
          </div>
        ) : (
          <div>
            <h2>This Month's Goals</h2>
            <ul>
              <li>✅ Finish MVP</li>
              <li>📚 Learn React Router DOM</li>
              <li>🎨 Finalize theme + styles</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
