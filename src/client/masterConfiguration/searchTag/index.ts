import Axios from '@/src/client/services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;

export const getProviders = async (params) => {
  try {
    const queryParams = buildParams({
      type: params.type,
      show_banned: params.showBanned,
      keyword: params.keyword,
    });
    return await Axios.get(`${pathSearch}/${params.providerType}${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getListSymptoms = async ({
  search = '',
  status,
}) => {
  try {
    const queryParams = buildParams({
      search: search,
      is_active: status !== 'all' ? status : '',
    });
    const url = `${pathMediverseCmsPrivate}/symptom${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListMasterService = async (search = '') => {
  try {
    const queryParams = buildParams({
      search: search,
    });

    return await Axios.get(`${pathMediverseCmsPrivate}/service${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getListMasterPoli = async (search = '') => {
  try {
    const queryParams = buildParams({
      search: search,
    });

    return await Axios.get(`${pathMediverseCmsPrivate}/poly${queryParams}`);
  } catch (error: any) {
    return error.message;
  }
};

export const getListMasterSpecialist = async (search = '') => {
  try {
    const queryParams = buildParams({
      search: search,
    });

    return await Axios.get(`${pathMediverseCmsPrivate}/specialist${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const patchRelated = async (payload) => {
  try {
    return Axios.patch(`${pathSearch}/${payload.type}/${payload.id}/related`, payload.data);
  } catch (error: any) {
    return error.response;
  }
};
