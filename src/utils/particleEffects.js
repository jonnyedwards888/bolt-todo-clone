export const createXPParticles = (sourceElement, targetElement, todo) => {
  // Only create particles if the todo hasn't been completed before
  if (todo.hasBeenCompletedBefore) {
    return;
  }

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  // Create 4-8 particles
  const numParticles = Math.floor(Math.random() * 5) + 4;
  
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'xp-particle';
    
    // Random starting position around the checkbox
    const startX = sourceRect.left + (Math.random() * sourceRect.width);
    const startY = sourceRect.top + (Math.random() * sourceRect.height);
    
    // Calculate end position (XP bar)
    const endX = targetRect.left + (Math.random() * targetRect.width);
    const endY = targetRect.top + (targetRect.height / 2);
    
    // Random arc control point for natural curved motion
    const controlX = startX + (Math.random() * 100 - 50);
    const controlY = startY - (Math.random() * 50 + 50);
    
    // Set initial position
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    
    // Add to DOM
    document.body.appendChild(particle);
    
    // Create keyframes for curved path
    const keyframes = [];
    const steps = 100;
    const duration = 1500 + (Math.random() * 500); // 1.5-2 seconds
    const delay = Math.random() * 200; // Random delay up to 200ms
    
    // Generate bezier curve points
    for (let step = 0; step <= steps; step++) {
      const t = step / steps;
      const x = Math.pow(1 - t, 2) * startX + 
                2 * (1 - t) * t * controlX + 
                Math.pow(t, 2) * endX;
      const y = Math.pow(1 - t, 2) * startY + 
                2 * (1 - t) * t * controlY + 
                Math.pow(t, 2) * endY;
      
      keyframes.push({
        left: `${x}px`,
        top: `${y}px`,
        offset: t,
        opacity: t < 0.8 ? 1 : 1 - ((t - 0.8) * 5),
        transform: `scale(${1 - t * 0.4}) rotate(${t * 360}deg)`
      });
    }
    
    // Animate
    const animation = particle.animate(keyframes, {
      duration: duration,
      delay: delay,
      easing: 'ease-out',
      fill: 'forwards'
    });
    
    // Clean up
    animation.onfinish = () => {
      particle.remove();
    };
  }
}; 