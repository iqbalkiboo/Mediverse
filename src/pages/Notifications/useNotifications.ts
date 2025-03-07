import { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  resolveGetListNotification,
  resolvePutNotification,
  setNotificationFetching,
  setParams,
} from '@/src/store/notification/notification.reducer';
import {
  resolveClaimPrescription,
  setClaimEprescription,
} from '@/src/store/ePrescription/ePrescription.reducer';
import { mapListNotification } from '@/src/mappers/notification';
import {
  ROLES,
  ROUTES_TRANSACTION,
  TRANSACTION_STATUS_RESPONSE,
} from '@/src/constants';
import { formatDateEngWithTime } from '@/src/utils/formatDate';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import cookieUtils from '@/src/utils/cookieUtils';

const excludeNotification = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMINISTRATOR_MEDIVERSE,
  ROLES.SUPER_ADMIN_VIEW_ONLY,
  ROLES.ADMINISTRATOR_MEDIVERSE_VIEW_ONLY,
  ROLES.ADMIN_NEWS,
  ROLES.ADMINISTRATOR_MARKETING,
  ROLES.MARKETING_PROVIDER_MEDPHARM,
  ROLES.MARKETING_PROVIDER_MEDPOINT,
  ROLES.MARKETING_PROVIDER,
  ROLES.FINANCE_PROVIDER,
  ROLES.OPERATOR_FINANCE,
  ROLES.ADMIN_FINANCE,
  ROLES.DOKTER,
  ROLES.ADMIN_DOKTER,
];

const { role } = (await cookieUtils.getPermission()) || {
  role: {},
};

const useNotifications = () => {
  const detailUser = cookieUtils.getUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();

  const [dataNotification, setDataNotification] = useState<any>([]);

  const { params, notification, updateNotification } = useSelector(
    (state: RootStateOrAny) => state.notification
  );

  const { ePrescription } = useSelector(
    (state: RootStateOrAny) => state.ePrescription
  );

  const handleGetListNotification = () => {
    const payload = {
      category: params.category,
      offset: params.offset,
      limit: params.limit,
      startDate: formatDateEngWithTime(params.startDate, '-', 'full'),
      endDate: formatDateEngWithTime(params.endDate, '-', 'full'),
    };

    dispatch(resolveGetListNotification(payload));
  };

  const handleSetParams = (name, value) => {
    dispatch(setParams({ name, value }));
  };

  const handleNextPage = (offset: any) => {
    handleSetParams('offset', offset);
    handleSetParams('page', params.page + 1);
  };

  const handlePreviousPage = (offset: any) => {
    const parsedMin = params.page - 1;
    const hasPage = params.page > 1 ? parsedMin : 1;
    handleSetParams('offset', offset);
    handleSetParams('page', hasPage);
  };

  const handleClaimPrescription = (id: string) => {
    const payload = {
      params: { id, action: 'claim' },
      body: {
        outlet_id: String(detailUser?.outlet_id),
        outlet_name: detailUser?.outlet_name,
      },
    };
    stopAudio();
    dispatch(resolveClaimPrescription(payload));
  };

  const stopAudio = () => {
    notification.audio.pause();
    notification.audio.currentTime = 0;
  };

  const handleReadNotification = (id) => {
    if (isMobile) {
      handleSetParams('offset', 0);
      setDataNotification([]);
    }
    const payload = {
      id: [] as any,
      isRead: true,
    };
    payload.id.push(String(id));
    dispatch(resolvePutNotification(payload));
  };

  const handleMarkAllRead = () => {
    const payload = {
      id: [] as any,
      isRead: true,
    };
    payload.id = listNotification
      ?.filter((item) => item.isRead !== true)
      .map((item) => String(item.id));
    dispatch(resolvePutNotification(payload));
  };

  const handleFetchingNotif = (value) => {
    dispatch(setNotificationFetching(value));
  };

  const handleCloseModalClaim = (value) => {
    dispatch(setClaimEprescription({ name: 'isError', value }));
  };

  const handleNavigateDetailPrescription = ({ id, status, showChat }) => {
    if (status !== TRANSACTION_STATUS_RESPONSE.NEW) {
      showChat
        ? navigate(`${ROUTES_TRANSACTION.PRESCRIPTION_ORDER}/${id}?chat=true`)
        : navigate(`${ROUTES_TRANSACTION.PRESCRIPTION_ORDER}/${id}`);
    }
  };

  const listNotification = mapListNotification(
    isMobile ? dataNotification : notification.data
  );
  const isMarkAllRead = listNotification
    .map((item) => item.isRead)
    .every((value) => value === true);

  return {
    data: {
      role,
      params,
      notification,
      isMarkAllRead,
      ePrescription,
      listNotification,
      updateNotification,
      metadata: notification.metadata,
      excludeNotification,
    },
    method: {
      handleNextPage,
      handleSetParams,
      handleMarkAllRead,
      handlePreviousPage,
      setDataNotification,
      handleFetchingNotif,
      handleCloseModalClaim,
      handleReadNotification,
      handleClaimPrescription,
      handleGetListNotification,
      handleNavigateDetailPrescription,
    },
  };
};

export default useNotifications;
