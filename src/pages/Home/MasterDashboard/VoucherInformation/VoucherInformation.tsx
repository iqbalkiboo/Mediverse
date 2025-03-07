import React, {lazy} from 'react';
import cx from 'classnames';
import {VoucherInformationType} from '@/src/types/home';
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const DashboardVoucher = lazy(() => import('@/src/pages/Home/MasterDashboard/components/DashboardVoucher'));

interface Props {
  cashback: VoucherInformationType;
  freeDelivery: VoucherInformationType;
}

const VoucherInformation = (props: Props) => {
  const {cashback, freeDelivery} = props;

  return (
    <div>
      <SectionTitle
        title="Informasi Voucher"
        subTitle="Informasi voucher promosi yang digunakan"
      />
      <div className={cx('flex gap-x-6 mt-3')}>
        <DashboardVoucher
          title="Voucher Cashback"
          countTotal={cashback.count_total}
          countUsed={cashback.count_used}
          amountTotal={cashback.amount_total}
          amountUsed={cashback.amount_used}
        />
        <DashboardVoucher
          title="Voucher Gratis Ongkir"
          countTotal={freeDelivery.count_total}
          countUsed={freeDelivery.count_used}
          amountTotal={freeDelivery.amount_total}
          amountUsed={freeDelivery.amount_used}
        />
      </div>
    </div>
  );
};

export default VoucherInformation;
