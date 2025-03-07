import {
  RESERVATION_STATUS,
  RESERVATION_STATUS_RESPONSE,
} from '@/src/constants';

export const reservationStatus = (text: string) => {
  switch (text) {
    case RESERVATION_STATUS_RESPONSE.SCHEDULED:
      return 'bg-[#F7931E] text-white';
    case RESERVATION_STATUS_RESPONSE.IN_PROGRESS:
      return 'bg-[#00ABBD] text-white';
    case RESERVATION_STATUS_RESPONSE.FINISH:
      return 'bg-[#48AA44] text-white';
    case RESERVATION_STATUS_RESPONSE.CANCELLED:
      return 'bg-[#FF555F] text-white';
    case RESERVATION_STATUS_RESPONSE.QUEUE:
      return 'bg-[#5A9CFF]/10 text-[#68A5FF]';
    case RESERVATION_STATUS_RESPONSE.UNPAID:
      return 'bg-[#9C0000] text-[#E0E0E0]';
    default:
      return 'bg-[#FF555F] text-white';
  }
};

export const reservationStatusText = (text: string) => {
  switch (text) {
    case RESERVATION_STATUS_RESPONSE.SCHEDULED:
      return RESERVATION_STATUS.SCHEDULED;
    case RESERVATION_STATUS_RESPONSE.IN_PROGRESS:
      return RESERVATION_STATUS.IN_PROGRESS;
    case RESERVATION_STATUS_RESPONSE.FINISH:
      return RESERVATION_STATUS.FINISH;
    case RESERVATION_STATUS_RESPONSE.CANCELLED:
      return RESERVATION_STATUS.CANCELLED;
    default:
      return RESERVATION_STATUS.CANCELLED;
  }
};
