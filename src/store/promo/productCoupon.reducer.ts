import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getDetailProductCoupon,
  getListCoupon,
  getListDrug,
  patchDisableStatus,
  patchProductCoupon,
  postProductCoupon,
  putUpdateQuota,
} from '@/src/client/promo/ProductCoupon';

import type {
  IGetListProductCouponParams,
  IListDrugParams,
  IProductCouponState,
} from '@/src/types/MasterPromo/promo/productCoupon';

export const initialState: IProductCouponState = {
  productCoupons: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    metadata: {
      page: 1,
      totalData: 1,
      totalPage: 1,
    },
  },
  productCoupon: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    data: {},
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
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    type: 'product',
    target: '',
    size: 10,
    totalPage: 10,
    totalData: 10,
    couponType: '',
  },
  formAddCoupon: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    target: 'public',
    name: '',
    startPeriod: '',
    endPeriod: '',
    couponType: 'cashback',
    discountType: 'nominal',
    couponCode: '',
    discountAmount: 0,
    cashbackPercentage: 0,
    maxDiscount: 0,
    minimumPurchase: 0,
    couponQuota: 0,
    estimateMaxSpend: 0,
    freeDeliveryAmount: 0,
  },
  tabProductSetting: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  drugs: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isModalOpen: false,
    data: [],
  },
  listAddedDrug: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  drugParams: {
    type: 'drug',
    limit: 100,
    search: '',
    drugType: '',
    drugCategory: '',
    sortByStock: 'desc',
    parentId: '',
    providerId: '',
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
  modalDownloadProduct: {
    isOpen: false,
    isLoading: false,
    data: {},
  },
  modalCouponProduct: {
    isOpen: false,
  },
};

export const resolveGetListDrug = createAsyncThunk(
  'resolve/drug/list',
  async (payload: IListDrugParams, { rejectWithValue }) => {
    try {
      const response = await getListDrug(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListProductCoupon = createAsyncThunk(
  'resolve/productCoupon/list',
  async (payload: IGetListProductCouponParams, { rejectWithValue }) => {
    try {
      const response = await getListCoupon(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetDetailProductCoupon = createAsyncThunk(
  'resolve/productCoupon/detail',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDetailProductCoupon(payload.id);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePostVoucherCashback = createAsyncThunk(
  'resolve/productCoupon/add',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postProductCoupon(payload);
      if (response.status !== 200) {
        return rejectWithValue(response.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const resolvePutUpdateQuota = createAsyncThunk(
  'resolve/productCoupon/updateQuota',
  async (payload: any, { rejectWithValue }) => {
    const response = await putUpdateQuota(payload.id, { quota: payload.quota });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePutStatusCoupon = createAsyncThunk(
  'resolve/productCoupon/updateStatus',
  async (payload: any, { rejectWithValue }) => {
    const response = await patchDisableStatus(payload.id);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveUpdateProductCoupon = createAsyncThunk(
  'resolve/productCoupon/update',
  async (payload: any, { rejectWithValue }) => {
    const response = await patchProductCoupon(payload.id, payload.data);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

const productCouponSlice = createSlice({
  name: 'productCoupon',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveGetListDrug.pending, (state) => {
      state.drugs.isError = false;
      state.drugs.isLoading = true;
    });
    builder.addCase(resolveGetListDrug.fulfilled, (state, { payload }) => {
      state.drugs.isError = false;
      state.drugs.isLoading = false;
      state.drugs.data = payload;
    });
    builder.addCase(resolveGetListDrug.rejected, (state) => {
      state.drugs.isLoading = false;
      state.drugs.isError = true;
      state.drugs.errorMessage = 'Something wrong!';
    });

    // Get List Product Coupon
    builder.addCase(resolveListProductCoupon.pending, (state) => {
      state.productCoupons.isError = false;
      state.productCoupons.isLoading = true;
      state.productCoupons.errorMessage = '';
    });
    builder.addCase(
      resolveListProductCoupon.fulfilled,
      (state, { payload }) => {
        state.productCoupons.isError = false;
        state.productCoupons.isLoading = false;
        state.productCoupons.data = payload.data || [];

        // Metadata List Product Coupon
        state.productCoupons.metadata.page = payload?.metadata?.page || 1;
        state.productCoupons.metadata.totalPage =
          payload?.metadata?.total_page || 1;
        state.productCoupons.metadata.totalData =
          payload?.metadata?.total_data || 10;
      }
    );
    builder.addCase(resolveListProductCoupon.rejected, (state) => {
      state.productCoupons.isError = true;
      state.productCoupons.isLoading = false;
      state.productCoupons.errorMessage = 'Something wrong!';
    });

    // Product Coupon Detail
    builder.addCase(resolveGetDetailProductCoupon.pending, (state) => {
      state.productCoupon.isLoading = true;
      state.productCoupon.isSuccess = false;
      state.productCoupon.isError = false;
    });
    builder.addCase(
      resolveGetDetailProductCoupon.fulfilled,
      (state, { payload }) => {
        state.productCoupon.isLoading = false;
        state.productCoupon.isSuccess = true;
        state.productCoupon.isError = false;
        state.productCoupon.errorMessage = '';
        state.productCoupon.data = payload.data;

        // handle form product coupon
        state.formAddCoupon.target = payload.data.target_user;
        state.formAddCoupon.name = payload.data.name;
        state.formAddCoupon.startPeriod = payload.data.start_date;
        state.formAddCoupon.endPeriod = payload.data.end_date;
        state.formAddCoupon.couponType = payload.data.coupon_type;
        state.formAddCoupon.discountType = payload.data.discount_type;
        state.formAddCoupon.discountAmount = payload.data.amount;
        state.formAddCoupon.minimumPurchase =
          payload.data.minimal_transaction_amount;
        state.formAddCoupon.couponQuota = payload.data.quota;
        state.formAddCoupon.couponCode = payload.data.code;
        state.formAddCoupon.cashbackPercentage = payload.data.amount;
        state.formAddCoupon.maxDiscount = payload.data.maximum_discount;
        state.formAddCoupon.freeDeliveryAmount = payload.data.amount;
        state.listAddedDrug.data = payload.data.metadata.drugItems || [];
        state.drugParams.parentId =
          payload.data.metadata && payload.data.metadata.drugItems.length
            ? payload.data.metadata.drugItems[0].parentId
            : '';
      }
    );
    builder.addCase(
      resolveGetDetailProductCoupon.rejected,
      (state, { payload }: any) => {
        state.productCoupon.isLoading = false;
        state.productCoupon.isSuccess = false;
        state.productCoupon.isError = true;
        state.productCoupon.errorMessage =
          payload?.message || 'Gagal mendapatkan data diskon';
      }
    );

    // Post Add Coupon
    builder.addCase(resolvePostVoucherCashback.pending, (state) => {
      state.formAddCoupon.isLoading = true;
      state.formAddCoupon.isSuccess = false;
      state.formAddCoupon.isError = false;
    });

    builder.addCase(resolvePostVoucherCashback.fulfilled, (state) => {
      state.formAddCoupon.isLoading = false;
      state.formAddCoupon.isSuccess = true;
      state.formAddCoupon.isError = false;
    });

    builder.addCase(resolvePostVoucherCashback.rejected, (state) => {
      state.formAddCoupon.isLoading = false;
      state.formAddCoupon.isSuccess = false;
      state.formAddCoupon.isError = true;
    });
    // Update Coupon Quota
    builder.addCase(resolvePutUpdateQuota.pending, (state) => {
      state.quota.isLoading = true;
      state.quota.isSuccess = false;
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
    // Update coupon status to disable
    builder.addCase(resolvePutStatusCoupon.pending, (state) => {
      state.modalUpdateListAction.isLoading = true;
      state.modalUpdateListAction.isSuccess = false;
      state.modalUpdateListAction.isError = false;
    });
    builder.addCase(resolvePutStatusCoupon.fulfilled, (state) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isSuccess = true;
    });
    builder.addCase(resolvePutStatusCoupon.rejected, (state) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = true;
    });

    builder.addCase(resolveUpdateProductCoupon.pending, (state) => {
      state.formAddCoupon.isLoading = true;
      state.formAddCoupon.isSuccess = false;
      state.formAddCoupon.isError = false;
    });

    builder.addCase(resolveUpdateProductCoupon.fulfilled, (state) => {
      state.formAddCoupon.isLoading = false;
      state.formAddCoupon.isSuccess = true;
      state.formAddCoupon.isError = false;
    });

    builder.addCase(resolveUpdateProductCoupon.rejected, (state) => {
      state.formAddCoupon.isLoading = false;
      state.formAddCoupon.isSuccess = false;
      state.formAddCoupon.isError = true;
    });
  },
  reducers: {
    resetStateDiscountPackage: () => initialState,
    setFlag: (state, { payload }) => {
      state[payload.state].flag = payload.value;
    },
    setParams: (state, { payload }) => {
      state.params[payload.label] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.name] = payload.value;
    },
    setProductCoupon: (state, { payload }) => {
      state.productCoupon[payload.key] = payload.value;
    },
    setFormAddCoupon: (state, { payload }) => {
      state.formAddCoupon[payload.key] = payload.value;
    },
    setModalProductSetting: (state, { payload }) => {
      state.drugs[payload.key] = payload.value;
    },
    setAddDrug: (state, { payload }) => {
      state.tabProductSetting.data.push(payload);
      state.drugs.data = state.drugs.data.filter((item) => {
        if (item.id !== payload.id) {
          return item;
        }
      });
    },
    setRemoveDrug: (state, { payload }) => {
      state.drugs.data.push(payload);
      state.tabProductSetting.data = state.tabProductSetting.data.filter(
        (item) => {
          if (item.id !== payload.id) {
            return item;
          }
        }
      );
    },
    setAddListDrug: (state) => {
      state.listAddedDrug.data = state.tabProductSetting.data;
      state.drugs.isModalOpen = false;
    },
    setResetDrug: (state) => {
      state.tabProductSetting = initialState.tabProductSetting;
      state.listAddedDrug = initialState.listAddedDrug;
    },
    setDrugParams: (state, { payload }) => {
      state.drugParams[payload.label] = payload.value;
    },
    clearDrugSearch: (state) => {
      state.drugParams.search = '';
    },
    setAddedDrugInitial: (state) => {
      state.tabProductSetting.data = state.listAddedDrug.data;
    },
    setResetStateAddProduct: (state) => {
      state.formAddCoupon.isError = false;
      state.formAddCoupon.isSuccess = false;
      state.formAddCoupon.isLoading = false;
      state.formAddCoupon.errorMessage = '';
    },
    setResetAllStateAddProduct: (state) => {
      state.formAddCoupon = initialState.formAddCoupon;
    },
    setQuota: (state, { payload }) => {
      state.quota[payload.name] = payload.value;
    },
    setDataDownloadProduct: (state, { payload }) => {
      state.modalDownloadProduct.data = payload.value;
    },
  },
});

export const {
  setFlag,
  setModal,
  setQuota,
  setParams,
  setAddDrug,
  setRemoveDrug,
  setDrugParams,
  setAddListDrug,
  setResetDrug,
  clearDrugSearch,
  setProductCoupon,
  setFormAddCoupon,
  setAddedDrugInitial,
  setModalProductSetting,
  setDataDownloadProduct,
  setResetStateAddProduct,
  resetStateDiscountPackage,
  setResetAllStateAddProduct,
} = productCouponSlice.actions;

export default productCouponSlice.reducer;
