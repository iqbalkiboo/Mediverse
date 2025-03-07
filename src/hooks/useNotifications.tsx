import { useState } from 'react';
import { useNavigate } from 'react-router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  resolveGetListClickNotification,
  resolvePutNotification,
  setUpdateNotification,
} from '@/store/notification/notification.reducer';
import {
  resolveClaimPrescription,
  setClaimEprescription,
} from '@/src/store/ePrescription/ePrescription.reducer';
import {
  ROLES,
  ROUTES_TRANSACTION,
  TRANSACTION_STATUS_RESPONSE,
} from '@/src/constants';
import { mapListNotification } from '@/src/mappers/notification';
import { onMessageListener } from '@/utils/firebase/firebase';
import useBus from '@/src/hooks/useBus';
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
  ROLES.OPERATOR_DOKTER,
];

const { role } = (await cookieUtils.getPermission()) || {
  role: {},
};

export const useNotifications = () => {
  const dispatch = useDispatch();
  const detailUser = cookieUtils.getUser();
  const navigate = useNavigate();

  // toogle for open notif
  const [openNotif, setOpenNotif] = useState<boolean>(false);
  const [chatNotif, setChatNotif] = useState<boolean>(false);

  const { params, notification, updateNotification } = useSelector(
    (state: RootStateOrAny) => state.notification
  );

  const { ePrescription } = useSelector(
    (state: RootStateOrAny) => state.ePrescription
  );

  const { modalUpdateStatusMedpharm } = useSelector(
    (state: RootStateOrAny) => state.medpharm
  );

  const handleNotif = () => {
    setOpenNotif(true);
  };

  const handleChatNotif = (status: boolean) => {
    setChatNotif(status);
  };

  onMessageListener()
    ?.then((payload) => {
      /**
         * {
              "deeplink": "",
              "idp_sub":"123123",
              "title":"asdf",
              "subtitle":"asdf",
              "type":"medpharm",
              "topic":"provider_external",
              "category": "transaction":
              "audience": [
                {
                  "id": "provider_id",
                  "type": "provider"
                },
                {
                  "id":"outlet_id",
                  "type":"outlet"
                }
              ],
              "custom_data": [
                {
                  "id":"prescription_id",
                  "type":"transaction-prescription"
                }
              ]
            }
         */
      // dispatch push notification
      const fcmChannel = new BroadcastChannel('fcm-channel');
      fcmChannel.postMessage(payload);

      useBus.dispatch('pushNotification', { notification: payload.data });
      dispatch(
        setUpdateNotification({
          name: 'isSuccess',
          value: !updateNotification.isSuccess,
        })
      );
    })
    .catch((err) => console.log('failed: ', err));

  // claim epress order
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

  // mark all read notification
  const handleMarkAllReadNotif = () => {
    const payload = {
      id: [] as any,
      isRead: true,
    };
    payload.id = listFilterRead.map((item) => String(item.id));
    dispatch(resolvePutNotification(payload));
  };

  const handleGetListNotification = () => {
    const payload = {
      category: params.category,
      offset: params.offset,
      limit: 10,
      isRead: false,
    };
    dispatch(resolveGetListClickNotification(payload));
  };

  const handleCloseModalClaim = (value) => {
    dispatch(setClaimEprescription({ name: 'isError', value }));
  };

  const handleNavigateDetailPrescription = ({ id, status, showChat }) => {
    if (status === TRANSACTION_STATUS_RESPONSE.NEW) {
      // disable button in status new
      return;
    } else {
      showChat
        ? navigate(`${ROUTES_TRANSACTION.PRESCRIPTION_ORDER}/${id}?chat=true`)
        : navigate(`${ROUTES_TRANSACTION.PRESCRIPTION_ORDER}/${id}`);
    }
  };

  const handleReadNotification = (id) => {
    const payload = {
      id: [] as any,
      isRead: true,
    };
    payload.id.push(String(id));
    dispatch(resolvePutNotification(payload));
  };

  const playAudio = () => {
    notification.audio.play();
    notification.audio.loop = true;
  };

  const stopAudio = () => {
    notification.audio.pause();
    notification.audio.currentTime = 0;
  };

  const listNotification = mapListNotification(notification.listData);
  const isMarkAllRead = listNotification
    .map((item) => item.isRead)
    .every((value) => value === true);

  const listFilterRead = listNotification.filter(
    (item) => item.isRead === false
  );

  return {
    data: {
      role,
      params,
      openNotif,
      chatNotif,
      notification,
      ePrescription,
      isMarkAllRead,
      listFilterRead,
      listNotification,
      updateNotification,
      modalUpdateStatusMedpharm,
      metadata: notification.metadata,
      excludeNotification,
    },
    method: {
      playAudio,
      stopAudio,
      handleNotif,
      handleChatNotif,
      setOpenNotif,
      handleCloseModalClaim,
      handleReadNotification,
      handleMarkAllReadNotif,
      handleClaimPrescription,
      handleGetListNotification,
      handleNavigateDetailPrescription,
    },
  };
};
