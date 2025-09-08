import React, { useEffect, useState, useRef } from 'react';

const SparkleCursor = () => {
  const [sparkles, setSparkles] = useState([]);
  const sparkleCount = useRef(0);

  useEffect(() => {
    let animationFrameId;
    
    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const newSparkle = {
          id: sparkleCount.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          duration: Math.random() * 0.8 + 0.4,
          delay: Math.random() * 0.2,
        };

        setSparkles((prevSparkles) => [...prevSparkles, newSparkle]);

        setTimeout(() => {
          setSparkles((prevSparkles) =>
            prevSparkles.filter((sparkle) => sparkle.id !== newSparkle.id)
          );
        }, (newSparkle.duration + 0.5) * 1000);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
          }}
        ></div>
      ))}
    </>
  );
};

export default SparkleCursor;