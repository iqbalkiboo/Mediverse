import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DatePicker, Pagination, SelectBox, TextInput } from '@/src/components';
import { CardQueue, CardTransaction, ModalCallPatient } from '../../components';
import { ModalConfirmationClinic } from '@/home/MasterTransactionV2/ClinicOutpatient/components';
import { ModalConfirmationVaccination } from '@/home/MasterTransactionV2/Vaccination/components';
import { ROUTES_TRANSACTION } from '@/src/constants';
import { SearchIcon } from '@/assets/images/svg';
import { formatDate } from '@/utils/formatDate';
import TableTransaction from '@/src/components/TableTransaction';
import useQuery from '@/src/hooks/useQuery';
import useQueue from '../../useQueue';

const optionServiceSelect = [
  { label: 'Semua Jenis Layanan', value: '' },
  { label: 'Klinik / Rawat Jalan', value: 'Rawat Jalan' },
  { label: 'Imunisasi', value: 'Imunisasi' },
  { label: 'Laboratorium', value: 'Laboratorium' },
];

const optionPaymentSelect = [
  { label: 'Semua Status Pembayaran', value: '' },
  { label: 'Lunas', value: 'Completed' },
  { label: 'Belum Lunas', value: 'Draft' },
];

const ContentQueue = () => {
  const queryTab = useQuery().get('tab');
  const navigate = useNavigate();

  const [openCall, setOpenCall] = useState(false);
  const [queueName, setQueueName] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [dateValue, setDateValue] = useState('');

  const {
    data: {
      metadata,
      params,
      queues,
      transactions,
      dataQueues,
      dataTransactions,
    },
    method: {
      handleGetListQueue,
      handleGetListTransaction,
      handleClearStateQueue,
      handleSetParams,
      handleClearParams,
      handleChangeSearch,
      debouncedSearchTerm,
    },
  } = useQueue();

  useEffect(() => {
    setQueueName('');
    return () => {
      setQueueName('');
      handleClearParams();
    };
  }, []);

  useEffect(() => {
    handleClearStateQueue();
    if (queryTab === 'Registrasi') {
      handleSetParams('status', 'Registrasi');
    } else if (queryTab === 'Menunggu Tindakan') {
      handleSetParams('status', 'Menunggu Tindakan');
    } else if (queryTab === 'Selesai') {
      handleSetParams('status', 'Selesai');
    } else if (queryTab === 'Batal') {
      handleSetParams('status', 'Batal');
    } else {
      handleSetParams('status', 'Antrian');
    }
    handleResetDateRange();
  }, [queryTab]);

  useEffect(() => {
    handleGetListData();
  }, [
    debouncedSearchTerm,
    params.limit,
    params.page,
    params.status,
    params.queueType,
    params.serviceType,
  ]);

  useEffect(() => {
    handleSetParams('page', 1);
    handleGetListData();
    handleDateValue();
  }, [dateRange.end]);

  const handleGetListData = async () => {
    if (!params.status) return;
    if (params.status === 'Antrian') {
      await handleGetListQueue();
    } else {
      await handleGetListTransaction();
    }
  };

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
        id: 'item',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        Cell: ({ value }) => {
          return (
            <>
              {value?.type_registration &&
              value?.type_registration === 'Dibantu Oleh Petugas' ? (
                <CardQueue
                  data={value}
                  onChange={() => {
                    setOpenCall(true);
                    setQueueName(value.name);
                  }}
                />
              ) : (
                <CardTransaction data={value} />
              )}
            </>
          );
        },
      },
    ];
  }, []);

  return (
    <>
      <ModalConfirmationClinic onSuccess={handleGetListData} />
      <ModalConfirmationVaccination onSuccess={handleGetListData} />

      <ModalCallPatient
        isOpen={openCall}
        onCancel={() => setOpenCall(false)}
        onSubmit={() => {
          setOpenCall(false);
          navigate(`${ROUTES_TRANSACTION.REGISTER}/${queueName}`);
        }}
      />

      <div className='mt-6'>
        <div className='w-full flex justify-between gap-5'>
          <div className='w-[400px]'>
            {params.status !== 'Antrian' && (
              <TextInput
                name='search'
                placeholder='Cari Antrian/Pasien'
                className='rounded-none'
                containerStyle='rounded-full h-11'
                leftIcon={SearchIcon}
                value={params.search}
                onChange={handleChangeSearch}
              />
            )}
          </div>
          <div className='flex gap-2'>
            {params.status !== 'Antrian' && (
              <>
                <SelectBox
                  name='queueType'
                  placeholder='Jenis Layanan'
                  className='w-60'
                  options={optionServiceSelect}
                  onChange={(item) => {
                    handleSetParams('queueType', item.value);
                  }}
                />
                <SelectBox
                  name='serviceType'
                  placeholder='Status Pembayaran'
                  className='w-60'
                  options={optionPaymentSelect}
                  onChange={(item) => {
                    handleSetParams('serviceType', item.value);
                  }}
                />
              </>
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
            data={
              params.status
                ? params.status === 'Antrian'
                  ? dataQueues
                  : dataTransactions
                : []
            }
            initialSortBy={[]}
            onSort={() => {}}
            pageCount={metadata.total_page}
            isLoading={queues.isLoading || transactions.isLoading}
            isError={queues.isError || transactions.isError}
            errMsg={queues.message || transactions.message}
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

export default ContentQueue;
