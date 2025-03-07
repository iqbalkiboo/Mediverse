import dayjs from 'dayjs';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getDataCardTransaction,
  getDownloadTransaction,
  getListTransaction,
} from '@/src/client/transactionV2';
import {ITransactionState} from '@/src/types/transactionV2';

export const initialState: ITransactionState = {
  cardTransaction: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    data: {},
  },
  transactions: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 0,
    },
  },
  modalDownloadTransaction: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
    isOpen: false,
    dates: [null, null],
    timeSpanType: '',
    date: null,
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    transactionType: 'all',
    endDate: dayjs().endOf('month'),
    startDate: dayjs().startOf('month'),
    endDateRecapitulation: dayjs().endOf('month'),
    startDateRecapitulation: dayjs().startOf('month'),
  },
};

export const resolveDataCardTransaction = createAsyncThunk(
    'resolve/transaction/card',
    async (payload: {
    startDateRecapitulation: string,
    endDateRecapitulation: string,
  }, {rejectWithValue}) => {
      const response = await getDataCardTransaction(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveListTransaction = createAsyncThunk(
    'resolve/transaction/list',
    async (payload: {
    page: any,
    limit: any,
    search: string,
    transactionType: string,
    startDate: any,
    endDate: any,
  }, {rejectWithValue}) => {
      try {
        const response = await getListTransaction(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDownloadTransaction = createAsyncThunk(
    'resolve/transaction/download',
    async (payload: {
    startDate: any,
    endDate: any,
  }, {rejectWithValue}) => {
      const response = await getDownloadTransaction(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const TransactionsV2Slice = createSlice({
  name: 'transactionV2',
  initialState,
  extraReducers: (builder) => {
    // Get Card Transaction
    builder.addCase(resolveDataCardTransaction.pending, (state) => {
      state.cardTransaction.isLoading = true;
      state.cardTransaction.isError = false;
      state.cardTransaction.isSuccess = false;
      state.cardTransaction.errorMessage = '';
    });
    builder.addCase(resolveDataCardTransaction.fulfilled, (state, {payload}) => {
      state.cardTransaction.isLoading = false;
      state.cardTransaction.isError = false;
      state.cardTransaction.isSuccess = true;
      state.cardTransaction.data = payload?.data || {};
    });
    builder.addCase(resolveDataCardTransaction.rejected, (state) => {
      state.cardTransaction.isLoading = false;
      state.cardTransaction.isError = true;
      state.cardTransaction.isSuccess = false;
      state.cardTransaction.errorMessage = 'Something wrong!';
    });

    // Get List Transaction
    builder.addCase(resolveListTransaction.pending, (state) => {
      state.transactions.isLoading = true;
      state.transactions.isError = false;
    });
    builder.addCase(resolveListTransaction.fulfilled, (state, {payload}) => {
      state.transactions.isLoading = false;
      state.transactions.isError = false;
      state.transactions.data = payload?.data || [];

      // Metadata List Transaction
      state.transactions.metadata.page = payload?.metadata?.page || 1;
      state.transactions.metadata.size = payload?.metadata?.per_page || 10;
      state.transactions.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.transactions.metadata.totalData = payload?.metadata?.total_row || 0;
    });
    builder.addCase(resolveListTransaction.rejected, (state, {payload}: any) => {
      state.transactions.isLoading = false;
      state.transactions.isError = true;
      state.transactions.data = [];
      state.transactions.errorMessage = payload?.message || 'Gagal Mendapatkan Data Transaksi!';
    });

    // Get Download Transaction
    builder.addCase(resolveDownloadTransaction.pending, (state) => {
      state.modalDownloadTransaction.isLoading = true;
      state.modalDownloadTransaction.isError = false;
      state.modalDownloadTransaction.isSuccess = false;
    });
    builder.addCase(resolveDownloadTransaction.fulfilled, (state, {payload}) => {
      state.modalDownloadTransaction.isLoading = false;
      state.modalDownloadTransaction.isError = false;
      state.modalDownloadTransaction.isSuccess = true;
      state.modalDownloadTransaction.message = payload.message;
      state.modalDownloadTransaction.data = payload;
    });
    builder.addCase(resolveDownloadTransaction.rejected, (state, {payload}) => {
      state.modalDownloadTransaction.isLoading = false;
      state.modalDownloadTransaction.isError = true;
      state.modalDownloadTransaction.isSuccess = false;
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.key] = payload.value;
    },
    setModalDownloadTransaction: (state, {payload}) => {
      state.modalDownloadTransaction[payload.name] = payload.value;
    },
    setTimeSpan: (state, {payload}) => {
      const now = new Date();
      const prevWeek = new Date(new Date().setDate(new Date().getDate() - 6));
      if (payload.value === state.modalDownloadTransaction.timeSpanType) {
        state.modalDownloadTransaction.timeSpanType = '';
        state.modalDownloadTransaction.dates = [null, null];
        state.modalDownloadTransaction.date = '';
      } else {
        state.modalDownloadTransaction.timeSpanType = payload.value;
        switch (payload.value) {
          case 'today':
            state.modalDownloadTransaction.date = new Date();
            break;
          case 'week':
            state.modalDownloadTransaction.dates[0] = prevWeek;
            state.modalDownloadTransaction.dates[1] = now;
            break;
          case 'month':
            state.modalDownloadTransaction.dates[0] = new Date(now.getFullYear(), now.getMonth(), 1);
            state.modalDownloadTransaction.dates[1] = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
          case 'a week':
            state.modalDownloadTransaction.dates[0] = prevWeek;
            state.modalDownloadTransaction.dates[1] = now;
            break;
          case 'a month':
            state.modalDownloadTransaction.dates[0] = new Date(now.getFullYear(), now.getMonth(), 1);
            state.modalDownloadTransaction.dates[1] = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
        }
      }
    },
    resetModalDownloadTransaction: (state) => {
      state.modalDownloadTransaction = initialState.modalDownloadTransaction;
    },
    resetStateTransaction: () => initialState,
  },
});

export const {
  setParams,
  setTimeSpan,
  resetStateTransaction,
  setModalDownloadTransaction,
  resetModalDownloadTransaction,
} = TransactionsV2Slice.actions;

export default TransactionsV2Slice.reducer;
