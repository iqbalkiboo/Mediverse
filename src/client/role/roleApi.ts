import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

export const getListRole = async (params) => {
  try {
    const pathUserPrivate = paths.userPrivate;
    const queryParams = buildParams({
      limit: params.limit,
      page: params.page,
      name: params.search,
      status: params.status !== 'all' ? params.status : '',
    });
    const path = `${pathUserPrivate}/role${queryParams}`;
    return await Axios.get(path, params);
  } catch (error: any) {
    return error.response;
  }
};


export const addRole = async (payload) => {
  const pathUserPrivate = paths.userPrivate;
  const path = `${pathUserPrivate}/role`;
  try {
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getListPermission= async (params) => {
  const pathUserPrivate = paths.userPrivate;
  const path = `${pathUserPrivate}/role-permission/${params.id}`;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const updateRole = async (payload) => {
  const pathUserPrivate = paths.userPrivate;
  const path = `${pathUserPrivate}/role-permission/${payload.roleId}`;
  try {
    return await Axios.put(path, payload.permission);
  } catch (error: any) {
    return error.response;
  }
};
