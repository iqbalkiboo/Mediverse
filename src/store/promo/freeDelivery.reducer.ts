import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  disableVoucherQuota,
  editVoucherFreeDelivery,
  getDetailFreeDelivery,
  getListFreeDelivery,
  postFreeDelivery,
  putUpdateQuota,
} from '@/src/client/promo/FreeDelivery';

import type {
  IFreeDeliveryState,
  IGetDetailFreeDelivery,
  IGetListFreeDelivery,
} from '@/src/types/MasterPromo/promo/FreeDelivery';

export const initialState: IFreeDeliveryState = {
  freeDeliveries: {
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
  freeDelivery: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  modalUpdateListAction: {
    id: 0,
    flag: '',
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isConfirmation: false,
  },
  formFreeDelivery: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    isModalSuccessOpen: false,
    isModalErrorOpen: false,
    showPerviewCoupon: false,
    form: {
      name: '',
      type: 'nominal',
      code: '',
      quota: '',
      target: 'public',
      nominal: '',
      endPeriod: '',
      percentage: '',
      startPeriod: '',
      maxDiscount: '',
      minPurchase: '',
      BannerCashback: '',
      image: '',
      maxEstimateExpenses: 0,
    },
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    target: '',
  },
  quota: {
    total: 0,
    couponId: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    maxEstimation: 0,
    isModalOpen: false,
    minimalTransactionAmount: 0,
  },
  modalDownloadVoucher: {
    isOpen: false,
    isLoading: false,
    data: {
      name: '',
      nominal: 0,
      endPeriod: '',
      startPeriod: '',
      code: '',
      target: 'private',
    },
  },
};

export const resolveListFreeDelivery = createAsyncThunk(
  'resolve/freeDelivery/list',
  async (payload: IGetListFreeDelivery, { rejectWithValue }) => {
    try {
      const response = await getListFreeDelivery(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailFreeDelivery = createAsyncThunk(
  'resolve/freeDelivery/List',
  async (payload: IGetDetailFreeDelivery, { rejectWithValue }) => {
    try {
      const response = await getDetailFreeDelivery(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveAddVoucherDelivery = createAsyncThunk(
  'resolve/addVoucherFreeDelivery',
  async (payload: any, { rejectWithValue }) => {
    const response = await postFreeDelivery(payload);
    if (!response.error) {
      return {
        data: response.data,
      };
    }
    return rejectWithValue(response);
  }
);

export const resolvePutUpdateQuota = createAsyncThunk(
  'resolve/freeDelivery/updateQuota',
  async (payload: any, { rejectWithValue }) => {
    const response = await putUpdateQuota(payload.id, { quota: payload.quota });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveDisableVoucher = createAsyncThunk(
  'resolve/freeDelivery/disableVoucher',
  async (payload: any, { rejectWithValue }) => {
    const response = await disableVoucherQuota(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveEditVoucher = createAsyncThunk(
  'resolve/freeDelivery/editVoucher',
  async (payload: any, { rejectWithValue }) => {
    const response = await editVoucherFreeDelivery(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

const freeDeliverySlice = createSlice({
  name: 'freeDelivery',
  initialState,
  extraReducers: (builder) => {
    // get list free delivery
    builder.addCase(resolveListFreeDelivery.pending, (state) => {
      state.freeDeliveries.isError = false;
      state.freeDeliveries.isLoading = true;
      state.freeDeliveries.errorMessage = '';
    });
    builder.addCase(resolveListFreeDelivery.fulfilled, (state, { payload }) => {
      state.freeDeliveries.isError = false;
      state.freeDeliveries.isLoading = false;
      state.freeDeliveries.data = payload.data || [];

      // set metadata list voucher
      state.freeDeliveries.metadata.page = payload.metadata.page || 1;
      state.freeDeliveries.metadata.totalPage =
        payload.metadata.total_page || 1;
      state.freeDeliveries.metadata.totalData =
        payload.metadata.total_data || 10;
    });
    builder.addCase(resolveListFreeDelivery.rejected, (state) => {
      state.freeDeliveries.isError = true;
      state.freeDeliveries.isLoading = false;
      state.freeDeliveries.errorMessage =
        'Gagal mendapatkan data voucher gratis ongkir!';
    });
    // get detail free delivery
    builder.addCase(resolveDetailFreeDelivery.pending, (state) => {
      state.freeDelivery.isError = false;
      state.freeDelivery.isLoading = true;
      state.formFreeDelivery.isLoading = true;
      state.freeDelivery.errorMessage = '';
    });
    builder.addCase(
      resolveDetailFreeDelivery.fulfilled,
      (state, { payload }) => {
        state.freeDelivery.isError = false;
        state.freeDelivery.isLoading = false;
        state.freeDelivery.data = payload?.data || {};
        state.formFreeDelivery.form = {
          ...state.formFreeDelivery.form,
          name: payload?.data?.name,
          type: payload?.data?.discount_type,
          code: payload?.data?.code || '',
          quota: payload?.data?.quota,
          target: payload?.data?.target_user,
          nominal: payload?.data?.amount || 0,
          endPeriod: payload?.data?.end_date,
          percentage:
            payload?.data?.discount_type === 'percentage'
              ? payload?.data?.amount
              : 0,
          startPeriod: payload?.data?.start_date,
          maxDiscount: payload?.data?.maximum_discount,
          minPurchase: payload?.data?.minimal_transaction_amount,
          BannerCashback: payload?.data?.banner_voucher,
          image: payload?.data?.image,
        };
        state.formFreeDelivery.isLoading = false;
      }
    );
    builder.addCase(resolveDetailFreeDelivery.rejected, (state) => {
      state.freeDelivery.isError = true;
      state.freeDelivery.isLoading = false;
      state.formFreeDelivery.isError = true;
      state.formFreeDelivery.isLoading = false;
      state.freeDelivery.errorMessage =
        'Gagal mendapatkan data voucher gratis ongkir!';
    });
    // add voucher free delivery
    builder.addCase(resolveAddVoucherDelivery.pending, (state) => {
      state.formFreeDelivery.isLoading = true;
      state.formFreeDelivery.isError = false;
    });
    builder.addCase(resolveAddVoucherDelivery.fulfilled, (state) => {
      state.formFreeDelivery.isLoading = false;
      state.formFreeDelivery.isError = false;
      state.formFreeDelivery.isSuccess = true;
      state.formFreeDelivery.isModalSuccessOpen = true;
      state.formFreeDelivery.successMessage =
        'Berhasil membuat voucher gratis ongkir';
    });
    builder.addCase(resolveAddVoucherDelivery.rejected, (state) => {
      state.formFreeDelivery.isLoading = false;
      state.formFreeDelivery.isError = true;
      state.formFreeDelivery.errorMessage =
        'Gagal membuat voucher gratis ongkir';
      state.formFreeDelivery.isModalErrorOpen = true;
    });
    // update Coupon Quota
    builder.addCase(resolvePutUpdateQuota.pending, (state) => {
      state.quota.isLoading = true;
      state.quota.isError = false;
    });
    builder.addCase(resolvePutUpdateQuota.fulfilled, (state) => {
      state.quota.isLoading = false;
      state.quota.isSuccess = true;
    });
    builder.addCase(resolvePutUpdateQuota.rejected, (state) => {
      state.quota.isLoading = false;
      state.quota.isError = true;
    });
    // disable voucher quota
    builder.addCase(resolveDisableVoucher.pending, (state) => {
      state.modalUpdateListAction.isLoading = true;
      state.modalUpdateListAction.isError = false;
    });
    builder.addCase(resolveDisableVoucher.fulfilled, (state) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isSuccess = true;
      state.modalUpdateListAction.successMessage =
        'Berhasil membatalkan voucher gratis ongkir';
    });
    builder.addCase(resolveDisableVoucher.rejected, (state) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = true;
      state.modalUpdateListAction.errorMessage =
        'Gagal membatalkan voucher gratis ongkir';
    });
    // update voucher free delivery
    builder.addCase(resolveEditVoucher.pending, (state) => {
      state.formFreeDelivery.isLoading = true;
      state.formFreeDelivery.isModalErrorOpen = false;
    });
    builder.addCase(resolveEditVoucher.fulfilled, (state) => {
      state.formFreeDelivery.isLoading = false;
      state.formFreeDelivery.isModalErrorOpen = false;
      state.formFreeDelivery.isModalSuccessOpen = true;
      state.formFreeDelivery.successMessage =
        'Berhasil update voucher gratis ongkir';
    });
    builder.addCase(resolveEditVoucher.rejected, (state) => {
      state.formFreeDelivery.isModalErrorOpen = true;
      state.formFreeDelivery.isLoading = false;
      state.formFreeDelivery.errorMessage =
        'Gagal update voucher gratis ongkir';
    });
  },
  reducers: {
    setForm: (state, { payload }) => {
      state.formFreeDelivery.form[payload.name] = payload.value;
    },
    setFlag: (state, { payload }) => {
      state[payload.state].flag = payload.value;
    },
    setParams: (state, { payload }) => {
      state.params[payload.label] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.name] = payload.value;
    },
    setQuota: (state, { payload }) => {
      state.quota[payload.name] = payload.value;
    },
    resetQuota: (state) => {
      state.quota = initialState.quota;
    },
    setPerviewCoupon: (state, { payload }) => {
      state.formFreeDelivery.showPerviewCoupon = payload.value;
    },
    setBannerPhoto: (state, { payload }) => {
      state.formFreeDelivery.form[payload.label] = payload.value;
    },
    setModalUpdate: (state, { payload }) => {
      state.modalUpdateListAction[payload.name] = payload.value;
    },
    setModalCoupon: (state, { payload }) => {
      state.modalDownloadVoucher[payload.name] = payload.value;
    },
    setVoucherCoupon: (state, { payload }) => {
      state.modalDownloadVoucher.data[payload.name] = payload.value;
    },
    resetFormFreeDelivery: (state) => {
      state.formFreeDelivery.form = initialState.formFreeDelivery.form;
    },
    resetStateFreeDelivery: () => initialState,
  },
});

export const {
  setForm,
  setFlag,
  setQuota,
  setModal,
  setParams,
  resetQuota,
  setModalUpdate,
  setModalCoupon,
  setBannerPhoto,
  setVoucherCoupon,
  resetFormFreeDelivery,
  resetStateFreeDelivery,
  setPerviewCoupon,
} = freeDeliverySlice.actions;

export default freeDeliverySlice.reducer;
