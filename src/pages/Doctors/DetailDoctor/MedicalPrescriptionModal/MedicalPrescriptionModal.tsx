import React, {useEffect} from 'react';
import cx from 'classnames';
import {
  Button,
  CreateSelectBox,
  Modal,
  TextInput,
  Typography,
} from '@/src/components';
import {any, array, bool, func} from 'prop-types';
import useFormDoctors from '@/src/pages/Doctors/useFormDoctors';
import {ModalError, ModalSuccess} from '@/src/commons';
import useDoctors from '@/src/pages/Doctors/useDoctors';
import {Controller} from 'react-hook-form';

const MedicalPrescriptionModal = ({open, setModal, data, id}) => {
  const {
    isPostReservationPrescriptionsError,
    isPostReservationPrescriptionsSuccess,
    isPostReservationPrescriptionsLoading,
    register,
    errors,
    reset,
    control,
    handleSubmit,
    handleSetFormPrescriptions,
    handleClearFormPrescriptions,
    handleClearPostReservation,
    handlePostReservationPrescriptions,
    formPrescription,
  } = useFormDoctors();

  const {
    detailUser,
    handleGetReservationPrescriptions,
    handleGetListDrug,
    DATA_DRUG,
  } = useDoctors();

  useEffect(() => {
    handleGetListDrug('');
  }, []);

  const {itemName, dosage, usageDescription, id: presId} = formPrescription;

  return (
    <>
      <ModalError
        title={'Gagal!'}
        description={'Gagal menambahkan resep obat'}
        isOpen={isPostReservationPrescriptionsError}
        onCancel={() => {
          handleClearFormPrescriptions();
        }}
      />
      <ModalSuccess
        title={'Sukses!'}
        description={'Berhasil menambahkan resep obat'}
        isOpen={isPostReservationPrescriptionsSuccess}
        onCancel={() => {
          handleClearFormPrescriptions();
          handleClearPostReservation();
          handleGetReservationPrescriptions(id, detailUser?.provider_id);
          setModal();
        }}
      />
      <Modal
        open={open}
        onClose={() => {
          reset();
          handleClearFormPrescriptions();
          setModal();
        }}
        width='w-2/5'
        header={
          <Typography variant='h2' color=''>
            {presId ? 'Edit Resep Obat' : 'Tambah Resep Obat'}
          </Typography>
        }
      >
        <div className={cx('flex-wrap overflow-y-auto')}>
          <form action='' onSubmit={() => {}}>
            <div
              className={cx(
                  'flex flex-col w-full mt-4 p-4 bg-[#F8F8F8] rounded-lg',
              )}
            >
              <div className={cx('flex justify-between w-full')}>
                <Typography variant='h4' color=''>
                  Resep Obat
                </Typography>
              </div>
              {/* Obat */}
              <div className={cx('mt-4')}>
                <Controller
                  name={'itemName'}
                  control={control}
                  defaultValue={''}
                  render={({field: {onChange, value, name, ref}}) => {
                    return (
                      <CreateSelectBox
                        name={'itemName'}
                        label='Obat'
                        inputRef={ref}
                        options={DATA_DRUG}
                        placeholder='Masukkan obat'
                        defaultValue={
                          data.length > 0 && itemName ?
                            {value: itemName, label: itemName} :
                            ''
                        }
                        onChange={({value}) => {
                          onChange(value);
                          handleSetFormPrescriptions('itemName', value);
                        }}
                        errorMessage={
                          errors['itemName'] && errors['itemName'].message
                        }
                        handleInputChange={({value}) => {
                          onChange(value);
                          handleSetFormPrescriptions('itemName', value);
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div className={cx('mt-4')}>
                {/* Petunjuk Pemakaian */}
                <Controller
                  name={'usageDescription'}
                  control={control}
                  defaultValue={usageDescription}
                  render={({field: {onChange, value, name, ref}}) => (
                    <TextInput
                      required
                      name={'usageDescription'}
                      label='Petunjuk Pemakaian'
                      placeholder='Masukkan petunjuk pemakaian'
                      register={register}
                      value={usageDescription}
                      errorMessage={
                        errors['usageDescription'] &&
                        errors['usageDescription'].message?.toString()
                      }
                      onInput={({target}) => {
                        onChange(target.value);
                        handleSetFormPrescriptions(
                            'usageDescription',
                            target.value,
                        );
                      }}
                      isValid
                    />
                  )}
                />
              </div>
              {/* Dosis */}
              <div className={cx('mt-4')}>
                {/* Dosis */}
                <Controller
                  name={'dosage'}
                  control={control}
                  defaultValue={dosage}
                  render={({field: {onChange, value, name, ref}}) => (
                    <TextInput
                      required
                      name={'dosage'}
                      label='Dosis'
                      placeholder='Masukkan Dosis'
                      register={register}
                      value={dosage}
                      errorMessage={
                        errors['dosage'] &&
                        errors['dosage'].message?.toString()
                      }
                      onInput={({target}) => {
                        onChange(target.value);
                        handleSetFormPrescriptions(
                            'dosage',
                            target.value,
                        );
                      }}
                      isValid
                    />
                  )}
                />
              </div>
            </div>
            <div className={cx('flex items-center gap-x-4 mt-8 mb-4')}>
              <Button
                size='md'
                class='outline'
                onClick={() => {
                  setModal();
                  handleClearFormPrescriptions();
                }}
                customClassName='w-full'
                text={'Batal'}
              />
              <Button
                size='md'
                class='primary'
                onClick={handleSubmit(() =>
                  handlePostReservationPrescriptions(
                      id,
                      detailUser?.provider_id,
                  ),
                )}
                customClassName='w-full'
                text={presId ? 'Edit' : 'Tambah'}
                disabled={isPostReservationPrescriptionsLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

MedicalPrescriptionModal.propTypes = {
  open: bool,
  setModal: func,
  data: array,
  id: any,
};

export default MedicalPrescriptionModal;
