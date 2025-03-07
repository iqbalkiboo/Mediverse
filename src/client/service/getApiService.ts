import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathCms = paths.mediverseCmsPrivate;

export const getServiceList = async (page: number = 1, limit: number = 3) => {
  try {
    const queryParams = buildParams({
      _page: page,
      _limit: limit,
      type: 'treatment',
    });
    return await Axios.get(`${pathCms}/service${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getServiceDetail = async (id?: string) => {
  try {
    return await Axios.get(`${pathCms}/service/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postService = async (payload) => {
  try {
    return await Axios.post(`${pathCms}/service`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const putService = async (id, payload) => {
  try {
    return await Axios.put(`${pathCms}/service/${id}`, payload);
  } catch (error: any) {
    return error.response;
  }
};

