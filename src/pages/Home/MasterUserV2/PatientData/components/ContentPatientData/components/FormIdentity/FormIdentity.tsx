import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  Button,
  DatePicker,
  RadioButton,
  SelectBox,
  TextInput,
  Typography,
} from '@/src/components';
import { ButtonPlus, TrashBigIcon } from '@/assets/images/svg';
import { getPatientIdentifier } from '@/client/patient';
import useAddPatient from '../ModalAddPatient/useAddPatient';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

interface FormIdentityProps {
  insuranceState: any[];
  onCancel: () => void;
  onSubmit: (insuranceData: any) => void;
}

const initialInsuranceData = {
  payor: '',
  no_identifier: '',
};

const FormIdentity: React.FC<FormIdentityProps> = ({
  insuranceState,
  onCancel,
  onSubmit,
}) => {
  const [validId, setValidId] = useState(true);
  const [insuranceData, setInsuranceData] = useState([initialInsuranceData]);
  const [insuranceOptions, setInsuranceOptions] = useState([]);

  const {
    data: { modulePayor },
    method: { handleGetListPayor },
  } = useTransaction();
  const {
    data: {
      maritalOptions,
      formPatientData,
      errorsIdentity,
      controlIdentity,
      isValidIdentity,
    },
    method: {
      handleSetFormPatient,
      handleSubmitIdentity,
      registerIdentity,
      resetIdentity,
      setErrorIdentity,
      clearErrorsIdentity,
    },
  } = useAddPatient();

  useEffect(() => {
    resetIdentity(formPatientData);
    handleGetListPayor();
  }, []);

  useEffect(() => {
    if (modulePayor.data && modulePayor.data.length > 0) {
      const dataOptions = modulePayor.data?.map((item) => {
        return {
          label: item?.payor_name,
          value: item,
        };
      });
      setInsuranceOptions(dataOptions);
    }
  }, [modulePayor]);

  useEffect(() => {
    if (insuranceState.length > 0) {
      setInsuranceData(insuranceState);
    } else {
      setInsuranceData([initialInsuranceData]);
    }
  }, [insuranceState]);

  const handleGetPatientIdentifier = async (noIdentifier: string) => {
    const response = await getPatientIdentifier({ noIdentifier });
    if (response.status === 200) {
      if (response?.data?.data?.length > 0) {
        setErrorIdentity('no_identifier', {
          type: 'manual',
          message: 'Nomor KTP sudah terdaftar',
        });
        setValidId(false);
        return;
      } else {
        clearErrorsIdentity('no_identifier');
      }
      setValidId(true);
    }
  };

  return (
    <>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='max-h-[70vh] flex flex-col gap-4 overflow-y-auto'>
          <div className='w-full'>
            <div>
              <Typography variant='bodySmall' color='' customClass='mb-2'>
                Jenis Pasien
              </Typography>
              <div className='flex gap-6 mt-2 text-base'>
                <Controller
                  name='patient_type'
                  control={controlIdentity}
                  render={({ field: { onChange, name } }) => (
                    <>
                      <RadioButton
                        id='type-patient-biasa-external'
                        name={name}
                        label='Biasa/External'
                        value='Biasa/External'
                        htmlFor='type-patient-biasa-external'
                        customClassName='w-4 h-4 text-base'
                        checked={
                          formPatientData.patient_type === 'Biasa/External'
                        }
                        onChange={({ target }) => {
                          handleSetFormPatient('patient_type', target.value);
                          onChange(target.value);
                        }}
                      />
                      <RadioButton
                        id='type-patient-karyawan'
                        name={name}
                        label='Karyawan'
                        value='Karyawan'
                        htmlFor='type-patient-karyawan'
                        customClassName='w-4 h-4'
                        checked={formPatientData.patient_type === 'Karyawan'}
                        onChange={({ target }) => {
                          handleSetFormPatient('patient_type', target.value);
                          onChange(target.value);
                        }}
                      />
                      <RadioButton
                        id='type-patient-keluarga-karyawan'
                        name={name}
                        label='Keluarga Karyawan'
                        value='Keluarga Karyawan'
                        htmlFor='type-patient-keluarga-karyawan'
                        customClassName='w-4 h-4'
                        checked={
                          formPatientData.patient_type === 'Keluarga Karyawan'
                        }
                        onChange={({ target }) => {
                          handleSetFormPatient('patient_type', target.value);
                          onChange(target.value);
                        }}
                      />
                      <RadioButton
                        id='type-patient-ipti'
                        name={name}
                        label='IPTI'
                        value='IPTI'
                        htmlFor='type-patient-ipti'
                        customClassName='w-4 h-4'
                        checked={formPatientData.patient_type === 'IPTI'}
                        onChange={({ target }) => {
                          handleSetFormPatient('patient_type', target.value);
                          onChange(target.value);
                        }}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='w-2/3'>
              <TextInput
                id='first_name'
                name='first_name'
                label='Nama Lengkap'
                placeholder='Masukkan nama'
                value={formPatientData.first_name ?? ''}
                register={registerIdentity}
                isValid={!errorsIdentity.first_name?.message}
                errorMessage={errorsIdentity.first_name?.message?.toString()}
                onInput={({ target }) =>
                  handleSetFormPatient('first_name', target.value)
                }
                required
              />
            </div>
            <div className='w-1/3'>
              <div>
                <Typography variant='bodySmall' color='' customClass='mb-2'>
                  Jenis Kelamin
                </Typography>
                <div className='flex gap-6 mt-5 text-base'>
                  <Controller
                    name='sex'
                    control={controlIdentity}
                    render={({ field: { onChange, name } }) => (
                      <>
                        <RadioButton
                          id='gender-male'
                          name={name}
                          label='Laki Laki'
                          value='Male'
                          htmlFor='gender-male'
                          customClassName='w-4 h-4 text-base'
                          checked={formPatientData.sex === 'Male'}
                          onChange={({ target }) => {
                            handleSetFormPatient('sex', target.value);
                            onChange(target.value);
                          }}
                        />
                        <RadioButton
                          id='gender-female'
                          name={name}
                          label='Perempuan'
                          value='Female'
                          htmlFor='gender-female'
                          customClassName='w-4 h-4'
                          checked={formPatientData.sex === 'Female'}
                          onChange={({ target }) => {
                            handleSetFormPatient('sex', target.value);
                            onChange(target.value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-4'>
            <TextInput
              type='number'
              id='no_identifier'
              name='no_identifier'
              label='Nomor KTP'
              placeholder='Masukkan nomor'
              value={formPatientData.no_identifier ?? ''}
              register={registerIdentity}
              isValid={!errorsIdentity.no_identifier?.message}
              errorMessage={errorsIdentity.no_identifier?.message?.toString()}
              onInput={async ({ target }) => {
                handleSetFormPatient('no_identifier', target.value);
                if (target.value?.length > 15)
                  await handleGetPatientIdentifier(target.value);
              }}
              required
            />
            <TextInput
              type='number'
              id='satu_sehat'
              name='satu_sehat'
              label='Nomor Satu Sehat'
              placeholder='Masukkan nomor'
              value={formPatientData.satu_sehat ?? ''}
              register={registerIdentity}
              isValid={!errorsIdentity.satu_sehat?.message}
              errorMessage={errorsIdentity.satu_sehat?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormPatient('satu_sehat', target.value)
              }
            />
            {formPatientData.patient_type === 'Karyawan' && (
              <TextInput
                type='number'
                id='no_nikes'
                name='no_nikes'
                label='Nomor Nikes/NIK/NPK'
                placeholder='Masukkan nomor'
                value={formPatientData.no_nikes ?? ''}
                register={registerIdentity}
                isValid={!errorsIdentity.no_nikes?.message}
                errorMessage={errorsIdentity.no_nikes?.message?.toString()}
                onInput={({ target }) =>
                  handleSetFormPatient('no_nikes', target.value)
                }
                required
              />
            )}
          </div>

          {insuranceData.map((item, index) => (
            <div key={index} className='flex gap-4'>
              <SelectBox
                label='Penjamin'
                placeholder='Pilih penjamin'
                wraperStyle='w-full'
                className='h-12 bg-[#F5F8FC] border-[#F5F8FC] rounded-lg'
                options={insuranceOptions}
                value={insuranceOptions.filter(
                  (option: any) => option.value.name === item.payor
                )}
                onChange={(value) =>
                  setInsuranceData((prevState) =>
                    prevState.map((insurance, i) =>
                      i === index
                        ? { ...insurance, payor: value.value.name }
                        : insurance
                    )
                  )
                }
              />
              <TextInput
                type='number'
                id='satu_sehat'
                name='satu_sehat'
                label='Nomor ID Penjamin'
                placeholder='Masukkan nomor'
                value={item.no_identifier ?? ''}
                onInput={({ target }) =>
                  setInsuranceData((prevState) =>
                    prevState.map((insurance, i) =>
                      i === index
                        ? { ...insurance, no_identifier: target.value }
                        : insurance
                    )
                  )
                }
              />
              <div className='w-full content-end'>
                {index === 0 ? (
                  <Button
                    size='md'
                    class='outline'
                    customClassName='!h-12 !w-12 !rounded-md'
                    iconButton={() => <ButtonPlus color='#0A0A0A' />}
                    onClick={() =>
                      setInsuranceData((prevState) => [
                        ...prevState,
                        initialInsuranceData,
                      ])
                    }
                  />
                ) : (
                  <Button
                    size='md'
                    class='outline'
                    customClassName='!h-12 !w-12 !rounded-md'
                    iconButton={() => <TrashBigIcon color='#0A0A0A' />}
                    onClick={() =>
                      setInsuranceData((prevState) =>
                        prevState.filter(
                          (_, indexState) => indexState !== index
                        )
                      )
                    }
                  />
                )}
              </div>
            </div>
          ))}

          <div className='flex gap-4'>
            <TextInput
              type='number'
              id='mobile'
              name='mobile'
              label='Nomor HP'
              placeholder='Masukkan nomor'
              value={formPatientData.mobile ?? ''}
              register={registerIdentity}
              isValid={!errorsIdentity.mobile?.message}
              errorMessage={errorsIdentity.mobile?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormPatient('mobile', target.value)
              }
              required
            />
            <TextInput
              id='pob'
              name='pob'
              label='Tempat Lahir'
              placeholder='Masukkan tempat lahir'
              value={formPatientData.pob ?? ''}
              register={registerIdentity}
              isValid={!errorsIdentity.pob?.message}
              errorMessage={errorsIdentity.pob?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormPatient('pob', target.value)
              }
              required
            />
            <Controller
              control={controlIdentity}
              name='dob'
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  id='dob'
                  label='Tanggal Lahir'
                  placeholder='dd/mm/yyyy'
                  customClass='h-12'
                  select={value}
                  value={value}
                  maxDate={new Date().toString()}
                  setStartDate={() => {}}
                  setEndDate={() => {}}
                  isError={!!errorsIdentity.dob?.message}
                  textError={errorsIdentity.dob?.message?.toString()}
                  onChangeControl={(value: any) => {
                    onChange(value);
                    handleSetFormPatient('dob', value);
                  }}
                  hideMouseLeave={false}
                  selectsRange={false}
                  dropdownMode='select'
                  portalId='root'
                  showMonthDropdown
                  showYearDropdown
                  scrollableYearDropdown
                  closeOnSelect
                  useControl
                  required
                />
              )}
            />
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <Controller
              control={controlIdentity}
              name='marital_status'
              render={({ field: { onChange, name, ref } }) => (
                <SelectBox
                  inputRef={ref}
                  id='marital_status'
                  name={name}
                  label='Status Pernikahan'
                  placeholder='Pilih status'
                  className='h-12 rounded-md'
                  options={maritalOptions}
                  value={maritalOptions.find(
                    (item) => item.value === formPatientData.marital_status
                  )}
                  errorMessage={errorsIdentity.marital_status?.message?.toString()}
                  onChange={({ value }) => {
                    onChange(value);
                    handleSetFormPatient('marital_status', value);
                  }}
                  required
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className='w-full flex justify-between gap-3 mt-8'>
        <div className='w-[320px]'>
          <Button
            id='call-cancel-btn'
            size='md'
            class='outline'
            text='Batal'
            customClassName='!rounded-md'
            onClick={onCancel}
          />
        </div>
        <div className='w-[320px]'>
          <Button
            id='call-continue-btn'
            size='md'
            class='primary'
            text='Simpan & Selanjutnya'
            customClassName='!rounded-md'
            disabled={!validId || !isValidIdentity}
            onClick={handleSubmitIdentity(() => onSubmit(insuranceData))}
          />
        </div>
      </div>
    </>
  );
};

export default FormIdentity;
