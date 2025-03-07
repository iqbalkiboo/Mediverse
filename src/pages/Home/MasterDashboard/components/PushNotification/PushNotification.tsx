import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import cx from 'classnames';
import dayjs from 'dayjs';

import {
  ROUTES,
  ROUTES_NOTIFICATION,
  ROUTES_TRANSACTION,
} from '@/src/constants';
import { ToastNotif, Typography } from '@/src/components';
import { useNotifications } from '@/src/hooks/useNotifications';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import useDashboard from '@/pages/Home/MasterDashboard/useDashboardHooks';

interface Props {
  data: any;
}

const PushNotification: React.FC<Props> = (props) => {
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState();

  // max notif displayed
  const maxNotif = props?.data?.slice(0, 5);
  const maxLengthNotif = props?.data?.length > 5;

  const {
    data: {
      ePrescription: { claim },
    },
    method: { handleNavigateDetailPrescription },
  } = useDashboard();

  const {
    method: { playAudio, stopAudio, handleReadNotification },
  } = useNotifications();

  // navigate to epres order when claim success
  useEffect(() => {
    if (claim.isSuccess && orderId) {
      navigate(`${ROUTES_TRANSACTION.PRESCRIPTION_ORDER}/${orderId}`);
    }
  }, [claim.isSuccess]);

  const getTime = (createdAt) => {
    dayjs.unix(createdAt);
    const dt = dayjs.unix(createdAt);
    const hr = dt.format('HH');
    const m = dt.format('mm');

    return hr + ':' + m;
  };

  return (
    <div
      className={cx('fixed z-50')}
      style={
        isMobile
          ? { top: '20px', right: '10px' }
          : { top: '90px', right: '15px' }
      }
    >
      {maxNotif.map((item, index) => {
        const idOrderEpress =
          item?.Type === 'e-prescription'
            ? JSON.parse(JSON.parse(item?.CustomData)[0]?.metadata)
                ?.transaction_prescription_id
            : item?.prescriptionId;
        const idOrderMedpharm =
          item?.Type === 'medpharm'
            ? JSON.parse(JSON.parse(item?.CustomData)[0].metadata)
                ?.transaction_type_id
            : 0;
        const description = item?.NotificationTemplate
          ? JSON.parse(item?.NotificationTemplate)?.sub_title
          : '“chat dari customer”';
        const notificationID = item?.Audiences
          ? JSON.parse(item?.Audiences)[0]?.notification_id
          : 0;
        const status = item?.NotificationTemplate
          ? JSON.parse(item?.NotificationTemplate)?.status
          : '';
        const time = dayjs().unix();
        const showChat = item?.type === 'chat';

        if (item.Type === 'medpharm' || showChat) {
          playAudio();
        }

        return (
          <div key={index} className={cx('')}>
            <ToastNotif
              title={textBadges(item.Type, item.Category)}
              description={description}
              time={getTime(Number(time))}
              // to handle transition
              isOpen={Boolean(item)}
              onClick={() => {
                stopAudio();
                if (item.Type === 'chats') {
                  navigate(`${ROUTES.CHAT}`);
                } else if (item.Type !== 'medpharm') {
                  handleNavigateDetailPrescription({
                    id: idOrderEpress,
                    status: status,
                    showChat,
                  });
                } else {
                  navigate(
                    `${ROUTES_TRANSACTION.MEDPHARM_ORDER}/${idOrderMedpharm}`
                  );
                }
                setOrderId(idOrderEpress);
                handleReadNotification(notificationID);
              }}
            />
          </div>
        );
      })}
      {maxLengthNotif && (
        <div
          className={cx(
            'bg-white flex justify-center py-4 rounded-lg cursor-pointer',
            { hidden: !maxLengthNotif }
          )}
          onClick={() => navigate(`${ROUTES_NOTIFICATION.LIST_NOTIFICATION}`)}
        >
          <Typography
            variant={'subtitle3'}
            color='text-primary'
            customClass='text-base'
          >
            Pesanan Penting Lainnya ({props.data.length})
          </Typography>
        </div>
      )}
    </div>
  );
};

const textBadges = (type, category) => {
  switch (category) {
    case 'transaction':
      switch (type) {
        case 'medpharm':
          return 'Pesanan Medpharm';
        case 'e-prescription':
          return 'Pesanan E-prescription';
        case 'consultation':
          return 'Reservasi Konsultasi';
        case 'lab':
          return 'Reservasi Tes Lab';
        case 'medical-action':
          return 'Reservasi Tindakan Medis';
        case 'vaccination':
          return 'Reservasi Vaksinasi';
        case 'online-consultation':
          return 'Konsultasi Online';
        case 'chats':
          return 'Chat';
        default:
          return '';
      }
    default:
      return 'Pesanan E-prescription';
  }
};

export default PushNotification;
