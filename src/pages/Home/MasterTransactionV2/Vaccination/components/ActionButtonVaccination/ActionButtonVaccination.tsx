import { Button, Typography } from '@/src/components';
import { CheckOneIcon } from '@/assets/images/svg';
import useVaccination from '../../useVaccination';

interface ActionButtonVaccinationProps {
  id: string;
  status: string;
  statusPayment: string;
  payor: string;
  hideButton?: boolean;
}

const ActionButtonVaccination: React.FC<ActionButtonVaccinationProps> = ({
  id,
  status,
  statusPayment,
  payor,
  hideButton,
}) => {
  const {
    method: { handleSetModalVaccination },
  } = useVaccination();

  return (
    <>
      {['Registrasi'].includes(status) && (
        <>
          {(statusPayment === 'Completed' || payor) && (
            <Button
              text='Mulai Periksa'
              size='md'
              class='primary'
              onClick={() => {
                handleSetModalVaccination('transactionId', id);
                handleSetModalVaccination('status', status);
                handleSetModalVaccination('modalConfirmation', true);
              }}
            />
          )}
          <Button
            text='Batalkan'
            size='md'
            class='reject-outline'
            onClick={() => {
              handleSetModalVaccination('transactionId', id);
              handleSetModalVaccination('status', 'Batal');
              handleSetModalVaccination('modalConfirmation', true);
            }}
          />
        </>
      )}

      {['Menunggu Tindakan'].includes(status) && (
        <>
          {status === 'Menunggu Tindakan' && (
            <div className='flex justify-center items-center gap-2'>
              <CheckOneIcon color='#35B932' />
              <Typography variant='h4' color='text-[#35B932]'>
                DIPERIKSA
              </Typography>
            </div>
          )}
          <Button
            text='Lakukan Tindakan'
            size='md'
            class='primary'
            customClassName='!rounded-md'
            onClick={() => {
              handleSetModalVaccination('transactionId', id);
              handleSetModalVaccination('status', status);
              handleSetModalVaccination('modalConfirmation', true);
            }}
          />
        </>
      )}

      {['Sudah Ditindak'].includes(status) && (
        <>
          <div className='flex justify-center items-center gap-2'>
            <CheckOneIcon color='#35B932' />
            <Typography variant='h4' color='text-[#35B932]'>
              SUDAH DITINDAK
            </Typography>
          </div>
          <Button
            text='Selesaikan Proses'
            size='md'
            class='primary'
            customClassName='!rounded-md'
            onClick={() => {
              handleSetModalVaccination('transactionId', id);
              handleSetModalVaccination('status', status);
              handleSetModalVaccination('modalKipi', true);
            }}
          />
        </>
      )}

      {['Selesai'].includes(status) && (
        <>
          <div className='flex justify-center items-center gap-2'>
            <CheckOneIcon color='#35B932' />
            <Typography variant='h4' color='text-[#35B932]'>
              VAKSINASI SELESAI
            </Typography>
          </div>
          {!hideButton && (
            <Button
              text='Pengisian KIPI'
              size='md'
              class='primary'
              customClassName='!rounded-md'
              onClick={() => {
                handleSetModalVaccination('transactionId', id);
                handleSetModalVaccination('status', status);
                handleSetModalVaccination('modalKipi', true);
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default ActionButtonVaccination;
