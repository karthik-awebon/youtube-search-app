import { useState } from 'react';
const useDebounce = (fn, delay) => {
  const [timeoutId, setTimeoutId] = useState(null);
  return function (...args) {
    const context = this;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const currentTimeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
    setTimeoutId(currentTimeoutId);
  };
};

export default useDebounce;
