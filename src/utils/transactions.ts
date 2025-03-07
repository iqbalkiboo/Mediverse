import { TRANSACTION_INSURANCE_TYPE } from '@/src/constants';
import { formatDateEng, parseUTCDate } from '@/src/utils/formatDate';
import { isEmpty } from 'lodash';

export const generateOrderNumber = (
  transactionId = '',
  providerType = '',
  type = '',
  isMobile = false
) => {
  if (type === 'epres') {
    if (isMobile) {
      return `E-Pres ${transactionId}`;
    }
    return `E-prescription EP-${transactionId}`;
  }

  if (isEmpty(transactionId) || isEmpty(providerType)) {
    return '-';
  }

  const orderNumber = `${providerType}-${transactionId.slice(0, 8)}`;
  return orderNumber.toUpperCase();
};

export const generateOrderNumberMediverse = (
  transactionId = '',
  providerType = '',
  createdAt = ''
) => {
  if (isEmpty(transactionId) || isEmpty(providerType)) {
    return '-';
  }
  let type;
  switch (providerType.toLocaleLowerCase()) {
    case 'medevo':
      type = 'EVO';
      break;
    case 'medpoint':
      type = 'PNT';
      break;
    default:
      type = 'PHR';
      break;
  }
  const orderNumber = `MDV/${formatDateEng(
    parseUTCDate(createdAt),
    ''
  )}/${type}/${transactionId.slice(0, 8)}`;
  return orderNumber.toUpperCase();
};

export const translateInsuranceType = (type: string) => {
  switch (type) {
    case TRANSACTION_INSURANCE_TYPE.PRIVATE:
      return 'Pribadi';
    default:
      return type;
  }
};

export const modifyServiceType = (service: string) => {
  switch (service) {
    case 'schedule':
      return 'Konsultasi Terjadwal';
    case 'direct':
      return 'Konsultasi Langsung';
    case 'consultation':
      return 'Reservasi Konsultasi';
    default:
      return service;
  }
};

export const modifyServiceTypeMedpoint = (service: string) => {
  switch (service) {
    case 'schedule':
      return 'Konsultasi Terjadwal';
    case 'direct':
      return 'Konsultasi Langsung';
    case 'consultation':
      return 'Reservasi Konsultasi';
    case 'reservation-consultation':
      return 'Reservasi Konsultasi';
    case 'lab':
      return 'Reservasi Tes Lab';
    case 'vaccination':
      return 'Reservasi Vaksinasi';
    case 'medical-action':
      return 'Reservasi Tindakan Medis';
    default:
      return service;
  }
};

const categoryBmi = (value: number) => {
  if (value >= 30) return 'Obesitas';
  if (value >= 23) return 'Berat badan berlebih';
  if (value >= 18.5) return 'Barat badan normal';
  return 'Berat badan kurang';
};

export const calculateBmiResult = (height: number, weight: number) => {
  if (!height || !weight) return { bmi: 0, resultBmi: '' };
  const cmToMeter = height / 100;
  const meterSquare = cmToMeter ** 2;
  const bmi = Number((weight / meterSquare).toFixed(2)) || 0;
  const resultBmi = categoryBmi(bmi) || 0;
  return { bmi, resultBmi };
};
