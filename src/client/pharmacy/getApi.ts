import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathHealthCareStore = paths.healthCareStore;
const pathUserPublic = paths.userPublic;
const pathCmsPrivate = paths.mediverseCmsPrivate;
const path = pathSearch ? `${pathSearch}/medpharm?type=outlet` : 'pharmacys';

export const getDataList = async (
    type: string,
    limit: any,
    offset: any,
    keyword: string = '',
    isBanned: any,
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

export const getListPharmacys = async (
    page: number,
    size: number,
    keyword: string = '',
    channelId: number,
) => {
  try {
    const queryParams = buildParams({
      page,
      size,
      keyword,
    });
    const url = `${pathHealthCareStore}/channel/${channelId}/outlet${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListItem = async (
    channelId: number,
    outletId: number,
) => {
  try {
    const url = `${pathHealthCareStore}/channel/${channelId}/outlet/${outletId}/item`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListProvider = async () => {
  try {
    const queryParams = buildParams({
      size: '0',
    });
    const url = `${pathHealthCareStore}/channel${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetail = async (id?: string) => {
  try {
    const queryParams = buildParams({
      type: 'outlet',
      id,
    });
    const url = `${pathSearch}/medpharm${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailPharmacys = async ( id?: string, channelId?: number) => {
  try {
    const url = `${pathHealthCareStore}/channel/${channelId}/outlet/${id}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.respose;
  }
};

export const putPharmacy = async (channelId, id, data) => {
  try {
    return await Axios.put(`${pathHealthCareStore}/channel/${channelId}/outlet/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postMedicine = async (payload) => {
  try {
    const queryParams = buildParams({
      id: payload.id,
    });
    return await Axios.post(`${path}${queryParams}`, payload.data);
  } catch (error: any) {
    return error.response;
  }
};

export const getListMedicine = async (id?: string) => {
  try {
    const queryParams = buildParams({id});
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getByName = async (type) => {
  try {
    const queryParams = buildParams({type});
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getByNameError = async (type) => {
  try {
    const queryParams = buildParams({type});
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getPharmacyById = async (id?: string | null) => {
  try {
    const queryParams = buildParams({
      type: 'outlet',
    });
    return await Axios.get(`${pathSearch}/medpharm/${id}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const patchPharmacyBanned = async (id?: string, status?: boolean) => {
  try {
    return await Axios.patch(`${pathSearch}/medpharm/${id}/banned`, {
      is_banned: status,
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getLocation = async (province, regency, district, limit) => {
  let params;
  if (province && regency) {
    params = `regency=${regency}`;
  }
  if (province && !regency) {
    params = `province=${province}`;
  }
  try {
    return await Axios.get(`${pathUserPublic}/location?${params}&limit=${limit}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postPharmacy = async (id, data) => {
  try {
    return await Axios.post(`${pathHealthCareStore}/channel/${id}/outlet`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const getListDrugCategory = async () => {
  const url = `${pathHealthCareStore}/drug/category`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListSymptom = async ({
  page = 1,
  limit = 50,
  isActive = true,
}) => {
  try {
    const queryParams = buildParams({
      page,
      limit,
      is_active: isActive,
    });
    const url = `${pathCmsPrivate}/symptom${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const patchRelatedPharmacy = async (id, data) => {
  try {
    return Axios.patch(`${pathSearch}/medpharm/${id}/related`, data);
  } catch (error: any) {
    return error.response;
  }
};
