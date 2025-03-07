import { useEffect, useState } from 'react';

import { SpinnerScreen } from '@/src/commons';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';
import DetailSoapClinic from './DetailSoapClinic';
import FormSoapClinic from './FormSoapClinic';

const ContentSoapClinic = () => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: { id, clinicOutpatient, dataClinicOutpatient, formSoap },
    method: { handleGetDetailSoap },
  } = usePatientTreatment();

  useEffect(() => {
    if (id) handleGetDetailSoap(id);
  }, [id]);

  const isFormClinic =
    dataClinicOutpatient?.service_transaction_status === 'Registrasi' ||
    dataClinicOutpatient?.service_transaction_status === 'Menunggu Tindakan';

  return (
    <>
      <SpinnerScreen open={formSoap.isLoading} />

      {dataClinicOutpatient?.service_transaction_status ? (
        isFormClinic || isEdit ? (
          <FormSoapClinic />
        ) : (
          <DetailSoapClinic onEditClick={() => setIsEdit(true)} />
        )
      ) : (
        <SpinnerScreen open={clinicOutpatient.isLoading} />
      )}
    </>
  );
};

export default ContentSoapClinic;
