import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathUserPrivate = paths.userPrivate;
const path = pathUserPrivate ? `${pathUserPrivate}/role` : '';

export const getServicePackList = async (page: number = 1, limit: number = 3) => {
  try {
    const queryParams = buildParams({
      _page: page,
      _limit: limit,
    });
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getServicePackDetail = async (id?: string) => {
  try {
    const queryParams = buildParams({id});
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postServicePack = async (payload) => {
  try {
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const putServicePack = async (payload) => {
  try {
    return await Axios.put(path, payload);
  } catch (error: any) {
    return error.response;
  }
};
