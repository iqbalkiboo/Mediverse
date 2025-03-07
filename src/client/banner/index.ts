import {paths} from '@/src/configs';
import Axios from '@/src/client/services';
import {buildParams} from '@/src/utils/buildParams';

const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;

export const getListBanner = async (params: any) => {
  const queryParams = buildParams({
    type: params.type,
    page: params.page,
    limit: params.limit,
  });

  try {
    const path = `${pathMediverseCmsPrivate}/banner${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailBanner = async (id: string | number) => {
  try {
    const path = `${pathMediverseCmsPrivate}/banner/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const postDataBanner = async (data: any) => {
  try {
    const path = `${pathMediverseCmsPrivate}/banner`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataBanner = async (id: string | number, data: any) => {
  try {
    const path = `${pathMediverseCmsPrivate}/banner/${id}`;
    return await Axios.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataBanner = async (id: any) => {
  try {
    const path = `${pathMediverseCmsPrivate}/banner/${id}`;
    return await Axios.delete(path);
  } catch (error: any) {
    return error.response;
  }
};
