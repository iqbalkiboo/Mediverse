import { ModalConfirmation, ModalError, ModalSuccess } from '@/src/commons';
import CancelConfirmationLab from '../CancelConfirmationLab';
import useLaboratoriums from '../../useLaboratoriums';

interface ModalConfirmationVaccinationProps {
  onSuccess?: () => void;
}

const ModalConfirmationLab: React.FC<ModalConfirmationVaccinationProps> = ({
  onSuccess,
}) => {
  const {
    data: { modalLaboratory, formCancelReason },
    method: {
      handleClearModalVaccination,
      handleSetModalLaboratorium,
      handleCancelVaccination,
      handleUpadetStatusLabs,
    },
  } = useLaboratoriums();

  const renderDescriptionConfirmation = () => {
    switch (modalLaboratory.status) {
      case 'Registrasi':
        return 'Mulai periksa pasien ini?';
      case 'Menunggu Tindakan':
        return 'Lakukan tindakan untuk pasien ini?';
      case 'Batal':
        return 'Batalkan reservasi pasien ini?';
      case 'Dalam Tindakan':
        return 'Apakah anda yakin menyelesaikan reservasi?';
      default:
        return 'Lanjutkan?';
    }
  };

  const renderSuccessTitle = () => {
    if (modalLaboratory.status === 'Batal')
      return 'Pembatalan Reservasi Berhasil!';
    return 'Sukses!';
  };

  const renderSuccessMessage = () => {
    if (modalLaboratory.status === 'Batal')
      return 'Berhasil membatalkan reservasi Pasien';
    return 'Update status berhasil';
  };

  const renderSubmitText = () => {
    switch (modalLaboratory.status) {
      case 'Registrasi':
        return 'Mulai Periksa';
      case 'Menunggu Tindakan':
        return 'Mulai';
      case 'Batal':
        return 'Ya, Batalkan';
      default:
        return 'Setujui';
    }
  };

  const handleDisableSubmitButton = () => {
    if (isCancelVaccin) {
      if (!formCancelReason.actionReason || !formCancelReason.description)
        return true;
    }
    return false;
  };

  const handleSubmitConfirmation = async () => {
    const isInAction = ['Registrasi', 'Menunggu Tindakan'].includes(
      modalLaboratory.status
    );

    if (isInAction) {
      await handleUpadetStatusLabs();
    } else {
      if (isCancelVaccin) {
        await handleCancelVaccination();
      }
    }
  };

  const isCancelVaccin = modalLaboratory.status === 'Batal';

  return (
    <>
      <ModalConfirmation
        isOpen={modalLaboratory.modalConfirmation}
        isLoadingSubmit={modalLaboratory.isLoading}
        title='Konfirmasi'
        description={renderDescriptionConfirmation()}
        submitText={renderSubmitText()}
        cancelText='Kembali'
        onSubmit={handleSubmitConfirmation}
        onCancel={handleClearModalVaccination}
        disableButtonSubmit={handleDisableSubmitButton()}
      >
        {isCancelVaccin && <CancelConfirmationLab />}
      </ModalConfirmation>

      <ModalSuccess
        isOpen={modalLaboratory.isSuccess}
        title={renderSuccessTitle()}
        description={renderSuccessMessage()}
        onCancel={() => {
          handleClearModalVaccination();
          onSuccess && onSuccess();
        }}
      />

      <ModalError
        isOpen={modalLaboratory.isError}
        title='Gagal!'
        description='Update status gagal'
        onCancel={() => handleSetModalLaboratorium('isError', false)}
      />
    </>
  );
};

export default ModalConfirmationLab;
