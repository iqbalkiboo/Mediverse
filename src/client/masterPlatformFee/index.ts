import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {IParamsPlatformFee} from '@/src/types/MasterConfiguration/platformFee';

const pathCmsPrivate = paths.mediverseCmsPrivate;
const path = `${pathCmsPrivate}/platform-fee`;

export const getDataList = async (params: IParamsPlatformFee) => {
  try {
    const queryParams = buildParams(params);
    const url = `${path}${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getActivePpn = async () => {
  try {
    return await Axios.get(`${pathCmsPrivate}/ppn/active`);
  } catch (error: any) {
    return error.response;
  }
};

export const postData = async (payload) => {
  try {
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};
