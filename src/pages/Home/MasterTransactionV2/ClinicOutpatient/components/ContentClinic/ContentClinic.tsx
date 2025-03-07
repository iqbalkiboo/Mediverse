import { useEffect, useMemo, useState } from 'react';

import { DatePicker, Pagination, SelectBox, TextInput } from '@/src/components';
import { CardClinic, ModalConfirmationClinic } from '../../components';
import { SearchIcon } from '@/src/assets/images/svg';
import { formatDate } from '@/src/utils/formatDate';
import TableTransaction from '@/src/components/TableTransaction';
import useClinicOutpatient from '../../useClinicOutpatient';

import useQuery from '@/src/hooks/useQuery';

const optionSelect = [
  { label: 'Semua Status Pembayaran', value: '' },
  { label: 'Lunas', value: 'Completed' },
  { label: 'Belum Lunas', value: 'Draft' },
];

const ContentClinic = () => {
  const queryTab = useQuery().get('tab');

  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [dateValue, setDateValue] = useState('');

  const {
    data: { metadata, params, clinicOutpatients, dataClinicOutpatients },
    method: {
      handleChangeSearch,
      handleGetListClinicOutpatient,
      handleClearStateClinicOutpatient,
      handleSetParams,
      handleClearParams,
      debouncedSearchTerm,
    },
  } = useClinicOutpatient();

  useEffect(() => {
    return () => handleClearParams();
  }, []);

  useEffect(() => {
    handleClearStateClinicOutpatient();
    if (queryTab === 'Registrasi') {
      handleSetParams('status', 'Registrasi');
    } else if (queryTab === 'Menunggu Tindakan') {
      handleSetParams('status', 'Menunggu Tindakan');
    } else if (queryTab === 'Sudah Ditindak') {
      handleSetParams('status', 'Sudah Ditindak');
    } else if (queryTab === 'Selesai') {
      handleSetParams('status', 'Selesai');
    } else if (queryTab === 'Batal') {
      handleSetParams('status', 'Batal');
    } else {
      handleSetParams('status', 'Registrasi');
    }
    handleResetDateRange();
  }, [queryTab]);

  useEffect(() => {
    if (!params.status) return;
    handleGetListClinicOutpatient();
  }, [
    debouncedSearchTerm,
    params.limit,
    params.page,
    params.status,
    params.serviceType,
  ]);

  useEffect(() => {
    handleSetParams('page', 1);
    if (params.status) handleGetListClinicOutpatient();
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
          return <CardClinic data={value} />;
        },
      },
    ];
  }, []);

  return (
    <>
      {/* Modal Confirmation, Success, and Error */}
      <ModalConfirmationClinic onSuccess={handleGetListClinicOutpatient} />

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
              placeholder='Status Pembayaran'
              className='w-60'
              options={optionSelect}
              onChange={(item) => {
                handleSetParams('serviceType', item.value);
              }}
              isSearchable
            />
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
            data={dataClinicOutpatients}
            initialSortBy={[]}
            onSort={() => {}}
            pageCount={metadata.total_page}
            isLoading={clinicOutpatients.isLoading}
            isError={clinicOutpatients.isError}
            errMsg={clinicOutpatients.message}
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

export default ContentClinic;
