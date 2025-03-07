import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  disableDataVoucherPromo,
  getDetailVoucherPromo,
  getListVoucherPromo,
  postDataVoucherPromo,
  putDataQuotaVoucherPromo,
  putDataVoucherPromo,
} from '@/src/client/promo';

import {ICashbackState} from '@/src/types/MasterPromo/promo/Cashback';

export const initialState: ICashbackState = {
  cashbacks: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    metadata: {
      page: 1,
      limit: 1,
      totalData: 0,
      totalPage: 1,
    },
  },
  cashback: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  cashbackById: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  formCashback: {
    isOpen: false,
    isOpenShowCoupon: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      name: '',
      title: '',
      description: '',
      code: '',
      type: 'nominal',
      quota: '',
      photo: '',
      target: 'public',
      nominal: '',
      percentage: '',
      endPeriod: '',
      startPeriod: '',
      maxDiscount: '',
      minPurchase: '',
      cashbackType: 'medpharm',
      maxEstimateExpenses: 0,
    },
  },
  modalUpdateListAction: {
    flag: '',
    cashbackId: null,
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  modalDownloadCashback: {
    isOpen: false,
    isLoading: false,
    data: {},
  },
  quota: {
    total: 0,
    couponId: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    maxEstimateExpenses: 0,
    isModalOpen: false,
    amount: 0,
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    type: '',
    target: '',
    cashbackType: '',
  },
};

export const resolveListVoucherPromo = createAsyncThunk(
    'resolve/voucherPromo/list',
    async (payload: {
    page: number,
    limit: number,
    search: string,
    target: string,
    status: string,
    type: string,
    providerType: string,
  }, {rejectWithValue}) => {
      try {
        const response = await getListVoucherPromo(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailVoucherPromo = createAsyncThunk(
    'resolve/voucherPromo/detail',
    async (payload: {id: any}, {rejectWithValue}) => {
      try {
        const response = await getDetailVoucherPromo(payload.id);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailVoucherPromoById = createAsyncThunk(
    'resolve/voucherPromo/detailById',
    async (payload: {id: any}, {rejectWithValue}) => {
      try {
        const response = await getDetailVoucherPromo(payload.id);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostDataVoucherPromo = createAsyncThunk(
    'resolve/voucherPromo/post',
    async (payload: {data: any}, {rejectWithValue}) => {
      try {
        const response = await postDataVoucherPromo(payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePutDataVoucherPromo = createAsyncThunk(
    'resolve/voucherPromo/put',
    async (payload: {
  id: string,
  data: any,
}, {rejectWithValue}) => {
      try {
        const response = await putDataVoucherPromo(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePutDataQuotaVoucherPromo = createAsyncThunk(
    'resolve/voucherPromo/putQuota',
    async (payload: any, {rejectWithValue}) => {
      const response = await putDataQuotaVoucherPromo(payload.id, {quota: payload.quota});
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveDisableDataVoucherPromo = createAsyncThunk(
    'resolve/voucherPromo/disable',
    async (payload: {
    id: string,
    data: any,
  }, {rejectWithValue}) => {
      try {
        const response = await disableDataVoucherPromo(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const cashbackSlice = createSlice({
  name: 'cashback',
  initialState,
  extraReducers: (builder) => {
    // Get List Voucher Promo
    builder.addCase(resolveListVoucherPromo.pending, (state) => {
      state.cashbacks.isLoading = true;
      state.cashbacks.isError = false;
    });
    builder.addCase(resolveListVoucherPromo.fulfilled, (state, {payload}) => {
      state.cashbacks.isLoading = false;
      state.cashbacks.isError = false;
      state.cashbacks.data = payload?.data || [];

      // Metadata List Voucher Promo
      state.cashbacks.metadata.page = payload?.metadata?.page || 1;
      state.cashbacks.metadata.limit = payload?.metadata?.per_page || 10;
      state.cashbacks.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.cashbacks.metadata.totalData = payload?.metadata?.total_data || 0;
    });
    builder.addCase(resolveListVoucherPromo.rejected, (state, {payload}: any) => {
      state.cashbacks.isLoading = false;
      state.cashbacks.isError = true;
      state.cashbacks.data = [];
      state.cashbacks.errorMessage = payload?.message || 'Gagal mendapatkan data voucher cashback!';
    });

    // Get Detail Voucher Promo
    builder.addCase(resolveDetailVoucherPromo.pending, (state) => {
      state.cashback.isLoading = true;
      state.cashback.isError = false;
    });
    builder.addCase(resolveDetailVoucherPromo.fulfilled, (state, {payload}) => {
      state.cashback.isLoading = false;
      state.cashback.isError = false;
      state.cashback.data = payload?.data;
    });
    builder.addCase(resolveDetailVoucherPromo.rejected, (state, {payload}: any) => {
      state.cashback.isLoading = false;
      state.cashback.isError = true;
      state.cashback.errorMessage = payload?.message || 'Gagal mendapatkan data voucher cashback!';
    });

    // Get Detail Voucher Promo By Id
    builder.addCase(resolveDetailVoucherPromoById.pending, (state) => {
      state.cashbackById.isLoading = true;
      state.cashbackById.isError = false;
    });
    builder.addCase(resolveDetailVoucherPromoById.fulfilled, (state, {payload}) => {
      state.cashbackById.isLoading = false;
      state.cashbackById.isError = false;

      // Fill Data For Edit Voucher Promo
      state.formCashback.form = {
        ...state.formCashback.form,
        name: payload?.data?.name,
        code: payload?.data?.code,
        type: payload?.data?.discount_type,
        quota: payload?.data?.quota,
        photo: payload?.data?.image,
        target: payload?.data?.target_user,
        nominal: payload?.data?.amount,
        percentage: payload?.data?.amount,
        endPeriod: payload?.data?.end_date,
        startPeriod: payload?.data?.start_date,
        title: payload?.data?.promo_material_title,
        description: payload?.data?.promo_full_description,
        maxDiscount: payload?.data?.maximum_discount,
        minPurchase: payload?.data?.minimal_transaction_amount,
        maxEstimateExpenses: payload?.data?.discount_type === 'nominal' ?
          (payload?.data?.quota * payload?.data?.amount) :
          (payload?.data?.quota * payload?.data?.maximum_discount),
      };
    });
    builder.addCase(resolveDetailVoucherPromoById.rejected, (state, {payload}: any) => {
      state.cashbackById.isLoading = false;
      state.cashbackById.isError = true;
      state.cashbackById.errorMessage = payload?.message || 'Gagal mendapatkan data voucher cashback!';
    });

    // Post Data Voucher Promo
    builder.addCase(resolvePostDataVoucherPromo.pending, (state) => {
      state.formCashback.isLoading = true;
      state.formCashback.isError = false;
    });
    builder.addCase(resolvePostDataVoucherPromo.fulfilled, (state, {payload}) => {
      state.formCashback.isLoading = false;
      state.formCashback.isSuccess = true;
      state.formCashback.successMessage = 'Berhasil menambahkan data voucher cashback';
    });
    builder.addCase(resolvePostDataVoucherPromo.rejected, (state, {payload}) => {
      state.formCashback.isLoading = false;
      state.formCashback.isError = true;
      state.formCashback.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put Data Voucher Promo
    builder.addCase(resolvePutDataVoucherPromo.pending, (state) => {
      state.formCashback.isLoading = true;
      state.formCashback.isError = false;
    });
    builder.addCase(resolvePutDataVoucherPromo.fulfilled, (state, {payload}) => {
      state.formCashback.isLoading = false;
      state.formCashback.isSuccess = true;
      state.formCashback.successMessage = 'Berhasil mengupdate data voucher cashback';
    });
    builder.addCase(resolvePutDataVoucherPromo.rejected, (state, {payload}) => {
      state.formCashback.isLoading = false;
      state.formCashback.isError = true;
      state.formCashback.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put Data Quota Voucher Promo
    builder.addCase(resolvePutDataQuotaVoucherPromo.pending, (state) => {
      state.quota.isLoading = true;
      state.quota.isError = false;
    });
    builder.addCase(resolvePutDataQuotaVoucherPromo.fulfilled, (state) => {
      state.quota.isLoading = false;
      state.quota.isSuccess = true;
    });
    builder.addCase(resolvePutDataQuotaVoucherPromo.rejected, (state) => {
      state.quota.isLoading = false;
      state.quota.isError = true;
    });

    // Disable Data Voucher Promo
    builder.addCase(resolveDisableDataVoucherPromo.pending, (state) => {
      state.modalUpdateListAction.isLoading = true;
      state.modalUpdateListAction.isError = false;
    });
    builder.addCase(resolveDisableDataVoucherPromo.fulfilled, (state, {payload}: any) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = false;
      state.modalUpdateListAction.isSuccess = true;
      state.modalUpdateListAction.successMessage = 'Berhasil mendisable voucher cashback';
    });
    builder.addCase(resolveDisableDataVoucherPromo.rejected, (state, {payload}) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = true;
      state.modalUpdateListAction.isSuccess = false;
      state.modalUpdateListAction.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setFlag: (state, {payload}) => {
      state[payload.state].flag = payload.value;
    },
    setForm: (state, {payload}) => {
      state.formCashback.form[payload.name] = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.name] = payload.value;
    },
    setQuota: (state, {payload}) => {
      state.quota[payload.name] = payload.value;
    },
    setCashbackId: (state, {payload}) => {
      state.modalUpdateListAction.cashbackId = payload.value;
    },
    setDataDownloadCashback: (state, {payload}) => {
      state.modalDownloadCashback.data = payload.value;
    },
    resetFormCashback: (state) => {
      state.formCashback = initialState.formCashback;
    },
    resetStateCashback: () => initialState,
  },
});

export const {
  setFlag,
  setForm,
  setModal,
  setQuota,
  setParams,
  setCashbackId,
  resetFormCashback,
  resetStateCashback,
  setDataDownloadCashback,
} = cashbackSlice.actions;

export default cashbackSlice.reducer;
