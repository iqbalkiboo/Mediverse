import Axios from '../../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathMediverseReferal = paths.mediverseReferral;
const pathMediverseReferral = paths.mediverseReferral;

export const getListDrug = async (params) => {
  try {
    const queryParams = buildParams({
      type: params.search === '' ? 'drug' : '',
      show_banned: false,
      sort_by_stock: 'desc',
      item_name: params.search,
      provider_id: params.providerId,
      limit: 5000,
    });
    const url = `${pathSearch}/medpharm${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const postDiscountPackage = async (payload) => {
  const url = `${pathMediverseReferal}/cms/voucher`;
  try {
    return await Axios.post(url, payload);
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
  providerType,
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
    providerType,
  });
  const url = `${pathMediverseReferral}/cms/voucher/list${queryParams}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailDiscountCoupon = async (id) => {
  const url = pathMediverseReferral;
  try {
    return await Axios.get(`${url}/cms/voucher/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const patchDiscountCoupon = async (id, payload) => {
  const url = `${pathMediverseReferal}/cms/voucher/${id}`;
  try {
    return await Axios.patch(url, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const putDisableDiscountCoupon = async (id) => {
  const url = `${pathMediverseReferal}/cms/voucher/${id}/disable`;
  try {
    return await Axios.put(url);
  } catch (error: any) {
    return error.response;
  }
};

