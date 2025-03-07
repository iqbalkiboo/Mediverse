import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { AsyncSelect, Button, TextInput } from '@/src/components';
import useAddPatient from '../ModalAddPatient/useAddPatient';

interface FormAddressProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const FormAddress: React.FC<FormAddressProps> = ({ onCancel, onSubmit }) => {
  const {
    data: {
      formPatient,
      formPatientData,
      paramsLocation,
      listSelectProvince,
      listSelectRegency,
      listSelectDistrict,
      errorsAddress,
      controlAddress,
      isValidAddress,
    },
    method: {
      handleGetLocation,
      handleSetFormPatient,
      handleSearchListProvince,
      handleSearchListRegency,
      handleSearchListDistrict,
      handleSetParamsLocation,
      handleSubmitAddress,
      registerAddress,
      setValueAddress,
      resetAddress,
    },
  } = useAddPatient();

  useEffect(() => {
    resetAddress(formPatientData);
  }, []);

  useEffect(() => {
    handleGetLocation();
  }, [paramsLocation]);

  return (
    <>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='flex flex-col gap-4'>
          <div className='w-full'>
            <TextInput
              type='textarea'
              rows={4}
              id='address'
              name='address'
              label='Alamat Lengkap'
              placeholder='Masukkan alamat'
              value={formPatientData.address ?? ''}
              register={registerAddress}
              isValid={!errorsAddress.address?.message}
              errorMessage={errorsAddress.address?.message?.toString()}
              onInput={({ target }) =>
                handleSetFormPatient('address', target.value)
              }
              required
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-sm'>
              <Controller
                control={controlAddress}
                name='province'
                render={({ field: { onChange, name } }) => (
                  <AsyncSelect
                    name={name}
                    id={name}
                    label='Provinsi'
                    placeholder='Pilih provinsi'
                    height='48px'
                    loadOptions={handleSearchListProvince}
                    defaultValue={
                      formPatientData.province
                        ? {
                            title: formPatientData.province,
                            value: '',
                          }
                        : ''
                    }
                    errorMessage={errorsAddress.province?.message?.toString()}
                    options={listSelectProvince}
                    onChange={(item: any) => {
                      onChange(item.title);
                      handleSetParamsLocation('province', item.title);
                      handleSetFormPatient('province', item.title);

                      handleSetParamsLocation('regency', '');
                      handleSetFormPatient('city', '');
                      setValueAddress('city', '');

                      handleSetParamsLocation('district', '');
                      handleSetFormPatient('subdistrict', '');
                      setValueAddress('subdistrict', '');
                    }}
                    required
                  />
                )}
              />
            </div>
            <div className='text-sm'>
              <Controller
                control={controlAddress}
                name='city'
                render={({ field: { onChange, name } }) => (
                  <AsyncSelect
                    name={name}
                    id={name}
                    label='Kabupaten/Kota'
                    placeholder='Pilih kabupaten/kota'
                    height='48px'
                    loadOptions={handleSearchListRegency}
                    defaultValue={
                      formPatientData.city
                        ? {
                            title: formPatientData.city,
                            value: '',
                          }
                        : ''
                    }
                    errorMessage={errorsAddress.city?.message?.toString()}
                    options={listSelectRegency}
                    resetTriger={formPatientData.province}
                    onChange={(item: any) => {
                      onChange(item.title);
                      handleSetParamsLocation('regency', item.title);
                      handleSetFormPatient('city', item.title);

                      handleSetParamsLocation('district', '');
                      handleSetFormPatient('subdistrict', '');
                      setValueAddress('subdistrict', '');
                    }}
                    isDisabled={paramsLocation.province === ''}
                    required
                  />
                )}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-sm'>
              <Controller
                control={controlAddress}
                name='subdistrict'
                render={({ field: { onChange, name } }) => (
                  <AsyncSelect
                    name={name}
                    id={name}
                    label='Kecamatan'
                    placeholder='Pilih kecamatan'
                    height='48px'
                    loadOptions={handleSearchListDistrict}
                    defaultValue={
                      formPatientData.subdistrict
                        ? {
                            title: formPatientData.subdistrict,
                            value: '',
                          }
                        : ''
                    }
                    errorMessage={errorsAddress.subdistrict?.message?.toString()}
                    options={listSelectDistrict}
                    resetTriger={formPatientData.city}
                    onChange={(item: any) => {
                      onChange(item.title);
                      handleSetParamsLocation('district', item.title);
                      handleSetFormPatient('subdistrict', item.title);
                    }}
                    isDisabled={paramsLocation.regency === ''}
                    required
                  />
                )}
              />
            </div>
            <div className='text-sm'>
              <TextInput
                id='village'
                name='village'
                label='Kelurahan'
                placeholder='Masukkan kelurahan'
                value={formPatientData.village ?? ''}
                register={registerAddress}
                isValid={!errorsAddress.village?.message}
                errorMessage={errorsAddress.village?.message?.toString()}
                onInput={({ target }) =>
                  handleSetFormPatient('village', target.value)
                }
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-between gap-3 mt-8'>
        <div className='w-[320px]'>
          <Button
            id='call-cancel-btn'
            size='md'
            class='outline'
            text='Sebelumnya'
            customClassName='!rounded-md'
            onClick={onCancel}
          />
        </div>
        <div className='w-[320px]'>
          <Button
            id='call-continue-btn'
            size='md'
            class='primary'
            text='Simpan & Akhiri'
            customClassName='!rounded-md'
            loading={formPatient.isLoading}
            disabled={!isValidAddress}
            onClick={handleSubmitAddress(onSubmit)}
          />
        </div>
      </div>
    </>
  );
};

export default FormAddress;
