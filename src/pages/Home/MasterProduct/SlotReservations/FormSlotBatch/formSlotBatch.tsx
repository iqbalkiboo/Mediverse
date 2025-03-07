import { Controller, useFieldArray } from 'react-hook-form';
import cx from 'classnames';

import {
  Button,
  Card,
  DatePicker,
  TextInput,
  Typography,
} from '@/src/components';
import { AddCircleIcon, TrashBigIcon } from '@/assets/images/svg';
import { formatDate } from '@/utils/formatDate';
import useSlotReservations from '../useSlotReservations';

import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface IFormSlotBatch {
  index: number;
  control: Control;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const FormSlotBatch = ({
  index,
  control,
  register,
  errors,
}: IFormSlotBatch) => {
  const {
    data: { formModalSlot },
    method: {
      handleSetAddAdditionalDataBatchForm,
      handleSetAdditionalDataBatchItem,
      handleSetRemoveAdditionalDataBatchForm,
    },
  } = useSlotReservations();

  const { remove } = useFieldArray({
    control,
    name: `additionalData[${index}].batch`,
  });

  return (
    <Card background='bg-white' padding='p-4'>
      {formModalSlot?.form?.additionalData[index]?.batch?.map(
        (batch, indexBatch) => (
          <div key={indexBatch} className={cx('grid grid-cols-2 gap-4 mb-2')}>
            <div className={cx('grid gap-1')}>
              <Typography variant='bodyXSmall' color=''>
                Batch Number <span className={cx('text-danger')}>*</span>
              </Typography>
              <TextInput
                name={`additionalData[${index}].batch[${indexBatch}].lotNumber`}
                placeholder='Masukkan nomor'
                register={register}
                value={batch?.lotNumber}
                isValid={
                  errors.additionalData
                    ? !errors.additionalData[index]?.batch[indexBatch]
                        ?.lotNumber?.message
                    : true
                }
                errorMessage={
                  errors.additionalData
                    ? errors.additionalData[index]?.batch[
                        indexBatch
                      ]?.lotNumber?.message?.toString()
                    : ''
                }
                onInput={({ target }) =>
                  handleSetAdditionalDataBatchItem(
                    index,
                    indexBatch,
                    'lotNumber',
                    target.value
                  )
                }
                disabled={formModalSlot.isLoading}
                required
              />
            </div>
            <div className={cx('flex')}>
              <div className={cx('grid gap-1')}>
                <Typography variant='bodyXSmall' color=''>
                  Tanggal Kadaluarsa{' '}
                  <span className={cx('text-danger')}>*</span>
                </Typography>
                <Controller
                  control={control}
                  name={`additionalData[${index}].batch[${indexBatch}].expirationDate`}
                  defaultValue={batch?.expirationDate}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      placeholder='dd/mm/yyyy'
                      value={
                        value ? value : formatDate(batch?.expirationDate, '/')
                      }
                      minDate={`${new Date()}`}
                      defaultDate={batch?.expirationDate}
                      isError={
                        errors.additionalData
                          ? !!errors.additionalData[index]?.batch[indexBatch]
                              ?.expirationDate?.message
                          : false
                      }
                      textError={
                        errors.additionalData
                          ? errors.additionalData[index]?.batch[
                              indexBatch
                            ]?.expirationDate?.message?.toString()
                          : ''
                      }
                      select={value}
                      onChangeControl={(date) => {
                        onChange(date);
                        handleSetAdditionalDataBatchItem(
                          index,
                          indexBatch,
                          'expirationDate',
                          date
                        );
                      }}
                      setStartDate={() => {}}
                      setEndDate={() => {}}
                      selectsRange={false}
                      isDisabled={formModalSlot.isLoading}
                      hideMouseLeave={false}
                      closeOnSelect
                      useControl
                      required
                    />
                  )}
                />
              </div>
              <div className='w-1/5 mt-6'>
                {indexBatch === 0 ? (
                  <Button
                    class='button'
                    text=''
                    customClassIcon='!mr-0'
                    iconButton={() => <AddCircleIcon color='#0A0A0A' />}
                    onClick={() => handleSetAddAdditionalDataBatchForm(index)}
                  />
                ) : (
                  <Button
                    class='button'
                    text=''
                    customClassIcon='!mr-0'
                    iconButton={() => <TrashBigIcon color='#0A0A0A' />}
                    onClick={() => {
                      handleSetRemoveAdditionalDataBatchForm(index, indexBatch);
                      remove(indexBatch);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )
      )}
    </Card>
  );
};

export default FormSlotBatch;
