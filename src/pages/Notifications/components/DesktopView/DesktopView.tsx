import React, {useEffect} from 'react';
import cx from 'classnames';

import {
  Card,
  DatePicker,
  Heading,
  Spinner,
  Typography,
} from '@/src/components';

import {ModalError} from '@/src/commons';

import {
  CardNotification,
  Pagination,
} from '../index';

import {EmptyStateNotif} from '@/src/assets/images/svg';
import useNotifications from '@/src/pages/Notifications/useNotifications';
import {formatDate} from '@/src/utils/formatDate';
import {SpinnerScreen} from '@/src/commons';

const DesktopView = () => {
  const {
    data: {
      role,
      params,
      metadata,
      notification,
      isMarkAllRead,
      ePrescription: {
        claim,
      },
      listNotification,
      updateNotification,
      excludeNotification,
    },
    method: {
      handleNextPage,
      handleSetParams,
      handleMarkAllRead,
      handlePreviousPage,
      handleCloseModalClaim,
      handleGetListNotification,
    },
  } = useNotifications();

  useEffect(() => {
    // TODO: hide in role super admin and admin mediverse
    if (!excludeNotification.includes(role.id)) {
      handleGetListNotification();
    }
  }, [
    params.page,
    params.startDate,
    params.limit,
    params.offset,
    updateNotification,
  ]);

  return (
    <div>
      {/* Loading screen */}
      <SpinnerScreen open={notification.isLoading || claim.isLoading} />

      {/* modal error claim epress */}
      <ModalError
        isOpen={claim.isError}
        description={'Pesanan sudah di konfirmasi apotik lain'}
        onCancel={() => handleCloseModalClaim(false)}
      />

      {/* Breadcrumb */}
      <div className={cx('mb-4')}>
        <Typography variant={'bodySmall'} color='text-graySubtitle'>
          Notifikasi
        </Typography>
      </div>

      {/* Header */}
      <div className={cx('mt-4 mb-6')}>
        <Heading
          title='Notifikasi'
          customClassName="text-primary font-bold"
        />
      </div>

      <Card>
        <div className={cx('flex justify-between')}>
          <Typography variant={'h2'} color=''>
            Notifikasi
          </Typography>
          <div className={cx('flex items-center gap-x-4')}>
            <div className={cx('flex gap-x-1 items-center')}>
              <button
                onClick={() => handleMarkAllRead()}
                disabled={isMarkAllRead}
              >
                <div className={cx({'cursor-pointer': !isMarkAllRead})}>
                  <Typography variant={'subtitle3'}
                    color={isMarkAllRead ? 'text-grayText' : 'text-primary'}>
                      Tandai Semua Dibaca
                  </Typography>
                </div>
              </button>
              {updateNotification.isLoading && (
                <div className={cx('h-full flex justify-center items-end')}>
                  <Spinner color={'fill-black'} width={'w-5'} height={'w-5'}/>
                </div>
              )}
            </div>
            <div className={cx('w-36')}>
              <DatePicker
                placeholder='Tanggal'
                setStartDate={() => {}}
                setEndDate={() => {}}
                selectsRange={false}
                closeOnSelect
                isError={''}
                textError={''}
                value={params.startDate ? `${formatDate(params.startDate, '/')}` :
                  undefined}
                select={params.startDate}
                onChangeControl={(value) => {
                  const today = new Date(value);
                  const tomorow = today.setDate(today.getDate() + 1);
                  handleSetParams('startDate', Date.parse(value));
                  handleSetParams('endDate', tomorow);
                }}
                useControl
              />
            </div>
          </div>
        </div>
        {listNotification.map((item, index) => {
          return (
            <CardNotification key={index} item={item}/>
          );
        })}
        {listNotification.length <= 0 && (
          <div className={cx('flex justify-center my-20')}>
            <div className={cx('flex flex-col gap-y-6 items-center')}>
              <EmptyStateNotif />
              <Typography variant={'h3'} color=''>
                Tidak Ada Notifikasi
              </Typography>
            </div>
          </div>
        )}
        {/* Pagination */}
        <div className={cx('mt-4')}>
          <Pagination
            totalDataPerPage={params.limit}
            totalData={metadata.totalData}
            activePage={metadata.page}
            countPages={metadata.totalPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePreviousPage}
          />
        </div>
      </Card>
    </div>
  );
};

export default DesktopView;
