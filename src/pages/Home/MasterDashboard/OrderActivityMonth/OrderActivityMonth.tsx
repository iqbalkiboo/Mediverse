import {Typography} from '@/src/components';
import React, {lazy} from 'react';
import cx from 'classnames';
import {ArrowRightBg} from '@/src/assets/images/svg';
import DashboardSalesActivyMonth from '@/src/pages/Home/MasterDashboard/components/DashboardSalesActivtyMonth';
import {formatRupiah} from '@/src/utils/formatRupiah';
import {useNavigate} from 'react-router';
import {ROUTES_DASHBOARD} from '@/src/constants';
import {CurrentMonthActivityProviderType} from '@/src/types/home';
import {colorPercentage} from '@/src/utils/percentage';
const SoldIcon = lazy(() => import('@/src/assets/images/svg/productSoldIcon'));
const SalesPotentialIcon = lazy(() => import('@/src/assets/images/svg/salesPotentialIcon'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));

interface Props {
  data: CurrentMonthActivityProviderType;
  icon?: any;
  iconsold?: any;
  role?: any
  bgIcon?: string;
  bgIconSold?: string;
  title: string;
  subTitle: string;
  titleCardPrimary: string;
  titleCardSecondary: string;
}
const OrderActivityMonth: React.FC<Props> = (props) => {
  const {data} = props;
  const navigate = useNavigate();
  return (
    <>
      <div className={cx('mt-4 flex justify-between items-center')}>
        <div>
          <SectionTitle
            title={props.title}
            subTitle={props.subTitle}
          />
        </div>
        <div
          className={cx('flex gap-x-2 items-center cursor-pointer')}
          onClick={() => navigate(`${ROUTES_DASHBOARD.ORDER_MONTH}`)}
        >
          <Typography variant="h5" color="text-[#7859EE]">
            Lihat lebih banyak
          </Typography>
          <ArrowRightBg />
        </div>
      </div>
      <SectionCard>
        <div className={cx('flex')}>
          <DashboardSalesActivyMonth
            icon={props.icon}
            title={props.titleCardPrimary}
            value={formatRupiah(data.potential.current_month)}
            colorPercent={colorPercentage(data.potential.comparison_percentage)}
            percent={data.potential.comparison_percentage}
            bgIcon={props.bgIcon}
          />
          <div className={cx('flex justify-center items-center bg-white px-6')}>
            <div className={cx('h-[89px] border-1 border-[#D2D4FF]')}></div>
          </div>
          <DashboardSalesActivyMonth
            icon={props.iconsold}
            title={props.titleCardSecondary}
            value={data.count.current_month}
            colorPercent={colorPercentage(data.count.comparison_percentage)}
            percent={data.count.comparison_percentage}
            bgIcon={props.bgIconSold}
          />
        </div>
      </SectionCard>
    </>
  );
};
OrderActivityMonth.defaultProps = {
  icon: <SalesPotentialIcon />,
  iconsold: <SoldIcon color={'#8756EF'} />,
};

export default OrderActivityMonth;
