import { useState, useCallback } from 'react';

function usePreventMultipleClicks() {
  const [inProcess, setinProcess] = useState(false);

  const handleClick = useCallback((asyncFunction: any) => {
    return async (...args: any) => {
      if (!inProcess) {
        setinProcess(true);
        try {
          await asyncFunction(...args);
        } finally {
          setinProcess(false);
        }
      }
    };
  }, [inProcess]);

  return { handleClick, inProcess };
}

export default usePreventMultipleClicks;
