import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { AsyncSelect, Button } from '@/src/components';
import { ButtonPlus, DeleteTrashIcon } from '@/assets/images/svg';
import { getDataListProcedureItem } from '@/client/transaction';
import { mapOptionsIcd } from '@/src/mappers/Transaction';
import usePatientTreatment from '../../usePatientTreatment';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

import type { Control, FieldErrors } from 'react-hook-form';

interface FormICD9Props {
  index: number;
  procedureData: any;
  errors: FieldErrors;
  control: Control;
  onAddAssessment: () => void;
  onRemoveAssessment: (index: number) => void;
  onSetAssessment: (index, label, value) => void;
}

const FormICD9: React.FC<FormICD9Props> = ({
  index,
  procedureData,
  errors,
  control,
  onAddAssessment,
  onRemoveAssessment,
  onSetAssessment,
}) => {
  const [procedureService, setProcedureService] = useState<any[]>([]);
  const [listProcedureService, setListProcedureService] = useState<any[]>([]);

  const {
    data: { listSelectProcedure },
    method: { handleSearchListProcedure },
  } = useTransaction();
  const {
    data: { formProcedure },
    method: { handleSetProcedureService },
  } = usePatientTreatment();

  useEffect(() => {
    if (
      formProcedure.procedureService[index] &&
      formProcedure.procedureService[index].length > 0
    ) {
      setProcedureService(
        formProcedure.procedureService[index].map((procedureService) => ({
          title: procedureService?.item_detail?.item_name,
          value: procedureService,
        }))
      );
      handleGetListProcedureItem(procedureData?.procedure?.procedure);
    } else {
      setProcedureService([]);
    }
  }, []);

  useEffect(() => {
    handleSetProcedureService(
      index,
      procedureService?.map((item) => item?.value)
    );
  }, [procedureService]);

  const handleGetListProcedureItem = async (procedure) => {
    const response = await getDataListProcedureItem({ procedure });
    if (response.status === 200) {
      const result = response?.data?.message || [];
      setListProcedureService(mapOptionsIcd(result, false));
    }
  };

  const handleSearchListProcedureItem = async (search, callback) => {
    const response = await getDataListProcedureItem({
      procedure: procedureData?.procedure?.procedure,
      search,
    });
    if (response.status === 200) {
      const result = response?.data?.message || [];
      const filterResult = result?.filter(
        (item) =>
          !procedureService
            ?.map((service) => service?.value?.item)
            ?.includes(item?.item)
      );
      return callback(mapOptionsIcd(filterResult, false));
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      {index > 0 && (
        <div className='mt-5'>
          <hr className='bg-grayDarkBg' style={{ height: '2px' }} />
        </div>
      )}
      <div className='flex gap-4'>
        <div className='flex-1'>
          <Controller
            name={`procedure.${index}.procedure`}
            control={control}
            defaultValue={
              procedureData?.procedure
                ? {
                    title: procedureData?.procedure?.procedure_name,
                    value: procedureData?.procedure,
                  }
                : ''
            }
            render={({ field: { onChange, name } }) => (
              <AsyncSelect
                id={name}
                name={name}
                label={`Tindakan ${index + 1}`}
                placeholder='Pilih tindakan'
                options={listSelectProcedure?.filter(
                  (item) =>
                    !formProcedure.procedure
                      ?.map((procedure) => procedure?.procedure?.item)
                      ?.includes(item?.value?.item)
                )}
                loadOptions={(inputValue, callback) =>
                  handleSearchListProcedure(inputValue, callback, {
                    procedureList: formProcedure.procedure,
                  })
                }
                defaultValue={
                  procedureData?.procedure
                    ? {
                        title: procedureData?.procedure?.procedure_name,
                        value: procedureData?.procedure,
                      }
                    : ''
                }
                isValid={
                  errors.procedure
                    ? !errors.procedure[index]?.procedure?.message
                    : true
                }
                errorMessage={
                  errors.procedure
                    ? errors.procedure[index]?.procedure?.message?.toString()
                    : ''
                }
                onChange={async (item) => {
                  onChange(item);
                  onSetAssessment(index, 'procedure', item.value);
                  await handleGetListProcedureItem(item.value?.procedure);
                }}
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
              customClassName='!rounded-md'
              iconButton={() => <ButtonPlus color='#0A0A0A' />}
              onClick={onAddAssessment}
            />
          ) : (
            <Button
              size='md'
              class='outline'
              customClassName='!rounded-md'
              iconButton={() => <DeleteTrashIcon color='#0A0A0A' />}
              onClick={() => onRemoveAssessment(index)}
            />
          )}
        </div>
      </div>

      <div className='flex gap-4 mr-[65px]'>
        <div className='flex-1'>
          <AsyncSelect
            id='service-procedure'
            name='service-procedure'
            label=''
            placeholder='Pilih layanan'
            options={listProcedureService?.filter(
              (item) =>
                !procedureService
                  ?.map((service) => service?.value?.item)
                  ?.includes(item?.value?.item)
            )}
            loadOptions={handleSearchListProcedureItem}
            defaultValue={procedureService}
            isDisabled={
              !listProcedureService || listProcedureService.length < 1
            }
            onChange={(value: any[]) => setProcedureService(value)}
            isMulti
            required
          />
        </div>
      </div>
    </div>
  );
};

export default FormICD9;
