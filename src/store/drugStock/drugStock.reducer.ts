import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getDetailProvider,
  getDetailVariant,
  getListDrugByOutletId,
  getListDrugCategory,
  getStockDrugByOutletId,
  putStockDrugByOutletId,
  updateVariant,
} from '@/src/client/drug';

const initialState = {
  drugStocks: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    showModalUpdateVariants: false,
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 0,
    },
  },
  drugCategories: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  drugStock: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    id: '',
    itemId: '',
    data: {},
  },
  provider: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  ModalUpdateVariants: {
    stock: 0,
    updateStock: 0,
    totalStock: 0,
    price: 0,
    sellingFactor: 0,
    priceInMediverse: 0,
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: true,
    category: '',
  },
};

export const resolveGetDetailProvider = createAsyncThunk(
  'resolve/provider/detail/stock',
  async (payload: any, { rejectWithValue }) => {
    try {
      return await getDetailProvider(payload.id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetListDrugByOutletId = createAsyncThunk(
  'resolve/drugByOutletId/list',
  async (
    payload: {
      channelId: number;
      outletId: number;
      params: {
        with_item: boolean;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListDrugByOutletId(
        payload.channelId,
        payload.outletId,
        payload.params
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListDrugCategory = createAsyncThunk(
  'resolve/drugCategory/list',
  async (any, { rejectWithValue }) => {
    try {
      const response = await getListDrugCategory();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetDetailVariant = createAsyncThunk(
  'resolve/variant/detail',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await getDetailVariant(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetStockDrugByOutletId = createAsyncThunk(
  'resolve/stock/detail',
  async (
    payload: {
      channelId: number;
      outletId: number;
      itemId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getStockDrugByOutletId(
        payload.channelId,
        payload.outletId,
        payload.itemId
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePutStockDrugByOutletId = createAsyncThunk(
  'resolve/stock/put',
  async (
    payload: {
      channelId: number;
      outletId: number;
      itemId: number;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await putStockDrugByOutletId(
        payload.channelId,
        payload.outletId,
        payload.itemId,
        payload.data
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveUpdateVariant = createAsyncThunk(
  'resolve/variant/put',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateVariant({
        providerId: payload.providerId,
        itemId: payload.itemId,
        variantId: payload.variantId,
        data: payload.data,
      });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const drugStock = createSlice({
  name: 'drugStock',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveGetListDrugByOutletId.pending, (state) => {
      state.drugStocks.isLoading = true;
      state.drugStocks.isError = false;
    });
    builder.addCase(
      resolveGetListDrugByOutletId.fulfilled,
      (state, { payload }) => {
        state.drugStocks.isLoading = false;
        state.drugStocks.isError = false;
        state.drugStocks.data = payload.data || [];

        // metadata list drugstocks
        state.drugStocks.metadata.page = payload?.metadata?.page || 1;
        state.drugStocks.metadata.size = payload?.metadata?.size || 10;
        state.drugStocks.metadata.totalPage =
          Math.ceil(payload?.metadata?.totalData / state.params.limit) || 1;
        state.drugStocks.metadata.totalData =
          payload?.metadata?.totalData || 10;
      }
    );
    builder.addCase(
      resolveGetListDrugByOutletId.rejected,
      (state, { payload }: any) => {
        state.drugStocks.isLoading = false;
        state.drugStocks.isError = true;
        state.drugStocks.errorMessage =
          payload?.message || 'Gagal mendapatkan data stock obat!';
      }
    );
    // get drug category
    builder.addCase(resolveListDrugCategory.pending, (state) => {
      state.drugCategories.isLoading = true;
      state.drugCategories.isError = false;
    });
    builder.addCase(resolveListDrugCategory.fulfilled, (state, { payload }) => {
      state.drugCategories.isLoading = false;
      state.drugCategories.isError = false;
      state.drugCategories.data = payload.data || [];
    });
    builder.addCase(
      resolveListDrugCategory.rejected,
      (state, { payload }: any) => {
        state.drugCategories.isLoading = false;
        state.drugCategories.isError = true;
        state.drugCategories.errorMessage =
          payload?.message || 'Gagal mendapatkan data kategori obat';
      }
    );
    // get detail provider
    builder.addCase(resolveGetDetailProvider.pending, (state) => {
      state.provider.isLoading = true;
      state.provider.isError = false;
    });
    builder.addCase(
      resolveGetDetailProvider.fulfilled,
      (state, { payload }) => {
        state.provider.isLoading = false;
        state.provider.isError = false;
        state.provider.data = payload.data || [];
      }
    );
    builder.addCase(
      resolveGetDetailProvider.rejected,
      (state, { payload }: any) => {
        state.provider.isLoading = false;
        state.provider.isError = true;
        state.provider.errorMessage =
          payload?.message || 'Gagal mendapatkan data kategori obat';
      }
    );
    // get detail variant
    builder.addCase(resolveGetDetailVariant.pending, (state) => {
      state.drugStock.isLoading = true;
      state.drugStock.isError = false;
    });
    builder.addCase(resolveGetDetailVariant.fulfilled, (state, { payload }) => {
      state.drugStock.isLoading = false;
      state.drugStock.isError = false;
      state.drugStock.data = payload.data;
      state.ModalUpdateVariants.sellingFactor =
        payload.data?.sellingFactorPercentage || 0;
      state.ModalUpdateVariants.priceInMediverse =
        payload.data?.customerPrice || 0;
      state.ModalUpdateVariants.price = payload?.data?.price || 0;
    });
    builder.addCase(
      resolveGetDetailVariant.rejected,
      (state, { payload }: any) => {
        state.drugStock.isLoading = false;
        state.drugStock.isError = true;
        state.drugStock.errorMessage =
          payload?.message || 'Gagal mendapatkan data varian!';
      }
    );
    // get stock drug
    builder.addCase(resolveGetStockDrugByOutletId.pending, (state) => {
      state.drugStock.isLoading = true;
      state.drugStock.isError = false;
    });
    builder.addCase(
      resolveGetStockDrugByOutletId.fulfilled,
      (state, { payload }) => {
        state.drugStock.isLoading = false;
        state.drugStock.isError = false;
        state.ModalUpdateVariants.stock = payload?.stock || 0;
      }
    );
    builder.addCase(
      resolveGetStockDrugByOutletId.rejected,
      (state, { payload }: any) => {
        state.drugStock.isLoading = false;
        state.drugStock.isError = true;
        state.drugStock.errorMessage =
          payload?.message || 'Gagal mendapatkan data stock obat!';
      }
    );
    // put stock drug
    builder.addCase(resolvePutStockDrugByOutletId.pending, (state) => {
      state.ModalUpdateVariants.isLoading = true;
      state.ModalUpdateVariants.isError = false;
    });
    builder.addCase(resolvePutStockDrugByOutletId.fulfilled, (state) => {
      state.ModalUpdateVariants.isLoading = false;
      state.ModalUpdateVariants.isError = false;
      state.ModalUpdateVariants.isSuccess = true;
    });
    builder.addCase(
      resolvePutStockDrugByOutletId.rejected,
      (state, { payload }: any) => {
        state.ModalUpdateVariants.isLoading = false;
        state.ModalUpdateVariants.isError = true;
        state.ModalUpdateVariants.isSuccess = false;
        state.ModalUpdateVariants.errorMessage =
          payload?.message || 'Gagal update data stock obat!';
      }
    );
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    resetStatedrugStock: () => initialState,
    setModalUpdateVariants: (state, { payload }) => {
      state.drugStocks.showModalUpdateVariants = payload;
    },
    setFormModalUpdateVariants: (state, { payload }) => {
      state.ModalUpdateVariants[payload.field] = payload.value;
    },
    setTotalStock: (state, { payload }) => {
      state.ModalUpdateVariants.totalStock = payload;
    },
    setDrugStock: (state, { payload }) => {
      state.drugStock[payload.name] = payload.value;
    },
    setModalUpdateVariant: (state, { payload }) => {
      state.ModalUpdateVariants[payload.name] = payload.value;
    },
    clearModalUpdate: (state) => {
      state.ModalUpdateVariants = initialState.ModalUpdateVariants;
    },
  },
});

export const {
  setParams,
  setDrugStock,
  setTotalStock,
  clearModalUpdate,
  resetStatedrugStock,
  setModalUpdateVariant,
  setModalUpdateVariants,
  setFormModalUpdateVariants,
} = drugStock.actions;

export default drugStock.reducer;
