import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {formatDateEng} from '@/src/utils/formatDate';

const pathNews = paths.news;

export const getListVendor = async (params) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      size: params.limit,
      status: params.status,
      type: params.type,
      search: params.search,
      date_start: params.startDate ? formatDateEng(params.startDate) : '',
      date_end: params.endDate ? formatDateEng(params.endDate) : '',
    });

    const path = `${pathNews}/vendor${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailVendor = async (payload) => {
  try {
    const path = `${pathNews}/vendor/${payload.id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataVendor = async (data) => {
  try {
    const path = `${pathNews}/vendor`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataVendor = async (id: any, data: any) => {
  try {
    const path = `${pathNews}/vendor/${id}`;
    return await Axios.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataVendor = async (id: any) => {
  try {
    return await Axios.delete(`${pathNews}/vendor/${id}`);
  } catch (error: any) {
    return error.response;
  }
};
