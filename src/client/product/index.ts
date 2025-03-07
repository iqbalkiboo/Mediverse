import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import Axios from '../services';

import type {
  IListMappingProductParams,
  IListProductCatalogParams,
} from '@/types/MasterProduct/product';

const pathHealthCareStore = paths.healthCareStore;

export const getListMappingProduct = async (
  params: IListMappingProductParams
) => {
  try {
    const queryParams = buildParams(params);
    const url = `${pathHealthCareStore}/channel/${params.channelId}/map-category/${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListProductCatalog = async (
  params: IListProductCatalogParams
) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      size: params.limit,
      keyword: params.keyword,
    });
    const url = `${pathHealthCareStore}/product-catalog${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailProductCatalog = async (params) => {
  try {
    const { sku } = params;
    const url = `${pathHealthCareStore}/product-catalog/${sku}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error?.response;
  }
};

export const postProductCatalog = async (payload) => {
  try {
    const url = `${pathHealthCareStore}/product-catalog`;
    return await Axios.post(url, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const postMapProduct = async (payload) => {
  try {
    return await Axios.post(
      `${pathHealthCareStore}/map-product-catalog`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postCategoryProduct = async (payload) => {
  try {
    return await Axios.post(
      `${pathHealthCareStore}/channel/${payload.channel_id}/map-category`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const putProductCatalog = async (sku, payload) => {
  try {
    const url = `${pathHealthCareStore}/product-catalog/${sku}`;
    return await Axios.put(url, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteProductCatalog = async (sku) => {
  try {
    const url = `${pathHealthCareStore}/product-catalog/${sku}`;
    return await Axios.delete(url);
  } catch (error: any) {
    return error.response;
  }
};
