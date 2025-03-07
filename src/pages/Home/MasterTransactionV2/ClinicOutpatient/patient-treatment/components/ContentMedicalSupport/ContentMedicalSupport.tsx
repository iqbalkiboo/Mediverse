import { useEffect, useState } from 'react';

import { SpinnerScreen } from '@/src/commons';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';
import DetailMedicalSupport from './DetailMedicalSupport';
import FormMedicalSupport from './FormMedicalSupport';

const ContentMedicalSupport = () => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: { id, clinicOutpatient, dataClinicOutpatient, formMedicalSupport },
    method: { handleGetDetailMedicalSupport },
  } = usePatientTreatment();

  useEffect(() => {
    if (id) handleGetDetailMedicalSupport(id);
  }, [id]);

  const isFormClinic =
    dataClinicOutpatient?.service_transaction_status === 'Registrasi' ||
    dataClinicOutpatient?.service_transaction_status === 'Menunggu Tindakan';

  return (
    <>
      <SpinnerScreen open={formMedicalSupport.isLoading} />

      {dataClinicOutpatient?.service_transaction_status ? (
        isFormClinic || isEdit ? (
          <FormMedicalSupport />
        ) : (
          <DetailMedicalSupport onEditClick={() => setIsEdit(true)} />
        )
      ) : (
        <SpinnerScreen open={clinicOutpatient.isLoading} />
      )}
    </>
  );
};

export default ContentMedicalSupport;
