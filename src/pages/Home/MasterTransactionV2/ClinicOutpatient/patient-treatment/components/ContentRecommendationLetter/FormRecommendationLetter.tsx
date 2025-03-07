import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import {
  AsyncSelect,
  Button,
  Card,
  DatePicker,
  RadioButton,
  SelectBox,
  TextInput,
  Typography,
} from '@/src/components';
import { ModalError, ModalSuccess } from '@/src/commons';
import { SuccessIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import { formatDate } from '@/utils/formatDate';
import UploadDocument from './UploadDocument';
import usePatientTreatment from '../../usePatientTreatment';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

const drugOptions = [
  {
    label: 'Ya',
    value: 'yes',
  },
  {
    label: 'Tidak',
    value: 'no',
  },
];

const healthFacilityOptions = [
  {
    label: 'RSU',
    value: 'RSU',
  },
  {
    label: 'RSK',
    value: 'RSK',
  },
  {
    label: 'RB',
    value: 'RB',
  },
];

const referenceTypeOptions = [
  {
    label: 'Rujukan Dokter Spesialis',
    value: 'Rujukan Dokter Spesialis',
  },
  {
    label: 'Rujukan Rawat Inap',
    value: 'Rujukan Rawat Inap',
  },
];

const FormRecommendationLetter = () => {
  const navigate = useNavigate();

  const [uploadDocument, setUploadDocument] = useState(null);

  const {
    data: { listSelectReferralHospital },
    method: { handleGetListReferralHospital, handleSearchListReferralHospital },
  } = useTransaction();
  const {
    data: { id, formRecommendationLetter },
    method: {
      handleSetFormRecommendationLetter,
      handleSetModalMedicalSupport,
      handleSetModalRecommendationLetter,
      handleSubmitRecommendationLetter,
      handleUploadDocument,
    },
  } = usePatientTreatment();

  useEffect(() => {
    handleSetModalMedicalSupport('isSuccess', false);
  }, []);

  useEffect(() => {
    if (formRecommendationLetter.detailRefer?.facility)
      handleGetListReferralHospital(
        formRecommendationLetter.detailRefer?.facility
      );
  }, [formRecommendationLetter.detailRefer?.facility]);

  useEffect(() => {
    if (
      formRecommendationLetter?.detailCertificate?.startDate &&
      formRecommendationLetter?.detailCertificate?.endDate
    ) {
      const startDate = dayjs(
        formRecommendationLetter?.detailCertificate?.startDate
      );
      const endDate = dayjs(
        formRecommendationLetter?.detailCertificate?.endDate
      );
      const diffDate = endDate.diff(startDate, 'day');
      handleSetFormRecommendationLetter(
        'detailCertificate',
        'period',
        diffDate + 1 > 0 ? diffDate + 1 : 0
      );
    }
  }, [
    formRecommendationLetter?.detailCertificate?.startDate,
    formRecommendationLetter?.detailCertificate?.endDate,
  ]);

  useEffect(() => {
    if (!formRecommendationLetter.isCreateSuccess) return;
    if (formRecommendationLetter?.detailDocument?.hasDetailDocument !== 'yes') {
      handleSetModalRecommendationLetter('isSuccess', true);
      return;
    }
    if (uploadDocument) {
      handleUploadDocument(uploadDocument);
    } else {
      handleSetModalRecommendationLetter('isSuccess', true);
    }
  }, [formRecommendationLetter.isCreateSuccess]);

  const handleFormValid = () => {
    if (formRecommendationLetter?.detailRefer?.hasDetailRefer === 'yes') {
      if (
        formRecommendationLetter?.detailRefer?.hospital?.name === '' ||
        formRecommendationLetter?.detailRefer?.facility === '' ||
        formRecommendationLetter?.detailRefer?.reference === ''
      )
        return false;
    }
    if (
      formRecommendationLetter?.detailCertificate?.hasDetailCertificate ===
      'yes'
    ) {
      if (
        formRecommendationLetter?.detailCertificate?.startDate === '' ||
        formRecommendationLetter?.detailCertificate?.endDate === '' ||
        formRecommendationLetter?.detailCertificate?.period === ''
      )
        return false;
    }
    return !(
      formRecommendationLetter?.detailDocument?.hasDetailDocument === 'yes' &&
      !uploadDocument
    );
  };

  return (
    <>
      <ModalSuccess
        isOpen={formRecommendationLetter.isSuccess}
        title='Sukses!'
        description='Berhasil melakukan tindakan medis'
        onCancel={() => {
          handleSetModalRecommendationLetter('isSuccess', false);
          navigate(
            `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT}?tab=Sudah Ditindak`
          );
        }}
      />
      <ModalError
        isOpen={formRecommendationLetter.isError}
        title='Gagal'
        description={formRecommendationLetter.errorMessage}
        onCancel={() => handleSetModalRecommendationLetter('isError', false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='gap-4'>
          <Typography variant='h4' color='' customClass='mb-2'>
            RUJUK KELUAR
          </Typography>
          <Card padding='p-3' customClassName='border-1 pb-4'>
            <div className='flex'>
              <div className='flex-1'>
                <Typography variant='h3' color=''>
                  Detail Rujuk Keluar
                </Typography>
              </div>
              <div className='flex gap-6 mr-4'>
                {drugOptions.map((item) => (
                  <RadioButton
                    key={item.label}
                    id={'referal-' + item.value}
                    name='referal'
                    containerClass='w-full hover:cursor-pointer'
                    label={item.label}
                    value={item.value}
                    htmlFor={item.value}
                    checked={
                      item.value ===
                      formRecommendationLetter?.detailRefer?.hasDetailRefer
                    }
                    onClick={() =>
                      handleSetFormRecommendationLetter(
                        'detailRefer',
                        'hasDetailRefer',
                        item.value
                      )
                    }
                    onChange={({ target }) =>
                      handleSetFormRecommendationLetter(
                        'detailRefer',
                        'hasDetailRefer',
                        target.value
                      )
                    }
                  />
                ))}
              </div>
            </div>
            {formRecommendationLetter?.detailRefer?.hasDetailRefer ===
              'yes' && (
              <div className='flex flex-col gap-4 mt-4'>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <SelectBox
                      id='facility'
                      name='facility'
                      label='Jenis Fasilitas Kesehatan'
                      placeholder='Pilih jenis fasilitas kesehatan'
                      options={healthFacilityOptions}
                      value={healthFacilityOptions?.find(
                        (item) =>
                          item.value ===
                          formRecommendationLetter.detailRefer?.facility
                      )}
                      onChange={(value) => {
                        handleSetFormRecommendationLetter(
                          'detailRefer',
                          'facility',
                          value.value
                        );
                        handleSetFormRecommendationLetter(
                          'detailRefer',
                          'hospital',
                          ''
                        );
                      }}
                      isSearchable={false}
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <AsyncSelect
                      id='hospital'
                      name='hospital'
                      label='Nama Faskes Rujukan'
                      placeholder='Pilih fasilitas kesehatan'
                      options={listSelectReferralHospital}
                      loadOptions={(inputValue, callback) =>
                        handleSearchListReferralHospital(inputValue, callback, {
                          facilityType:
                            formRecommendationLetter.detailRefer?.facility,
                        })
                      }
                      defaultValue={
                        formRecommendationLetter.detailRefer?.hospital
                          ? {
                              title:
                                formRecommendationLetter.detailRefer?.hospital
                                  ?.health_facility_name,
                              value:
                                formRecommendationLetter.detailRefer?.hospital,
                            }
                          : ''
                      }
                      onChange={(item) =>
                        handleSetFormRecommendationLetter(
                          'detailRefer',
                          'hospital',
                          item.value
                        )
                      }
                      isDisabled={
                        !formRecommendationLetter.detailRefer?.facility
                      }
                      resetTriger={
                        formRecommendationLetter.detailRefer?.facility
                      }
                      height='44px'
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <SelectBox
                      id='reference'
                      name='reference'
                      label='Tipe Rujukan'
                      placeholder='Pilih tipe rujukan'
                      options={referenceTypeOptions}
                      value={referenceTypeOptions?.find(
                        (item) =>
                          item.value ===
                          formRecommendationLetter.detailRefer?.reference
                      )}
                      onChange={(value) =>
                        handleSetFormRecommendationLetter(
                          'detailRefer',
                          'reference',
                          value.value
                        )
                      }
                      isSearchable={false}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className='gap-4'>
          <Typography variant='h4' color='' customClass='mb-2'>
            SURAT KETERANGAN DOKTER
          </Typography>
          <Card padding='p-3' customClassName='border-1 pb-4'>
            <div className='flex'>
              <div className='flex-1'>
                <Typography variant='h3' color=''>
                  Detail Surat Dokter
                </Typography>
              </div>
              <div className='flex gap-6 mr-4'>
                {drugOptions.map((item) => (
                  <RadioButton
                    key={item.label}
                    id={'doctorLetter-' + item.value}
                    name='doctorLetter'
                    containerClass='w-full hover:cursor-pointer'
                    label={item.label}
                    value={item.value}
                    htmlFor={item.value}
                    checked={
                      item.value ===
                      formRecommendationLetter?.detailCertificate
                        ?.hasDetailCertificate
                    }
                    onClick={() =>
                      handleSetFormRecommendationLetter(
                        'detailCertificate',
                        'hasDetailCertificate',
                        item.value
                      )
                    }
                    onChange={({ target }) =>
                      handleSetFormRecommendationLetter(
                        'detailCertificate',
                        'hasDetailCertificate',
                        target.value
                      )
                    }
                  />
                ))}
              </div>
            </div>
            {formRecommendationLetter?.detailCertificate
              ?.hasDetailCertificate === 'yes' && (
              <div className='flex gap-4 mt-4'>
                <div className='flex-1'>
                  <Typography variant='bodySmall' color='' customClass='mb-2'>
                    Mulai dari <span className='text-danger'>*</span>
                  </Typography>
                  <DatePicker
                    placeholder='dd/mm/yyyy'
                    minDate={`${new Date()}`}
                    setStartDate={() => {}}
                    setEndDate={() => {}}
                    value={
                      formRecommendationLetter?.detailCertificate?.startDate
                        ? formatDate(
                            formRecommendationLetter?.detailCertificate
                              ?.startDate,
                            '/',
                            'MM',
                            false
                          )
                        : undefined
                    }
                    onChangeControl={(value: any) =>
                      handleSetFormRecommendationLetter(
                        'detailCertificate',
                        'startDate',
                        value
                      )
                    }
                    hideMouseLeave={false}
                    selectsRange={false}
                    isError={false}
                    useControl
                    closeOnSelect
                    required
                  />
                </div>
                <div className='flex-1'>
                  <Typography variant='bodySmall' color='' customClass='mb-2'>
                    Sampai dengan <span className='text-danger'>*</span>
                  </Typography>
                  <DatePicker
                    placeholder='dd/mm/yyyy'
                    minDate={
                      formRecommendationLetter?.detailCertificate?.startDate
                        ? `${new Date(
                            formRecommendationLetter?.detailCertificate?.startDate
                          )}`
                        : `${new Date()}`
                    }
                    setStartDate={() => {}}
                    setEndDate={() => {}}
                    value={
                      formRecommendationLetter?.detailCertificate?.endDate
                        ? formatDate(
                            formRecommendationLetter?.detailCertificate
                              ?.endDate,
                            '/',
                            'MM',
                            false
                          )
                        : undefined
                    }
                    onChangeControl={(value: any) =>
                      handleSetFormRecommendationLetter(
                        'detailCertificate',
                        'endDate',
                        value
                      )
                    }
                    hideMouseLeave={false}
                    selectsRange={false}
                    isError={false}
                    useControl
                    closeOnSelect
                    required
                  />
                </div>
                <div className='flex-1'>
                  <TextInput
                    id='total'
                    name='total'
                    label='Selama'
                    placeholder='0 hari'
                    containerStyle='h-11'
                    value={`${formRecommendationLetter?.detailCertificate?.period} hari`}
                    disabled
                  />
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className='gap-4'>
          <Typography variant='h4' color='' customClass='mb-2'>
            DOKUMEN PENUNJANG LAIN
          </Typography>
          <Card padding='p-3' customClassName='border-1 pb-4'>
            <div className='flex'>
              <div className='flex-1'>
                <Typography variant='h3' color=''>
                  Detail Dokumen
                </Typography>
              </div>
              <div className='flex gap-6 mr-4'>
                {drugOptions.map((item) => (
                  <RadioButton
                    key={item.label}
                    id={'document-' + item.value}
                    name='document'
                    containerClass='w-full hover:cursor-pointer'
                    label={item.label}
                    value={item.value}
                    htmlFor={item.value}
                    checked={
                      item.value ===
                      formRecommendationLetter?.detailDocument
                        ?.hasDetailDocument
                    }
                    onClick={() =>
                      handleSetFormRecommendationLetter(
                        'detailDocument',
                        'hasDetailDocument',
                        item.value
                      )
                    }
                    onChange={({ target }) =>
                      handleSetFormRecommendationLetter(
                        'detailDocument',
                        'hasDetailDocument',
                        target.value
                      )
                    }
                  />
                ))}
              </div>
            </div>
            {formRecommendationLetter?.detailDocument?.hasDetailDocument ===
              'yes' && (
              <div className='flex gap-4 mt-4'>
                <UploadDocument
                  id='Upload'
                  name='Upload'
                  onChangeUpload={(value) => setUploadDocument(value)}
                />
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
                  `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=support`
                )
              }
            />
          </div>
          <div className='w-1/3'>
            <Button
              text='Simpan Dan Selesai'
              size='md'
              customClassName='!rounded-md'
              iconButton={() => <SuccessIcon color='#FFFFFF' />}
              loading={formRecommendationLetter.isLoading}
              disabled={!handleFormValid()}
              onClick={handleSubmitRecommendationLetter}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormRecommendationLetter;
