import { lazy } from 'react';
import cx from 'classnames';

import { Typography } from '@/src/components';

const SectionTitle = lazy(
  () => import('@/src/pages/Home/MasterDashboard/components/SectionTitle')
);
const SectionCard = lazy(
  () => import('@/src/pages/Home/MasterDashboard/components/SectionCard')
);

type IDeviceUsedProps = {
  data?: { android: number | string; iphone: number | string };
};

const DeviceUsed = ({ data }: IDeviceUsedProps) => {
  return (
    <div className={cx('mt-6')}>
      {/* Title */}
      <SectionTitle
        title='Device Used'
        subTitle='Perbandingan device yang digunakan oleh user Mediverse'
      />

      {/* Content */}
      <SectionCard>
        <div className={cx('w-full flex gap-4 items-center')}>
          <Typography
            variant={'bodySmall'}
            color='text-blackPrimary'
            customClass='font-bold'
          >
            Android
          </Typography>
          <div
            className={cx(
              'w-full rounded-lg bg-grayPrimary/20 flex overflow-hidden'
            )}
          >
            <div
              style={{ width: `${data?.android}%` }}
              className={cx('bg-[#7859EE] py-[10px]')}
            >
              <Typography
                variant={'bodySmall'}
                color='text-white'
                customClass='font-bold text-center'
              >
                {data?.android}%
              </Typography>
            </div>
            <div
              style={{ width: `${data?.iphone}%` }}
              className={cx('bg-[#F88B2C] py-[10px]')}
            >
              <Typography
                variant={'bodySmall'}
                color='text-white'
                customClass='font-bold text-center'
              >
                {data?.iphone}%
              </Typography>
            </div>
          </div>
          <Typography
            variant={'bodySmall'}
            color='text-blackPrimary'
            customClass='font-bold'
          >
            Iphone
          </Typography>
        </div>
      </SectionCard>
    </div>
  );
};

DeviceUsed.defaultProps = {
  data: {
    android: 50,
    iphone: 50,
  },
};

export default DeviceUsed;
