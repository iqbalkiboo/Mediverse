import {isArray} from 'lodash';
import {formatDate} from '@/src/utils/formatDate';
import {unixTimeStampToDate} from '@/src/utils/dates';
import {formatRupiah} from '@/src/utils/fromatCurrency';
import {IPlatformFeeData} from '@/src/types/MasterConfiguration/platformFee';
import {capitalizeFirstLetter} from '@/src/utils/formatText';

export const mapPlatformFeeData = (data: IPlatformFeeData[]) => {
  return isArray(data) ? data.map((item: IPlatformFeeData) => {
    return {
      id: item.id,
      is_active: item.is_active,
      updated_at: item.updated_at,
      is_deleted: item.is_deleted,
      service_type: capitalizeFirstLetter(item.service_type?.replace(/-/g, ' ') || '-'),
      platform_fee_id: item.platform_fee_id,
      platform_fee_vat: item.type === 'percentage' ?
        `${item.value_with_ppn.toFixed(2) || 0}%` : formatRupiah(item.value_with_ppn || 0),
      start_date: formatDate(item.start_date, ' ', 'MMM'),
      created_at: formatDate(unixTimeStampToDate(item.created_at), ' ', 'MMM'),
      platform_fee_amount: item.type === 'percentage' ? `${item.value || 0}%` : formatRupiah(item.value || 0),
    };
  }) : [];
};
