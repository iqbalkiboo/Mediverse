import React, {lazy} from 'react';
import cx from 'classnames';
import {useNavigate} from 'react-router';
import {Typography} from '@/src/components';
import {ROUTES_DASHBOARD} from '@/src/constants';
import {ArrowRightBg} from '@/src/assets/images/svg';
import {EstimationExpenseProviderType} from '@/src/types/home';

const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SmallCardEstimate = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SmallCardEstimate'));
const ChartExpense = lazy(() => import('@/src/pages/Home/MasterDashboard/MedpharmDashboard/components/ChartExpense'));

type Props = {
  data: EstimationExpenseProviderType;
  type: string;
}

const ExpenseMedpharm = (props: Props) => {
  const {data, type} = props;
  const navigate = useNavigate();
  const expense = [
    {
      id: 1,
      expense: 'Total Estimasi',
      value: data.total_spending_estimation,
    },
    {
      id: 2,
      expense: 'Total Pengeluaran',
      value: data.total_spending,
    },
  ];

  const statisticsMedpharm = [
    {title: 'Kupon Gratis Ongkir', name: 'free_delivery'},
    {title: 'Kupon Cashback', name: 'cashback'},
    {title: 'Promo Paket Diskon', name: 'discount'},
    {title: 'Promo Paket Bundling', name: 'bundling'},
    {title: 'Voucher Gratis Ongkir', name: 'referral'},
    {title: 'Voucher Cashback', name: 'product'},
  ];

  const statisticsMedpoint = [
    {title: 'Promo Paket Diskon', name: 'discount'},
    {title: 'Promo Paket Bundling', name: 'bundling'},
    {title: 'Voucher Cashback', name: 'product'},
  ];

  const dataStatistic = props.type === 'medpharm' ? statisticsMedpharm : statisticsMedpoint;

  const totalSpending = dataStatistic.map((item) => {
    return {
      x: item.title,
      y: data[item.name].spending,
    };
  });

  const totalSpendingEstimation = dataStatistic.map((item) => {
    return {
      x: item.title,
      y: data[item.name].spending_estimation,
    };
  });

  return (
    <div>
      <div className={cx('flex justify-between items-center mt-1')}>
        <SectionTitle
          title='Estimasi Pengeluaran Bulan Ini'
          subTitle='Informasi estimasi biaya yang dikeluarkan untuk promosi
        '/>
        <div className={cx('flex gap-x-2 items-center cursor-pointer')}
          onClick={()=> navigate(`${ROUTES_DASHBOARD.EXPENSE_STATISTICS}`)}
        >
          <Typography variant="h5" color="text-[#7859EE]">
            Lihat Lebih Banyak
          </Typography>
          <ArrowRightBg />
        </div>
      </div>

      <SectionCard>
        <div className={cx('flex justify-between items-center gap-x-6')}>
          {expense.map((data, index) => (
            <SmallCardEstimate
              expense={data.expense}
              value={data.value}
              key={index}
            />
          ))}
        </div>
        <div className={cx('flex w-full justify-center mt-8 gap-x-8')}>
          <div className={cx('flex gap-x-2')}>
            <div className={cx('w-4 h-4 bg-[#C6C9FF] rounded-full')}></div>
            <Typography
              variant="bodyXSmall"
              color=""
              customClass={cx('italic font-semibold')}
            >
              Estimasi Pengeluaran
            </Typography>
          </div>
          <div className={cx('flex gap-x-2')}>
            <div className={cx('w-4 h-4 bg-[#8E73F4] rounded-full')}></div>
            <Typography
              variant="bodyXSmall"
              color=""
              customClass={cx('italic font-semibold')}
            >
              Pengeluaran
            </Typography>
          </div>
        </div>
        <ChartExpense
          spending={totalSpending}
          spendingEstimation={totalSpendingEstimation}
          type={type}/>
      </SectionCard>
    </div>
  );
};

export default ExpenseMedpharm;
