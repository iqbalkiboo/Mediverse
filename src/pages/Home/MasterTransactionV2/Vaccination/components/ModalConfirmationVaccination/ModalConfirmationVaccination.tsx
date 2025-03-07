import { useNavigate } from 'react-router-dom';

import { ModalConfirmation, ModalError, ModalSuccess } from '@/src/commons';
import {
  CancelConfirmationVaccination,
  ModalDetailVaccination,
  ModalKipi,
} from '../../components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useVaccination from '../../useVaccination';

interface ModalConfirmationVaccinationProps {
  onSuccess?: () => void;
}

const ModalConfirmationVaccination: React.FC<
  ModalConfirmationVaccinationProps
> = ({ onSuccess }) => {
  const navigate = useNavigate();

  const {
    data: { modalVaccination, formCancelReason },
    method: {
      handleClearModalVaccination,
      handleClearFormObservationReason,
      handleSetModalVaccination,
      handleCancelVaccination,
    },
  } = useVaccination();

  const renderDescriptionConfirmation = () => {
    switch (modalVaccination.status) {
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
    if (modalVaccination.status === 'Batal')
      return 'Pembatalan Reservasi Berhasil!';
    return 'Sukses!';
  };

  const renderSuccessMessage = () => {
    if (modalVaccination.status === 'Batal')
      return 'Berhasil membatalkan reservasi Pasien';
    return 'Update status berhasil';
  };

  const renderSubmitText = () => {
    switch (modalVaccination.status) {
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
      modalVaccination.status
    );

    if (isInAction) {
      handleClearModalVaccination();
      if (modalVaccination.status === 'Registrasi') {
        navigate(
          `${ROUTES_TRANSACTION.VACCINATION_CHECKUP}/${modalVaccination.transactionId}`
        );
      } else {
        navigate(
          `${ROUTES_TRANSACTION.VACCINATION_PROCEDURE}/${modalVaccination.transactionId}`
        );
      }
    } else {
      if (isCancelVaccin) {
        await handleCancelVaccination();
      }
    }
  };

  const isCancelVaccin = modalVaccination.status === 'Batal';

  return (
    <>
      <ModalDetailVaccination
        isOpen={modalVaccination.modalDetail}
        onCancel={handleClearModalVaccination}
      />

      <ModalKipi
        isOpen={modalVaccination.modalKipi}
        isLoadingSubmit={modalVaccination.isLoading}
        onCancel={() => {
          handleClearModalVaccination();
          handleClearFormObservationReason();
        }}
      />

      <ModalConfirmation
        isOpen={modalVaccination.modalConfirmation}
        isLoadingSubmit={modalVaccination.isLoading}
        title='Konfirmasi'
        description={renderDescriptionConfirmation()}
        submitText={renderSubmitText()}
        cancelText='Kembali'
        onSubmit={handleSubmitConfirmation}
        onCancel={handleClearModalVaccination}
        disableButtonSubmit={handleDisableSubmitButton()}
      >
        {isCancelVaccin && <CancelConfirmationVaccination />}
      </ModalConfirmation>

      <ModalSuccess
        isOpen={modalVaccination.isSuccess}
        title={renderSuccessTitle()}
        description={renderSuccessMessage()}
        onCancel={() => {
          handleClearModalVaccination();
          onSuccess && onSuccess();
        }}
      />

      <ModalError
        isOpen={modalVaccination.isError}
        title='Gagal!'
        description='Update status gagal'
        onCancel={() => handleSetModalVaccination('isError', false)}
      />
    </>
  );
};

export default ModalConfirmationVaccination;
