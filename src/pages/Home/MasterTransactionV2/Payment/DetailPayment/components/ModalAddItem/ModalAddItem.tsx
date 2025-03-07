import { useEffect, useMemo, useState } from 'react';

import { Button, Counter, Modal, TableV2, TextInput } from '@/src/components/';
import { SearchIcon } from '@/assets/images/svg';
import { formatRupiah } from '@/utils/fromatCurrency';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';
import useDebounce from '@/utils/debounce';

interface ModalAddItemProps {
  isOpen: boolean;
  onCancel: () => void;
  handleAddData: (data: any) => void;
  isDirect: boolean;
}

const ModalAddItem: React.FC<ModalAddItemProps> = ({
  isOpen,
  onCancel,
  handleAddData,
  isDirect,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [listData, setListData] = useState<any[]>([]);

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const {
    data: { moduleOtherItem },
    method: { handleGetListItemOther },
  } = useTransaction();

  useEffect(() => {
    return () => {
      setSearchValue('');
      setListData([]);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) setSearchValue('');
  }, [isOpen]);

  useEffect(() => {
    handleGetListItemOther(searchValue, isDirect);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setListData(mapListData(moduleOtherItem?.data));
  }, [moduleOtherItem?.data]);

  const handleClose = () => {
    onCancel();
  };

  const updateQtyData = (rowIndex, value, rate) => {
    setListData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex].qty = value;
      updatedData[rowIndex].amount = value * rate;
      return updatedData;
    });
  };

  const mapListData = (data) => {
    if (!data || data.length < 1) return [];
    return data?.map((item) => ({
      amount: item?.valuation_rate,
      item_code: item?.item_code,
      item_name: item?.item_name,
      qty: 1,
      rate: item?.valuation_rate,
      unit: item?.stock_uom,
      discount: 0,
    }));
  };

  const columnNames = useMemo(
    () => [
      {
        Header: 'Detail Layanan',
        accessor: 'item_name',
        canSort: true,
        isVisible: true,
        disableSortBy: false,
      },
      {
        Header: 'Satuan',
        accessor: 'unit',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
      },
      {
        Header: 'Harga',
        accessor: 'rate',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        Cell: ({ value }) => {
          return <p>{formatRupiah(value, 'Rp')}</p>;
        },
      },
      {
        Header: 'Jumlah/Unit',
        accessor: 'qty',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        Cell: ({ row }) => {
          const { index, values } = row;
          return (
            <>
              {row.original.status === 'Completed' ? (
                <p>{values.qty}</p>
              ) : (
                <div className='w-[120px]'>
                  <Counter
                    key={index}
                    value={values.qty}
                    onDecrement={(value) =>
                      updateQtyData(index, value, values.rate)
                    }
                    onIncrement={(value) =>
                      updateQtyData(index, value, values.rate)
                    }
                    isDisabled={false}
                  />
                </div>
              )}
            </>
          );
        },
      },
      {
        Header: 'Total Harga',
        accessor: 'amount',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        Cell: ({ row }) => {
          const { values } = row;
          return <p>{formatRupiah(values.amount, 'Rp')}</p>;
        },
      },
      {
        Header: 'Aksi',
        accessor: 'item_code',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <Button
              size='sm'
              text='Tambah'
              class='outline'
              customClassName='w-full'
              onClick={() => handleAddData(row.original)}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      style={'w-full md:w-[937px]'}
      title='Tambah Item'
      titleSize='h1'
      titleColor='text-primary'
    >
      <div className='mt-6'>
        <div className='w-[400px]'>
          <TextInput
            name='search'
            placeholder='Cari item'
            className='rounded-none'
            containerStyle='rounded-full h-11'
            leftIcon={SearchIcon}
            value={searchValue}
            onInput={({ target }) => setSearchValue(target.value)}
          />
        </div>
      </div>

      <div className='mt-3 mb-6 overflow-auto scrollbar-visible'>
        <TableV2
          columns={columnNames}
          data={listData}
          initialSortBy={[]}
          onSort={() => {}}
          isError={moduleOtherItem.isError}
          isLoading={moduleOtherItem.isLoading}
          pageCount={0}
          removeBgStyling
        />
      </div>
    </Modal>
  );
};

export default ModalAddItem;
