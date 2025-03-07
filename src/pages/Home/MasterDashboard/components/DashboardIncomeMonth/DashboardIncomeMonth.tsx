import React from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';
import {any, string} from 'prop-types';

const DashboardIncomeMonth = ({
  title,
  value,
  colorPercent,
  percent,
  icon,
  bgIcon = '#FFEDE1',
}) => {
  return (
    <div
      className={cx('w-full')}
    >
      <div
        className={cx(
            'flex justify-between items-center gap-y-2 px-4 py-6 rounded-lg',
        )}
      >
        <div className={cx('flex justify-center items-center')}>
          <div
            className={cx('rounded-full w-12 h-12 grid place-items-center', `bg-[${bgIcon}]`)}

          >
            {icon}
          </div>
          <div className={cx('ml-[16px]')}>
            <Typography variant="bodySmall" color="text-[#9E9E9E]">
              {title}
            </Typography>
            <Typography variant="h1" color="">
              {value}
            </Typography>
            <div className={cx('flex mt-2')}>
              <Typography
                color={''}
                style={{
                  color: `${colorPercent}`,
                }}
                variant="h5"
              >{`${percent}% `}
              </Typography>
              <Typography variant="bodyXSmall" color="">
                {'dari bulan lalu'}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
DashboardIncomeMonth.propTypes = {
  title: string,
  type: string,
  value: any,
  colorPercent: any,
  percent: any,
  icon: any,
  bgIcon: string,
};

export default DashboardIncomeMonth;
