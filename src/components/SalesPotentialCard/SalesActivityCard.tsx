import React from 'react';
import cx from 'classnames';
import SalesPotentialIcon from '@/src/assets/images/svg/salesPotentialIcon';
import Typography from '@/src/components/Typography';
import {formatRupiah} from '@/src/utils/fromatCurrency';

interface Props {
  bgIcon?: string | number,
  icon?: any,
  sold?: string,
  total?: number,
  percent?: number,
  colorPercent?: any,
  fromLastMonth?: string,
};

const SalesActivityCard: React.FC<Props> = (props) => {
  return (
    <div
      className={cx('flex justify-between items-center bg-[#F5F6FF] py-[3.25rem] px-7 w-[496px] h-[89px] rounded-lg')}>
      <div className={cx('flex justify-center items-center')}>
        <div className={cx('mr-4')}>
          <div
            className={cx('rounded-full w-12 h-12 grid place-items-center')}
            style={{
              backgroundColor: `${props.bgIcon}`,
            }}
          >
            {props.icon}
          </div>
        </div>
        <div>
          <Typography
            className={cx('font-medium text-sm mb-1 text-[#9E9E9E]')}
            variant={'subtitle1'}
            color={''}>
            {props.sold}
          </Typography>
          <Typography
            className={cx('font-bold text-2xl mb-2 text-[#1D2433]')}
            variant={'h1'}
            color={''}>
            {formatRupiah(props.total)}
          </Typography>
        </div>
      </div>
      <div>
        <Typography
          className={cx('font-extrabold text-xs')}
          style={{
            color: `${props.colorPercent}`,
          }}
          variant={'subtitle1'}
          color={''}>
          {`+${props.percent}%`}
        </Typography>
        <Typography
          className={cx('font-medium text-sm mb-2 text-[#1D2433]')}
          variant={'subtitle2'}
          color={''}>
          {props.fromLastMonth}
        </Typography>
      </div>
    </div>
  );
};

SalesActivityCard.defaultProps = {
  bgIcon: '#FFEDE1',
  icon: <SalesPotentialIcon/>,
  sold: 'Potensi Penjualan',
  total: 12000000,
  percent: 20,
  colorPercent: '#26C536',
  fromLastMonth: 'dari bulan lalu',
};

export default SalesActivityCard;
