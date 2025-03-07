import Axios from '@/src/client/services';
import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathMediverseReferral = paths.mediverseReferral;
const pathTransactionV2ApiPrivate = paths.transactionV2ApiPrivate;
const pathOnlineReservationClinicPrivate = paths.onlineReservationClinic;

export const getAmountBalanceMarketing = async () => {
  try {
    const path = `${pathTransactionV2ApiPrivate}/budget-balance/marketing`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getVoucherPromoCount = async (
  types: { type: string; providerType: string }[]
) => {
  try {
    const results = await Promise.all(
      types.map((type) => {
        const queryParams = buildParams({
          provider_type: type.providerType,
        });

        const path = `${pathMediverseReferral}/cms/voucher/${type.type}/count${queryParams}`;
        return Axios.get(path);
      })
    );

    return {
      ...results[0],
      data: results.reduce((object, item, index) => {
        return {
          ...object,
          [types[index].type]: item?.data?.data?.count,
        };
      }, {}),
    };
  } catch (error: any) {
    return error.response;
  }
};

export const getListVoucherPromo = async (params) => {
  const queryParams = buildParams({
    page: params.page,
    limit: params.limit,
    keyword: params.search,
    target_user: params.target,
    status: params.status,
    type: params.type,
    provider_type: params.providerType,
    with_packages: true,
    with_usages: true,
    with_items: true,
    provider_id: params.providerId,
  });

  try {
    const path = `${pathMediverseReferral}/cms/voucher/list${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailVoucherPromo = async (id) => {
  try {
    const path = `${pathMediverseReferral}/cms/voucher/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataVoucherPromo = async (data) => {
  try {
    const path = `${pathMediverseReferral}/cms/voucher`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataVoucherPromo = async (id: any, data: any) => {
  try {
    const path = `${pathMediverseReferral}/cms/voucher/${id}`;
    return await Axios.patch(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataQuotaVoucherPromo = async (id, payload) => {
  try {
    const path = `${pathMediverseReferral}/cms/voucher/${id}/quota`;
    return await Axios.put(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const disableDataVoucherPromo = async (id: any, data: any) => {
  try {
    const path = `${pathMediverseReferral}/cms/voucher/${id}/disable`;
    return await Axios.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const getListHealthFacility = async (
  providerId: string,
  params: any
) => {
  const queryParams = buildParams({
    page: 1,
    limit: 10,
    keyword: params.keyword,
  });

  try {
    const path = `${pathOnlineReservationClinicPrivate}/channel/${providerId}/clinic${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListTreatmentElastic = async (params: any) => {
  const queryParams = buildParams({
    type: params.search === '' ? 'treatment' : '',
    keyword: params.search,
    parent_id: params.parentId,
    show_banned: false,
  });

  try {
    const path = `${pathSearch}/medpoint${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};
