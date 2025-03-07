import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getAmountBalanceMarketing,
  getVoucherPromoCount,
} from '@/src/client/promo';

export const initialState = {
  promoCount: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  amountBalanceMarketing: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
};

export const resolveGetVoucherPromoCount = createAsyncThunk(
    'resolve/voucherPromo/count',
    async (payload: {types: {type: string, providerType: string}[]}, {rejectWithValue}) => {
      try {
        const response = await getVoucherPromoCount(payload.types);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetAmountBalanceMarketing = createAsyncThunk(
    'resolve/balanceMarketing/amount',
    async (any, {rejectWithValue}) => {
      try {
        const response = await getAmountBalanceMarketing();
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const promoSlice = createSlice({
  name: 'promo',
  initialState,
  extraReducers: (builder) => {
    // Get voucher promo count
    builder.addCase(resolveGetVoucherPromoCount.pending, (state) => {
      state.promoCount.isLoading = true;
      state.promoCount.isError = false;
    });
    builder.addCase(resolveGetVoucherPromoCount.fulfilled, (state, {payload}) => {
      state.promoCount.isLoading = false;
      state.promoCount.isError = false;
      state.promoCount.data = payload || {};
    });
    builder.addCase(resolveGetVoucherPromoCount.rejected, (state, {payload}: any) => {
      state.promoCount.isLoading = false;
      state.promoCount.isError = true;
      state.promoCount.errorMessage = payload?.message || 'Gagal mendapatkan data promo!';
    });

    // Get amount balance marketing
    builder.addCase(resolveGetAmountBalanceMarketing.pending, (state) => {
      state.amountBalanceMarketing.isLoading = true;
      state.amountBalanceMarketing.isError = false;
    });
    builder.addCase(resolveGetAmountBalanceMarketing.fulfilled, (state, {payload}) => {
      state.amountBalanceMarketing.isLoading = false;
      state.amountBalanceMarketing.isError = false;
      state.amountBalanceMarketing.data = payload.data || {};
    });
    builder.addCase(resolveGetAmountBalanceMarketing.rejected, (state, {payload}: any) => {
      state.amountBalanceMarketing.isLoading = false;
      state.amountBalanceMarketing.isError = true;
      state.amountBalanceMarketing.errorMessage = payload?.message || 'Gagal mendapatkan data saldo!';
    });
  },
  reducers: {
  },
});

export const {
} = promoSlice.actions;

export default promoSlice.reducer;
