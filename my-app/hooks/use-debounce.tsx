import React, { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: null): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;
