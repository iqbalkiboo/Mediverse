import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {formatDateEng} from '@/src/utils/formatDate';

const pathTransactionV2 = paths.transactionV2;

export const getDataCardTransaction = async (params) => {
  try {
    const queryParams = buildParams({
      start_date: params.startDateRecapitulation,
      end_date: params.endDateRecapitulation,
    });

    const path = `${pathTransactionV2}/transaction/report/admin/saldo${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListTransaction = async (params) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      limit: params.limit,
      type: params.transactionType,
      transaction_number: params.search,
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
    });

    const path = `${pathTransactionV2}/transaction/report/admin${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadTransaction = async (params) => {
  try {
    const queryParams = buildParams({
      sort: 'DESC',
      order: 'created_at',
      start_date: params.startDate,
      end_date: params.endDate,
    });

    const path = `${pathTransactionV2}/cms/download/riwayat-saldo-admin${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};
