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
  FormSoap,
  FormAssessment,
} from '@/home/MasterTransactionV2/Vaccination/checkup/components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import VaccinationInformation from '../components/VaccinationInformation';
import useVaccinationCheckup from './useVaccinationCheckup';

const Checkup = () => {
  const { id } = useParams();

  const {
    data: { vaccination, dataVaccinationDetail },
    method: { handleGetDetailTransaction, handleClearTreatment, reset },
  } = useVaccinationCheckup();

  useEffect(() => {
    if (id) handleGetDetailTransaction(id);
  }, []);

  useEffect(() => {
    return () => {
      reset();
      handleClearTreatment();
    };
  }, []);

  const optionTab = [
    {
      id: 'assessment',
      path: `${ROUTES_TRANSACTION.MEDPOINT_PROCEDURE}/${id}?tab=assessment`,
      label: '1. Pengkajian Pasien',
      disable: true,
      component: <FormAssessment />,
    },
    {
      id: 'soap',
      path: `${ROUTES_TRANSACTION.MEDPOINT_PROCEDURE}/${id}?tab=soap`,
      label: '2. Pengisian SOAP',
      disable: true,
      component: <FormSoap />,
    },
  ];

  return (
    <>
      {/* Loading Screen */}
      <SpinnerScreen open={vaccination.isLoading} />

      {/* Breadcrumb */}
      <div className='flex justify-between mb-4'>
        <Breadcrumb />
        <ButtonBack path={`${ROUTES_TRANSACTION.VACCINATIONS}`} />
      </div>

      {/* Header */}
      <div className='mb-6 flex flex-row justify-between'>
        <Typography variant='h1' color='' customClass='text-primary'>
          Imunisasi
        </Typography>
      </div>

      {/* Content */}
      <Card>
        <div className='mb-4'>
          <Typography variant='h2' color=''>
            Pemeriksaan Pasien
          </Typography>
        </div>

        <VaccinationInformation
          patientData={dataVaccinationDetail?.patient_detail}
          appointmentData={dataVaccinationDetail?.appointment_queue}
          payor={dataVaccinationDetail?.payor || 'Umum'}
          transactionStatus={
            dataVaccinationDetail?.service_transaction_status || ''
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

export default Checkup;
