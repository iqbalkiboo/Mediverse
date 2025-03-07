import React, {useEffect} from 'react';
import cx from 'classnames';
import {Breadcrumb, ButtonBack, SelectBox, Typography} from '@/src/components';
import {ROUTES_DASHBOARD} from '@/src/constants';

import useDashboard from '@/src/pages/Home/MasterDashboard/useDashboardHooks';
import ChartBar from '@/src/components/ChartBar';
import {useLocation} from 'react-router';
import SectionCard from '@/src/pages/Home/MasterDashboard/components/SectionCard';
import {isEmpty} from 'lodash';
import {generateArrayOfYears} from '@/src/utils/formatDate';

const options = generateArrayOfYears(10).map((item) => {
  return {value: item, label: String(item)};
});


const Card = (props: {
  text: string
  onClick: () => void
  isActive: boolean
}) => {
  return (
    <div
      onClick={props.onClick}
      className={cx('p-2 rounded-md min-w-6 m-2 cursor-pointer', {
        'bg-[#7859EE] text-white': props.isActive,
        'bg-[#F5F6FF] text-[#616161]': !props.isActive,
      })}>
      {props.text}
    </div>
  );
};

const StatisticSaleCurrentMonth = () => {
  const search = useLocation().search;
  const type = new URLSearchParams(search).get('t') || 'gross';

  const {
    data: {
      statisticCurrentMonthValue,
      statisticCurrentMonthYear,
      statisticCurrentMonth,
    },
    method: {
      handleFetchStatisticCurrentMonth,
      handleStatisticSelectedYear,
      handleSelectedProviderType,
    },
  } = useDashboard();

  const {providerType} = statisticCurrentMonth;

  useEffect(() => {
    handleFetchStatisticCurrentMonth(statisticCurrentMonthYear, type, providerType);
  }, [providerType]);

  return (
    <div>
      {/* Breadcumb */}
      <div className={cx('flex items-center justify-between')}>
        <Breadcrumb />
        <ButtonBack path={ROUTES_DASHBOARD.HOME} />
      </div>
      <div className={cx('flex justify-between items-center mt-4 mb-4')}>
        <Typography variant="h1" color="text-[#5600E8]">
          {type === 'gross' ? 'Gross' : 'Net'} Transaction Value
        </Typography>
        <SelectBox
          name="statistic"
          isSearchable={false}
          defaultValue={options.filter((opt) => opt.value === statisticCurrentMonthYear)}
          onChange={(e) => handleStatisticSelectedYear(e.value)}
          options={options}
          className={cx('w-36')}
        />
      </div>
      {/* sales potential statistics */}
      <SectionCard>
        <div>
          <div className={cx('flex justify-center items-center text-center')}>
            <Card
              isActive={isEmpty(providerType)}
              text={`Total ${type === 'gross' ? 'GTV' : 'NTV'}`}
              onClick={() => handleSelectedProviderType('')} />
            <Card
              isActive={providerType === 'medevo'}
              text={'Medevo'} onClick={() => handleSelectedProviderType('medevo')} />
            <Card
              isActive={providerType === 'medpoint'}
              text={'Medpoint'} onClick={() => handleSelectedProviderType('medpoint')} />
            <Card
              isActive={providerType === 'medpharm'}
              text={'Medpharm'} onClick={() => handleSelectedProviderType('medpharm')} />
          </div>
          <div className={cx('mt-4')}>
            <ChartBar
              isLoading={statisticCurrentMonth.isLoading}
              titleTooltip={type === 'gross' ? 'GMV' : 'NMV'}
              type={type}
              height={500}
              data={statisticCurrentMonthValue}
              rupiah
              bottomLegend
              leftLegend
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default StatisticSaleCurrentMonth;
