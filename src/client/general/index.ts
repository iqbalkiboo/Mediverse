import Axios from '../services';
import {paths} from '@/src/configs';

const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;

export const getGeneralSetting = async () => {
  try {
    const path = `${pathMediverseCmsPrivate}/general-setting`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const putGeneralSetting = async (key, data) => {
  try {
    const path = `${pathMediverseCmsPrivate}/general-setting/${key}`;
    return await Axios.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};
