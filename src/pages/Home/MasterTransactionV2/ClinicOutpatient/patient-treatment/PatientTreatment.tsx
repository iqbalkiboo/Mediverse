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
import {
  ContentSoapClinic,
  ContentTreatmentClinic,
  ContentDrugRecipe,
  ContentMedicalSupport,
  ContentRecommendationLetter,
} from './components';
import { ClinicInformation } from '@/home/MasterTransactionV2/ClinicOutpatient/components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';

const PatientTreatment = () => {
  const { id } = useParams();

  const {
    data: { clinicOutpatient, dataClinicOutpatient },
    method: {
      handleGetDetailTransaction,
      handleClearTreatment,
      reset,
      resetProcedure,
      resetMedicalSupport,
    },
  } = usePatientTreatment();

  useEffect(() => {
    return () => {
      reset();
      resetProcedure();
      resetMedicalSupport();
      handleClearTreatment();
    };
  }, []);

  useEffect(() => {
    if (id) handleGetDetailTransaction(id);
  }, []);

  const isFormClinic =
    dataClinicOutpatient?.service_transaction_status === 'Registrasi' ||
    dataClinicOutpatient?.service_transaction_status === 'Menunggu Tindakan';

  const optionTab = [
    {
      id: 'soap',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=soap`,
      label: '1. Pengisian SOAP',
      disable: isFormClinic,
      component: <ContentSoapClinic />,
    },
    {
      id: 'procedure',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=procedure`,
      label: '2. Tindakan',
      disable: isFormClinic,
      component: <ContentTreatmentClinic />,
    },
    {
      id: 'recipe',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=recipe`,
      label: '3. Resep Obat',
      disable: isFormClinic,
      component: <ContentDrugRecipe />,
    },
    {
      id: 'support',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=support`,
      label: '4. Penunjang Medis',
      disable: isFormClinic,
      component: <ContentMedicalSupport />,
    },
    {
      id: 'recommendation',
      path: `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=recommendation`,
      label: '5. Surat Rekomendasi',
      disable: isFormClinic,
      component: <ContentRecommendationLetter />,
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
            Tindakan Medis
          </Typography>
        </div>

        <ClinicInformation
          patientData={dataClinicOutpatient?.patient_detail}
          appointmentData={dataClinicOutpatient?.appointment_queue}
          payor={dataClinicOutpatient?.payor || 'Umum'}
          transactionStatus={
            dataClinicOutpatient?.service_transaction_status || ''
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

export default PatientTreatment;
