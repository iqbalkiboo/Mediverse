import React, {useEffect} from 'react';
import cx from 'classnames';

import {Spinner, Typography} from '@/src/components';
import {CardNotification} from '../index';

import useNotifications from '@/src/pages/Notifications/useNotifications';
import useInfiniteScroll from '@/src/hooks/useInfinityScroll';
import {SpinnerScreen} from '@/src/commons';


const MobileView = () => {
  const {
    data: {
      params,
      metadata,
      notification,
      listNotification,
      updateNotification,
    },
    method: {
      handleSetParams,
      setDataNotification,
      handleFetchingNotif,
      handleGetListNotification,
    },
  } = useNotifications();

  useEffect(() => {
    handleGetListNotification();
  }, [updateNotification]);

  useEffect(() => {
    if (notification.data && params.offset > 10) {
      setDataNotification((prevState) => [...prevState, ...notification.data]);
    } else {
      setDataNotification(() => [...notification.data]);
    }
  }, [notification.data]);

  const limitPage = metadata?.page > metadata?.totalPage;

  useInfiniteScroll(
      handleGetListNotification,
      limitPage,
      notification?.isFetching,
      handleFetchingNotif,
      () => {
        handleSetParams('offset', params?.offset + 10);
      },
  );

  return (
    <div className={cx('bg-white')}>
      {/* Breadcrumb */}
      <div className={cx('mb-2')}>
        <Typography variant='bodyXSmall' color='text-[#ABAFB3]' customClass='font-medium'>
          Notifikasi
        </Typography>
      </div>

      {/* loading screen */}
      <SpinnerScreen open={updateNotification.isLoading} />

      {/* Header */}
      <div>
        <Typography variant='bodyBase' color='' customClass='text-primary font-bold'>
          Notifikasi
        </Typography>
      </div>

      {/* Content List */}
      <div>
        {listNotification.map((item, index) => (
          <CardNotification key={index} item={item} />
        ))}
      </div>

      {notification.isLoading &&(
        <div className={cx('h-full flex justify-center items-center')}>
          <Spinner color={'fill-black'} width={'w-8'} height={'w-8'} />
        </div>
      )}

    </div>
  );
};

export default MobileView;
