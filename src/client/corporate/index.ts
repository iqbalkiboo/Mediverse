import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathUserShared = paths.userShared;

export const apiAddCorporate = async (payload) => {
  try {
    return await Axios.post(`${pathUserShared}/company`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getCorporates = async ({
  query = '',
  page = 1,
  limit = 10,
  isActive,
}) => {
  try {
    const queryParams = buildParams({
      'page': page,
      'limit': limit,
      'name': query,
      'is-active': isActive,
    });
    const url = `${pathUserShared}/company${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailCorporate = async ({id}) => {
  try {
    return await Axios.get(`${pathUserShared}/company/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const putCorporate = async ({id, payload}) => {
  try {
    return await Axios.put(`${pathUserShared}/company/${id}`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getEmployeByCompany = async ({id}) => {
  try {
    const queryString = buildParams({
      id_company: id,
    });
    return await Axios.get(`${pathUserShared}/employee${queryString}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postEmployePerCompany = async (payload) => {
  try {
    return await Axios.post(`${pathUserShared}/employee`, payload);
  } catch (error: any) {
    return error.response;
  }
};
