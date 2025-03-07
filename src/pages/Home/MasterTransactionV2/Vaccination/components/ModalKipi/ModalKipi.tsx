import { useEffect } from 'react';
import cx from 'classnames';

import {
  AsyncSelect,
  Button,
  Modal,
  RadioButton,
  Typography,
} from '@/src/components/';
import { SpinnerScreen } from '@/src/commons';
import { CheckOneIcon } from '@/assets/images/svg';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import VaccinationInformation from '../VaccinationInformation';
import useVaccination from '../../useVaccination';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

interface ModalKipiProps {
  isOpen: boolean;
  isLoadingSubmit: boolean;
  onCancel: any;
}

const ModalKipi: React.FC<ModalKipiProps> = ({
  isOpen,
  isLoadingSubmit,
  onCancel,
}) => {
  const { isMobile } = useWindowSize();

  const {
    data: { listSelectObservationReason },
    method: {
      handleGetListObservationReason,
      handleSearchListObservationReason,
    },
  } = useTransaction();
  const {
    data: {
      vaccination,
      dataVaccinationDetail,
      modalVaccination,
      formObservationReason,
    },
    method: {
      handleGetDetailTransaction,
      handleClearFormCancelReason,
      handleSetFormObservationReason,
      handleObservationVaccination,
    },
  } = useVaccination();

  useEffect(() => {
    return () => handleClearFormCancelReason();
  }, []);

  useEffect(() => {
    if (modalVaccination.isSuccess) handleClearFormCancelReason();
  }, [modalVaccination.isSuccess]);

  useEffect(() => {
    if (isOpen && modalVaccination.transactionId) {
      handleGetDetailTransaction(modalVaccination.transactionId);
      handleGetListObservationReason();
    }
  }, [modalVaccination.transactionId]);

  useEffect(() => {
    if (dataVaccinationDetail?.service_transaction_status === 'Selesai')
      handleSetFormObservationReason('have_complaint', true);
  }, [dataVaccinationDetail?.service_transaction_status]);

  const handleDisableSubmitButton = () => {
    if (formObservationReason?.have_complaint === false) {
      return false;
    } else {
      return !(formObservationReason?.reason?.length > 0);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <SpinnerScreen open={vaccination.isLoading || isLoadingSubmit} />

      <Modal
        open={isOpen}
        onClose={onCancel}
        title='Pengisian KIPI'
        titleSize='h2'
        style={cx({
          'w-full': isMobile,
          'w-2/4': !isMobile,
        })}
      >
        <div className='mt-4'>
          <VaccinationInformation
            patientData={dataVaccinationDetail?.patient_detail}
            appointmentData={dataVaccinationDetail?.appointment_queue}
            payor={dataVaccinationDetail?.payor || 'Umum'}
            transactionStatus={
              dataVaccinationDetail?.service_transaction_status || ''
            }
          />
        </div>

        <div className='py-6'>
          <div className='border-t-1 border-[#E0E0E0] pt-2'>
            <div className='w-full border-b-[1px] flex mt-2 gap-x-8'>
              <button className='border-b-2 border-b-primary'>
                <div className='flex w-full items-center mb-[7.5px]'>
                  <p className='text-center text-primary font-bold px-2'>
                    Keluhan Pasien
                  </p>
                </div>
              </button>
            </div>
            <div className='flex flex-col gap-6 p-5'>
              {dataVaccinationDetail?.service_transaction_status ===
                'Sudah Ditindak' && (
                <div>
                  <Typography variant='bodyBase' color='' customClass='mb-2'>
                    Apakah ada keluhan dari pasien setelah divaksin?
                    <span className='text-danger'>*</span>
                  </Typography>
                  <div className='flex gap-6 mt-2 text-base'>
                    <RadioButton
                      id='keluhan-ya-radio'
                      name='keluhan-ya-radio'
                      label='Ya'
                      value='ya'
                      htmlFor='keluhan-ya-radio'
                      checked={formObservationReason.have_complaint === true}
                      onChange={() =>
                        handleSetFormObservationReason('have_complaint', true)
                      }
                      customClassName='w-4 h-4 text-base'
                    />
                    <RadioButton
                      id='keluha-belum-radio'
                      name='keluha-belum-radio'
                      label='Belum'
                      value='belum'
                      htmlFor='keluha-belum-radio'
                      checked={formObservationReason.have_complaint === false}
                      onChange={() =>
                        handleSetFormObservationReason('have_complaint', false)
                      }
                      customClassName='w-4 h-4'
                    />
                  </div>
                </div>
              )}
              {formObservationReason.have_complaint && (
                <div className='w-full'>
                  <Typography variant='bodyBase' color='' customClass='mb-2'>
                    Keluhan
                    <span className='text-danger'>*</span>
                  </Typography>
                  <AsyncSelect
                    id='keluhan'
                    name='keluhan'
                    label=''
                    placeholder='Masukkan keluhan'
                    options={listSelectObservationReason}
                    loadOptions={handleSearchListObservationReason}
                    isDisabled={formObservationReason.have_complaint === false}
                    onChange={(item) =>
                      handleSetFormObservationReason('reason', item)
                    }
                    minHeight='44px'
                    required
                    isMulti
                  />
                </div>
              )}
            </div>
            <div>
              <Button
                id='done-save-btn'
                text={
                  dataVaccinationDetail?.service_transaction_status ===
                  'Sudah Ditindak'
                    ? 'Simpan & Selesai'
                    : 'Simpan'
                }
                size='md'
                class='primary'
                iconButton={CheckOneIcon}
                disabled={handleDisableSubmitButton()}
                loading={modalVaccination.isLoading}
                onClick={handleObservationVaccination}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalKipi;
