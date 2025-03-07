import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {isEmpty} from 'lodash';
import {formatDateEng} from '@/src/utils/formatDate';
import dayjs from 'dayjs';

export const getDataMapApi = async (payload) => {
  const path = paths.search + '/result/count';

  try {
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getTransactionSaleCategoryApi = async () => {
  const path = paths.transactionV2 + '/cms/transaction/dashboard/all';

  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};


export const getFunnelTransactions = async (providerType) => {
  const path = paths.transactionV2 + `/cms/transaction/dashboard/status-activity/${providerType}`;

  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getTodayActivityPharmacy = async () => {
  const path = paths.transactionV2 + '/cms/transaction/dashboard/today-activity/outlet';

  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getPurchaseCurrentMonth = async () => {
  const path = paths.transactionV2 + '/cms/transaction/dashboard/current-month-purchase';

  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getCurrentMonthIncome = async () => {
  const path = paths.transactionV2 + '/cms/transaction/dashboard/current-month-activity';

  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getActivityChart = async (params) => {
  const queryParams = buildParams({
    year: params.year,
    month: params.month,
    with_product: true,
    with_previous_month: params.previousMonth,
    with_previous_year: params.previousYear,
    with_percentage: params.percentage,
    is_completed: params.isComplete,
  });
  try {
    const path = `${paths.transactionV2}/cms/transaction/dashboard/activity-chart${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getStatisticCurrentMonth = async ({
  year,
  type,
  provider,
}) => {
  let url = `gmv-chart?year=${year}`;

  if (type === 'net') {
    url = `nmv-chart?year=${year}`;
  }

  if (!isEmpty(provider)) {
    url += `&provider_type=${provider}`;
  }

  const path = paths.transactionV2 + `/cms/transaction/dashboard/${url}`;

  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getCurrentMonthIncomeProvider = async () => {
  const path = paths.transactionV2 + '/cms/transaction/dashboard/current-month-income';
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getCurrentMonthActivityProvider = async () => {
  const path = paths.transactionV2 + '/cms/transaction/dashboard/current-month-activity';
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getCurrentMonthEstiomationExpense = async (params) => {
  const queryParams = buildParams({
    year_month: params,
  });
  const path = paths.mediverseReferral + '/cms/voucher/dashboard/spending-estimation' + queryParams;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getMediverseBalances = async () => {
  const path = paths.transactionV2 + '/transaction/report/mediverse/saldo';
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getMediverseTransactions = async ({
  startDate,
  endDate,
}) => {
  const queryParams = buildParams({
    start_date: startDate,
    end_date: endDate,
    payment_type: 'midtrans',
  });
  const path = paths.transactionV2 + '/transaction/report/mediverse' + queryParams;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getFinanceRecapitulation = async ({
  startDate,
  endDate,
}) => {
  const queryParams = buildParams({
    start_date: startDate,
    end_date: endDate,
  });
  const path = paths.transactionV2 + '/transaction/report/admin/saldo' + queryParams;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getVoucherCashback = async () => {
  const path = paths.mediverseReferral + '/cms/voucher/cashback/info';
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getVoucherFreeDelivery = async () => {
  const path = paths.mediverseReferral + '/cms/voucher/free-delivery/info';
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getTodayActivityHealthFacility = async () => {
  try {
    const path = `${paths.transactionV2}/cms/transaction/dashboard/today-activity/clinic`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getCurrentMonthActivityHealthFacility = async () => {
  try {
    const path = `${paths.transactionV2}/cms/transaction/dashboard/current-month-activity`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getActivityChartHealthFacility = async (params) => {
  try {
    const queryParams = buildParams({
      year: params.year,
      with_product: true,
    });

    const path = `${paths.transactionV2}/cms/transaction/dashboard/activity-chart${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getReportFinance = async () => {
  const queryParams = buildParams({
    this_month: true,
  });
  const path = paths.transactionV2 + `/transaction/report/mediverse/saldo${queryParams}`;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getIncomeMediverse = async () => {
  try {
    const queryParams = buildParams({
      start_date: formatDateEng(dayjs().startOf('month')),
      end_date: formatDateEng(dayjs().endOf('month')),
    });
    const path = `${paths.transactionV2}/transaction/report/mediverse/income${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getIncomeProvider = async () => {
  const path = `${paths.transactionV2}/cms/transaction/dashboard/current-month-income`;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getProviderSaldo = async () => {
  const path = paths.transactionV2 + '/transaction/report/provider/saldo';
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getHistoryReportProvider = async () => {
  const path = paths.transactionV2 + '/transaction/report/provider';
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error?.response;
  }
};

export const getDataDeviceUsed = async () => {
  try {
    const payload = {
      type: 'registered_user',
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataActivityUser = async (params) => {
  try {
    const payload = {
      type: 'registered_user',
      month: params.month,
    };

    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataActiveUser = async (params) => {
  try {
    const payload = {
      month: params.month,
      type: 'active_user',
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getActivityUserProduct = async (params) => {
  try {
    const payload = {
      type: 'transaction',
      sub_type: params.product,
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};


export const getDataMostVisitedFeature = async (params) => {
  try {
    const payload = {
      type: 'visited',
      month: params.month,
      year: dayjs().year(),
    };

    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataMostReadArticle = async (params) => {
  try {
    const payload = {
      month: params.month,
      type: 'article',
      year: dayjs().year(),
    };

    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataMostUsedFeature = async (params) => {
  try {
    const payload = {
      type: 'visited',
      month: params.month,
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getPerformanceChartYear = async (params) => {
  try {
    const payload = {
      type: 'registered_user',
      year: params.year,
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getChartActiveUser = async (params) => {
  try {
    const payload = {
      type: 'active_user',
      year: params.year,
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getChartPurchaseUser = async (params) => {
  try {
    const payload = {
      type: 'transaction',
      year: params.year,
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};


export const getChartGenderComparison = async () => {
  try {
    const payload = {
      type: 'registered_user',
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getChartAgeComparson = async () => {
  try {
    const payload = {
      type: 'registered_user',
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getActiveUserLocation = async (payload) => {
  try {
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getPurchaseValueMonth = async (params) => {
  try {
    const payload = {
      month: params.month,
      type: 'transaction',
      sub_type: params.product,
    };
    const path = `${paths.search}/result`;
    return await Axios.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};
