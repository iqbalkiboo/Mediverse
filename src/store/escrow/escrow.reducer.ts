import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getCardEscrowMidtrans,
  getCardEscrowNicepay,
  getDetailEscrow,
  getDetailListEscrow,
  getDetailPaymentEscrow,
  getDetailPaymentProviderEscrow,
  getListEscrow,
  patchPaymentRefundEscrow,
  postPaymentEscrow,
} from '@/src/client/escrow';

export const initialState = {
  cardEscrowMidtrans: {},
  cardEscrowNicepay: {},
  errorMessage: '',
  successMessage: '',
  detailId: '',
  refundNo: '',
  activeId: null,
  metadata: {
    page: 1,
    perPage: 10,
    totalRow: 0,
    totalPage: 1,
  },
  isOpenModal: {
    detailModal: false,
    postProviderModal: false,
    postRefundModal: false,
    postDeliveryModal: false,
  },
  escrow: {
    data: [],
    detail: {},
    params: {
      page: 1,
      limit: 10,
      search: '',
      startDate: '',
      endDate: '',
      transactionCategory: '',
      order: '',
      sort: '',
    },
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
    detailStatus: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  paymentAndRefund: {
    data: [],
    detail: {},
    params: {
      category: '',
      name: '',
      paymentProvider: '',
      providerId: '',
    },
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
    detailStatus: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
    postStatus: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
    patchStatus: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
};

export const resolveCardEscrowMidtrans = createAsyncThunk(
    'escrow/card/midtrans',
    async (any, {rejectWithValue}) => {
      const response = await getCardEscrowMidtrans();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveCardEscrowNicepay = createAsyncThunk(
    'escrow/card/nicepay',
    async (any, {rejectWithValue}) => {
      const response = await getCardEscrowNicepay();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveListEscrow = createAsyncThunk(
    'resolve/escrow/list',
    async (payload: {
    page: number,
    limit: number,
    search: string,
    startDate: any,
    endDate: any,
    transactionCategory: string,
    order: string,
    sort: string,
  }, {rejectWithValue}) => {
      const response = await getListEscrow(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveDetailEscrow = createAsyncThunk(
    'resolve/escrow/detail',
    async (payload: {
    category: string,
    id: string,
  }, {rejectWithValue}) => {
      const response = await getDetailEscrow(payload.category, payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveDetailListEscrow = createAsyncThunk(
    'resolve/escrow/detail-list',
    async (payload: {
    page: number,
    limit: number,
    search: string,
    startDate: any,
    endDate: any,
    transactionCategory: string,
  }, {rejectWithValue}) => {
      const response = await getDetailListEscrow(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveDetailPaymentEscrow = createAsyncThunk(
    'resolve/escrow/detail-payment',
    async (payload: {
    category: string,
    name: string,
    paymentProvider: string,
  }, {rejectWithValue}) => {
      const response = await getDetailPaymentEscrow(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolveDetailPaymentProviderEscrow = createAsyncThunk(
    'resolve/escrow/detail-payment-provider',
    async (payload: {
    category: string,
    id: string,
  }, {rejectWithValue}) => {
      const response = await getDetailPaymentProviderEscrow(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolvePostPaymentEscrow = createAsyncThunk(
    'resolve/escrow/post-payment',
    async (payload: {
    category: string,
    name: string,
    paymentProvider: string,
  }, {rejectWithValue}) => {
      const response = await postPaymentEscrow(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolvePatchPaymentRefundEscrow = createAsyncThunk(
    'resolve/escrow/payment/patch',
    async (payload: {
      refundNo: string,
    }, {rejectWithValue}) => {
      const response = await patchPaymentRefundEscrow(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

const escrowSlice = createSlice({
  name: 'escrow',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveCardEscrowMidtrans.pending, (state) => {
    });
    builder.addCase(resolveCardEscrowMidtrans.fulfilled, (state, {payload}) => {
      state.cardEscrowMidtrans = payload || {};
    });
    builder.addCase(resolveCardEscrowMidtrans.rejected, (state) => {
    });
    builder.addCase(resolveCardEscrowNicepay.pending, (state) => {
    });
    builder.addCase(resolveCardEscrowNicepay.fulfilled, (state, {payload}) => {
      state.cardEscrowNicepay = payload || {};
    });
    builder.addCase(resolveCardEscrowNicepay.rejected, (state) => {
    });
    builder.addCase(resolveListEscrow.pending, (state) => {
      state.escrow.status.isLoading = true;
      state.escrow.status.isSuccess = false;
      state.escrow.status.isError = false;
      state.errorMessage = '';
    });
    builder.addCase(resolveListEscrow.fulfilled, (state, {payload}) => {
      state.escrow.status.isLoading = false;
      state.escrow.status.isSuccess = true;
      state.escrow.status.isError = false;
      state.escrow.data = payload?.data || [];
      state.metadata.page = payload?.metadata?.page ?? 1;
      state.metadata.perPage = payload?.metadata?.size ?? 10;
      state.metadata.totalPage = payload?.metadata?.total_page ?? 1;
      state.metadata.totalRow = payload?.metadata?.total_row ?? 1;
      state.errorMessage = '';
    });
    builder.addCase(resolveListEscrow.rejected, (state, {payload}: any) => {
      state.escrow.status.isLoading = false;
      state.escrow.status.isSuccess = false;
      state.escrow.status.isError = true;
      state.errorMessage = payload?.message || 'Gagal Mendapatkan Data Escrow!';
    });
    builder.addCase(resolveDetailEscrow.pending, (state) => {
      state.escrow.detailStatus.isLoading = true;
      state.escrow.detailStatus.isSuccess = false;
      state.escrow.detailStatus.isError = false;
    });
    builder.addCase(resolveDetailEscrow.fulfilled, (state, {payload}) => {
      state.escrow.detailStatus.isLoading = false;
      state.escrow.detailStatus.isSuccess = true;
      state.escrow.detailStatus.isError = false;
      state.escrow.detail = payload?.data || {};
    });
    builder.addCase(resolveDetailEscrow.rejected, (state, {payload}: any) => {
      state.escrow.detailStatus.isLoading = false;
      state.escrow.detailStatus.isSuccess = false;
      state.escrow.detailStatus.isError = true;
      state.errorMessage = payload?.message || 'Gagal Mendapatkan Data Escrow!';
    });
    builder.addCase(resolveDetailListEscrow.pending, (state) => {
      state.paymentAndRefund.status.isLoading = true;
      state.paymentAndRefund.status.isError = false;
      state.paymentAndRefund.status.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(resolveDetailListEscrow.fulfilled, (state, {payload}) => {
      state.paymentAndRefund.status.isLoading = false;
      state.paymentAndRefund.status.isError = false;
      state.paymentAndRefund.status.isSuccess = true;
      state.paymentAndRefund.data = payload?.data || [];
      state.metadata.page = payload?.metadata.page ?? 1;
      state.metadata.perPage = payload?.metadata.size ?? 10;
      state.metadata.totalPage = payload?.metadata.total_page ?? 1;
      state.metadata.totalRow = payload?.metadata.total_row ?? 1;
      state.errorMessage = '';
    });
    builder.addCase(resolveDetailListEscrow.rejected, (state, {payload}: any) => {
      state.paymentAndRefund.status.isLoading = false;
      state.paymentAndRefund.status.isError = true;
      state.paymentAndRefund.status.isSuccess = false;
      state.errorMessage = payload?.message || 'Gagal Mendapatkan Data Escrow!';
    });
    builder.addCase(resolveDetailPaymentEscrow.pending, (state) => {
      state.paymentAndRefund.detailStatus.isLoading = true;
      state.paymentAndRefund.detailStatus.isSuccess = false;
      state.paymentAndRefund.detailStatus.isError = false;
    });
    builder.addCase(resolveDetailPaymentEscrow.fulfilled, (state, {payload}) => {
      state.paymentAndRefund.detailStatus.isLoading = false;
      state.paymentAndRefund.detailStatus.isSuccess = true;
      state.paymentAndRefund.detailStatus.isError = false;
      state.paymentAndRefund.detail = payload?.data || {};
    });
    builder.addCase(resolveDetailPaymentEscrow.rejected, (state, {payload}: any) => {
      state.paymentAndRefund.detailStatus.isLoading = false;
      state.paymentAndRefund.detailStatus.isSuccess = false;
      state.paymentAndRefund.detailStatus.isError = true;
      state.errorMessage = payload?.message || 'Gagal Mendapatkan Data Escrow!';
    });
    builder.addCase(resolveDetailPaymentProviderEscrow.pending, (state) => {
      state.paymentAndRefund.detailStatus.isLoading = true;
      state.paymentAndRefund.detailStatus.isError = false;
      state.paymentAndRefund.detailStatus.isSuccess = false;
    });
    builder.addCase(resolveDetailPaymentProviderEscrow.fulfilled, (state, {payload}) => {
      state.paymentAndRefund.detailStatus.isLoading = false;
      state.paymentAndRefund.detailStatus.isError = false;
      state.paymentAndRefund.detailStatus.isSuccess = true;
      state.paymentAndRefund.detail = payload?.data || {};
    });
    builder.addCase(resolveDetailPaymentProviderEscrow.rejected, (state, {payload}: any) => {
      state.paymentAndRefund.detailStatus.isLoading = false;
      state.paymentAndRefund.detailStatus.isError = true;
      state.paymentAndRefund.detailStatus.isSuccess = false;
      state.errorMessage = payload?.message || 'Gagal Mendapatkan Data Escrow!';
    });
    builder.addCase(resolvePostPaymentEscrow.pending, (state) => {
      state.paymentAndRefund.postStatus.isLoading = true;
      state.paymentAndRefund.postStatus.isError = false;
      state.paymentAndRefund.postStatus.isSuccess = false;
    });
    builder.addCase(resolvePostPaymentEscrow.fulfilled, (state, {payload}: any) => {
      state.paymentAndRefund.postStatus.isLoading = false;
      state.paymentAndRefund.postStatus.isError = false;
      state.paymentAndRefund.postStatus.isSuccess = true;
      state.successMessage = payload?.message || 'Berhasil melakukan pembayaran!';
    });
    builder.addCase(resolvePostPaymentEscrow.rejected, (state, {payload}: any) => {
      state.paymentAndRefund.postStatus.isLoading = false;
      state.paymentAndRefund.postStatus.isError = true;
      state.paymentAndRefund.postStatus.isSuccess = false;
      state.errorMessage = payload?.message || 'Gagal melakukan pembayaran!';
    });
    builder.addCase(resolvePatchPaymentRefundEscrow.pending, (state) => {
      state.paymentAndRefund.patchStatus.isLoading = true;
      state.paymentAndRefund.patchStatus.isError = false;
      state.paymentAndRefund.patchStatus.isSuccess = false;
    });
    builder.addCase(resolvePatchPaymentRefundEscrow.fulfilled, (state, {payload}: any) => {
      state.paymentAndRefund.patchStatus.isLoading = false;
      state.paymentAndRefund.patchStatus.isError = false;
      state.paymentAndRefund.patchStatus.isSuccess = true;
      state.successMessage = payload?.message || 'Berhasil melakukan pembayaran!';
    });
    builder.addCase(resolvePatchPaymentRefundEscrow.rejected, (state, {payload}: any) => {
      state.paymentAndRefund.patchStatus.isLoading = false;
      state.paymentAndRefund.patchStatus.isError = true;
      state.paymentAndRefund.patchStatus.isSuccess = false;
      state.errorMessage = payload?.message || 'Gagal Mendapatkan Data Escrow!';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.escrow.params[payload?.field] = payload?.value;
    },
    setIsOpenModal: (state, {payload}) => {
      state.isOpenModal[payload?.field] = payload?.value;
    },
    setDetailId: (state, {payload}) => {
      state.detailId = payload;
    },
    setRefundNo: (state, {payload}) => {
      state.refundNo = payload;
    },
    setActiveId: (state, {payload}) => {
      state.activeId = payload;
    },
    setParamsDetailPayment: (state, {payload}) => {
      state.paymentAndRefund.params[payload?.field] = payload?.value;
    },
    clearStateEscrow: (state) => {
      state.escrow.status.isLoading = false;
      state.escrow.status.isSuccess = false;
      state.escrow.status.isError = false;
      state.errorMessage = '';
      state.successMessage = '';
      state.escrow.data = [];
      state.escrow.params = initialState.escrow.params;
      state.metadata = initialState.metadata;
    },
    clearStatePostEscrow: (state) => {
      state.paymentAndRefund.postStatus.isLoading = false;
      state.paymentAndRefund.postStatus.isError = false;
      state.paymentAndRefund.postStatus.isSuccess = false;
      state.errorMessage = '';
      state.successMessage = '';
    },
    clearStatePatchEscrowRefund: (state) => {
      state.paymentAndRefund.patchStatus.isLoading = false;
      state.paymentAndRefund.patchStatus.isError = false;
      state.paymentAndRefund.patchStatus.isSuccess = false;
      state.errorMessage = '';
      state.successMessage = '';
    },
    clearStateDetailEscrow: (state) => {
      state.escrow.detailStatus.isLoading = false;
      state.escrow.detailStatus.isSuccess = false;
      state.escrow.detailStatus.isError = false;
      state.paymentAndRefund.detailStatus.isLoading = false;
      state.paymentAndRefund.detailStatus.isSuccess = false;
      state.paymentAndRefund.detailStatus.isError = false;
    },
    clearParamsDetailPayment: (state) => {
      state.paymentAndRefund.params = initialState.paymentAndRefund.params;
    },
    clearDetailEscrow: (state) => {
      state.escrow.detail = initialState.escrow.detail;
    },
    clearDetailListEscrow: (state) => {
      state.paymentAndRefund.data = initialState.paymentAndRefund.data;
    },
  },
});

export const {
  setParams,
  setIsOpenModal,
  setDetailId,
  setRefundNo,
  setActiveId,
  setParamsDetailPayment,
  clearStateEscrow,
  clearStatePostEscrow,
  clearStatePatchEscrowRefund,
  clearStateDetailEscrow,
  clearParamsDetailPayment,
  clearDetailEscrow,
  clearDetailListEscrow,
} = escrowSlice.actions;

export default escrowSlice.reducer;
