import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {IParamsGetListAdmin} from '@/src/types/MasterUsers/admins';
import {mapParamsGetListAdmin} from '@/src/mappers/MasterUser/admins';

const pathUserPrivate = paths.userPrivate;
const path = pathUserPrivate ? `${pathUserPrivate}/users` : '';
const pathSearch = paths.search;
const pathUser = paths.userPublic;

export const getListAdmin = async (params: IParamsGetListAdmin) => {
  try {
    const queryParams = buildParams(mapParamsGetListAdmin(params));
    const url = `${path}${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const postData = async (data: any) => {
  try {
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putData = async (id: string, data: any) => {
  try {
    return await Axios.put(`${path}/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const getListOutlet = async ({
  type,
  query = '',
  page = 1,
  limit = 100,
  isActive,
  providerType = '',
  providerId,
}) => {
  let outletType: string;
  let queryParams = '';

  if (type === 'medpharm') {
    queryParams = buildParams({
      name: query,
      type: 'outlet',
      provider_id: providerId,
      limit,
    });
    outletType = `/medpharm${queryParams}`;
  } else {
    queryParams = buildParams({
      name: query,
      type: 'clinic',
      provider_id: providerId,
      limit,
    });
    outletType = `/medpoint${queryParams}`;
  }

  try {
    return await Axios.get(`${pathSearch}${outletType}`);
  } catch (error: any) {
    return error.response;
  }
};

export const resetPassword = async (payload) => {
  const url = `${pathUser}/reset-password`;
  try {
    return await Axios.post(url, payload);
  } catch (error: any) {
    return error.response;
  }
};
