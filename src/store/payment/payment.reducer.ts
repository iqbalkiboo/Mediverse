import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addDirectSalesOrder,
  addPaymentEntry,
  getListBankAccount,
  getListModePayment,
  getListPayment,
  getPaymentDetail,
  updateSalesOrder,
  updateStatusSalesOrder,
} from '@/client/payment';
import { postCancelTransaction } from '@/client/transaction';

import type { IPaymentState } from '@/types/MasterTransaction/payment';

export const initialState: IPaymentState = {
  params: {
    search: '',
    page: 1,
    limit: 10,
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
  payments: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    data: [],
  },
  payment: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: null,
  },
  paymentForm: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: null,
  },
  formSalesOrder: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: null,
  },
  modalPayment: {
    transactionId: '',
    status: '',
    modalConfirmation: false,
    isSuccess: false,
    isError: false,
    isLoading: false,
  },
  listModePayment: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  listBankAccount: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
};

export const resolveListPayment = createAsyncThunk(
  'resolve/payment/list',
  async (
    payload: {
      status: string;
      start: string | number;
      pageLength: string | number;
      queueType: string;
      fromDate: string;
      endDate: string;
      search: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getListPayment(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListModePayment = createAsyncThunk(
  'resolve/mode-payment/list',
  async (_, { rejectWithValue }) => {
    const response = await getListModePayment();
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListBankAccount = createAsyncThunk(
  'resolve/bank-account/list',
  async (_, { rejectWithValue }) => {
    const response = await getListBankAccount();
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveDetailPayment = createAsyncThunk(
  'resolve/payment/detail',
  async (
    payload: {
      queue: string | number;
    },
    { rejectWithValue }
  ) => {
    const response = await getPaymentDetail(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolvePostDirectSalesOrder = createAsyncThunk(
  'resolve/direct-sales-order/post',
  async (
    payload: {
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await addDirectSalesOrder(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveUpdateSalesOrder = createAsyncThunk(
  'resolve/sales-order/update',
  async (
    payload: {
      paymentId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await updateSalesOrder(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveUpdateStatusSalesOrder = createAsyncThunk(
  'resolve/payment-status/update',
  async (
    payload: {
      salesOrder: string;
      status: string;
    },
    { rejectWithValue }
  ) => {
    const response = await updateStatusSalesOrder(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveAddPaymentEntry = createAsyncThunk(
  'resolve/payment/add',
  async (
    payload: {
      salesOrder: string;
      paymentMode: string;
      paidAmount: string | number;
      bankAccount: string;
      bankNumber: string;
    },
    { rejectWithValue }
  ) => {
    const response = await addPaymentEntry(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolvePostCancelTransaction = createAsyncThunk(
  'resolve/transaction-payment-cancel/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postCancelTransaction({
        data: payload.data,
      });
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  extraReducers: (builder) => {
    // Get List Payment
    builder.addCase(resolveListPayment.pending, (state) => {
      state.payments.isLoading = true;
      state.payments.isError = false;
      state.payments.data = [];
      state.metadata.page = 1;
      state.metadata.limit = 1;
      state.metadata.totalPage = 1;
      state.metadata.totalData = 0;
    });
    builder.addCase(resolveListPayment.fulfilled, (state, { payload }) => {
      state.payments.isLoading = false;
      state.payments.isError = false;
      state.payments.data = payload?.data?.message?.data || [];

      const { limit_start, limit_page_length, total_count } =
        payload?.data?.message?.metadata || null;
      state.metadata.page = limit_start / limit_page_length + 1 || 1;
      state.metadata.limit = limit_page_length || 1;
      state.metadata.totalPage =
        Math.ceil(total_count / limit_page_length) || 1;
      state.metadata.totalData = total_count || 0;
    });
    builder.addCase(resolveListPayment.rejected, (state, { payload }: any) => {
      state.payments.isError = true;
      state.payments.isLoading = false;
      state.payments.message =
        payload?.message || 'Gagal Mendapatkan Data Pembayaran!';
    });

    // Get List Mode Payment
    builder.addCase(resolveGetListModePayment.pending, (state) => {
      state.listModePayment.isLoading = true;
      state.listModePayment.isSuccess = false;
      state.listModePayment.isError = false;
    });
    builder.addCase(
      resolveGetListModePayment.fulfilled,
      (state, { payload }) => {
        state.listModePayment.isLoading = false;
        state.listModePayment.isSuccess = true;
        state.listModePayment.isError = false;
        state.listModePayment.data = payload?.data?.data || [];
      }
    );
    builder.addCase(
      resolveGetListModePayment.rejected,
      (state, { payload }: any) => {
        state.listModePayment.isLoading = false;
        state.listModePayment.isSuccess = false;
        state.listModePayment.isError = true;
        state.listModePayment.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Mode Pembayaran!';
      }
    );

    // Get List Bank Account
    builder.addCase(resolveGetListBankAccount.pending, (state) => {
      state.listBankAccount.isLoading = true;
      state.listBankAccount.isSuccess = false;
      state.listBankAccount.isError = false;
    });
    builder.addCase(
      resolveGetListBankAccount.fulfilled,
      (state, { payload }) => {
        state.listBankAccount.isLoading = false;
        state.listBankAccount.isSuccess = true;
        state.listBankAccount.isError = false;
        state.listBankAccount.data = payload?.data?.data || [];
      }
    );
    builder.addCase(
      resolveGetListBankAccount.rejected,
      (state, { payload }: any) => {
        state.listBankAccount.isLoading = false;
        state.listBankAccount.isSuccess = false;
        state.listBankAccount.isError = true;
        state.listBankAccount.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Bank!';
      }
    );

    // Get Detail Payment
    builder.addCase(resolveDetailPayment.pending, (state) => {
      state.payment.isLoading = true;
      state.payment.isSuccess = false;
      state.payment.isError = false;
      state.payment.data = null;
    });
    builder.addCase(resolveDetailPayment.fulfilled, (state, { payload }) => {
      state.payment.isLoading = false;
      state.payment.isSuccess = true;
      state.payment.isError = false;
      state.payment.data = payload?.data?.message || {};
    });
    builder.addCase(
      resolveDetailPayment.rejected,
      (state, { payload }: any) => {
        state.payment.isLoading = false;
        state.payment.isSuccess = false;
        state.payment.isError = true;
        state.payment.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Pembayaran!';
      }
    );

    // Add Direct Sales Order
    builder.addCase(resolvePostDirectSalesOrder.pending, (state) => {
      state.paymentForm.isLoading = true;
      state.paymentForm.isSuccess = false;
      state.paymentForm.isError = false;
    });
    builder.addCase(resolvePostDirectSalesOrder.fulfilled, (state) => {
      state.paymentForm.isLoading = false;
      state.paymentForm.isSuccess = true;
      state.paymentForm.isError = false;
    });
    builder.addCase(
      resolvePostDirectSalesOrder.rejected,
      (state, { payload }: any) => {
        state.paymentForm.isLoading = false;
        state.paymentForm.isSuccess = false;
        state.paymentForm.isError = true;
        state.paymentForm.errorMessage =
          payload?.message || 'Gagal Update Order!';
      }
    );

    // Update Sales Order
    builder.addCase(resolveUpdateSalesOrder.pending, (state) => {
      state.formSalesOrder.isLoading = true;
      state.formSalesOrder.isSuccess = false;
      state.formSalesOrder.isError = false;
    });
    builder.addCase(resolveUpdateSalesOrder.fulfilled, (state) => {
      state.formSalesOrder.isLoading = false;
      state.formSalesOrder.isSuccess = true;
      state.formSalesOrder.isError = false;
    });
    builder.addCase(
      resolveUpdateSalesOrder.rejected,
      (state, { payload }: any) => {
        state.formSalesOrder.isLoading = false;
        state.formSalesOrder.isSuccess = false;
        state.formSalesOrder.isError = true;
        state.formSalesOrder.errorMessage =
          payload?.message || 'Gagal Update Order!';
      }
    );

    // Update Status Sales Order
    builder.addCase(resolveUpdateStatusSalesOrder.pending, (state) => {
      state.paymentForm.isLoading = true;
      state.paymentForm.isSuccess = false;
      state.paymentForm.isError = false;
    });
    builder.addCase(resolveUpdateStatusSalesOrder.fulfilled, (state) => {
      state.paymentForm.isLoading = false;
      state.paymentForm.isSuccess = true;
      state.paymentForm.isError = false;
    });
    builder.addCase(
      resolveUpdateStatusSalesOrder.rejected,
      (state, { payload }: any) => {
        state.paymentForm.isLoading = false;
        state.paymentForm.isSuccess = false;
        state.paymentForm.isError = true;
        state.paymentForm.errorMessage =
          payload?.message || 'Gagal Menambahkan Pembayaran!';
      }
    );

    // Add Payment Entry
    builder.addCase(resolveAddPaymentEntry.pending, (state) => {
      state.paymentForm.isLoading = true;
      state.paymentForm.isSuccess = false;
      state.paymentForm.isError = false;
    });
    builder.addCase(resolveAddPaymentEntry.fulfilled, (state) => {
      state.paymentForm.isLoading = false;
      state.paymentForm.isSuccess = true;
      state.paymentForm.isError = false;
    });
    builder.addCase(
      resolveAddPaymentEntry.rejected,
      (state, { payload }: any) => {
        state.paymentForm.isLoading = false;
        state.paymentForm.isSuccess = false;
        state.paymentForm.isError = true;
        state.paymentForm.errorMessage =
          payload?.message || 'Gagal Menambahkan Pembayaran!';
      }
    );

    // Post Data Cancel Transaction
    builder.addCase(resolvePostCancelTransaction.pending, (state) => {
      state.modalPayment.isLoading = true;
      state.modalPayment.isSuccess = false;
      state.modalPayment.isError = false;
    });
    builder.addCase(resolvePostCancelTransaction.fulfilled, (state) => {
      state.modalPayment.isLoading = false;
      state.modalPayment.isSuccess = true;
      state.modalPayment.isError = false;
    });
    builder.addCase(resolvePostCancelTransaction.rejected, (state) => {
      state.modalPayment.isLoading = false;
      state.modalPayment.isSuccess = false;
      state.modalPayment.isError = true;
    });
  },
  reducers: {
    clearStatePayment: () => initialState,
    clearParams: (state) => {
      state.params = initialState.params;
    },
    clearModalPayment: (state) => {
      state.modalPayment = initialState.modalPayment;
    },
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setModalPayment: (state, { payload }) => {
      state.modalPayment[payload.field] = payload.value;
    },
    setModalPaymentForm: (state, { payload }) => {
      state.paymentForm[payload.field] = payload.value;
    },
  },
});

export const {
  clearStatePayment,
  clearParams,
  clearModalPayment,
  setParams,
  setModalPayment,
  setModalPaymentForm,
} = paymentSlice.actions;

export default paymentSlice.reducer;
