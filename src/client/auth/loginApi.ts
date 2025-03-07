import Axios from '../services';
import {paths} from '@/src/configs';

export const loginApi = async (payload) => {
  const pathUserPublic = paths.userPublic;
  const path = pathUserPublic ? `${pathUserPublic}/login` : '';
  try {
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const refreshAccessToken = async (payload) => {
  const pathUserPublic = paths.userPublic;
  const path = pathUserPublic ? `${pathUserPublic}/refresh-token` : '';
  try {
    const params = new URLSearchParams();
    params.append('refresh_token', payload.refreshToken);
    return await Axios.post(path, params);
  } catch (error: any) {
    return error.response;
  }
};
