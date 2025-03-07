import React from 'react';
import {Button, Modal, TextInput, Typography} from '@/src/components';
import cx from 'classnames';
import {BloodPressureIcon, CelciusIcon, CentimeterIcon, KilogramIcon} from '@/src/assets/images/svg';
import {bool, func, object, string} from 'prop-types';
import useFormDoctors from '@/src/pages/Doctors/useFormDoctors';
import {ModalError, ModalSuccess} from '@/src/commons';
import useDoctors from '@/src/pages/Doctors/useDoctors';

const DoctorDiagnoseModal = ({open, setModal, data, id}) => {
  const {
    isPostReservationDiagnosticError,
    isPostReservationDiagnosticSuccess,
    register,
    errors,
    reset,
    formDiagnose,
    handleSubmit,
    handleSetFormDiagnose,
    handleClearFormDiagnose,
    handleClearPostReservation,
    handlePostReservationDiagnostic,
    isPostReservationDiagnosticLoading,
  } = useFormDoctors();

  const {
    detailUser,
    handleGetReservationDiagnostic,
  } = useDoctors();

  return (
    <>
      <ModalError
        title={'Gagal!'}
        description={'Gagal menambahkan diagnosis dokter!'}
        isOpen={isPostReservationDiagnosticError}
        onCancel={() => {
          handleClearPostReservation();
        }}
      />
      <ModalSuccess
        title={'Berhasil!'}
        description={'Berhasil menambahkan diagnosis dokter!'}
        isOpen={isPostReservationDiagnosticSuccess}
        onCancel={() => {
          handleClearFormDiagnose();
          handleClearPostReservation();
          setModal();
          handleGetReservationDiagnostic(id, detailUser?.provider_id);
        }}
      />
      <Modal
        open={open}
        onClose={() => {
          reset();
          handleClearFormDiagnose();
          setModal();
        }}
        header={
          <Typography variant='h2' color=''>
            {`${(data.id && data.id !== 0) ? 'Edit' : 'Tambah'} Diagnosis Dokter`}
          </Typography>
        }
        style={cx('w-7/12')}
      >
        <div className={cx('flex-wrap overflow-y-auto')}>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className={cx('mt-4 mb-10 grid grid-cols-2 gap-4')}>
              {/* Keluhan Pasien */}
              <div>
                <TextInput
                  name="patientComplain"
                  placeholder="Masukkan keluhan"
                  label="Keluhan Pasien"
                  size="sm"
                  register={register}
                  errorMessage={errors?.patientComplain?.toString()}
                  value={formDiagnose.patientComplain}
                  onInput={({target}) => handleSetFormDiagnose('patientComplain', target.value)}
                  disabled={isPostReservationDiagnosticLoading}
                  isValid
                />
              </div>
              {/* Diagnosa Awal */}
              <div>
                <TextInput
                  name="initialDiagnose"
                  placeholder="Masukkan diagnosa awal"
                  label="Diagnosa Awal Pasien"
                  size="sm"
                  register={register}
                  errorMessage={errors?.initialDiagnose?.message?.toString()}
                  value={formDiagnose.initialDiagnose}
                  onInput={({target}) => handleSetFormDiagnose('initialDiagnose', target.value)}
                  disabled={isPostReservationDiagnosticLoading}
                  isValid
                />
              </div>
              {/* Suhu Tubuh */}
              <div>
                <TextInput
                  name="bodyTemperature"
                  placeholder="Masukkan suhu tubuh"
                  label="Suhu Tubuh"
                  size="sm"
                  register={register}
                  errorMessage={errors?.bodyTemperature?.toString()}
                  value={formDiagnose.bodyTemperature}
                  rightIcon={CelciusIcon}
                  onInput={({target}) => handleSetFormDiagnose('bodyTemperature', target.value)}
                  disabled={isPostReservationDiagnosticLoading}
                  isValid
                />
              </div>
              {/* Tekanan Darah */}
              <div>
                <TextInput
                  name="bloodPressure"
                  placeholder="Masukkan tekanan darah"
                  label="Tekanan Darah"
                  size="sm"
                  register={register}
                  errorMessage={errors?.bloodPressure?.toString()}
                  value={formDiagnose.bloodPressure}
                  rightIcon={BloodPressureIcon}
                  iconRightStyle={'w-12 h-4'}
                  onInput={({target}) => handleSetFormDiagnose('bloodPressure', target.value)}
                  disabled={isPostReservationDiagnosticLoading}
                  isValid
                />
              </div>
              {/* Berat Badan */}
              <div>
                <TextInput
                  name="patientWeight"
                  placeholder="Masukkan berat badan"
                  label="Berat Badan"
                  size="sm"
                  register={register}
                  errorMessage={errors?.patientWeight?.toString()}
                  value={formDiagnose.patientWeight}
                  rightIcon={KilogramIcon}
                  onInput={({target}) => handleSetFormDiagnose('patientWeight', target.value)}
                  disabled={isPostReservationDiagnosticLoading}
                  isValid
                />
              </div>
              {/* Tinggi Badan */}
              <div>
                <TextInput
                  name="patientHeight"
                  placeholder="Masukkan tinggi badan"
                  label="Tinggi Badan"
                  size="sm"
                  register={register}
                  errorMessage={errors?.patientHeight?.toString()}
                  value={formDiagnose.patientHeight}
                  rightIcon={CentimeterIcon}
                  iconRightStyle={'w-7'}
                  onInput={({target}) => handleSetFormDiagnose('patientHeight', target.value)}
                  disabled={isPostReservationDiagnosticLoading}
                  isValid
                />
              </div>
              {/* Subject */}
              <div>
                <TextInput
                  name="subject"
                  placeholder="Masukkan subject"
                  label="Subject"
                  size="sm"
                  type='textarea'
                  register={register}
                  errorMessage={errors?.subject?.toString()}
                  value={formDiagnose.subject}
                  rows={4}
                  onInput={({target}) => handleSetFormDiagnose('subject', target.value)}
                  disabled={isPostReservationDiagnosticLoading}
                  isValid
                  required
                />
              </div>
              {/* Object */}
              <div>
                <TextInput
                  name="object"
                  placeholder="Masukkan object"
                  label="Object"
                  size="sm"
                  type='textarea'
                  register={register}
                  errorMessage={errors?.object?.toString()}
                  value={formDiagnose.object}
                  rows={4}
                  onInput={({target}) => handleSetFormDiagnose('object', target.value)}
                  disabled={isPostReservationDiagnosticLoading}
                  isValid
                  required
                />
              </div>
            </div>
            <div className={cx('flex items-center gap-x-4 mt-8')}>
              <Button
                size="md"
                class="outline"
                onClick={() => {
                  setModal();
                  handleClearFormDiagnose();
                }}
                customClassName="w-full"
                text={'Batal'}
              />
              <Button
                size="md"
                class="primary"
                onClick={handleSubmit((value) => {
                  handlePostReservationDiagnostic(parseInt(id), detailUser?.provider_id, value);
                })}
                customClassName="w-full"
                text={(data.id && data.id !== 0) ? 'Edit' : 'Tambah'}
                disabled={isPostReservationDiagnosticLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

DoctorDiagnoseModal.propTypes = {
  open: bool,
  setModal: func,
  data: object,
  id: string,
};

export default DoctorDiagnoseModal;
