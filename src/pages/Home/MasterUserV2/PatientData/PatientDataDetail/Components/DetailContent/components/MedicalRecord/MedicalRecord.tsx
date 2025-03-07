import { useEffect, useMemo } from 'react';

import { DatePicker, SelectBox, TableV2, Button } from '@/src/components';
import { DownloadIcon, EyeIcon } from '@/src/assets/images/svg';
import { formatDateWithDay } from '@/utils/formatDate';
import usePatientData from '../../../../../usePatientData';

interface MedicalRecordProps {
  patientId: string;
}

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

const MedicalRecord: React.FC<MedicalRecordProps> = ({ patientId }) => {
  const {
    data: { medicalRecords },
    method: { handleGetMedicalRecord },
  } = usePatientData();

  useEffect(() => {
    if (patientId) handleGetMedicalRecord(patientId);
  }, [patientId]);

  const columnNames = useMemo(
    () => [
      {
        Header: 'Tanggal Kunjungan',
        accessor: 'arrival',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        width: 'w-[25%]',
        Cell: ({ value }) => {
          return <p>{formatDateWithDay(value)}</p>;
        },
      },
      {
        Header: 'Layanan',
        accessor: 'queue_type',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        width: 'w-[20%]',
      },
      {
        Header: 'Jenis Layanan',
        accessor: 'items',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        width: 'w-[45%]',
        Cell: ({ value }) => {
          return <p>{value.map((item) => item.item_name).join(', ')}</p>;
        },
      },
      {
        Header: 'Aksi',
        accessor: 'item_code',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        width: 'w-[10%]',
        Cell: () => {
          return (
            <div className='flex gap-2'>
              <div className='w-20px'>
                <Button
                  size='md'
                  class='outline'
                  customClassName='!rounded-md'
                  iconButton={() => <EyeIcon color='#0A0A0A' />}
                  onClick={() => {}}
                />
              </div>
              <div className='w-20px'>
                <Button
                  size='md'
                  class='outline'
                  customClassName='!rounded-md'
                  iconButton={() => <DownloadIcon color='#0A0A0A' />}
                  onClick={() => {}}
                />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className='border-2 border-solid rounded-lg p-4 mt-4'>
      <div className='flex flex-col'>
        <div className='flex justify-end gap-2 mt-2'>
          <SelectBox
            name='queueType'
            placeholder='Layanan'
            className='w-60'
            options={optionServiceSelect}
            onChange={() => {}}
          />
          <SelectBox
            name='serviceType'
            placeholder='Status Pembayaran'
            className='w-60'
            options={optionPaymentSelect}
            onChange={() => {}}
          />
          <div className='w-72'>
            <DatePicker
              placeholder='Tanggal Pesanan'
              setStartDate={() => {}}
              setEndDate={() => {}}
              isError={false}
              hideMouseLeave={false}
              selectsRange
            />
          </div>
        </div>

        <div className='mt-2'>
          <TableV2
            columns={columnNames}
            data={medicalRecords.data || []}
            initialSortBy={[]}
            onSort={() => {}}
            showNotFound={false}
            errMsg=''
            pageCount={0}
            removeBgStyling
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
