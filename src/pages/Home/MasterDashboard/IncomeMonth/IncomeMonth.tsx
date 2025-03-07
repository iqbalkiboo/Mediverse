import React, {lazy} from 'react';
import cx from 'classnames';
import {formatRupiah} from '@/src/utils/formatRupiah';
import {ArrowRightBg} from '@/src/assets/images/svg';

import {Typography} from '@/src/components';
import {CurrentMonthIncomeProviderType} from '@/src/types/home';
import {useNavigate} from 'react-router';
import {ROUTES_DASHBOARD} from '@/src/constants';
import {colorPercentage} from '@/src/utils/percentage';
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const DashboardIncomeMonth = lazy(() => import('@/src/pages/Home/MasterDashboard/components/DashboardIncomeMonth'));


interface Props {
  iconIncome?: any;
  iconService?: any;
  iconSpending?: any;
  role?: any
  data: CurrentMonthIncomeProviderType,
}
const IncomeMonth: React.FC<Props> = (props) => {
  const navigation = useNavigate();

  const {data} = props;

  return (
    <>
      <div className={cx('mt-4 flex justify-between items-center')}>
        <div>
          <SectionTitle
            title={'Pendapatan Bulan Ini'}
            subTitle={'Informasi pendapatan penjualan hari ini'}
          />
        </div>
        <div
          className={cx('flex gap-x-2 items-center cursor-pointer')}
          onClick={() => {}}
        >
          <Typography
            onClick={() => navigation(ROUTES_DASHBOARD.SALES_REVENUE)}
            variant="h5"
            color="text-[#7859EE]">
            Lihat lebih banyak
          </Typography>
          <ArrowRightBg />
        </div>
      </div>
      <SectionCard>
        <div className={cx('flex')}>
          <DashboardIncomeMonth
            icon={props.iconIncome}
            title={'Pendapatan Pemesanan'}
            value={formatRupiah(data.income.current_month)}
            colorPercent={colorPercentage(data.income.comparison_percentage)}
            percent={data.income.comparison_percentage}
            bgIcon={'#E8F5FF'}
          />
          <div className={cx('flex justify-center items-center bg-white px-6')}>
            <div className={cx('h-[41px] border-1 border-[#D2D4FF]')}></div>
          </div>
          <DashboardIncomeMonth
            icon={props.iconService}
            title={'Potongan Biaya Layanan'}
            value={formatRupiah(data.service_fee.current_month)}
            colorPercent={colorPercentage(data.service_fee.comparison_percentage)}
            percent={data.service_fee.comparison_percentage}
            bgIcon={'#E8F5FF'}
          />
          <div className={cx('flex justify-center items-center bg-white px-6')}>
            <div className={cx('h-[41px] border-1 border-[#D2D4FF]')}></div>
          </div>
          <DashboardIncomeMonth
            icon={props.iconSpending}
            title={'Pengeluaran Biaya Promo'}
            value={formatRupiah(data.discount.current_month)}
            colorPercent={colorPercentage(data.discount.comparison_percentage)}
            percent={data.discount.comparison_percentage}
            bgIcon={'#E8F5FF'}
          />
        </div>
      </SectionCard>
    </>
  );
};

export default IncomeMonth;
