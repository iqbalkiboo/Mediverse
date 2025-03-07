import Axios from '@/src/client/services';
import {paths} from '@/src/configs';

const pathUserShared = paths.userShared;
const pathUserPrivate = paths.userPrivate;

export const getMe = async () => {
  try {
    return await Axios.get(`${pathUserPrivate}/me/`);
  } catch (error: any) {
    return error.response;
  }
};

export const putMe = async (data) => {
  try {
    return await Axios.put(`${pathUserPrivate}/me/`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const changePassword = async (payload) => {
  try {
    return await Axios.post(`${pathUserShared}/change-password`, payload);
  } catch (error: any) {
    return error.response;
  }
};
