import React, {lazy, useEffect} from 'react';
import cx from 'classnames';
import {Breadcrumb, ButtonBack, SelectBox, Typography} from '@/src/components';
import {ROUTES_DASHBOARD} from '@/src/constants';

import useDashboard, {OPERATOR_MEDPOINT_ROLE,
  PROVIDER_MEDPHARM_ROLE} from '@/src/pages/Home/MasterDashboard/useDashboardHooks';
import ChartBar from '@/src/components/ChartBar';
import {generateArrayOfYears} from '@/src/utils/formatDate';
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

const options = generateArrayOfYears(10).map((item) => {
  return {value: item, label: String(item)};
});


const SaleIncomeStatisticProvider = () => {
  const {
    data: {
      role,
      dataChartSalesRevenue,
      dataChartSalesRevenuePrevious,
      statisticCurrentMonthYear,
    },
    method: {
      handleGetChartOrderRevenue,
      handleSelectedYearOrderRevenue,
    },
  } = useDashboard();

  useEffect(() => {
    handleGetChartOrderRevenue();
  }, []);

  return (
    <div>
      {/* Breadcumb */}
      <div className={cx('flex items-center justify-between')}>
        <Breadcrumb />
        <ButtonBack path={ROUTES_DASHBOARD.HOME} />
      </div>
      <div className={cx('flex justify-between items-center')}>
        <Typography variant="h1" color="text-[#5600E8]">
          Pendapatan Penjualan
        </Typography>
        <SelectBox
          name="statistic"
          isSearchable={false}
          defaultValue={options.filter((opt) => opt.value === statisticCurrentMonthYear)}
          onChange={(e) => handleSelectedYearOrderRevenue(e.value)}
          options={options}
          className={cx('w-30')}
        />
      </div>
      {/* sales potential statistics */}
      <SectionCard>
        <div>
          <div className={cx('mt-4')}>
            <ChartBar
              titleTooltip={'Pendapatan'}
              height={500}
              data={dataChartSalesRevenue}
              isMultiple={dataChartSalesRevenuePrevious}
              rupiah
              bottomLegend={PROVIDER_MEDPHARM_ROLE.includes(role?.name)}
              leftLegend={OPERATOR_MEDPOINT_ROLE.includes(role?.name)}
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default SaleIncomeStatisticProvider;
