import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getAllTransaction,
  getDataCardTransaction,
  getDataListExpeditionBalance,
  getDataListExpeditionProviderPayment,
  getDataListProviderBalance,
  getDownloadAllTransaction,
  getDownloadRecapitulationTransaction,
} from '@/src/client/transaction';
import dayjs from 'dayjs';

import {ITransactionState} from '@/types/Transaction';

export const initialState: ITransactionState = {
  saldoProviderId: null,
  errorMessage: '',
  params: {
    search: '',
    limit: 10,
    page: 1,
    totalData: 1,
    totalPage: 1,
    query: '',
    isActive: false,
    startDate: dayjs().startOf('month'),
    endDate: dayjs().endOf('month'),
  },
  metadata: {
    perPage: 10,
    page: 1,
    totalRow: 10,
    totalPage: 1,
  },
  downloadTransaction: {
    data: '',
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  downloadTransactionRecap: {
    data: '',
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  transaction: {
    data: [],
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  cardTransaction: {
    data: {},
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  providerBalance: {
    data: [],
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  expeditionBalance: {
    data: [],
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  expeditionProviderPayment: {
    data: [],
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  modal: {
    downloadHistoryPayment: false,
    downloadAllTransaction: false,
    downloadExpedition: false,
    downloadProvider: false,
    downloadRecapitulation: false,
    paymentExpedition: false,
    paymentProvider: false,
    paymentProviderSuccess: false,
  },
};

export const resolveAllTransaction = createAsyncThunk(
    'resolve/transaction/all',
    async (payload: {
    page: number,
    limit: number,
    query: string,
    startDate: any,
    endDate: any,
  }, {rejectWithValue}) => {
      const params = {
        page: payload.page,
        limit: payload.limit,
        query: payload.query,
        startDate: payload.startDate,
        endDate: payload.endDate,
      };
      const response = await getAllTransaction(params);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveDownloadAllTransaction = createAsyncThunk(
    'resolve/transaction/download',
    async (payload: {
  query: string,
  startDate: any,
  endDate: any,
}, {rejectWithValue}) => {
      const params = {
        query: payload.query,
        startDate: payload.startDate,
        endDate: payload.endDate,
      };
      const response = await getDownloadAllTransaction(params);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveDownloadRecapitulationTransaction = createAsyncThunk(
    'resolve/transaction/recap/download',
    async (payload: {
  query: string,
  startDate: any,
  endDate: any,
}, {rejectWithValue}) => {
      const params = {
        query: payload.query,
        startDate: payload.startDate,
        endDate: payload.endDate,
      };
      const response = await getDownloadRecapitulationTransaction(params);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveDataCardTransaction = createAsyncThunk(
    'resolve/transaction/card',
    async (payload: {
      startDate: any,
      endDate: any,
    }, {rejectWithValue}) => {
      const response = await getDataCardTransaction(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveListProviderBalance = createAsyncThunk(
    'resolve/transaction/provider-balance',
    async (payload: {
    page: number,
    limit: number,
    query: string,
  }, {rejectWithValue}) => {
      const params = {
        page: payload.page,
        limit: payload.limit,
        query: payload.query,
      };
      const response = await getDataListProviderBalance(params);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveListExpeditionBalance = createAsyncThunk(
    'resolve/transaction/expedition-balance',
    async (payload: {
  page: number,
  limit: number,
  query: string,
}, {rejectWithValue}) => {
      const params = {
        page: payload.page,
        limit: payload.limit,
        query: payload.query,
      };
      const response = await getDataListExpeditionBalance(params);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveListExpeditionProviderPayment = createAsyncThunk(
    'resolve/transaction/expedition-provider-payment',
    async (payload: {
  page: number,
  limit: number,
  query: string,
}, {rejectWithValue}) => {
      const params = {
        page: payload.page,
        limit: payload.limit,
        query: payload.query,
      };
      const response = await getDataListExpeditionProviderPayment(params);
      if (response.status === 200) {
        return response.data;
      }
    },
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: (builder) => {
    // Get All Transaction
    builder.addCase(resolveAllTransaction.pending, (state) => {
      state.transaction.status.isLoading = true;
      state.transaction.status.isError = false;
      state.transaction.status.isSuccess = false;
    });
    builder.addCase(resolveAllTransaction.fulfilled, (state, {payload}) => {
      state.transaction.status.isLoading = false;
      state.transaction.status.isError = false;
      state.transaction.status.isSuccess = true;
      state.transaction.data = payload?.data || [];
      state.metadata.perPage = payload?.metadata?.per_page || 10;
      state.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.metadata.totalRow = payload?.metadata?.total_row || 10;
      state.metadata.page = payload?.metadata?.page || 1;
    });
    builder.addCase(resolveAllTransaction.rejected, (state) => {
      state.transaction.status.isLoading = false;
      state.transaction.status.isError = true;
      state.transaction.status.isSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    // Get Card Transaction
    builder.addCase(resolveDataCardTransaction.pending, (state) => {
      state.cardTransaction.status.isLoading = true;
      state.cardTransaction.status.isError = false;
      state.cardTransaction.status.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(resolveDataCardTransaction.fulfilled, (state, {payload}) => {
      state.cardTransaction.status.isLoading = false;
      state.cardTransaction.status.isError = false;
      state.cardTransaction.status.isSuccess = true;
      state.cardTransaction.data = payload?.data || {};
    });
    builder.addCase(resolveDataCardTransaction.rejected, (state) => {
      state.cardTransaction.status.isLoading = false;
      state.cardTransaction.status.isError = true;
      state.cardTransaction.status.isSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveListProviderBalance.pending, (state) => {
      state.providerBalance.status.isLoading = true;
      state.providerBalance.status.isError = false;
      state.providerBalance.status.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(resolveListProviderBalance.fulfilled, (state, {payload}) => {
      state.providerBalance.status.isLoading = false;
      state.providerBalance.status.isError = false;
      state.providerBalance.status.isSuccess = true;
      state.providerBalance.data = payload?.data || [];
      state.params.limit = payload?.metadata.size;
      state.params.totalPage = payload?.metadata.totalPage;
      state.params.totalData = payload?.metadata.totalData;
      state.params.page = payload?.metadata.page;
    });
    builder.addCase(resolveListProviderBalance.rejected, (state) => {
      state.providerBalance.status.isLoading = false;
      state.providerBalance.status.isError = true;
      state.providerBalance.status.isSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveListExpeditionBalance.pending, (state) => {
      state.expeditionBalance.status.isLoading = true;
      state.expeditionBalance.status.isError = false;
      state.expeditionBalance.status.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(resolveListExpeditionBalance.fulfilled, (state, {payload}) => {
      state.expeditionBalance.status.isLoading = false;
      state.expeditionBalance.status.isError = false;
      state.expeditionBalance.status.isSuccess = true;
      state.expeditionBalance.data = payload?.data || [];
      state.params.limit = payload?.metadata.size;
      state.params.totalPage = payload?.metadata.totalPage;
      state.params.totalData = payload?.metadata.totalData;
      state.params.page = payload?.metadata.page;
    });
    builder.addCase(resolveListExpeditionBalance.rejected, (state) => {
      state.expeditionBalance.status.isLoading = false;
      state.expeditionBalance.status.isError = true;
      state.expeditionBalance.status.isSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveListExpeditionProviderPayment.pending, (state) => {
      state.expeditionProviderPayment.status.isLoading = true;
      state.expeditionProviderPayment.status.isError = false;
      state.expeditionProviderPayment.status.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(resolveListExpeditionProviderPayment.fulfilled, (state, {payload}) => {
      state.expeditionProviderPayment.status.isLoading = false;
      state.expeditionProviderPayment.status.isError = false;
      state.expeditionProviderPayment.status.isSuccess = true;
      state.expeditionProviderPayment.data = payload?.data || [];
      state.params.limit = payload?.metadata.size;
      state.params.totalPage = payload?.metadata.totalPage;
      state.params.totalData = payload?.metadata.totalData;
      state.params.page = payload?.metadata.page;
    });
    builder.addCase(resolveListExpeditionProviderPayment.rejected, (state) => {
      state.expeditionProviderPayment.status.isLoading = false;
      state.expeditionProviderPayment.status.isError = true;
      state.expeditionProviderPayment.status.isSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveDownloadAllTransaction.pending, (state) => {
      state.downloadTransaction.status.isLoading = true;
      state.downloadTransaction.status.isError = false;
    });
    builder.addCase(resolveDownloadAllTransaction.fulfilled, (state, {payload}) => {
      state.downloadTransaction.status.isLoading = false;
      state.downloadTransaction.status.isError = false;
      state.downloadTransaction.data = payload;
      state.downloadTransaction.status.isSuccess = true;
    });
    builder.addCase(resolveDownloadAllTransaction.rejected, (state) => {
      state.downloadTransaction.status.isLoading = false;
      state.downloadTransaction.status.isError = true;
      state.downloadTransaction.status.isSuccess = false;
    });
    // recap download
    builder.addCase(resolveDownloadRecapitulationTransaction.pending, (state) => {
      state.downloadTransactionRecap.status.isLoading = true;
      state.downloadTransactionRecap.status.isError = false;
    });
    builder.addCase(resolveDownloadRecapitulationTransaction.fulfilled, (state, {payload}) => {
      state.downloadTransactionRecap.status.isLoading = false;
      state.downloadTransactionRecap.status.isError = false;
      state.downloadTransactionRecap.data = payload;
      state.downloadTransactionRecap.status.isSuccess = true;
    });
    builder.addCase(resolveDownloadRecapitulationTransaction.rejected, (state) => {
      state.downloadTransactionRecap.status.isLoading = false;
      state.downloadTransactionRecap.status.isError = true;
      state.downloadTransactionRecap.status.isSuccess = false;
    });
  },
  reducers: {
    clearStateTransaction: () => initialState,
    setModalDownloadTransaction: (state, {payload}) => {
      state.downloadTransaction[payload.name] = payload.value;
    },
    setModalDownloadTransactionRecap: (state, {payload}) => {
      state.downloadTransactionRecap[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state.modal[payload.key] = payload.value;
    },
    setSladoProviderId: (state, {payload}) => {
      state.saldoProviderId = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.key] = payload.value;
    },
  },
});

export const {
  clearStateTransaction,
  setModalDownloadTransaction,
  setModalDownloadTransactionRecap,
  setModal,
  setSladoProviderId,
  setParams,
} = transactionSlice.actions;

export default transactionSlice.reducer;
