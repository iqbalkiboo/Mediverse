import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathUserPublic = paths.userPublic;
const pathCmsPrivate = paths.mediverseCmsPrivate;
const pathHealthCareStore = paths.healthCareStore;

export const getListPharmacyElastic = async (params: any) => {
  try {
    const queryParams = buildParams({
      type: params.type,
      limit: params.limit,
      offset: params.offset,
      keyword: params.search,
      show_banned: !params.status,
      provider_id: params.providerId,
    });

    const path = `${pathSearch}/medpharm${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailPharmacyElastic = async (id: any, type: string = 'medpharm') => {
  try {
    const path = `${pathSearch}/${type}/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListPharmacy = async (params: any) => {
  const queryParams = buildParams({
    page: params.page,
    size: params.limit,
    keyword: params.search,
  });

  try {
    const path = `${pathHealthCareStore}/channel/${params.providerId}/outlet${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailPharmacy = async (providerId, id) => {
  try {
    const path = `${pathHealthCareStore}/channel/${providerId}/outlet/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.respose;
  }
};

export const getListProvider = async (search?: string) => {
  const queryParams = buildParams({
    'name': search,
    'is-active': true,
    'provider-type': 'medpharm',
  });

  try {
    const path = `${pathHealthCareStore}/channel${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailProvider = async (id) => {
  try {
    const path = `${pathHealthCareStore}/channel/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListLocation = async (province, regency, disctrict, limit) => {
  try {
    const path = `${pathUserPublic}/location`;
    let queryParams = '';

    if (province && regency) {
      queryParams = buildParams({
        regency: regency,
      });
    }

    if (province && !regency) {
      queryParams = buildParams({
        province: province,
      });
    }

    const limitParams = queryParams ? `&limit=${limit}` : `?limit=${limit}`;
    return await Axios.get(`${path}${queryParams}${limitParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getSearchListProvince = async (search) => {
  try {
    const queryParams = buildParams({
      province: search,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getSearchListRegency = async (search, params) => {
  try {
    const queryParams = buildParams({
      province: params.province,
      regency: search,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getSearchListDistrict = async (search, params) => {
  try {
    const queryParams = buildParams({
      province: params.province,
      regency: params.regency,
      district: search,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadFilePharmacy = async () => {
  try {
    const path = `${pathCmsPrivate}/template/download/outlet`;
    return await Axios.get(path, {responseType: 'blob'});
  } catch (error: any) {
    return error.response;
  };
};

export const postUploadFilePharmacy = async (providerId, payload) => {
  const path = `${pathHealthCareStore}/channel/${providerId}/outlet/upload`;
  const formDataFile = new FormData();
  formDataFile.append('file-csv/xlsx', payload);
  try {
    return await Axios.post(path, formDataFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const patchDataStatusPharmacyElastic = async (id: any, data?: any) => {
  try {
    const path = `${pathSearch}/medpharm/${id}/banned`;
    return await Axios.patch(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataPharmacy = async (providerId, data) => {
  try {
    const path = `${pathHealthCareStore}/channel/${providerId}/outlet`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataPharmacy = async (providerId, id, data) => {
  try {
    const path = `${pathHealthCareStore}/channel/${providerId}/outlet/${id}`;
    return await Axios.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};

// Remove Soon If Finish Refactor

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

export const deleteDataPharmacy = async (providerId: any, id: any) => {
  try {
    const path = `${pathHealthCareStore}/channel/${providerId}/outlet/${id}`;
    return await Axios.delete(path);
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
