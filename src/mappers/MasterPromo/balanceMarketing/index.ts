import {isArray} from 'lodash';
import {formatDateWithTime} from '@/src/utils/formatDate';
import {capitalizeFirstLetter} from '@/src/utils/formatText';

const mapType = (type) => {
  switch (type) {
    case 'cashback_medpharm':
      return 'Cashback Medpharm';
    case 'cashback_medpoint':
      return 'Cashback Medpoint';
    case 'free_delivery_medpharm':
      return 'Gratis Ongkir Medpharm';
    case 'discount_medpoint':
      return 'Diskon Medpoint';
    case 'referral':
      return 'Referral';
    default:
      return '-';
  }
};

export const mapDataTotalBalanceMarketing = (data: any) => {
  const result = {
    balanceMarketing: data?.marketing || 0,
    balanceReferral: data?.referral || 0,
    balanceUsage: data?.usage || 0,
  };

  return result;
};

export const mapDataAmountBalanceSubmission = (data: any) => {
  const result = {
    balanceNicepay: 0,
    balanceActive: data?.active || 0,
    balanceApprove: data?.pending || 0,
  };

  return result;
};

export const mapListSubmissionHistory = (data: any[]) => {
  const result = isArray(data) ? data?.map((item) => {
    return {
      id: item?.id || null,
      date: formatDateWithTime(item?.created_at) || '-',
      submissionType: !item?.budget_sub_type ? 'Referral' : mapType(item?.budget_sub_type),
      submissionStatus: item?.status || '-',
      submissionNominal: item?.amount || 0,
    };
  }) : [];

  return result;
};

export const mapListBalanceUsedHistory = (data: any[]) => {
  const result = isArray(data) ? data?.map((item) => {
    return {
      id: item?.id || null,
      date: formatDateWithTime(item?.created_at) || '-',
      nominal: item?.amount || 0,
      treatment: capitalizeFirstLetter(item?.suffix) || '-',
      promoType: mapType(item?.budget_sub_type),
      transactionId: item?.transaction_code || '-',
    };
  }) : [];

  return result;
};

export const mapListSubmission = (data: any[]) => {
  const result = isArray(data) ? data?.map((item) => {
    return {
      id: item?.id || null,
      date: formatDateWithTime(item?.created_at) || '-',
      submissionPic: item?.user_id || '-',
      submissionStatus: item?.status || '-',
      submissionNominal: item?.amount || 0,
      submissionType: !item?.budget_sub_type ? 'Referral' : mapType(item?.budget_sub_type),
    };
  }) : [];

  return result;
};

export const mapListTopUpHistory = (data: any[]) => {
  const result = isArray(data) ? data?.map((item) => {
    return {
      id: item?.id,
      date: formatDateWithTime(item?.created_at) || '-',
      topUpNominal: item?.amount,
    };
  }) : [];

  return result;
};
