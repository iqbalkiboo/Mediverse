import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  disableDataVoucherPromo,
  getDetailVoucherPromo,
  getListHealthFacility,
  getListTreatmentElastic,
  getListVoucherPromo,
  postDataVoucherPromo,
  putDataQuotaVoucherPromo,
  putDataVoucherPromo,
} from '@/client/promo';

// import {
//   IDiscountServiceProduct,
// } from '@/src/types/MasterPromo/promo/discountServiceProduct';

export const initialState: any = {
  discountTreatments: {
    data: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    metadata: {
      page: 1,
      limit: 1,
      totalData: 1,
      totalPage: 1,
    },
  },
  discountTreatment: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  discountTreatmentById: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  healthFacilities: {
    data: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
  },
  treatments: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  formDiscountTreatment: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      target: 'public',
      name: '',
      photo: '',
      endPeriod: '',
      couponCode: '',
      couponQuota: '',
      startPeriod: '',
      healthFacility: '',
      discountType: 'nominal',
      discountAmount: '',
      percentage: '',
      maxDiscount: '',
      minimumPurchase: '',
      estimateMaxSpend: '',
      freeDeliveryAmount: '',
      treatmentItems: [],
    },
  },
  modalAddDiscountTreatment: {
    isOpen: false,
    treatments: [],
    selectedTreatments: [],
  },
  modalUpdateListAction: {
    flag: '',
    isError: false,
    discountTreatmentId: 0,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isConfirmation: false,
  },
  modalDownloadDiscountTreatment: {
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
  modalCouponProduct: {
    isOpen: false,
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    target: '',
    treatmentSearch: '',
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

export const resolveListHealthFacility = createAsyncThunk(
    'resolve/healthFacility/list',
    async (payload: {providerId: string, search?: string}, {rejectWithValue}) => {
      try {
        const response = await getListHealthFacility(payload.providerId, payload.search);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveListTreatmentElastic = createAsyncThunk(
    'resolve/treatmentElastic/list',
    async (payload: {
  search: string,
  parentId: string,
}, {rejectWithValue}) => {
      try {
        const response = await getListTreatmentElastic(payload);
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

const discountServiceProductSlice = createSlice({
  name: 'discountServiceProduct',
  initialState,
  extraReducers: (builder) => {
    // Get list voucher promo
    builder.addCase(resolveListVoucherPromo.pending, (state) => {
      state.discountTreatments.isLoading = true;
      state.discountTreatments.isError = false;
    });
    builder.addCase(resolveListVoucherPromo.fulfilled, (state, {payload}) => {
      state.discountTreatments.isLoading = false;
      state.discountTreatments.isError = false;
      state.discountTreatments.data = payload?.data || [];

      // Metadata list voucher promo
      state.discountTreatments.metadata.page = payload?.metadata?.page || 1;
      state.discountTreatments.metadata.limit = payload?.metadata?.per_page || 10;
      state.discountTreatments.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.discountTreatments.metadata.totalData = payload?.metadata?.total_data || 0;
    });
    builder.addCase(resolveListVoucherPromo.rejected, (state, {payload}: any) => {
      state.discountTreatments.isLoading = false;
      state.discountTreatments.isError = true;
      state.discountTreatments.data = [];
      state.discountTreatments.errorMessage =
        payload?.message || 'Gagal mendapatkan data voucher diskon layanan produk!';
    });

    // Get detail voucher promo
    builder.addCase(resolveDetailVoucherPromo.pending, (state) => {
      state.discountTreatment.isLoading = true;
      state.discountTreatment.isError = false;
    });
    builder.addCase(resolveDetailVoucherPromo.fulfilled, (state, {payload}) => {
      state.discountTreatment.isLoading = false;
      state.discountTreatment.isError = false;
      state.discountTreatment.data = payload?.data;
    });
    builder.addCase(resolveDetailVoucherPromo.rejected, (state, {payload}: any) => {
      state.discountTreatment.isLoading = false;
      state.discountTreatment.isError = true;
      state.discountTreatment.errorMessage =
        payload?.message || 'Gagal mendapatkan data voucher diskon layanan produk!';
    });

    // Get detail voucher promo by id
    builder.addCase(resolveDetailVoucherPromoById.pending, (state) => {
      state.discountTreatmentById.isLoading = true;
      state.discountTreatmentById.isError = false;
    });
    builder.addCase(resolveDetailVoucherPromoById.fulfilled, (state, {payload}) => {
      state.discountTreatmentById.isLoading = false;
      state.discountTreatmentById.isError = false;

      // Fill data for edit voucher promo
      state.formDiscountTreatment.form = {
        ...state.discountTreatmentById.form,
        target: payload?.data?.target_user,
        name: payload?.data?.name,
        photo: payload?.data?.image,
        endPeriod: payload?.data?.end_date,
        couponCode: payload?.data?.code,
        couponQuota: payload?.data?.quota,
        startPeriod: payload?.data?.start_date,
        healthFacility: payload?.data?.metadata?.healthFacility,
        discountType: payload?.data?.discount_type,
        discountAmount: payload?.data?.amount,
        percentage: payload?.data?.amount,
        maxDiscount: payload?.data?.maximum_discount,
        minimumPurchase: payload?.data?.minimal_transaction_amount,
        treatmentItems: payload?.data?.metadata?.treatmentItems || [],
      };

      state.modalAddDiscountTreatment.selectedTreatments = payload?.data?.metadata?.treatmentItems;
    });
    builder.addCase(resolveDetailVoucherPromoById.rejected, (state, {payload}: any) => {
      state.discountTreatmentById.isLoading = false;
      state.discountTreatmentById.isError = true;
      state.discountTreatmentById.errorMessage =
        payload?.message || 'Gagal mendapatkan data voucher diskon layanan produk!';
    });

    // Get list health facility
    builder.addCase(resolveListHealthFacility.pending, (state) => {
      state.healthFacilities.isLoading = true;
      state.healthFacilities.isError = false;
    });
    builder.addCase(resolveListHealthFacility.fulfilled, (state, {payload}) => {
      state.healthFacilities.isLoading = false;
      state.healthFacilities.isError = false;
      state.healthFacilities.data = payload?.data || [];
    });
    builder.addCase(resolveListHealthFacility.rejected, (state, {payload}: any) => {
      state.healthFacilities.data = [];
      state.healthFacilities.isLoading = false;
      state.healthFacilities.isError = true;
      state.healthFacilities.errorMessage = payload?.message || 'Gagal mendapatkan data faskes!';
    });

    // Get list treatment elastic
    builder.addCase(resolveListTreatmentElastic.pending, (state) => {
      state.treatments.isLoading = true;
      state.treatments.isError = false;
    });
    builder.addCase(resolveListTreatmentElastic.fulfilled, (state, {payload}) => {
      state.treatments.isLoading = false;
      state.treatments.isError = false;
      state.modalAddDiscountTreatment.treatments = payload || [];
    });
    builder.addCase(resolveListTreatmentElastic.rejected, (state, {payload}: any) => {
      state.treatments.isLoading = false;
      state.treatments.isError = true;
      state.treatments.errorMessage = payload?.message || 'Gagal mendapatkan data layanan!';
    });

    // Post data voucher promo
    builder.addCase(resolvePostDataVoucherPromo.pending, (state) => {
      state.formDiscountTreatment.isLoading = true;
      state.formDiscountTreatment.isError = false;
    });
    builder.addCase(resolvePostDataVoucherPromo.fulfilled, (state, {payload}) => {
      state.formDiscountTreatment.isLoading = false;
      state.formDiscountTreatment.isSuccess = true;
      state.formDiscountTreatment.successMessage = 'Berhasil menambahkan data diskon layanan produk';
    });
    builder.addCase(resolvePostDataVoucherPromo.rejected, (state, {payload}) => {
      state.formDiscountTreatment.isLoading = false;
      state.formDiscountTreatment.isError = true;
      state.formDiscountTreatment.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put data voucher promo
    builder.addCase(resolvePutDataVoucherPromo.pending, (state) => {
      state.formDiscountTreatment.isLoading = true;
      state.formDiscountTreatment.isError = false;
    });
    builder.addCase(resolvePutDataVoucherPromo.fulfilled, (state, {payload}) => {
      state.formDiscountTreatment.isLoading = false;
      state.formDiscountTreatment.isSuccess = true;
      state.formDiscountTreatment.successMessage = 'Berhasil mengupdate data diskon layanan produk';
    });
    builder.addCase(resolvePutDataVoucherPromo.rejected, (state, {payload}) => {
      state.formDiscountTreatment.isLoading = false;
      state.formDiscountTreatment.isError = true;
      state.formDiscountTreatment.errorMessage = String(payload) || 'Something Wrong !';
    });

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
    builder.addCase(resolveDisableDataVoucherPromo.fulfilled, (state, {payload}: any) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = false;
      state.modalUpdateListAction.isSuccess = true;
      state.modalUpdateListAction.successMessage = 'Berhasil mendisable voucher diskon layanan produk';
    });
    builder.addCase(resolveDisableDataVoucherPromo.rejected, (state, {payload}) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = true;
      state.modalUpdateListAction.isSuccess = false;
      state.modalUpdateListAction.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setQuota: (state, {payload}) => {
      state.quota[payload.name] = payload.value;
    },
    setFlag: (state, {payload}) => {
      state[payload.state].flag = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.name] = payload.value;
    },
    setDiscountTreatmentId: (state, {payload}) => {
      state.modalUpdateListAction.discountTreatmentId = payload.value;
    },
    setDataDownloadDiscountTreatment: (state, {payload}) => {
      state.modalDownloadDiscountTreatment.data = payload.value;
    },
    setSelectedTreatment: (state, {payload}) => {
      state.modalAddDiscountTreatment.selectedTreatments.push(payload);
    },
    deleteSelectedTreatment: (state, {payload}) => {
      state.modalAddDiscountTreatment.selectedTreatments.splice(payload, 1);
    },
    setFormDiscountTreatment: (state, {payload}) => {
      state.formDiscountTreatment.form[payload.name] = payload.value;
    },
    resetFormDiscountTreatment: (state) => {
      state.formDiscountTreatment = initialState.formDiscountTreatment;
    },
    resetQuota: (state) => {
      state.quota = initialState.quota;
    },
  },
});

export const {
  setFlag,
  setModal,
  setQuota,
  setParams,
  resetQuota,
  setSelectedTreatment,
  setDiscountTreatmentId,
  deleteSelectedTreatment,
  setFormDiscountTreatment,
  resetFormDiscountTreatment,
  setDataDownloadDiscountTreatment,
} = discountServiceProductSlice.actions;

export default discountServiceProductSlice.reducer;


