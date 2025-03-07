import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  AsyncSelect,
  RadioButton,
  SelectBox,
  TextInput,
  Typography,
} from '@/src/components';
import { getDataListBatch, getDetailItem } from '@/client/transaction';
import { formatDate } from '@/utils/formatDate';
import useVaccinationTreatment from '../../../useVaccinationTreatment';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

interface FormTreatmentCardProps {
  index: number;
  data: any;
}

const FormTreatmentCard: React.FC<FormTreatmentCardProps> = ({
  index,
  data,
}) => {
  const [batchOptions, setBatchOptions] = useState<any[]>([]);
  const [dosageSequenceOptions, setDosageSequenceOptions] = useState<any[]>([]);

  const {
    data: { listSelectIcd9, listSelectImmunizationCategory },
    method: { handleSearchListIcd9, handleSearchListImmunizationCategory },
  } = useTransaction();
  const {
    data: { controlProcedure, errorsProcedure },
    method: { handleSetProcedureItem, setValueProcedure, registerProcedure },
  } = useVaccinationTreatment();

  useEffect(() => {
    if (data?.vaccine?.code) {
      handleGetListBatch(data?.vaccine?.code);
      handleGetDetailItem(data?.vaccine?.code);
    }
  }, [data?.vaccine?.code]);

  useEffect(() => {
    if (data?.vaccine?.dosage_sequence)
      mapOptionsDosageSequence(data.vaccine.dosage_sequence);
  }, [data?.vaccine?.dosage_sequence]);

  const handleGetListBatch = async (id) => {
    const response = await getDataListBatch(id);
    if (response.status === 200) {
      const result = response?.data?.data || [];
      let resultOptions = [];
      if (result?.length > 0) {
        resultOptions = result.map((batch) => {
          return {
            label: batch?.batch_id,
            value: batch,
          };
        });
      }
      setBatchOptions(resultOptions);
    }
  };

  const handleGetDetailItem = async (id) => {
    const response = await getDetailItem(id);
    if (response.status === 200) {
      const result = response?.data?.data || [];
      const vaccineData = {
        ...data.vaccine,
        route: result?.vaccine_route,
        routeName: result?.vaccine_route_display,
        dosage_sequence: result?.vaccine_sequence
          ? Number(result?.vaccine_sequence)
          : '',
      };
      handleSetProcedureItem(index, 'vaccine', vaccineData);
    }
  };

  const mapOptionsDosageSequence = (total: number) => {
    if (!total || total === 0) return;
    const options = Array.from(Array(total), (_, i) => ({
      label: (i + 1).toString(),
      value: i + 1,
    }));
    setDosageSequenceOptions(options);
  };

  const handleChangeBatchNumber = (index: number, value: any) => {
    handleSetProcedureItem(index, 'lot_number', value.name);
    handleSetProcedureItem(index, 'expiration_date', value.expiry_date);
  };

  const getErrorField = (index: number, field: string) => {
    return errorsProcedure.procedure
      ? errorsProcedure.procedure[index]?.[field]?.message
      : '';
  };

  return (
    <div className='flex flex-col gap-4'>
      {index > 0 && (
        <div className='mt-5'>
          <hr className='bg-grayDarkBg' style={{ height: '2px' }} />
        </div>
      )}
      <div>
        <Controller
          name={`procedure.${index}.procedure`}
          control={controlProcedure}
          defaultValue={
            data?.procedure
              ? {
                  title:
                    data?.procedure?.code + ' - ' + data?.procedure?.display,
                  value: data?.procedure,
                }
              : ''
          }
          render={({ field: { onChange, name } }) => (
            <AsyncSelect
              id={name}
              name={name}
              label={`Tindakan ${index + 1}`}
              placeholder='Pilih tindakan'
              options={listSelectIcd9}
              loadOptions={handleSearchListIcd9}
              defaultValue={
                data?.procedure
                  ? {
                      title:
                        data?.procedure?.code +
                        ' - ' +
                        data?.procedure?.display,
                      value: data?.procedure,
                    }
                  : ''
              }
              isValid={
                errorsProcedure.procedure
                  ? !errorsProcedure.procedure[index]?.procedure?.message
                  : true
              }
              errorMessage={
                errorsProcedure.procedure
                  ? errorsProcedure.procedure[
                      index
                    ]?.procedure?.message?.toString()
                  : ''
              }
              onChange={(item) => {
                onChange(item);
                handleSetProcedureItem(index, 'procedure', item.value);
              }}
              required
            />
          )}
        />
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <div>
          <Controller
            name={`procedure.${index}.vaccine_category`}
            control={controlProcedure}
            defaultValue={
              listSelectImmunizationCategory?.find(
                (item) => item.title === data?.vaccine_category?.display
              ) ?? ''
            }
            render={({ field: { onChange, name } }) => (
              <AsyncSelect
                id={name}
                name={name}
                label='Kategori Imunisasi'
                placeholder='Pilih kategori'
                options={listSelectImmunizationCategory}
                loadOptions={handleSearchListImmunizationCategory}
                defaultValue={
                  listSelectImmunizationCategory?.find(
                    (item) => item.title === data?.vaccine_category?.display
                  ) ?? ''
                }
                isValid={
                  errorsProcedure.procedure
                    ? !errorsProcedure.procedure[index]?.vaccine_category
                        ?.message
                    : true
                }
                errorMessage={
                  errorsProcedure.procedure
                    ? errorsProcedure.procedure[
                        index
                      ]?.vaccine_category?.message?.toString()
                    : ''
                }
                onChange={(item) => {
                  onChange(item);
                  handleSetProcedureItem(index, 'vaccine_category', item.value);
                }}
                required
              />
            )}
          />
        </div>
        <div>
          <Typography variant='bodySmall' color='' customClass='mb-2'>
            Booster
            <span className='text-danger'>*</span>
          </Typography>
          <div className='flex gap-6 mt-5'>
            <Controller
              name={`procedure[${index}].is_booster`}
              control={controlProcedure}
              render={({ field: { onChange, name } }) => (
                <>
                  <RadioButton
                    id='booster-ya-radio'
                    name={name}
                    label='Ya'
                    value='ya'
                    htmlFor='booster-ya-radio'
                    checked={data.is_booster === true}
                    onChange={() => {
                      handleSetProcedureItem(index, 'is_booster', true);
                      setValueProcedure(`procedure[${index}].is_booster`, true);
                      onChange(true);
                    }}
                    customClassName='w-4 h-4'
                  />
                  <RadioButton
                    id='booster-tidak-radio'
                    name={name}
                    label='Tidak'
                    value='tidak'
                    htmlFor='booster-tidak-radio'
                    checked={data.is_booster === false}
                    onChange={() => {
                      handleSetProcedureItem(index, 'is_booster', false);
                      handleSetProcedureItem(
                        index,
                        'dosage_sequence_number',
                        ''
                      );
                      setValueProcedure(
                        `procedure[${index}].dosage_sequence_number`,
                        ''
                      );
                      setValueProcedure(
                        `procedure[${index}].is_booster`,
                        false
                      );
                      onChange(false);
                    }}
                    customClassName='w-4 h-4'
                  />
                </>
              )}
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-1'>
          <Controller
            name={`procedure[${index}].lot_number`}
            control={controlProcedure}
            render={({ field: { onChange, name, ref } }) => (
              <SelectBox
                inputRef={ref}
                name={name}
                label='Nomor Batch'
                placeholder='Pilih batch'
                options={batchOptions}
                value={
                  batchOptions.find(
                    (item: any) => item.label === data.lot_number
                  ) ?? ''
                }
                errorMessage={getErrorField(index, 'lot_number')?.toString()}
                onChange={({ value }) => {
                  onChange(value.name);
                  handleChangeBatchNumber(index, value);
                }}
                required
                isSearchable
              />
            )}
          />
        </div>
        <div className='col-span-2'>
          <TextInput
            id='vaccine_name'
            label='Nama Vaksin'
            value={data.vaccine?.name ?? ''}
            onChange={() => {}}
            required
            disabled
          />
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <TextInput
          id='expiration_date'
          label='Expired Date'
          value={
            data.expiration_date ? formatDate(data.expiration_date, '/') : ''
          }
          required
          disabled
        />
        <TextInput
          id='vaccine_route'
          label='Rute Pemberian?'
          value={data.vaccine?.routeName ?? ''}
          required
          disabled
        />
        <Controller
          name={`procedure[${index}].dosage_sequence`}
          control={controlProcedure}
          render={({ field: { onChange, name, ref } }) => (
            <SelectBox
              inputRef={ref}
              name={name}
              id='dosage_sequence'
              label='Urutan Dosis Imunisasi'
              placeholder='Pilih dosis ke'
              className='h-12'
              options={dosageSequenceOptions}
              isDisabled={!data.vaccine?.dosage_sequence}
              value={dosageSequenceOptions?.filter(
                (item) => item.value === data.dosage_sequence
              )}
              errorMessage={getErrorField(index, 'dosage_sequence')?.toString()}
              onChange={({ value }) => {
                onChange(value);
                handleSetProcedureItem(index, 'dosage_sequence', value);
              }}
              required
            />
          )}
        />
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-1'>
          <TextInput
            name={`procedure[${index}].titer_result`}
            id='titer'
            label='Hasil Uji Titer'
            placeholder='Masukkan hasil'
            value={data.titer_result ?? ''}
            register={registerProcedure}
            isValid={!getErrorField(index, 'titer_result')}
            errorMessage={getErrorField(index, 'titer_result')?.toString()}
            onInput={({ target }) =>
              handleSetProcedureItem(index, 'titer_result', target.value)
            }
          />
        </div>
        <div className='col-span-1'>
          <Typography variant='bodySmall' color='' customClass='mb-2'>
            Protektif
            <span className='text-danger'>*</span>
          </Typography>
          <div className='flex gap-6 mt-5'>
            <Controller
              name={`procedure[${index}].is_protektif`}
              control={controlProcedure}
              render={({ field: { onChange, name } }) => (
                <>
                  <RadioButton
                    id='protektif-ya-radio'
                    name={name}
                    label='Ya'
                    value='ya'
                    htmlFor='protektif-ya-radio'
                    checked={data.is_protektif === true}
                    onChange={() => {
                      handleSetProcedureItem(index, 'is_protektif', true);
                      setValueProcedure(
                        `procedure[${index}].is_protektif`,
                        true
                      );
                      onChange(true);
                      handleSetProcedureItem(index, 'description', '');
                      setValueProcedure(`procedure[${index}].description`, '');
                    }}
                    customClassName='w-4 h-4'
                  />
                  <RadioButton
                    id='protektif-tidak-radio'
                    name={name}
                    label='Tidak'
                    value='tidak'
                    htmlFor='protektif-tidak-radio'
                    checked={data.is_protektif === false}
                    onChange={() => {
                      handleSetProcedureItem(index, 'is_protektif', false);
                      setValueProcedure(
                        `procedure[${index}].is_protektif`,
                        false
                      );
                      onChange(false);
                    }}
                    customClassName='w-4 h-4'
                  />
                </>
              )}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <TextInput
            name={`procedure[${index}].description`}
            id='description'
            label='Keterangan'
            placeholder='Masukkan Data'
            value={data.description ?? ''}
            register={registerProcedure}
            isValid={!getErrorField(index, 'description')}
            errorMessage={getErrorField(index, 'description')?.toString()}
            onInput={({ target }) =>
              handleSetProcedureItem(index, 'description', target.value)
            }
            disabled={data.is_protektif === true}
            required={data.is_protektif === false}
          />
        </div>
      </div>
    </div>
  );
};

export default FormTreatmentCard;
