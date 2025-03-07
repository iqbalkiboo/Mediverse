import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {dateToUnixTimeStamp} from '@/src/utils/dates';
import {TRANSACTION_STATUS_RESPONSE} from '@/src/constants';
import {transformStatusPrescription} from '@/src/utils/transactionEPrescription';

const pathMediverseTransaction = paths.transactionV2;
const pathSearch = paths.search;

export const getListEPrescription = async (params) => {
  try {
    let queryParamsInProgress = '';
    const queryParams = buildParams({
      page: params.page,
      limit: params.limit,
      status: params.status,
      keyword: params.search,
      end_date: params.endDate ? dateToUnixTimeStamp(params.endDate) : '',
      start_date: params.startDate ? dateToUnixTimeStamp(params.startDate) : '',
      transaction_status: params.transactionStatus,
    });

    const path = `${pathMediverseTransaction}/cms/transaction/prescription${queryParams}`;
    const paramsStatus = transformStatusPrescription(params.status);

    if (([
      TRANSACTION_STATUS_RESPONSE.NEW,
      TRANSACTION_STATUS_RESPONSE.ADMIN_CONFIRMATION,
    ]).includes(params.status)) {
      queryParamsInProgress = buildParams({
        page: params.page,
        limit: params.limit,
        status: paramsStatus,
        keyword: params.search,
        end_date: params.endDate ? dateToUnixTimeStamp(params.endDate) : '',
        start_date: params.startDate ? dateToUnixTimeStamp(params.startDate) : '',
        transaction_status: params.transactionStatus,
      });

      const pathNew = `${pathMediverseTransaction}/cms/transaction/prescription${queryParamsInProgress}`;
      const reqOne = await Axios.get(path);
      const reqTwo = await Axios.get(pathNew);
      const results = await Promise.all([reqOne, reqTwo]);
      const transformData = results.map((res) => {
        if (res.status === 200) {
          return res.data.data;
        }
      }).flat().filter((item) => item);

      return {
        data: {
          data: transformData,
          type: paramsStatus,
          metadata: {total_row: transformData.length},
        },
      };
    } else {
      return await Axios.get(path);
    }
  } catch (error: any) {
    return error?.response;
  }
};

export const getDetailEPrescription = async (params) => {
  try {
    const {id} = params;
    const path = `${pathMediverseTransaction}/cms/transaction/prescription/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const postCancelOrderEPresription = async (payload: any) => {
  try {
    const {id} = payload;
    const path = `${pathMediverseTransaction}/cms/transaction/prescription/${id}/reject`;
    return await Axios.put(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const putConfirmEPrescription = async (id, payload) => {
  const action = payload.action;
  const body = {
    items: payload.item,
    total_amount: payload.total_amount,
    items_mixture: payload.items_mixture,
  };
  try {
    return await Axios.put(`${pathMediverseTransaction}/cms/transaction/prescription/${id}/${action}`, body);
  } catch (error: any) {
    return error.response;
  }
};


export const patchHowToUseEPrescription = async (id, payload) => {
  const body = {
    data: payload,
  };
  try {
    return await Axios.patch(`${pathMediverseTransaction}/cms/transaction/prescription/${id}/how-to-use`, body);
  } catch (error: any) {
    return error.response;
  }
};

export const getListDrugs = async (params) => {
  const queryParams = buildParams({
    type: 'drug',
    keyword: params.search,
    limit: 5000,
  });
  try {
    return await Axios.get(`${pathSearch}/medpharm${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const putClaimPrescription = async (payload) => {
  const {params, body} = payload;
  const {id, action} = params;
  try {
    return await Axios.put(`${pathMediverseTransaction}/cms/transaction/prescription/${id}/${action}`, body);
  } catch (error: any) {
    return error.response;
  }
};

export const postRegisterJID = async (payload: any) => {
  const url = paths.mediverseChat;
  try {
    return await Axios.post(`${url}/users/mediverse.id`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getJID = async () => {
  const url = paths.mediverseChat;
  try {
    return await Axios.get(`${url}/users/mediverse.id`);
  } catch (error: any) {
    return error.response;
  }
};

export const getStockDrug = async (id: any) => {
  try {
    return await Axios.get(`${pathSearch}/medpharm/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataCopyRecipe = async (id: string, data: any) => {
  try {
    const path = `${pathMediverseTransaction}/cms/transaction/prescription/${id}/copy-recipe`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadFileCopyRecipe = async (id: string | number) => {
  try {
    const path = `${pathMediverseTransaction}/cms/transaction/prescription/${id}/copy-recipe`;
    return await Axios.get(path, {responseType: 'blob'});
  } catch (error: any) {
    return error.response;
  };
};
