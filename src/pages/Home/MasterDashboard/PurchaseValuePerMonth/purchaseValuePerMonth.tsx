import React, {lazy} from 'react';
import cx from 'classnames';

import {
  SelectBox,
  Typography,
} from '@/src/components';
import {formatRupiah} from '@/src/utils/formatRupiah';

import useDashboard from '@/src/pages/Home/MasterDashboard/useDashboardHooks';

const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));


type IPurchaseValuePerMonthProps = {
  data: {id: number, title: string, value: string | number}[],
  onHandleSelectMonth: (item) => void,
  onHandleSelectProduct: (item) => void,
}

const PurchaseValuePerMonth = ({
  data, onHandleSelectMonth, onHandleSelectProduct,
}: IPurchaseValuePerMonthProps) => {
  const {
    data: {
      month,
      optionProduct,
      purchaseValueMonth,
    },
  } = useDashboard();

  return (
    <div className={cx('mt-6')}>
      <div className={cx('flex items-center justify-between')}>
        {/* Title */}
        <SectionTitle
          title='Purchase Value per Month'
          subTitle='Akumulasi jumlah pembelian pengguna di Mediverse'
        />

        {/* Filter */}
        <div className={cx('flex items-center gap-4')}>
          <SelectBox
            placeholder='Bulan'
            name='month'
            isSearchable={true}
            defaultValue={month.filter((opt) => opt.value === purchaseValueMonth.params.product)}
            onChange={({value}) => onHandleSelectMonth(value)}
            options={month}
            className={cx('w-28')}
          />
          <SelectBox
            placeholder='All Product'
            name='product'
            isSearchable={true}
            defaultValue={optionProduct.filter((opt) => opt.value === purchaseValueMonth.params.product)}
            onChange={({value}) => onHandleSelectProduct(value)}
            options={optionProduct}
            className={cx('w-40')}
          />
        </div>
      </div>

      {/* Content */}
      <SectionCard>
        <div className={cx('grid divide-solid divide-x divide-chatPrimary1', `grid-cols-${data?.length}`)}>
          {data?.map((item) => (
            <div key={item?.id} className={cx('px-4')}>
              <Typography variant={'bodyBase'} color="text-blackPrimary" customClass='font-bold mb-4'>
                {item?.title}
              </Typography>
              <div className={cx('w-full rounded-lg bg-chatSecondary px-4 py-3')}>
                <Typography variant={'h1'} color="text-blackPrimary">
                  {formatRupiah(item?.value)}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

PurchaseValuePerMonth.defaultProps = {
  data: [],
  onHandleSelectMonth: () => {},
  onHandleSelectProduct: () => {},
};

export default PurchaseValuePerMonth;
