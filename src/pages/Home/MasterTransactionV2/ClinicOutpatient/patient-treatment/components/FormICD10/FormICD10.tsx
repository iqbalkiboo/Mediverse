import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { AsyncSelect, Button, SelectBox, Typography } from '@/src/components';
import { AddCircleIcon, TrashBigIcon } from '@/assets/images/svg';
import usePatientTreatment from '../../usePatientTreatment';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

import type { Control, FieldErrors } from 'react-hook-form';

interface FormICD10Props {
  errors: FieldErrors;
  control: Control;
  onAddAssessment: () => void;
  onRemoveAssessment: (index: number) => void;
}

const FormICD10: React.FC<FormICD10Props> = ({
  errors,
  control,
  onAddAssessment,
  onRemoveAssessment,
}) => {
  const {
    data: { listSelectIcd10 },
    method: { handleGetListIcd10, handleSearchListIcd10 },
  } = useTransaction();
  const {
    data: {
      dataClinicOutpatient,
      formSoap,
      caseTypeOptions,
      caseCategoryOptions,
    },
    method: { handleGetAssessmentHistory, handleSetAssessmentItem },
  } = usePatientTreatment();

  useEffect(() => {
    handleGetListIcd10();
  }, []);

  useEffect(() => {
    if (formSoap?.assessment?.length < 1) onAddAssessment();
  }, [formSoap?.assessment]);

  const handleSetAssessment = async (index, item) => {
    handleSetAssessmentItem(index, 'assessment', item);
    handleSetAssessmentItem(
      index,
      'case_category',
      caseCategoryOptions[0].value
    );
    handleSetAssessmentItem(index, 'user_type', 'doctor');
    await handleGetAssessmentHistory(
      index,
      dataClinicOutpatient.patient_detail?.name,
      item.name
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <Typography variant='bodySmall' color=''>
            ICD 10
            <span className='text-danger'>*</span>
          </Typography>
        </div>
        <div>
          <Typography variant='bodySmall' color=''>
            Kasus
            <span className='text-danger'>*</span>
          </Typography>
        </div>
      </div>
      {formSoap?.assessment?.map((data, index) => (
        <div key={index} className='grid grid-cols-3 gap-4'>
          <div className='col-span-2'>
            <Controller
              name={`assessment[${index}].assessment`}
              control={control}
              defaultValue={listSelectIcd10?.find(
                (item) => item.value.name === data?.assessment?.name
              )}
              render={({ field: { onChange, name } }) => (
                <AsyncSelect
                  id={name}
                  name={name}
                  placeholder='Cari...'
                  options={listSelectIcd10}
                  loadOptions={handleSearchListIcd10}
                  defaultValue={listSelectIcd10?.find(
                    (item) => item.value.name === data?.assessment?.name
                  )}
                  isValid={
                    errors.assessment
                      ? !errors.assessment[index]?.assessment?.message
                      : true
                  }
                  errorMessage={
                    errors.assessment
                      ? errors.assessment[
                          index
                        ]?.assessment?.message?.toString()
                      : ''
                  }
                  onChange={(item) => {
                    onChange(item);
                    handleSetAssessment(index, item.value);
                  }}
                  required
                />
              )}
            />
          </div>
          <div className='flex gap-4'>
            <div className='w-full'>
              <Controller
                name={`assessment[${index}].case_type`}
                control={control}
                render={({ field: { onChange, name } }) => (
                  <SelectBox
                    id={name}
                    name={name}
                    placeholder=''
                    options={caseTypeOptions}
                    value={caseTypeOptions?.find(
                      (item) =>
                        item.value === formSoap.assessment[index]?.case_type
                    )}
                    errorMessage={
                      errors.assessment
                        ? errors.assessment[
                            index
                          ]?.case_type?.message?.toString()
                        : ''
                    }
                    onChange={({ value }) => {
                      onChange(value);
                      handleSetAssessmentItem(index, 'case_type', value);
                    }}
                    isDisabled={!formSoap.assessment[index].assessment.name}
                  />
                )}
              />
            </div>
            <div className='w-full'>
              <Controller
                name={`assessment[${index}].case_category`}
                control={control}
                render={({ field: { onChange, name } }) => (
                  <SelectBox
                    id={name}
                    name={name}
                    placeholder=''
                    options={caseCategoryOptions}
                    value={caseCategoryOptions?.find(
                      (item) =>
                        item.value === formSoap.assessment[index]?.case_category
                    )}
                    errorMessage={
                      errors.assessment
                        ? errors.assessment[
                            index
                          ]?.case_category?.message?.toString()
                        : ''
                    }
                    onChange={({ value }) => {
                      onChange(value);
                      handleSetAssessmentItem(index, 'case_category', value);
                    }}
                    isDisabled={!formSoap.assessment[index].assessment.name}
                  />
                )}
              />
            </div>
            <div className='w-1/3'>
              {index === 0 ? (
                <Button
                  class='button'
                  text=''
                  customClassIcon='!mr-0'
                  iconButton={() => <AddCircleIcon color='#0A0A0A' />}
                  onClick={onAddAssessment}
                />
              ) : (
                <Button
                  class='button'
                  text=''
                  customClassIcon='!mr-0'
                  iconButton={() => <TrashBigIcon color='#0A0A0A' />}
                  onClick={() => onRemoveAssessment(index)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormICD10;
