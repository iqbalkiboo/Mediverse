import { useLocation } from 'react-router';

import { Breadcrumb, Card, Heading, TabNavigationV2 } from '@/src/components';
import { ContentClinic } from './components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useClinicOutpatient from './useClinicOutpatient';

const ClinicOutpatient = () => {
  const search = useLocation().search;
  const type = new URLSearchParams(search).get('tab');

  const {
    data: { metadata },
  } = useClinicOutpatient();

  const tabs = [
    {
      id: 'Registrasi',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT}?tab=Registrasi`,
      label: `Dalam Antrian ${
        type === 'Registrasi' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Menunggu Tindakan',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT}?tab=Menunggu Tindakan`,
      label: `Berlangsung ${
        type === 'Menunggu Tindakan' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Sudah Ditindak',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT}?tab=Sudah Ditindak`,
      label: `Ditindak ${
        type === 'Sudah Ditindak' ? `(${metadata.totalData})` : ''
      }`,
    },
    {
      id: 'Selesai',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT}?tab=Selesai`,
      label: `Selesai ${type === 'Selesai' ? `(${metadata.totalData})` : ''}`,
    },
    {
      id: 'Batal',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT}?tab=Batal`,
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
          title='Klinik / Rawat Jalan'
          customClassName='text-primary font-bold'
        />
      </div>

      <Card background='bg-white' customClassName='pt-4'>
        <TabNavigationV2 gapx={8} data={tabs} />
        <ContentClinic />
      </Card>
    </div>
  );
};

export default ClinicOutpatient;
