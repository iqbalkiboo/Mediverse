import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getDataRefundRecapitulation,
  getDetailRefund,
  getListRefund,
  patchDataStatusRefund,
} from '@/client/refund';

import {IRefundState} from '@/src/types/Refund';

const initialState: IRefundState = {
  rejectReason: {
    reason: '',
  },
  cardMedpharmDrug: {
    showAll: false,
  },
  refunds: {
    isLoading: false,
    isError: false,
    isFetching: true,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 0,
    },
  },
  refund: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  refundRecapitulation: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  modalUpdateStatusRefund: {
    flag: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    isOpenApproved: false,
    isOpenRejected: false,
  },
  params: {
    search: '',
    startDate: '',
    endDate: '',
    status: '',
    limit: 10,
    page: 1,
    transaction_type: '',
    paymentGateway: '',
  },
  paramsRecapitulation: {
    startDate: '',
    endDate: '',
  },
};

export const resolveListRefund = createAsyncThunk(
    'resolve/refund/list',
    async (payload: {
      page: number,
      limit: number,
      search: string,
      status: string,
      startDate: any,
      endDate: any,
      transactionType: string,
      paymentGateway: string,
    }, {rejectWithValue}) => {
      try {
        const response = await getListRefund(payload);
        if (response.status === 200) {
          return response.data;
        }

        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDataRefundRecapitulation = createAsyncThunk(
    'resolve/refund/data/recapitulation',
    async (payload: {
      startDate: any,
      endDate: any,
    }, {rejectWithValue}) => {
      try {
        const response = await getDataRefundRecapitulation(payload);
        if (response.status === 200) {
          return response.data;
        }

        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailRefund = createAsyncThunk(
    'resolve/refund/detail',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDetailRefund(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);

export const resolvePatchStatusRefund = createAsyncThunk(
    'resolve/refund/approvedOrRejected',
    async (payload: any, {rejectWithValue}) => {
      const response = await patchDataStatusRefund(payload.id, payload.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    },
);


const refundSlice = createSlice({
  name: 'refund',
  initialState,
  extraReducers: (builder) => {
    // Get List Refund
    builder.addCase(resolveListRefund.pending, (state) => {
      state.refunds.isLoading = true;
      state.refunds.isError = false;
    });
    builder.addCase(resolveListRefund.fulfilled, (state, {payload}) => {
      state.refunds.isLoading = false;
      state.refunds.isError = false;
      state.refunds.isFetching = false;
      state.refunds.data = payload?.data || [];

      // Metadata List Refund
      state.refunds.metadata.page = payload?.metadata?.page || 1;
      state.refunds.metadata.size = payload?.metadata?.per_page || 10;
      state.refunds.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.refunds.metadata.totalData = payload?.metadata?.total_row || 0;
    });
    builder.addCase(resolveListRefund.rejected, (state, {payload}: any) => {
      state.refunds.isLoading = false;
      state.refunds.isError = true;
      state.refunds.errorMessage = payload?.message || 'Gagal Mendapatkan Data Refund!';
    });

    // Get Data Refund Recapitulation
    builder.addCase(resolveDataRefundRecapitulation.pending, (state) => {
      state.refundRecapitulation.isLoading = true;
      state.refundRecapitulation.isError = false;
    });
    builder.addCase(resolveDataRefundRecapitulation.fulfilled, (state, {payload}) => {
      state.refundRecapitulation.isLoading = false;
      state.refundRecapitulation.isError = false;
      state.refundRecapitulation.data = payload?.data || {};
    });
    builder.addCase(resolveDataRefundRecapitulation.rejected, (state, {payload}: any) => {
      state.refundRecapitulation.isLoading = false;
      state.refundRecapitulation.isError = true;
      state.refundRecapitulation.errorMessage = payload?.message || 'Gagal Mendapatkan Data Refund!';
    });

    // Detail Refund
    builder.addCase(resolveDetailRefund.pending, (state) => {
      state.refund.isLoading = true;
      state.refund.isError = false;
    });
    builder.addCase(resolveDetailRefund.fulfilled, (state, {payload}) => {
      state.refund.isLoading = false;
      state.refund.isError = false;
      state.refund.data = payload?.data || {};
    });
    builder.addCase(resolveDetailRefund.rejected, (state, {payload}: any) => {
      state.refund.isLoading = false;
      state.refund.isError = true;
      state.refund.errorMessage = payload?.message || 'Gagal MEndapatkan Data Refund!';
    });

    // Patch Update Status Refund (Approved Rejected)
    builder.addCase(resolvePatchStatusRefund.pending, (state) => {
      state.modalUpdateStatusRefund.isError = false;
      state.modalUpdateStatusRefund.isLoading = true;
      state.modalUpdateStatusRefund.isSuccess = false;
    });
    builder.addCase(resolvePatchStatusRefund.fulfilled, (state) => {
      state.modalUpdateStatusRefund.isLoading = false;
      state.modalUpdateStatusRefund.isError = false;
      state.modalUpdateStatusRefund.isSuccess = true;
      state.modalUpdateStatusRefund.successMessage = 'Berhasil mengupdate status refund !';
    });
    builder.addCase(resolvePatchStatusRefund.rejected, (state, {payload} : any) => {
      state.modalUpdateStatusRefund.isError = true;
      state.modalUpdateStatusRefund.isLoading = false;
      state.modalUpdateStatusRefund.isSuccess = false;
      // eslint-disable-next-line max-len
      state.modalUpdateStatusRefund.errorMessage = payload?.message?.includes('sufficient balance') ? 'Saldo disburstment tidak mencukupi, harap top up terlebih dahulu' : 'Gagal mengupdate status refund !';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setCardMedpharmDrug: (state, {payload}) => {
      state.cardMedpharmDrug[payload.name] = payload.value;
    },
    setParamsRecapitulation: (state, {payload}) => {
      state.paramsRecapitulation[payload.name] = payload.value;
    },
    setRejectReason: (state, {payload}) => {
      state.rejectReason[payload.name] = payload.value;
    },
    setRefundsFetching: (state, {payload}) => {
      state.refunds.isFetching = payload;
    },
    resetRejectReason: (state) => {
      state.rejectReason = initialState.rejectReason;
    },
    resetModalUpdateStatusRefund: (state) => {
      state.modalUpdateStatusRefund = initialState.modalUpdateStatusRefund;
    },
    resetStateRefund: () => initialState,
  },
});

export const {
  setModal,
  setParams,
  setRejectReason,
  resetStateRefund,
  resetRejectReason,
  setRefundsFetching,
  setCardMedpharmDrug,
  setParamsRecapitulation,
  resetModalUpdateStatusRefund,
} = refundSlice.actions;

export default refundSlice.reducer;
