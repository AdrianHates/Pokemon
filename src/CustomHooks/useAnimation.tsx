import { useState, useEffect } from 'react';

function useAnimation(frameCount, initialFrameIndex = 0, animationSpeed = 150) {
  const [frameIndex, setFrameIndex] = useState(initialFrameIndex);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevFrameIndex) => (prevFrameIndex + 1) % frameCount);
    }, animationSpeed);

    return () => {
      clearInterval(intervalId);
    };
  }, [frameIndex, frameCount, animationSpeed]);

  const resetAnimation = () => {
    setFrameIndex(initialFrameIndex);
    setIsAnimating(true);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  const startAnimation = () => {
    setIsAnimating(true);
  };

  return {
    frameIndex,
    isAnimating,
    resetAnimation,
    stopAnimation,
    startAnimation,
  };
}

export default useAnimation;