import React, {lazy, useEffect} from 'react';
import cx from 'classnames';
import {ROLES_NAME, ROUTES_DASHBOARD} from '@/src/constants';
import {Breadcrumb, ButtonBack, Typography} from '@/src/components';
import cookieUtils from '@/src/utils/cookieUtils';
import DateFilter from '@/src/pages/Home/MasterDashboard/components/DateFilter';
import {ChevronDownIcon} from '@/src/assets/images/svg';
import useDashboard from '@/src/pages/Home/MasterDashboard/useDashboardHooks';

const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));
const SmallCardEstimate = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SmallCardEstimate'));
const ChartExpense = lazy(() => import('@/src/pages/Home/MasterDashboard/MedpharmDashboard/components/ChartExpense'));

const {role} = (await cookieUtils.getPermission()) || {
  role: {},
};

const ExpenseStatistics = () => {
  const {
    data: {
      isOpenModalEstimate,
      currentMonthEstimationExpense,
      currentMonthEstimationExpenseData,
    },
    method: {
      handleValueMonth,
      handleModalExpense,
      handleSetYearExpense,
      handleSetMonthExpense,
      getCurrentMonthExpense,
    },
  } = useDashboard();

  const cards = [
    {
      id: 1,
      expense: 'Total Estimasi',
      value: currentMonthEstimationExpenseData.total_spending_estimation,
    },
    {
      id: 2,
      expense: 'Total Pengeluaran',
      value: currentMonthEstimationExpenseData.total_spending,
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

  const dataStatistic = [ROLES_NAME.ADMINISTRATOR_PROVIDER_MEDPHARM].includes(role?.name) ?
    statisticsMedpharm : statisticsMedpoint;

  const totalSpending = dataStatistic.map((item) => {
    return {
      x: item.title,
      y: currentMonthEstimationExpenseData[item.name].spending,
    };
  });

  const totalSpendingEstimation = dataStatistic.map((item) => {
    return {
      x: item.title,
      y: currentMonthEstimationExpenseData[item.name].spending_estimation,
    };
  });

  useEffect(() => {
    getCurrentMonthExpense();
  }, [currentMonthEstimationExpense.month,
    currentMonthEstimationExpense.year]);

  return (
    <div>
      <div className={cx('flex justify-between items-center')}>
        <Breadcrumb/>
        <ButtonBack path={`${ROUTES_DASHBOARD.HOME}`}/>
      </div>
      <div className={cx('flex justify-between items-center mt-[18px] mb-6')}>
        <Typography variant={'h1'} color='text-[#5600E8]'>Estimasi Pengeluaran</Typography>
        <div
          className={cx(
              'flex items-center gap-x-4 py-3 px-4 bg-white rounded-lg cursor-pointer relative',
          )}
          onClick={()=> handleModalExpense('isOpenModal', true)}
        >
          <Typography variant="bodyBase" color="">
            {`${handleValueMonth(currentMonthEstimationExpense.month)} ${currentMonthEstimationExpense.year}`}
          </Typography>
          <ChevronDownIcon color="#0A0A0A" />
        </div>
      </div>
      <SectionCard>
        <div className={cx('flex justify-between items-center gap-x-6')}>
          {cards.map((data, index) => (
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
        <ChartExpense spending={totalSpending} spendingEstimation={totalSpendingEstimation}/>
      </SectionCard>

      {/* pop up modal date */}
      {isOpenModalEstimate &&(
        <DateFilter month={currentMonthEstimationExpense.month}
          currentMonth={currentMonthEstimationExpense.currentMonth}
          year={currentMonthEstimationExpense.year}
          title={'Periode Estimasi Pengeluaran'}
          onClose={() => handleModalExpense('isOpenModal', false)}
          onSetMonth={handleSetMonthExpense}
          onSetYear={handleSetYearExpense}
        />
      )}
    </div>
  );
};

export default ExpenseStatistics;
