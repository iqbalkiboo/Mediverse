import {isArray} from 'lodash';
import {unixTimeStampToDate} from '@/src/utils/dates';
import {capitalizeFirstLetter} from '@/src/utils/formatText';


export const mapListJoinPartner = (data: any[]) => {
  const result = isArray(data) ? data?.map((item: any) => {
    return {
      id: item?.id || null,
      date: item?.created_at ? unixTimeStampToDate(item.created_at) : '-',
      partnerType: capitalizeFirstLetter(item?.type) || '-',
      partnerName: item?.partner_name || '-',
      ownerName: item?.owner_name || '-',
      contact: item?.contact || '-',
      isConfirmed: item?.is_confirm || false,
    };
  }) : [];

  return result;
};
