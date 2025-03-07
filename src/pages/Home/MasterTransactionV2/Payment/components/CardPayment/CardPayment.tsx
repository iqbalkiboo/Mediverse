import { useNavigate } from 'react-router';

import { Badges, Button, Typography } from '@/src/components';
import { DownloadIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import { formatDateWithTime } from '@/src/utils/formatDate';
import { translateInsuranceType } from '@/utils/transactions';
import usePayment from '@/home/MasterTransactionV2/Payment/usePayment';
import useQuery from '@/src/hooks/useQuery';

interface CardPaymentProps {
  data: any;
  onOpenInvoice: (transactionId: string) => void;
}

const paymentStatusText = (text: string) => {
  switch (text) {
    case 'Draft':
      return 'Dalam Antrian';
    case 'Completed':
      return 'Selesai';
    case 'To Bill':
      return 'Belum Lunas';
    case 'Cancelled':
      return 'Dibatalkan';
    default:
      return text;
  }
};

const CardPayment: React.FC<CardPaymentProps> = ({ data, onOpenInvoice }) => {
  const queryTab = useQuery().get('tab');

  const navigate = useNavigate();

  const {
    method: { handleSetModalPayment },
  } = usePayment();

  return (
    <div className='w-full min-h-[120px] flex flex-col gap-[10px]'>
      <div className='w-full flex justify-between'>
        <div className='flex items-center'>
          <div className='w-40'>
            <Badges
              status={data.status}
              type={data.status.toLowerCase()}
              message={data.status ? paymentStatusText(data.status) : '-'}
            />
          </div>
        </div>

        <div className='flex items-center'>
          <Typography variant='bodySmall' color=''>
            Tanggal Transaksi:{' '}
            {formatDateWithTime(data.created_date || data.created_at)}
          </Typography>
        </div>
      </div>

      <div className='w-full flex items-start gap-2'>
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

        {!queryTab || queryTab === 'Registrasi' ? (
          <div className='w-7/12 flex gap-2'>
            <div className='w-4/12'>
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
                  {data.payor
                    ? translateInsuranceType(data.payor)
                    : 'Umum' || '-'}
                </Typography>
              </div>
            </div>

            <div className='w-5/12'>
              <div className='mt-3'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  Nama Layanan:
                </Typography>
                <Typography
                  variant='bodySmall'
                  color=''
                  customClass='font-medium'
                >
                  {data.service_type ?? '-'}
                </Typography>
              </div>
              <div className='mt-1 max-w-[197px]'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  Jenis Layanan:
                </Typography>
                <Typography
                  variant='bodySmall'
                  color=''
                  customClass='font-medium'
                >
                  {data.services
                    ? data.services?.split(',')?.length > 3
                      ? data.services?.split(',').slice(0, 3).join(', ') +
                        `, dan ${data.services?.split(',').length - 3} lainnya`
                      : data.services
                    : '-'}
                </Typography>
              </div>
            </div>

            <div className='w-3/12 m-auto'>
              <div className='h-full mt-1'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  Status pembayaran:
                </Typography>
                <div className='w-3/4 mt-2'>
                  <Badges
                    status={
                      data.status
                        ? data.status === 'Completed'
                          ? 'Completed'
                          : 'Cancelled'
                        : ''
                    }
                    type={data.status.toLowerCase()}
                    message={
                      data.status
                        ? data.status === 'Completed'
                          ? 'Lunas'
                          : 'Belum Lunas'
                        : '-'
                    }
                    customClassName='h-8'
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-7/12 flex'>
            <div className='w-4/12 mt-1'>
              <Typography variant='bodySmall' color='text-gray-500'>
                Pasien:
              </Typography>
              <Typography variant='h4' color=''>
                {data?.patient_name ?? '-'}
              </Typography>
            </div>
            <div className='w-4/12 mt-1'>
              <Typography variant='bodySmall' color='text-gray-500'>
                Penjamin:
              </Typography>
              <Typography
                variant='bodySmall'
                color=''
                customClass='font-medium'
              >
                {data.payor
                  ? translateInsuranceType(data.payor)
                  : 'Umum' || '-'}
              </Typography>
            </div>
            <div className='w-4/12 mt-1'>
              <Typography variant='bodySmall' color='text-gray-500'>
                Nama Layanan:
              </Typography>
              <Typography
                variant='bodySmall'
                color=''
                customClass='font-medium'
              >
                {data.service_type ?? '-'}
              </Typography>
            </div>
            <div className='w-4/12 mt-1 max-w-[197px]'>
              <Typography variant='bodySmall' color='text-gray-500'>
                Jenis Layanan:
              </Typography>
              <Typography
                variant='bodySmall'
                color=''
                customClass='font-medium'
              >
                {data.services
                  ? data.services?.split(',')?.length > 3
                    ? data.services?.split(',').slice(0, 3).join(', ') +
                      `, dan ${data.services?.split(',').length - 3} lainnya`
                    : data.services
                  : '-'}
              </Typography>
            </div>
          </div>
        )}

        {data.status === 'Completed' ? (
          <div className='flex-1 flex justify-end'>
            <div className='w-56 space-y-1'>
              <Button
                class='outline'
                size='md'
                text='Unduh Invoice'
                iconButton={() => <DownloadIcon color='#5600E8' />}
                onClick={() => onOpenInvoice(data?.service_transaction_id)}
              />
              <Button
                class='primary'
                size='md'
                text='Detail'
                onClick={() =>
                  navigate(
                    `${ROUTES_TRANSACTION.PAYMENT}/${data?.service_transaction_id}`
                  )
                }
              />
            </div>
          </div>
        ) : data.status === 'Draft' ? (
          <div className='flex-1 flex justify-end'>
            <div className='w-56 flex flex-col gap-2'>
              {data?.service_type !== 'Rawat Jalan' ||
              (data?.service_type === 'Rawat Jalan' &&
                data?.service_status === 'Selesai') ? (
                <Button
                  class='primary'
                  size='md'
                  text='Bayar'
                  onClick={() =>
                    navigate(
                      `${ROUTES_TRANSACTION.PAYMENT}/${data?.service_transaction_id}`
                    )
                  }
                />
              ) : (
                <></>
              )}
              <Button
                class='reject-outline'
                size='md'
                text='Batalkan'
                onClick={() => {
                  handleSetModalPayment(
                    'transactionId',
                    data?.service_transaction_id
                  );
                  handleSetModalPayment('status', 'Batal');
                  handleSetModalPayment('modalConfirmation', true);
                }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CardPayment;
