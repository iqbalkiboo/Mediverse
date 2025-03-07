import { useState } from 'react';

import { TextInput } from '@/src/components';
import { ModalConfirmation, ModalError, ModalSuccess } from '@/src/commons';
import usePayment from '@/home/MasterTransactionV2/Payment/usePayment';

interface ModalConfirmationPaymentProps {
  onSuccess?: () => void;
}

const ModalConfirmationPayment: React.FC<ModalConfirmationPaymentProps> = ({
  onSuccess,
}) => {
  const [description, setDescription] = useState('');

  const {
    data: { modalPayment },
    method: {
      handleClearModalPayment,
      handleCancelPayment,
      handleSetModalPayment,
    },
  } = usePayment();

  const renderDescriptionConfirmation = () => {
    switch (modalPayment.status) {
      case 'Registrasi':
        return 'Mulai periksa pasien ini?';
      case 'Menunggu Tindakan':
        return 'Lakukan tindakan untuk pasien ini?';
      case 'Sudah Ditindak':
        return 'Apakah anda yakin menyelesaikan pembayaran?';
      case 'Batal':
        return 'Batalkan pembayaran pasien ini?';
      default:
        return 'Lanjutkan?';
    }
  };

  const renderSuccessTitle = () => {
    if (modalPayment.status === 'Batal')
      return 'Pembatalan Pembayaran Berhasil!';
    return 'Sukses!';
  };

  const renderSuccessMessage = () => {
    if (modalPayment.status === 'Batal')
      return 'Berhasil membatalkan pembayaran Pasien';
    return 'Update status berhasil';
  };

  const renderSubmitText = () => {
    switch (modalPayment.status) {
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

  const handleSubmitConfirmation = async () => {
    if (isCancelPayment) await handleCancelPayment(description);
  };

  const isCancelPayment = modalPayment.status === 'Batal';

  return (
    <>
      <ModalConfirmation
        isOpen={modalPayment.modalConfirmation}
        isLoadingSubmit={modalPayment.isLoading}
        title='Konfirmasi'
        description={renderDescriptionConfirmation()}
        submitText={renderSubmitText()}
        cancelText='Kembali'
        onSubmit={handleSubmitConfirmation}
        onCancel={() => {
          setDescription('');
          handleClearModalPayment();
        }}
        disableButtonSubmit={!description}
      >
        {isCancelPayment && (
          <div className='w-full mt-4'>
            <TextInput
              type='textarea'
              rows={5}
              name='reason'
              placeholder='Masukkan Alasan'
              customStyle={{ resize: 'none' }}
              value={description}
              onInput={({ target }) => setDescription(target.value)}
              required
            />
          </div>
        )}
      </ModalConfirmation>

      <ModalSuccess
        isOpen={modalPayment.isSuccess}
        title={renderSuccessTitle()}
        description={renderSuccessMessage()}
        onCancel={() => {
          setDescription('');
          handleClearModalPayment();
          onSuccess && onSuccess();
        }}
      />

      <ModalError
        isOpen={modalPayment.isError}
        title='Gagal!'
        description='Update pembayaran gagal'
        onCancel={() => handleSetModalPayment('isError', false)}
      />
    </>
  );
};

export default ModalConfirmationPayment;
