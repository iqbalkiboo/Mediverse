import React from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';
import {formatRupiah} from '@/src/utils/formatRupiah';

interface Props {
  key?: number;
  value?: number;
  expense?: string;
}

const SmallCardEstimate = (props: Props) => {
  const {expense, value} = props;

  return (
    <div
      className={cx(
          'w-full flex items-center justify-between px-4 py-3 bg-[#F5F6FF] rounded-lg',
      )}
      key={expense}
    >
      <Typography
        variant="h4"
        color="text-[#1D2433]"
        customClass={cx('w-full text-center')}
      >
        {expense}
      </Typography>
      <div className={cx('h-[20px] border-1 border-[#D2D4FF]')}></div>
      <Typography
        variant="h4"
        color="text-[#745EC8]"
        customClass={cx('w-full text-center')}
      >
        {formatRupiah(value)}
      </Typography>
    </div>
  );
};

export default SmallCardEstimate;
