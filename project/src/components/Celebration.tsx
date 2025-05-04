import React, { useEffect, useState } from 'react';

interface CelebrationProps {
  isVisible: boolean;
}

const Celebration: React.FC<CelebrationProps> = ({ isVisible }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; }>>([]);

  useEffect(() => {
    if (isVisible) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: 50 + Math.random() * 30 - 15,
        y: 50 + Math.random() * 30 - 15,
        size: 5 + Math.random() * 15,
        color: ['#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#FF5722'][Math.floor(Math.random() * 5)]
      }));
      
      setParticles(newParticles);
      
      // Clear particles after animation completes
      const timer = setTimeout(() => {
        setParticles([]);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
};

export default Celebration;