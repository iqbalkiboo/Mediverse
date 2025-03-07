import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  disableDataVoucherPromo,
  getDetailVoucherPromo,
  getListVoucherPromo,
  postDataVoucherPromo,
  putDataQuotaVoucherPromo,
  putDataVoucherPromo,
} from '@/src/client/promo';

import type { IDiscountMedpoint } from '@/src/types/MasterPromo/promo/discountMedpoint';

export const initialState: IDiscountMedpoint = {
  discountMedpoints: {
    data: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    metadata: {
      page: 1,
      limit: 1,
      totalData: 1,
      totalPage: 1,
    },
  },
  discountMedpoint: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  discountMedpointById: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  modalUpdateListAction: {
    flag: '',
    discountMedpointId: null,
    isConfirmation: false,
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
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
  modalDownloadDiscountMedpoint: {
    isOpen: false,
    isLoading: false,
    data: {},
  },
  formDiscountMedpoint: {
    isOpen: false,
    isOpenShowCoupon: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      name: '',
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
      titlePromo: '',
      descriptionPromo: '',
      maxEstimateExpenses: 0,
      providerType: 'medpoint',
    },
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    target: '',
    providerType: '',
  },
};

export const resolveListVoucherPromo = createAsyncThunk(
  'resolve/voucherPromo/list',
  async (
    payload: {
      page: number;
      limit: number;
      search: string;
      target: string;
      status: string;
      type: string;
      providerType: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListVoucherPromo(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailVoucherPromo = createAsyncThunk(
  'resolve/voucherPromo/detail',
  async (payload: { id: any }, { rejectWithValue }) => {
    try {
      const response = await getDetailVoucherPromo(payload.id);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailVoucherPromoById = createAsyncThunk(
  'resolve/voucherPromo/detailById',
  async (payload: { id: any }, { rejectWithValue }) => {
    try {
      const response = await getDetailVoucherPromo(payload.id);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostDataVoucherPromo = createAsyncThunk(
  'resolve/voucherPromo/post',
  async (payload: { data: any }, { rejectWithValue }) => {
    try {
      const response = await postDataVoucherPromo(payload.data);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePutDataVoucherPromo = createAsyncThunk(
  'resolve/voucherPromo/put',
  async (
    payload: {
      id: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await putDataVoucherPromo(payload.id, payload.data);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePutDataQuotaVoucherPromo = createAsyncThunk(
  'resolve/voucherPromo/putQuota',
  async (payload: any, { rejectWithValue }) => {
    const response = await putDataQuotaVoucherPromo(payload.id, {
      quota: payload.quota,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveDisableDataVoucherPromo = createAsyncThunk(
  'resolve/voucherPromo/disable',
  async (
    payload: {
      id: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await disableDataVoucherPromo(payload.id, payload.data);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const discountMedpointSlice = createSlice({
  name: 'discountMedpoint',
  initialState,
  extraReducers: (builder) => {
    // Get list discount medpoint
    builder.addCase(resolveListVoucherPromo.pending, (state) => {
      state.discountMedpoints.isLoading = true;
      state.discountMedpoints.isError = false;
    });
    builder.addCase(resolveListVoucherPromo.fulfilled, (state, { payload }) => {
      state.discountMedpoints.isLoading = false;
      state.discountMedpoints.isError = false;
      state.discountMedpoints.data = payload?.data || [];

      // Metadata list voucher promo
      state.discountMedpoints.metadata.page = payload?.metadata?.page || 1;
      state.discountMedpoints.metadata.limit =
        payload?.metadata?.per_page || 10;
      state.discountMedpoints.metadata.totalPage =
        payload?.metadata?.total_page || 1;
      state.discountMedpoints.metadata.totalData =
        payload?.metadata?.total_data || 0;
    });
    builder.addCase(
      resolveListVoucherPromo.rejected,
      (state, { payload }: any) => {
        state.discountMedpoints.isLoading = false;
        state.discountMedpoints.isError = true;
        state.discountMedpoints.data = [];
        state.discountMedpoints.errorMessage =
          payload?.message || 'Gagal mendapatkan data voucher diskon medpoint!';
      }
    );

    // Get detail voucher promo
    builder.addCase(resolveDetailVoucherPromo.pending, (state) => {
      state.discountMedpoint.isLoading = true;
      state.discountMedpoint.isError = false;
    });
    builder.addCase(
      resolveDetailVoucherPromo.fulfilled,
      (state, { payload }) => {
        state.discountMedpoint.isLoading = false;
        state.discountMedpoint.isError = false;
        state.discountMedpoint.data = payload?.data;
      }
    );
    builder.addCase(
      resolveDetailVoucherPromo.rejected,
      (state, { payload }: any) => {
        state.discountMedpoint.isLoading = false;
        state.discountMedpoint.isError = true;
        state.discountMedpoint.errorMessage =
          payload?.message || 'Gagal mendapatkan data voucher diskon medpoint!';
      }
    );

    // Get detail voucher promo by id
    builder.addCase(resolveDetailVoucherPromoById.pending, (state) => {
      state.discountMedpointById.isLoading = true;
      state.discountMedpointById.isError = false;
    });
    builder.addCase(
      resolveDetailVoucherPromoById.fulfilled,
      (state, { payload }) => {
        state.discountMedpointById.isLoading = false;
        state.discountMedpointById.isError = false;

        // Fill Data For Edit Voucher Promo
        state.formDiscountMedpoint.form = {
          ...state.formDiscountMedpoint.form,
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
          maxDiscount: payload?.data?.maximum_discount,
          minPurchase: payload?.data?.minimal_transaction_amount,
          titlePromo: payload?.data?.promo_material_title,
          descriptionPromo: payload?.data?.promo_full_description,
          providerType: payload?.data?.provider_type,
          maxEstimateExpenses:
            payload?.data?.discount_type === 'nominal'
              ? payload?.data?.quota * payload?.data?.amount
              : payload?.data?.quota * payload?.data?.maximum_discount,
        };
      }
    );
    builder.addCase(
      resolveDetailVoucherPromoById.rejected,
      (state, { payload }: any) => {
        state.discountMedpointById.isLoading = false;
        state.discountMedpointById.isError = true;
        state.discountMedpointById.errorMessage =
          payload?.message || 'Gagal mendapatkan data voucher cashback!';
      }
    );

    // Post data voucher promo
    builder.addCase(resolvePostDataVoucherPromo.pending, (state) => {
      state.formDiscountMedpoint.isLoading = true;
      state.formDiscountMedpoint.isError = false;
    });
    builder.addCase(resolvePostDataVoucherPromo.fulfilled, (state) => {
      state.formDiscountMedpoint.isLoading = false;
      state.formDiscountMedpoint.isSuccess = true;
      state.formDiscountMedpoint.successMessage =
        'Berhasil menambahkan data voucher diskon medpoint';
    });
    builder.addCase(
      resolvePostDataVoucherPromo.rejected,
      (state, { payload }) => {
        state.formDiscountMedpoint.isLoading = false;
        state.formDiscountMedpoint.isError = true;
        state.formDiscountMedpoint.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );

    // Put data voucher promo
    builder.addCase(resolvePutDataVoucherPromo.pending, (state) => {
      state.formDiscountMedpoint.isLoading = true;
      state.formDiscountMedpoint.isError = false;
    });
    builder.addCase(resolvePutDataVoucherPromo.fulfilled, (state) => {
      state.formDiscountMedpoint.isLoading = false;
      state.formDiscountMedpoint.isSuccess = true;
      state.formDiscountMedpoint.successMessage =
        'Berhasil mengupdate data voucher diskon medpoint';
    });
    builder.addCase(
      resolvePutDataVoucherPromo.rejected,
      (state, { payload }) => {
        state.formDiscountMedpoint.isLoading = false;
        state.formDiscountMedpoint.isError = true;
        state.formDiscountMedpoint.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );

    // Put data quota voucher promo
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

    // Disable data voucher promo
    builder.addCase(resolveDisableDataVoucherPromo.pending, (state) => {
      state.modalUpdateListAction.isLoading = true;
      state.modalUpdateListAction.isError = false;
    });
    builder.addCase(resolveDisableDataVoucherPromo.fulfilled, (state) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = false;
      state.modalUpdateListAction.isSuccess = true;
      state.modalUpdateListAction.successMessage =
        'Berhasil mendisable voucher diskon medpoint';
    });
    builder.addCase(
      resolveDisableDataVoucherPromo.rejected,
      (state, { payload }) => {
        state.modalUpdateListAction.isLoading = false;
        state.modalUpdateListAction.isError = true;
        state.modalUpdateListAction.isSuccess = false;
        state.modalUpdateListAction.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setForm: (state, { payload }) => {
      state.formDiscountMedpoint.form[payload.name] = payload.value;
    },
    setQuota: (state, { payload }) => {
      state.quota[payload.name] = payload.value;
    },
    setFlag: (state, { payload }) => {
      state[payload.state].flag = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.name] = payload.value;
    },
    setDiscountMedpointId: (state, { payload }) => {
      state.modalUpdateListAction.discountMedpointId = payload.value;
    },
    setDataDownloadDiscountMedpoint: (state, { payload }) => {
      state.modalDownloadDiscountMedpoint.data = payload.value;
    },
    resetFormDiscountMedpoint: (state) => {
      state.formDiscountMedpoint = initialState.formDiscountMedpoint;
    },
    resetQuota: (state) => {
      state.quota = initialState.quota;
    },
    resetStateDiscountMedpoint: () => initialState,
  },
});

export const {
  setFlag,
  setForm,
  setModal,
  setQuota,
  setParams,
  resetQuota,
  setDiscountMedpointId,
  resetFormDiscountMedpoint,
  resetStateDiscountMedpoint,
  setDataDownloadDiscountMedpoint,
} = discountMedpointSlice.actions;

export default discountMedpointSlice.reducer;
