import React from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';
import {BgVoucher} from '@/src/assets/images/svg';
import {formatRupiah} from '@/src/utils/formatRupiah';
import PieChartPercent from '@/src/pages/Home/MasterDashboard/components/PieChartPercent';

interface Props {
  title: string;
  amountUsed: number;
  countUsed: number;
  amountTotal: number;
  countTotal: number;
}

const DashboardVoucher: React.FC<Props> = (props) => {
  const {title, amountUsed, countUsed, amountTotal, countTotal} =
    props;

  const percentage = countUsed ? ( countUsed / countTotal) * 100 : 0;

  return (
    <div className={cx('w-full')}>
      <div
        className={cx(
            'relative text-center w-full bg-[#EEEAFF] py-3 rounded-t-lg overflow-hidden',
        )}
      >
        <div className={cx('absolute top-1')}>
          <BgVoucher />
        </div>
        <Typography
          customClass={cx('font-bold')}
          variant="bodyBase"
          color="text-[#1D2433]"
        >
          {title}
        </Typography>
      </div>
      <div className={cx('bg-white px-14 py-6 rounded-b-lg')}>
        <div className={cx('flex justify-between items-center')}>
          {/* Voucher Generate */}
          <div className={cx('flex gap-x-12')}>
            <div className={cx('flex flex-col gap-y-2 text-center')}>
              <Typography variant={'smallMedium'} color="text-[#9E9E9E]">
                Voucher Digenerate
              </Typography>
              <Typography variant={'h1'} color="">
                {countTotal}
              </Typography>
              <div className={cx('flex justify-center')}>
                <Typography
                  customClass={cx(
                      'py-1 px-3 bg-[#F5F6FF] rounded-lg w-fit text-center',
                  )}
                  variant={'xSmallMedium'}
                  color="text=[#1A1A1A]"
                >
                  {formatRupiah(amountTotal)}
                </Typography>
              </div>
            </div>
            <div className="h-[96px] border border-[#D2D4FF] basis-auto"></div>
          </div>
          {/* Voucher Used */}
          <div className={cx('flex items-center')}>
            <div className={cx('w-[120px] h-[100px] -mt-10 mr-10')}>
              <PieChartPercent percent={percentage} />
            </div>
            <div className={cx('flex flex-col gap-y-2 text-center mr-8')}>
              <Typography variant={'smallMedium'} color="text-[#9E9E9E]">
                Voucher Dipakai
              </Typography>
              <Typography variant={'h1'} color="">
                {countUsed}
              </Typography>
              <div className={cx('flex justify-center')}>
                <Typography
                  customClass={cx('py-1 px-3 bg-[#F5F6FF] rounded-lg')}
                  variant={'xSmallMedium'}
                  color="text=[#1A1A1A]"
                >
                  {formatRupiah(amountUsed)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardVoucher;
