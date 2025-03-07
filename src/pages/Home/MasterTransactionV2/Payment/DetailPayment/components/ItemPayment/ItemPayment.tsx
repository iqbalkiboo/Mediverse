import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Button,
  ButtonDelete,
  Counter,
  TableV2,
  TextInput,
  Typography,
} from '@/src/components';
import { ModalAddItem } from '../../components';
import { AddCircleIcon } from '@/assets/images/svg';
import { formatRupiah } from '@/utils/fromatCurrency';

interface ItemPaymentProps {
  data: any;
  status: string;
  payor: string;
  isLoading: boolean;
  isError: boolean;
  totalPayment: any;
  handleTotalPayment: (value: any) => void;
  handleSetSalesOrder: (value: any) => void;
  isDirect: boolean;
  isDisabled: boolean;
}

const ItemPayment: React.FC<ItemPaymentProps> = ({
  data,
  status,
  payor,
  isLoading,
  isError,
  totalPayment,
  handleTotalPayment,
  handleSetSalesOrder,
  isDirect,
  isDisabled,
}) => {
  const hasRunEffect = useRef(false);
  const discountRefs = useRef<any>([]);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [itemList, setItemList] = useState<any[]>([]);
  const [inputFocus, setInputFocus] = useState(null);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    if (data.length < 1 || hasRunEffect.current) return;
    setItemList(data);
    hasRunEffect.current = true;
  }, [data]);

  useEffect(() => {
    if (isPageLoaded && discountRefs.current?.length) {
      if (inputFocus) discountRefs.current[inputFocus].focus();
    }
  }, [isPageLoaded, itemList]);

  useEffect(() => {
    const totals = itemList.reduce(
      (accumulator, currentItem) => {
        accumulator.totalPrice += currentItem.rate * currentItem.qty;
        accumulator.totalDiscount +=
          currentItem.totalDiscount * currentItem.qty;
        accumulator.totalGrand += currentItem.amount;
        return accumulator;
      },
      { totalPrice: 0, totalDiscount: 0, totalGrand: 0 }
    );
    handleTotalPayment(totals);
    handleSetSalesOrder(itemList);
  }, [itemList]);

  const calculateTotalAmount = (price, discount, quantity) => {
    const discountAmount = price * (discount / 100);
    const discountedPrice = price - discountAmount;
    return discountedPrice * quantity;
  };

  const updateDiscountData = (rowIndex, newDiscount) => {
    setItemList((prevData) => {
      const updatedData = [...prevData];
      const getDiscount = updatedData[rowIndex].rate * newDiscount;
      updatedData[rowIndex].discount = newDiscount;
      updatedData[rowIndex].totalDiscount = getDiscount / 100;
      updatedData[rowIndex].amount = calculateTotalAmount(
        updatedData[rowIndex].rate,
        newDiscount,
        updatedData[rowIndex].qty
      );
      return updatedData;
    });
    setInputFocus(rowIndex);
  };

  const updateQtyData = (rowIndex, value, rate) => {
    setItemList((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex].qty = value;
      updatedData[rowIndex].total = value * rate;
      updatedData[rowIndex].amount = calculateTotalAmount(
        rate,
        updatedData[rowIndex].discount,
        value
      );
      return updatedData;
    });
  };

  const columnNames = useMemo(
    () => [
      {
        Header: isDirect ? 'Detail Item' : 'Detail Layanan/item',
        accessor: 'item_name',
        canSort: true,
        isVisible: true,
        disableSortBy: false,
        Cell: ({ value }) => {
          return (
            <div className='flex gap-2'>
              <p>{value}</p>
              {payor !== 'Umum' && (
                <div className='px-3 rounded-full text-[10px] text-white bg-[#009922]'>
                  Dijamin
                </div>
              )}
            </div>
          );
        },
      },
      {
        Header: 'Satuan',
        accessor: 'unit',
        canSort: true,
        isVisible: true,
        disableSortBy: false,
      },
      {
        Header: 'Jumlah',
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
                    isDisabled={
                      payor !== 'Umum' || row.original.status === 'Completed'
                    }
                  />
                </div>
              )}
            </>
          );
        },
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
        Header: 'Diskon',
        accessor: 'discount',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <>
              {row.original.status === 'Completed' ? (
                <p>{value}%</p>
              ) : (
                <div className='w-24'>
                  <TextInput
                    inputRef={(el) => (discountRefs.current[row.index] = el)}
                    type='number'
                    id='discount'
                    trailingText='%'
                    min={0}
                    max={100}
                    value={value}
                    disabled={
                      payor !== 'Umum' || row.original.status === 'Completed'
                    }
                    onChange={(e) => {
                      if (e.target.value > 100) return;
                      if (!e.target.value) {
                        updateDiscountData(row.index, 0);
                        return;
                      }
                      const newDiscount =
                        e.target.value.length > 1 &&
                        e.target.value.startsWith('0')
                          ? e.target.value.replace(/^0+/, '')
                          : e.target.value;
                      updateDiscountData(row.index, Number(newDiscount));
                    }}
                    onBlur={() => setInputFocus(null)}
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
        isVisible: payor === 'Umum' && status !== 'Completed',
        disableSortBy: true,
        Cell: ({ row }) => {
          const { values } = row;
          return (
            <>
              {row.original.status !== 'Completed' && (
                <ButtonDelete
                  marginTop={10}
                  onClick={() =>
                    setItemList((prevItems) =>
                      prevItems.filter(
                        (item) => item.item_code !== values.item_code
                      )
                    )
                  }
                />
              )}
            </>
          );
        },
      },
    ],
    [payor, status]
  );

  return (
    <>
      <ModalAddItem
        isOpen={openAddItem}
        onCancel={() => setOpenAddItem(false)}
        handleAddData={(data) =>
          setItemList((prevItems) => {
            const exists = prevItems.some(
              (item) => item.item_code === data.item_code
            );

            if (exists) {
              return prevItems.map((item) =>
                item.item_code === data.item_code ? data : item
              );
            } else {
              return [...prevItems, { ...data, totalDiscount: 0 }];
            }
          })
        }
        isDirect={isDirect}
      />

      <div className='mt-8 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <Typography variant='h2' color=''>
            Keranjang {isDirect ? 'Pembelian' : 'Pembayaran'}
          </Typography>
          {payor === 'Umum' && status !== 'Completed' && (
            <div className='w-[300px]'>
              <Button
                class='outline'
                size='md'
                text={isDirect ? 'Item' : 'Layanan/Item'}
                iconButton={() => (
                  <AddCircleIcon color={isDisabled ? '#757575' : '#5600E8'} />
                )}
                onClick={() => setOpenAddItem(true)}
                disabled={isDisabled}
              />
            </div>
          )}
        </div>

        <div className='mb-6'>
          <TableV2
            columns={columnNames}
            data={itemList}
            initialSortBy={[]}
            onSort={() => {}}
            isError={isError}
            isLoading={isLoading}
            showNotFound={false}
            errMsg=''
            pageCount={0}
            removeBgStyling
          />

          {itemList.length < 1 && (
            <div className='text-center text-sm pt-4 text-[#9E9E9E]'>
              Belum ada {isDirect ? 'Item' : 'Layanan/Item'}
            </div>
          )}
        </div>
      </div>

      <div className='w-full flex justify-end'>
        <div className='w-full md:w-[500px]'>
          <div className='border-2 border-grayDarkBg rounded-xl'>
            <div className='flex flex-col gap-4 p-6'>
              <div className='flex justify-between items-center'>
                <Typography
                  variant='bodySmall'
                  color='text-blackText'
                  customClass='font-medium'
                >
                  Total Layanan & Item
                </Typography>
                <Typography
                  variant='bodySmall'
                  color='text-blackText'
                  customClass='font-medium'
                >
                  {itemList.length}
                </Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography
                  variant='bodySmall'
                  color='text-blackText'
                  customClass='font-medium'
                >
                  Total yang harus dibayar
                </Typography>
                <Typography
                  variant='bodySmall'
                  color='text-blackText'
                  customClass='font-medium'
                >
                  {formatRupiah(
                    payor === 'Umum' ? totalPayment?.totalPrice : 0,
                    'Rp'
                  )}
                </Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography
                  variant='bodySmall'
                  color='text-blackText'
                  customClass='font-medium'
                >
                  Total Diskon
                </Typography>
                <Typography
                  variant='bodySmall'
                  color='text-blackText'
                  customClass='font-medium'
                >
                  {formatRupiah(
                    payor === 'Umum' ? totalPayment?.totalDiscount : 0,
                    'Rp'
                  )}
                </Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography
                  variant='bodySmall'
                  color='text-blackText'
                  customClass='font-medium'
                >
                  PPn 11%
                </Typography>
                <Typography
                  variant='bodySmall'
                  color='text-blackText'
                  customClass='font-medium'
                >
                  -
                </Typography>
              </div>
            </div>
            <div className='bg-black text-white rounded-b-xl'>
              <div className='flex justify-between items-center py-3 px-6'>
                <Typography variant='bodySmall' customClass='font-medium'>
                  Grand Total
                </Typography>
                <Typography variant='h2' customClass='font-bold'>
                  {formatRupiah(
                    payor === 'Umum' ? totalPayment?.totalGrand : 0,
                    'Rp'
                  )}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPayment;
