import React from 'react';
import cx from 'classnames';
import ProductSoldIcon from '@/src/assets/images/svg/productSoldIcon';
import Typography from '@/src/components/Typography';

interface Props {
  bgIcon?: string | number,
  icon?: any,
  sold?: string,
  total?: any,
}

const SalesStatisticCard: React.FC<Props> = (props) => {
  return (
    <div className={cx('bg-white rounded-lg px-7 py-6 w-52 h-48 mb-8 mr-4')}>
      <div
        className={cx('rounded-full w-11 h-11 mb-4 grid place-items-center')}
        style={{
          backgroundColor: `${props.bgIcon}`,
        }}
      >
        {props.icon}
      </div>
      <Typography
        className={cx('font-medium text-sm mb-2 text-[#A9A9A9]')}
        variant={'subtitle1'}
        color={''}>
        {props.sold}
      </Typography>
      <Typography
        className={cx('font-bold text-2xl text-[#1A1A1A]')}
        variant={'h1'}
        color={''}>
        {props.total.toLocaleString('de-DE')}
      </Typography>
    </div>
  );
};

SalesStatisticCard.defaultProps = {
  bgIcon: '#EBFFE8',
  icon: <ProductSoldIcon/>,
  sold: 'Produk Terjual',
  total: 32000,
};

export default SalesStatisticCard;
