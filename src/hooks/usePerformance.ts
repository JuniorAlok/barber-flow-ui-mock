
import { useMemo } from 'react';

export const usePerformance = () => {
  const measurePerformance = useMemo(() => {
    return (name: string, fn: () => any) => {
      const start = performance.now();
      const result = fn();
      const end = performance.now();
      console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
      return result;
    };
  }, []);

  return { measurePerformance };
};
