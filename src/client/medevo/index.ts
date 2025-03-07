import Axios from '../services';
import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import { formatDateEng } from '@/src/utils/formatDate';

const pathMediverseTransaction = paths.mediverseTransaction;
const pathMediverseTransactionPrivate = paths.mediverseTransactionPrivate;

export const getListMedevo = async (params) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      limit: params.limit,
      status: params.status,
      search: params.search,
      service_type: params.serviceType,
      provider_type: params.providerType,
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      is_prescription: false,
    });

    const path = `${pathMediverseTransaction}/cms/transaction${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailMedevo = async (params) => {
  try {
    const queryParams = buildParams({
      provider_type: params.providerType,
    });
    const path = `${pathMediverseTransactionPrivate}/cms/transaction/${params.id}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};
