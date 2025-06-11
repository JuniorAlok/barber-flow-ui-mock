
import { useState, useEffect } from 'react';

export const useServiceTimers = () => {
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [activeTimers, setActiveTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});

  // Load timers from localStorage on hook initialization
  useEffect(() => {
    console.log('useServiceTimers: Loading timers from localStorage');
    const savedTimers = localStorage.getItem('barber-timers');
    if (savedTimers) {
      try {
        const parsedTimers = JSON.parse(savedTimers);
        console.log('useServiceTimers: Loaded timers:', parsedTimers);
        setTimers(parsedTimers);
      } catch (error) {
        console.error('Error parsing saved timers:', error);
      }
    }
  }, []);

  // Save timers to localStorage whenever they change
  useEffect(() => {
    console.log('useServiceTimers: Saving timers to localStorage:', timers);
    localStorage.setItem('barber-timers', JSON.stringify(timers));
  }, [timers]);

  // Cleanup active timers on unmount - FIXED: Return proper cleanup function
  useEffect(() => {
    return () => {
      console.log('useServiceTimers: Cleaning up active timers on unmount');
      Object.values(activeTimers).forEach(timer => {
        if (timer) {
          clearInterval(timer);
        }
      });
    };
  }, [activeTimers]);

  const startTimer = (orderId: string, initialSeconds = 0) => {
    console.log('useServiceTimers: Starting timer for order:', orderId, 'with initial seconds:', initialSeconds);
    if (activeTimers[orderId]) {
      console.log('useServiceTimers: Timer already active for order:', orderId);
      return;
    }

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
    console.log('useServiceTimers: Stopping timer for order:', orderId);
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

  const restartActiveTimers = (serviceOrders: any[]) => {
    console.log('useServiceTimers: Restarting active timers for orders:', serviceOrders);
    Object.entries(timers).forEach(([orderId, seconds]) => {
      const order = serviceOrders.find(o => o.id === orderId);
      if (order && order.status === 'in_progress' && !activeTimers[orderId]) {
        console.log('useServiceTimers: Restarting timer for order:', orderId, 'with seconds:', seconds);
        startTimer(orderId, seconds as number);
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
