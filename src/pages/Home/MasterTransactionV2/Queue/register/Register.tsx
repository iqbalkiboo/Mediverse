import { Breadcrumb, ButtonBack, Card, Heading } from '@/src/components';
import { ContentRegister } from './components';
import { ROUTES_TRANSACTION } from '@/src/constants';

const Register = () => {
  return (
    <div>
      <div className='flex justify-between mb-4'>
        <Breadcrumb />
        <ButtonBack path={`${ROUTES_TRANSACTION.QUEUE}`} />
      </div>

      <div className='mt-4 mb-6'>
        <Heading
          title='Pendaftaran Antrian Pasien'
          customClassName='text-primary font-bold'
        />
      </div>

      <Card background='bg-white' customClassName='pt-4'>
        <ContentRegister />
      </Card>
    </div>
  );
};

export default Register;
