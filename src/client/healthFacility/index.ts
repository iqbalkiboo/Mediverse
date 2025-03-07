import { AxiosRequestConfig } from 'axios';

import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import Axios from '../services';

import type { IGetDataHealthFacilityParams } from '@/types/healthFacility';

const pathSearch = paths.search;
const pathUserPublic = paths.userPublic;
const pathHealthCareStore = paths.healthCareStore;
const pathOnlineReservation = paths.onlineReservation;
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;
const pathOnlineReservationClinicPrivate = paths.onlineReservationClinic;
const path = pathSearch;
const pathOnlineReservationDoctor = paths.onlineReservationDoctor;
const slotEndpoint = paths.onlineReservationSlotPrivate;
const onlineReservationUpload = paths.onlineReservationUpload;

export const getDataList = async (params: IGetDataHealthFacilityParams) => {
  try {
    let url = `${path}/`;
    let queryParams = '';

    switch (params.type) {
      case 'medpharm':
      case 'medevo':
        queryParams = buildParams({
          type: 'outlet',
          limit: params.limit,
          offset: params.offset,
          show_banned: !params.keyword ? params.status : '',
          keyword: params.keyword,
        });
        url += `${params.type}${queryParams}`;
        break;
      case 'medpoint-clinic':
        queryParams = buildParams({
          type: 'clinic',
          limit: params.limit,
          offset: params.offset,
          show_banned: !params.keyword ? params.status : '',
          keyword: params.keyword,
        });
        url += `medpoint${queryParams}`;
        break;
      case 'medpoint-poli':
        queryParams = buildParams({
          type: 'poli',
          limit: params.limit,
          offset: params.offset,
          show_banned: !params.keyword ? params.status : '',
          keyword: params.keyword,
        });
        url += `medpoint${queryParams}`;
        break;
      default:
        queryParams = buildParams({
          type: 'outlet',
          limit: params.limit,
          offset: params.offset,
          show_banned: !params.keyword ? params.status : '',
          keyword: params.keyword,
        });
        url += `medpharm${queryParams}`;
        break;
    }

    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getBusiness = async (id) => {
  try {
    return await Axios.get(`${pathHealthCareStore}/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataDetail = async (id?: string | number, type?: string) => {
  try {
    const url = `${path}/${type}/${id}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailPolyList = async (payload: any) => {
  try {
    return await Axios.get(
      `${pathOnlineReservation}/channel/${payload.providerId}/clinic/${payload.clinicId}/poly`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailServiceList = async ({ providerId, clinicId }) => {
  try {
    const path = `${pathOnlineReservationClinicPrivate}/channel/${providerId}/clinic/${clinicId}/treatment`;

    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailDoctorList = async ({ providerId, clinicId }) => {
  try {
    const queryParams = buildParams({
      with_treatment: true,
    });

    const path = `${pathOnlineReservationClinicPrivate}/channel/${providerId}/clinic/${clinicId}/doctor${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getSlotByFaskes = async ({ providerId, clinicId }) => {
  try {
    const path = `${slotEndpoint}/channel/${providerId}/slot?outlet_id=${clinicId}&is_raw=true`;

    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListDoctor = async (params) => {
  try {
    const queryParams = buildParams({
      page: 1,
      size: 10,
      keyword: params.search,
    });

    const path = `${pathOnlineReservationDoctor}/channel/${params.channelId}/doctor${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListProvider = async (search?: string) => {
  try {
    const queryParams = buildParams({
      name: search,
      'provider-type': 'medpoint',
    });

    return await Axios.get(`${pathOnlineReservation}/channel${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListLocation = async (
  province,
  districtOrCity,
  subDistrict,
  limit
) => {
  try {
    const url = `${pathUserPublic}/location`;
    let queryParams = '';

    if (province && districtOrCity) {
      queryParams = buildParams({
        regency: districtOrCity,
      });
    }

    if (province && !districtOrCity) {
      queryParams = buildParams({
        province: province,
      });
    }

    const limitParams = queryParams ? `&limit=${limit}` : `?limit=${limit}`;
    return await Axios.get(`${url}${queryParams}${limitParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataSearchListProvince = async (searchProvince) => {
  try {
    const queryParams = buildParams({
      province: searchProvince,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataSearchListRegency = async (
  searchRegency,
  paramsLocation
) => {
  try {
    const queryParams = buildParams({
      province: paramsLocation.province,
      regency: searchRegency,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataSearchListDistrict = async (
  searchDistrict,
  paramsLocation
) => {
  try {
    const queryParams = buildParams({
      province: paramsLocation.province,
      regency: paramsLocation.districtOrCity,
      district: searchDistrict,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListPoli = async (channelId) => {
  try {
    return await Axios.get(
      `${pathOnlineReservation}/channel/${channelId}/poly`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListMasterPoli = async () => {
  try {
    const queryParams = buildParams({
      limit: 100,
    });
    return await Axios.get(`${pathMediverseCmsPrivate}/poly${queryParams}`);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailHealthFacility = async (channelId, itemId) => {
  const queryParams = buildParams({
    'with-poly': true,
  });

  try {
    return await Axios.get(
      `${pathOnlineReservationClinicPrivate}/channel/${channelId}/clinic/${itemId}${queryParams}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postLabHealthFacility = async (id, data) => {
  try {
    return await Axios.post(
      `${pathOnlineReservationClinicPrivate}/channel/${id}/lab`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postClinincHealthFacility = async (id, data) => {
  try {
    return await Axios.post(
      `${pathOnlineReservationClinicPrivate}/channel/${id}/clinic`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postPoliHealthFacility = async (channelId, data) => {
  try {
    return await Axios.post(
      `${pathOnlineReservation}/channel/${channelId}/poly`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

// export const putLabHealthFacility = async (channelId, itemId, data) => {
//   try {
//     return await Axios.put(`${pathOnlineReservationClinicPrivate}/channel/${channelId}/lab/${itemId}`, data);
//   } catch (error: any) {
//     return error.response;
//   }
// };

// export const putClinicHealthFacility = async (channelId, itemId, data) => {
//   try {
//     return await Axios.put(`${pathOnlineReservationClinicPrivate}/channel/${channelId}/clinic/${itemId}`, data);
//   } catch (error: any) {
//     return error.response;
//   }
// };

export const putHealthFacility = async (channelId, itemId, data, type) => {
  let url;
  switch (type) {
    case 'hospital':
      url = `${pathOnlineReservationClinicPrivate}/channel/${channelId}/clinic/${itemId}`;
      break;
    case 'lab':
      url = `${pathOnlineReservationClinicPrivate}/channel/${channelId}/lab/${itemId}`;
      break;
    default:
      url = `${pathOnlineReservationClinicPrivate}/channel/${channelId}/clinic/${itemId}`;
      break;
  }
  try {
    return await Axios.put(`${url}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const patchRelated = async (type: string, id: any, data: any) => {
  try {
    return Axios.patch(`${pathSearch}/${type}/${id}/related`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const banned = async (id, status, type) => {
  try {
    return await Axios.patch(`${pathSearch}/${type}/${id}/banned`, {
      is_banned: status,
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getAllHealthFacilities = async (params: any) => {
  try {
    const type = params.providerType === 'medevo' ? 'outlet' : 'clinic';
    const queryParams = buildParams({
      type,
      page: params.page,
      limit: params.limit,
      offset: params.offset,
      keyword: params.keyword,
    });

    const url = `${pathSearch}/${params.providerType}${queryParams}`;

    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getHealthFacilitiesByProvider = async (payload) => {
  const params = {
    page: payload.page,
    size: payload.size,
    keyword: payload.keyword,
  };
  const channelId = payload.channelId;
  const url = `${pathOnlineReservationClinicPrivate}/channel/${channelId}/clinic${buildParams(
    params
  )}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getPolysByProvider = async (payload) => {
  const params = {
    page: payload.page,
    size: payload.size,
    keyword: payload.keyword,
  };
  const channelId = payload.channelId;
  const url = `${pathOnlineReservationDoctor}/channel/${channelId}/poly${buildParams(
    params
  )}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getHealthFacilityByProvider = async (payload) => {
  const params = {
    with_doctor: true,
    with_poly: true,
    with_treatment: true,
  };
  const channelId = payload.channelId;
  const clinicId = payload.clinicId;
  const url = `${pathOnlineReservationClinicPrivate}/channel/${channelId}/clinic/${clinicId}${buildParams(
    params
  )}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getPolyByProvider = async (payload) => {
  const channelId = payload.channelId;
  const id = payload.id;
  const url = `${pathOnlineReservationDoctor}/channel/${channelId}/poly/${id}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataDoctorToClinic = async (channelId, clinicId, payload) => {
  try {
    const path = `${pathOnlineReservationClinicPrivate}/channel/${channelId}/clinic/${clinicId}/associate`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const postHealthFacility = async (id, data) => {
  try {
    return await Axios.post(
      `${pathOnlineReservationClinicPrivate}/channel/${id}/clinic`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadTemplate = async () => {
  const url = `${pathMediverseCmsPrivate}/template/download/clinic`;
  const headers = { 'Content-Type': 'blob' };
  const config: AxiosRequestConfig = { responseType: 'arraybuffer', headers };
  try {
    return await Axios.get(url, config);
  } catch (error: any) {
    return error.response;
  }
};

export const postUploadFile = async (file, channelId) => {
  const path = `${onlineReservationUpload}/channel/${channelId}/clinic/upload`;
  const formDataFile = new FormData();
  formDataFile.append('upload-file', file);
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

export const getListPoly = async (params) => {
  try {
    const queryParams = buildParams({
      page: 1,
      size: 10,
      keyword: params.search,
    });

    const path = `${pathOnlineReservationDoctor}/channel/${params.channelId}/poly${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListTreatment = async (params) => {
  try {
    const queryParams = buildParams({
      page: 1,
      size: 10,
      keyword: params.search,
    });

    const path = `${pathOnlineReservationDoctor}/channel/${params.channelId}/poly${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteClinic = async (channelId, clinicId) => {
  try {
    return await Axios.delete(
      `${pathOnlineReservationClinicPrivate}/channel/${channelId}/clinic/${clinicId}`
    );
  } catch (error: any) {
    return error.response;
  }
};
