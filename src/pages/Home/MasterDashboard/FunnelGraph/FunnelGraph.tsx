import React, {lazy} from 'react';
import cx from 'classnames';
import Typography from '@/src/components/Typography';
import FunnelChart from '../FunnelChart';
import {SelectBox} from '@/src/components';
import {TransactionFunnelType} from '@/src/types/home';
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

const options = [
  {label: 'Medevo', value: 'medevo'},
  {label: 'Medpharm', value: 'medpharm'},
  {label: 'Medpoint', value: 'medpoint'},
];

const FunnelGraph = (props: {
  data: TransactionFunnelType;
  isLoading: boolean;
  selectedProvider: {
    label: string,
    value: string,
  };
  onChange: (value) => void;
}) => {
  const {data, isLoading} = props;

  const funnelData = [
    {label: 'Transaksi Terbentuk', value: data.transaction_created},
    {label: 'Transaksi Berlangsung', value: data.transaction_ongoing},
    {label: 'Transaksi Berhasil', value: data.transaction_complete},
  ];

  return (
    <div className={cx('mt-3')}>
      <SectionTitle
        title=" Funnel Grafik"
        subTitle='Informasi transaksi mediverse dan aktivitas user'
      />
      <SectionCard>
        <div className={cx('flex justify-between items-center')}>
          <Typography variant="h4" color="text-[#1D2433]">
            Transaksi Mediverse
          </Typography>
          <div className={cx('flex gap-x-2 items-center cursor-pointer')}>
            <Typography variant="h5" color="text-[#7859EE]">
              <SelectBox
                name="transaction_type"
                isSearchable={false}
                defaultValue={props.selectedProvider}
                onChange={(e) => {
                  props.onChange(e);
                }}
                options={options}
                className={cx('w-40')}
              />
            </Typography>
          </div>
        </div>
        <div className={cx('flex flex-col justify-center items-center mt-4')}>
          <FunnelChart isLoading={isLoading} data={funnelData} />
        </div>
      </SectionCard>
    </div>
  );
};

export default FunnelGraph;
