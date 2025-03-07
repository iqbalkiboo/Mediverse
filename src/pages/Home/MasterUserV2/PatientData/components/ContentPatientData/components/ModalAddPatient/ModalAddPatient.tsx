import { useEffect, useState } from 'react';

import { Card, Modal, TabNavigation } from '@/src/components/';
import { ModalError, ModalSuccess } from '@/src/commons';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import FormIdentity from '../FormIdentity';
import FormAddress from '../FormAddress';
import useAddPatient from './useAddPatient';

interface ModalAddPatientProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (patientData) => void;
  successTitle?: string;
  successDescription?: string;
}

const ModalAddPatient: React.FC<ModalAddPatientProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  successTitle,
  successDescription,
}) => {
  const { isMobile } = useWindowSize();

  const [optionType, setOptionType] = useState<string>('identity');
  const [insuranceData, setInsuranceData] = useState([]);

  const {
    data: { formPatient },
    method: {
      handleClearPatient,
      handleSubmitPatient,
      handleSubmitPatientPayor,
      handleSetModal,
      handleClearLocation,
    },
  } = useAddPatient();

  useEffect(() => {
    handleClearPatient();
    handleClearLocation();
  }, []);

  useEffect(() => {
    if (formPatient.isSuccess) handleSubmitPatientPayor(insuranceData);
  }, [formPatient.isSuccess]);

  const handleCloseModal = () => {
    setOptionType('identity');
    setInsuranceData([]);
    handleClearPatient();
    handleClearLocation();
    onCancel();
  };

  const optionTab = [
    {
      id: 'identity',
      label: '1. Identitas Pasien',
      disable: true,
      component: (
        <FormIdentity
          insuranceState={insuranceData}
          onCancel={handleCloseModal}
          onSubmit={(insuranceData) => {
            setInsuranceData(insuranceData);
            setOptionType('address');
          }}
        />
      ),
    },
    {
      id: 'address',
      label: '2. Alamat Pasien',
      disable: true,
      component: (
        <FormAddress
          onCancel={() => setOptionType('identity')}
          onSubmit={handleSubmitPatient}
        />
      ),
    },
  ];

  return (
    <>
      <ModalSuccess
        isOpen={formPatient.isSuccess}
        title={successTitle || 'Data Pasien berhasil disimpan!'}
        description={successDescription}
        onCancel={() => {
          handleSetModal('isSuccess', false);
          onSubmit(formPatient.data);
          handleCloseModal();
        }}
      />
      <ModalError
        isOpen={formPatient.isError}
        title='Gagal'
        description={formPatient.errorMessage}
        onCancel={() => handleSetModal('isError', false)}
      />

      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        title='Tambah Pasien Baru'
        titleSize='h2'
        style={`${isMobile ? 'w-full' : ' w-2/3'}`}
        closeIcon={false}
      >
        <div className='mt-2 mb-2'>
          <Card background='bg-white' padding='p-0'>
            <TabNavigation
              gapx={8}
              data={optionTab}
              tabType={optionType}
              handleNavigate={(type) => setOptionType(type)}
            />
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddPatient;
