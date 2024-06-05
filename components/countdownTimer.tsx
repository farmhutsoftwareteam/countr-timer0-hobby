import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

interface CountdownTimerProps {
  targetDate: Date;
}

const calculateTimeLeft = (targetDate: Date) => {
  const totalSeconds = differenceInSeconds(targetDate, new Date());
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-64 h-64">
        <svg className="absolute inset-0 w-full h-full">
          {/* Days Arc */}
          <circle
            className="text-red-500"
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * (days / 30))}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40%"
            cx="50%"
            cy="50%"
            transform="rotate(-90 50 50)"
          />
          {/* Hours Arc */}
          <circle
            className="text-green-500"
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * (hours / 24))}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30%"
            cx="50%"
            cy="50%"
            transform="rotate(-90 50 50)"
          />
          {/* Minutes Arc */}
          <circle
            className="text-blue-500"
            strokeWidth="8"
            strokeDasharray="188.4"
            strokeDashoffset={188.4 - (188.4 * (minutes / 60))}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="20%"
            cx="50%"
            cy="50%"
            transform="rotate(-90 50 50)"
          />
          {/* Seconds Arc */}
          <circle
            className="text-yellow-500"
            strokeWidth="8"
            strokeDasharray="125.6"
            strokeDashoffset={125.6 - (125.6 * (seconds / 60))}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="10%"
            cx="50%"
            cy="50%"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-2xl font-bold">
          <div>{`${days}d ${hours}h ${minutes}m`}</div>
          <div>{`${seconds}s`}</div>
        </div>
      </div>
    </div>
  );
}