import { Badges, Button, Typography } from '@/src/components';
import { formatDate, formatDateWithTime } from '@/src/utils/formatDate';
import { orderStatusText } from '@/src/utils/orderStatus';

import type { QueueItemData } from '@/types/MasterTransaction/queue';

interface CardQueueProps {
  data: QueueItemData;
  onChange: () => void;
}

const CardQueue: React.FC<CardQueueProps> = ({ data, onChange }) => {
  return (
    <div>
      <div className='w-full min-h-[120px] flex flex-col gap-[10px]'>
        <div className='w-full flex justify-between'>
          <div className='flex items-center'>
            <div className='w-40'>
              <Badges status='register' message={orderStatusText('register')} />
            </div>
          </div>

          <div className='flex items-center'>
            <Typography variant='bodySmall' color='' customClass='font-bold'>
              Waktu Daftar:{' '}
              {data.arrival ? formatDateWithTime(data.arrival) : '-'}
            </Typography>
          </div>
        </div>

        <div className='w-full flex justify-between gap-2'>
          <div className='mt-1'>
            <Typography
              variant='bodySmall'
              color='text-gray-500'
              customClass='font-bold'
            >
              No Antrian:
            </Typography>
            <Typography variant='h4' color=''>
              {data?.queue_number || '-'}
            </Typography>
          </div>

          {formatDate(data.arrival) === formatDate(new Date()) && (
            <div className='w-56 flex flex-col justify-center'>
              <Button
                text='Panggil'
                size='md'
                class='primary'
                onClick={onChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardQueue;
