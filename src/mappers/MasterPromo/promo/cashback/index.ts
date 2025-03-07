import {isArray} from 'lodash';
import {formatRupiah} from '@/src/utils/formatRupiah';
import {formatDate, formatIndonesianTimezone} from '@/src/utils/formatDate';
import {capitalizeFirstLetter} from '@/src/utils/formatText';

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

export const mapListCashback = (data: any[]) => {
  return isArray(data) ? data?.map((item: any) => {
    const result = {
      id: item?.id,
      name: item?.name || '-',
      code: item?.code,
      discountType: item?.discount_type || '',
      type: capitalizeFirstLetter(item?.type) || '',
      cashbackType: capitalizeFirstLetter(item?.provider_type) || '-',
      totalCoupon: item?.quota || '-',
      amount: item?.amount || 0,
      maxDiscount: item?.maximum_discount || 0,
      status: item?.status === 'disable' ? 'disable' : status(item.start_date, item.end_date) || '-',
      usedCoupon: isArray(item?.usages) ? item?.usages?.length : 0,
      startPeriodDate: formatDate(item.start_date, ' ', 'MMM') || '-',
      endPeriodDate: formatDate(item.end_date, ' ', 'MMM') || '-',
      startPeriodTime: formatIndonesianTimezone(item.start_date) || '-',
      endPeriodTime: formatIndonesianTimezone(item.end_date) || '-',
      target: item?.target_user === 'public' ? 'Publik' : 'Khusus' || '-',
      targetUser: item?.target_user,
    };

    return result;
  }): [];
};

export const mapDetailCashback = (data: any) => {
  return ({
    id: data?.id,
    name: data?.name || '-',
    amount: data?.amount || 0,
    totalCoupon: data?.quota || '-',
    type: capitalizeFirstLetter(data?.type) || '',
    title: data?.promo_material_title || '-',
    description: data?.promo_full_description || '-',
    cashbackType: capitalizeFirstLetter(data?.provider_type) || '-',
    status: data?.status === 'disable' ? 'disable' : status(data.start_date, data.end_date) || '-',
    usedCoupon: isArray(data?.usages) ? data?.usages?.length : 0,
    voucherCode: data?.code || '-',
    discountType:
      data?.discount_type === 'nominal' ?
      'Nominal' : 'Persentase' || '-',
    minSpend: formatRupiah(data?.minimal_transaction_amount || 0) || '-',
    maxDiscount: data?.maximum_discount || 0,
    estimateSpend:
      data?.discount_type === 'nominal' ?
      formatRupiah((data?.quota * data?.amount) || 0) :
      formatRupiah((data?.quota * data?.maximum_discount) || 0) || '-',
    discountPercentage: `${data?.discount_type === 'percentage' ? data?.amount : 0 || 0} %` || '-',
    target: data?.target_user === 'public' ? 'Publik' : 'Khusus' || '-',
    startPeriodDate: formatDate(data.start_date, ' ', 'MMM') || '-',
    endPeriodDate: formatDate(data.end_date, ' ', 'MMM') || '-',
    startPeriodTime: formatIndonesianTimezone(data.start_date) || '-',
    endPeriodTime: formatIndonesianTimezone(data.end_date) || '-',
    targetUser: data?.target_user,
  });
};
