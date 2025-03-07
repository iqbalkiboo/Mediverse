import { useLocation } from 'react-router';

import { Breadcrumb, Card, Heading, TabNavigationV2 } from '@/src/components';
import { ContentLab } from './components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useLaboratoriums from './useLaboratoriums';

const Laboratoriums = () => {
  const search = useLocation().search;
  const type = new URLSearchParams(search).get('tab');

  const {
    data: { metadata },
  } = useLaboratoriums();

  const tabs = [
    {
      id: 'Registrasi',
      path: `${ROUTES_TRANSACTION.LABORATORIUMS}?tab=Registrasi`,
      label: `Dalam Antrian ${
        type === 'Registrasi' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Menunggu Tindakan',
      path: `${ROUTES_TRANSACTION.LABORATORIUMS}?tab=Menunggu Tindakan`,
      label: `Berlangsung ${
        type === 'Menunggu Tindakan' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Selesai',
      path: `${ROUTES_TRANSACTION.LABORATORIUMS}?tab=Selesai`,
      label: `Selesai ${type === 'Selesai' ? `(${metadata.totalData})` : ''}`,
    },
    {
      id: 'Batal',
      path: `${ROUTES_TRANSACTION.LABORATORIUMS}?tab=Batal`,
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
        <Heading
          title='Laboratorium'
          customClassName='text-primary font-bold'
        />
      </div>

      <Card background='bg-white' customClassName='pt-4'>
        <TabNavigationV2 gapx={8} data={tabs} />
        <ContentLab />
      </Card>
    </div>
  );
};

export default Laboratoriums;
