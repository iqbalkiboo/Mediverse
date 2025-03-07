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
import ActionButton from '../ActionButton';

interface CardMedpointProps {
  roleId: number;
  data: any;
  onChange: any;
}

const CardMedicalRecord: React.FC<CardMedpointProps> = ({ data, onChange }) => {
  const navigate = useNavigate();

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

  return (
    <div>
      <div className='w-full min-h-[120px] flex flex-col gap-[10px]'>
        <div className='w-full flex justify-between'>
          <div className='flex items-center'>
            <div className='w-40'>
              <Badges
                status={data.status === 'Completed' ? 'completed' : 'unpaid'}
                message={data.status ? paymentStatusText(data.status) : '-'}
              />
            </div>
            {data.payment_status !== TRANSACTION_STATUS_RESPONSE.SETTLEMENT && (
              <div className='ml-4'>
                <button
                  onClick={() =>
                    onChange(
                      data.id,
                      data.payment_status,
                      data?.transaction_detail_ids,
                      data.type === 'vaccination',
                      'detail'
                    )
                  }
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
            )}
          </div>

          <div className='flex items-center'>
            <Typography variant='bodyBase' color=''>
              Tanggal Transaksi:{' '}
              {formatDateWithTime(data.created_date || data.created_at)}
            </Typography>
          </div>
        </div>

        <div className='w-full flex items-start gap-2'>
          <div className='w-full flex'>
            <div className='w-1/6'>
              <div className='mt-1'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  No Antrian:
                </Typography>
                <Typography variant='h4' color=''>
                  {data?.queue_code}
                </Typography>
              </div>
            </div>

            <div className='w-2/6'>
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
                <Typography
                  variant='bodySmall'
                  color=''
                  customClass='font-medium'
                >
                  {translateInsuranceType(data?.payor) ?? '-'}
                </Typography>
              </div>
            </div>

            <div className='w-2/6'>
              <div className='mt-1 max-w-[197px]'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  Nama Layanan:
                </Typography>
                <Typography
                  variant='bodySmall'
                  color=''
                  customClass='font-medium'
                >
                  {data.services ?? '-'}
                </Typography>
              </div>
              <div className='mt-3'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  Jenis Layanan:
                </Typography>
                <Typography
                  variant='bodySmall'
                  color=''
                  customClass='font-medium'
                >
                  {data.service_type ?? '-'}
                </Typography>
              </div>
            </div>
          </div>

          <div className='flex'>
            {[
              TRANSACTION_STATUS_RESPONSE.EXAMINED,
              TRANSACTION_STATUS_RESPONSE.COMPLETED,
            ].includes(data.payment_status) &&
              data.service_type === 'Laboratorium' && (
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

            <div className='w-56 flex flex-col gap-2'>
              {data.status !== 'Draft' && (
                <ActionButton
                  id={data.id}
                  status={data.statusTransaction}
                  statusPayment={data.status}
                  hideButton={
                    data.have_complaint ||
                    dayjs().diff(dayjs(data?.updated_date), 'minute') > 5
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMedicalRecord;
