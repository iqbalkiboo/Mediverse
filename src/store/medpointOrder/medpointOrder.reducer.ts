import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getDataListCancelReason,
  getDataListObservationReason,
  getDetailTransaction,
  getListTransaction,
  getListTransactions,
} from '@/src/client/transaction';
import {
  getCheckupResult,
  patchDataStatusMedpoint,
} from '@/src/client/medpoint';

import type { IMedpointOrderState } from '@/src/types/MasterTransaction/medpoint';

export const initialState: IMedpointOrderState = {
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
    per_page: 10,
    page: 1,
    total_row: 10,
    total_page: 1,
  },
  medpointOrder: {
    data: [],
    detail: { item: [] },
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  checkupResult: {
    isLoading: false,
    isError: false,
    data: [],
  },
  updateStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    confirmation: false,
    detail: false,
    kipi: false,
    transactionId: '',
    transactionIds: [],
    status: '',
  },
  listCancelReason: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
    params: {
      limit: 100,
      page: 1,
      search: '',
      totalData: 1,
      totalPage: 1,
    },
  },
  listObservationReason: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
    params: {
      limit: 100,
      page: 1,
      search: '',
      totalData: 1,
      totalPage: 1,
    },
  },
  formCancelReason: {
    coding: null,
    text: '',
  },
  formObservationReason: {
    have_complaint: undefined,
    reason: [],
  },
};

export const resolveListVaccination = createAsyncThunk(
  'resolve/vaccination/list',
  async (
    payload: {
      status: string;
      start: string | number;
      pageLength: string | number;
      queueType: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getListTransactions('Imunisasi', payload);
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveTransaction = createAsyncThunk(
  'resolve/transaction/list',
  async (
    payload: {
      status: string;
      page: number;
      limit: number;
      search: string;
      startDate: any;
      endDate: any;
      providerType: string;
      serviceType?: string;
      name: string;
      phoneNumber: string;
      noTicket: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getListTransaction(payload);
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetDetailTransaction = createAsyncThunk(
  'resolve/detailTransaction',
  async (
    payload: {
      id?: string;
      providerType: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransaction(payload);
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetCheckupResult = createAsyncThunk(
  'resolve/checkupResult',
  async (
    payload: {
      providerId: any;
      reservationId: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getCheckupResult(
        payload.providerId,
        payload.reservationId
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePatchStatusMedpoint = createAsyncThunk(
  'resolve/medpoint/patch',
  async (
    payload: {
      id: string | number;
      data: {
        status: string;
        transaction_detail_ids?: string[];
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await patchDataStatusMedpoint(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostObservation = createAsyncThunk(
  'resolve/observation/post',
  async (
    payload: {
      id: string | number;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await patchDataStatusMedpoint(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListCancelReason = createAsyncThunk(
  'resolve/transaction/cancel-reason',
  async (_, { rejectWithValue }) => {
    const response = await getDataListCancelReason({});
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveListObservationReason = createAsyncThunk(
  'resolve/transaction/observation-reason',
  async (_, { rejectWithValue }) => {
    const response = await getDataListObservationReason({});
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const medpointOrderSlice = createSlice({
  name: 'medpointOrder',
  initialState,
  extraReducers: (builder) => {
    // Get List Transaction
    builder.addCase(resolveListVaccination.pending, (state) => {
      state.medpointOrder.isLoading = true;
      state.medpointOrder.isError = false;
      state.medpointOrder.data = [];
      state.metadata.page = 1;
      state.metadata.per_page = 1;
      state.metadata.total_page = 1;
      state.metadata.total_row = 0;
    });
    builder.addCase(resolveListVaccination.fulfilled, (state, { payload }) => {
      state.medpointOrder.isLoading = false;
      state.medpointOrder.isError = false;
      state.medpointOrder.data = payload?.data?.message?.data || [];

      state.metadata.page = payload?.data?.metadata?.page || 1;
      state.metadata.per_page = payload?.data?.metadata?.per_page || 1;
      state.metadata.total_page = payload?.data?.metadata?.total_page || 1;
      state.metadata.total_row = payload?.data?.metadata?.total_row || 0;
    });
    builder.addCase(
      resolveListVaccination.rejected,
      (state, { payload }: any) => {
        state.medpointOrder.isError = true;
        state.medpointOrder.isLoading = false;
        state.medpointOrder.message =
          payload?.message || 'Gagal Mendapatkan Data Transaksi Vaksinasi!';
      }
    );

    // Get detail transaction
    builder.addCase(resolveGetDetailTransaction.pending, (state) => {
      state.medpointOrder.isLoading = true;
      state.medpointOrder.isError = false;
    });
    builder.addCase(
      resolveGetDetailTransaction.fulfilled,
      (state, { payload }) => {
        state.medpointOrder.isLoading = false;
        state.medpointOrder.isError = false;
        state.medpointOrder.detail = payload?.data?.data;
      }
    );
    builder.addCase(
      resolveGetDetailTransaction.rejected,
      (state, { payload }: any) => {
        state.medpointOrder.isLoading = false;
        state.medpointOrder.isError = true;
        state.medpointOrder.message =
          payload?.message || 'Gagal Mendapatkan Data Transaksi Medpoint!';
      }
    );

    // Get Checkup Result
    builder.addCase(resolveGetCheckupResult.pending, (state) => {
      state.checkupResult.isLoading = true;
      state.checkupResult.isError = false;
    });
    builder.addCase(resolveGetCheckupResult.fulfilled, (state, { payload }) => {
      state.checkupResult.isLoading = false;
      state.checkupResult.data = payload;
    });
    builder.addCase(resolveGetCheckupResult.rejected, (state) => {
      state.checkupResult.isLoading = false;
      state.checkupResult.isError = true;
    });

    // Update transaction
    builder.addCase(resolvePatchStatusMedpoint.pending, (state) => {
      state.updateStatus.isLoading = true;
      state.updateStatus.isError = false;
      state.updateStatus.isSuccess = false;
    });
    builder.addCase(resolvePatchStatusMedpoint.fulfilled, (state) => {
      state.updateStatus.isLoading = false;
      state.updateStatus.isSuccess = true;
      state.updateStatus.confirmation = false;
      state.updateStatus.detail = false;
      state.updateStatus.transactionId = '';
      state.updateStatus.transactionIds = [];
    });
    builder.addCase(resolvePatchStatusMedpoint.rejected, (state) => {
      state.updateStatus.isLoading = false;
      state.updateStatus.isError = true;
      state.updateStatus.isSuccess = false;
    });

    // Post observation reason
    builder.addCase(resolvePostObservation.pending, (state) => {
      state.updateStatus.isLoading = true;
      state.updateStatus.isError = false;
      state.updateStatus.isSuccess = false;
    });
    builder.addCase(resolvePostObservation.fulfilled, (state) => {
      state.updateStatus.isLoading = false;
      state.updateStatus.isError = false;
      state.updateStatus.isSuccess = true;
      state.updateStatus.kipi = false;
      state.updateStatus.transactionId = '';
      state.updateStatus.transactionIds = [];
    });
    builder.addCase(resolvePostObservation.rejected, (state) => {
      state.updateStatus.isLoading = false;
      state.updateStatus.isError = true;
      state.updateStatus.isSuccess = false;
    });

    // Get List Cancel Reason
    builder.addCase(resolveListCancelReason.pending, (state) => {
      state.listCancelReason.isLoading = true;
      state.listCancelReason.isError = false;
      state.listCancelReason.errorMessage = '';
    });
    builder.addCase(resolveListCancelReason.fulfilled, (state, { payload }) => {
      state.listCancelReason.isLoading = false;
      state.listCancelReason.isError = false;
      state.listCancelReason.data = payload.data || [];
      state.listCancelReason.params.limit = payload.metadata.size;
      state.listCancelReason.params.totalPage = payload.metadata.totalPage;
      state.listCancelReason.params.totalData = payload.metadata.totalData;
      state.listCancelReason.params.page = payload.metadata.page;
    });
    builder.addCase(resolveListCancelReason.rejected, (state) => {
      state.listCancelReason.isLoading = false;
      state.listCancelReason.isError = true;
      state.listCancelReason.errorMessage = 'Something wrong!';
    });

    // Get List Observation Reason
    builder.addCase(resolveListObservationReason.pending, (state) => {
      state.listObservationReason.isLoading = true;
      state.listObservationReason.isError = false;
      state.listObservationReason.errorMessage = '';
    });
    builder.addCase(
      resolveListObservationReason.fulfilled,
      (state, { payload }) => {
        state.listObservationReason.isLoading = false;
        state.listObservationReason.isError = false;
        state.listObservationReason.data = payload.data || [];
        state.listObservationReason.params.limit = payload.metadata.size;
        state.listObservationReason.params.totalPage =
          payload.metadata.totalPage;
        state.listObservationReason.params.totalData =
          payload.metadata.totalData;
        state.listObservationReason.params.page = payload.metadata.page;
      }
    );
    builder.addCase(resolveListObservationReason.rejected, (state) => {
      state.listObservationReason.isLoading = false;
      state.listObservationReason.isError = true;
      state.listObservationReason.errorMessage = 'Something wrong!';
    });
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    clearParams: (state) => {
      state.params = initialState.params;
    },
    updateStatusConfirmation: (state, { payload }) => {
      state.updateStatus[payload.data.name || 'confirmation'] = true;
      state.updateStatus.transactionId = payload.id;
      state.updateStatus.transactionIds = payload.data.transactionIds;
      state.updateStatus.status = payload.data.status;
    },
    clearUpdateStatus: (state, { payload }) => {
      state.updateStatus[payload.name] = payload.value;
    },
    updateFormCancelReason: (state, { payload }) => {
      state.formCancelReason[payload.name] = payload.value;
    },
    clearFormCancelReason: (state) => {
      state.formCancelReason = initialState.formCancelReason;
    },
    updateFormObservationReason: (state, { payload }) => {
      state.formObservationReason[payload.name] = payload.value;
    },
    clearFormObservationReason: (state) => {
      state.formObservationReason = initialState.formObservationReason;
    },
    clearStateTransaction: () => initialState,
    clearDetailMedpointOrder: (state) => {
      state.medpointOrder.detail = initialState.medpointOrder.detail;
    },
  },
});

export const {
  setParams,
  clearParams,
  updateStatusConfirmation,
  clearUpdateStatus,
  updateFormCancelReason,
  clearFormCancelReason,
  updateFormObservationReason,
  clearFormObservationReason,
  clearStateTransaction,
  clearDetailMedpointOrder,
} = medpointOrderSlice.actions;

export default medpointOrderSlice.reducer;
