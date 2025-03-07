import { useEffect, useState } from 'react';

import { SpinnerScreen } from '@/src/commons';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';
import DetailRecommendationLetter from './DetailRecommendationLetter';
import FormRecommendationLetter from './FormRecommendationLetter';

const ContentRecommendationLetter = () => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: {
      id,
      clinicOutpatient,
      dataClinicOutpatient,
      formRecommendationLetter,
    },
    method: { handleGetDetailRecommendationLetter },
  } = usePatientTreatment();

  useEffect(() => {
    if (id) handleGetDetailRecommendationLetter(id);
  }, [id]);

  const isFormClinic =
    dataClinicOutpatient?.service_transaction_status === 'Registrasi' ||
    dataClinicOutpatient?.service_transaction_status === 'Menunggu Tindakan';

  return (
    <>
      <SpinnerScreen open={formRecommendationLetter.isLoading} />

      {dataClinicOutpatient?.service_transaction_status ? (
        isFormClinic || isEdit ? (
          <FormRecommendationLetter />
        ) : (
          <DetailRecommendationLetter onEditClick={() => setIsEdit(true)} />
        )
      ) : (
        <SpinnerScreen open={clinicOutpatient.isLoading} />
      )}
    </>
  );
};

export default ContentRecommendationLetter;
