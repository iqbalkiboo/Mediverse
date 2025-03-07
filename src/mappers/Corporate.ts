import {Corporates, ListCorporate} from '@/src/types/Corporate';
import {MetaDataHealthCareStore} from '@/src/types/MetaData';

export const getCorporate = (data: Corporates): Corporates => ({
  code: data.code,
  data: getCorporateData(data.data),
  metadata: getMetaData(data.metadata),
});

export const getCorporateData = (
    data: any,
): ListCorporate[] => {
  return data.map((item) => ({
    id_corporate: item.id,
    name_corporate: item.name,
    employee_count: item.count_user,
    create_date: item.created_date,
    status: item.status,
  }));
};

export const getMetaData = (
    data: MetaDataHealthCareStore,
): MetaDataHealthCareStore => ({
  page: data.page,
  size: data.size,
  totalData: data.totalData,
  totalPage: data.totalPage,
});
