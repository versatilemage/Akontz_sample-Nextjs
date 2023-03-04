import { useState, useEffect } from 'react';

const CountdownTimer = ({ minutes, completedIndication }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  }, [timeLeft]);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  let timerStyle = {
    color: 'white',
    fontWeight: '600',
  };
  if (timeLeft <= 120) { // Less than or equal to 2 minutes
    timerStyle = {
      color: 'red',
      fontSize: '1.1em',
      fontWeight: '600',
    };
  }else if (timeLeft === 0){
    completedIndication()
  }

  return (
    <div style={timerStyle}>
      Time Left: {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
    </div>
  );
};

export default CountdownTimer;
