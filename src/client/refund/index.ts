import dayjs from 'dayjs';
import Axios from '../services';
import {paths} from '@/src/configs';
import {formatDateEng} from '@/src/utils/formatDate';
import {buildParams} from '@/src/utils/buildParams';

const pathMediverseTransaction = paths.mediverseTransaction;
const pathMediverseTransactionV2 = paths.transactionV2;

const startMonth = dayjs().startOf('month');
const endMonth = dayjs().endOf('month');

export const getListRefund = async (params) => {
  try {
    const queryParams = buildParams({
      limit: params.limit,
      page: params.page,
      is_unique: true,
      status: params.status,
      search: params.search,
      transaction_type: params.transactionType,
      start_date: params.startDate === '' ? formatDateEng(startMonth) : formatDateEng(params.startDate),
      end_date: params.endDate === '' ? formatDateEng(endMonth) : formatDateEng(params.endDate),
      payout_provider: params.paymentGateway,
    });

    const path = `${pathMediverseTransaction}/cms/transaction/refund${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataRefundRecapitulation = async (params) => {
  try {
    const queryParams = buildParams({
      start_date: params.startDate === '' ? formatDateEng(startMonth) : formatDateEng(params.startDate),
      end_date: params.endDate === '' ? formatDateEng(endMonth) : formatDateEng(params.endDate),
    });

    const path = `${pathMediverseTransaction}/cms/transaction/refund/recapitulation${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailRefund = async (id) => {
  try {
    const path = `${pathMediverseTransaction}/transaction/${id}/refund`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const patchDataStatusRefund = async (id, payload) => {
  try {
    const path = `${pathMediverseTransactionV2}/cms/transaction/refund/${id}`;
    return await Axios.patch(path, payload);
  } catch (error: any) {
    return error.response;
  }
};
