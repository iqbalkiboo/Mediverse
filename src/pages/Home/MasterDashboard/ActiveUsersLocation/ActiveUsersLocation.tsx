import React, {lazy} from 'react';
import cx from 'classnames';

import {SelectBox, Typography} from '@/src/components';
import dayjs from 'dayjs';
import useDashboard from '@/src/pages/Home/MasterDashboard/useDashboardHooks';

const ChartMap = lazy(() => import('./components/ChartMap'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

interface Props {
  onChangeMonth: (value) => void
}

const ActiveUserslocation = ({onChangeMonth}: Props) => {
  const {
    data: {
      month,
      userActiveLocation,
    },
    method: {
      handleSetDataUserLocation,
    },
  } = useDashboard();

  return (
    <div className={cx('mt-6')}>
      <div className={cx('flex justify-between')}>
        <SectionTitle
          title="Active User Location"
          subTitle='Informasi lokasi user dari user yang sudah teregistrasi'
        />
        <SelectBox
          name="statistic"
          isSearchable={false}
          defaultValue={month.filter((opt) => opt.value === dayjs().month())}
          onChange={(e) => onChangeMonth(e.value)}
          options={month}
          className={cx('w-30')}
        />
      </div>
      <SectionCard>
        <ChartMap userActiveLocation={userActiveLocation} handleSetDataUserLocation={handleSetDataUserLocation} />
        <div className={cx('flex mt-2 gap-y-2 gap-x-4 items-center justify-center')}>
          <div className={cx('flex gap-x-1')}>
            <div className={cx('w-10 h-4 bg-grayDarkBg rounded-sm')}></div>
            <Typography variant={'bodyXxSmall'} color='text-[#1D2433]' customClass='italic font-semibold'>
              0
            </Typography>
          </div>
          <div className={cx('flex gap-x-1')}>
            <div className={cx('w-10 h-4 bg-chatPrimary1 rounded-sm')}></div>
            <Typography variant={'bodyXxSmall'} color='text-[#1D2433]' customClass='italic font-semibold'>
                &lt; 500
            </Typography>
          </div>
          <div className={cx('flex gap-x-1')}>
            <div className={cx('w-10 h-4 bg-[#8E73F4] rounded-sm')}></div>
            <Typography variant={'bodyXxSmall'} color='text-[#1D2433]' customClass='italic font-semibold'>
              500 - 1000
            </Typography>
          </div>
          <div className={cx('flex gap-x-1')}>
            <div className={cx('w-10 h-4 rounded-sm')} style={{background: '#745EC8'}}></div>
            <Typography variant={'bodyXxSmall'} color='text-[#1D2433]' customClass='italic font-semibold'>
              &gt; 1000
            </Typography>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default ActiveUserslocation;
