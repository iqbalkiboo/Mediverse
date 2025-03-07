import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathNews = paths.news;

export const getListPrivacyPolicy = async ({limit, page, category, status, startDate, endDate, search}) => {
  try {
    const queryParams = buildParams({
      limit,
      page,
      status: status === 'all' ? '' : status,
      category: category === 'all' ? '' : category,
      start_date: startDate ? new Date(startDate).getTime() : '',
      end_date: endDate ? new Date(endDate).getTime() : '',
      search,
    });
    const url = `${pathNews}/privacy${queryParams}`;
    return await Axios.get(`${url}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailPrivacyPolicy = async (id) => {
  try {
    return await Axios.get(`${pathNews}/privacy/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postPrivacyPolicy = async (data) => {
  try {
    return await Axios.post(`${pathNews}/privacy`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putPrivacyPolicy = async (data, id) => {
  try {
    return await Axios.put(`${pathNews}/privacy/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const patchStatusPrivacyPolicy = async (id: string | number, data) => {
  try {
    return await Axios.patch(`${pathNews}/privacy/${id}/status`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deletePrivacyPolicy = async (id: any) => {
  try {
    return await Axios.delete(`${pathNews}/privacy/${id}`);
  } catch (error: any) {
    return error.response;
  }
};
