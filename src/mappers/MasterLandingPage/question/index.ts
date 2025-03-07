import {isArray} from 'lodash';
import {unixTimeStampToDate} from '@/src/utils/dates';

export const mapListQuestion = (data: any[]) => {
  const result = isArray(data) ? data?.map((item: any) => {
    return {
      id: item?.id || null,
      date: item?.created_at ? unixTimeStampToDate(item.created_at) : '-',
      name: item?.name || '-',
      contact: item?.contact || '-',
      question: item?.question || '-',
    };
  }) : [];

  return result;
};
