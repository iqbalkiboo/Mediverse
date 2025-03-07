import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import Axios from '../services';

import type { IListProductCatalogParams } from '@/types/MasterProduct/product';

const pathHealthCareStore = paths.healthCareStore;

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
