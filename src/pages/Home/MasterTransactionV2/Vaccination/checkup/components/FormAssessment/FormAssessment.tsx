import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, TextInput } from '@/src/components';
import { ModalError } from '@/src/commons';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useVaccinationCheckup from '../../useVaccinationCheckup';

const FormAssessment = () => {
  const navigate = useNavigate();

  const {
    data: { id, dataVaccinationDetail, formCheckup, errors, isValid },
    method: {
      handleSetFormCheckup,
      handleSetModal,
      calculateBmi,
      register,
      handleSubmit,
    },
  } = useVaccinationCheckup();

  useEffect(() => {
    calculateBmi();
  }, [formCheckup.objective?.height, formCheckup.objective?.weight]);

  return (
    <>
      <ModalError
        isOpen={formCheckup.isError}
        title='Gagal'
        description={formCheckup.errorMessage}
        onCancel={() => handleSetModal('isError', false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='w-3/4 px-4'>
          <div className='grid grid-cols-3 gap-4'>
            <TextInput
              type='number'
              id='temperature'
              name='temperature'
              label='Suhu Tubuh'
              placeholder='0'
              trailingText='&deg;C'
              value={formCheckup.objective?.temperature ?? ''}
              register={register}
              isValid={!errors.temperature?.message?.toString()}
              errorMessage={errors.temperature?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'temperature',
                  target.value ? Number(target.value) : target.value
                )
              }
              required
            />
          </div>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            <TextInput
              type='number'
              id='height'
              name='height'
              label='Tinggi Badan'
              placeholder='0'
              trailingText='Cm'
              value={formCheckup.objective?.height ?? ''}
              register={register}
              isValid={!errors.height?.message?.toString()}
              errorMessage={errors.height?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'height',
                  target.value ? Number(target.value) : target.value
                )
              }
              required
            />
            <TextInput
              type='number'
              id='weight'
              name='weight'
              label='Berat Badan'
              placeholder='0'
              trailingText='Kg'
              value={formCheckup.objective?.weight ?? ''}
              register={register}
              isValid={!errors.weight?.message?.toString()}
              errorMessage={errors.weight?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'weight',
                  target.value ? Number(target.value) : target.value
                )
              }
              required
            />
          </div>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            <div className='col-span-1'>
              <TextInput
                type='number'
                id='bmi'
                name='bmi'
                label='BMI'
                placeholder='-'
                value={formCheckup.objective?.bmi ?? ''}
                disabled
              />
            </div>
            <div className='col-span-2'>
              <TextInput
                id='bmi_result'
                name='bmi_result'
                label='Kategori BMI'
                placeholder='-'
                value={formCheckup.objective?.bmi_result ?? ''}
                disabled
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            <TextInput
              type='number'
              id='systolic'
              name='systolic'
              label='Sistol'
              placeholder='0'
              trailingText='mmHg'
              value={formCheckup.objective?.systolic ?? ''}
              register={register}
              isValid={!errors.systolic?.message?.toString()}
              errorMessage={errors.systolic?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'systolic',
                  target.value ? Number(target.value) : target.value
                )
              }
              required
            />
            <TextInput
              type='number'
              id='diastolic'
              name='diastolic'
              label='Diastol'
              placeholder='0'
              trailingText='mmHg'
              value={formCheckup.objective?.diastolic ?? ''}
              register={register}
              isValid={!errors.diastolic?.message?.toString()}
              errorMessage={errors.diastolic?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'diastolic',
                  target.value ? Number(target.value) : target.value
                )
              }
              required
            />
          </div>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            <TextInput
              type='number'
              id='respiration_rate'
              name='respiration_rate'
              label='Pernapasan'
              placeholder='0'
              trailingText='x/Menit'
              value={formCheckup.objective?.respiration_rate ?? ''}
              register={register}
              isValid={!errors.respiration_rate?.message?.toString()}
              errorMessage={errors.respiration_rate?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'respiration_rate',
                  target.value ? Number(target.value) : target.value
                )
              }
              required
            />
            <TextInput
              type='number'
              id='pulse_rate'
              name='pulse_rate'
              label='Nadi'
              placeholder='0'
              trailingText='x/Menit'
              value={formCheckup.objective?.pulse_rate ?? ''}
              register={register}
              isValid={!errors.pulse_rate?.message?.toString()}
              errorMessage={errors.pulse_rate?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'pulse_rate',
                  target.value ? Number(target.value) : target.value
                )
              }
              required
            />
            <TextInput
              type='number'
              id='heart_rate'
              name='heart_rate'
              label='Detak Jantung'
              placeholder='0'
              trailingText='x/Menit'
              value={formCheckup.objective?.heart_rate ?? ''}
              register={register}
              isValid={!errors.heart_rate?.message?.toString()}
              errorMessage={errors.heart_rate?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'heart_rate',
                  target.value ? Number(target.value) : target.value
                )
              }
              required
            />
          </div>
          <div className='flex flex-col gap-2 mt-2'>
            <TextInput
              type='multi'
              id='allergy'
              label='Riwayat Alergi'
              containerStyle='h-auto min-h-[41px] p-2'
              customClassBadge='rounded-md border-grayNeutral'
              customTextBadge='text-base'
              defaultValue={
                dataVaccinationDetail?.patient_detail?.allergies?.split(',') ||
                []
              }
              value={
                dataVaccinationDetail?.patient_detail?.allergies?.split(',') ||
                []
              }
              getValueMulti={() => {}}
              disabled
            />
            <TextInput
              type='textarea'
              rows={3}
              id='description'
              name='allergy_history'
              label=''
              value={formCheckup.objective?.allergy_history ?? ''}
              register={register}
              isValid={!errors.allergy_history?.message?.toString()}
              errorMessage={errors.allergy_history?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormCheckup(
                  'objective',
                  'allergy_history',
                  target.value
                )
              }
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
              onClick={() => navigate(`${ROUTES_TRANSACTION.VACCINATIONS}`)}
            />
          </div>
          <div className='w-1/3'>
            <Button
              text='Simpan & Selanjutnya'
              size='md'
              customClassName='!rounded-md'
              disabled={!isValid}
              loading={formCheckup.isLoading}
              onClick={handleSubmit(() =>
                navigate(
                  `${ROUTES_TRANSACTION.VACCINATION_CHECKUP}/${id}/?tab=soap`
                )
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAssessment;
