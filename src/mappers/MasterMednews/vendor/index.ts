import {isArray} from 'lodash';
import {unixTimeStampToDate} from '@/src/utils/dates';

export const mapListVendor = (data: any[]) => {
  const result = isArray(data) ? data.map((item: any) => {
    return {
      id: item?.id || '-',
      name: item?.name || '-',
      type: item?.type || '-',
      contractPeriod: `${unixTimeStampToDate(item?.start_contract)} - ${unixTimeStampToDate(item?.end_contract)}`,
      createdAt: unixTimeStampToDate(item?.createdAt),
      status: item?.status,
    };
  }) : [];

  return result;
};

export const mapDetailVendor = (data: any) => {
  return {
    id: data?.id || '-',
    name: data?.name || '-',
    type: data?.type || '-',
    startContract: unixTimeStampToDate(data?.start_contract) || '-',
    endContract: unixTimeStampToDate(data?.end_contract) || '-',
    remainingContract: '-',
    contractPeriod: `${unixTimeStampToDate(data?.start_contract)} - ${unixTimeStampToDate(data?.end_contract)}`,
    createdAt: unixTimeStampToDate(data?.createdAt),
    status: data?.status,
  };
};
