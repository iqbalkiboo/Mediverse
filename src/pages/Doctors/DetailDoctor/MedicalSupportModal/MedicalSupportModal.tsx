import React from 'react';
import cx from 'classnames';
import {Button, Modal, TextInput, Typography, UploadPdfFile} from '@/src/components';
import {any, bool, func, object} from 'prop-types';
import useFormDoctors from '@/src/pages/Doctors/useFormDoctors';
import {ModalError, ModalSuccess} from '@/src/commons';
import useDoctors from '@/src/pages/Doctors/useDoctors';

const MedicalSupportModal = ({open, setModal, data, id}) => {
  const {
    isPostReservationMedicalSupportError,
    isPostReservationMedicalSupportSuccess,
    isPostReservationMedicalSupportLoading,
    register,
    errors,
    reset,
    formSupport,
    handleSubmit,
    handleSetFormMedicalSupport,
    handleClearFormMedicalSupport,
    handleClearPostReservation,
    handlePostReservationMedicalSupport,
  } = useFormDoctors();

  const {
    detailUser,
    handleGetReservationMedicalSupport,
  } = useDoctors();

  return (
    <>
      <ModalError
        title={'Gagal!'}
        description={'Gagal menambahkan penunjang medis'}
        isOpen={isPostReservationMedicalSupportError}
        onCancel={() => {
          handleClearPostReservation();
        }}
      />
      <ModalSuccess
        title={'Sukses!'}
        description={'Berhasil menambahkan penunjang medis'}
        isOpen={isPostReservationMedicalSupportSuccess}
        onCancel={() => {
          handleClearFormMedicalSupport();
          handleClearPostReservation();
          setModal();
          handleGetReservationMedicalSupport(id, detailUser?.provider_id);
        }}
      />
      <Modal
        open={open}
        onClose={() => {
          reset();
          handleClearFormMedicalSupport();
          setModal();
        }}
        width='w-2/5'
        header={
          <Typography variant='h2' color=''>
            {`${(data.id && data.id !== 0) ? 'Edit' : 'Tambah'} Penunjang Medis`}
          </Typography>}
      >
        <div className={cx('flex-wrap overflow-y-auto')}>
          <form action="" onSubmit={() => {}}>
            {/* Penunjang Medis */}
            <div className={cx('mt-4')}>
              <TextInput
                name="description"
                placeholder="Masukkan penunjang medis"
                label="Penunjang Medis"
                size="sm"
                register={register}
                errorMessage={errors?.description?.message?.toString()}
                value={formSupport.description}
                onInput={({target}) => handleSetFormMedicalSupport('description', target.value)}
                disabled={isPostReservationMedicalSupportLoading}
                isValid
              />
            </div>
            {/* Lampiran */}
            <div className={cx('mt-2')}>
              <UploadPdfFile
                label='Lampiran'
                name={'attachmentUrl'}
                register={register}
                errorMessage={errors?.attachmentUrl?.message?.toString()}
                labelText='Upload'
                labelColor='text-[#9E9E9E]'
                handleSetFile={handleSetFormMedicalSupport}
                editPdfUrl={data.attachmentUrl ?? ''}
                required
                height={200}
              />
            </div>
            <div className={cx('flex items-center gap-x-4 mt-8')}>
              <Button
                size="md"
                class="outline"
                onClick={() => {
                  setModal();
                  handleClearFormMedicalSupport();
                }}
                customClassName="w-full"
                text={'Batal'}
              />
              <Button
                size="md"
                class="primary"
                onClick={handleSubmit((value) => {
                  handlePostReservationMedicalSupport(id, detailUser?.provider_id, value);
                })}
                customClassName="w-full"
                text={`${(isPostReservationMedicalSupportLoading) ? 'Edit' : 'Tambah'}`}
                disabled={isPostReservationMedicalSupportLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

MedicalSupportModal.propTypes = {
  open: bool,
  setModal: func,
  data: object,
  id: any,
};

export default MedicalSupportModal;
