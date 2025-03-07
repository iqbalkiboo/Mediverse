import Axios from '@/src/client/services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathMediverseReferral = paths.mediverseReferral;

export const getListFreeDelivery = async (params) => {
  const queryParams = buildParams({
    page: params.page,
    limit: params.limit,
    keyword: params.search,
    target_user: params.target,
    status: params.status,
    type: params.type,
    with_packages: true,
  });

  try {
    const path = `${pathMediverseReferral}/cms/voucher/list${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailFreeDelivery = async (id) => {
  try {
    const path = `${pathMediverseReferral}/cms/voucher/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postFreeDelivery = async (payload) => {
  try {
    return await Axios.post(`${pathMediverseReferral}/cms/voucher`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const putUpdateQuota = async (id, payload) => {
  const url = `${pathMediverseReferral}/cms/voucher/${id}/quota`;
  try {
    return await Axios.put(url, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const disableVoucherQuota = async (payload) => {
  try {
    const url = `${pathMediverseReferral}/cms/voucher/${payload.id}/disable`;
    return await Axios.put(url, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const editVoucherFreeDelivery = async (payload) => {
  try {
    const url = `${pathMediverseReferral}/cms/voucher/${payload.id}`;
    return await Axios.patch(url, payload);
  } catch (error: any) {
    return error.response;
  }
};
