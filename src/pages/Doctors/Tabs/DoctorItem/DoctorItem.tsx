import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import cx from 'classnames';

import { Pagination, TextInput } from '@/src/components';
import { ModalConfirmation, ModalError, ModalSuccess } from '@/src/commons';
import { SearchIcon } from '@/src/assets/images/svg';
import { RESERVATION_STATUS_RESPONSE, TAB_TRANSACTION } from '@/src/constants';
import DoctorItemCard from '@/src/pages/Doctors/components/DoctorItemCard';
import TableTransaction from '@/src/components/TableTransaction';
import useDoctors from '@/src/pages/Doctors/useDoctors';
import useDebounce from '@/src/utils/debounce';

import { any } from 'prop-types';

const DoctorItem = () => {
  const {
    idDoctor,
    detailUser,
    errorMessage,
    isReservationError,
    isReservationLoading,
    params,
    metadata,
    handleSetParams,
    handleClearStateReservation,
    handleGetListReservation,
    DATA_LIST_DOCTORS,
    handleSetIsOpenModal,
    isPatchReservationSuccess,
    isPatchReservationError,
    isOpenModal,
    handleClearStatePatchReservation,
    handlePatchReservationStatus,
    updateStatus,
    handleClearStateUpdateStatus,
    clearStateUpdateStatus,
    handleUpdateStatusMedpoint,
    handleConfirmationUpdateStatus,
  } = useDoctors();

  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const queryTab = useQuery().get('tab');

  useEffect(() => {
    handleClearStateReservation();
    handleSetParams('search', '');

    if (queryTab === TAB_TRANSACTION.SCHEDULED) {
      handleSetParams('reservationStatus', 'scheduled');
    } else if (queryTab === TAB_TRANSACTION.ONGOING) {
      handleSetParams('reservationStatus', 'in-progress');
    } else if (queryTab === TAB_TRANSACTION.DONE) {
      handleSetParams('reservationStatus', 'finish');
    } else if (queryTab === TAB_TRANSACTION.FAILED) {
      handleSetParams('reservationStatus', 'canceled');
    }
  }, [queryTab]);

  const debouncedSearchTerm = useDebounce(params.search, 500);
  useEffect(() => {
    if (detailUser?.provider_id) {
      handleGetListReservation(
        detailUser?.provider_id,
        params.reservationStatus
      );
    }
  }, [
    debouncedSearchTerm,
    params.page,
    params.limit,
    params.reservationStatus,
    params.reservationDate,
    updateStatus.isSuccess,
  ]);

  const columnNames = useMemo(() => {
    return [
      {
        accessor: '',
        canSort: false,
        isVisible: true,
        disableSortBy: true,
        id: 'medpointDoctorItem',
        Cell: (props: any) => {
          return (
            <DoctorItemCard
              data={props.row.original}
              onChange={handleConfirmationUpdateStatus}
            />
          );
        },
      },
    ];
  }, []);

  const renderTitleConfirmation = () => {
    if (updateStatus.status === RESERVATION_STATUS_RESPONSE.SCHEDULED) {
      return 'Apakah anda yakin ingin konfirmasi reservasi?';
    }
    if (updateStatus.status === 'canceled') {
      return 'Apakah anda yakin membatalkan reservasi?';
    }
    if (updateStatus.status === RESERVATION_STATUS_RESPONSE.IN_PROGRESS) {
      return 'Apakah anda yakin menyelesaikan reservasi?';
    }
  };

  return (
    <>
      <ModalSuccess
        title={'Sukses!'}
        description={'Berhasil mengubah status reservasi'}
        isOpen={isPatchReservationSuccess}
        onCancel={() => {
          handleClearStatePatchReservation();
          handleGetListReservation(
            detailUser?.provider_id,
            params.reservationStatus
          );
        }}
      />
      <ModalError
        title={'Gagal!'}
        description={'Gagal mengubah status reservasi'}
        isOpen={isPatchReservationError}
        onCancel={() => {
          handleClearStatePatchReservation();
        }}
      />
      <ModalConfirmation
        title={'Konfirmasi'}
        isOpen={isOpenModal.startCheckup}
        onCancel={() => handleSetIsOpenModal('startCheckup', false)}
        onSubmit={() =>
          handlePatchReservationStatus(
            idDoctor,
            detailUser?.provider_id,
            'in-progress'
          )
        }
        description={
          'Apakah Anda ingin konfirmasi mulai periksa terhadap pasien ini?'
        }
      />
      <ModalConfirmation
        title={'Konfirmasi Update Status Reservasi'}
        submitText={'Setujui'}
        cancelText={'Kembali'}
        description={renderTitleConfirmation()}
        isOpen={updateStatus.confirmation}
        isLoadingSubmit={updateStatus.isLoading}
        onCancel={() => {
          handleClearStateUpdateStatus('confirmation', false);
          clearStateUpdateStatus();
        }}
        onSubmit={() => {
          handleUpdateStatusMedpoint(
            updateStatus.id,
            updateStatus.status,
            updateStatus.providerId
          );
        }}
      />

      <ModalSuccess
        title={'Sukses!'}
        description={'Update status berhasil'}
        isOpen={updateStatus.isSuccess}
        onCancel={() => {
          handleClearStateUpdateStatus('isSuccess', false);
          clearStateUpdateStatus();
        }}
      />

      <ModalError
        title={'Gagal!'}
        description={'Update status gagal'}
        isOpen={updateStatus.isError}
        onCancel={() => {
          handleClearStateUpdateStatus('isError', false);
        }}
      />
      <div className={cx('my-6')}>
        <div className={cx('w-full flex gap-6 mb-6')}>
          <div className={cx('w-[380px]')}>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextInput
                name='search'
                className='rounded'
                placeholder='Cari Pasien'
                leftIcon={SearchIcon}
                value={params.search}
                onChange={({ target }) =>
                  handleSetParams('search', target.value)
                }
                isValid
              />
            </form>
          </div>
        </div>
        <div className={cx('mb-6')}>
          <TableTransaction
            columns={columnNames}
            data={DATA_LIST_DOCTORS}
            pageCount={metadata?.totalPage}
            initialSortBy={[]}
            onSort={() => {}}
            isLoading={isReservationLoading}
            errMsg={errorMessage ?? ''}
            isError={isReservationError}
          />
        </div>
        <div>
          <Pagination
            activePage={params.page}
            countPages={metadata?.totalPage}
            handleClickPage={(value) => handleSetParams('page', value)}
            handleOptionRow={(value) => handleSetParams('limit', value)}
            totalDataPerPage={params.limit}
            totalData={metadata.totalRow}
          />
        </div>
      </div>
    </>
  );
};

DoctorItem.propTypes = {
  value: any,
};

export default DoctorItem;
