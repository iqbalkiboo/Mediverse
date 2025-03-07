import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getDetailMedpharm,
  getDetailMedpharmConsultation,
  getListComplainReason,
  getListMedpharm,
  getOrderTrackingById,
  patchDataStatusMedpharm,
} from '@/src/client/medpharm';

import type {
  IGetDetailMedpharmParams,
  IGetListMedpharmParams,
  IMedpharmState,
  IPatchStatusMedpharmPayload,
} from '@/src/types/MasterTransaction/medpharm';

const initialState: IMedpharmState = {
  idMedpharm: 0,
  transactionDetailIds: [],
  cardOrder: {
    showAll: '',
    showInformation: '',
  },
  rejectReason: {
    reason: '',
    otherReason: '',
  },
  medpharms: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isFetching: false,
    isSearching: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 0,
    },
  },
  medpharm: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  complainReasons: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  orderTracking: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    data: {},
  },
  medpharmConsultation: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  modalUpdateStatusMedpharm: {
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  modalUpdateStatusComplain: {
    flag: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    isOpenApprove: false,
    isOpenReject: false,
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: null,
    endDate: '',
    startDate: '',
  },
};

export const resolveListMedpharm = createAsyncThunk(
  'resolve/medpharm/list',
  async (payload: IGetListMedpharmParams, { rejectWithValue }) => {
    try {
      const response = await getListMedpharm(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailMedpharm = createAsyncThunk(
  'resolve/medpharm/detail',
  async (payload: IGetDetailMedpharmParams, { rejectWithValue }) => {
    try {
      const response = await getDetailMedpharm(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListComplainReason = createAsyncThunk(
  'resolve/medpharm/complainReason/list',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getListComplainReason();
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveOrderTrackingById = createAsyncThunk(
  'resolve/medpharm/orderTracking',
  async (payload: { id: string }, { rejectWithValue }) => {
    try {
      const response = await getOrderTrackingById(payload.id);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePatchStatusMedpharm = createAsyncThunk(
  'resolve/medpharm/patch',
  async (
    payload: {
      id: string | number;
      data: IPatchStatusMedpharmPayload;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await patchDataStatusMedpharm(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePatchStatusComplain = createAsyncThunk(
  'resolve/medpharm/complain/patch',
  async (
    payload: {
      id: string | number;
      data: IPatchStatusMedpharmPayload;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await patchDataStatusMedpharm(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailMedpharmTransaction = createAsyncThunk(
  'resolve/medpharm/transaction',
  async (payload: { id: string; phoneNumber: string }, { rejectWithValue }) => {
    try {
      const response = await getDetailMedpharmConsultation(
        payload.id,
        payload.phoneNumber
      );
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const medpharmSlice = createSlice({
  name: 'medpharm',
  initialState,
  extraReducers: (builder) => {
    // Get List Medpharm
    builder.addCase(resolveListMedpharm.pending, (state) => {
      state.medpharms.isLoading = true;
      state.medpharms.isError = false;
      state.medpharms.isSuccess = false;
    });
    builder.addCase(resolveListMedpharm.fulfilled, (state, { payload }) => {
      state.medpharms.isLoading = false;
      state.medpharms.isError = false;
      state.medpharms.isSuccess = true;
      state.medpharms.isFetching = false;
      state.medpharms.isSearching = false;
      state.medpharms.data = payload?.data || [];

      // Metadata List Medpharm
      state.medpharms.metadata.page = payload?.metadata?.page || 1;
      state.medpharms.metadata.size = payload?.metadata?.per_page || 10;
      state.medpharms.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.medpharms.metadata.totalData = payload?.metadata?.total_row || 0;
    });
    builder.addCase(resolveListMedpharm.rejected, (state, { payload }: any) => {
      state.medpharms.isLoading = false;
      state.medpharms.isError = true;
      state.medpharms.isSuccess = false;
      state.medpharms.isSearching = false;
      state.medpharms.data = [];
      state.medpharms.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data Transaksi Medpharm!';
    });

    // Get Detail Medpharm
    builder.addCase(resolveDetailMedpharm.pending, (state) => {
      state.medpharm.isLoading = true;
      state.medpharm.isError = false;
    });
    builder.addCase(resolveDetailMedpharm.fulfilled, (state, { payload }) => {
      state.medpharm.isLoading = false;
      state.medpharm.isError = false;
      state.medpharm.data = payload?.data;
    });
    builder.addCase(
      resolveDetailMedpharm.rejected,
      (state, { payload }: any) => {
        state.medpharm.isLoading = false;
        state.medpharm.isError = true;
        state.medpharm.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Transaksi Medpharm!';
      }
    );

    // Get List Complain Reason
    builder.addCase(resolveListComplainReason.pending, (state) => {
      state.complainReasons.isLoading = true;
      state.complainReasons.isError = false;
    });
    builder.addCase(
      resolveListComplainReason.fulfilled,
      (state, { payload }) => {
        state.complainReasons.isLoading = false;
        state.complainReasons.isError = false;
        state.complainReasons.data = payload?.data || [];
      }
    );
    builder.addCase(
      resolveListComplainReason.rejected,
      (state, { payload }: any) => {
        state.complainReasons.isLoading = false;
        state.complainReasons.isError = true;
        state.complainReasons.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data!';
      }
    );

    // Get List Complain Reason
    builder.addCase(resolveOrderTrackingById.pending, (state) => {
      state.orderTracking.isLoading = true;
      state.orderTracking.isError = false;
    });
    builder.addCase(
      resolveOrderTrackingById.fulfilled,
      (state, { payload }) => {
        state.orderTracking.isLoading = false;
        state.orderTracking.isError = false;
        state.orderTracking.isSuccess = true;
        state.orderTracking.data = {
          serviceType: payload?.data?.service_type || '',
          history: payload?.data?.history.reverse() || [],
        };
      }
    );
    builder.addCase(
      resolveOrderTrackingById.rejected,
      (state, { payload }: any) => {
        state.orderTracking.isLoading = false;
        state.orderTracking.isError = true;
        state.orderTracking.isSuccess = false;
        state.orderTracking.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data!';
      }
    );

    // Patch Update Status Medpharm
    builder.addCase(resolvePatchStatusMedpharm.pending, (state) => {
      state.modalUpdateStatusMedpharm.isError = false;
      state.modalUpdateStatusMedpharm.isLoading = true;
      state.modalUpdateStatusMedpharm.isSuccess = false;
    });
    builder.addCase(resolvePatchStatusMedpharm.fulfilled, (state) => {
      state.modalUpdateStatusMedpharm.isLoading = false;
      state.modalUpdateStatusMedpharm.isError = false;
      state.modalUpdateStatusMedpharm.isSuccess = true;
      state.modalUpdateStatusMedpharm.successMessage =
        'Berhasil mengupdate status medpharm !';
    });
    builder.addCase(resolvePatchStatusMedpharm.rejected, (state) => {
      state.modalUpdateStatusMedpharm.isError = true;
      state.modalUpdateStatusMedpharm.isLoading = false;
      state.modalUpdateStatusMedpharm.isSuccess = false;
      state.modalUpdateStatusMedpharm.errorMessage =
        'Gagal mengupdate status medpharm !';
    });

    // Patch Update Status Complain
    builder.addCase(resolvePatchStatusComplain.pending, (state) => {
      state.modalUpdateStatusComplain.isError = false;
      state.modalUpdateStatusComplain.isLoading = true;
      state.modalUpdateStatusComplain.isSuccess = false;
    });
    builder.addCase(resolvePatchStatusComplain.fulfilled, (state) => {
      state.modalUpdateStatusComplain.isLoading = false;
      state.modalUpdateStatusComplain.isError = false;
      state.modalUpdateStatusComplain.isSuccess = true;
      state.modalUpdateStatusComplain.successMessage =
        'Berhasil mengupdate status medpharm !';
    });
    builder.addCase(resolvePatchStatusComplain.rejected, (state) => {
      state.modalUpdateStatusComplain.isError = true;
      state.modalUpdateStatusComplain.isLoading = false;
      state.modalUpdateStatusComplain.isSuccess = false;
      state.modalUpdateStatusComplain.errorMessage =
        'Gagal mengupdate status medpharm !';
    });

    // Get Detail Medpharm Consultation
    builder.addCase(resolveDetailMedpharmTransaction.pending, (state) => {
      state.medpharmConsultation.isLoading = true;
      state.medpharmConsultation.isError = false;
    });
    builder.addCase(
      resolveDetailMedpharmTransaction.fulfilled,
      (state, { payload }) => {
        state.medpharmConsultation.isLoading = false;
        state.medpharmConsultation.isError = false;
        state.medpharmConsultation.data = payload?.data;
      }
    );
    builder.addCase(
      resolveDetailMedpharmTransaction.rejected,
      (state, { payload }: any) => {
        state.medpharmConsultation.isLoading = false;
        state.medpharmConsultation.isError = true;
        state.medpharmConsultation.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Konsultasi Medpharm!';
      }
    );
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.field] = payload.value;
    },
    setIdMedpharm: (state, { payload }) => {
      state.idMedpharm = payload;
    },
    setTransactionDetailIds: (state, { payload }) => {
      state.transactionDetailIds = payload;
    },
    setIsSearching: (state, { payload }) => {
      state.medpharms.isSearching = payload.value;
    },
    setIsFetching: (state, { payload }) => {
      state.medpharms.isFetching = payload;
    },
    setCardOrder: (state, { payload }) => {
      state.cardOrder[payload.name] = payload.value;
    },
    setRejectReason: (state, { payload }) => {
      state.rejectReason[payload.name] = payload.value;
    },
    setFlagModalUpdateStatusMedpharm: (state, { payload }) => {
      state.modalUpdateStatusMedpharm.flag = payload;
    },
    setFlagModalUpdateStatusComplain: (state, { payload }) => {
      state.modalUpdateStatusComplain.flag = payload;
    },
    resetRejectReason: (state) => {
      state.rejectReason = initialState.rejectReason;
    },
    resetModalUpdateStatusComplain: (state) => {
      state.modalUpdateStatusComplain.isSuccess = false;
      state.modalUpdateStatusComplain.isError = false;
    },
    resetStateMedpharm: () => initialState,
  },
});

export const {
  setModal,
  setParams,
  setCardOrder,
  setIsFetching,
  setIdMedpharm,
  setIsSearching,
  setRejectReason,
  resetRejectReason,
  resetStateMedpharm,
  setTransactionDetailIds,
  resetModalUpdateStatusComplain,
  setFlagModalUpdateStatusMedpharm,
  setFlagModalUpdateStatusComplain,
} = medpharmSlice.actions;

export default medpharmSlice.reducer;
