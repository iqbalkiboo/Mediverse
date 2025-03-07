import React from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';
import {any, func, number, string} from 'prop-types';
import {formatRupiah} from '@/src/utils/formatRupiah';
import {ArrowRightBg} from '@/src/assets/images/svg';

const DashboardBigCard = ({
  title,
  type,
  value,
  colorPercent,
  percent,
  onChange,
}) => {
  return (
    <div
      className={cx('w-full')}
    >
      <div className={cx('flex justify-between items-center')}>
        <Typography variant="h4" color="text-[#1D2433]">
          {title}
        </Typography>
        <div
          onClick={onChange}
          className={cx('flex gap-x-2 items-center cursor-pointer')}>
          <Typography variant="h5" color="text-[#7859EE]">
            Lihat Lebih Banyak
          </Typography>
          <ArrowRightBg />
        </div>
      </div>
      <div
        className={cx(
            'flex flex-col gap-y-2 px-4 py-3 rounded-lg bg-[#F5F6FF] mt-[18px]',
        )}
      >
        <Typography variant="bodySmall" color="text-[#9E9E9E]">
          {type} bulan ini
        </Typography>
        <Typography variant="h1" color="">
          {formatRupiah(value)}
        </Typography>
        <div className={cx('flex gap-x-1')}>
          <Typography
            color={''}
            style={{
              color: `${colorPercent}`,
            }}
            variant="h5"
          >{`${percent}% `}</Typography>
          <Typography variant="bodyXSmall" color="">
            {`dari ${type} bulan lalu`}
          </Typography>
        </div>
      </div>
    </div>
  );
};

DashboardBigCard.propTypes = {
  title: string,
  type: string,
  value: number,
  colorPercent: any,
  percent: any,
  onChange: func,
};

export default DashboardBigCard;
