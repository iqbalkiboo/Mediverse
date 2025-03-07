import {isArray} from 'lodash';
import {formatDate, formatIndonesianTimezone} from '@/src/utils/formatDate';

const status = (startDate, endDate) => {
  const now = new Date().getTime();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (end <= now) {
    return 'finish';
  } else if (start >= now) {
    return 'incoming';
  } else {
    return 'active';
  }
};

export const mapListFreeDelivery = (data: any[]) => {
  return isArray(data) ? data?.map((item: any) => {
    const result = {
      id: item?.id,
      name: item?.name || '-',
      voucherCode: item?.target_user !== 'public' ? item?.code : '',
      quota: item?.quota || 0,
      status: item?.status === 'disable' ? 'disable' : status(item?.start_date, item?.end_date) || '-',
      quotaLeft: item?.usages?.length || 0,
      endPeriodDate: formatDate(item.end_date, ' ', 'MMM') || '-',
      target: item?.target_user === 'public' ? 'Publik' : 'Khusus' || '-',
      endPeriodTime: formatIndonesianTimezone(item.end_date) || '-',
      startPeriodDate: formatDate(item.start_date, ' ', 'MMM') || '-',
      startPeriodTime: formatIndonesianTimezone(item.start_date) || '-',
      minimalTransactionAmount: item?.minimal_transaction_amount || 0,
      isDisable: Boolean(item?.status === 'disable'),
      amount: item?.amount || 0,
      type: item?.type,
      maxDiscount: item?.maximum_discount || 0,
      discType: item?.discount_type || '-',
      target_user: item?.target_user,
    };

    return result;
  }): [];
};

export const mapDetailFreeDelivery = (data: any) => {
  return ({
    id: data?.id,
    name: data?.name || '-',
    totalCoupon: data?.quota || 0,
    status: data?.status === 'disable' ? 'disable' : status(data?.start_date, data?.end_date) || '-',
    usedCoupon: data?.usages?.length || 0,
    voucherCode: data?.code || '-',
    discountType: data?.discount_type === 'nominal' ? 'Nominal' : 'Percentage' || '-',
    minSpend: (data?.minimal_transaction_amount) || '-',
    maxDiscount: (data?.maximum_discount) || 0,
    estimateSpend: (data?.estimateSpend) || '-',
    discountPercentage: data?.discount_type === 'percentage' ? `${data?.amount} %` : `${0} %`,
    endPeriodDate: formatDate(data.end_date, ' ', 'MMM') || '-',
    target: data?.target_user === 'public' ? 'Publik' : 'Khusus' || '-',
    endPeriodTime: formatIndonesianTimezone(data.end_date) || '-',
    startPeriodDate: formatDate(data.start_date, ' ', 'MMM') || '-',
    startPeriodTime: formatIndonesianTimezone(data.start_date) || '-',
    amount: data?.amount || 0,
  });
};

