import Axios from '../services';

import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import { formatDateEng } from '@/src/utils/formatDate';

const pathTransactionV2 = paths.transactionV2;
const pathMediverseTransaction = paths.mediverseTransaction;
const pathMediverseTransactionPrivate = paths.mediverseTransactionPrivate;
const pathProxyMediverseMedevo = paths.proxyMediverseMedevo;

export const getListMedpharm = async (params) => {
  try {
    const queryParams = buildParams({
      limit: params.limit,
      page: params.page,
      status: params.status,
      provider_type: params.providerType,
      search: params.search,
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
      is_prescription: false,
    });

    const path = `${pathMediverseTransaction}/cms/transaction${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailMedpharm = async (payload) => {
  try {
    const queryParams = buildParams({
      provider_type: payload.providerType,
    });
    const path = `${pathMediverseTransactionPrivate}/cms/transaction/${payload.id}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailMedpharmConsultation = async (id, outletPhone) => {
  try {
    const queryParams = buildParams({
      id_konsultasi: id,
    });
    const path = `${pathProxyMediverseMedevo}/get_konsultasi_byid${queryParams}`;
    return await Axios.get(path, {
      headers: {
        'x-mediverse-phone': outletPhone,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getListComplainReason = async () => {
  try {
    const path = `${pathTransactionV2}/complaint/reason`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getOrderTrackingById = async (id: string) => {
  try {
    const path = `${pathMediverseTransactionPrivate}/transaction/${id}/tracking`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const patchDataStatusMedpharm = async (payload) => {
  try {
    const path = `${pathMediverseTransaction}/cms/transaction/status/${payload.id}`;
    return await Axios.patch(path, payload.data);
  } catch (error: any) {
    return error.response;
  }
};
