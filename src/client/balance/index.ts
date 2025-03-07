import Axios from '@/src/client/services';
import {paths} from '@/src/configs';
import dayjs from 'dayjs';
import {buildParams} from '@/src/utils/buildParams';
import {formatDateEng} from '@/src/utils/formatDate';

const pathTransactionV2 = paths.transactionV2;
const pathTransactionV2ApiPrivate = paths.transactionV2ApiPrivate;
const pathMediversePayment = paths.mediversePayment;

export const getListHistoryBalance = async (params) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      limit: params.limit,
      transaction_number: params.search,
      payment_type: params.transactionCategory || '',
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
    });
    const path = `${pathTransactionV2}/transaction/report/mediverse${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListHistoryBalanceProvider = async (params) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      limit: params.limit,
      transaction_number: params.search,
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
    });

    const path = `${pathTransactionV2}/transaction/report/provider${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getProviderBalances = async () => {
  const path = paths.transactionV2 + '/transaction/report/provider/saldo';
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getListBalanceProviderOrDelivery = async (params) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      limit: params.limit,
      transaction_number: params.search,
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
    });
    const path = `${pathTransactionV2}/transaction/report/mediverse/${params.transactionCategory}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getMediverseIncome = async ({
  startDate,
  endDate,
  search,
  paymentType,
}) => {
  const queryParams = buildParams({
    start_date: startDate,
    end_date: endDate,
    search: search,
    payment_type: paymentType,
  });

  const path = paths.transactionV2 + '/transaction/report/mediverse/income' + queryParams;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getProviderSales = async ({
  startDate,
  endDate,
  search,
}) => {
  const queryParams = buildParams({
    start_date: startDate,
    end_date: endDate,
    transaction_number: search,
  });

  const path = paths.transactionV2 + '/transaction/report/provider/sales' + queryParams;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getListBankProvider = async (params) => {
  try {
    const queryParams = buildParams({
      channel_id: params.channelId,
    });

    const path = `${pathMediversePayment}/bank_account/user${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListBank = async () => {
  try {
    const path = `${pathMediversePayment}/payment/banks`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataBankAccount = async (payload) => {
  try {
    const path = `${pathMediversePayment}/bank_account`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const patchDataBankAccount = async (payload) => {
  try {
    const path = `${pathMediversePayment}/bank_account/${payload.alias_name}`;
    return await Axios.patch(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataBankAccount = async (id) => {
  try {
    const path = `${pathMediversePayment}/bank_account/${id}`;
    return await Axios.delete(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadAdminTransaction = async ({
  startDate,
  endDate,
  edge,
}) => {
  try {
    const queryParams = buildParams({
      order: 'created_at',
      sort: 'DESC',
      start_date: startDate,
      end_date: endDate,
      edge,
    });
    const path = `${pathTransactionV2}/cms/download/${edge}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadBalanceEdge = async ({
  startDate,
  endDate,
  search,
  edge,
}) => {
  try {
    const queryParams = buildParams({
      order: 'created_at',
      sort: 'DESC',
      start_date: startDate,
      end_date: endDate,
      search,
    });
    const path = `${pathTransactionV2}/cms/download/${edge}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const payoutProvider = async (payload) => {
  try {
    const path = `${pathTransactionV2}/payout/provider`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadTransactionFee = async ({
  startDate,
  endDate,
  edge,
}) => {
  try {
    const queryParams = buildParams({
      order: 'created_at',
      sort: 'DESC',
      start_date: startDate,
      end_date: endDate,
    });
    const path = `${pathTransactionV2}/cms/download/${edge}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getTotalBalanceMarketing = async (types: {type: string}[]) => {
  try {
    const results = await Promise.all(types.map((type) => {
      const path = type.type === 'usage' ?
        `${pathTransactionV2ApiPrivate}/budget-history/calculate` :
        `${pathTransactionV2ApiPrivate}/budget-balance/${type.type}`;

      return Axios.get(path);
    }));

    return {
      ...results[0],
      data: results.reduce((object, item, index) => {
        return {
          ...object,
          [types[index].type]: item?.data?.data?.amount,
        };
      }, {}),
    };
  } catch (error: any) {
    return error.response;
  }
};

export const getAmountBalanceSubmission = async (types: {type: string}[]) => {
  try {
    const results = await Promise.all(types.map((type) => {
      const path = type.type === 'nicepay' ?
        `${pathMediversePayment}/budget-topup/balance/${type.type}` :
        `${pathTransactionV2ApiPrivate}/budget-request/${type.type}`;
      return Axios.get(path);
    }));

    return {
      ...results[0],
      data: results.reduce((object, item, index) => {
        return {
          ...object,
          [types[index].type]: item?.data?.data?.amount,
        };
      }, {}),
    };
  } catch (error: any) {
    return error.response;
  }
};

export const getListSubmissionHistory = async (params) => {
  try {
    const queryParams = buildParams({
      ...(params.type === 'referral') ? {budget_type: params.type} : {budget_sub_type: params.type},
      page: params.page,
      limit: params.limit,
      sufix: params.suffix,
      request_status: params.status,
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
    });

    const queryParamsBudgetTopup = buildParams({
      start_date: formatDateEng(dayjs().startOf('month')),
      end_date: formatDateEng(dayjs().endOf('month')),
    });

    const renderPathListSubmissionHistory = () => {
      switch (params.tab) {
        case 'list-submission':
        case 'submission-history':
          return `${pathTransactionV2ApiPrivate}/budget-request${queryParams}`;
        case 'balance-used-history':
          return `${pathTransactionV2ApiPrivate}/budget-history${queryParams}`;
        case 'top-up-history':
          return `${pathMediversePayment}/budget-topup/history/nicepay${queryParamsBudgetTopup}`;
        default:
          return '';
      }
    };

    const path = renderPathListSubmissionHistory();

    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataBalanceSubmission = async (data: any) => {
  try {
    const path = `${pathTransactionV2ApiPrivate}/budget-request`;
    return await Axios.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataStatusSubmission = async (payload) => {
  try {
    const path = `${pathTransactionV2ApiPrivate}/budget-request/${payload.id}`;
    return await Axios.patch(path, payload.data);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadFileBalanceMarketing = async (params) => {
  try {
    const queryParams = buildParams({
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
    });

    const queryParamsBudgetTopup = buildParams({
      start_date: formatDateEng(dayjs().startOf('month')),
      end_date: formatDateEng(dayjs().endOf('month')),
      payment_provider_name: 'nicepay',
    });

    const renderPathDownloadFile = () => {
      switch (params.type) {
        case 'list-submission':
        case 'submission-history':
          return `${pathTransactionV2ApiPrivate}/download/csv/budget-request${queryParams}`;
        case 'balance-used-history':
          return `${pathTransactionV2ApiPrivate}/download/csv/budget-history${queryParams}`;
        case 'top-up-history':
          return `${pathTransactionV2ApiPrivate}/download/csv/budget-topup${queryParamsBudgetTopup}`;
        default:
          return `${pathTransactionV2ApiPrivate}/download/csv/budget-request${queryParams}`;
      }
    };

    const path = renderPathDownloadFile();

    return await Axios.get(path, {responseType: 'blob'});
  } catch (error: any) {
    return error.response;
  };
};
