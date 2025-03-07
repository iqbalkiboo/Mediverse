import { useEffect, useState } from 'react';

import { SpinnerScreen } from '@/src/commons';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';
import DetailTreatmentClinic from './DetailTreatmentClinic';
import FormTreatmentClinic from './FormTreatmentClinic';

const ContentTreatmentClinic = () => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: { id, clinicOutpatient, dataClinicOutpatient, formProcedure },
    method: { handleGetDetailTreatment },
  } = usePatientTreatment();

  useEffect(() => {
    if (id) handleGetDetailTreatment(id);
  }, [id]);

  const isFormClinic =
    dataClinicOutpatient?.service_transaction_status === 'Registrasi' ||
    dataClinicOutpatient?.service_transaction_status === 'Menunggu Tindakan';

  return (
    <>
      <SpinnerScreen open={formProcedure.isLoading} />

      {dataClinicOutpatient?.service_transaction_status ? (
        isFormClinic || isEdit ? (
          <FormTreatmentClinic />
        ) : (
          <DetailTreatmentClinic onEditClick={() => setIsEdit(true)} />
        )
      ) : (
        <SpinnerScreen open={clinicOutpatient.isLoading} />
      )}
    </>
  );
};

export default ContentTreatmentClinic;
