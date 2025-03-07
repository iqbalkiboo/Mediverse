import { useNavigate } from 'react-router';

import { Button, Typography } from '@/src/components';
import { CheckOneIcon, PencilUpdateIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useClinicOutpatient from '../../useClinicOutpatient';

interface ActionButtonVaccinationProps {
  id: string;
  status: string;
  statusPayment: string;
  hideButton?: boolean;
}

const ActionButtonClinic: React.FC<ActionButtonVaccinationProps> = ({
  id,
  status,
  statusPayment,
  hideButton,
}) => {
  const navigate = useNavigate();

  const {
    method: { handleSetModalClinicOutpatient },
  } = useClinicOutpatient();

  return (
    <>
      {['Registrasi'].includes(status) && (
        <>
          <Button
            text='Mulai Periksa'
            size='md'
            class='primary'
            onClick={() => {
              handleSetModalClinicOutpatient('transactionId', id);
              handleSetModalClinicOutpatient('status', status);
              handleSetModalClinicOutpatient('modalConfirmation', true);
            }}
          />
          <Button
            text='Batalkan'
            size='md'
            class='reject-outline'
            onClick={() => {
              handleSetModalClinicOutpatient('transactionId', id);
              handleSetModalClinicOutpatient('status', 'Batal');
              handleSetModalClinicOutpatient('modalConfirmation', true);
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
              handleSetModalClinicOutpatient('transactionId', id);
              handleSetModalClinicOutpatient('status', status);
              handleSetModalClinicOutpatient('modalConfirmation', true);
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
            size='md'
            class='outline'
            text='Lihat'
            customClassName='!rounded-md'
            iconButton={() => <PencilUpdateIcon color='#0A0A0A' />}
            onClick={() =>
              navigate(
                `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}`
              )
            }
          />
          <Button
            text='Selesaikan Proses'
            size='md'
            class='primary'
            customClassName='!rounded-md'
            onClick={() => {
              handleSetModalClinicOutpatient('transactionId', id);
              handleSetModalClinicOutpatient('status', status);
              handleSetModalClinicOutpatient('modalConfirmation', true);
            }}
          />
        </>
      )}

      {['Selesai'].includes(status) && (
        <>
          <div className='flex justify-center items-center gap-2'>
            <CheckOneIcon color='#35B932' />
            <Typography variant='h4' color='text-[#35B932]'>
              SELESAI
            </Typography>
          </div>
          <Button
            size='md'
            class='outline'
            text='Lihat'
            customClassName='!rounded-md'
            iconButton={() => <PencilUpdateIcon color='#0A0A0A' />}
            onClick={() =>
              navigate(
                `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}`
              )
            }
          />
        </>
      )}
    </>
  );
};

export default ActionButtonClinic;
