import { useState, useEffect } from 'react';

function useProbability(initialProbability) {
  const [probability, setProbability] = useState(initialProbability);
  const [result, setResult] = useState(false);

  useEffect(() => {
    if (probability === 1) {
      setResult(true);
    } else {
      const randomValue = Math.random();
      setResult(randomValue < probability);
    }
  }, [probability]);

  const updateProbability = (newProbability) => {
    setProbability(newProbability);
    if (newProbability === 1) {
      setResult(true);
    } else {
      const randomValue = Math.random();
      setResult(randomValue < newProbability);
    }
  };

  return { result, updateProbability };
}

export default useProbability;