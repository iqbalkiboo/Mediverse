import React from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';
import {any, string} from 'prop-types';
import {LongArrowRight} from '@/src/assets/images/svg';
import {useNavigate} from 'react-router';
const DashboardMediverseIncomeMonth = ({
  title,
  value,
  icon,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={cx(
          'p-6 w-full bg-white rounded-2xl',
      )}
    >
      <div
        className={cx(
            'flex justify-between items-center gap-y-2 px-1 py-1 rounded-lg',
        )}
      >
        <div className={cx('flex justify-center items-center')}>
          <div
            className={cx('rounded-full w-12 h-12 grid place-items-center bg-[#FFEDE1]')}

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
            <button className={cx('flex gap-2 items-center mt-2')} onClick={() =>
              navigate(link)
            }>
              <Typography variant="smallMedium" color="text-[#7859EE]">
                Lihat saldo
              </Typography>
              <LongArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};
DashboardMediverseIncomeMonth.propTypes = {
  title: string,
  type: string,
  value: any,
  icon: any,
  link: string,
};

export default DashboardMediverseIncomeMonth;
