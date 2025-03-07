import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';
import {isEmpty} from 'lodash';

interface IPropsCountdown {
  date: any
  textColor?: string,
  textVariant?: string,
  textExpired?: string,
  customClassText?: string,
}

interface ICountdown {
  countdownDays: number | string; // days
  countdownHours: number | string; // hours
  countdownMinutes: number | string; // minutes
  countdownSeconds: number | string; // seconds
}

const formatTimezone = (date) => {
  if (isEmpty(date)) return '-';

  const splitDate = date.split(' ');
  return `${splitDate[0]}T${splitDate[1]}Z`;
};


const Countdown: React.FC<IPropsCountdown> = ({
  date,
  textColor,
  textVariant,
  textExpired,
  customClassText,
}) => {
  const [expiryTime, setExpiryTime] = useState(date);
  const [countdownTime, setCountdownTime]= useState<ICountdown>({
    countdownDays: '',
    countdownHours: '',
    countdownMinutes: '',
    countdownSeconds: '',
  });

  const countdownTimer = () => {
    const timeInterval= setInterval(() => {
      const splitDate = formatTimezone(expiryTime);
      const countdownDateTime = new Date(splitDate).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      const totalHours =
        Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000).toString().padStart(2, '0');

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
      }
    }, 1000);
  };

  useEffect(() => {
    countdownTimer();
  }, []);

  return (
    <div className={cx('flex flex-row justify-center items-center')}>
      {expiryTime !== false ? (
        <>
          {/* Render countdown hours */}
          <Typography variant={textVariant} color={textColor} customClass={customClassText}>
            {countdownTime.countdownHours || '00'}
          </Typography>
          <Typography variant={textVariant} color={textColor} customClass={customClassText}>
            :
          </Typography>

          {/* Render countdown minutes */}
          <Typography variant={textVariant} color={textColor} customClass={customClassText}>
            {countdownTime.countdownMinutes || '00'}
          </Typography>
          <Typography variant={textVariant} color={textColor} customClass={customClassText}>
            :
          </Typography>

          {/* Render countdown second */}
          <Typography variant={textVariant} color={textColor} customClass={customClassText}>
            {countdownTime.countdownSeconds || '00'}
          </Typography>
        </>
      ) : (
        <Typography variant={textVariant} color={textColor}>
          {textExpired}
        </Typography>
      )}
    </div>
  );
};

Countdown.defaultProps = {
  textColor: '',
  textVariant: 'bodyXxSmall',
  textExpired: 'Pesanan kadaluarsa',
  customClassText: '',
};

export default Countdown;
