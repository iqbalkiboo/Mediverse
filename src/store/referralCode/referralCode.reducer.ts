import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getDataRecapReferralCode,
  getListVoucher,
  getListVoucherUsage,
} from '@/src/client/referralCode';

import {
  IGetListVoucherParams,
  IGetListVoucherUsageParams,
  IReferralCodeState,
} from '@/src/types/MasterPromo/referralCode/ReferralCode';

const initialState: IReferralCodeState = {
  recapReferralCodes: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  voucherReferralCodes: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 10,
    },
  },
  voucherUsageReferralCodes: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 10,
    },
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    endDate: '',
    startDate: '',
  },
};

export const resolveRecapReferralCode = createAsyncThunk(
    'resolve/referralCode/recap',
    async (any, {rejectWithValue}) => {
      try {
        const response = await getDataRecapReferralCode();
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveListVoucher = createAsyncThunk(
    'resolve/referralCode/voucher/list',
    async (payload: IGetListVoucherParams, {rejectWithValue}) => {
      try {
        const response = await getListVoucher(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveListVoucherUsage = createAsyncThunk(
    'resolve/referralCode/voucherUsage/list',
    async (payload: IGetListVoucherUsageParams, {rejectWithValue}) => {
      try {
        const response = await getListVoucherUsage(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const referralCodeSlice = createSlice({
  name: 'referralCode',
  initialState,
  extraReducers: (builder) => {
    // Get Recap Referral Code
    builder.addCase(resolveRecapReferralCode.pending, (state) => {
      state.recapReferralCodes.isError = false;
      state.recapReferralCodes.isLoading = true;
      state.recapReferralCodes.errorMessage = '';
    });
    builder.addCase(resolveRecapReferralCode.fulfilled, (state, {payload}) => {
      state.recapReferralCodes.isError = false;
      state.recapReferralCodes.isLoading = false;
      state.recapReferralCodes.data = payload || {};
    });
    builder.addCase(resolveRecapReferralCode.rejected, (state) => {
      state.recapReferralCodes.isError = true;
      state.recapReferralCodes.isLoading = false;
      state.recapReferralCodes.errorMessage = 'Something wrong!';
    });

    // Get List Voucher Referral Code
    builder.addCase(resolveListVoucher.pending, (state) => {
      state.voucherReferralCodes.isError = false;
      state.voucherReferralCodes.isLoading = true;
      state.voucherReferralCodes.errorMessage = '';
    });
    builder.addCase(resolveListVoucher.fulfilled, (state, {payload}) => {
      state.voucherReferralCodes.isError = false;
      state.voucherReferralCodes.isLoading = false;
      state.voucherReferralCodes.data = payload.data || [];

      // Metadata List Voucher Referral Code
      state.voucherReferralCodes.metadata.page = payload?.metadata?.page || 1;
      state.voucherReferralCodes.metadata.size = payload?.metadata?.size || 10;
      state.voucherReferralCodes.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.voucherReferralCodes.metadata.totalData = payload?.metadata?.total_data || 10;
    });
    builder.addCase(resolveListVoucher.rejected, (state) => {
      state.voucherReferralCodes.isError = true;
      state.voucherReferralCodes.isLoading = false;
      state.voucherReferralCodes.errorMessage = 'Something wrong!';
    });

    // Get List Voucher Usage Referral Code
    builder.addCase(resolveListVoucherUsage.pending, (state) => {
      state.voucherUsageReferralCodes.isError = false;
      state.voucherUsageReferralCodes.isLoading = true;
      state.voucherUsageReferralCodes.errorMessage = '';
    });
    builder.addCase(resolveListVoucherUsage.fulfilled, (state, {payload}) => {
      state.voucherUsageReferralCodes.isError = false;
      state.voucherUsageReferralCodes.isLoading = false;
      state.voucherUsageReferralCodes.data = payload.data || [];

      // Metadata List Voucher Referral Code
      state.voucherUsageReferralCodes.metadata.page = payload.metadata.page || 1;
      state.voucherUsageReferralCodes.metadata.size = payload.metadata.size || 10;
      state.voucherUsageReferralCodes.metadata.totalPage = payload.metadata.total_page || 1;
      state.voucherUsageReferralCodes.metadata.totalData = payload.metadata.total_data || 10;
    });
    builder.addCase(resolveListVoucherUsage.rejected, (state) => {
      state.voucherUsageReferralCodes.isError = true;
      state.voucherUsageReferralCodes.isLoading = false;
      state.voucherUsageReferralCodes.errorMessage = 'Something wrong!';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    clearStateVoucher: (state) => {
      state.params = initialState.params;
      state.voucherReferralCodes = initialState.voucherReferralCodes;
    },
    clearStateVoucherUsage: (state) => {
      state.params = initialState.params;
      state.voucherUsageReferralCodes = initialState.voucherUsageReferralCodes;
    },
  },
});

export const {
  setParams,
  clearStateVoucher,
  clearStateVoucherUsage,
} = referralCodeSlice.actions;

export default referralCodeSlice.reducer;
