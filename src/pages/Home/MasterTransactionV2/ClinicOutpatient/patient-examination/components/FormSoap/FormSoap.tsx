import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';

import {
  AsyncSelect,
  Button,
  Card,
  TextInput,
  Typography,
} from '@/src/components';
import { ModalError, ModalSuccess } from '@/src/commons';
import { SuccessIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import usePatientExamination from '../../usePatientExamination';

const FormSoap = () => {
  const navigate = useNavigate();

  const {
    data: {
      id,
      dataClinicOutpatientDetail,
      formCheckup,
      listSelectAssessment,
      errorsFormSoap,
      controlFormSoap,
      isValidFormSoap,
    },
    method: {
      handleGetListAssessment,
      handleSearchListAssessment,
      handleSetFormCheckup,
      handleSetModal,
      handleSubmitFormCheckup,
      registerFormSoap,
      setValueFormSoap,
      handleSubmitFormSoap,
    },
  } = usePatientExamination();

  useEffect(() => {
    handleGetListAssessment();
  }, []);

  useEffect(() => {
    const nursesNote = `- Kolaborasi dengan Dokter`;
    handleSetFormCheckup('soap', 'nurses_note', nursesNote);
    setValueFormSoap('nurses_note', nursesNote);
  }, [dataClinicOutpatientDetail?.sales_order_detail?.items]);

  return (
    <>
      <ModalSuccess
        isOpen={formCheckup.isSuccess}
        title='Sukses!'
        description='Berhasil melakukan pemeriksaan pasien'
        onCancel={() => {
          handleSetModal('isSuccess', false);
          navigate(
            `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT}?tab=Menunggu Tindakan`
          );
        }}
      />
      <ModalError
        isOpen={formCheckup.isError}
        title='Gagal'
        description={formCheckup.errorMessage}
        onCancel={() => handleSetModal('isError', false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Typography variant='h5' color='' customClass='mb-2'>
              SUBJECTIVE<span className='text-danger'>*</span>
            </Typography>
            <Card
              background='bg-grayLight'
              padding='p-2'
              customClassName='border-1'
            >
              <div className='flex flex-col gap-3 mb-2'>
                <TextInput
                  type='textarea'
                  rows={10}
                  id='description'
                  name='description'
                  label='Keluhan Pasien'
                  value={formCheckup.soap.description ?? ''}
                  register={registerFormSoap}
                  isValid={!errorsFormSoap.description?.message?.toString()}
                  errorMessage={errorsFormSoap.description?.message?.toString()}
                  onInput={({ target }) =>
                    handleSetFormCheckup('soap', 'description', target.value)
                  }
                />
                <TextInput
                  type='textarea'
                  rows={1}
                  id='psychosocial_spiritual'
                  name='psychosocial_spiritual'
                  label='Psikososial-Spritual'
                  value={formCheckup.soap.psychosocial_spiritual ?? ''}
                  register={registerFormSoap}
                  isValid={
                    !errorsFormSoap.psychosocial_spiritual?.message?.toString()
                  }
                  errorMessage={errorsFormSoap.psychosocial_spiritual?.message?.toString()}
                  onInput={({ target }) =>
                    handleSetFormCheckup(
                      'soap',
                      'psychosocial_spiritual',
                      target.value
                    )
                  }
                />
                <TextInput
                  type='textarea'
                  rows={1}
                  id='patient_health_history'
                  name='patient_health_history'
                  label='Riwayat Kesehatan Pasien'
                  value={formCheckup.soap.patient_health_history ?? ''}
                  register={registerFormSoap}
                  isValid={
                    !errorsFormSoap.patient_health_history?.message?.toString()
                  }
                  errorMessage={errorsFormSoap.patient_health_history?.message?.toString()}
                  onInput={({ target }) =>
                    handleSetFormCheckup(
                      'soap',
                      'patient_health_history',
                      target.value
                    )
                  }
                />
                <TextInput
                  type='textarea'
                  rows={1}
                  id='family_health_history'
                  name='family_health_history'
                  label='Riwayat Kesehatan Keluarga'
                  value={formCheckup.soap.family_health_history ?? ''}
                  register={registerFormSoap}
                  isValid={
                    !errorsFormSoap.family_health_history?.message?.toString()
                  }
                  errorMessage={errorsFormSoap.family_health_history?.message?.toString()}
                  onInput={({ target }) =>
                    handleSetFormCheckup(
                      'soap',
                      'family_health_history',
                      target.value
                    )
                  }
                />
                <TextInput
                  type='textarea'
                  rows={1}
                  id='medication_history'
                  name='medication_history'
                  label='Riwayat Penggunaan Obat'
                  value={formCheckup.soap.medication_history ?? ''}
                  register={registerFormSoap}
                  isValid={
                    !errorsFormSoap.medication_history?.message?.toString()
                  }
                  errorMessage={errorsFormSoap.medication_history?.message?.toString()}
                  onInput={({ target }) =>
                    handleSetFormCheckup(
                      'soap',
                      'medication_history',
                      target.value
                    )
                  }
                />
              </div>
            </Card>
          </div>
          <div>
            <div>
              <Typography variant='h5' color='' customClass='mb-2'>
                OBJECTIVE
                <span className='text-danger'>*</span>
              </Typography>
              <Card
                background='bg-grayLight'
                padding='p-2'
                customClassName='border-1'
              >
                <div className='grid grid-cols-3 gap-4'>
                  <TextInput
                    type='number'
                    id='temperature'
                    name='objective.temperature'
                    label='Suhu Tubuh'
                    trailingText='&deg;C'
                    value={formCheckup.objective.temperature ?? ''}
                    disabled
                  />
                </div>
                <div className='grid grid-cols-3 gap-4 mt-3'>
                  <TextInput
                    type='number'
                    id='height'
                    name='objective.height'
                    label='Tinggi Badan'
                    trailingText='Cm'
                    value={formCheckup.objective.height ?? ''}
                    disabled
                  />
                  <TextInput
                    type='number'
                    id='weight'
                    name='objective.weight'
                    label='Berat Badan'
                    trailingText='Kg'
                    value={formCheckup.objective.weight ?? ''}
                    disabled
                  />
                </div>
                <div className='grid grid-cols-3 gap-4 mt-3'>
                  <div className='col-span-1'>
                    <TextInput
                      type='number'
                      id='bmi'
                      name='objective.bmi'
                      label='BMI'
                      value={formCheckup.objective.bmi ?? ''}
                      disabled
                    />
                  </div>
                  <div className='col-span-2'>
                    <TextInput
                      id='bmi_result'
                      name='objective.bmi_result'
                      label='Kategori BMI'
                      value={formCheckup.objective.bmi_result ?? ''}
                      disabled
                    />
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-4 mt-3'>
                  <TextInput
                    type='number'
                    id='systolic'
                    name='objective.systolic'
                    label='Sistol'
                    trailingText='mmHg'
                    value={formCheckup.objective.systolic ?? ''}
                    disabled
                  />
                  <TextInput
                    type='number'
                    id='diastolic'
                    name='objective.diastolic'
                    label='Diastol'
                    trailingText='mmHg'
                    value={formCheckup.objective.diastolic ?? ''}
                    disabled
                  />
                </div>
                <div className='grid grid-cols-3 gap-4 mt-3'>
                  <TextInput
                    type='number'
                    id='respiration_rate'
                    name='objective.respiration_rate'
                    label='Pernapasan'
                    trailingText='x/Menit'
                    value={formCheckup.objective.respiration_rate ?? ''}
                    disabled
                  />
                  <TextInput
                    type='number'
                    id='pulse_rate'
                    name='objective.pulse_rate'
                    label='Nadi'
                    trailingText='x/Menit'
                    value={formCheckup.objective.pulse_rate ?? ''}
                    disabled
                  />
                  <TextInput
                    type='number'
                    id='heart_rate'
                    name='objective.heart_rate'
                    label='Detak Jantung'
                    trailingText='x/Menit'
                    value={formCheckup.objective.heart_rate ?? ''}
                    disabled
                  />
                </div>
                <div className='w-full flex flex-col gap-2 mt-2'>
                  <TextInput
                    type='multi'
                    id='allergy'
                    label='Riwayat Alergi'
                    containerStyle='h-auto min-h-[41px] p-2'
                    customClassBadge='rounded-md border-grayNeutral'
                    customTextBadge='text-base'
                    defaultValue={
                      dataClinicOutpatientDetail?.patient_detail?.allergies?.split(
                        ','
                      ) || []
                    }
                    value={
                      dataClinicOutpatientDetail?.patient_detail?.allergies?.split(
                        ','
                      ) || []
                    }
                    getValueMulti={() => {}}
                    disabled
                  />
                  <TextInput
                    type='textarea'
                    rows={3}
                    id='description'
                    name='objective.allergy_history'
                    label=''
                    value={formCheckup.objective.allergy_history ?? ''}
                    disabled
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Typography variant='h5' color='' customClass='mb-2'>
              ASSESSMENT<span className='text-danger'>*</span>
            </Typography>
            <Controller
              name='assessment'
              control={controlFormSoap}
              defaultValue={formCheckup?.soap?.assessment}
              render={({ field: { onChange, name } }) => (
                <AsyncSelect
                  name={name}
                  label=''
                  options={listSelectAssessment}
                  placeholder='Cari dan pilih...'
                  defaultValue={formCheckup?.soap?.assessment}
                  loadOptions={handleSearchListAssessment}
                  onChange={(value: any[]) => {
                    const mapTitle = value.map((item) => item.title);
                    const mapValue = value.map((item) => item.value);
                    onChange(mapTitle);
                    handleSetFormCheckup('soap', 'assessment', mapValue);
                  }}
                  errorMessage={errorsFormSoap.assessment?.message?.toString()}
                  isMulti
                  required
                />
              )}
            />
          </div>

          <div>
            <Typography variant='h5' color='' customClass='mb-2'>
              PLANNING<span className='text-danger'>*</span>
            </Typography>
            <TextInput
              type='textarea'
              rows={4}
              id='nurses_note'
              name='nurses_note'
              value={formCheckup.soap.nurses_note ?? ''}
              register={registerFormSoap}
              isValid={!errorsFormSoap.nurses_note?.message?.toString()}
              errorMessage={errorsFormSoap.nurses_note?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup('soap', 'nurses_note', target.value)
              }
              required
            />
          </div>
        </div>

        <div className='flex gap-2 justify-between mt-6'>
          <div className='w-1/3'>
            <Button
              text='Kembali'
              size='md'
              class='outline'
              customClassName='!rounded-md'
              onClick={() =>
                navigate(
                  `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_EXAMINATION}/${id}/?tab=assessment`
                )
              }
            />
          </div>
          <div className='w-1/3'>
            <Button
              text='Pemeriksaan Selesai'
              size='md'
              customClassName='!rounded-md'
              iconButton={() => <SuccessIcon color='#FFFFFF' />}
              disabled={!isValidFormSoap}
              loading={formCheckup.isLoading}
              onClick={handleSubmitFormSoap(handleSubmitFormCheckup)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSoap;
