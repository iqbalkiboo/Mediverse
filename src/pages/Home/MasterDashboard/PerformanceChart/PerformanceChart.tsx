import React, {lazy} from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import {SelectBox, Typography} from '@/src/components';
import {generateArrayOfYears} from '@/src/utils/formatDate';
import useDashboard from '@/src/pages/Home/MasterDashboard/useDashboardHooks';
import {ChartCurrentMonthResultType} from '@/src/types/home';

const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const ChartPerformance = lazy(() => import('@/src/pages/Home/MasterDashboard/components/ChartPerformance'));
interface Props {
  onChangeYear: (value) => void;
  data: ChartCurrentMonthResultType[];
  dataCumulative: ChartCurrentMonthResultType[];
}

const PerformanceChart = ({onChangeYear, data, dataCumulative}: Props) => {
  const {
    data: {
      queryTab,
      chartPerformance,
    },
  } = useDashboard();

  const options = generateArrayOfYears(10).map((item) => {
    return {value: item, label: String(item)};
  });

  const renderTitlePerformance = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return 'All Year Performance';
      case 'actived-user-overview':
        return 'Monthly Active User';
      case 'conversion-dashboard':
        return 'Purchased user performance';
      default:
        return 'All Year Performance';
    }
  };

  const renderDescriptionPerformance = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return 'Informasi performance Mediverse pada setiap tahunnya';
      case 'actived-user-overview':
        return 'Informasi penambahan user baru dalam rentang 1 tahun';
      case 'conversion-dashboard':
        return 'Informasi grafik rata rata pembelian dari user dalam rentang 1 tahun';
      default:
        return 'Informasi performance Mediverse pada setiap tahunnya';
    }
  };

  const titleChartBar = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return 'Registered User';
      case 'actived-user-overview':
        return 'Active User';
      case 'conversion-dashboard':
        return 'User Purchesed';
      default:
        return 'Registered User';
    }
  };

  const renderValueOption = () => {
    switch (queryTab) {
      case 'marketing-dashboard':
        return options.filter((opt) => opt.value === chartPerformance.allYearPerformance.params.year);
      case 'actived-user-overview':
        return options.filter((opt) => opt.value === chartPerformance.monthlyActiveUser.params.year);
      case 'conversion-dashboard':
        return options.filter((opt) => opt.value === chartPerformance.purchaseUser.params.year);
      default:
        return options.filter((opt) => opt.value === chartPerformance.allYearPerformance.params.year);
    }
  };

  return (
    <div>
      <div className={cx('mt-5')}>
        <div className={cx('flex justify-between')}>
          <SectionTitle
            title={renderTitlePerformance()}
            subTitle={renderDescriptionPerformance()}
          />
          <SelectBox
            name="statistic"
            isSearchable={false}
            value={renderValueOption()}
            defaultValue={options.filter((opt) => opt.value === dayjs().year())}
            onChange={(e) => onChangeYear(e.value)}
            options={options}
            className={cx('w-30')}
          />
        </div>
      </div>
      <SectionCard>
        <ChartPerformance
          data={data}
          dataLine={dataCumulative}
          isLoading={
            chartPerformance.allYearPerformance.isLoading ||
            chartPerformance.monthlyActiveUser.isLoading ||
            chartPerformance.purchaseUser.isLoading
          }
        />
        <div className={cx('flex mt-2 gap-y-2 gap-x-4 items-center justify-center')}>
          <div className={cx('flex gap-x-1')}>
            <div className={cx('w-10 h-4 bg-chatPrimary rounded-sm')}></div>
            <Typography variant={'bodyXxSmall'} color='text-[#1D2433]' customClass='italic font-semibold'>
              {titleChartBar()}
            </Typography>
          </div>
          <div className={cx('flex gap-x-1')}>
            <div className={cx('px-5 rounded-sm py-[3px] self-center bg-[#8E73F4]')}></div>
            <Typography variant={'bodyXxSmall'} color='text-[#1D2433]' customClass='italic font-semibold'>
              Comulative
            </Typography>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default PerformanceChart;
