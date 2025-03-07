import { useEffect, useState } from 'react';
import cx from 'classnames';

import { Badges, Button, Modal, Typography } from '@/src/components';
import { IntegratedNotes } from '@/home/MasterUserV2/PatientData/PatientDataDetail/Components/DetailContent/components';
import { TRANSACTION_STATUS_RESPONSE } from '@/src/constants';
import { formatDate, formatDateWithTime } from '@/utils/formatDate';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import usePatientData from '@/home/MasterUserV2/PatientData/usePatientData';

interface VaccinationInformationProps {
  patientData: any;
  appointmentData: any;
  payor: string;
  transactionStatus: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case TRANSACTION_STATUS_RESPONSE.COMPLETED:
    case TRANSACTION_STATUS_RESPONSE.FINISHED:
    case 'Selesai':
      return 'bg-[#48AA44] text-[#DDFFDC]';
    default:
      return 'bg-[#00ABBD] text-[#FFFFFF]';
  }
};

const ClinicInformation: React.FC<VaccinationInformationProps> = ({
  patientData,
  appointmentData,
  payor,
  transactionStatus,
}) => {
  const { isMobile } = useWindowSize();

  const [openNotes, setOpenNotes] = useState(false);

  const {
    method: { handleClearPatient },
  } = usePatientData();

  useEffect(() => {
    return () => {
      handleClearPatient();
    };
  }, []);

  return (
    <>
      <Modal
        open={openNotes}
        onClose={() => setOpenNotes(false)}
        title='Catatan Terintegrasi'
        titleSize='h2'
        style={cx({
          'w-full': isMobile,
          'w-3/4': !isMobile,
        })}
      >
        <div className='overflow-y-auto mt-4'>
          <IntegratedNotes patientId={patientData?.name || ''} />
        </div>
      </Modal>

      <div className='flex justify-between items-center mb-6'>
        <div>
          <Typography variant='subtitle1' color='' customClass='mb-2'>
            No Antrian: {appointmentData?.queue_code}
          </Typography>
          <div className='flex items-center mt-2.5'>
            <Typography variant='bodySmall' color='text-grayTertiary'>
              Tanggal Transaksi:
            </Typography>
            <div className='ml-1'>
              <Typography variant='bodySmall' color='text-grayTertiary'>
                {formatDateWithTime(appointmentData?.arrival)} WIB
              </Typography>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2 mb-3'>
          <Typography variant='h4' color=''>
            Status Tindakan:
          </Typography>
          <div>
            <Badges
              status={transactionStatus}
              message={transactionStatus}
              customClassName={getStatusColor(transactionStatus || '')}
            />
          </div>
        </div>
      </div>

      <div className='bg-[#F8F8F8] mb-2 p-6 rounded-md'>
        <div className='w-full flex items-start justify-between gap-2'>
          <div className='my-1'>
            <Typography variant='bodySmall' color='text-gray-500'>
              Pasien:
            </Typography>
            <Typography variant='h4' color=''>
              {patientData?.patient_name ?? '-'}
            </Typography>
            <Typography variant='bodySmall' color=''>
              {patientData?.dob
                ? formatDate(patientData?.dob, '/', 'MM', false)
                : '-'}
            </Typography>
          </div>
          <div className='my-1'>
            <Typography variant='bodySmall' color='text-gray-500'>
              NIK:
            </Typography>
            <Typography variant='bodySmall' color=''>
              {patientData?.no_identifier ?? '-'}
            </Typography>
          </div>

          <div className='my-1'>
            <Typography variant='bodySmall' color='text-gray-500'>
              Penjamin:
            </Typography>
            <Typography variant='bodySmall' color=''>
              {payor ?? '-'}
            </Typography>
          </div>
          <div className='my-1'>
            <Typography variant='bodySmall' color='text-gray-500'>
              Status Tindakan:
            </Typography>
            <Typography variant='bodySmall' color=''>
              {patientData?.patient_type ?? '-'}
            </Typography>
          </div>

          <div className='w-56 flex flex-col gap-2'>
            <div className='mt-1'>
              <Button
                id='note-integration-btn'
                text='Catatan Terintegrasi'
                class='outline'
                customTextStyle='text-xs'
                size='sm'
                onClick={() => setOpenNotes(true)}
                style={{
                  width: '225px',
                  borderRadius: '0.375rem',
                }}
              />
            </div>
            <div className='mt-2'>
              <Button
                id='note-integration-btn'
                text='Hasil Laboratorium'
                class='outline'
                customTextStyle='text-xs'
                size='sm'
                onClick={() => {}}
                style={{
                  width: '225px',
                  borderRadius: '0.375rem',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicInformation;
