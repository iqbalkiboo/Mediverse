import React from 'react';
import cx from 'classnames';
import {
  any,
  bool,
  func,
  string,
} from 'prop-types';
import {formatRupiah} from '@/src/utils/formatRupiah';
import {LongArrowRight} from '@/src/assets/images/svg';

import {Typography} from '@/src/components';

const DashboardSmallCard = ({
  icon,
  title,
  value,
  total,
  suffix,
  bgIcon,
  showButton,
  buttonText,
  customClass,
  onButtonClick,
  titleVariant,
}) => {
  return (
    <div className={cx('p-6 bg-white rounded-xl xs:p-3', customClass)}>
      {bgIcon ? (
        <div className={cx(
            bgIcon,
            'w-11 h-11 rounded-full xs:w-7 xs:h-7',
            'flex items-center justify-center')}>{icon}</div>
      ) : <div>{icon}</div>}
      <Typography
        variant={titleVariant}
        color="text-[#A9A9A9]"
        customClass={cx('mt-4 font-medium')}
      >
        {title}
      </Typography>
      {suffix ? (
        <div className={cx('flex items-end gap-2 mt-2')}>
          <Typography variant="h1" color="" customClass='xs:text-base'>
            {value}
          </Typography>
          <Typography variant="smallMedium" color="text-[#7D7D7D]">
            {suffix}
          </Typography>
        </div>
      ): (
        <Typography variant="h1" color="" customClass={cx('mt-2 xs:text-base')}>
          {value}
        </Typography>
      )}
      {showButton ? (
        <button className={cx('flex gap-2 items-center mt-4')} onClick={onButtonClick}>
          <Typography variant="smallMedium" color="text-[#7859EE]" customClass='xs:text-sm'>
            {buttonText}
          </Typography>
          <LongArrowRight />
        </button>
      ) : (
        <Typography variant="subtitle4" color="" customClass={cx('mt-2')}>
          {total === null ? '' : formatRupiah(total)}
        </Typography>
      )}
    </div>
  );
};

DashboardSmallCard.defaultProps = {
  titleVariant: 'smallMedium',
};

DashboardSmallCard.propTypes = {
  icon: any,
  title: string,
  value: any,
  total: any,
  suffix: string,
  bgIcon: string,
  showButton: bool,
  buttonText: string,
  customClass: any,
  onButtonClick: func,
  titleVariant: string,
};

export default DashboardSmallCard;
