import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CHARACTERS } from './CharactersPage';
import { calculateXP, getStreakMessage } from '../utils/xpSystem';
import { createXPParticles } from '../utils/particleEffects';
import StreakMessage from '../components/StreakMessage';
import ModeButton from "../components/ModeButton";

const DEFAULT_MESSAGES = [
  "You're doing great! Keep up the momentum! 🚀",
  "Every task completed is a step forward! 💪",
  "Small progress is still progress! 🌱",
  "You're crushing it! Keep going! 💫",
  "Success is built one task at a time! 🏆",
  "You're making amazing progress! 🌟"
];

function HomePage() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

 
  

  const [newTodo, setNewTodo] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [streakMessage, setStreakMessage] = useState('');
  const [xp, setXp] = useState(() => {
    const savedXp = localStorage.getItem('xp');
    return savedXp ? parseInt(savedXp) : 0;
  });


  const getMotivationalMessages = () => {
    const selectedCharacter = localStorage.getItem('selectedCharacter');
    if (selectedCharacter && CHARACTERS[selectedCharacter]) {
      return CHARACTERS[selectedCharacter].messages;
    }
    return DEFAULT_MESSAGES;
  };

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
      });
    }
  }, []);

  useEffect(() => {
    if (currentStreak > 0) {
      const timer = setTimeout(() => {
        setCurrentStreak(0);
        setStreakMessage('');
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [currentStreak]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('xp', xp.toString());
    const xpBar = document.querySelector('.xp-bar');
    const xpText = document.querySelector('.xp-text');
    if (xpBar && xpText) {
      const level = Math.floor(xp / 100) + 1;
      const levelProgress = xp % 100;
      xpBar.style.width = `${levelProgress}%`;
      xpText.textContent = `Level ${level} - ${xp} XP`;
    }
  }, [xp]);

  useEffect(() => {
    const xpBar = document.querySelector('.xp-bar');
    const xpText = document.querySelector('.xp-text');
    if (xpBar && xpText) {
      const level = Math.floor(xp / 100) + 1;
      const levelProgress = xp % 100;
      xpBar.style.width = `${levelProgress}%`;
      xpText.textContent = `Level ${level} - ${xp} XP`;
    }
  }, []);

  useEffect(() => {
    if (notificationsEnabled) {
      const messages = getMotivationalMessages();
      const sendDailyMotivation = () => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const selectedCharacter = localStorage.getItem('selectedCharacter');
        const characterName = selectedCharacter && CHARACTERS[selectedCharacter]
          ? CHARACTERS[selectedCharacter].name
          : "Daily Motivation";

        new Notification(`${characterName} says:`, {
          body: randomMessage,
          icon: selectedCharacter && CHARACTERS[selectedCharacter]
            ? CHARACTERS[selectedCharacter].image
            : "/favicon.ico"
        });
      };

      const initialTimeout = setTimeout(() => {
        if (todos.length > 0) {
          sendDailyMotivation();
        }
      }, 3600000);

      const dailyInterval = setInterval(sendDailyMotivation, 86400000);

      return () => {
        clearTimeout(initialTimeout);
        clearInterval(dailyInterval);
      };
    }
  }, [notificationsEnabled, todos.length]);

  useEffect(() => {
    if (notificationsEnabled) {
      const messages = getMotivationalMessages();
      const checkPendingTasks = () => {
        const pendingTasks = todos.filter(todo => !todo.completed);
        if (pendingTasks.length > 0) {
          const selectedCharacter = localStorage.getItem('selectedCharacter');
          const characterName = selectedCharacter && CHARACTERS[selectedCharacter]
            ? CHARACTERS[selectedCharacter].name
            : "Reminder";

          new Notification(`${characterName} reminds you:`, {
            body: `You have ${pendingTasks.length} pending tasks. ${messages[Math.floor(Math.random() * messages.length)]}`,
            icon: selectedCharacter && CHARACTERS[selectedCharacter]
              ? CHARACTERS[selectedCharacter].image
              : "/favicon.ico"
          });
        }
      };

      const pendingInterval = setInterval(checkPendingTasks, 14400000);
      return () => clearInterval(pendingInterval);
    }
  }, [notificationsEnabled, todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false }
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos => {
      const newTodos = prevTodos.map(todo => {
        if (todo.id === id) {
          if (!todo.hasBeenCompletedBefore && !todo.completed) {
            const checkbox = document.querySelector(`input[data-todo-id="${id}"]`);
            const xpBar = document.querySelector('.xp-bar');
            if (checkbox && xpBar) {
              createXPParticles(checkbox, xpBar, todo);
            }

            const newStreak = todo.completed ? currentStreak : currentStreak + 1;
            setCurrentStreak(newStreak);
            const xpToAdd = Math.floor(10 * (1 + (newStreak * 0.1)));
            setXp(prevXp => prevXp + xpToAdd);

            if (newStreak > 1) {
              setStreakMessage(`${newStreak} STREAK! +${xpToAdd}XP`);
              setTimeout(() => setStreakMessage(''), 2000);
            }
          }

          return {
            ...todo,
            completed: !todo.completed,
            hasBeenCompletedBefore: true
          };
        }
        return todo;
      });

      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  return (
    <div className="todo-container">
      <h1 className="Lucas-list">Lucas's List</h1>

      

      {!notificationsEnabled && (
        <button
          onClick={requestNotificationPermission}
          className="enable-notifications-button"
        >
          Enable Notifications 🔔
        </button>
      )}

      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add Task</button>
      </form>

      <div className="todo-list">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-todo-id={todo.id}
            />
            <span className="todo-text">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
              aria-label="Delete task"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <StreakMessage message={streakMessage} />
    </div>
  );
}

export default HomePage;
