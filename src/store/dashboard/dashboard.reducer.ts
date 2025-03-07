import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getActiveUserLocation,
  getActivityChart,
  getActivityChartHealthFacility,
  getActivityUserProduct,
  getChartActiveUser,
  getChartAgeComparson,
  getChartGenderComparison,
  getChartPurchaseUser,
  getCurrentMonthActivityHealthFacility,
  getCurrentMonthActivityProvider,
  getCurrentMonthEstiomationExpense,
  getCurrentMonthIncome,
  getCurrentMonthIncomeProvider,
  getDataActiveUser,
  getDataActivityUser,
  getDataDeviceUsed,
  getDataMapApi,
  getDataMostReadArticle,
  getDataMostUsedFeature,
  getDataMostVisitedFeature,
  getFinanceRecapitulation,
  getFunnelTransactions,
  getHistoryReportProvider,
  getIncomeMediverse,
  getIncomeProvider,
  getMediverseBalances,
  getMediverseTransactions,
  getPerformanceChartYear,
  getProviderSaldo,
  getPurchaseCurrentMonth,
  getPurchaseValueMonth,
  getReportFinance,
  getStatisticCurrentMonth,
  getTodayActivityHealthFacility,
  getTodayActivityPharmacy,
  getTransactionSaleCategoryApi,
  getVoucherCashback,
  getVoucherFreeDelivery,
} from '@/client/dashboard';
import dayjs from 'dayjs';

const initialState = {
  map: {
    isLoading: false,
    data: {
      medevo: {
        doctor: 0,
      },
      medpharm: {
        drug: 0,
      },
      medpoint: {
        clinic: 0,
        hospital: 0,
        lab: 0,
      },
    },
    isError: false,
    errorMessage: '',
  },
  transactionSale: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {
      product: 0,
      service: 0,
      transaction_complaint: 0,
      transaction_complete: 0,
      transaction_refund: {
        count: 0,
        total_amount: 0,
      },
      transaction_type: {
        medevo: 0,
        medpharm: 0,
        medpoint: 0,
      },
    },
  },
  funnel: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {
      transaction_created: 0,
      transaction_ongoing: 0,
      transaction_complete: 0,
    },
  },
  selectedFunnelProvider: {
    label: 'Medevo',
    value: 'medevo',
  },
  purchase: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {
      gmv: {
        current_month: 0,
        previous_month: 0,
        comparison_percentage: 0,
      },
      nmv: {
        current_month: 0,
        previous_month: 0,
        comparison_percentage: 0,
      },
    },
  },
  todayActivityPharmacy: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  monthActivityPharmacy: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  chartActivityPharmacy: {
    isOpen: false,
    month: dayjs().month() + 1,
    modalMonth: dayjs().month() + 1,
    currentMonth: dayjs().month() + 1,
    year: dayjs().year(),
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
    modalOpen: false,
  },
  statisticCurrentMonth: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    selectedYear: dayjs().year(),
    data: [],
    providerType: '',
  },
  currentMonthIncomeProvider: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  currentMonthActivityProvider: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  currentMonthEstimationExpense: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    isOpenModal: false,
    month: dayjs().month() + 1,
    modalMonth: dayjs().month() + 1,
    currentMonth: dayjs().month() + 1,
    year: dayjs().year(),
    data: {},
  },
  recapitulation: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  recapitulationAdmin: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  todayActivityHealthFacility: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  transactionHistories: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  currentMonthActivityHealthFacility: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  chartActivityHealthFacility: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    selectedYear: dayjs().year(),
    data: {},
  },
  voucherCashback: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  voucherFreeDelivery: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  dashboardFinance: {
    income: {},
    incomeHistory: [],
    incomeProvider: {},
    providerSaldo: {},
    statusIncome: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    statusIncomeHistory: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    statusIncomeProvider: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
  },
  chartPerformance: {
    allYearPerformance: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
      errorMessage: '',
      params: {
        year: dayjs().year(),
      },
    },
    monthlyActiveUser: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
      errorMessage: '',
      params: {
        year: dayjs().year(),
      },
    },
    purchaseUser: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
      errorMessage: '',
      params: {
        year: dayjs().year(),
      },
    },
  },
  chartComparison: {
    gender: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
    age: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
  },
  userActiveLocation: {
    isLoading: false,
    isError: false,
    isSucces: false,
    data: {
      'id-ac': 0,
      'id-jt': 0,
      'id-be': 0,
      'id-bt': 0,
      'id-kb': 0,
      'id-bb': 0,
      'id-ba': 0,
      'id-ji': 0,
      'id-ks': 0,
      'id-nt': 0,
      'id-se': 0,
      'id-kr': 0,
      'id-ib': 0,
      'id-su': 0,
      'id-ri': 0,
      'id-sw': 0,
      'id-ku': 0,
      'id-la': 0,
      'id-sb': 0,
      'id-ma': 0,
      'id-nb': 0,
      'id-sg': 0,
      'id-st': 0,
      'id-pa': 0,
      'id-jr': 0,
      'id-ki': 0,
      'id-1024': 0,
      'id-jk': 0,
      'id-go': 0,
      'id-yo': 0,
      'id-sl': 0,
      'id-sr': 0,
      'id-ja': 0,
      'id-kt': 0,
    },
    params: {
      month: dayjs().month() + 1,
    },
  },
  deviceUsed: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  activityUser: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    params: {
      month: dayjs().month() + 1,
    },
  },
  activeUser: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    params: {
      month: dayjs().month() + 1,
    },
  },
  activeUserTransaction: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    params: {
      month: dayjs().month() + 1,
      product: '',
    },
  },
  mostVisitedFeature: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
    params: {
      month: dayjs().month() + 1,
    },
  },
  mostReadArticle: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
    params: {
      month: dayjs().month() + 1,
    },
  },
  mostUsedFeature: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
    params: {
      month: dayjs().month() + 1,
    },
  },
  purchaseValueMonth: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
    params: {
      product: '',
      month: dayjs().month() + 1,
    },
  },
};

export const resolvGetDataMap = createAsyncThunk(
    'resolve/transaction/locations',
    async (payload: {
      coordinates: number[][],
    }, {rejectWithValue}) => {
      const response = await getDataMapApi(payload.coordinates);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveSaleTransactionCategory = createAsyncThunk(
    'resolve/transaction/sale',
    async (payload, {rejectWithValue}) => {
      const response = await getTransactionSaleCategoryApi();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveFunnelTransactions = createAsyncThunk(
    'resolve/transaction/funnel',
    async (payload: {
      provider: string
    }, {rejectWithValue}) => {
      const response = await getFunnelTransactions(payload.provider);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveTodayActivityPharmacy = createAsyncThunk(
    'resolve/todayActivity/pharmacy',
    async (payload, {rejectWithValue}) => {
      const response = await getTodayActivityPharmacy();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolvePurchaseCurrentMonth = createAsyncThunk(
    'resolve/transaction/purchase-current-month',
    async (payload, {rejectWithValue}) => {
      const response = await getPurchaseCurrentMonth();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveMonthActivityPharmacy = createAsyncThunk(
    'resolve/monthActivityPharmacy/pharmacy',
    async (payload, {rejectWithValue}) => {
      const response = await getCurrentMonthIncome();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveActivityChartPharmacy = createAsyncThunk(
    'resolve/chartActivity/pharmacy',
    async (payload: any, {rejectWithValue}) => {
      const response = await getActivityChart(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);


export const resolveStatisticCurrentMonth = createAsyncThunk(
    'resolve/transaction/statistic-current-month',
    async (payload: {
    year: number;
    type: string;
    provider: string;
  }, {rejectWithValue}) => {
      const response = await getStatisticCurrentMonth({
        year: payload.year,
        type: payload.type,
        provider: payload.provider,
      });
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetChartPerformanceYear = createAsyncThunk(
    'resolve/performance/chart-register-user',
    async (payload: any, {rejectWithValue}) => {
      const response = await getPerformanceChartYear(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetChartActiveUser = createAsyncThunk(
    'resolve/performance/chart-active-user',
    async (payload: any, {rejectWithValue}) => {
      const response = await getChartActiveUser(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetChartPurchaseUser = createAsyncThunk(
    'resolve/performance/chart-purchase-user',
    async (payload: any, {rejectWithValue}) => {
      const response = await getChartPurchaseUser(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveChartGenderComparison = createAsyncThunk(
    'resolve/comparison/chart-gender',
    async (payload, {rejectWithValue}) => {
      const response = await getChartGenderComparison();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveChartAgeComparison = createAsyncThunk(
    'resolve/comparison/chart-age',
    async (payload, {rejectWithValue}) => {
      const response = await getChartAgeComparson();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveUserActiveLocation = createAsyncThunk(
    'resolve/location/user-active',
    async (payload: any, {rejectWithValue}) => {
      const response = await getActiveUserLocation({
        year: payload.year,
      });
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolvCurrentMonthIncomeProvider = createAsyncThunk(
    'resolve/transaction/current-month-income',
    async (payload, {rejectWithValue}) => {
      const response = await getCurrentMonthIncomeProvider();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolvCurrentMonthActivityProvider = createAsyncThunk(
    'resolve/transaction/current-month-activity',
    async (payload, {rejectWithValue}) => {
      const response = await getCurrentMonthActivityProvider();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveCurrentMonthEstimationExpense = createAsyncThunk(
    'resolve/transaction/current-month-estimation-expense',
    async (payload: any, {rejectWithValue}) => {
      const response = await getCurrentMonthEstiomationExpense(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetMediverseBalances = createAsyncThunk(
    'resolve/transaction/mediverse/saldo',
    async (params, {rejectWithValue}) => {
      const response = await getMediverseBalances();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetMediverseTransactions = createAsyncThunk(
    'resolve/transaction/mediverse',
    async (params: {
      startDate: string,
      endDate: string,
    }, {rejectWithValue}) => {
      const response = await getMediverseTransactions(params);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetFinanceRecapitulation = createAsyncThunk(
    'resolve/transaction/finance/saldo',
    async (params: {
      startDate: string,
      endDate: string,
    }, {rejectWithValue}) => {
      const response = await getFinanceRecapitulation(params);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveTodayActivityHealthFacility = createAsyncThunk(
    'resolve/todayActivity/healthFacility',
    async (payload, {rejectWithValue}) => {
      const response = await getTodayActivityHealthFacility();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveCurrentMonthActivityHealthFacility = createAsyncThunk(
    'resolve/currentMonthActivity/healthFacility',
    async (payload, {rejectWithValue}) => {
      const response = await getCurrentMonthActivityHealthFacility();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveChartActivityHealthFacility = createAsyncThunk(
    'resolve/chartActivity/healthFacility',
    async (payload: {
    year: any,
  }, {rejectWithValue}) => {
      const response = await getActivityChartHealthFacility(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);


export const resolveGetVoucherCashback = createAsyncThunk(
    'resolve/referral/voucher-cashback',
    async (payload, {rejectWithValue}) => {
      const response = await getVoucherCashback();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetVoucherFreeDelivery = createAsyncThunk(
    'resolve/referral/voucher-free-delivery',
    async (payload, {rejectWithValue}) => {
      const response = await getVoucherFreeDelivery();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetIncomeMediverse = createAsyncThunk(
    'resolve/finance/mediverse/income',
    async (payload, {rejectWithValue}) => {
      const response = await getReportFinance();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveGetIncomeHistoryMediverse = createAsyncThunk(
    'resolve/finance/mediverse/income/history',
    async (payload, {rejectWithValue}) => {
      const response = await getIncomeMediverse();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveGetIncomeHistoryProvider = createAsyncThunk(
    'resolve/finance/provider/income/history',
    async (payload, {rejectWithValue}) => {
      const response = await getHistoryReportProvider();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveGetIncomeProvider = createAsyncThunk(
    'resolve/finance/mediverse/income/provider',
    async (payload, {rejectWithValue}) => {
      const response = await getIncomeProvider();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveGetProviderSaldo = createAsyncThunk(
    'resolve/finance/provider/saldo',
    async (payload, {rejectWithValue}) => {
      const response = await getProviderSaldo();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
); resolvGetDataMap;

export const resolveGetDataDeviceUsed = createAsyncThunk(
    'resolve/deviceUsed/get',
    async (payload, {rejectWithValue}) => {
      const response = await getDataDeviceUsed();
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetDataActivityUser = createAsyncThunk(
    'resolve/activityUser/get',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDataActivityUser(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetDataActiveUser = createAsyncThunk(
    'resolve/activeUser/get',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDataActiveUser(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetActiveUserProduct = createAsyncThunk(
    'resolve/active-user-product/get',
    async (payload: any, {rejectWithValue}) => {
      const response = await getActivityUserProduct(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetDataMostVisitedFeature = createAsyncThunk(
    'resolve/most-visited-feature/get',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDataMostVisitedFeature(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetDataMostReadArticle = createAsyncThunk(
    'resolve/most-read-article/get',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDataMostReadArticle(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetDataMostUsedFeature = createAsyncThunk(
    'resolve/most-used-feature/get',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDataMostUsedFeature(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolvePurchaseValueMonth = createAsyncThunk(
    'resolve/purchaseValueMonth/get',
    async (payload: any, {rejectWithValue}) => {
      const response = await getPurchaseValueMonth(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolvGetDataMap.pending, (state) => {
      state.map.isLoading = true;
      state.map.isError = false;
    });
    builder.addCase(resolvGetDataMap.fulfilled, (state, {payload}) => {
      state.map.isLoading = false;
      state.map.isError = false;
      state.map.data = payload;
    });
    builder.addCase(resolvGetDataMap.rejected, (state, {payload}) => {
      state.map.isLoading = false;
      state.map.isError = true;
      state.map.errorMessage = payload as string;
    });
    builder.addCase(resolveSaleTransactionCategory.pending, (state) => {
      state.transactionSale.isLoading = true;
      state.transactionSale.isError = false;
    });
    builder.addCase(resolveSaleTransactionCategory.fulfilled, (state, {payload}) => {
      state.transactionSale.isLoading = false;
      state.transactionSale.isError = false;
      state.transactionSale.data = payload.data;
    });
    builder.addCase(resolveSaleTransactionCategory.rejected, (state, {payload}) => {
      state.transactionSale.isLoading = false;
      state.transactionSale.isError = true;
      state.transactionSale.errorMessage = payload as string;
    });
    // get sale transaction pharmacy
    builder.addCase(resolveTodayActivityPharmacy.pending, (state) => {
      state.todayActivityPharmacy.isLoading = true;
      state.todayActivityPharmacy.isError = false;
    });
    builder.addCase(resolveTodayActivityPharmacy.fulfilled, (state, {payload}) => {
      state.todayActivityPharmacy.isLoading = false;
      state.todayActivityPharmacy.isError = false;
      state.todayActivityPharmacy.data = payload.data;
    });
    builder.addCase(resolveTodayActivityPharmacy.rejected, (state, {payload}) => {
      state.todayActivityPharmacy.isLoading = false;
      state.todayActivityPharmacy.isError = true;
      state.todayActivityPharmacy.errorMessage = payload as string;
    });
    // get month activity pharmacy
    builder.addCase(resolveMonthActivityPharmacy.pending, (state) => {
      state.monthActivityPharmacy.isLoading = true;
      state.monthActivityPharmacy.isError = false;
    });
    builder.addCase(resolveMonthActivityPharmacy.fulfilled, (state, {payload}) => {
      state.monthActivityPharmacy.isLoading = false;
      state.monthActivityPharmacy.isError = false;
      state.monthActivityPharmacy.data = payload.data;
    });
    builder.addCase(resolveMonthActivityPharmacy.rejected, (state, {payload}) => {
      state.monthActivityPharmacy.isError = true;
      state.monthActivityPharmacy.isLoading = false;
      state.monthActivityPharmacy.errorMessage = payload as string;
    });
    // get chart activity month
    builder.addCase(resolveActivityChartPharmacy.pending, (state, {payload}) => {
      state.chartActivityPharmacy.isError = false;
      state.chartActivityPharmacy.isLoading = true;
    });
    builder.addCase(resolveActivityChartPharmacy.fulfilled, (state, {payload}) => {
      state.chartActivityPharmacy.isError = false;
      state.chartActivityPharmacy.isLoading = false;
      state.chartActivityPharmacy.data = payload.data;
    });
    builder.addCase(resolveActivityChartPharmacy.rejected, (state, {payload}) => {
      state.chartActivityPharmacy.isError = true;
      state.chartActivityPharmacy.isLoading = false;
      state.chartActivityPharmacy.errorMessage = payload as string;
    });
    builder.addCase(resolveFunnelTransactions.pending, (state) => {
      state.funnel.isLoading = true;
      state.funnel.isError = false;
    });
    builder.addCase(resolveFunnelTransactions.fulfilled, (state, {payload}) => {
      state.funnel.isLoading = false;
      state.funnel.isError = false;
      state.funnel.data = payload.data;
    });
    builder.addCase(resolveFunnelTransactions.rejected, (state, {payload}) => {
      state.funnel.isLoading = false;
      state.funnel.isError = true;
      state.funnel.errorMessage = payload as string;
    });
    builder.addCase(resolvePurchaseCurrentMonth.pending, (state) => {
      state.purchase.isLoading = true;
      state.purchase.isError = false;
    });
    builder.addCase(resolvePurchaseCurrentMonth.fulfilled, (state, {payload}) => {
      state.purchase.isLoading = false;
      state.purchase.isError = false;
      state.purchase.data = payload.data;
    });
    builder.addCase(resolvePurchaseCurrentMonth.rejected, (state, {payload}) => {
      state.purchase.isLoading = false;
      state.purchase.isError = true;
      state.purchase.errorMessage = payload as string;
    });
    builder.addCase(resolveStatisticCurrentMonth.pending, (state) => {
      state.statisticCurrentMonth.isLoading = true;
      state.statisticCurrentMonth.isError = false;
    });
    builder.addCase(resolveStatisticCurrentMonth.fulfilled, (state, {payload}) => {
      state.statisticCurrentMonth.isLoading = false;
      state.statisticCurrentMonth.isError = false;
      state.statisticCurrentMonth.data = payload.data;
    });
    builder.addCase(resolveStatisticCurrentMonth.rejected, (state, {payload}) => {
      state.statisticCurrentMonth.isLoading = false;
      state.statisticCurrentMonth.isError = true;
      state.statisticCurrentMonth.errorMessage = payload as string;
    });
    builder.addCase(resolvCurrentMonthIncomeProvider.pending, (state) => {
      state.currentMonthIncomeProvider.isLoading = true;
      state.currentMonthIncomeProvider.isError = false;
    });
    builder.addCase(resolvCurrentMonthIncomeProvider.fulfilled, (state, {payload}) => {
      state.currentMonthIncomeProvider.isLoading = false;
      state.currentMonthIncomeProvider.isError = false;
      state.currentMonthIncomeProvider.data = payload.data;
    });
    builder.addCase(resolvCurrentMonthIncomeProvider.rejected, (state, {payload}) => {
      state.currentMonthIncomeProvider.isLoading = false;
      state.currentMonthIncomeProvider.isError = true;
      state.currentMonthIncomeProvider.errorMessage = payload as string;
    });
    builder.addCase(resolvCurrentMonthActivityProvider.pending, (state) => {
      state.currentMonthActivityProvider.isLoading = true;
      state.currentMonthActivityProvider.isError = false;
    });
    builder.addCase(resolvCurrentMonthActivityProvider.fulfilled, (state, {payload}) => {
      state.currentMonthActivityProvider.isLoading = false;
      state.currentMonthActivityProvider.isError = false;
      state.currentMonthActivityProvider.data = payload.data;
    });
    builder.addCase(resolvCurrentMonthActivityProvider.rejected, (state, {payload}) => {
      state.currentMonthActivityProvider.isLoading = false;
      state.currentMonthActivityProvider.isError = true;
      state.currentMonthActivityProvider.errorMessage = payload as string;
    });

    builder.addCase(resolveCurrentMonthEstimationExpense.pending, (state) => {
      state.currentMonthEstimationExpense.isLoading = true;
      state.currentMonthEstimationExpense.isError = false;
    });
    builder.addCase(resolveCurrentMonthEstimationExpense.fulfilled, (state, {payload}) => {
      state.currentMonthEstimationExpense.isLoading = false;
      state.currentMonthEstimationExpense.isError = false;
      state.currentMonthEstimationExpense.data = payload.data;
    });
    builder.addCase(resolveCurrentMonthEstimationExpense.rejected, (state, {payload}) => {
      state.currentMonthEstimationExpense.isLoading = false;
      state.currentMonthEstimationExpense.isError = true;
      state.currentMonthEstimationExpense.errorMessage = payload as string;
    });
    // mediverse saldo
    builder.addCase(resolveGetMediverseBalances.pending, (state) => {
      state.recapitulation.isLoading = true;
      state.recapitulation.isError = false;
    });
    builder.addCase(resolveGetMediverseBalances.fulfilled, (state, {payload}) => {
      state.recapitulation.isLoading = false;
      state.recapitulation.isError = false;
      state.recapitulation.data = payload.data;
    });
    builder.addCase(resolveGetMediverseBalances.rejected, (state, {payload}) => {
      state.recapitulation.isLoading = false;
      state.recapitulation.isError = true;
      state.recapitulation.errorMessage = payload as string;
    });
    // mediverse transaction list
    builder.addCase(resolveGetMediverseTransactions.pending, (state) => {
      state.transactionHistories.isLoading = true;
      state.transactionHistories.isError = false;
    });
    builder.addCase(resolveGetMediverseTransactions.fulfilled, (state, {payload}) => {
      state.transactionHistories.isLoading = false;
      state.transactionHistories.isError = false;
      state.transactionHistories.data = payload.data;
    });
    builder.addCase(resolveGetMediverseTransactions.rejected, (state, {payload}) => {
      state.transactionHistories.isLoading = false;
      state.transactionHistories.isError = true;
      state.transactionHistories.errorMessage = payload as string;
    });
    // finance recapitulation
    builder.addCase(resolveGetFinanceRecapitulation.pending, (state) => {
      state.recapitulationAdmin.isLoading = true;
      state.recapitulationAdmin.isError = false;
    });
    builder.addCase(resolveGetFinanceRecapitulation.fulfilled, (state, {payload}) => {
      state.recapitulationAdmin.isLoading = false;
      state.recapitulationAdmin.isError = false;
      state.recapitulationAdmin.data = payload.data;
    });
    builder.addCase(resolveGetFinanceRecapitulation.rejected, (state, {payload}) => {
      state.recapitulationAdmin.isLoading = false;
      state.recapitulationAdmin.isError = true;
      state.recapitulationAdmin.errorMessage = payload as string;
    });

    // Get Today Activity Health Facility
    builder.addCase(resolveTodayActivityHealthFacility.pending, (state) => {
      state.todayActivityHealthFacility.isLoading = true;
      state.todayActivityHealthFacility.isError = false;
    });
    builder.addCase(resolveTodayActivityHealthFacility.fulfilled, (state, {payload}) => {
      state.todayActivityHealthFacility.isLoading = false;
      state.todayActivityHealthFacility.isError = false;
      state.todayActivityHealthFacility.data = payload.data;
    });
    builder.addCase(resolveTodayActivityHealthFacility.rejected, (state, {payload}) => {
      state.todayActivityHealthFacility.isLoading = false;
      state.todayActivityHealthFacility.isError = true;
      state.todayActivityHealthFacility.errorMessage = payload as string;
    });

    // Get Current Month Activiry Health Facility
    builder.addCase(resolveCurrentMonthActivityHealthFacility.pending, (state) => {
      state.currentMonthActivityHealthFacility.isLoading = true;
      state.currentMonthActivityHealthFacility.isError = false;
    });
    builder.addCase(resolveCurrentMonthActivityHealthFacility.fulfilled, (state, {payload}) => {
      state.currentMonthActivityHealthFacility.isLoading = false;
      state.currentMonthActivityHealthFacility.isError = false;
      state.currentMonthActivityHealthFacility.data = payload.data;
    });
    builder.addCase(resolveCurrentMonthActivityHealthFacility.rejected, (state, {payload}) => {
      state.currentMonthActivityHealthFacility.isError = true;
      state.currentMonthActivityHealthFacility.isLoading = false;
      state.currentMonthActivityHealthFacility.errorMessage = payload as string;
    });

    // Get Chart Activiry Health Facility
    builder.addCase(resolveChartActivityHealthFacility.pending, (state, {payload}) => {
      state.chartActivityHealthFacility.isError = false;
      state.chartActivityHealthFacility.isLoading = true;
    });
    builder.addCase(resolveChartActivityHealthFacility.fulfilled, (state, {payload}) => {
      state.chartActivityHealthFacility.isError = false;
      state.chartActivityHealthFacility.isLoading = false;
      state.chartActivityHealthFacility.data = payload.data;
    });
    builder.addCase(resolveChartActivityHealthFacility.rejected, (state, {payload}) => {
      state.chartActivityHealthFacility.isError = true;
      state.chartActivityHealthFacility.isLoading = false;
      state.chartActivityHealthFacility.errorMessage = payload as string;
    });

    builder.addCase(resolveGetVoucherCashback.pending, (state) => {
      state.voucherCashback.isLoading = true;
      state.voucherCashback.isError = false;
    });
    builder.addCase(resolveGetVoucherCashback.fulfilled, (state, {payload}) => {
      state.voucherCashback.isLoading = false;
      state.voucherCashback.isError = false;
      state.voucherCashback.data = payload.data;
    });
    builder.addCase(resolveGetVoucherCashback.rejected, (state, {payload}) => {
      state.voucherCashback.isLoading = false;
      state.voucherCashback.isError = true;
      state.voucherCashback.errorMessage = payload as string;
    });
    builder.addCase(resolveGetVoucherFreeDelivery.pending, (state) => {
      state.voucherFreeDelivery.isLoading = true;
      state.voucherFreeDelivery.isError = false;
    });
    builder.addCase(resolveGetVoucherFreeDelivery.fulfilled, (state, {payload}) => {
      state.voucherFreeDelivery.isLoading = false;
      state.voucherFreeDelivery.isError = false;
      state.voucherFreeDelivery.data = payload.data;
    });
    builder.addCase(resolveGetVoucherFreeDelivery.rejected, (state, {payload}) => {
      state.voucherFreeDelivery.isLoading = false;
      state.voucherFreeDelivery.isError = true;
      state.voucherFreeDelivery.errorMessage = payload as string;
    });
    // get income finance
    builder.addCase(resolveGetIncomeMediverse.pending, (state) => {
      state.dashboardFinance.statusIncome.isLoading = true;
      state.dashboardFinance.statusIncome.isError = false;
      state.dashboardFinance.statusIncome.isSuccess = false;
    });
    builder.addCase(resolveGetIncomeMediverse.fulfilled, (state, {payload}) => {
      state.dashboardFinance.statusIncome.isLoading = false;
      state.dashboardFinance.statusIncome.isSuccess = true;
      state.dashboardFinance.income = payload.data;
    });
    builder.addCase(resolveGetIncomeMediverse.rejected, (state, {payload}: any) => {
      state.dashboardFinance.statusIncome.isLoading = false;
      state.dashboardFinance.statusIncome.isError = true;
      state.dashboardFinance.statusIncome.message = payload.data.message;
    });
    // get income history finance
    builder.addCase(resolveGetIncomeHistoryMediverse.pending, (state) => {
      state.dashboardFinance.statusIncomeHistory.isLoading = true;
      state.dashboardFinance.statusIncomeHistory.isError = false;
      state.dashboardFinance.statusIncomeHistory.isSuccess = false;
    });
    builder.addCase(resolveGetIncomeHistoryMediverse.fulfilled, (state, {payload}) => {
      state.dashboardFinance.statusIncomeHistory.isLoading = false;
      state.dashboardFinance.statusIncomeHistory.isSuccess = true;
      state.dashboardFinance.incomeHistory = payload.data;
    });
    builder.addCase(resolveGetIncomeHistoryMediverse.rejected, (state, {payload}: any) => {
      state.dashboardFinance.statusIncomeHistory.isLoading = false;
      state.dashboardFinance.statusIncomeHistory.isError = true;
      state.dashboardFinance.statusIncomeHistory.message = payload.data.message;
    });
    // get income history finance provider
    builder.addCase(resolveGetIncomeHistoryProvider.pending, (state) => {
      state.dashboardFinance.statusIncomeHistory.isLoading = true;
      state.dashboardFinance.statusIncomeHistory.isError = false;
      state.dashboardFinance.statusIncomeHistory.isSuccess = false;
    });
    builder.addCase(resolveGetIncomeHistoryProvider.fulfilled, (state, {payload}) => {
      state.dashboardFinance.statusIncomeHistory.isLoading = false;
      state.dashboardFinance.statusIncomeHistory.isSuccess = true;
      state.dashboardFinance.incomeHistory = payload.data;
    });
    builder.addCase(resolveGetIncomeHistoryProvider.rejected, (state, {payload}: any) => {
      state.dashboardFinance.statusIncomeHistory.isLoading = false;
      state.dashboardFinance.statusIncomeHistory.isError = true;
      state.dashboardFinance.statusIncomeHistory.message = payload.data.message;
    });
    // get income finance provider
    builder.addCase(resolveGetIncomeProvider.pending, (state) => {
      state.dashboardFinance.statusIncomeProvider.isLoading = true;
      state.dashboardFinance.statusIncomeProvider.isError = false;
      state.dashboardFinance.statusIncomeProvider.isSuccess = false;
    });
    builder.addCase(resolveGetIncomeProvider.fulfilled, (state, {payload}) => {
      state.dashboardFinance.statusIncomeProvider.isLoading = false;
      state.dashboardFinance.statusIncomeProvider.isSuccess = true;
      state.dashboardFinance.incomeProvider = payload.data;
    });
    builder.addCase(resolveGetIncomeProvider.rejected, (state, {payload}: any) => {
      state.dashboardFinance.statusIncomeProvider.isLoading = false;
      state.dashboardFinance.statusIncomeProvider.isError = true;
      state.dashboardFinance.statusIncomeProvider.message = payload.data.message;
    });
    // get provider saldo
    builder.addCase(resolveGetProviderSaldo.pending, (state) => {
      state.dashboardFinance.statusIncome.isLoading = true;
      state.dashboardFinance.statusIncome.isError = false;
      state.dashboardFinance.statusIncome.isSuccess = false;
    });
    builder.addCase(resolveGetProviderSaldo.fulfilled, (state, {payload}) => {
      state.dashboardFinance.statusIncome.isLoading = false;
      state.dashboardFinance.statusIncome.isSuccess = true;
      state.dashboardFinance.providerSaldo = payload.data;
    });
    builder.addCase(resolveGetProviderSaldo.rejected, (state, {payload}: any) => {
      state.dashboardFinance.statusIncome.isLoading = false;
      state.dashboardFinance.statusIncome.isError = true;
      state.dashboardFinance.statusIncome.message = payload.data.message;
    });
    // get chart performance
    builder.addCase(resolveGetChartPerformanceYear.pending, (state) => {
      state.chartPerformance.allYearPerformance.isLoading = true;
      state.chartPerformance.allYearPerformance.isError = false;
    });
    builder.addCase(resolveGetChartPerformanceYear.fulfilled, (state, {payload}) => {
      state.chartPerformance.allYearPerformance.isLoading = false;
      state.chartPerformance.allYearPerformance.isError = false;
      state.chartPerformance.allYearPerformance.isSuccess = true;
      state.chartPerformance.allYearPerformance.data = payload;
    });
    builder.addCase(resolveGetChartPerformanceYear.rejected, (state, {payload}) => {
      state.chartPerformance.allYearPerformance.isLoading = false;
      state.chartPerformance.allYearPerformance.isSuccess = false;
      state.chartPerformance.allYearPerformance.isError = true;
      state.chartPerformance.allYearPerformance.errorMessage = payload as string;
    });
    // get chart active user
    builder.addCase(resolveGetChartActiveUser.pending, (state) => {
      state.chartPerformance.monthlyActiveUser.isLoading = true;
      state.chartPerformance.monthlyActiveUser.isError = false;
    });
    builder.addCase(resolveGetChartActiveUser.fulfilled, (state, {payload}) => {
      state.chartPerformance.monthlyActiveUser.isLoading = false;
      state.chartPerformance.monthlyActiveUser.isError = false;
      state.chartPerformance.monthlyActiveUser.isSuccess = true;
      state.chartPerformance.monthlyActiveUser.data = payload;
    });
    builder.addCase(resolveGetChartActiveUser.rejected, (state, {payload}) => {
      state.chartPerformance.monthlyActiveUser.isLoading = false;
      state.chartPerformance.monthlyActiveUser.isSuccess = false;
      state.chartPerformance.monthlyActiveUser.isError = true;
      state.chartPerformance.monthlyActiveUser.errorMessage = payload as string;
    });
    // get chart purchase user
    builder.addCase(resolveGetChartPurchaseUser.pending, (state) => {
      state.chartPerformance.purchaseUser.isLoading = true;
      state.chartPerformance.purchaseUser.isError = false;
    });
    builder.addCase(resolveGetChartPurchaseUser.fulfilled, (state, {payload}) => {
      state.chartPerformance.purchaseUser.isLoading = false;
      state.chartPerformance.purchaseUser.isError = false;
      state.chartPerformance.purchaseUser.isSuccess = true;
      state.chartPerformance.purchaseUser.data = payload;
    });
    builder.addCase(resolveGetChartPurchaseUser.rejected, (state, {payload}) => {
      state.chartPerformance.purchaseUser.isLoading = false;
      state.chartPerformance.purchaseUser.isSuccess = false;
      state.chartPerformance.purchaseUser.isError = true;
      state.chartPerformance.purchaseUser.errorMessage = payload as string;
    });
    // get gender comparison
    builder.addCase(resolveChartGenderComparison.pending, (state) => {
      state.chartComparison.gender.isLoading = true;
      state.chartComparison.gender.isError = false;
    });
    builder.addCase(resolveChartGenderComparison.fulfilled, (state, {payload}) => {
      state.chartComparison.gender.isLoading = false;
      state.chartComparison.gender.isError = false;
      state.chartComparison.gender.isSuccess = true;
      state.chartComparison.gender.data = payload;
    });
    builder.addCase(resolveChartGenderComparison.rejected, (state, {payload}) => {
      state.chartComparison.gender.isLoading = false;
      state.chartComparison.gender.isError = true;
      state.chartComparison.gender.isSuccess = false;
    });
    // get age comparison
    builder.addCase(resolveChartAgeComparison.pending, (state) => {
      state.chartComparison.age.isLoading = true;
      state.chartComparison.age.isError = false;
    });
    builder.addCase(resolveChartAgeComparison.fulfilled, (state, {payload}) => {
      state.chartComparison.age.isLoading = false;
      state.chartComparison.age.isError = false;
      state.chartComparison.age.isSuccess = true;
      state.chartComparison.age.data = payload;
    });
    builder.addCase(resolveChartAgeComparison.rejected, (state) => {
      state.chartComparison.age.isLoading = false;
      state.chartComparison.age.isSuccess = false;
      state.chartComparison.age.isError = true;
    });
    builder.addCase(resolveUserActiveLocation.pending, (state) => {
      state.userActiveLocation.isLoading = true;
      state.userActiveLocation.isError = false;
    });
    builder.addCase(resolveUserActiveLocation.fulfilled, (state, {payload}) => {
      state.userActiveLocation.isLoading = false;
      state.userActiveLocation.isError = false;
      state.userActiveLocation.isSucces = true;
      state.userActiveLocation.data = payload;
    });
    builder.addCase(resolveUserActiveLocation.rejected, (state) => {
      state.userActiveLocation.isError = true;
      state.userActiveLocation.isLoading = false;
      state.userActiveLocation.isSucces = false;
    });
    // Get data device used
    builder.addCase(resolveGetDataDeviceUsed.pending, (state) => {
      state.deviceUsed.isLoading = true;
      state.deviceUsed.isError = false;
    });
    builder.addCase(resolveGetDataDeviceUsed.fulfilled, (state, {payload}) => {
      state.deviceUsed.isLoading = false;
      state.deviceUsed.isError = false;
      state.deviceUsed.data = payload;
    });
    builder.addCase(resolveGetDataDeviceUsed.rejected, (state, {payload}) => {
      state.deviceUsed.isLoading = false;
      state.deviceUsed.isError = true;
      state.deviceUsed.errorMessage = payload as string;
    });

    // Get data activity user
    builder.addCase(resolveGetDataActivityUser.pending, (state) => {
      state.activityUser.isLoading = true;
      state.activityUser.isError = false;
    });
    builder.addCase(resolveGetDataActivityUser.fulfilled, (state, {payload}) => {
      state.activityUser.isLoading = false;
      state.activityUser.isError = false;
      state.activityUser.data = payload;
    });
    builder.addCase(resolveGetDataActivityUser.rejected, (state, {payload}) => {
      state.activityUser.isLoading = false;
      state.activityUser.isError = true;
      state.activityUser.errorMessage = payload as string;
    });

    // Get data active user
    builder.addCase(resolveGetDataActiveUser.pending, (state) => {
      state.activeUser.isLoading = true;
      state.activeUser.isError = false;
    });
    builder.addCase(resolveGetDataActiveUser.fulfilled, (state, {payload}) => {
      state.activeUser.isLoading = false;
      state.activeUser.isError = false;
      state.activeUser.data = payload;
    });
    builder.addCase(resolveGetDataActiveUser.rejected, (state, {payload}) => {
      state.activeUser.isLoading = false;
      state.activeUser.isError = true;
      state.activeUser.errorMessage = payload as string;
    });
    // get data purchase value permonth
    builder.addCase(resolvePurchaseValueMonth.pending, (state, {payload}) => {
      state.purchaseValueMonth.isLoading = true;
      state.purchaseValueMonth.isError = false;
    });
    builder.addCase(resolvePurchaseValueMonth.fulfilled, (state, {payload}) => {
      state.purchaseValueMonth.isLoading = false;
      state.purchaseValueMonth.isError = false;
      state.purchaseValueMonth.isSuccess = true;
      state.purchaseValueMonth.data = payload;
    });
    builder.addCase(resolvePurchaseValueMonth.rejected, (state, {payload}) => {
      state.purchaseValueMonth.isLoading = false;
      state.purchaseValueMonth.isSuccess = false;
      state.purchaseValueMonth.isError = true;
      state.purchaseValueMonth.errorMessage = payload as string;
    });
    // get most visited feature
    builder.addCase(resolveGetDataMostVisitedFeature.pending, (state) => {
      state.mostVisitedFeature.isLoading = true;
      state.mostVisitedFeature.isError = false;
    });
    builder.addCase(resolveGetDataMostVisitedFeature.fulfilled, (state, {payload}) => {
      state.mostVisitedFeature.isLoading = false;
      state.mostVisitedFeature.isError = false;
      state.mostVisitedFeature.isSuccess = true;
      state.mostVisitedFeature.data = payload;
    });
    builder.addCase(resolveGetDataMostVisitedFeature.rejected, (state, {payload}) => {
      state.mostVisitedFeature.isLoading = false;
      state.mostVisitedFeature.isSuccess = false;
      state.mostVisitedFeature.isError = true;
      state.mostVisitedFeature.errorMessage = payload as string;
    });
    // get most read article
    builder.addCase(resolveGetDataMostReadArticle.pending, (state) => {
      state.mostReadArticle.isLoading = true;
      state.mostReadArticle.isError = false;
    });
    builder.addCase(resolveGetDataMostReadArticle.fulfilled, (state, {payload}) => {
      state.mostReadArticle.isLoading = false;
      state.mostReadArticle.isError = false;
      state.mostReadArticle.isSuccess = true;
      state.mostReadArticle.data = payload;
    });
    builder.addCase(resolveGetDataMostReadArticle.rejected, (state, {payload}) => {
      state.mostReadArticle.isLoading = false;
      state.mostReadArticle.isSuccess = false;
      state.mostReadArticle.isError = true;
      state.mostReadArticle.errorMessage = payload as string;
    });
    // get used feature
    builder.addCase(resolveGetDataMostUsedFeature.pending, (state) => {
      state.mostUsedFeature.isLoading = true;
      state.mostUsedFeature.isError = false;
    });
    builder.addCase(resolveGetDataMostUsedFeature.fulfilled, (state, {payload}) => {
      state.mostUsedFeature.isLoading = false;
      state.mostUsedFeature.isError = false;
      state.mostUsedFeature.isSuccess = true;
      state.mostUsedFeature.data = payload;
    });
    builder.addCase(resolveGetDataMostUsedFeature.rejected, (state, {payload}) => {
      state.mostUsedFeature.isLoading = false;
      state.mostUsedFeature.isSuccess = false;
      state.mostUsedFeature.isError = true;
      state.mostUsedFeature.errorMessage = payload as string;
    });
    // get data user active product
    builder.addCase(resolveGetActiveUserProduct.pending, (state) => {
      state.activeUserTransaction.isLoading = true;
      state.activeUserTransaction.isError = false;
    });
    builder.addCase(resolveGetActiveUserProduct.fulfilled, (state, {payload}) => {
      state.activeUserTransaction.isLoading = false;
      state.activeUserTransaction.isError = false;
      state.activeUserTransaction.data = payload;
    });
    builder.addCase(resolveGetActiveUserProduct.rejected, (state, {payload}) => {
      state.activeUserTransaction.isLoading = false;
      state.activeUserTransaction.isError = true;
      state.activeUserTransaction.errorMessage = payload as string;
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state[payload.state].params[payload.name] = payload.value;
    },
    resetMap: (state) => {
      state.map.data = initialState.map.data;
    },
    resetTransactionSale: (state) => {
      state.transactionSale.data = initialState.transactionSale.data;
    },
    resetFunnel: (state) => {
      state.funnel.data = initialState.funnel.data;
    },
    resetPurchaseThisMonth: (state) => {
      state.purchase.data = initialState.purchase.data;
    },
    setSelectedFunnelProvider: (state, {payload}) => {
      state.selectedFunnelProvider = payload;
    },
    setSelectedYear: (state, {payload}) => {
      state.statisticCurrentMonth.selectedYear = payload;
    },
    setSelectedProviderType: (state, {payload}) => {
      state.statisticCurrentMonth.providerType = payload;
    },
    setFilterStatisticPharmacy: (state, {payload}) => {
      state.chartActivityPharmacy[payload.name] = payload.value;
    },
    setSelectedYearChartHealthFacility: (state, {payload}) => {
      state.chartActivityHealthFacility.selectedYear = payload;
    },
    setCurrentMonthEstimationExpense: (state, {payload}) => {
      state.currentMonthEstimationExpense[payload.name] = payload.value;
    },
    setParamsChartPerformance: (state, {payload}) => {
      state.chartPerformance[payload.name].params[payload.state] = payload.value;
    },
    setDataUserLocation: (state, {payload}) => {
      state.userActiveLocation.data[payload.name] = payload.value;
    },
  },
});

export const {
  resetMap,
  setParams,
  resetFunnel,
  setSelectedYear,
  setDataUserLocation,
  resetTransactionSale,
  resetPurchaseThisMonth,
  setSelectedProviderType,
  setParamsChartPerformance,
  setSelectedFunnelProvider,
  setFilterStatisticPharmacy,
  setCurrentMonthEstimationExpense,
  setSelectedYearChartHealthFacility,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
