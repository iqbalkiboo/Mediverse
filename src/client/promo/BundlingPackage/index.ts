import Axios from '@/src/client/services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathMediverseReferral = paths.mediverseReferral;

export const getListBundlingPackage = async (params) => {
  const queryParams = buildParams({
    page: params.page,
    limit: params.limit,
    keyword: params.search,
    target_user: params.target,
    status: params.status,
    type: params.type,
    with_packages: true,
  });

  try {
    const path = `${pathMediverseReferral}/cms/voucher/list${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailBundlingPackage = async (id) => {
  try {
    const path = `${pathMediverseReferral}/cms/voucher/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListDrugElastic = async (params: any) => {
  const queryParams = buildParams({
    type: params.search === '' ? 'drug' : '',
    show_banned: false,
    sort_by_stock: 'desc',
    item_name: params.search,
    provider_id: params.providerId,
    limit: 5000,
  });

  try {
    const path = `${pathSearch}/medpharm${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};
