import { useNavigate } from 'react-router';

import { Breadcrumb, Card, Heading } from '@/src/components';
import { ROUTES_USER } from '@/src/constants';
import ContentPatientData from './components/ContentPatientData';

const PatientData = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* {Breadcrumb} */}
      <div className='mb-5'>
        <Breadcrumb />
      </div>

      <div className='mt-4 mb-6'>
        <Heading title='Data Pasien' customClassName='text-primary font-bold' />
      </div>

      <Card background='bg-white' customClassName='pt-4'>
        <ContentPatientData
          onPatientAction={(data) => {
            navigate(`${ROUTES_USER.DATA_USER_DETAIL}/${data?.name}`);
          }}
          onSubmitAddPatient={() => {}}
          successTitle='Data Pasien berhasil disimpan!'
          successDescription=''
        />
      </Card>
    </div>
  );
};

export default PatientData;
