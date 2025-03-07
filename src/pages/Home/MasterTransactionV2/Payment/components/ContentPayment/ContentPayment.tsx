import { useEffect, useMemo, useState } from 'react';

import { DatePicker, Pagination, SelectBox, TextInput } from '@/src/components';
import { SearchIcon } from '@/src/assets/images/svg';
import { formatDate } from '@/utils/formatDate';
import TableTransaction from '@/src/components/TableTransaction';
import ModalConfirmationPayment from '../ModalConfirmationPayment';
import ModalInvoice from '../InvoiceDocument';
import CardPayment from '../CardPayment';
import usePayment from '@/home/MasterTransactionV2/Payment/usePayment';
import useQuery from '@/src/hooks/useQuery';

const optionSelect = [
  { label: 'Semua Jenis Layanan', value: '' },
  { label: 'Klinik / Rawat Jalan', value: 'Rawat Jalan' },
  { label: 'Imunisasi', value: 'Imunisasi' },
  { label: 'Laboratorium', value: 'Laboratorium' },
];

const optionPaymentSelect = [
  { label: 'Semua Status Pembayaran', value: 'Registrasi' },
  { label: 'Lunas', value: 'Lunas' },
  { label: 'Belum Lunas', value: 'Draft' },
];

const ContentPayment = () => {
  const queryTab = useQuery().get('tab');

  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [dateValue, setDateValue] = useState('');
  const [openInvoice, setOpenInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState('');

  const {
    data: { metadata, params, payments, dataPayments },
    method: {
      handleChangeSearch,
      handleGetListPayment,
      handleClearStatePayment,
      handleSetParams,
      handleClearParams,
      debouncedSearchTerm,
    },
  } = usePayment();

  useEffect(() => {
    return () => handleClearParams();
  }, []);

  useEffect(() => {
    handleClearStatePayment();
    if (queryTab === 'Draft') {
      handleSetParams('status', 'Draft');
    } else if (queryTab === 'Selesai') {
      handleSetParams('status', 'Completed');
    } else if (queryTab === 'Batal') {
      handleSetParams('status', 'Cancelled');
    } else {
      handleSetParams('status', 'Registrasi');
    }
    handleResetDateRange();
  }, [queryTab]);

  useEffect(() => {
    if (!params.status) return;
    handleGetListPayment();
  }, [
    debouncedSearchTerm,
    params.limit,
    params.page,
    params.status,
    params.serviceType,
  ]);

  useEffect(() => {
    handleSetParams('page', 1);
    if (params.status) handleGetListPayment();
    handleDateValue();
  }, [dateRange.end]);

  const handleResetDateRange = () => {
    handleSetParams('startDate', new Date());
    handleSetParams('endDate', new Date());
    setDateRange({ start: null, end: null });
  };

  const handleDateValue = () => {
    if (dateRange.start && dateRange.end) {
      const firstDate = formatDate(dateRange.start, '/', 'MM', false);
      const secondDate = formatDate(dateRange.end, '/', 'MM', false);
      if (firstDate === secondDate) {
        setDateValue(`${firstDate}`);
        return;
      } else {
        setDateValue(`${firstDate} - ${secondDate}`);
        return;
      }
    }
    setDateValue(formatDate(new Date(), '/', 'MM', false));
  };

  const columnNames = useMemo(() => {
    return [
      {
        accessor: 'item',
        id: 'contentData',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        Cell: ({ value }) => {
          return (
            <CardPayment
              data={value}
              onOpenInvoice={(transactionId) => {
                setInvoiceId(transactionId);
                setOpenInvoice(true);
              }}
            />
          );
        },
      },
    ];
  }, []);

  return (
    <>
      {/* Modal Confirmation, Success, and Error */}
      <ModalConfirmationPayment onSuccess={handleGetListPayment} />

      <ModalInvoice
        isOpen={openInvoice}
        transactionId={invoiceId}
        onCancel={() => {
          setInvoiceId('');
          setOpenInvoice(false);
        }}
      />

      <div className='mt-6'>
        <div className='w-full flex justify-between gap-5'>
          <div className='w-[400px]'>
            <TextInput
              name='search'
              placeholder='Cari Antrian/Pasien'
              className='rounded-none'
              containerStyle='rounded-full h-11'
              leftIcon={SearchIcon}
              value={params.search}
              onChange={handleChangeSearch}
            />
          </div>
          <div className='flex gap-2'>
            <SelectBox
              name='provider'
              placeholder='Jenis Layanan'
              className='w-60'
              options={optionSelect}
              value={
                params.serviceType
                  ? optionSelect.find(
                      (item) => item.value === params.serviceType
                    )
                  : ''
              }
              onChange={(item) => {
                handleSetParams('serviceType', item.value);
              }}
            />
            {(!queryTab || queryTab === 'Registrasi') && (
              <SelectBox
                name='provider'
                placeholder='Status Pembayaran'
                className='w-60'
                options={optionPaymentSelect}
                onChange={(item) => handleSetParams('status', item.value)}
                isSearchable
              />
            )}
            <div className='w-72'>
              <DatePicker
                placeholder='Tanggal Pesanan'
                setStartDate={(value) => {
                  setDateRange((prevState) => ({ ...prevState, start: value }));
                  value
                    ? handleSetParams('startDate', value)
                    : handleResetDateRange();
                }}
                setEndDate={(value) => {
                  setDateRange((prevState) => ({ ...prevState, end: value }));
                  handleSetParams('endDate', value);
                  value
                    ? handleSetParams('endDate', value)
                    : handleResetDateRange();
                }}
                value={dateValue}
                isError={false}
                hideMouseLeave={false}
                selectsRange
              />
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <TableTransaction
            columns={columnNames}
            data={dataPayments}
            initialSortBy={[]}
            onSort={() => {}}
            pageCount={metadata.total_page}
            isLoading={payments.isLoading}
            isError={payments.isError}
            errMsg={payments.message}
          />
          <Pagination
            activePage={metadata?.page ?? 1}
            countPages={metadata?.totalPage ?? 1}
            totalData={metadata?.totalData ?? 0}
            totalDataPerPage={metadata?.limit}
            handleClickPage={(value) => handleSetParams('page', value)}
            handleOptionRow={(value) => handleSetParams('limit', value)}
          />
        </div>
      </div>
    </>
  );
};

export default ContentPayment;
