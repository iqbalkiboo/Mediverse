import React, { useEffect } from 'react';
import cx from 'classnames';
import { useNavigate } from 'react-router';

import {
  AsyncSelect,
  Breadcrumb,
  Button,
  ButtonDetail,
  Heading,
  Pagination,
  TableV2,
  TextInput,
} from '@/src/components';

import { ModalSuccess, ModalUploadFIle } from '@/src/commons';
import useDebounce from '@/src/utils/debounce';

import FormModalSlotReservation from './FormModalSlotReservation';

import { AddCircleIcon, SearchIcon } from '@/src/assets/images/svg';

import { withAccessCreate } from '@/src/hoc/WithAccess';
import { ALL_MODULES, ROLES_NAME, ROUTES_PRODUCT } from '@/src/constants';

import useSlotReservation from '@/src/pages/Home/MasterProduct/SlotReservations/useSlotReservations';

const ButtonCreateSlotReservation = withAccessCreate(
  ALL_MODULES.PRODUK_SLOT_RESERVATION
)(Button);
const ButtonUploadSlotReservation = withAccessCreate(
  ALL_MODULES.PRODUK_SLOT_RESERVATION
)(Button);

const SlotReservations = () => {
  const navigate = useNavigate();

  const {
    data: {
      role,
      slots,
      params,
      listSlot,
      providers,
      detailUser,
      formModalSlot,
      listSelectProvider,
      modalUploadFileSlot,
      modalDownloadFileSlot,
      isSuperAdmin,
    },
    method: {
      handleSetModal,
      handleSetParams,
      handleGetListSlot,
      handleGetListProvider,
      handleSearchListProvider,
      handlePostUploadFileSlot,
      handleGetDownloadFileSlot,
      handleSetProviderUploadSlot,
      handleResetModalUploadFileSlot,
      handleResetStateSlotReservation,
      handleResetModalDownloadFileSlot,
    },
  } = useSlotReservation();

  useEffect(() => {
    if (isSuperAdmin) {
      handleGetListProvider();
    }

    return () => {
      handleResetStateSlotReservation();
    };
  }, []);

  useEffect(() => {
    if (providers.isSuccess && providers.data.length > 0) {
      handleSetParams('providerId', providers.data[0].id);
    }
  }, [providers.isSuccess]);

  const debouncedSearchTerm = useDebounce(params.search, 1000);
  useEffect(() => {
    if (params?.providerId || detailUser?.provider_id) {
      handleGetListSlot(params.providerId || detailUser?.provider_id);
    }
  }, [params.providerId, debouncedSearchTerm, params.size, params.page]);

  useEffect(() => {
    if (modalDownloadFileSlot.data) {
      const outputFilename = 'Template_slot_reservation_upload.zip';
      const url = URL.createObjectURL(new Blob([modalDownloadFileSlot.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', outputFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return () => {
      handleResetModalDownloadFileSlot();
    };
  }, [modalDownloadFileSlot.data]);

  const columnNames = [
    {
      Header: 'Id',
      accessor: 'id',
      canSort: false,
      isVisible: true,
      disableSortBy: false,
      id: 'id',
    },
    {
      Header: 'Nama Dokter',
      accessor: 'doctorName',
      canSort: false,
      isVisible: true,
      disableSortBy: false,
      id: 'doctorName',
      width: 'w-64',
    },
    {
      Header: 'Faskes',
      accessor: 'healthFacilityName',
      canSort: false,
      isVisible: true,
      disableSortBy: false,
      id: 'healthFacilityName',
      width: 'w-72',
    },
    {
      Header: 'Poli',
      accessor: 'polyName',
      canSort: false,
      isVisible: true,
      disableSortBy: false,
      id: 'polyName',
    },
    {
      Header: 'Tanggal',
      accessor: 'date',
      canSort: false,
      isVisible: true,
      disableSortBy: false,
      id: 'date',
    },
    {
      Header: 'Jam Mulai',
      accessor: 'startTime',
      canSort: false,
      isVisible: true,
      disableSortBy: false,
      id: 'startTime',
    },
    {
      Header: 'Jam Selesai',
      accessor: 'endTime',
      canSort: false,
      isVisible: true,
      disableSortBy: false,
      id: 'endTime',
    },
    {
      Header: 'Slot',
      accessor: 'maxCount',
      canSort: false,
      isVisible: true,
      disableSortBy: false,
      id: 'maxCount',
      Cell: (props) => {
        // eslint-disable-next-line react/prop-types
        const value = props.row.original;
        // eslint-disable-next-line react/prop-types
        return `${value.sessionCount}/${value.maxCount}`;
      },
    },
    {
      Header: 'Aksi',
      accessor: 'id',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      id: 'action',
      Cell: ({ value }: any) => {
        const providerId = params.providerId || detailUser.provider_id;

        return (
          <div className={cx('w-full flex justify-center items-center')}>
            <ButtonDetail
              onClick={() =>
                navigate(
                  `${ROUTES_PRODUCT.SLOT_RESERVATION}/${providerId}/${value}`
                )
              }
              marginTop={10}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {/* Form Create Slot Reservation */}
      <FormModalSlotReservation
        isOpen={formModalSlot.isOpen}
        onClose={() => handleSetModal('formModalSlot', 'isOpen', false)}
        onRefetch={() =>
          handleGetListSlot(params.providerId || detailUser.provider_id)
        }
      />

      {/* Modal Upload File */}
      <ModalUploadFIle
        open={modalUploadFileSlot.isOpen}
        setModal={() => handleSetModal('modalUploadFileSlot', 'isOpen', false)}
        onDownload={handleGetDownloadFileSlot}
        isDownloading={modalDownloadFileSlot.isLoading}
        isErrorDownload={modalDownloadFileSlot.isError}
        onUpload={(file) =>
          handlePostUploadFileSlot(
            modalUploadFileSlot.provider || detailUser.provider_id,
            file
          )
        }
        isUploading={modalUploadFileSlot.isLoading}
        isErrorUpload={modalUploadFileSlot.isError}
      >
        {isSuperAdmin && (
          <AsyncSelect
            placeholder='Pilih Provider'
            loadOptions={handleSearchListProvider}
            options={listSelectProvider}
            onChange={(item) => handleSetProviderUploadSlot(item.value)}
          />
        )}
      </ModalUploadFIle>

      <Breadcrumb />
      {/* Content */}

      <div className={cx('flex justify-between items-center mt-4 mb-6')}>
        <Heading
          title='Slot Reservasi'
          customClassName='text-primary font-bold'
        />
        <div className={cx('flex gap-4')}>
          <div>
            <ButtonUploadSlotReservation
              onClick={() =>
                handleSetModal('modalUploadFileSlot', 'isOpen', true)
              }
              class='outline'
              text='UNGGAH FILE'
              size='lg'
            />
          </div>
          <div>
            <ButtonCreateSlotReservation
              iconButton={AddCircleIcon}
              class='primary'
              loading={false}
              text='Tambah Slot'
              onClick={() => handleSetModal('formModalSlot', 'isOpen', true)}
            />
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className={cx('w-full flex gap-6 mb-6')}>
        <div className={cx('w-[380px]')}>
          <TextInput
            name='search'
            className='rounded'
            leftIcon={SearchIcon}
            placeholder='Cari Dokter/Layanan'
            onChange={({ target }) => handleSetParams('search', target.value)}
          />
        </div>
        <div className={cx('flex items-center gap-2')}>
          {(role?.name === ROLES_NAME.SUPER_ADMIN ||
            role?.name === ROLES_NAME.ADMINISTRATOR_MEDIVERSE) && (
            <div className={cx('w-64')}>
              <AsyncSelect
                placeholder='Pilih Provider'
                loadOptions={handleSearchListProvider}
                options={listSelectProvider}
                onChange={(item) => {
                  handleSetParams('providerId', item.value);
                }}
                defaultValue={listSelectProvider?.[0]}
              />
            </div>
          )}
          {/* <SelectBox
            name='faskes'
            placeholder='Faskes'
            options={[]}
            onChange={(val: any) => {}}
            className={cx('w-52')}
            maxMenuHeight={200}
          />
          <SelectBox
            name='poli'
            placeholder='Poli'
            options={[]}
            onChange={(val: any) => {}}
            className={cx('w-52')}
            maxMenuHeight={200}
          />
          <SelectBox
            name='status'
            placeholder='Status'
            options={[]}
            onChange={(target: any) => {}}
            className={cx('w-52')}
            maxMenuHeight={200}
          /> */}
        </div>
      </div>

      <div className={cx('mb-7 overflow-x-hidden')}>
        <TableV2
          columns={columnNames}
          data={listSlot}
          isLoading={slots?.isLoading}
          isError={slots?.isError}
          errMsg={slots?.errorMessage}
          pageCount={''}
          initialSortBy={[]}
          onSort={() => {}}
        />
      </div>
      <div>
        <Pagination
          activePage={slots.metadata.page}
          totalData={slots.metadata.totalData}
          countPages={slots.metadata.totalPage}
          totalDataPerPage={params.size}
          handleClickPage={(value) => handleSetParams('page', value)}
          handleOptionRow={(value) => handleSetParams('size', value)}
        />
      </div>

      {/* Modal Success When Upload File */}
      <ModalSuccess
        title={'Berhasil menggunggah file'}
        description={modalUploadFileSlot.message}
        isOpen={modalUploadFileSlot.isSuccess}
        onCancel={handleResetModalUploadFileSlot}
      />
    </div>
  );
};

export default SlotReservations;
