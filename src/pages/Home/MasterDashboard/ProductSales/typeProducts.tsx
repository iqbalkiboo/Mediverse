import React, {lazy} from 'react';
import cx from 'classnames';

import {Typography} from '@/src/components';

const ChartMap = lazy(() => import('@/src/pages/Home/MasterDashboard/components/ChartMap'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

const ProductSales = () => {
  return (
    <div className={cx('mt-3')}>
      <SectionTitle
        title="Sebaran Jenis Produk"
        subTitle='Pilih wilayah untuk melihat detail sebaran jenis produk'
      />
      <SectionCard>
        <Typography
          variant="bodyBase"
          color="text-[#1D2433]"
          customClass={cx('text-center font-medium italic mb-11')}
        >
          Sebaran jenis produk yang berhasil dibeli
        </Typography>
        <ChartMap />
      </SectionCard>
    </div>
  );
};

export default ProductSales;
