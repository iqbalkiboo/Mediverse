import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

import { Badges, Button, Typography } from '@/src/components';
import { MedicalHistoryIcon } from '@/assets/images/svg';
import {
  ROUTES_TRANSACTION,
  TRANSACTION_STATUS_RESPONSE,
} from '@/src/constants';
import { translateInsuranceType } from '@/src/utils/transactions';
import { formatDateWithTime } from '@/src/utils/formatDate';
import ActionButtonClinic from '../ActionButtonClinic';
import useClinicOutpatient from '../../useClinicOutpatient';

interface CardClinicProps {
  data: any;
}

const paymentStatusText = (text: string) => {
  switch (text) {
    case 'Completed':
      return 'Lunas';
    case 'Draft':
    case 'To Bill':
      return 'Belum Lunas';
    case 'Cancelled':
      return 'Dibatalkan';
    default:
      return text;
  }
};

const CardClinic: React.FC<CardClinicProps> = ({ data }) => {
  const navigate = useNavigate();

  const {
    method: { handleSetModalClinicOutpatient },
  } = useClinicOutpatient();

  return (
    <div className='w-full min-h-[120px] flex flex-col gap-[10px]'>
      {/* Header Card */}
      <div className='w-full flex justify-between'>
        <div className='flex items-center'>
          <div className='w-40'>
            <Badges
              status={data.status === 'Completed' ? 'completed' : 'unpaid'}
              message={data.status ? paymentStatusText(data.status) : '-'}
            />
          </div>
          <div className='ml-4'>
            <button
              onClick={() => {
                handleSetModalClinicOutpatient('transactionId', data.id);
                handleSetModalClinicOutpatient('modalDetail', true);
              }}
            >
              <Typography
                variant='bodySmall'
                color='text-primary'
                customClass='underline'
              >
                Detail Pesanan
              </Typography>
            </button>
          </div>
        </div>

        <div className='flex items-center'>
          <Typography variant='bodySmall' color=''>
            Tanggal Transaksi:{' '}
            {formatDateWithTime(data.created_date || data.created_at)}
          </Typography>
        </div>
      </div>

      {/* Content Card */}
      <div className='w-full flex justify-between items-start gap-2'>
        <div className='w-2/12'>
          <div className='mt-1'>
            <Typography variant='bodySmall' color='text-gray-500'>
              No Antrian:
            </Typography>
            <Typography variant='h4' color=''>
              {data?.queue_code || '-'}
            </Typography>
          </div>
        </div>

        <div className='w-3/12'>
          <div className='mt-1'>
            <Typography variant='bodySmall' color='text-gray-500'>
              Pasien:
            </Typography>
            <Typography variant='h4' color=''>
              {data?.patient_name ?? '-'}
            </Typography>
          </div>
          <div className='mt-3'>
            <Typography variant='bodySmall' color='text-gray-500'>
              Penjamin:
            </Typography>
            <Typography variant='bodySmall' color='' customClass='font-medium'>
              {data.payor ? translateInsuranceType(data.payor) : 'Umum' || '-'}
            </Typography>
          </div>
        </div>

        <div className='w-3/12'>
          <div className='mt-1 max-w-[197px]'>
            <Typography variant='bodySmall' color='text-gray-500'>
              Nama Layanan:
            </Typography>
            <Typography variant='bodySmall' color='' customClass='font-medium'>
              {data.service_type ?? '-'}
            </Typography>
          </div>
          <div className='mt-3'>
            <Typography variant='bodySmall' color='text-gray-500'>
              Jenis Layanan:
            </Typography>
            <Typography variant='bodySmall' color='' customClass='font-medium'>
              {data.services
                ? data.services?.split(',')?.length > 3
                  ? data.services?.split(',').slice(0, 3).join(', ') +
                    `, dan ${data.services?.split(',').length - 3} lainnya`
                  : data.services
                : '-'}
            </Typography>
          </div>
        </div>

        <div className='flex'>
          {[
            TRANSACTION_STATUS_RESPONSE.EXAMINED,
            TRANSACTION_STATUS_RESPONSE.COMPLETED,
          ].includes(data.payment_status) &&
            data.type === 'vaccinations' && (
              <div className='mt-8'>
                <Button
                  size='md'
                  class='outline'
                  customClassIcon='!mr-0'
                  text=''
                  iconButton={() => <MedicalHistoryIcon color='#7859EE' />}
                  onClick={() =>
                    navigate(
                      `${ROUTES_TRANSACTION.MEDPOINT_PROCEDURE}/${data.id}`
                    )
                  }
                />
              </div>
            )}

          <div className='w-56 flex flex-col gap-2 mt-2'>
            <ActionButtonClinic
              id={data.id}
              status={data.statusTransaction}
              statusPayment={data.status}
              hideButton={
                data.have_complaint ||
                dayjs().diff(dayjs(data?.updated_date), 'minute') > 5
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClinic;
