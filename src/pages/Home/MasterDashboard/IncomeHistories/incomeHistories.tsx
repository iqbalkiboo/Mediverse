import {Typography} from '@/src/components';
import React, {lazy, useEffect} from 'react';
import cx from 'classnames';
import DashboardIncomeHistories from '@/src/pages/Home/MasterDashboard/components/DashboardIncomeHistories';
import {ArrowRightBg} from '@/src/assets/images/svg';
import {useNavigate} from 'react-router';
import {ROUTES_TRANSACTION} from '@/src/constants';
import useIncomeHistories from '@/src/pages/Home/MasterDashboard/IncomeHistories/useIncomeHistories';
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

interface Props {
  icon?: any,
};

const IncomeHistories: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const {
    data: {
      dataIncomeHistories,
      status,
      isProvider,
    },
    method: {
      handleIncomeHistory,
    },
  } = useIncomeHistories();

  useEffect(() => {
    handleIncomeHistory();
  }, []);

  const navigateDetail = isProvider ? ROUTES_TRANSACTION.BALANCES :
    `${ROUTES_TRANSACTION.BALANCES}/balance-histories?tab=income`;

  return (
    <>
      <div className={cx('mt-4')}>
        <div className={cx('flex justify-between items-center')}>
          <SectionTitle
            title="Riwayat Penghasilan"
            subTitle="Daftar riwayat penghasilan penjualan terbaru"
          />
          <div
            className={cx('flex gap-x-2 items-center cursor-pointer')}
            onClick={() =>
              navigate(navigateDetail)
            }
          >
            <Typography variant="h5" color="text-[#7859EE]">
              Lihat Lebih Banyak
            </Typography>
            <ArrowRightBg />
          </div>
        </div>
        <SectionCard>
          <div className={cx('flex flex-col justify-center items-center mt-4')}>
            <DashboardIncomeHistories status={status} data={dataIncomeHistories} />
          </div>
        </SectionCard>
      </div>
    </>
  );
};

export default IncomeHistories;
