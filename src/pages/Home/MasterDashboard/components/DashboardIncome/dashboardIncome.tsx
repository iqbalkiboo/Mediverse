import React from 'react';
import cx from 'classnames';
import {
  any,
  bool,
  func,
  string,
} from 'prop-types';
import {LongArrowRight} from '@/src/assets/images/svg';
import {Typography} from '@/src/components';

const DashboardIncome = ({
  icon,
  title,
  value,
  suffix,
  bgIcon,
  showButton,
  buttonText,
  customClass,
  onButtonClick,
  percent,
  colorPercentage,
}) => {
  return (
    <div className={cx('p-6 bg-white rounded-xl', customClass)}>
      {bgIcon ? (
        <div className={cx(
            bgIcon,
            'w-11 h-11 rounded-full',
            'flex items-center justify-center')}>{icon}</div>
      ) : <div>{icon}</div>}
      <Typography
        variant="smallMedium"
        color="text-[#A9A9A9]"
        customClass={cx('mt-4 font-medium')}
      >
        {title}
      </Typography>
      {suffix ? (
        <div className={cx('flex items-end gap-2 mt-2')}>
          <Typography variant="h1" color="">
            {value.toLocaleString('de-DE')}
          </Typography>
          <Typography variant="smallMedium" color="text-[#7D7D7D]">
            {suffix}
          </Typography>
        </div>
      ) : (
        <Typography variant="h1" color="" customClass={cx('mt-2')}>
          {value.toLocaleString('de-DE')}
        </Typography>
      )}
      {showButton ? (
        <button className={cx('flex gap-2 items-center mt-4')} onClick={onButtonClick}>
          <Typography variant="smallMedium" color="text-[#7859EE]">
            {buttonText}
          </Typography>
          <LongArrowRight />
        </button>
      ) : (
        <div className={cx('flex gap-2 items-center mt-4')}>

          <Typography
            color={`text-[${colorPercentage}]`}
            variant="h5">
            {percent > 0 ? `+${percent}%` : `${percent}%`}
          </Typography>
          <Typography variant="bodyXSmall" color="">
            {'dari bulan lalu'}
          </Typography>
        </div>
      )}

    </div>
  );
};

DashboardIncome.propTypes = {
  icon: any,
  title: string,
  value: any,
  suffix: string,
  bgIcon: string,
  showButton: bool,
  buttonText: string,
  customClass: any,
  onButtonClick: func,
  percent: any,
  colorPercentage: string,
};

export default DashboardIncome;
