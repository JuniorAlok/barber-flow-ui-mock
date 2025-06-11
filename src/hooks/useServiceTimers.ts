
import { useState, useEffect } from 'react';

export const useServiceTimers = () => {
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [activeTimers, setActiveTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});

  // Load timers from localStorage on hook initialization
  useEffect(() => {
    const savedTimers = localStorage.getItem('barber-timers');
    if (savedTimers) {
      const parsedTimers = JSON.parse(savedTimers);
      setTimers(parsedTimers);
      return parsedTimers;
    }
    return {};
  }, []);

  // Save timers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('barber-timers', JSON.stringify(timers));
  }, [timers]);

  const startTimer = (orderId: string, initialSeconds = 0) => {
    if (activeTimers[orderId]) return;

    const interval = setInterval(() => {
      setTimers(prev => ({
        ...prev,
        [orderId]: (prev[orderId] || initialSeconds) + 1
      }));
    }, 1000);

    setActiveTimers(prev => ({
      ...prev,
      [orderId]: interval
    }));
  };

  const stopTimer = (orderId: string) => {
    if (activeTimers[orderId]) {
      clearInterval(activeTimers[orderId]);
      setActiveTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[orderId];
        return newTimers;
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const restartActiveTimers = (serviceOrders: any[], callback: (orderId: string, seconds: number) => void) => {
    Object.entries(timers).forEach(([orderId, seconds]) => {
      const order = serviceOrders.find(o => o.id === orderId);
      if (order && order.status === 'in_progress') {
        callback(orderId, seconds as number);
      }
    });
  };

  return {
    timers,
    startTimer,
    stopTimer,
    formatTime,
    restartActiveTimers
  };
};
