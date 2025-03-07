import { Card, Typography } from '@/src/components';
import { formatDate } from '@/utils/formatDate';

interface DetailPatientProps {
  data: any;
  payor: string;
}

const DetailPatient: React.FC<DetailPatientProps> = ({ data, payor }) => {
  return (
    <Card background='bg-graySeptenary'>
      <div className='w-full flex items-start justify-between gap-2'>
        <div className='my-1'>
          <Typography variant='bodySmall' color='text-gray-500'>
            Pasien:
          </Typography>
          <div>
            <Typography variant='h4' color=''>
              {data?.patient?.patient_name || '-'}
            </Typography>
            <Typography variant='bodySmall' color='' customClass='font-medium'>
              {data?.patient?.dob
                ? formatDate(data.patient.dob, '/', 'MM', false)
                : '-'}
            </Typography>
          </div>
        </div>
        <div className='my-1'>
          <Typography variant='bodySmall' color='text-gray-500'>
            NIK:
          </Typography>
          <Typography variant='bodySmall' color='' customClass='font-medium'>
            {data?.patient?.no_identifier || '-'}
          </Typography>
        </div>
        <div className='my-1'>
          <Typography variant='bodySmall' color='text-gray-500'>
            Penjamin:
          </Typography>
          <Typography variant='bodySmall' color='' customClass='font-medium'>
            {payor || '-'}
          </Typography>
        </div>
        <div className='my-1'>
          <Typography variant='bodySmall' color='text-gray-500'>
            Status Pasien:
          </Typography>
          <Typography variant='bodySmall' color='' customClass='font-medium'>
            {data?.patient?.patient_type || '-'}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default DetailPatient;
