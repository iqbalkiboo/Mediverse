import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

import {
  Breadcrumb,
  Button,
  Card,
  Heading,
  TabNavigationV2,
} from '@/src/components';
import { ContentPayment } from './components';
import { AddCircleIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import usePayment from '@/home/MasterTransactionV2/Payment/usePayment';

const Payments = () => {
  const navigate = useNavigate();

  const search = useLocation().search;
  const type = new URLSearchParams(search).get('tab');

  const {
    data: { metadata },
  } = usePayment();

  const tabs = [
    {
      id: 'Registrasi',
      path: `${ROUTES_TRANSACTION.PAYMENT}?tab=Registrasi`,
      label: `Dalam Antrian ${
        type === 'Registrasi' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Selesai',
      path: `${ROUTES_TRANSACTION.PAYMENT}?tab=Selesai`,
      label: `Selesai ${type === 'Selesai' ? `(${metadata.totalData})` : ''}`,
    },
    {
      id: 'Batal',
      path: `${ROUTES_TRANSACTION.PAYMENT}?tab=Batal`,
      label: `Batal ${type === 'Batal' ? `(${metadata.totalData})` : ''}`,
    },
  ];

  return (
    <div>
      {/* {Breadcrumb} */}
      <div className='mb-5'>
        <Breadcrumb />
      </div>

      <div className='flex justify-between mt-4 mb-6'>
        <Heading title='Pembayaran' customClassName='text-primary font-bold' />
        <div className='w-[300px]'>
          <Button
            class='outline'
            size='md'
            text='Pembelian Langsung'
            iconButton={() => <AddCircleIcon color='#5600E8' />}
            onClick={() => navigate(`${ROUTES_TRANSACTION.PAYMENT}/direct`)}
          />
        </div>
      </div>

      <Card background='bg-white' customClassName='pt-4'>
        <TabNavigationV2 gapx={8} data={tabs} />
        <ContentPayment />
      </Card>
    </div>
  );
};

export default Payments;
