import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getListQueue } from '@/client/queue';
import { getListTransactions } from '@/client/transaction';

import type { IQueueState } from '@/types/MasterTransaction/queue';

export const initialState: IQueueState = {
  params: {
    search: '',
    limit: 10,
    page: 1,
    totalData: 1,
    totalPage: 1,
    status: '',
    startDate: '',
    endDate: '',
    serviceType: '',
  },
  metadata: {
    page: 1,
    limit: 10,
    totalPage: 1,
    totalData: 0,
  },
  queues: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    data: [],
    detail: null,
  },
  transactions: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    data: [],
  },
};

export const resolveListQueue = createAsyncThunk(
  'resolve/queue/list',
  async (
    payload: {
      typeRegistration: string;
      appointment_status: string;
      fromDate: string;
      endDate: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getListQueue(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveListTransaction = createAsyncThunk(
  'resolve/transaction/list',
  async (
    payload: {
      search: string;
      status: string;
      statusPayment: string;
      queueType: string;
      start: string | number;
      pageLength: string | number;
      fromDate: string;
      endDate: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getListTransactions(
      payload.queueType || '',
      payload
    );
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const queueSlice = createSlice({
  name: 'queue',
  initialState,
  extraReducers: (builder) => {
    // Get List Queues
    builder.addCase(resolveListQueue.pending, (state) => {
      state.queues.isLoading = true;
      state.queues.isError = false;
      state.queues.data = [];
      state.metadata.page = 1;
      state.metadata.limit = 1;
      state.metadata.totalPage = 1;
      state.metadata.totalData = 0;
    });
    builder.addCase(resolveListQueue.fulfilled, (state, { payload }) => {
      state.queues.isLoading = false;
      state.queues.isError = false;
      state.queues.data = payload?.data?.message || [];

      const { limit_start, limit_page_length, total_count } = payload?.data
        ?.message?.metadata || {
        limit_start: 0,
        limit_page_length: 0,
        total_count: 0,
      };
      state.metadata.page = limit_start / limit_page_length + 1 || 1;
      state.metadata.limit = limit_page_length || 1;
      state.metadata.totalPage =
        Math.ceil(total_count / limit_page_length) || 1;
      state.metadata.totalData = total_count || 0;
    });
    builder.addCase(resolveListQueue.rejected, (state, { payload }: any) => {
      state.queues.isError = true;
      state.queues.isLoading = false;
      state.queues.message =
        payload?.message || 'Gagal Mendapatkan Data Antrian!';
    });

    // Get List Transaction
    builder.addCase(resolveListTransaction.pending, (state) => {
      state.transactions.isLoading = true;
      state.transactions.isError = false;
      state.transactions.data = [];
      state.metadata.page = 1;
      state.metadata.limit = 1;
      state.metadata.totalPage = 1;
      state.metadata.totalData = 0;
    });
    builder.addCase(resolveListTransaction.fulfilled, (state, { payload }) => {
      state.transactions.isLoading = false;
      state.transactions.isError = false;
      state.transactions.data = payload?.data?.message?.data || [];

      const { limit_start, limit_page_length, total_count } = payload?.data
        ?.message?.metadata || {
        limit_start: 0,
        limit_page_length: 0,
        total_count: 0,
      };
      state.metadata.page = limit_start / limit_page_length + 1 || 1;
      state.metadata.limit = limit_page_length || 1;
      state.metadata.totalPage =
        Math.ceil(total_count / limit_page_length) || 1;
      state.metadata.totalData = total_count || 0;
    });
    builder.addCase(
      resolveListTransaction.rejected,
      (state, { payload }: any) => {
        state.transactions.isError = true;
        state.transactions.isLoading = false;
        state.transactions.message =
          payload?.message || 'Gagal Mendapatkan Data Transaksi!';
      }
    );
  },
  reducers: {
    clearStateQueue: () => initialState,
    clearParams: (state) => {
      state.params = initialState.params;
    },
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
  },
});

export const { clearStateQueue, clearParams, setParams } = queueSlice.actions;

export default queueSlice.reducer;
