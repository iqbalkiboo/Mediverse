import React, {lazy} from 'react';
import cx from 'classnames';
import {TransactionSaleType} from '@/src/types/home';
import {formatRupiah} from '@/src/utils/fromatCurrency';
const PieChart = lazy(() => import('../components/PieChart'));
const Typography = lazy(() => import('@/src/components/Typography'));
const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

interface Props {
  title?: string;
  data: TransactionSaleType;
}

const TransactionPerCategory: React.FC<Props> = (props) => {
  const {data} = props;

  const transactions = [
    {
      id: 1,
      bgTransaction: '#745EC8',
      transaction: 'Medpharm',
      total: formatRupiah(data.transaction_type.medpharm, ''),
    },
    {
      id: 2,
      bgTransaction: '#907ED3',
      transaction: 'Medevo',
      total: formatRupiah(data.transaction_type.medevo, ''),
    },
    {
      id: 3,
      bgTransaction: '#BBABF8',
      transaction: 'Medpoint',
      total: formatRupiah(data.transaction_type.medpoint, ''),
    },
  ];

  return (
    <div>
      <div className={cx('mt-4')}>
        <SectionTitle
          title='Transaksi per Kategori'
          subTitle='Informasi transaksi medpharm, medevo, dan medpoint'
        />
      </div>
      <SectionCard>
        <div className={cx('flex')}>
          <div className={cx('w-1/5')}>
            <PieChart data={data.transaction_type} />
          </div>
          <div className={cx('ml-6 w-4/5 mt-3')}>
            <div
              className={cx(
                  'flex justify-around items-center flex-row p-4 mb-4 rounded-lg bg-[#F5F6FF]',
              )}
            >
              <Typography
                className={cx('text-[#1D2433] font-bold text-sm')}
                variant={'h4'}
                color={''}
              >
                {props.title}
              </Typography>
              <Typography
                className={cx('text-primary font-bold text-sm')}
                variant={'h4'}
                color={''}
              >
                {formatRupiah(data.transaction_type.grand_total, '')} Transaksi
              </Typography>
            </div>
            <div className={cx('flex justify-around items-center gap-4')}>
              {transactions.map((item) => (
                <div
                  className={cx('bg-[#F5F6FF] rounded-lg p-4 w-full')}
                  key={item.id}
                >
                  <div className={cx('flex items-center mb-4')}>
                    <div
                      className={cx('w-[13px] h-[13px] mr-2')}
                      style={{
                        backgroundColor: `${item.bgTransaction}`,
                      }}
                    ></div>
                    <Typography
                      className={cx('font-medium text-xs')}
                      variant={'h3'}
                      color={'#616161'}
                    >
                      {item.transaction}
                    </Typography>
                  </div>
                  <Typography
                    className={cx('font-bold text-2xl')}
                    variant={'h1'}
                    color={'#616161'}
                  >
                    {item.total}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

TransactionPerCategory.defaultProps = {
  title: 'Total Transaksi',
};

export default TransactionPerCategory;
