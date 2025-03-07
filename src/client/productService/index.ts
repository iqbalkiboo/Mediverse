import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathCmsPrivate = paths.mediverseCmsPrivate;
const pathOnlineReservation = paths.onlineReservation;
const pathOnlineReservationClinic = paths.onlineReservationClinic;
const pathOnlineReservationDoctor = paths.onlineReservationDoctor;

export const getDataList = async (
    type: string,
    limit: string,
    offset: string,
    keyword: string = '',
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
    const url = `${pathSearch}/medpoint${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListProvider = async (search?: string) => {
  const queryParams = buildParams({
    'name': search,
    'is-active': true,
    'provider-type': 'medpoint',
  });

  try {
    const path = `${pathOnlineReservation}/channel${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailProvider = async (id: any) => {
  try {
    const path = `${pathOnlineReservation}/channel/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListTreatment = async ({channelId, page, limit, search}) => {
  try {
    const queryParams = buildParams({
      page,
      size: limit,
      keyword: search,
    });

    const path = `${pathOnlineReservationDoctor}/channel/${channelId}/treatment${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailTreatment = async (channelId, itemId) => {
  try {
    const path = `${pathOnlineReservationDoctor}/channel/${channelId}/treatment/${itemId}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListHealthFacility = async (providerId: any, search?: string) => {
  try {
    const queryParams = buildParams({
      page: 1,
      size: 10,
      keyword: search,
    });

    const path = `${pathOnlineReservationClinic}/channel/${providerId}/clinic${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListServiceGroup = async (search = '') => {
  try {
    const queryParams = buildParams({
      search: search,
    });

    return await Axios.get(`${pathCmsPrivate}/service/${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetail = async (id: string) => {
  try {
    return await Axios.get(`${pathSearch}/medpoint/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailHealthFacility = async (channelId, itemId) => {
  const queryParams = buildParams({
    'with-poly': true,
    'with-doctor': true,
    'with-treatment': true,
  });

  try {
    return await Axios.get(`${pathOnlineReservationClinic}/channel/${channelId}/clinic/${itemId}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postTreatmentProductService = async (channelId, data) => {
  try {
    return await Axios.post(`${pathOnlineReservationDoctor}/channel/${channelId}/treatment`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postTreatmentToClinic = async (channelId, id, data) => {
  try {
    return await Axios.post(`${pathOnlineReservationClinic}/channel/${channelId}/clinic/${id}/treatment`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putTreatmentProductService = async (channelId, id, data) => {
  try {
    return await Axios.put(`${pathOnlineReservationDoctor}/channel/${channelId}/treatment/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const patchProductServiceBanned = async (id?: string, status?: boolean) => {
  try {
    return await Axios.patch(`${pathSearch}/medpoint/${id}/banned`, {
      is_banned: status,
    });
  } catch (error: any) {
    return error.response;
  }
};
