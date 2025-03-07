import React, {lazy} from 'react';
import cx from 'classnames';

import {
  ComplainIcon,
  IconService,
  RefundIcon,
  SaleIcon,
  TransactionsIcon,
} from '@/src/assets/images/svg';
import {Typography} from '@/src/components';
import {TransactionSaleType} from '@/src/types/home';
import {formatRupiah} from '@/src/utils/fromatCurrency';
import dayjs from 'dayjs';
const DashboardSmallCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/DashboardSmallCard'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));

const SaleTransactions = ({data} : {data: TransactionSaleType}) => {
  const statisticsSale = [
    {
      id: 1,
      title: 'Produk Terjual',
      value: formatRupiah(data.product, ''),
      total: null,
      icon: <SaleIcon />,
    },
    {
      id: 2,
      title: 'Layanan Terjual',
      value: formatRupiah(data.service, ''),
      total: null,
      icon: <IconService />,
    },
    {
      id: 3,
      title: 'Transaksi Berhasil',
      value: formatRupiah(data.transaction_complete, ''),
      total: null,
      icon: <TransactionsIcon />,
    },
    {
      id: 4,
      title: 'Transaksi Refund',
      value: formatRupiah(data.transaction_refund.count, ''),
      total: data.transaction_refund.total_amount,
      icon: <RefundIcon />,
    },
    {
      id: 5,
      title: 'Transaksi Komplain',
      value: formatRupiah(data.transaction_complaint, ''),
      total: null,
      icon: <ComplainIcon />,
    },
  ];

  return (
    <div>
      <div className={cx('mt-3 flex justify-between items-center')}>
        <div>
          <SectionTitle
            title="Statistik Penjualan"
            subTitle="Jumlah total penjualan total produk-produk Mediverse" />
        </div>
        <div>
          <Typography variant={'h4'} color="ext-blackPrimary">
            {dayjs().format('DD MMMM YYYY')}
          </Typography>
        </div>
      </div>
      <div className={cx('grid grid-cols-5 gap-x-6')}>
        {statisticsSale.map((data) => (
          <DashboardSmallCard
            key={data.id}
            icon={data.icon}
            title={data.title}
            value={data.value}
            total={data.total}
          />
        ))}
      </div>
    </div>
  );
};

export default SaleTransactions;
