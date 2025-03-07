import {
  REFUND_PAYMENT_METHOD,
  REFUND_PAYMENT_METHOD_RESPONSE,
  REFUND_STATUS,
  REFUND_STATUS_RESPONSE,
  TRANSACTION_STATUS,
} from '@/src/constants';

export const refundStatus = (text: string) => {
  switch (text) {
    case REFUND_STATUS.NEED_TO_BE_PROCESSED:
      return 'bg-[#F7931E] text-white';
    case REFUND_STATUS.REFUND_ACCEPTED:
      return 'bg-[#35B932] text-[#DDFFDC]';
    case REFUND_STATUS.REFUND_REFUSED:
      return 'bg-[#FF555F] text-[#F5FFF4]';
    case REFUND_STATUS.REFUND_PROCESSED:
      return 'bg-[#5600E8] text-white';
    case REFUND_STATUS.REFUND_FAILED:
      return 'bg-[#F88B2C] text-white';
    case REFUND_STATUS.REFUND_APPROVED:
      return 'bg-[#0066FF] text-white';
    default:
      return '';
  }
};

export const translate = (text: string) => {
  switch (text) {
    case REFUND_STATUS_RESPONSE.PAID:
    case REFUND_STATUS_RESPONSE.CONFIRM:
    case REFUND_STATUS_RESPONSE.ACCEPTED:
      return REFUND_STATUS.REFUND_ACCEPTED;
    case REFUND_STATUS_RESPONSE.REJECTED:
      return REFUND_STATUS.REFUND_REFUSED;
    case REFUND_STATUS_RESPONSE.NEED_PROCESS:
    case REFUND_STATUS_RESPONSE.WAITING:
      return REFUND_STATUS.NEED_TO_BE_PROCESSED;
    case REFUND_STATUS_RESPONSE.COMPLAINT_REQUEST:
      return TRANSACTION_STATUS.COMPLAINT_REQUESTED;
    case REFUND_STATUS_RESPONSE.PROCESSED:
    case REFUND_STATUS_RESPONSE.NEED_PROCESS:
      return REFUND_STATUS.REFUND_PROCESSED;
    case REFUND_STATUS_RESPONSE.COMPLETED:
      return REFUND_STATUS.REFUND_ACCEPTED;
    case REFUND_STATUS_RESPONSE.FAILED:
      return REFUND_STATUS.REFUND_FAILED;
    case REFUND_STATUS_RESPONSE.APPROVED:
      return REFUND_STATUS.REFUND_APPROVED;
    default:
      return text;
  }
};

export const translatePaymentMethod = (text: string, type?: string) => {
  switch (text) {
    case REFUND_PAYMENT_METHOD_RESPONSE.BANK_TRANSFER:
      return `${type} ${REFUND_PAYMENT_METHOD.BANK_TRANSFER}`;
    default:
      return type;
  }
};
