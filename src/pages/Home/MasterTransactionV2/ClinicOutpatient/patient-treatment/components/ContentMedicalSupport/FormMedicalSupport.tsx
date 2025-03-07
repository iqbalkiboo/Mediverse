import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';

import {
  AsyncSelect,
  Button,
  Card,
  RadioButton,
  SelectBox,
  Typography,
} from '@/src/components';
import { ModalError } from '@/src/commons';
import { ButtonPlus, DeleteTrashIcon, SuccessIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import usePatientTreatment from '../../usePatientTreatment';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

const hasMedicalSupportOptions = [
  {
    label: 'Ya',
    value: 'yes',
  },
  {
    label: 'Tidak',
    value: 'no',
  },
];

const quantityOptions = Array.from(Array(5), (_, i) => ({
  label: (i + 1).toString(),
  value: i + 1,
}));

const FormMedicalSupport = () => {
  const navigate = useNavigate();

  const {
    data: { listSelectLaboratory },
    method: { handleGetListLaboratory, handleSearchListLaboratory },
  } = useTransaction();
  const {
    data: {
      id,
      formMedicalSupport,
      controlMedicalSupport,
      errorsMedicalSupport,
      isValidMedicalSupport,
    },
    method: {
      handleSetAddMedicalSupportForm,
      handleSetRemoveMedicalSupportForm,
      handleSetMedicalSupportItem,
      handleSetModalDrugRecipe,
      handleSetModalMedicalSupport,
      handleSubmitFormMedicalSupport,
      handleSubmitMedicalSupport,
      setValueMedicalSupport,
    },
  } = usePatientTreatment();

  useEffect(() => {
    handleSetModalDrugRecipe('isSuccess', false);
    handleGetListLaboratory();
  }, []);

  useEffect(() => {
    if (formMedicalSupport?.medicalSupport?.length < 1)
      handleSetAddMedicalSupportForm();
    setValueMedicalSupport(
      'medicalSupport',
      formMedicalSupport?.medicalSupport
    );
  }, [formMedicalSupport.medicalSupport]);

  useEffect(() => {
    if (formMedicalSupport?.hasMedicalSupport)
      setValueMedicalSupport(
        'hasMedicalSupport',
        formMedicalSupport?.hasMedicalSupport
      );
  }, [formMedicalSupport.hasMedicalSupport]);

  useEffect(() => {
    if (formMedicalSupport.isSuccess)
      navigate(
        `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=recommendation`
      );
  }, [formMedicalSupport.isSuccess]);

  return (
    <>
      <ModalError
        isOpen={formMedicalSupport.isError}
        title='Gagal'
        description={formMedicalSupport.errorMessage}
        onCancel={() => handleSetModalMedicalSupport('isError', false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='gap-4'>
          <Typography variant='h4' color='' customClass='mb-2'>
            PENUNJANG MEDIS
          </Typography>
          <Card padding='p-3' customClassName='border-1 pb-4'>
            <div className='flex'>
              <div className='flex-1'>
                <Typography variant='h3' color=''>
                  Daftar Penunjang Medis
                </Typography>
              </div>
              <div className='flex gap-6 mr-4'>
                <Controller
                  name='hasMedicalSupport'
                  control={controlMedicalSupport}
                  render={({ field: { onChange, name } }) => (
                    <>
                      {hasMedicalSupportOptions.map((item) => (
                        <RadioButton
                          key={item.label}
                          id={item.value}
                          name={name}
                          containerClass='w-full hover:cursor-pointer'
                          label={item.label}
                          value={item.value}
                          htmlFor={item.value}
                          checked={
                            item.value === formMedicalSupport.hasMedicalSupport
                          }
                          onClick={() => {
                            handleSetModalMedicalSupport(
                              'hasMedicalSupport',
                              item.value
                            );
                            onChange(item.value);
                          }}
                          onChange={({ target }) => {
                            handleSetModalMedicalSupport(
                              'hasMedicalSupport',
                              target.value
                            );
                            onChange(target.value);
                          }}
                        />
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
            {formMedicalSupport.hasMedicalSupport === 'yes' && (
              <div className='mt-4'>
                {formMedicalSupport?.medicalSupport?.map((_, index) => (
                  <div key={index} className='flex flex-col gap-4'>
                    {index > 0 && (
                      <div className='mt-5'>
                        <hr
                          className='bg-grayDarkBg'
                          style={{ height: '2px' }}
                        />
                      </div>
                    )}
                    <div className='flex gap-4'>
                      <div className='flex-1'>
                        <Controller
                          name={`medicalSupport.${index}.medicalSupport`}
                          control={controlMedicalSupport}
                          defaultValue={
                            formMedicalSupport.medicalSupport[index]
                              ?.medicalSupport
                              ? {
                                  title:
                                    formMedicalSupport.medicalSupport[index]
                                      ?.medicalSupport?.item_name,
                                  value:
                                    formMedicalSupport.medicalSupport[index]
                                      ?.medicalSupport,
                                }
                              : ''
                          }
                          render={({ field: { onChange, name } }) => (
                            <AsyncSelect
                              id={name}
                              name={name}
                              label={`Pemeriksaan Laboratorium ${index + 1}`}
                              placeholder='Pilih tindakan'
                              options={listSelectLaboratory}
                              loadOptions={handleSearchListLaboratory}
                              defaultValue={
                                formMedicalSupport.medicalSupport[index]
                                  ?.medicalSupport
                                  ? {
                                      title:
                                        formMedicalSupport.medicalSupport[index]
                                          ?.medicalSupport?.item_name,
                                      value:
                                        formMedicalSupport.medicalSupport[index]
                                          ?.medicalSupport,
                                    }
                                  : ''
                              }
                              isValid={
                                errorsMedicalSupport.medicalSupport
                                  ? !errorsMedicalSupport.medicalSupport[index]
                                      ?.medicalSupport?.message
                                  : true
                              }
                              errorMessage={
                                errorsMedicalSupport.medicalSupport
                                  ? errorsMedicalSupport.medicalSupport[
                                      index
                                    ]?.medicalSupport?.message?.toString()
                                  : ''
                              }
                              onChange={(item) => {
                                onChange(item);
                                handleSetMedicalSupportItem(
                                  index,
                                  'medicalSupport',
                                  item.value
                                );
                              }}
                              height='44px'
                              required
                            />
                          )}
                        />
                      </div>
                      <div className='w-40 mb-0 mt-auto'>
                        <Controller
                          name={`medicalSupport.${index}.qty`}
                          control={controlMedicalSupport}
                          render={({ field: { onChange, name, ref } }) => (
                            <SelectBox
                              inputRef={ref}
                              name={name}
                              id='quantity'
                              label='Jumlah'
                              options={quantityOptions}
                              value={quantityOptions?.filter(
                                (item) =>
                                  item.value ===
                                  formMedicalSupport.medicalSupport[index]?.qty
                              )}
                              errorMessage={
                                errorsMedicalSupport.qty
                                  ? errorsMedicalSupport.qty[
                                      index
                                    ]?.qty?.message?.toString()
                                  : ''
                              }
                              onChange={({ value }) => {
                                onChange(value);
                                handleSetMedicalSupportItem(
                                  index,
                                  'qty',
                                  value
                                );
                              }}
                              isSearchable={false}
                              required
                            />
                          )}
                        />
                      </div>
                      <div className='mb-0 mt-auto'>
                        {index === 0 ? (
                          <Button
                            size='md'
                            class='outline'
                            customClassName='!h-11 !rounded-md'
                            iconButton={() => <ButtonPlus color='#0A0A0A' />}
                            onClick={handleSetAddMedicalSupportForm}
                          />
                        ) : (
                          <Button
                            size='md'
                            class='outline'
                            customClassName='!h-11 !rounded-md'
                            iconButton={() => (
                              <DeleteTrashIcon color='#0A0A0A' />
                            )}
                            onClick={handleSetRemoveMedicalSupportForm}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
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
                  `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=recipe`
                )
              }
            />
          </div>
          <div className='w-1/3'>
            <Button
              text='Simpan & Selanjutnya  '
              size='md'
              customClassName='!rounded-md'
              iconButton={() => (
                <SuccessIcon
                  color={!isValidMedicalSupport ? '#757575' : '#FFFFFF'}
                />
              )}
              disabled={!isValidMedicalSupport}
              loading={formMedicalSupport.isLoading}
              onClick={handleSubmitMedicalSupport(
                handleSubmitFormMedicalSupport
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormMedicalSupport;
