import {Typography} from '@/src/components';
import React, {lazy, useEffect} from 'react';
import cx from 'classnames';
import {PaymentCardIcon} from '@/src/assets/images/svg';
import {formatRupiah} from '@/src/utils/formatRupiah';
import {ROUTES_TRANSACTION} from '@/src/constants';
import useMediverseIncomeMonth from '@/src/pages/Home/MasterDashboard/MediverseIncomeMonth/useMediverseIncomeMonth';

const DashboardMediverseIncomeMonth = lazy(() =>
  import('@/src/pages/Home/MasterDashboard/components/DashboardMediverseIncomeMonth'));

interface Props {
  icon?: any,
};
const MediverseIncomeMonth: React.FC<Props> = (props) => {
  const {
    data: {
      dataIncome,
    },
    method: {
      handleIncome,
    },
  } = useMediverseIncomeMonth();

  useEffect(() => {
    handleIncome();
  }, []);
  return (
    <>
      <div className={cx('mt-4 flex justify-between items-center')}>
        <div>
          <Typography variant={'h2'} color="">
            Penghasilan Mediverse Bulan Ini
          </Typography>
          <Typography variant="bodyXSmall" color="text-[#9E9E9E]">
            Informasi voucher promosi yang digunakan
          </Typography>
        </div>

      </div>
      <div className={cx('flex mt-[16px]')}>
        <DashboardMediverseIncomeMonth
          icon={props.icon}
          title="Saldo Midtrans"
          value={formatRupiah(dataIncome.saldoMidtrans)}
          link={`${ROUTES_TRANSACTION.BALANCES}?tab=midtrans`}
        />
        <div className={cx('flex justify-center items-center px-3')}>
        </div>
        <DashboardMediverseIncomeMonth
          icon={props.icon}
          title="Saldo Nicepay"
          value={formatRupiah(dataIncome.saldoNicePay)}
          link={`${ROUTES_TRANSACTION.BALANCES}?tab=nicepay`}
        />
      </div>
    </>
  );
};
MediverseIncomeMonth.defaultProps = {
  icon: <PaymentCardIcon />,
};

export default MediverseIncomeMonth;
