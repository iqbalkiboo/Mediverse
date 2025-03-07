import { useEffect } from 'react';
import { useParams } from 'react-router';

import {
  Breadcrumb,
  ButtonBack,
  Card,
  TabNavigation,
  Typography,
} from '@/src/components';
import { SpinnerScreen } from '@/src/commons';
import { FormSoap, FormAssessment } from './components';
import { ClinicInformation } from '../components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import usePatientExamination from './usePatientExamination';

const PatientExamination = () => {
  const { id } = useParams();

  const {
    data: { clinicOutpatient, dataClinicOutpatientDetail },
    method: { handleGetDetailTransaction, handleClearTreatment, reset },
  } = usePatientExamination();

  useEffect(() => {
    return () => {
      reset();
      handleClearTreatment();
    };
  }, []);

  useEffect(() => {
    if (id) handleGetDetailTransaction(id);
  }, []);

  const optionTab = [
    {
      id: 'assessment',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_EXAMINATION}/${id}?tab=assessment`,
      label: '1. Pengkajian Pasien',
      disable: true,
      component: <FormAssessment />,
    },
    {
      id: 'soap',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_EXAMINATION}/${id}?tab=soap`,
      label: '2. Pengisian SOAP',
      disable: true,
      component: <FormSoap />,
    },
  ];

  return (
    <>
      {/* Loading Screen */}
      <SpinnerScreen open={clinicOutpatient.isLoading} />

      {/* Breadcrumb */}
      <div className='flex justify-between mb-4'>
        <Breadcrumb />
        <ButtonBack path={`${ROUTES_TRANSACTION.CLINIC_OUTPATIENT}`} />
      </div>

      {/* Header */}
      <div className='mb-6 flex flex-row justify-between'>
        <Typography variant='h1' color='' customClass='text-primary'>
          Klinik/Rawat Jalan
        </Typography>
      </div>

      {/* Content */}
      <Card>
        <div className='mb-4'>
          <Typography variant='h2' color=''>
            Pemeriksaan Pasien
          </Typography>
        </div>

        <ClinicInformation
          patientData={dataClinicOutpatientDetail?.patient_detail}
          appointmentData={dataClinicOutpatientDetail?.appointment_queue}
          payor={dataClinicOutpatientDetail?.payor || 'Umum'}
          transactionStatus={
            dataClinicOutpatientDetail?.service_transaction_status || ''
          }
        />

        <div className='py-6'>
          <Card
            background='bg-white'
            padding='p-0'
            customClassName='border-t-1 border-[#E0E0E0] pt-1'
          >
            <TabNavigation gapx={8} data={optionTab} />
          </Card>
        </div>
      </Card>
    </>
  );
};

export default PatientExamination;
