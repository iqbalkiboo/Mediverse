import { useNavigate } from 'react-router';

import { Button, Typography } from '@/src/components';
import { CheckOneIcon, PencilUpdateIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useClinicOutpatient from '@/home/MasterTransactionV2/ClinicOutpatient/useClinicOutpatient';
import useVaccination from '@/home/MasterTransactionV2/Vaccination/useVaccination';

interface ActionButtonVaccinationProps {
  id: string;
  status: string;
  statusPayment: string;
  serviceType: string;
}

const ActionButtonTransaction: React.FC<ActionButtonVaccinationProps> = ({
  id,
  status,
  statusPayment,
  serviceType,
}) => {
  const navigate = useNavigate();

  const {
    method: { handleSetModalClinicOutpatient },
  } = useClinicOutpatient();
  const {
    method: { handleSetModalVaccination },
  } = useVaccination();

  const handleButtonDetail = () => {
    if (serviceType === 'Rawat Jalan') {
      navigate(`${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}`);
    }
  };

  const handleButtonCancel = () => {
    if (serviceType === 'Imunisasi') {
      handleSetModalVaccination('transactionId', id);
      handleSetModalVaccination('status', 'Batal');
      handleSetModalVaccination('modalConfirmation', true);
    } else {
      handleSetModalClinicOutpatient('transactionId', id);
      handleSetModalClinicOutpatient('status', 'Batal');
      handleSetModalClinicOutpatient('modalConfirmation', true);
    }
  };

  return (
    <>
      {['Registrasi'].includes(status) && (
        <>
          <Button
            size='md'
            class='reject-outline'
            text='Batalkan'
            onClick={handleButtonCancel}
          />
        </>
      )}

      {['Selesai'].includes(status) && (
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
            onClick={handleButtonDetail}
          />
        </>
      )}

      {['Batal'].includes(status) && statusPayment === 'Completed' && (
        <>
          <Button
            size='md'
            class='outline'
            text='Refund'
            customClassName='!rounded-md'
            iconButton={() => <PencilUpdateIcon color='#0A0A0A' />}
            onClick={() => {}}
          />
        </>
      )}
    </>
  );
};

export default ActionButtonTransaction;
