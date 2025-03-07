import Axios from '../../services';
import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';

const pathSearch = paths.search;

const pathMediverseReferral = paths.mediverseReferral;

export const getListDrug = async (params) => {
  try {
    const queryParams = buildParams({
      type: params.type,
      item_name: params.item_name,
      show_banned: params.isBanned,
      provider_id: params.providerId,
      sort_by_stock: params.sortByStock,
      provider_type: params.providerType,
      parent_id: params.parentId,
      limit: params.limit,
    });
    const url = `${pathSearch}/medpharm${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListCoupon = async ({
  search = '',
  page = 1,
  limit = 10,
  status = '',
  startDate,
  endDate,
  type = '',
  target,
  providerType,
  couponType,
}) => {
  const queryParams = buildParams({
    status,
    with_items: true,
    with_packages: true,
    with_usages: true,
    page,
    limit,
    keyword: search,
    type,
    target_user: target,
    provider_type: providerType,
    coupon_type: couponType,
  });
  const url = `${pathMediverseReferral}/cms/voucher/list${queryParams}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailProductCoupon = async (id) => {
  try {
    return await Axios.get(`${pathMediverseReferral}/cms/voucher/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postProductCoupon = async (data: any) => {
  try {
    const url = `${pathMediverseReferral}/cms/voucher`;
    return await Axios.post(url, data);
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

export const patchDisableStatus = async (id) => {
  const url = `${pathMediverseReferral}/cms/voucher/${id}/disable`;
  try {
    return await Axios.put(url);
  } catch (error: any) {
    return error.response;
  }
};

export const patchProductCoupon = async (id, payload) => {
  const url = `${pathMediverseReferral}/cms/voucher/${id}`;
  try {
    return await Axios.patch(url, payload);
  } catch (error: any) {
    return error.response;
  }
};
