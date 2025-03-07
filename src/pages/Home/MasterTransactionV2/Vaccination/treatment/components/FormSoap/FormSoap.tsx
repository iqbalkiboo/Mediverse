import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  Checkbox,
  TextInput,
  Typography,
} from '@/src/components';
import { ModalError } from '@/src/commons';
import { AlertIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import FormICD10 from '../FormICD10';
import useVaccinationTreatment from '../../useVaccinationTreatment';

const FormSoap = () => {
  const navigate = useNavigate();

  const {
    data: { id, dataVaccinationDetail, formSoap, control, errors, isValid },
    method: {
      handleSetFormSoap,
      handleSubmitFormSoap,
      handleSetModal,
      handleSetAddAssessmentForm,
      handleSetRemoveAssessmentForm,
      calculateBmi,
      reset,
      register,
      handleSubmit,
      setValue,
    },
  } = useVaccinationTreatment();

  const [otherOption, setOtherOption] = useState(false);

  useEffect(() => {
    if (formSoap?.isEdit) {
      reset();
      const fields = ['assessment', 'objective', 'subjective', 'planning'];
      fields.forEach((field) => {
        setValue(field, formSoap[field]);
      });
    }
  }, [formSoap?.isEdit]);

  useEffect(() => {
    calculateBmi();
  }, [formSoap.objective.height, formSoap.objective.weight]);

  useEffect(() => {
    if (formSoap.isSuccess)
      navigate(
        `${ROUTES_TRANSACTION.VACCINATION_PROCEDURE}/${id}?tab=procedure`
      );
  }, [formSoap.isSuccess]);

  const getErrorField = (type: string, field: string) => {
    return errors[type] ? errors[type]?.[field]?.message : '';
  };

  return (
    <>
      <ModalError
        isOpen={formSoap.isError}
        title='Gagal'
        description={formSoap.errorMessage}
        onCancel={() => handleSetModal('isError', false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div>
          <Typography variant='h5' color='' customClass='mb-2'>
            SUBJECTIVE
            <span className='text-danger'>*</span>
          </Typography>
          <Card
            background='bg-grayLight'
            padding='p-3'
            customClassName='border-1'
          >
            <div className='flex flex-col gap-2'>
              <div className='w-full mb-1'>
                <TextInput
                  type='textarea'
                  rows={3}
                  id='subjective.description'
                  name='subjective.description'
                  label='Keluhan Pasien'
                  value={formSoap.subjective.description ?? ''}
                  register={register}
                  isValid={!getErrorField('subjective', 'description')}
                  errorMessage={getErrorField(
                    'subjective',
                    'description'
                  )?.toString()}
                  onInput={({ target }) =>
                    handleSetFormSoap('subjective', 'description', target.value)
                  }
                />
              </div>
              <div className='flex gap-4'>
                <TextInput
                  type='textarea'
                  rows={1}
                  id='psychosocial_spiritual'
                  name='subjective.psychosocial_spiritual'
                  label='Psikososial-Spritual'
                  value={formSoap.subjective.psychosocial_spiritual ?? ''}
                  register={register}
                  isValid={
                    !getErrorField('subjective', 'psychosocial_spiritual')
                  }
                  errorMessage={getErrorField(
                    'subjective',
                    'psychosocial_spiritual'
                  )?.toString()}
                  onInput={({ target }) =>
                    handleSetFormSoap(
                      'subjective',
                      'psychosocial_spiritual',
                      target.value
                    )
                  }
                />
                <TextInput
                  type='textarea'
                  rows={1}
                  id='patient_health_history'
                  name='subjective.patient_health_history'
                  label='Riwayat Kesehatan Pasien'
                  value={formSoap.subjective.patient_health_history ?? ''}
                  register={register}
                  isValid={
                    !getErrorField('subjective', 'patient_health_history')
                  }
                  errorMessage={getErrorField(
                    'subjective',
                    'patient_health_history'
                  )?.toString()}
                  onInput={({ target }) =>
                    handleSetFormSoap(
                      'subjective',
                      'patient_health_history',
                      target.value
                    )
                  }
                />
              </div>
              <div className='flex gap-4 mt-2'>
                <TextInput
                  type='textarea'
                  rows={1}
                  id='family_health_history'
                  name='subjective.family_health_history'
                  label='Riwayat Kesehatan Keluarga'
                  value={formSoap.subjective.family_health_history ?? ''}
                  register={register}
                  isValid={
                    !getErrorField('subjective', 'family_health_history')
                  }
                  errorMessage={getErrorField(
                    'subjective',
                    'family_health_history'
                  )?.toString()}
                  onInput={({ target }) =>
                    handleSetFormSoap(
                      'subjective',
                      'family_health_history',
                      target.value
                    )
                  }
                />
                <TextInput
                  type='textarea'
                  rows={1}
                  id='medication_history'
                  name='subjective.medication_history'
                  label='Riwayat Penggunaan Obat'
                  value={formSoap.subjective.medication_history ?? ''}
                  register={register}
                  isValid={!getErrorField('subjective', 'medication_history')}
                  errorMessage={getErrorField(
                    'subjective',
                    'medication_history'
                  )?.toString()}
                  onInput={({ target }) =>
                    handleSetFormSoap(
                      'subjective',
                      'medication_history',
                      target.value
                    )
                  }
                />
              </div>
              <div className='w-full flex flex-col gap-3 mt-2'>
                <TextInput
                  type='multi'
                  id='allergy'
                  label='Riwayat Alergi'
                  containerStyle='h-auto min-h-[41px] p-2'
                  customClassBadge='rounded-md border-grayNeutral'
                  customTextBadge='text-base'
                  defaultValue={
                    dataVaccinationDetail?.patient_detail?.allergies?.split(
                      ','
                    ) || []
                  }
                  value={
                    dataVaccinationDetail?.patient_detail?.allergies?.split(
                      ','
                    ) || []
                  }
                  getValueMulti={() => {}}
                  disabled
                />
                <TextInput
                  type='textarea'
                  rows={3}
                  id='allergy_history'
                  name='objective.allergy_history'
                  label=''
                  value={formSoap.objective.allergy_history ?? ''}
                  register={register}
                  isValid={!getErrorField('objective', 'allergy_history')}
                  errorMessage={getErrorField(
                    'objective',
                    'allergy_history'
                  )?.toString()}
                  onInput={({ target }) =>
                    handleSetFormSoap(
                      'objective',
                      'allergy_history',
                      target.value
                    )
                  }
                  disabled
                />
              </div>
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
              padding='p-3'
              customClassName='border-1'
            >
              <div className='w-3/4'>
                <div className='grid grid-cols-3 gap-4'>
                  <TextInput
                    type='number'
                    id='temperature'
                    name='objective.temperature'
                    label='Suhu Tubuh'
                    trailingText='&deg;C'
                    value={formSoap.objective.temperature ?? ''}
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
                    value={formSoap.objective.height ?? ''}
                    disabled
                  />
                  <TextInput
                    type='number'
                    id='weight'
                    name='objective.weight'
                    label='Berat Badan'
                    trailingText='Kg'
                    value={formSoap.objective.weight ?? ''}
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
                      value={formSoap.objective.bmi ?? ''}
                      disabled
                    />
                  </div>
                  <div className='col-span-2'>
                    <TextInput
                      id='bmi_result'
                      name='objective.bmi_result'
                      label='Kategori BMI'
                      value={formSoap.objective.bmi_result ?? ''}
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
                    value={formSoap.objective.systolic ?? ''}
                    disabled
                  />
                  <TextInput
                    type='number'
                    id='diastolic'
                    name='objective.diastolic'
                    label='Diastol'
                    trailingText='mmHg'
                    value={formSoap.objective.diastolic ?? ''}
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
                    value={formSoap.objective.respiration_rate ?? ''}
                    disabled
                  />
                  <TextInput
                    type='number'
                    id='pulse_rate'
                    name='objective.pulse_rate'
                    label='Nadi'
                    trailingText='x/Menit'
                    value={formSoap.objective.pulse_rate ?? ''}
                    disabled
                  />
                  <TextInput
                    type='number'
                    id='heart_rate'
                    name='objective.heart_rate'
                    label='Detak Jantung'
                    trailingText='x/Menit'
                    value={formSoap.objective.heart_rate ?? ''}
                    disabled
                  />
                </div>
                <div className='mt-3'>
                  <TextInput
                    type='textarea'
                    rows={3}
                    id='objective.description'
                    name='objective.description'
                    label='Catatan Dokter'
                    value={formSoap.objective.description ?? ''}
                    register={register}
                    isValid={!getErrorField('objective', 'description')}
                    errorMessage={getErrorField(
                      'objective',
                      'description'
                    )?.toString()}
                    onInput={({ target }) =>
                      handleSetFormSoap(
                        'objective',
                        'description',
                        target.value
                      )
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <Typography variant='h5' color='' customClass='mb-2'>
            ASSESSMENT
            <span className='text-danger'>*</span>
          </Typography>
          <Card
            background='bg-grayLight'
            padding='p-3'
            customClassName='border-1'
          >
            <FormICD10
              errors={errors}
              control={control}
              onAddAssessment={handleSetAddAssessmentForm}
              onRemoveAssessment={handleSetRemoveAssessmentForm}
            />
          </Card>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Typography variant='h5' color='' customClass='mb-2'>
              PLANNING
              <span className='text-danger'>*</span>
            </Typography>
            <div>
              <TextInput
                type='textarea'
                rows={9}
                id='planning.doctors_note'
                name='planning.doctors_note'
                label=''
                value={formSoap.planning.doctors_note ?? ''}
                register={register}
                isValid={!getErrorField('planning', 'doctors_note')}
                errorMessage={getErrorField(
                  'planning',
                  'doctors_note'
                )?.toString()}
                onInput={({ target }) =>
                  handleSetFormSoap('planning', 'doctors_note', target.value)
                }
                required
              />
            </div>
          </div>
          <div>
            <Typography variant='h5' color='' customClass='mb-2'>
              EDUKASI
              <span className='text-danger'>*</span>
            </Typography>
            <Card
              background='bg-grayLight'
              padding='p-3'
              customClassName='grid grid-cols-2 border-1'
            >
              <div className='flex flex-col gap-3'>
                <Checkbox
                  name='education.disease_explanation'
                  label='Penjelasan Penyakit'
                  register={register}
                  checked={formSoap.education.disease_explanation}
                  onClickCheckboxes={() => {
                    const value = formSoap.education.disease_explanation;
                    handleSetFormSoap(
                      'education',
                      'disease_explanation',
                      !value
                    );
                  }}
                />
                <Checkbox
                  name='education.examination_results'
                  label='Hasil Pemeriksaan'
                  register={register}
                  checked={formSoap.education.examination_results}
                  onClickCheckboxes={() => {
                    const value = formSoap.education.examination_results;
                    handleSetFormSoap(
                      'education',
                      'examination_results',
                      !value
                    );
                  }}
                />
                <Checkbox
                  name='education.medical_action'
                  label='Tindakan Medis'
                  register={register}
                  checked={formSoap.education.medical_action}
                  onClickCheckboxes={() => {
                    const value = formSoap.education.medical_action;
                    handleSetFormSoap('education', 'medical_action', !value);
                  }}
                />
              </div>
              <div className='flex flex-col gap-3 mb-1'>
                <Checkbox
                  name='education.complications'
                  label='Komplikasi'
                  register={register}
                  checked={formSoap.education.complications}
                  onClickCheckboxes={() => {
                    const value = formSoap.education.complications;
                    handleSetFormSoap('education', 'complications', !value);
                  }}
                />
                <Checkbox
                  name='education.side_effects_risks'
                  label='Efek Samping/Risiko Pengobatan'
                  register={register}
                  checked={formSoap.education.side_effects_risks}
                  onClickCheckboxes={() => {
                    const value = formSoap.education.side_effects_risks;
                    handleSetFormSoap(
                      'education',
                      'side_effects_risks',
                      !value
                    );
                  }}
                />
                <Checkbox
                  name='otherOption'
                  label='Lainnya'
                  checked={otherOption}
                  onChange={(value) => {
                    setOtherOption(value);
                    handleSetFormSoap('education', 'other_details', '');
                  }}
                />
                <TextInput
                  type='textarea'
                  rows={2}
                  id='other_details'
                  name='education.other_details'
                  value={formSoap.education.other_details ?? ''}
                  register={register}
                  isValid={!getErrorField('education', 'other_details')}
                  errorMessage={getErrorField(
                    'education',
                    'other_details'
                  )?.toString()}
                  onInput={({ target }) =>
                    handleSetFormSoap(
                      'education',
                      'other_details',
                      target.value
                    )
                  }
                  disabled={!otherOption}
                />
              </div>
              {errors.education && (
                <div className='flex items-center'>
                  <div className='w-5 h-5 mr-1 flex items-center'>
                    <AlertIcon color='#921919' />
                  </div>
                  <Typography variant='bodyXSmall' color='text-danger'>
                    Mohon periksa edukasi yang diperlukan
                  </Typography>
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className='flex gap-2 justify-between mt-6'>
          <div className='w-1/3'>
            <Button
              text='Kembali'
              size='md'
              class='outline'
              customClassName='!rounded-md'
              onClick={() => navigate(`${ROUTES_TRANSACTION.VACCINATIONS}`)}
            />
          </div>
          <div className='w-1/3'>
            <Button
              text='Simpan & Selanjutnya'
              size='md'
              customClassName='!rounded-md'
              disabled={!isValid}
              loading={formSoap.isLoading}
              onClick={handleSubmit(handleSubmitFormSoap)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSoap;
