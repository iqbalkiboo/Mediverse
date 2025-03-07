import React from 'react';
import cx from 'classnames';
import {Button, Modal, TextInput, Typography, UploadPdfFile} from '@/src/components';
import {any, bool, func, object} from 'prop-types';
import useFormDoctors from '@/src/pages/Doctors/useFormDoctors';
import {ModalError, ModalSuccess} from '@/src/commons';
import useDoctors from '@/src/pages/Doctors/useDoctors';

const ReferenceModal = ({open, setModal, data, id}) => {
  const {
    isPostReservationHospitalReferralError,
    isPostReservationHospitalReferralSuccess,
    isPostReservationHospitalReferralLoading,
    register,
    errors,
    reset,
    formReferral,
    handleSubmit,
    handleSetFormHospitalReferral,
    handleClearFormHospitalReferral,
    handleClearPostReservation,
    handlePostReservationHospitalReferral,
  } = useFormDoctors();

  const {
    detailUser,
    handleGetReservationHospitalReferral,
  } = useDoctors();

  return (
    <>
      <ModalError
        title={'Gagal!'}
        description={'Gagal menambahkan rujukan'}
        isOpen={isPostReservationHospitalReferralError}
        onCancel={() => {
          handleClearPostReservation();
        }}
      />
      <ModalSuccess
        title={'Sukses!'}
        description={'Berhasil menambahkan rujukan'}
        isOpen={isPostReservationHospitalReferralSuccess}
        onCancel={() => {
          handleClearFormHospitalReferral();
          handleClearPostReservation();
          setModal();
          handleGetReservationHospitalReferral(id, detailUser?.provider_id);
        }}
      />
      <Modal
        open={open}
        onClose={() => {
          reset();
          handleClearFormHospitalReferral();
          setModal();
        }}
        width='w-2/5'
        header={
          <Typography variant='h2' color=''>
            {`${(data.id && data.id !== 0) ? 'Edit' : 'Tambah'} Rujukan`}
          </Typography>
        }
      >
        <div className={cx('flex-wrap overflow-y-auto')}>
          <form action="" onSubmit={() => {}}>
            {/* Faskes Tujuan */}
            <div className={cx('mt-4')}>
              <TextInput
                name="faskesName"
                placeholder="Masukkan faskes tujuan"
                label="Faskes Tujuan"
                size="sm"
                register={register}
                errorMessage={errors?.faskesName?.message?.toString()}
                value={formReferral.faskesName}
                onInput={({target}) => handleSetFormHospitalReferral('faskesName', target.value)}
                disabled={isPostReservationHospitalReferralLoading}
                isValid
              />
            </div>
            {/* Poli Tujuan */}
            <div className={cx('mt-2')}>
              <TextInput
                name="polyName"
                placeholder="Masukkan poli tujuan"
                label="Poli Tujuan"
                size="sm"
                register={register}
                errorMessage={errors?.polyName?.message?.toString()}
                value={formReferral.polyName}
                onInput={({target}) => handleSetFormHospitalReferral('polyName', target.value)}
                disabled={isPostReservationHospitalReferralLoading}
                isValid
              />
            </div>
            {/* Dokter Tujuan */}
            <div className={cx('mt-2')}>
              <TextInput
                name="doctorName"
                placeholder="Masukkan dokter tujuan"
                label="Dokter Tujuan"
                size="sm"
                register={register}
                errorMessage={errors?.doctorName?.message?.toString()}
                value={formReferral.doctorName}
                onInput={({target}) => handleSetFormHospitalReferral('doctorName', target.value)}
                disabled={isPostReservationHospitalReferralLoading}
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
                handleSetFile={handleSetFormHospitalReferral}
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
                  handleClearFormHospitalReferral();
                }}
                customClassName="w-full"
                text={'Batal'}
              />
              <Button
                size="md"
                class="primary"
                onClick={handleSubmit((value) => {
                  handlePostReservationHospitalReferral(id, detailUser?.provider_id, value);
                })}
                customClassName="w-full"
                text={`${(data.id && data.id !== 0) ? 'Edit' : 'Tambah'}`}
                disabled={isPostReservationHospitalReferralLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

ReferenceModal.propTypes = {
  open: bool,
  setModal: func,
  data: object,
  id: any,
};

export default ReferenceModal;
