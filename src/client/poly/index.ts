import {paths} from '@/src/configs';
import Axios from '@/src/client/services';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;

export const getListPoly = async (params: any) => {
  const queryParams = buildParams({
    page: params.page,
    limit: params.limit,
    search: params.search,
    is_active: params.status,
    end_date: params.endDate,
    start_date: params.startDate,
  });

  try {
    const path = `${pathMediverseCmsPrivate}/poly${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailPoly = async (id: string) => {
  try {
    const path = `${pathMediverseCmsPrivate}/poly/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getListTreatmentInPoly = async (params) => {
  try {
    const queryParams = buildParams({
      page: 1,
      limit: 10,
      is_active: true,
      poly_type: params.polyName,
    });
    const path = `${pathMediverseCmsPrivate}/service${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListHealthFacilityElastic = async (params: any) => {
  const queryParams = buildParams({
    type: params.type,
    limit: params.limit,
    offset: params.offset,
    keyword: params.search,
    show_banned: false,
  });

  try {
    const path = `${pathSearch}/${params.providerType}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataPoly = async (data) => {
  try {
    const path = `${pathMediverseCmsPrivate}/poly`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataPoly = async (id: any, data: any) => {
  try {
    const path = `${pathMediverseCmsPrivate}/poly/${id}`;
    return await Axios.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataPoly = async (id: any) => {
  try {
    const path = `${pathMediverseCmsPrivate}/poly/${id}`;
    return await Axios.delete(path);
  } catch (error: any) {
    return error.response;
  }
};
