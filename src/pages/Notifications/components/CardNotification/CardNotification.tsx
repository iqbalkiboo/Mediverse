import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import cx from 'classnames';

import { BadgesNotification } from '../index';
import { Typography } from '@/src/components';
import { orderStatusText } from '@/src/utils/orderStatus';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { ROUTES_PROVIDER, ROUTES_TRANSACTION } from '@/src/constants';
import useNotifications from '@/src/pages/Notifications/useNotifications';

import { any } from 'prop-types';

const CardNotification = ({ item }) => {
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();

  const {
    data: {
      ePrescription: { claim },
    },
    method: { handleReadNotification, handleNavigateDetailPrescription },
  } = useNotifications();

  // navigate to detail transaction
  useEffect(() => {
    if (claim.isSucces) {
      navigate(`${ROUTES_TRANSACTION.PRESCRIPTION_ORDER}/${item.id}`);
    }
  }, [claim.isSucces]);

  // get hours and minutes
  const getTime = (createdAt) => {
    dayjs.unix(createdAt);
    const dt = dayjs.unix(createdAt);
    const hr = dt.format('HH');
    const m = dt.format('mm');

    return hr + ':' + m;
  };

  const showChat = item.status === 'admin_confirmation';
  return (
    <div
      className={cx('py-4 border-b-1 border-grayDarkBg cursor-pointer')}
      onClick={() => {
        switch (item.type) {
          case 'medpharm':
            navigate(
              `${ROUTES_TRANSACTION.MEDPHARM_ORDER}/${item.transactionTypeId}`
            );
            break;
          case 'e-prescription':
            handleNavigateDetailPrescription({
              id: item.transactionTypeId,
              status: item.status,
              showChat: showChat,
            });
            break;
          case 'medpoint':
            navigate(
              `${ROUTES_TRANSACTION.MEDPOINT_ORDER}/${item.transactionId}`
            );
            break;
          case 'outlet':
            navigate(
              `${ROUTES_PROVIDER.PHARMACY}/${item.providerId}/${item.outletId}`
            );
            break;
          case 'doctor':
            navigate(
              `${ROUTES_PROVIDER.DOCTOR}/${item.providerId}/${item.doctorId}`
            );
            break;
          case 'clinic':
            navigate(
              `${ROUTES_PROVIDER.FACILITY}/medpoint/${item.clinicId}?providerId=${item.providerId}&type=clinic`
            );
            break;
          default:
            break;
        }
        if (item.type === 'medpharm') {
          navigate(
            `${ROUTES_TRANSACTION.MEDPHARM_ORDER}/${item.transactionTypeId}`
          );
        }
        handleReadNotification(item.id);
      }}
    >
      <div className={cx('flex items-center justify-between mb-2')}>
        <BadgesNotification
          title={textBadges(item.type, item.category)}
          customClassName={`rounded w-fit ${classNameTitle(item.type)}`}
          customClassText={isMobile ? 'text-[10px]' : 'text-sm'}
        />
        <span
          className={cx(
            'text-[#616161]',
            { 'text-[10px]': isMobile },
            { 'text-base': !isMobile }
          )}
        >
          {getTime(item.createdAt)}
        </span>
      </div>

      <div>
        <div className={cx('flex items-center justify-between')}>
          <Typography
            variant={isMobile ? 'bodyXSmall' : 'h3'}
            color=''
            customClass='font-bold mb-1'
          >
            {orderStatusText(item.status, item.type)}
          </Typography>
          {!item.isRead && (
            <div className={cx('w-2 h-2 rounded-full bg-[#5600E8]')}></div>
          )}
        </div>
        <Typography
          variant={isMobile ? 'bodyXxSmall' : 'bodyBase'}
          color=''
          customClass={isMobile ? 'font-medium truncate' : 'font-medium'}
        >
          {item.subTitle}
        </Typography>
      </div>
    </div>
  );
};

const classNameTitle = (text) => {
  switch (text) {
    case 'medpharm':
    case 'e-prescription':
    case 'medpoint':
      return 'bg-[#D7F1D6] text-[#35B932]';
    case 'consultation':
    case 'lab':
    case 'medical-action':
    case 'vaccination':
      return 'bg-[#CDE9FF] text-[#2B8EE0]';
    case 'online-consultation':
      return 'bg-[#E6E8FA] text-[#7859EE]';
    case 'outlet':
    case 'doctor':
    case 'clinic':
      return 'bg-[#ADD6F6] text-[#0077D5]';
    default:
      return '';
  }
};

const textBadges = (type, category) => {
  switch (category) {
    case 'transaction':
      switch (type) {
        case 'medpharm':
          return 'Pesanan Medpharm';
        case 'e-prescription':
          return 'Pesanan E-prescription';
        case 'medpoint':
          return 'Pesanan Medpoint';
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
    case 'info':
      switch (type) {
        case 'outlet':
          return 'Apotek';
        case 'doctor':
          return 'Dokter';
        case 'clinic':
          return 'Faskes';
        default:
          return '';
      }
  }
};

CardNotification.propTypes = {
  item: any,
};

export default CardNotification;
