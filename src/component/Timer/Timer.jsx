import React, { useState, useEffect } from 'react';
import './timer.css';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkOrderStatus = () => {
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      if (orderHistory.length > 0) {
        const lastOrder = orderHistory[orderHistory.length - 1];
        const orderTime = new Date(lastOrder.date).getTime();
        const currentTime = new Date().getTime();
        const elapsedSeconds = Math.floor((currentTime - orderTime) / 1000);
        const remainingSeconds = Math.max(0, 40 * 60 - elapsedSeconds);

        if (remainingSeconds > 0) {
          setTimeLeft(remainingSeconds);
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      } else {
        setIsActive(false);
      }
    };

    checkOrderStatus();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isActive) return null;

  return (
    <div className="timer-container">
      <p>Qolgan vaqt: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
    </div>
  );
}