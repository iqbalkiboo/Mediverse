import { useNavigate } from 'react-router-dom';

import { ModalConfirmation, ModalError, ModalSuccess } from '@/src/commons';
import { ModalDetailClinic } from '../../components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import CancelConfirmationClinic from '../CancelConfirmationClinic';
import useClinicOutpatient from '../../useClinicOutpatient';

interface ModalConfirmationClinicProps {
  onSuccess?: () => void;
}

const ModalConfirmationClinic: React.FC<ModalConfirmationClinicProps> = ({
  onSuccess,
}) => {
  const navigate = useNavigate();

  const {
    data: { modalClinicOutpatient, formCancelReason },
    method: {
      handleClearModalClinicOutpatient,
      handleSetModalClinicOutpatient,
      handleCancelClinicOutpatient,
      handleFinishClinicOutpatient,
    },
  } = useClinicOutpatient();

  const renderDescriptionConfirmation = () => {
    switch (modalClinicOutpatient.status) {
      case 'Registrasi':
        return 'Mulai periksa pasien ini?';
      case 'Menunggu Tindakan':
        return 'Lakukan tindakan untuk pasien ini?';
      case 'Sudah Ditindak':
        return 'Apakah anda yakin menyelesaikan reservasi?';
      case 'Batal':
        return 'Batalkan reservasi pasien ini?';
      default:
        return 'Lanjutkan?';
    }
  };

  const renderSuccessTitle = () => {
    if (modalClinicOutpatient.status === 'Batal')
      return 'Pembatalan Reservasi Berhasil!';
    return 'Sukses!';
  };

  const renderSuccessMessage = () => {
    if (modalClinicOutpatient.status === 'Batal')
      return 'Berhasil membatalkan reservasi Pasien';
    return 'Update status berhasil';
  };

  const renderSubmitText = () => {
    switch (modalClinicOutpatient.status) {
      case 'Registrasi':
        return 'Mulai Periksa';
      case 'Menunggu Tindakan':
        return 'Mulai';
      case 'Sudah Ditindak':
        return 'Ya, Selesaikan';
      case 'Batal':
        return 'Ya, Batalkan';
      default:
        return 'Setujui';
    }
  };

  const handleDisableSubmitButton = () => {
    if (isCancelClinic) {
      if (!formCancelReason.description) return true;
    }
    return false;
  };

  const handleSubmitConfirmation = async () => {
    const isInAction = ['Registrasi', 'Menunggu Tindakan'].includes(
      modalClinicOutpatient.status
    );

    if (isInAction) {
      handleClearModalClinicOutpatient();
      if (modalClinicOutpatient.status === 'Registrasi') {
        navigate(
          `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_EXAMINATION}/${modalClinicOutpatient.transactionId}`
        );
      } else {
        navigate(
          `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${modalClinicOutpatient.transactionId}`
        );
      }
    } else {
      if (isCancelClinic) {
        await handleCancelClinicOutpatient();
      }
      if (modalClinicOutpatient.status === 'Sudah Ditindak') {
        await handleFinishClinicOutpatient();
      }
    }
  };

  const isCancelClinic = modalClinicOutpatient.status === 'Batal';

  return (
    <>
      <ModalDetailClinic
        isOpen={modalClinicOutpatient.modalDetail}
        onCancel={handleClearModalClinicOutpatient}
      />

      <ModalConfirmation
        isOpen={modalClinicOutpatient.modalConfirmation}
        isLoadingSubmit={modalClinicOutpatient.isLoading}
        title='Konfirmasi'
        description={renderDescriptionConfirmation()}
        submitText={renderSubmitText()}
        cancelText='Kembali'
        onSubmit={handleSubmitConfirmation}
        onCancel={handleClearModalClinicOutpatient}
        disableButtonSubmit={handleDisableSubmitButton()}
      >
        {isCancelClinic && <CancelConfirmationClinic />}
      </ModalConfirmation>

      <ModalSuccess
        isOpen={modalClinicOutpatient.isSuccess}
        title={renderSuccessTitle()}
        description={renderSuccessMessage()}
        onCancel={() => {
          handleClearModalClinicOutpatient();
          onSuccess && onSuccess();
        }}
      />

      <ModalError
        isOpen={modalClinicOutpatient.isError}
        title='Gagal!'
        description='Update status gagal'
        onCancel={() => handleSetModalClinicOutpatient('isError', false)}
      />
    </>
  );
};

export default ModalConfirmationClinic;
