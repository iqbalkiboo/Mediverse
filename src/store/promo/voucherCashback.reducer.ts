import {
  createSlice,
} from '@reduxjs/toolkit';

import {IVoucherCashbackState} from '@/src/types/MasterPromo/promo/voucherCashback';

export const initialState:IVoucherCashbackState = {
  formVoucherCashback: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      name: '',
      code: '',
      type: '',
      quota: '',
      target: '',
      nominal: '',
      percentage: '',
      endPeriod: '',
      startPeriod: '',
      maxDiscount: '',
      minPurchase: '',
      maxEstimateExpenses: 0,
    },
  },
};

const voucherCashbackSlice = createSlice({
  name: 'voucherCashback',
  initialState,
  extraReducers: (builder) => {},
  reducers: {
    setForm: (state, {payload}) => {
      state.formVoucherCashback.form[payload.name] = payload.value;
    },
  },
});

export const {
  setForm,
} = voucherCashbackSlice.actions;

export default voucherCashbackSlice.reducer;
