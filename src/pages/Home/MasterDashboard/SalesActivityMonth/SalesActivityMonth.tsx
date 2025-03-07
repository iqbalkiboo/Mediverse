import {Typography} from '@/src/components';
import React, {lazy} from 'react';
import cx from 'classnames';
import {ArrowRightBg} from '@/src/assets/images/svg';
import {formatRupiah} from '@/src/utils/formatRupiah';
import {CurrentMonthActivityProviderType} from '@/src/types/home';
import {useWindowSize} from '@/src/hooks/useWindowSize';
import {useNavigate} from 'react-router';
import {ROUTES_DASHBOARD} from '@/src/constants';
import {colorPercentage} from '@/src/utils/percentage';

const DashboardSalesActivyMonth = lazy(
    () => import('@/src/pages/Home/MasterDashboard/components/DashboardSalesActivtyMonth'));
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
const SalesActivityMonth: React.FC<Props> = (props) => {
  const {data} = props;
  const navigate = useNavigate();
  const {isMobile} = useWindowSize();
  return (
    <>
      <div className={cx('mt-4 flex justify-between items-center')}>
        <div>
          <SectionTitle
            title={props.title}
            subTitle={props.subTitle}
            titleVariant={isMobile ? 'h4' : 'h2'}
            isMobile={isMobile}
          />
        </div>
        <div
          className={cx('flex gap-x-2 items-center cursor-pointer')}
          onClick={() => navigate(`${ROUTES_DASHBOARD.SALES_MONTH}`)}
        >
          {!isMobile &&(
            <Typography variant="h5" color="text-[#7859EE]">
              Lihat lebih banyak
            </Typography>
          )}
          <ArrowRightBg width={isMobile ? '28' : '22'} height={isMobile ? '28' : '22'} />
        </div>
      </div>
      <SectionCard className={cx({'bg-transparent p-0 my-0': isMobile, 'bg-white rounded-xl p-6 my-1': !isMobile})}>
        <div className={cx({'flex-col': isMobile, 'flex': !isMobile})}>
          <DashboardSalesActivyMonth
            icon={props.icon}
            title={props.titleCardPrimary}
            value={formatRupiah(data.potential.current_month)}
            colorPercent={colorPercentage(data.potential.comparison_percentage)}
            percent={data.potential.comparison_percentage}
            bgIcon={props.bgIcon}
            isMobile={isMobile}
          />
          <div className={cx({'none': isMobile, 'flex justify-center items-center bg-white px-6': !isMobile})}>
            <div className={cx({'none': isMobile, 'h-[89px] border-1 border-[#D2D4FF]': !isMobile})}></div>
          </div>
          <DashboardSalesActivyMonth
            icon={props.iconsold}
            title={props.titleCardSecondary}
            value={data.count.current_month}
            colorPercent={colorPercentage(data.count.comparison_percentage)}
            percent={data.count.comparison_percentage}
            bgIcon={props.bgIconSold}
            isMobile={isMobile}
          />
        </div>
      </SectionCard>
    </>
  );
};
SalesActivityMonth.defaultProps = {
  icon: <SalesPotentialIcon />,
  iconsold: <SoldIcon color={'#8756EF'} />,
};

export default SalesActivityMonth;
