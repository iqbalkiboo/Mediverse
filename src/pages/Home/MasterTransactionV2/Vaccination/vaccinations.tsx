import { useLocation } from 'react-router';

import { Breadcrumb, Card, Heading, TabNavigationV2 } from '@/src/components';
import { ContentVaccination } from './components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useVaccination from './useVaccination';

const Vaccinations = () => {
  const search = useLocation().search;
  const type = new URLSearchParams(search).get('tab');

  const {
    data: { metadata },
  } = useVaccination();

  const tabs = [
    {
      id: 'Registrasi',
      path: `${ROUTES_TRANSACTION.VACCINATIONS}?tab=Registrasi`,
      label: `Dalam Antrian ${
        type === 'Registrasi' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Menunggu Tindakan',
      path: `${ROUTES_TRANSACTION.VACCINATIONS}?tab=Menunggu Tindakan`,
      label: `Berlangsung ${
        type === 'Menunggu Tindakan' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Sudah Ditindak',
      path: `${ROUTES_TRANSACTION.VACCINATIONS}?tab=Sudah Ditindak`,
      label: `Ditindak ${
        type === 'Sudah Ditindak' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Selesai',
      path: `${ROUTES_TRANSACTION.VACCINATIONS}?tab=Selesai`,
      label: `Selesai ${type === 'Selesai' ? `(${metadata.totalData})` : ''}`,
    },
    {
      id: 'Batal',
      path: `${ROUTES_TRANSACTION.VACCINATIONS}?tab=Batal`,
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
        <Heading title='Imunisasi' customClassName='text-primary font-bold' />
      </div>

      <Card background='bg-white' customClassName='pt-4'>
        <TabNavigationV2 gapx={8} data={tabs} />
        <ContentVaccination />
      </Card>
    </div>
  );
};

export default Vaccinations;
