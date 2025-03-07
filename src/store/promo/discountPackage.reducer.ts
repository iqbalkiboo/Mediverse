import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  IDiscountPackageState,
  IGetListCouponDiscountParams,
} from '@/src/types/MasterPromo/promo/DiscountPackage';

import {
  getDetailDiscountCoupon,
  getListCoupon,
  getListDrug,
  patchDiscountCoupon,
  postDiscountPackage,
  putDisableDiscountCoupon,
} from '@/src/client/promo/DiscountPackage';

export const initialState: IDiscountPackageState = {
  discountPackages: {
    data: [],
    detail: {},
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
  modalUpdateListAction: {
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    id: 0,
  },
  modalDownloadDiscountPackage: {
    isOpen: false,
    isLoading: false,
    data: {},
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    type: 'discount',
    target: '',
    size: 10,
    totalPage: 10,
    totalData: 10,
  },
  formDiscountPackage: {
    status: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
      successMessage: '',
    },
    data: [],
    discountPackage: [],
    name: '',
    startDate: '',
    endDate: '',
  },
  modalFormDiscountPackage: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isModalOpen: false,
    data: [],
    selectedDrug: [],
  },
  drugParams: {
    type: 'drug',
    limit: 10,
    search: '',
  },
  addDiscountPackage: [
    {
      purchase: '',
      discount: '',
    },
  ],
  itemVariants: {
    data: [],
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
  },
};

export const resolveGetListDrug = createAsyncThunk(
    'resolve/drug/list',
    async (payload: {
      search: string,
      providerId: string
    }, {rejectWithValue}) => {
      try {
        const response = await getListDrug(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostDiscountCoupon = createAsyncThunk(
    'resolve/discount/create',
    async (payload: any, {rejectWithValue}) => {
      const response = await postDiscountPackage(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveListDiscountCoupon = createAsyncThunk(
    'resolve/discountCoupon/list',
    async (payload: IGetListCouponDiscountParams, {rejectWithValue}) => {
      try {
        const response = await getListCoupon(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetDetailDiscountCoupon = createAsyncThunk(
    'resolve/discountCoupon/detail',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDetailDiscountCoupon(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveUpdateDiscountCoupon = createAsyncThunk(
    'resolve/discountCoupon/update',
    async (payload: any, {rejectWithValue}) => {
      const response = await patchDiscountCoupon(payload.id, payload.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveDisableDiscountCoupon = createAsyncThunk(
    'resolve/discountCoupon/disable',
    async (payload: any, {rejectWithValue}) => {
      const response = await putDisableDiscountCoupon(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

const discountPackageSlice = createSlice({
  name: 'discountPackage',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveGetListDrug.pending, (state) => {
      state.modalFormDiscountPackage.isError = false;
      state.modalFormDiscountPackage.isLoading = true;
    });
    builder.addCase(resolveGetListDrug.fulfilled, (state, {payload}) => {
      state.modalFormDiscountPackage.isError = false;
      state.modalFormDiscountPackage.isLoading = false;
      state.modalFormDiscountPackage.data = payload;
    });
    builder.addCase(resolveGetListDrug.rejected, (state, {payload}) => {
      state.modalFormDiscountPackage.isLoading = false;
      state.modalFormDiscountPackage.isError = true;
      state.modalFormDiscountPackage.errorMessage = 'Something wrong!';
    });

    // post discount coupon
    builder.addCase(resolvePostDiscountCoupon.pending, (state) => {
      state.formDiscountPackage.status.isError = false;
      state.formDiscountPackage.status.isSuccess = false;
      state.formDiscountPackage.status.isLoading = true;
    });
    builder.addCase(resolvePostDiscountCoupon.fulfilled, (state, {payload}) => {
      state.formDiscountPackage.status.isSuccess = true;
      state.formDiscountPackage.status.isLoading = false;
    });
    builder.addCase(resolvePostDiscountCoupon.rejected, (state, {payload}: any) => {
      state.formDiscountPackage.status.isLoading = false;
      state.formDiscountPackage.status.isError = true;
      state.formDiscountPackage.status.errorMessage = payload.message;
    });

    // Get List Product Coupon
    builder.addCase(resolveListDiscountCoupon.pending, (state) => {
      state.discountPackages.isError = false;
      state.discountPackages.isLoading = true;
      state.discountPackages.errorMessage = '';
    });
    builder.addCase(resolveListDiscountCoupon.fulfilled, (state, {payload}) => {
      state.discountPackages.isError = false;
      state.discountPackages.isLoading = false;
      state.discountPackages.data = payload.data || [];

      // Metadata List Product Coupon
      state.discountPackages.metadata.page = payload?.metadata?.page || 1;
      state.discountPackages.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.discountPackages.metadata.totalData = payload?.metadata?.total_data || 10;
    });
    builder.addCase(resolveListDiscountCoupon.rejected, (state) => {
      state.discountPackages.isError = true;
      state.discountPackages.isLoading = false;
      state.discountPackages.errorMessage = 'Something wrong!';
    });

    // Product Coupon Detail
    builder.addCase(resolveGetDetailDiscountCoupon.pending, (state) => {
      state.discountPackages.isLoading = true;
      state.discountPackages.isSuccess = false;
      state.discountPackages.isError = false;
    });
    builder.addCase(resolveGetDetailDiscountCoupon.fulfilled, (state, {payload}) => {
      state.discountPackages.isLoading = false;
      state.discountPackages.isSuccess = true;
      state.discountPackages.detail = payload.data;

      // handle form
      state.formDiscountPackage.startDate = payload.data.start_date;
      state.formDiscountPackage.endDate = payload.data.end_date;
      state.formDiscountPackage.name = payload.data.name;
      state.formDiscountPackage.data = payload.data.items;
      state.modalFormDiscountPackage.selectedDrug = payload.data.items;
      state.addDiscountPackage = payload.data.packages.map((item) => {
        return {
          purchase: item.count_item,
          discount: item.discount,
        };
      });
    });
    builder.addCase(resolveGetDetailDiscountCoupon.rejected, (state) => {
      state.discountPackages.isLoading = false;
      state.discountPackages.isError = true;
    });

    // update discount coupon
    builder.addCase(resolveUpdateDiscountCoupon.pending, (state) => {
      state.formDiscountPackage.status.isError = false;
      state.formDiscountPackage.status.isSuccess = false;
      state.formDiscountPackage.status.isLoading = true;
    });
    builder.addCase(resolveUpdateDiscountCoupon.fulfilled, (state, {payload}) => {
      state.formDiscountPackage.status.isSuccess = true;
      state.formDiscountPackage.status.isLoading = false;
    });
    builder.addCase(resolveUpdateDiscountCoupon.rejected, (state, {payload}: any) => {
      state.formDiscountPackage.status.isLoading = false;
      state.formDiscountPackage.status.isError = true;
      state.formDiscountPackage.status.errorMessage = payload.message;
    });

    // disable discount coupon
    builder.addCase(resolveDisableDiscountCoupon.pending, (state) => {
      state.modalUpdateListAction.isLoading = true;
      state.modalUpdateListAction.isSuccess = false;
      state.modalUpdateListAction.isError = false;
    });
    builder.addCase(resolveDisableDiscountCoupon.fulfilled, (state, {payload}) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isSuccess = true;
    });
    builder.addCase(resolveDisableDiscountCoupon.rejected, (state) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = true;
    });
  },
  reducers: {
    setFlag: (state, {payload}) => {
      state[payload.state].flag = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.name] = payload.value;
    },
    resetStateDiscountPackage: () => initialState,
    setModalFormDiscountPackage: (state, {payload}) => {
      state.modalFormDiscountPackage[payload.key] = payload.value;
    },
    setDrugParams: (state, {payload}) => {
      state.drugParams[payload.label] = payload.value;
    },
    clearDrugSearchState: (state) => {
      state.drugParams.search = '';
    },
    setAddDrug: (state, {payload}) => {
      state.modalFormDiscountPackage.selectedDrug = payload;
      state.modalFormDiscountPackage.data = state.modalFormDiscountPackage.data.filter((item) => {
        if (item.id != payload.id) {
          return item;
        }
      });
    },
    setAddSelectedDrug: (state) => {
      state.formDiscountPackage.data = state.modalFormDiscountPackage.selectedDrug;
      state.modalFormDiscountPackage.isModalOpen = false;
    },
    setAddMorePackage: (state, {payload}) => {
      state.addDiscountPackage.push(payload);
    },
    setRemovePackage: (state, {payload}) => {
      state.addDiscountPackage.splice(payload, 1);
    },
    setDiscountPackageValue: (state, {payload}) => {
      state.addDiscountPackage[payload.index][payload.label] = [payload.value];
      state.formDiscountPackage.data = [...payload.selectedDrug];
    },
    setForm: (state, {payload}) => {
      state.formDiscountPackage[payload.key] = payload.value;
    },
    resetStatus: (state) => {
      state.formDiscountPackage.status = initialState.formDiscountPackage.status;
    },
    setDataDownloadDiscountPackage: (state, {payload}) => {
      state.modalDownloadDiscountPackage.data = payload.value;
    },
    resetForm: (state) => {
      state.formDiscountPackage = initialState.formDiscountPackage;
      state.addDiscountPackage = initialState.addDiscountPackage;
    },
  },
});

export const {
  setFlag,
  setForm,
  setModal,
  setParams,
  resetForm,
  setAddDrug,
  resetStatus,
  setDrugParams,
  setRemovePackage,
  setAddMorePackage,
  setAddSelectedDrug,
  clearDrugSearchState,
  setDiscountPackageValue,
  resetStateDiscountPackage,
  setModalFormDiscountPackage,
  setDataDownloadDiscountPackage,
} = discountPackageSlice.actions;

export default discountPackageSlice.reducer;
