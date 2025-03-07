import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathHealthCareStore = paths.healthCareStore;

export const getDataList = async (
    type: string,
    limit: string,
    offset: string,
    keyword: string,
    isBanned: string,
) => {
  try {
    const queryParams = buildParams({
      type,
      limit,
      offset,
      keyword,
      show_banned: isBanned,
    });
    const url = `${pathSearch}/medpharm${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetail = async (id: string) => {
  try {
    return await Axios.get(`${pathSearch}/medpharm/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getListMerchant = async () => {
  try {
    const queryParams = buildParams({type: 'outlet'});
    return await Axios.get(`${pathSearch}/medpharm${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postData = async (channelId, data) => {
  try {
    return await Axios.post(`${pathHealthCareStore}/channel/${channelId}/item`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putData = async (id: string, data) => {
  try {
    const queryParams = buildParams({id});
    return await Axios.put(`/medicine${queryParams}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const patchMedicineBanned = async (id?: string, status?: boolean) => {
  try {
    return await Axios.patch(`${pathSearch}/medpharm/${id}/banned`, {
      is_banned: status,
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailMedicine = async (providerId, itemId) => {
  try {
    return await Axios.get(`${pathHealthCareStore}/channel/${providerId}/item/${itemId}?with_variant=1`);
  } catch (error: any) {
    return error.response;
  }
};

export const updateMedicine = async (providerId, itemId, data) => {
  try {
    return await Axios.put(`${pathHealthCareStore}/channel/${providerId}/item/${itemId}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postVariant = async (providerId, itemId, data) => {
  try {
    return await Axios.post(`${pathHealthCareStore}/channel/${providerId}/item/${itemId}/variant`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteVariant = async (providerId, itemId, variantid) => {
  try {
    return await Axios.delete(`${pathHealthCareStore}/channel/${providerId}/item/${itemId}/variant/${variantid}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getVariants = async (providerId, itemId) => {
  const params = {
    'item-id': itemId,
  };
  try {
    return await Axios.get(`${pathHealthCareStore}/channel/${providerId}/item/variant${buildParams(params)}`);
  } catch (error: any) {
    return error.response;
  }
};

export const updateRelated = async (id: any, data: any) => {
  try {
    const url = `${pathSearch}/medpharm/${id}/related`;
    return Axios.patch(url, data);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailVariant = async ({providerId, itemId, variantId}: any) => {
  try {
    return await Axios.get(`${pathHealthCareStore}/channel/${providerId}/item/${itemId}/variant/${variantId}`);
  } catch (error: any) {
    return error.response;
  }
};

export const updateVariant = async ({providerId, itemId, variantId, data}: any) => {
  try {
    return await Axios.put(`${pathHealthCareStore}/channel/${providerId}/item/${itemId}/variant/${variantId}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const addStock = async ({channelId, itemId, outletId, value}) => {
  const payload = {
    updateMode: 'add',
    value: parseInt(value),
  };
  const outlet = outletId.split('outlet')[1];
  try {
    return await Axios.put(`${pathHealthCareStore}/channel/${channelId}/outlet/${outlet}/item/${itemId}/stock`,
        payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getStock = async ({channelId, itemId, outletId}) => {
  const outlet = outletId.split('outlet')[1];
  try {
    return await Axios.get(`${pathHealthCareStore}/channel/${channelId}/outlet/${outlet}/item/${itemId}/stock`);
  } catch (error: any) {
    return error.response;
  }
};

export const getMedicinesNonAdmin = async (channelId, params) => {
  try {
    return await Axios.get(`${pathHealthCareStore}/channel/${channelId}/item${buildParams(params)}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getMedicineNonAdmin = async (channelId, itemId) => {
  try {
    return await Axios.get(`${pathHealthCareStore}/channel/${channelId}/item/${itemId}?with_variant=1`);
  } catch (error: any) {
    return error.response;
  }
};

export const putMedicineInformation = async (payload) => {
  try {
    return await Axios.put(`${pathHealthCareStore}/${payload.channelId}/${payload.itemId}`, payload.data);
  } catch (error: any) {
    return error.response;
  }
};

