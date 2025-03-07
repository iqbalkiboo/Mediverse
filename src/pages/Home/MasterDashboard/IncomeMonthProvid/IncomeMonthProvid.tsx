import React, {lazy, useEffect} from 'react';
import cx from 'classnames';

import {
  DisconIcon,
  DollarIcon,
  ServiceFee,
  WalletIcon,
} from '@/src/assets/images/svg';
import {Typography} from '@/src/components';
import {formatDate} from '@/src/utils/formatDate';
import {formatRupiah} from '@/src/utils/formatRupiah';
import useIncomeMonthProvid from '@/src/pages/Home/MasterDashboard/IncomeMonthProvid/useIncomeMonthProvid';
import {useNavigate} from 'react-router';
import {ROUTES_TRANSACTION} from '@/src/constants';
import {colorPercentage} from '@/src/utils/percentage';

const DashboardIncome = lazy(() => import('@/src/pages/Home/MasterDashboard/components/DashboardIncome'));

const IncomeMonthProvid = () => {
  const {
    data: {
      dataIncomeProvider,
    },
    method: {
      handleSaldoProvider,
      handleIncomeProvider,
    },
  } = useIncomeMonthProvid();

  useEffect(() => {
    handleSaldoProvider();
    handleIncomeProvider();
  }, []);

  const navigate = useNavigate();

  const dataActivity = [
    {
      id: 1,
      title: 'Saldo Saat Ini',
      value: dataIncomeProvider.currentIncome,
      icon: <WalletIcon />,
      bgIcon: 'bg-[#E8F5FF]',
    },
    {
      id: 2,
      title: 'Total Penghasilan',
      value: dataIncomeProvider.totalIncome.amount,
      icon: <DollarIcon />,
      bgIcon: 'bg-[#E8F5FF]',
      percent: dataIncomeProvider.totalIncome.percentage,
    },
    {
      id: 3,
      title: 'Biaya Layanan',
      value: dataIncomeProvider.serviceFee.amount,
      icon: <ServiceFee />,
      bgIcon: 'bg-[#E8F5FF]',
      percent: dataIncomeProvider.serviceFee.percentage,
    },
    {
      id: 4,
      title: 'Potongan Biaya Promo',
      value: dataIncomeProvider.discount.amount,
      icon: <DisconIcon />,
      bgIcon: 'bg-[#E8F5FF]',
      percent: dataIncomeProvider.discount.percentage,
    },
  ];
  return (
    <div>
      <div className={cx('mt-6 flex justify-between items-center')}>
        <div>
          <Typography variant={'h2'} color="">
                        Penghasilan Provider Bulan Ini
          </Typography>
          <Typography variant="xSmallMedium" color="text-[#9E9E9E]">
                        Total penghasilan provider pada periode bulan ini
          </Typography>
        </div>
        <div>
          <Typography variant={'h3'} color="">
            {formatDate(new Date(), ' ', 'MMMM')}
          </Typography>
        </div>
      </div>
      <div className={cx('mt-3 grid grid-cols-4 gap-x-6')}>
        {dataActivity.filter( (data) => data.id <= 1 ).map((filterData) =>(
          <DashboardIncome
            key={filterData.id}
            icon={filterData.icon}
            title={filterData.title}
            value={formatRupiah(filterData.value)}
            bgIcon={filterData.bgIcon}
            showButton={true}
            buttonText='Lihat saldo'
            customClass='shadow-[0_15px_20px_0_rgba(211, 192, 214, 0.2)]'
            onButtonClick={() => navigate(`${ROUTES_TRANSACTION.BALANCES}?tab=allTransaction`)}
          />
        ))}
        {dataActivity.filter( (data) => data.id >= 2).map((filterData) => (
          <DashboardIncome
            key={filterData.id}
            icon={filterData.icon}
            title={filterData.title}
            value={formatRupiah(filterData.value)}
            percent={filterData.percent}
            bgIcon={filterData.bgIcon}
            showButton={false}
            customClass='shadow-[0_15px_20px_0_rgba(211, 192, 214, 0.2)]'
            colorPercentage={colorPercentage(filterData.percent)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeMonthProvid;
