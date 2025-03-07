import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import Axios from '../services';

const pathHealthCareStore = paths.healthCareStore;
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;
const hostOnlineReservation = paths.onlineReservation;
const pathMediversePayment = paths.mediversePayment;
const path = pathHealthCareStore ? `${pathHealthCareStore}/channel` : '';
const pathOnlineReservation = `${hostOnlineReservation}/channel`;
const pathSearch = paths.search;

export const getDataList = async ({
  query = '',
  page = 1,
  limit = 10,
  isActive,
  providerType,
  type,
  startDate,
  endDate,
}) => {
  const params = {
    name: query,
    page,
    size: limit,
    'is-active': isActive,
    type,
    'start-date': startDate,
    'end-date': endDate,
    'provider-type': providerType,
  };

  let host = pathHealthCareStore;
  if (providerType === 'medpoint') {
    host = hostOnlineReservation;
  }
  const url = `${host}/channel${buildParams(params)}`;

  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListPlatformFeeServices = async () => {
  const queryParams = buildParams({
    created_at: 'desc',
  });

  const url = `${pathMediverseCmsPrivate}/platform-fee${queryParams}`;

  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const postProvider = async (payload) => {
  const params = buildParams({ 'is-deploy': true });
  let url = path;
  if (payload.providerType === 'medpoint') {
    url = pathOnlineReservation;
  }
  if (payload.type === 'internal') {
    url = `${url}${params}`;
  }
  try {
    return await Axios.post(url, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const putProvider = async (payload, id) => {
  let url = path;
  if (payload.providerType === 'medpoint') {
    url = pathOnlineReservation;
  }
  try {
    return await Axios.put(`${url}/${id}`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailProvider = async (id, providerType) => {
  let host = pathHealthCareStore;
  if (providerType === 'medpoint') {
    host = hostOnlineReservation;
  }
  try {
    return await Axios.get(`${host}/channel/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postBusiness = async ({ type, data, channelId, providerType }) => {
  let url = path;
  if (providerType === 'medpoint') {
    url = pathOnlineReservation;
  }
  try {
    return await Axios.post(`${url}/${channelId}/${type}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putBusiness = async ({
  type,
  data,
  id,
  channelId,
  providerType,
}) => {
  let url = path;
  if (providerType === 'medpoint') {
    url = pathOnlineReservation;
  }
  try {
    return await Axios.put(`${url}/${channelId}/${type}/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const getBusiness = async ({ type, id }) => {
  try {
    return await Axios.get(`${path}/${id}/${type}/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getMemberList = async ({ type, query = '', providerId = 0 }) => {
  try {
    let queryParams: string = '';
    let queryParamsClinic: string = '';
    let queryParamsPoli: string = '';

    if (type === 'medpharm' || type === 'online-reservation') {
      queryParams = buildParams({
        type: 'outlet',
        keyword: query,
        provider_id: providerId,
        limit: 700,
      });
      return await Axios.get(`${pathSearch}/medpharm${queryParams}`);
    }

    if (type === 'medpoint') {
      queryParamsClinic = buildParams({
        type: 'clinic',
        keyword: query,
        provider_id: providerId,
      });

      queryParamsPoli = buildParams({
        type: 'poli',
        keyword: query,
        provider_id: providerId,
      });

      const result = await Promise.all([
        Axios.get(`${pathSearch}/medpoint${queryParamsClinic}`),
        Axios.get(`${pathSearch}/medpoint${queryParamsPoli}`),
      ]);

      return {
        ...result[0],
        ...result[1],
        data: [...result[0].data, ...result[1].data],
      };
    }
  } catch (error: any) {
    return error.response;
  }
};

export const postImage = async (payload, id, providerType) => {
  let url = path;
  if (providerType === 'medpoint') {
    url = pathOnlineReservation;
  }
  const formDataFile = new FormData();
  formDataFile.append('channel-profile', payload);
  try {
    return await Axios.post(`${url}/${id}/image`, formDataFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getActivePpn = async () => {
  try {
    return await Axios.get(`${pathMediverseCmsPrivate}/ppn/active`);
  } catch (error: any) {
    return error.response;
  }
};

export const getBankList = async () => {
  try {
    return await Axios.get(`${pathMediversePayment}/payment/banks`);
  } catch (error: any) {
    return error.response;
  }
};

export const postPayment = async (payload) => {
  try {
    return await Axios.post(`${pathMediversePayment}/bank_account`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getBankAccountProvider = async (params) => {
  try {
    const queryParams = buildParams({
      channel_id: params,
    });
    const path = `${pathMediversePayment}/bank_account/user${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const putPayment = async (payload) => {
  try {
    return await Axios.patch(
      `${pathMediversePayment}/bank_account/${payload.alias_name}`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadProviderFile = async () => {
  try {
    return await Axios.get(
      `${pathMediverseCmsPrivate}/template/download/channel`,
      { responseType: 'blob' }
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postUploadProvidedrFile = async (payload) => {
  const path = `${pathMediverseCmsPrivate}/upload/channel`;
  const formDataFile = new FormData();
  formDataFile.append('upload_file', payload);
  try {
    return await Axios.post(path, formDataFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const patchPaymentSecondary = async (id, payload) => {
  try {
    return await Axios.patch(
      `${pathMediversePayment}/bank_account/${id}/secondary`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getBankAccounts = async () => {
  try {
    return await Axios.get(`${pathMediversePayment}/bank_accounts`);
  } catch (error: any) {
    return error.response;
  }
};

export const getResourceDataList = async (providerId, integrationSchema) => {
  try {
    const path = `${pathHealthCareStore}/channel/${providerId}/resource/${integrationSchema}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postResourceDataList = async (
  providerId,
  integrationSchema,
  data
) => {
  try {
    const path = `${pathHealthCareStore}/channel/${providerId}/resource/${integrationSchema}`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postResourceDataListMedpoint = async (
  providerId,
  integrationSchema,
  data
) => {
  try {
    const path = `${pathOnlineReservation}/${providerId}/resource/${integrationSchema}`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const getResourceDataListMedpoint = async (
  providerId,
  integrationSchema
) => {
  try {
    const path = `${pathOnlineReservation}/${providerId}/resource/${integrationSchema}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const putResourceDataList = async (
  providerId,
  integrationSchema,
  data
) => {
  try {
    const path = `${pathHealthCareStore}/channel/${providerId}/resource/${integrationSchema}`;
    return await Axios.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postSyncProvider = async (
  providerId: string | number,
  providerType: string
) => {
  let url: any;

  if (providerType === 'medpoint') {
    url = pathOnlineReservation;
  }

  if (providerType === 'medpharm') {
    url = pathHealthCareStore;
  }

  try {
    const path = `${url}/channel/${providerId}/synchronize`;
    return await Axios.post(path);
  } catch (error: any) {
    return error.response;
  }
};
