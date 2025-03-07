import Axios from '../services';
import { paths } from '@/src/configs';
import { buildParams } from '@/utils/buildParams';

const pathUserPublic = paths.userPublic;

export const getListLocation = async (province, regency, limit) => {
  let params = '';
  if (province && regency) {
    params = `regency=${regency}`;
  }
  if (province && !regency) {
    params = `province=${province}`;
  }
  try {
    return await Axios.get(
      `${pathUserPublic}/location?${params}&limit=${limit}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getSearchListProvince = async (search) => {
  try {
    const queryParams = buildParams({
      province: search,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getSearchListRegency = async (search, params) => {
  try {
    const queryParams = buildParams({
      province: params.province,
      regency: search,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getSearchListDistrict = async (search, params) => {
  try {
    const queryParams = buildParams({
      province: params.province,
      regency: params.regency,
      district: search,
    });

    const path = `${pathUserPublic}/location`;
    return await Axios.get(`${path}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};
