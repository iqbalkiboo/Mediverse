import React, {lazy} from 'react';
import cx from 'classnames';
import {PurchaseCurrentMonthType} from '@/src/types/home';
import {useNavigate} from 'react-router';
import {ROUTES_DASHBOARD} from '@/src/constants';
import {colorPercentage} from '@/src/utils/percentage';
const DashboardBigCard = lazy(() => import('../components/DashboardBigCard'));
const SectionTitle = lazy(() => import('../components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

const PurchaseMonth = (props: {
  data: PurchaseCurrentMonthType
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={cx('mt-3')}>
        <SectionTitle
          title="Nilai Pembelian Bulan Ini"
          subTitle="Akumulasi jumlah pembelian pengguna di Mediverse" />
      </div>
      <SectionCard>
        <div className={cx('flex')}>
          <DashboardBigCard
            title="Gross Transaction Value"
            type="GTV"
            onChange={() => navigate(`${ROUTES_DASHBOARD.GROSS_MERCHANDISE_VALUE}?t=gross`)}
            value={props.data.gmv.current_month}
            colorPercent={colorPercentage(props.data.gmv.comparison_percentage)}
            percent={props.data.gmv.comparison_percentage > 0 ?
              `+${props.data.gmv.comparison_percentage}` :
              props.data.gmv.comparison_percentage}
          />
          <div className={cx('flex justify-end items-end bg-white px-6')}>
            <div className={cx('h-full border-1 border-[#D2D4FF]')}></div>
          </div>
          <DashboardBigCard
            title="Net Transaction Value"
            type="NTV"
            onChange={() => navigate(`${ROUTES_DASHBOARD.NET_MERCHANDISE_VALUE}?t=net`)}
            value={props.data.nmv.current_month}
            colorPercent={colorPercentage(props.data.nmv.comparison_percentage)}
            percent={props.data.nmv.comparison_percentage > 0 ?
              `+${props.data.nmv.comparison_percentage}` :
              props.data.nmv.comparison_percentage}
          />
        </div>
      </SectionCard>
    </>
  );
};

export default PurchaseMonth;
