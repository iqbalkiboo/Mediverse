import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import Axios from '../services';
import AxiosFrappe from '@/client/servicesFrappe';

const pathHealthCareStore = paths.healthCareStore;
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;

export const getDataListDrug = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([
      ['item_group', '=', 'Drug'],
      ['item_name', 'like', `%${search}%`],
    ]);
    const fields = JSON.stringify(['*']);
    const path = `/method/mediverse_rme.api.item.get_list`;
    return await AxiosFrappe.get(path, {
      params: {
        company: 'Mediverse RME',
        filters: filters,
        fields: fields,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailDrugByChannelId = async (channelId, itemId) => {
  try {
    return await Axios.get(
      `${pathHealthCareStore}/channel/${channelId}/item/${itemId}?with_variant=true`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getListDrugByOutletId = async (
  channelId: any,
  outletId: any,
  params: any
) => {
  try {
    return await Axios.get(
      `${pathHealthCareStore}/channel/${channelId}/outlet/${outletId}/item${buildParams(
        params
      )}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getStockDrugByOutletId = async (
  channelId: any,
  outletId: any,
  itemId: any
) => {
  try {
    return await Axios.get(
      `${pathHealthCareStore}/channel/${channelId}/outlet/${outletId}/item/${itemId}/stock`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const putStockDrugByOutletId = async (
  channelId: any,
  outletId: any,
  itemId: any,
  payload
) => {
  const path = `${pathHealthCareStore}/channel/${channelId}/outlet/${outletId}/item/${itemId}/stock`;
  try {
    return await Axios.put(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataDrug = async (channelId, payload) => {
  try {
    return await Axios.post(
      `${pathHealthCareStore}/channel/${channelId}/item`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const putDataDrug = async (channelId, itemId, payload) => {
  try {
    return await Axios.put(
      `${pathHealthCareStore}/channel/${channelId}/item/${itemId}`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailVariant = async ({
  providerId,
  itemId,
  variantId,
}: any) => {
  try {
    return await Axios.get(
      `${pathHealthCareStore}/channel/${providerId}/item/${itemId}/variant/${variantId}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const updateVariant = async ({
  providerId,
  itemId,
  variantId,
  data,
}: any) => {
  try {
    return await Axios.put(
      `${pathHealthCareStore}/channel/${providerId}/item/${itemId}/variant/${variantId}`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailProvider = async (channelId) => {
  try {
    const results: any[] = await Promise.allSettled([
      Axios.get(`${pathHealthCareStore}/channel/${channelId}`),
      Axios.get(`${pathMediverseCmsPrivate}/general-setting`),
    ]);

    const mappingData = results?.map((result) => {
      if (result?.status === 'fulfilled') {
        return result?.value?.data?.data;
      }
    });

    const mappingStatus = results?.map((result) => {
      return result?.status;
    });

    return {
      status: mappingStatus.includes('rejected') ? 'rejected' : 'fulfilled',
      data: Object.assign({}, ...mappingData),
    };
  } catch (error: any) {
    return error.response;
  }
};

export const getListDrugCategory = async (search?: any) => {
  try {
    const queryParams = buildParams({
      page: 1,
      size: 10,
      search: search,
      is_active: true,
    });
    const url = `${pathHealthCareStore}/drug/category${queryParams}`;
    return await Axios.get(`${url}`);
  } catch (error: any) {
    return error.response;
  }
};
