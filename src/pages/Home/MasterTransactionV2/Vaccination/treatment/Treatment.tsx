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
  FormTreatment,
} from '@/home/MasterTransactionV2/Vaccination/treatment/components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import VaccinationInformation from '../components/VaccinationInformation';
import useVaccinationTreatment from './useVaccinationTreatment';

const Treatment = () => {
  const { id } = useParams();

  const {
    data: { vaccination, dataVaccinationDetail },
    method: {
      handleGetDetailTransaction,
      handleClearTreatment,
      handleGetDetailSoap,
      reset,
      resetProcedure,
    },
  } = useVaccinationTreatment();

  useEffect(() => {
    return () => {
      reset();
      resetProcedure();
      handleClearTreatment();
    };
  }, []);

  useEffect(() => {
    if (id) handleGetDetailTransaction(id);
  }, []);

  useEffect(() => {
    if (id) handleGetDetailSoap(id);
  }, [id]);

  const optionTab = [
    {
      id: 'soap',
      path: `${ROUTES_TRANSACTION.VACCINATION_PROCEDURE}/${id}?tab=soap`,
      label: '1. Pengisian SOAP',
      disable: true,
      component: <FormSoap />,
    },
    {
      id: 'procedure',
      path: `${ROUTES_TRANSACTION.VACCINATION_PROCEDURE}/${id}?tab=procedure`,
      label: '2. Tindakan',
      disable: true,
      component: <FormTreatment />,
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
            Tindakan Medis
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

export default Treatment;
