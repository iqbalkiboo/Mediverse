import { useLocation } from 'react-router';

import { Breadcrumb, Card, Heading, TabNavigationV2 } from '@/src/components';
import { ContentQueue } from './components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useQueue from '@/home/MasterTransactionV2/Queue/useQueue';

const Queue = () => {
  const search = useLocation().search;
  const type = new URLSearchParams(search).get('tab');

  const {
    data: { metadata },
  } = useQueue();

  const tabs = [
    {
      id: 'Antrian',
      path: `${ROUTES_TRANSACTION.QUEUE}?tab=Antrian`,
      label: `Registrasi ${
        type === 'Antrian' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Registrasi',
      path: `${ROUTES_TRANSACTION.QUEUE}?tab=Registrasi`,
      label: `Dalam Antrian ${
        type === 'Registrasi' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Menunggu Tindakan',
      path: `${ROUTES_TRANSACTION.QUEUE}?tab=Menunggu Tindakan`,
      label: `Berlangsung ${
        type === 'Menunggu Tindakan' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Selesai',
      path: `${ROUTES_TRANSACTION.QUEUE}?tab=Selesai`,
      label: `Selesai ${type === 'Selesai' ? `(${metadata.totalData})` : ''}`,
    },
    {
      id: 'Batal',
      path: `${ROUTES_TRANSACTION.QUEUE}?tab=Batal`,
      label: `Batal Periksa ${
        type === 'Batal' ? `(${metadata.totalData})` : ''
      }`,
    },
  ];

  return (
    <div>
      {/* {Breadcrumb} */}
      <div className='mb-5'>
        <Breadcrumb />
      </div>

      <div className='mt-4 mb-6'>
        <Heading title='Registrasi' customClassName='text-primary font-bold' />
      </div>

      <Card background='bg-white' customClassName='pt-4'>
        <TabNavigationV2 gapx={8} data={tabs} />
        <ContentQueue />
      </Card>
    </div>
  );
};

export default Queue;
