import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import cx from 'classnames';

import {
  AsyncSelect,
  Button,
  Card,
  DatePicker,
  Modal,
  SelectBox,
  TextInput,
  Typography,
} from '@/src/components';
import { ModalError, ModalSuccess } from '@/src/commons';
import { AddCircleIcon, TrashBigIcon } from '@/assets/images/svg';
import { formatDate } from '@/utils/formatDate';
import { ROLES } from '@/src/constants';
import FormSlotBatch from '../FormSlotBatch';
import useSlotReservations from '../useSlotReservations';

interface IFormModalSlotReservation {
  onClose: any;
  onRefetch: any;
  isOpen: boolean;
}

const FormModalSlotReservation = ({
  isOpen,
  onClose,
  onRefetch,
}: IFormModalSlotReservation) => {
  const { providerId, id } = useParams();

  const {
    data: {
      role,
      errors,
      control,
      detailUser,
      formModalSlot,
      listSelectPoly,
      listSelectDoctor,
      listSelectProvider,
      listSelectTreatment,
      listSelectHealthFacility,
      isSuperAdmin,
      healthFacilities,
    },
    method: {
      reset,
      resetField,
      setValue,
      register,
      handleSubmit,
      handleSetForm,
      handleSetModal,
      handleGetListProvider,
      onSubmitSlotReservation,
      handleResetFormModalSlot,
      handleGetListHealthFacility,
      handleGetDetailHealthFacility,
      handleSearchListProvider,
      handleSearchListHealthFacility,
      handleSetAddAdditionalDataForm,
      handleSetAdditionalDataItem,
      handleSetRemoveAdditionalDataForm,
    },
  } = useSlotReservations();

  useEffect(() => {
    if (isSuperAdmin) handleGetListProvider();
    if (providerId) {
      handleSetForm('providerId', detailUser?.provider_id);
      setValue('providerId', detailUser?.provider_id);
    }
    return () => {
      reset();
      handleResetFormModalSlot();
    };
  }, []);

  useEffect(() => {
    if (id && isOpen) {
      const fields = [
        'date',
        'endTime',
        'startTime',
        'doctor',
        'healthFacility',
        'treatment',
        'poly',
        'maxReservation',
      ];
      fields.forEach((field) => {
        setValue(field, formModalSlot?.form[field]);
      });
    } else {
      reset();
    }
  }, [id, isOpen]);

  useEffect(() => {
    if (
      (detailUser?.provider_id || formModalSlot?.form?.providerId) &&
      !detailUser.outlet_id
    ) {
      handleGetListHealthFacility(
        detailUser.provider_id || formModalSlot?.form?.providerId
      );
    }
    return () => {
      if (![ROLES.SUPER_ADMIN]?.includes(role?.id)) {
        handleSetForm('providerId', detailUser?.provider_id);
        setValue('providerId', detailUser?.provider_id);
      }
    };
  }, [formModalSlot?.form?.providerId]);

  useEffect(() => {
    if (
      (detailUser?.provider_id || formModalSlot?.form?.providerId) &&
      (detailUser.outlet_id || formModalSlot?.form?.healthFacility?.id)
    ) {
      handleGetDetailHealthFacility(
        detailUser?.provider_id || formModalSlot?.form?.providerId,
        detailUser.outlet_id || formModalSlot?.form?.healthFacility?.id
      );
    }
  }, [formModalSlot?.form?.healthFacility]);

  useEffect(() => {
    if (
      [ROLES.ADMINISTRATOR_PROVIDER_MEDPOINT, ROLES.OPERATOR_FASKES].includes(
        role?.id
      ) &&
      detailUser?.provider_id
    ) {
      handleSetForm('providerId', detailUser?.provider_id);
      setValue('providerId', detailUser?.provider_id);
    }

    if ([ROLES.OPERATOR_FASKES].includes(role?.id) && detailUser?.outlet_id) {
      handleSetForm('healthFacility', detailUser?.outlet_id);
      setValue('healthFacility', defaultValueHealthFacility);
    }
  }, [detailUser?.provider_id, detailUser?.outlet_id]);

  useEffect(() => {
    if (
      formModalSlot?.form?.treatment?.type === 'vaccination' &&
      formModalSlot?.form?.additionalData?.length < 1
    ) {
      handleSetForm('additionalData', []);
      resetField('additionalData');
      handleSetAddAdditionalDataForm();
    }
  }, [formModalSlot?.form?.treatment.type]);

  const isToday = (date: any) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleMinAndMaxTime = (time = new Date(), isEnd = false) => {
    const maxTimeMinDay = new Date().setHours(23, 59, 0, 0);
    let currentDate = new Date();
    if (dayjs(time).isValid()) {
      currentDate = time;
      if (isToday(time) && !isEnd) {
        currentDate = new Date();
      }
    }

    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    const minTimeMaxDay = new Date().setHours(hour, minute, second, 0);
    return {
      min: minTimeMaxDay,
      max: maxTimeMinDay,
    };
  };

  const isDisableHealthFacility = () => {
    if (id) return true;
    if (formModalSlot?.form?.healthFacility?.id) return false;
  };

  const mapOptionsVaccine = () => {
    if (formModalSlot?.form?.treatment?.additionalData?.length < 0) return [];
    return formModalSlot?.form?.treatment?.additionalData?.map((item) => {
      return {
        label: item?.kfa?.display,
        value: item,
      };
    });
  };

  const defaultValueMedpoint = {
    title: `${detailUser?.provider_name}`,
    value: `${detailUser?.provider_id}`,
  };

  const defaultValueHealthFacility = {
    title: `${detailUser?.outlet_name}`,
    value: `${detailUser?.outlet_id}`,
  };

  return (
    <>
      {/* Modal Success */}
      <ModalSuccess
        title={'Sukses'}
        description={formModalSlot.successMessage}
        isOpen={formModalSlot.isSuccess}
        onCancel={() => {
          reset();
          handleResetFormModalSlot();
          handleSetModal('formModalSlot', 'isSuccess', false);
          onClose();
          onRefetch();
        }}
      />
      {/* Modal Error */}
      <ModalError
        title={'Gagal'}
        description={formModalSlot.errorMessage}
        isOpen={formModalSlot.isError}
        onCancel={() => handleSetModal('formModalSlot', 'isError', false)}
      />

      <Modal
        open={isOpen}
        onClose={() => onClose()}
        style={cx('h-auto w-6/12 overflow-y-auto')}
        header={
          <Typography variant={'h2'} color=''>
            {id ? 'Edit' : 'Tambah'} Slot Reservasi
          </Typography>
        }
      >
        <div className={cx('mt-4 mb-6')}>
          <div className={cx('grid grid-cols-2 gap-4')}>
            {!id && (
              <div className={cx('grid gap-2')}>
                <Typography variant='bodyXSmall' color=''>
                  Provider <span className={cx('text-danger')}>*</span>
                </Typography>
                <Controller
                  name='providerId'
                  control={control}
                  defaultValue={defaultValueMedpoint}
                  render={({ field: { onChange } }) => (
                    <AsyncSelect
                      placeholder='Pilih provider'
                      loadOptions={handleSearchListProvider}
                      options={listSelectProvider}
                      errorMessage={errors?.providerId?.message?.toString()}
                      defaultValue={defaultValueMedpoint}
                      onChange={(item) => {
                        onChange(item?.value);
                        handleSetForm('providerId', item.value);
                      }}
                      isDisabled={!isSuperAdmin}
                    />
                  )}
                />
              </div>
            )}
            <div className={cx('grid gap-2')}>
              <Typography variant='bodyXSmall' color=''>
                Faskes <span className={cx('text-danger')}>*</span>
              </Typography>
              <Controller
                name='healthFacility'
                control={control}
                defaultValue={
                  formModalSlot?.form?.healthFacility?.id
                    ? {
                        title: formModalSlot?.form?.healthFacility?.name,
                        value: formModalSlot?.form?.healthFacility?.id,
                      }
                    : defaultValueHealthFacility
                }
                render={({ field: { onChange } }) => (
                  <AsyncSelect
                    placeholder='Pilih faskes'
                    loadOptions={handleSearchListHealthFacility}
                    options={listSelectHealthFacility}
                    errorMessage={errors?.healthFacility?.message?.toString()}
                    defaultValue={
                      formModalSlot?.form?.healthFacility?.id
                        ? {
                            title: formModalSlot?.form?.healthFacility?.name,
                            value: formModalSlot?.form?.healthFacility?.id,
                          }
                        : defaultValueHealthFacility
                    }
                    onChange={(item) => {
                      onChange(item.value);
                      handleSetForm('healthFacility', item.value);
                    }}
                    isDisabled={isDisableHealthFacility()}
                  />
                )}
              />
            </div>
            <div className={cx('grid gap-2')}>
              <Typography variant='bodyXSmall' color=''>
                Poli <span className={cx('text-danger')}>*</span>
              </Typography>
              <Controller
                name='poly'
                control={control}
                defaultValue={{
                  label: formModalSlot?.form?.poly?.name,
                  value: formModalSlot?.form?.poly?.id,
                }}
                render={({ field: { onChange, name, ref } }) => (
                  <SelectBox
                    required
                    name={name}
                    inputRef={ref}
                    placeholder='Pilih poli faskes'
                    options={listSelectPoly}
                    defaultValue={{
                      label: formModalSlot?.form?.poly?.name,
                      value: formModalSlot?.form?.poly?.id,
                    }}
                    value={
                      formModalSlot?.form?.poly?.id
                        ? {
                            label: formModalSlot?.form?.poly?.name,
                            value: formModalSlot?.form?.poly?.id,
                          }
                        : ''
                    }
                    errorMessage={errors?.poly?.message}
                    onChange={(item) => {
                      onChange(item.value);
                      handleSetForm('poly', item.value);
                    }}
                    isDisabled={
                      healthFacilities.isLoading || isDisableHealthFacility()
                    }
                  />
                )}
              />
            </div>
            <div className={cx('grid gap-2')}>
              <Typography variant='bodyXSmall' color=''>
                Tanggal Mulai <span className={cx('text-danger')}>*</span>
              </Typography>
              <Controller
                control={control}
                name='date'
                defaultValue={formModalSlot?.form?.date}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    placeholder='dd/mm/yyyy'
                    value={
                      value ? value : formatDate(formModalSlot?.form?.date, '/')
                    }
                    minDate={`${new Date()}`}
                    defaultDate={formModalSlot?.form?.date}
                    isError={!!errors?.date?.message}
                    textError={errors?.date?.message?.toString()}
                    setStartDate={() => {}}
                    setEndDate={() => {}}
                    select={value}
                    onChangeControl={(date) => {
                      onChange(date);
                      handleSetForm('date', date);
                      resetField('startTime');
                      resetField('endTime');
                      handleSetForm('startTime', '');
                      handleSetForm('endTime', '');
                    }}
                    selectsRange={false}
                    hideMouseLeave={false}
                    closeOnSelect
                    useControl
                  />
                )}
              />
            </div>
            <div className={cx('flex gap-2')}>
              <div className={cx('flex-1')}>
                <Typography variant='bodyXSmall' color='' customClass='mb-2'>
                  Waktu Mulai <span className={cx('text-danger')}>*</span>
                </Typography>
                <Controller
                  name='startTime'
                  control={control}
                  defaultValue={formModalSlot?.form?.startTime}
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      required
                      placeholder='Jam'
                      setEndDate={() => {}}
                      setStartDate={() => {}}
                      isError={!!errors?.startTime?.message}
                      textError={errors?.startTime?.message?.toString()}
                      value={formModalSlot?.form?.startTime}
                      select={formModalSlot?.form?.startTime}
                      minTime={
                        handleMinAndMaxTime(formModalSlot?.form?.date)?.min
                      }
                      defaultDate={formModalSlot?.form?.startTime}
                      onChangeControl={(value: any) => {
                        onChange(value);
                        handleSetForm('startTime', value);
                        if (formModalSlot?.form?.endTime) {
                          resetField('endTime');
                          handleSetForm('endTime', value);
                        }
                      }}
                      selectsRange={false}
                      useControl
                      closeOnSelect
                      showTimeSelectOnly
                    />
                  )}
                />
              </div>
              <div className={cx('flex-1')}>
                <Typography variant='bodyXSmall' color='' customClass='mb-2'>
                  Waktu Selesai <span className={cx('text-danger')}>*</span>
                </Typography>
                <Controller
                  name='endTime'
                  control={control}
                  defaultValue={formModalSlot?.form?.endTime}
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      required
                      placeholder='Jam'
                      setEndDate={() => {}}
                      setStartDate={() => {}}
                      isError={!!errors?.endTime?.message}
                      textError={errors?.endTime?.message?.toString()}
                      value={formModalSlot?.form?.endTime}
                      select={formModalSlot?.form?.endTime}
                      defaultDate={formModalSlot?.form?.endTime}
                      minTime={
                        handleMinAndMaxTime(
                          formModalSlot?.form?.startTime,
                          true
                        )?.min
                      }
                      onChangeControl={(value: any) => {
                        onChange(value);
                        handleSetForm('endTime', value);
                      }}
                      selectsRange={false}
                      useControl
                      closeOnSelect
                      showTimeSelectOnly
                    />
                  )}
                />
              </div>
            </div>
            <div className={cx('grid gap-2')}>
              <Typography variant='bodyXSmall' color=''>
                Jumlah Maksimum Reservasi{' '}
                <span className={cx('text-danger')}>*</span>
              </Typography>
              <TextInput
                type='number'
                name='maxReservation'
                placeholder='Masukkan jumlah'
                register={register}
                value={formModalSlot?.form?.maxReservation}
                isValid={!errors?.maxReservation?.message}
                errorMessage={errors?.maxReservation?.message?.toString()}
                onInput={({ target }) =>
                  handleSetForm('maxReservation', target.value)
                }
                required
              />
            </div>
            <div className={cx('grid gap-2')}>
              <Typography variant='bodyXSmall' color=''>
                Layanan <span className={cx('text-danger')}>*</span>
              </Typography>
              <Controller
                name='treatment'
                control={control}
                defaultValue={
                  formModalSlot?.form?.treatment?.id
                    ? {
                        label: formModalSlot?.form?.treatment?.name,
                        value: formModalSlot?.form?.treatment?.id,
                      }
                    : ''
                }
                render={({ field: { onChange, name, ref } }) => (
                  <SelectBox
                    required
                    name={name}
                    inputRef={ref}
                    placeholder='Pilih layanan'
                    options={listSelectTreatment}
                    defaultValue={
                      formModalSlot?.form?.treatment?.id
                        ? {
                            label: formModalSlot?.form?.treatment?.name,
                            value: formModalSlot?.form?.treatment?.id,
                          }
                        : ''
                    }
                    value={
                      formModalSlot?.form?.treatment?.id
                        ? {
                            label: formModalSlot?.form?.treatment?.name,
                            value: formModalSlot?.form?.treatment?.id,
                          }
                        : ''
                    }
                    errorMessage={errors?.treatment?.message}
                    onChange={(item) => {
                      handleSetForm('batchNumber', '');
                      handleSetForm('expirationDate', '');
                      onChange(item.value);
                      handleSetForm('treatment', item.value);
                    }}
                    isDisabled={
                      healthFacilities.isLoading || isDisableHealthFacility()
                    }
                  />
                )}
              />
            </div>
            <div className={cx('grid gap-2')}>
              <Typography variant='bodyXSmall' color=''>
                Dokter Yang Bertugas
              </Typography>
              <Controller
                name='doctor'
                control={control}
                defaultValue={
                  formModalSlot?.form?.doctor?.id
                    ? {
                        label: formModalSlot?.form?.doctor?.name,
                        value: formModalSlot?.form?.doctor?.id,
                      }
                    : ''
                }
                render={({ field: { onChange, name, ref } }) => (
                  <SelectBox
                    required
                    name={name}
                    inputRef={ref}
                    placeholder='Pilih dokter'
                    options={listSelectDoctor}
                    defaultValue={
                      formModalSlot?.form?.doctor?.id
                        ? {
                            label: formModalSlot?.form?.doctor?.name,
                            value: formModalSlot?.form?.doctor?.id,
                          }
                        : ''
                    }
                    value={
                      formModalSlot?.form?.doctor?.id
                        ? {
                            label: formModalSlot?.form?.doctor?.name,
                            value: formModalSlot?.form?.doctor?.id,
                          }
                        : ''
                    }
                    errorMessage={errors?.doctor?.message}
                    onChange={(item) => {
                      onChange(item.value);
                      handleSetForm('doctor', item.value);
                    }}
                    isDisabled={
                      !formModalSlot?.form?.treatment?.id ||
                      isDisableHealthFacility()
                    }
                  />
                )}
              />
            </div>
          </div>
          {formModalSlot?.form?.treatment.type === 'vaccination' && (
            <div className='flex flex-col gap-2 mt-4'>
              <Typography variant='bodyXSmall' color=''>
                Detail Vaksin <span className={cx('text-danger')}>*</span>:
              </Typography>
              <Card background='bg-graySeptenary' padding='p-4'>
                {formModalSlot?.form?.additionalData?.map((data, index) => (
                  <Fragment key={index}>
                    {index > 0 && (
                      <div className='my-3'>
                        <hr
                          className='bg-grayDarkBg'
                          style={{ height: '2px' }}
                        />
                      </div>
                    )}
                    <div className='w-full flex flex-col gap-2 mb-2'>
                      <Typography variant='bodyXSmall' color=''>
                        Nama Vaksin {index + 1}{' '}
                        <span className={cx('text-danger')}>*</span>
                      </Typography>
                      <div className='flex w-full'>
                        <div className='w-full'>
                          <Controller
                            name={`additionalData[${index}].vaccine`}
                            control={control}
                            defaultValue={mapOptionsVaccine()?.find(
                              (item: any) =>
                                item.label === data?.vaccine?.kfa?.display
                            )}
                            render={({ field: { onChange, name, ref } }) => (
                              <SelectBox
                                name={name}
                                inputRef={ref}
                                placeholder='Pilih vaksin'
                                options={mapOptionsVaccine()}
                                defaultValue={mapOptionsVaccine()?.find(
                                  (item: any) =>
                                    item.label === data?.vaccine?.kfa?.display
                                )}
                                errorMessage={
                                  errors.additionalData
                                    ? errors.additionalData[
                                        index
                                      ]?.vaccine?.message?.toString()
                                    : ''
                                }
                                onChange={(item) => {
                                  onChange(item.value);
                                  handleSetAdditionalDataItem(
                                    index,
                                    'vaccine',
                                    item.value
                                  );
                                }}
                                required
                              />
                            )}
                          />
                        </div>
                        <div>
                          {index === 0 ? (
                            <Button
                              class='button'
                              text=''
                              customClassIcon='!mr-0'
                              iconButton={() => (
                                <AddCircleIcon color='#0A0A0A' />
                              )}
                              onClick={handleSetAddAdditionalDataForm}
                            />
                          ) : (
                            <Button
                              class='button'
                              text=''
                              customClassIcon='!mr-0'
                              iconButton={() => (
                                <TrashBigIcon color='#0A0A0A' />
                              )}
                              onClick={() =>
                                handleSetRemoveAdditionalDataForm(index)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <FormSlotBatch
                      index={index}
                      control={control}
                      register={register}
                      errors={errors}
                    />
                  </Fragment>
                ))}
              </Card>
            </div>
          )}
        </div>

        <div className={cx('flex items-center')}>
          <Button
            size='md'
            text='Batal'
            class='secondary'
            customClassName='w-full mr-2'
            onClick={() => {
              if (id) {
                onClose();
              } else {
                reset();
                handleResetFormModalSlot();
                onClose();
              }
            }}
          />
          <Button
            size='md'
            class='primary'
            loading={formModalSlot.isLoading}
            customClassName='w-full ml-2'
            text={id ? 'Edit' : 'Tambah'}
            disabled={formModalSlot.isLoading}
            onClick={handleSubmit(() =>
              onSubmitSlotReservation(providerId, id)
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default FormModalSlotReservation;
