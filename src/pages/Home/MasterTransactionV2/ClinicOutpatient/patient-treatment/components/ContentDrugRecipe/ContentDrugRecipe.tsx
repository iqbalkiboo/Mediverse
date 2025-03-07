import { useEffect, useState } from 'react';

import { SpinnerScreen } from '@/src/commons';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';
import DetailDrugRecipe from './DetailDrugRecipe';
import FormDrugRecipe from './FormDrugRecipe';

const ContentDrugRecipe = () => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: { id, clinicOutpatient, dataClinicOutpatient, formDrugRecipe },
    method: { handleGetDetailDrugRecipe },
  } = usePatientTreatment();

  useEffect(() => {
    if (id) handleGetDetailDrugRecipe(id);
  }, [id]);

  const isFormClinic =
    dataClinicOutpatient?.service_transaction_status === 'Registrasi' ||
    dataClinicOutpatient?.service_transaction_status === 'Menunggu Tindakan';

  return (
    <>
      <SpinnerScreen open={formDrugRecipe.isLoading} />

      {dataClinicOutpatient?.service_transaction_status ? (
        isFormClinic || isEdit ? (
          <FormDrugRecipe />
        ) : (
          <DetailDrugRecipe onEditClick={() => setIsEdit(true)} />
        )
      ) : (
        <SpinnerScreen open={clinicOutpatient.isLoading} />
      )}
    </>
  );
};

export default ContentDrugRecipe;
