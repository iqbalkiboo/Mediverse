import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AsyncSelect,
  Button,
  Card,
  RadioButton,
  TableV2,
  Typography,
} from '@/src/components';
import { ModalError } from '@/src/commons';
import {
  AddCircleIcon,
  PencilUpdateIcon,
  SuccessIcon,
  TrashBigIcon,
} from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import { getDataListDrug } from '@/client/drug';
import { mapOptionsIcd } from '@/src/mappers/Transaction';
import ModalAddDrug from './ModalAddDrug';
import ModalAddDrugRecipe from './ModalAddDrugRecipe';
import usePatientTreatment from '../../usePatientTreatment';

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

const FormDoctorRecipe = () => {
  const navigate = useNavigate();

  const [selectDrug, setSelectDrug] = useState<any>(null);
  const [modalAddDrug, setModalAddDrug] = useState(false);
  const [modalAddDrugRecipe, setModalAddDrugRecipe] = useState(false);
  const [listDrug, setListDrug] = useState<any[]>([]);
  const [listDeleteDrug, setListDeleteDrug] = useState<any[]>([]);

  const {
    data: { id, formDrugRecipe, listSelectDrug },
    method: {
      handleGetListDrug,
      handleSetModalProcedure,
      handleSetModalDrugRecipe,
      handleSubmitFormDrugRecipe,
      handleDeleteDrugRecipe,
    },
  } = usePatientTreatment();

  useEffect(() => {
    handleSetModalProcedure('isSuccess', false);
    handleGetListDrug();
    setListDeleteDrug([]);
  }, []);

  useEffect(() => {
    if (formDrugRecipe.drug && formDrugRecipe.drug?.length > 0)
      setListDrug(formDrugRecipe.drug);
  }, [formDrugRecipe.drug]);

  useEffect(() => {
    if (formDrugRecipe.isSuccess)
      navigate(
        `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=support`
      );
  }, [formDrugRecipe.isSuccess]);

  const handleSearchListDrug = async (search, callback, { listDrugData }) => {
    const response = await getDataListDrug({ search });
    if (response.status === 200) {
      const result = response?.data?.message || [];
      const mapDataDrug = listDrugData.map((item) => item?.item || item?.name);
      const filterResult = result.filter(
        (drug) => !mapDataDrug.includes(drug?.name)
      );
      return callback(mapOptionsIcd(filterResult, false));
    }
  };

  const listDrugOptions = useMemo(() => {
    if (listSelectDrug?.length < 1) return [];
    const mapDataDrug =
      listDrug && listDrug.length
        ? listDrug?.map((item) => item?.item || item?.name)
        : [];
    const filterOptions = listSelectDrug.filter(
      (drug) => !mapDataDrug.includes(drug?.value?.name)
    );
    return filterOptions || [];
  }, [listDrug, listSelectDrug]);

  const columnNames = [
    {
      Header: 'Detail obat',
      id: 'itemName',
      accessor: 'itemName',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      Cell: ({ row, value }) => {
        return (
          <div>
            <Typography variant='bodySmall' color=''>
              {value}
            </Typography>
            {!row.original.isConcoction && (
              <Typography variant='bodySmall' color='text-grayTertiary'>
                Stok: {row.original.stock}
              </Typography>
            )}

            {row.original.isConcoction &&
              row.original.concoctionItems?.length > 0 && (
                <div className='mt-4 ml-6'>
                  {row.original.concoctionItems?.map((item) => (
                    <div className='mb-2'>
                      <Typography variant='bodySmall' color=''>
                        {item.itemName}
                      </Typography>
                      <Typography variant='bodySmall' color='text-grayTertiary'>
                        Stok: {item.stock}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
          </div>
        );
      },
    },
    {
      Header: 'Jumlah',
      id: 'quantity',
      accessor: 'quantity',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'Satuan',
      id: 'unit',
      accessor: 'unit',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'Petunjuk Pemakaian',
      id: 'instruction',
      accessor: 'instruction',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'Aksi',
      id: 'action',
      accessor: 'action',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-40',
      Cell: ({ row }) => {
        return (
          <div className='flex gap-2'>
            <Button
              size='md'
              class='outline'
              customClassName='!rounded-md'
              iconButton={() => <PencilUpdateIcon color='#0A0A0A' />}
              onClick={() => {
                setSelectDrug({
                  isEdit: row.original.isEdit || undefined,
                  item: row.original.item,
                  name: row.original.name,
                  item_name: row.original.itemName,
                  stock_uom: row.original.unit,
                  quantity: row.original.quantity,
                  instruction: row.original.instruction,
                  concoctionItems: row.original.concoctionItems,
                  editData: true,
                  index: row.index,
                  stock: { actual_qty: row.original.stock },
                });
                row.original.isConcoction
                  ? setModalAddDrugRecipe(true)
                  : setModalAddDrug(true);
              }}
            />
            <Button
              size='md'
              class='outline'
              customClassName='!rounded-md'
              iconButton={() => <TrashBigIcon color='#0A0A0A' />}
              onClick={() => {
                if (row.original.isEdit) {
                  setListDeleteDrug((prevState) => [
                    ...prevState,
                    row.original.name,
                  ]);
                }
                setListDrug((prevState) =>
                  prevState.filter((item) => item.name !== row.original.name)
                );
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ModalError
        isOpen={formDrugRecipe.isError}
        title='Gagal'
        description={formDrugRecipe.errorMessage}
        onCancel={() => handleSetModalDrugRecipe('isError', false)}
      />

      <ModalAddDrug
        isOpen={modalAddDrug}
        drugData={selectDrug}
        onCancel={() => {
          setSelectDrug(null);
          setModalAddDrug(false);
        }}
        onSubmit={(value) => {
          setSelectDrug(null);
          setListDrug((prevState) => [...prevState, value]);
        }}
        onSubmitEdit={(index, value) => {
          setSelectDrug(null);
          setListDrug((prevState) =>
            prevState.map((item, i) => (i === index ? value : item))
          );
        }}
      />
      <ModalAddDrugRecipe
        isOpen={modalAddDrugRecipe}
        drugData={selectDrug}
        onCancel={() => {
          setSelectDrug(null);
          setModalAddDrugRecipe(false);
        }}
        onSubmit={(value) => {
          setSelectDrug(null);
          setListDrug((prevState) => [...prevState, value]);
        }}
        onSubmitEdit={(index, value) => {
          setSelectDrug(null);
          setListDrug((prevState) =>
            prevState.map((item, i) => (i === index ? value : item))
          );
        }}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='gap-4'>
          <Typography variant='h4' color='' customClass='mb-2'>
            RESEP OBAT
          </Typography>
          <Card padding='p-3' customClassName='border-1 pb-4'>
            <div className='flex'>
              <div className='flex-1'>
                <Typography variant='h3' color=''>
                  Daftar Obat
                </Typography>
              </div>
              <div className='flex gap-6 mr-4'>
                {drugOptions.map((item) => (
                  <RadioButton
                    key={item.label}
                    id={item.value}
                    name='drugType'
                    containerClass='w-full hover:cursor-pointer'
                    label={item.label}
                    value={item.value}
                    htmlFor={item.value}
                    checked={item.value === formDrugRecipe.hasDrugRecipe}
                    onClick={() => {
                      handleSetModalDrugRecipe('hasDrugRecipe', item.value);
                      if (item.value === 'no') setListDrug([]);
                    }}
                    onChange={({ target }) => {
                      handleSetModalDrugRecipe('hasDrugRecipe', target.value);
                      if (target.value === 'no') setListDrug([]);
                    }}
                  />
                ))}
              </div>
            </div>

            {formDrugRecipe.hasDrugRecipe === 'yes' && (
              <div>
                <div className='flex justify-between mt-5 mb-3'>
                  <div className='w-2/5'>
                    <AsyncSelect
                      id='drug'
                      name='drug'
                      label=''
                      placeholder='Cari nama obat'
                      options={listDrugOptions}
                      loadOptions={(inputValue, callback) =>
                        handleSearchListDrug(inputValue, callback, {
                          listDrugData: listDrug,
                        })
                      }
                      onChange={(item) => {
                        setSelectDrug(item.value);
                        setModalAddDrug(true);
                      }}
                      isSetValue={false}
                      defaultValue=''
                      hideDropdown
                      required
                    />
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <Button
                      text='Obat Racikan'
                      class='outline'
                      customClassName='!rounded-md'
                      iconButton={() => <AddCircleIcon color='#5600E8' />}
                      onClick={() => setModalAddDrugRecipe(true)}
                    />
                  </div>
                </div>

                <TableV2
                  columns={columnNames}
                  data={listDrug}
                  initialSortBy={[]}
                  onSort={() => {}}
                  textNotFound='Tidak ada Resep Obat'
                  removeBgStyling
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
                  `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=procedure`
                )
              }
            />
          </div>
          <div className='w-1/3'>
            <Button
              text='Simpan & Selanjutnya  '
              size='md'
              customClassName='!rounded-md'
              iconButton={() => <SuccessIcon color='#FFFFFF' />}
              disabled={
                formDrugRecipe.hasDrugRecipe !== 'no' && listDrug.length < 1
              }
              loading={formDrugRecipe.isLoading}
              onClick={async () => {
                await handleSubmitFormDrugRecipe(listDrug);
                await handleDeleteDrugRecipe(listDeleteDrug);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormDoctorRecipe;
