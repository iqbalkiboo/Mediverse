import cx from 'classnames';

import { Breadcrumb, ButtonBack, Card, Typography } from '@/src/components';
import { ROUTES_USER } from '@/src/constants';
import DetailContent from './Components/DetailContent';

const PatientDataDetail = () => {
  return (
    <div>
      <div className={cx('flex justify-between items-center mb-5')}>
        <Breadcrumb />
        <ButtonBack path={ROUTES_USER.DATA_USER} />
      </div>

      <div className={cx('flex justify-between items-center mb-6')}>
        <Typography variant='h1' color='' customClass='text-primary'>
          Detail Pasien
        </Typography>
      </div>
      <Card background='bg-white' customClassName='pt-4'>
        <DetailContent />
      </Card>
    </div>
  );
};

export default PatientDataDetail;
