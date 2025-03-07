import { Button, Typography } from '@/src/components';
import { CheckOneIcon } from '@/assets/images/svg';
import useLaboratoriums from '@/src/pages/Home/MasterTransactionV2/Laboratorium/useLaboratoriums';

interface ActionButtonVaccinationProps {
  id: string;
  status: string;
  statusPayment: string;
  hideButton?: boolean;
}

const ActionButtonLab: React.FC<ActionButtonVaccinationProps> = ({
  id,
  status,
  statusPayment,
  hideButton,
}) => {
  const {
    method: { handleSetModalLaboratorium },
  } = useLaboratoriums();

  return (
    <>
      {['Registrasi'].includes(status) && (
        <>
          <Button
            text='Mulai Periksa'
            size='md'
            class='primary'
            onClick={() => {
              handleSetModalLaboratorium('transactionId', id);
              handleSetModalLaboratorium('status', status);
              handleSetModalLaboratorium('modalConfirmation', true);
            }}
          />
          <Button
            text='Batalkan'
            size='md'
            class='reject-outline'
            onClick={() => {
              handleSetModalLaboratorium('transactionId', id);
              handleSetModalLaboratorium('status', 'Batal');
              handleSetModalLaboratorium('modalConfirmation', true);
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
            onClick={() => {
              handleSetModalLaboratorium('transactionId', id);
              handleSetModalLaboratorium('status', status);
              handleSetModalLaboratorium('modalConfirmation', true);
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
            onClick={() => {
              handleSetModalLaboratorium('transactionId', id);
              handleSetModalLaboratorium('status', status);
              handleSetModalLaboratorium('modalKipi', true);
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
              onClick={() => {
                handleSetModalLaboratorium('transactionId', id);
                handleSetModalLaboratorium('status', status);
                handleSetModalLaboratorium('modalKipi', true);
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default ActionButtonLab;
