import React from 'react';
import cx from 'classnames';
import Typography from '@/src/components/Typography';
import {any, bool, string} from 'prop-types';

const Alert = ({status, text, icon, iconAlert, iconAlertColor = '9E9E9E', center = true}) => {
  const Icon = iconAlert;

  return (
    <div className={cx(
        'w-full',
        'flex',
        'justify-start',
        `${center ? 'items-center' : 'items-start'}`,
        'py-2 px-4',
        `${status ? 'bg-[#48AA44]' : 'bg-[#FF555F]'}`)}>
      {icon && (
        <img src={icon} alt="alert-icon" className={cx('mr-2 w-[20px] h-[20px]')} />
      )}
      <div className={cx('mr-2')}>
        <Icon color={iconAlertColor} />
      </div>
      <Typography variant='bodyBase' color='text-white'>
        {text}
      </Typography>
    </div>
  );
};

Alert.propTypes = {
  status: bool,
  text: string,
  icon: string,
  iconAlert: any,
  center: bool,
  iconAlertColor: string,
};

export default Alert;
