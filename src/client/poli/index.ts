import {paths} from '@/src/configs';
import Axios from '@/src/client/services';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
// const path = pathSearch ? `${pathSearch}/medpoint?type=poly` : '/polis';
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;

export const getDataList = async (page: number = 1, limit: number = 3, type: string, keyword: string) => {
  try {
    const queryParams = buildParams({
      offset: '0',
      type,
      keyword,
    });
    const path = `${pathSearch}/medpoint${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getAllData = async (payload: any) => {
  try {
    const queryParams = buildParams({
      limit: payload.limit,
      page: payload.page,
      is_active: payload.status,
      start_date: payload.startDate,
      end_date: payload.endDate,
      search: payload.query,
    });

    const url = `${pathMediverseCmsPrivate}/poly${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetail = async (id: string) => {
  try {
    return await Axios.get(`${pathSearch}/medpoint/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailById = async (id: string) => {
  try {
    const url = `${pathMediverseCmsPrivate}/poly/${id}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.message;
  }
};

export const postData = async (data: any) => {
  try {
    return await Axios.post(`${pathMediverseCmsPrivate}/poly`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const editDataById = async (id: any, data: any) => {
  try {
    return await Axios.put(`${pathMediverseCmsPrivate}/poly/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const patchPoliBanned = async (id?: string, status?: boolean) => {
  try {
    return await Axios.patch(`${pathSearch}/medpoint/${id}/banned`, {
      is_banned: status,
    });
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataById = async (id: any) => {
  try {
    return await Axios.delete(`${pathMediverseCmsPrivate}/poly/${id}`);
  } catch (error: any) {
    return error.response;
  }
};
