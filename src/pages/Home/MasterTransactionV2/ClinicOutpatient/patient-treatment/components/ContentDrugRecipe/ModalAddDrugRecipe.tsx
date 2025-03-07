import { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import {
  AsyncSelect,
  Button,
  Counter,
  Modal,
  TableV2,
  TextInput,
  Typography,
} from '@/src/components/';
import { TrashBigIcon } from '@/assets/images/svg';
import { mapOptionsIcd } from '@/src/mappers/Transaction';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { getDataListDrug } from '@/client/drug';
import usePatientTreatment from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/usePatientTreatment';

interface ModalAddDrugRecipeProps {
  isOpen: boolean;
  drugData: any;
  onCancel: () => void;
  onSubmit: (value: any) => void;
  onSubmitEdit: (index: number, value: any) => void;
}

const ModalAddDrugRecipe: React.FC<ModalAddDrugRecipeProps> = ({
  isOpen,
  drugData,
  onCancel,
  onSubmit,
  onSubmitEdit,
}) => {
  const { isMobile } = useWindowSize();

  const [nameRecipe, setNameRecipe] = useState('');
  const [total, setTotal] = useState(1);
  const [instruction, setInstruction] = useState('');
  const [listDrug, setListDrug] = useState<any[]>([]);

  const {
    data: { listSelectDrug },
  } = usePatientTreatment();

  useEffect(() => {
    setNameRecipe(drugData?.item_name || '');
    setTotal(drugData?.quantity ?? 1);
    setInstruction(drugData?.instruction ?? '');
    setListDrug(drugData?.concoctionItems ?? []);
  }, [drugData]);

  const handleCloseModal = () => {
    setNameRecipe('');
    setTotal(1);
    setInstruction('');
    setListDrug([]);
    onCancel();
  };

  const handleSubmitModal = () => {
    const data = {
      isEdit: drugData?.isEdit || undefined,
      item: drugData?.item || undefined,
      name: drugData?.name || nameRecipe,
      itemName: nameRecipe,
      unit: 'Racik',
      quantity: total,
      instruction: instruction,
      concoctionItems: listDrug,
      isConcoction: true,
    };
    drugData?.editData ? onSubmitEdit(drugData?.index, data) : onSubmit(data);
    handleCloseModal();
  };

  const handleUpdateQuantity = (rowIndex, value) => {
    setListDrug((prevData) =>
      prevData.map((item, index) =>
        index === rowIndex ? { ...item, quantity: value } : item
      )
    );
  };

  const handleSearchListDrug = async (search, callback, { listDrugData }) => {
    const response = await getDataListDrug({ search });
    if (response.status === 200) {
      const result = response?.data?.message || [];
      const mapDataDrug = listDrugData.map((item) => item?.name);
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
      Header: 'Nama obat',
      id: 'itemName',
      accessor: 'itemName',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'Variant',
      id: 'unit',
      accessor: 'unit',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'Jumlah',
      id: 'quantity',
      accessor: 'quantity',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return (
          <div className='w-[120px]'>
            <Counter
              value={value}
              onDecrement={(value) => handleUpdateQuantity(row.index, value)}
              onIncrement={(value) => handleUpdateQuantity(row.index, value)}
            />
          </div>
        );
      },
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
          <div className='w-[52px] flex gap-2'>
            <Button
              size='md'
              class='outline'
              customClassName='!rounded-md'
              iconButton={() => <TrashBigIcon color='#0A0A0A' />}
              onClick={() =>
                setListDrug((prevState) =>
                  prevState.filter((item) => item.name !== row.original.name)
                )
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        title='Buat Obat Racikan'
        titleSize='h2'
        style={cx({
          'w-full': isMobile,
          'w-[800px]': !isMobile,
        })}
        closeIcon={false}
      >
        <div className='mt-4'>
          <div className='flex flex-col gap-3 mb-5'>
            <div className='flex'>
              <div className='w-full'>
                <AsyncSelect
                  id='drug'
                  name='drug'
                  label=''
                  placeholder='Tuliskan nama obat'
                  options={listDrugOptions}
                  loadOptions={(inputValue, callback) =>
                    handleSearchListDrug(inputValue, callback, {
                      listDrugData: listDrug,
                    })
                  }
                  onChange={(item) => {
                    setListDrug((prevState) => [
                      ...prevState,
                      {
                        name: item?.value?.name,
                        itemName: item?.value?.item_name,
                        unit: item?.value?.stock_uom,
                        quantity: 1,
                        stock: item?.value?.stock?.actual_qty,
                      },
                    ]);
                  }}
                  isSetValue={false}
                  defaultValue=''
                  hideDropdown
                  required
                />
              </div>
            </div>
            <div>
              <Typography variant='h3' color='' customClass='mb-2'>
                Resep yang diracik
              </Typography>
              <TableV2
                columns={columnNames}
                data={listDrug}
                initialSortBy={[]}
                onSort={() => {}}
                textNotFound='Belum ada resep ditambahkan'
                removeBgStyling
              />
            </div>
            <div className='space-y-3'>
              <Typography variant='h3' color='' customClass='mb-2'>
                Informasi Obat Racikan
              </Typography>
              <div className='w-full flex gap-4'>
                <div className='w-3/4'>
                  <TextInput
                    label='Nama Obat Racik'
                    placeholder='Tuliskan nama obat racik'
                    containerStyle='h-11'
                    value={nameRecipe}
                    onInput={({ target }) => setNameRecipe(target.value)}
                    required
                  />
                </div>
                <div className='w-1/4 h-[44px]'>
                  <Typography variant='bodySmall' color='' customClass='mb-2'>
                    Jumlah Racikan
                    <span className='text-danger'>*</span>
                  </Typography>
                  <Counter
                    value={total}
                    onDecrement={(value) => setTotal(value)}
                    onIncrement={(value) => setTotal(value)}
                  />
                </div>
              </div>
              <div className='flex'>
                <TextInput
                  label='Petunjuk Pemakaian'
                  placeholder='Contoh: Minum tiga kali sehari, sebelum makan'
                  containerStyle='h-11'
                  value={instruction}
                  onInput={({ target }) => setInstruction(target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex gap-2'>
            <Button
              id='cancel-btn'
              class='outline'
              size='md'
              text='Batal'
              onClick={() => handleCloseModal()}
            />
            <Button
              id='save-btn'
              class='primary'
              size='md'
              text='Racik Resep'
              disabled={!nameRecipe || !instruction}
              onClick={handleSubmitModal}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddDrugRecipe;
