import React from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';
import {any, bool, string} from 'prop-types';

const DashboardSalesActivyMonth = ({
  title,
  value,
  colorPercent,
  percent,
  icon,
  bgIcon = '#FFEDE1',
  isMobile = false,
}) => {
  return (
    <div
      className={cx('w-full')}
    >
      <div
        className={cx(
            'flex justify-between items-center gap-y-2 px-4 py-3',
            {'bg-white mb-4 rounded-xl shadow-md': isMobile, 'bg-[#F5F6FF] rounded-lg': !isMobile},
        )}
      >
        <div className={cx('flex justify-center items-center')}>
          <div
            className={cx('rounded-full grid place-items-center', `bg-[${bgIcon}]`,
                {'w-7 h-7': isMobile, 'w-12 h-12': !isMobile},
            )}
          >
            {icon}
          </div>
          <div className={cx('ml-[16px]')}>
            <Typography variant="bodySmall"
              color="text-[#9E9E9E]"
              customClass={`mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {title}
            </Typography>
            <Typography
              variant="h1"
              color=""
              customClass={`${isMobile ? 'text-base' : 'text-xl'}`}
            >
              {value}
            </Typography>
          </div>
        </div>
        <div className={cx({'mt-4': isMobile})}>
          <Typography
            color={''}
            style={{
              color: `${colorPercent}`,
            }}
            variant="h5"
            customClass={isMobile ? 'text-end' : ''}
          >{percent > 0 ? `+${percent}%` : `${percent}%` }
          </Typography>
          <Typography variant="bodyXSmall" color="">
            {'dari bulan lalu'}
          </Typography>
        </div>
      </div>
    </div>

  );
};
DashboardSalesActivyMonth.propTypes = {
  title: string,
  type: string,
  value: any,
  colorPercent: any,
  percent: any,
  icon: any,
  bgIcon: string,
  isMobile: bool,
};

export default DashboardSalesActivyMonth;
