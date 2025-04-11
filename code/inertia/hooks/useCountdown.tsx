import { useState, useEffect, useCallback } from 'react';

function useCountdown(initialCount: number, onComplete: () => void) : { count: number, reset: () => void } {
  const [count, setCount] = useState(initialCount);

  const reset = useCallback(() => setCount(initialCount), [initialCount]);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return { count, reset };
}

export default useCountdown;