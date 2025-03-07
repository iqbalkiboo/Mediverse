import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModalConfirmation, ModalRegisterService } from '../../components';
import { ModalError, ModalSuccess } from '@/src/commons';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useRegister from '@/home/MasterTransactionV2/Queue/register/useRegister';
import ContentPatientData from '@/home/MasterUserV2/PatientData/components/ContentPatientData';

const ContentRegister = () => {
  const navigate = useNavigate();

  const {
    data: { formRegister },
    method: { handleAddAppointment, handleSetModalRegister },
  } = useRegister();

  const [openRegisterService, setOpenRegisterService] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [dataPatient, setDataPatient] = useState<any>(null);
  const [dataService, setDataService] = useState(null);

  useEffect(() => {
    if (formRegister.isSuccess) {
      setOpenRegisterService(false);
      setOpenConfirmation(false);
      setDataPatient(null);
      setDataService(null);
    }
  }, [formRegister.isSuccess]);

  return (
    <>
      <ModalSuccess
        isOpen={formRegister.isSuccess}
        title='Terima kasih!'
        description='Silakan mengambil hasil cetak nomor antrian untuk diserahkan ke Pasien, dan diarahkan ke area tunggu Pelayanan. Pasien akan dipanggil sesuai nomor antrian tertera.'
        onCancel={() => {
          setOpenRegisterService(false);
          setOpenConfirmation(false);
          setDataPatient(null);
          setDataService(null);
          handleSetModalRegister('isSuccess', false);
          navigate(ROUTES_TRANSACTION.QUEUE);
        }}
      />
      <ModalError
        isOpen={formRegister.isError}
        title='Gagal'
        description={formRegister.errorMessage}
        onCancel={() => handleSetModalRegister('isError', false)}
      />

      <ModalRegisterService
        isOpen={openRegisterService}
        onCancel={() => {
          setDataPatient(null);
          setOpenRegisterService(false);
        }}
        onSubmit={(data) => {
          setDataService(data);
          setOpenConfirmation(true);
        }}
        onSuccess={formRegister.isSuccess}
        isLoading={formRegister.isLoading}
        dataPatient={dataPatient}
      />
      <ModalConfirmation
        isOpen={openConfirmation}
        data={{ patient: dataPatient, service: dataService }}
        onClose={() => setOpenConfirmation(false)}
        previous={() => setOpenRegisterService(true)}
        next={() =>
          handleAddAppointment({ patient: dataPatient, service: dataService })
        }
        isLoading={formRegister.isLoading}
      />

      <ContentPatientData
        onPatientAction={(data) => {
          setDataPatient(data);
          setOpenRegisterService(true);
        }}
        onSubmitAddPatient={(patientData) => {
          setDataPatient({
            dob: patientData?.dob || '',
            email: patientData?.email || '',
            mobile: patientData?.mobile || '',
            name: patientData?.name || '',
            no_identifier: patientData?.no_identifier || '',
            patient_name: patientData?.patient_name || '',
            sex: patientData?.sex || '',
          });
          setOpenRegisterService(true);
        }}
        successTitle='Data Pasien berhasil disimpan!'
        successDescription='Lanjutkan ke pendaftaran Layanan?'
      />
    </>
  );
};

export default ContentRegister;
