import { useRef, useCallback, useEffect } from 'react';
const useDebounce = (fn, delay) => {
  const timeoutIdRef = useRef(null);
  const debouncedFn = useCallback(
    function (...args) {
      const context = this;
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    },
    [fn, delay]
  );
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return debouncedFn;
};

export default useDebounce;
