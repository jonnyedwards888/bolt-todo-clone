// Base XP gained per task
export const BASE_XP = 20;

// Streak thresholds and multipliers
export const STREAK_LEVELS = {
  0: { multiplier: 1, message: '' },
  2: { multiplier: 1.5, message: '1.5X STREAK!' },
  3: { multiplier: 2, message: '2X STREAK!' }
};

// Calculate XP based on current streak
export const calculateXP = (streak) => {
  let multiplier = 1;
  
  // Find the highest applicable streak level
  Object.entries(STREAK_LEVELS).forEach(([threshold, data]) => {
    if (streak >= parseInt(threshold)) {
      multiplier = data.multiplier;
    }
  });

  return Math.floor(BASE_XP * multiplier);
};

// Get streak message for current streak level
export const getStreakMessage = (streak) => {
  let message = '';
  
  Object.entries(STREAK_LEVELS).forEach(([threshold, data]) => {
    if (streak >= parseInt(threshold)) {
      message = data.message;
    }
  });

  return message;
}; 