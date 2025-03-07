import React, {lazy} from 'react';
import cx from 'classnames';

import {
  SelectBox,
  Typography,
} from '@/src/components';

const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

type IUserActivityProps = {
  type: string,
  title: string,
  description: string,
  valueMonth: any,
  valueProduct: any,
  optionMonth: {label: string, value: string | number}[]
  optionProduct: {label: string, value: string | number}[]
  data: {id: number, title: string, value: string | number}[],
  onHandleSelectMonth: (item) => void,
  onHandleSelectProduct: (item) => void,
}

const UserActivity = ({
  type,
  data,
  title,
  description,
  valueMonth,
  optionMonth,
  valueProduct,
  optionProduct,
  onHandleSelectMonth,
  onHandleSelectProduct,
}: IUserActivityProps) => {
  return (
    <div className={cx('mt-6')}>
      <div className={cx('flex items-center justify-between')}>
        {/* Title */}
        <SectionTitle
          title={title}
          subTitle={description}
        />

        {/* Filter */}
        <div className={cx('flex items-center gap-4')}>
          <SelectBox
            placeholder='Bulan'
            name='month'
            isSearchable={true}
            value={valueMonth}
            options={optionMonth}
            onChange={(item) => onHandleSelectMonth(item)}
            className={cx('w-40')}
          />
          {type === 'conversion-dashboard' && (
            <SelectBox
              placeholder='All Product'
              name='product'
              isSearchable={true}
              defaultValue={valueProduct}
              value={valueProduct}
              options={optionProduct}
              onChange={(item) => onHandleSelectProduct(item)}
              className={cx('w-40')}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <SectionCard>
        <div className={cx('grid divide-solid divide-x divide-chatPrimary1', `grid-cols-${data?.length}`)}>
          {data?.map((item) => (
            <div key={item?.id} className={cx('flex justify-center')}>
              <div>
                <Typography variant={'bodySmall'} color="text-grayTertiary" customClass='mb-2'>
                  {item?.title}
                </Typography>
                <Typography variant={'h1'} color="text-blackPrimary">
                  {item?.value}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

UserActivity.defaultProps = {
  type: 'marketing-dashboard',
  title: 'Aktivitas User',
  description: 'Informasi aktifitas dari user untuk aplikasi Mediverse',
  data: [],
  onHandleSelectMonth: () => {},
  onHandleSelectProduct: () => {},
};

export default UserActivity;
