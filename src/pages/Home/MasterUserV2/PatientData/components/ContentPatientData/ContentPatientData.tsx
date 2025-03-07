import { useState } from 'react';

import {
  Button,
  Pagination,
  TableV2,
  TextInput,
  Typography,
} from '@/src/components';
import { ModalAddPatient } from './components';
import { AddIcon } from '@/assets/images/svg';
import { formatDate } from '@/utils/formatDate';
import useContentPatientData from './useContentPatientData';

interface ContentPatientDataProps {
  onPatientAction: (data: any) => void;
  onSubmitAddPatient: (data: any) => void;
  successTitle?: string;
  successDescription?: string;
}

const ContentPatientData: React.FC<ContentPatientDataProps> = ({
  onPatientAction,
  onSubmitAddPatient,
  successTitle,
  successDescription,
}) => {
  const {
    data: { listPatient, listPatientData },
    method: { handleGetListPatient },
  } = useContentPatientData();

  const [isSearched, setIsSearched] = useState(false);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const columnNames = [
    {
      Header: 'NAMA PASIEN',
      accessor: 'patient_name',
      id: 'patient_name',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      Cell: (values: any) => {
        const { no_identifier, patient_name, sex } = values.cell.row.original;
        return (
          <div className='flex flex-col'>
            <Typography variant='bodySmall'>{patient_name}</Typography>
            <div className='flex gap-2 mt-2'>
              <Typography variant='bodyXSmall'>{sex}</Typography>
              <Typography variant='bodyXSmall'>{no_identifier}</Typography>
            </div>
          </div>
        );
      },
    },
    {
      Header: 'NOMOR TELEPON',
      accessor: 'mobile',
      id: 'mobile',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
    },
    {
      Header: 'TANGGAL LAHIR',
      accessor: 'dob',
      id: 'dob',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? formatDate(value, ' ', 'MMMM', false) : '-';
      },
    },
    {
      Header: 'AKSI',
      accessor: 'name',
      id: 'name',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      width: 'w-40',
      Cell: ({ row }) => {
        return (
          <div className='w-full flex justify-center items-start'>
            <Button
              text='Pilih'
              onClick={() => onPatientAction(row.original)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ModalAddPatient
        isOpen={openAddPatient}
        onCancel={() => setOpenAddPatient(false)}
        onSubmit={async (patientData) => {
          onSubmitAddPatient(patientData);
          setSearchValue(patientData.patient_name);
          await handleGetListPatient(patientData.patient_name);
        }}
        successTitle={successTitle}
        successDescription={successDescription}
      />

      <div>
        <div className='flex mt-4'>
          <div className='w-4/5'>
            <TextInput
              size='sm'
              label='Cari Pasien'
              placeholder='Masukkan Nama/NIK/No Telp'
              name='search'
              value={searchValue}
              onInput={({ target }) => setSearchValue(target.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  await handleGetListPatient(searchValue);
                  setIsSearched(true);
                }
              }}
              required
            />
          </div>
          <div className='w-1/5 ml-4' style={{ marginTop: 'auto' }}>
            <Button
              text='Cari Pasien'
              size='lg'
              customClassName='!rounded-md'
              onClick={async () => {
                await handleGetListPatient(searchValue);
                setIsSearched(true);
              }}
            />
          </div>
        </div>

        <div className='mt-6'>
          <Typography variant='h2' color=''>
            Hasil Pencarian
          </Typography>
          <TableV2
            columns={columnNames}
            data={listPatientData}
            initialSortBy={[]}
            onSort={() => {}}
            isLoading={listPatient.isLoading}
            isError={listPatient.isError}
            errMsg={listPatient.errorMessage}
            textNotFound=''
            removeBgStyling
            elmentNotFound={
              isSearched ? (
                <div className='flex flex-col items-center gap-2 mt-3'>
                  <Typography
                    variant='bodyBase'
                    color='text-grayText'
                    customClass='font-bold'
                  >
                    Data tidak ditemukan.
                  </Typography>
                  <Button
                    class='primary'
                    text='Tambah Pasien Baru'
                    customClassName='mt-2 !rounded-md'
                    iconButton={() => <AddIcon color='#ffffff' />}
                    onClick={() => setOpenAddPatient(true)}
                  />
                </div>
              ) : (
                <Typography
                  variant='bodyBase'
                  color='text-grayText'
                  customClass='font-bold mt-3'
                >
                  Belum ada pencarian
                </Typography>
              )
            }
          />
          <div>
            <Pagination
              activePage={0}
              totalData={0}
              countPages={0}
              totalDataPerPage={0}
              handleClickPage={() => {}}
              handleOptionRow={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentPatientData;
