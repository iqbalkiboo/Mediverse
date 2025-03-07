import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteProductCatalog,
  getDetailProductCatalog,
  getListProductCatalog,
  postProductCatalog,
  putProductCatalog,
} from '@/client/product';
import { mapDetailProductCatalog } from '@/src/mappers/MasterProduct/products';

import type { IListProductCatalogParams } from '@/types/MasterProduct/product';

const initialState: any = {
  productCatalogs: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    metadata: {
      page: 0,
      limit: 0,
      totalData: 0,
      totalPage: 0,
    },
  },
  modalDeleteProductCatalog: {
    sku: 0,
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  tabFormProductCatalog: {
    information: false,
    photo: false,
    description: false,
  },
  formProductCatalog: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    successMessage: '',
    errorMessage: '',
    id: '',
    formInformation: {
      sku: '',
      name: '',
      produceBy: '',
      category: '',
      subcategory: '',
      noIzinEdar: '',
      unit: '',
      type: '',
    },
    formDescription: {
      description: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      dosage: '',
      sideEffect: '',
      indication: '',
      howToUse: '',
      contraIndication: '',
      storage: '',
      specialAttention: '',
    },
    photo: {
      photo1: '',
      photo2: '',
      photo3: '',
      photo4: '',
      photo5: '',
    },
  },
  paramsProductCatalogs: {
    page: 1,
    limit: 10,
    keyword: '',
  },
};

export const resolveGetListProductCatalog = createAsyncThunk(
  'resolve/productCatalog/list',
  async (payload: IListProductCatalogParams, { rejectWithValue }) => {
    try {
      const response = await getListProductCatalog(payload);
      if (response.status === 200) return response?.data;
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetDetailProductCatalog = createAsyncThunk(
  'resolve/productCatalog/detail',
  async (payload: { sku: string }, { rejectWithValue }) => {
    try {
      const response = await getDetailProductCatalog(payload);
      if (response.status === 200) return response?.data;
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostProductCatalog = createAsyncThunk(
  'resolve/productCatalog/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postProductCatalog(payload);
      if (response.status === 201) return response?.data;
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePutProductCatalog = createAsyncThunk(
  'resolve/productCatalog/put',
  async (
    payload: {
      sku: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const { sku, data } = payload;
      const response = await putProductCatalog(sku, data);
      if (response.status === 200) return response?.data;
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDeleteProductCatalog = createAsyncThunk(
  'resolve/productCatalog/delete',
  async (payload: { sku: any }, { rejectWithValue }) => {
    const response = await deleteProductCatalog(payload.sku);
    if (!response.error) return response.data;
    return rejectWithValue(response.data.message);
  }
);

const productCatalogSlice = createSlice({
  name: 'product-catalog',
  initialState,
  extraReducers: (builder) => {
    // Get List Product Catalog
    builder.addCase(resolveGetListProductCatalog.pending, (state) => {
      state.productCatalogs.isLoading = true;
      state.productCatalogs.isError = false;
      state.productCatalogs.isSuccess = false;
      state.productCatalogs.errorMessage = '';
    });
    builder.addCase(
      resolveGetListProductCatalog.fulfilled,
      (state, { payload }) => {
        state.productCatalogs.isLoading = false;
        state.productCatalogs.isError = false;
        state.productCatalogs.isSuccess = true;
        state.productCatalogs.data = payload.data || [];
        state.productCatalogs.metadata = {
          page: payload.metadata?.page || 1,
          limit: payload.metadata?.limit || 10,
          totalData: payload.metadata?.totalData || 1,
          totalPage: payload.metadata?.totalPage || 1,
        };
      }
    );
    builder.addCase(resolveGetListProductCatalog.rejected, (state) => {
      state.productCatalogs.isLoading = false;
      state.productCatalogs.isError = true;
      state.productCatalogs.isSuccess = false;
      state.productCatalogs.errorMessage = 'Something wrong!';
    });

    // Get Detail Doctor from OR
    builder.addCase(resolveGetDetailProductCatalog.pending, (state) => {
      state.formProductCatalog.isLoading = true;
      state.formProductCatalog.isSuccess = false;
      state.formProductCatalog.isError = false;
    });
    builder.addCase(
      resolveGetDetailProductCatalog.fulfilled,
      (state, { payload }) => {
        state.formProductCatalog.isLoading = false;
        state.formProductCatalog.isError = false;

        const detailData = mapDetailProductCatalog(payload?.data);
        state.formProductCatalog.id = payload?.data?.sku;
        state.formProductCatalog.formInformation = detailData.formInformation;
        state.formProductCatalog.formDescription = detailData.formDescription;
        state.formProductCatalog.photo = detailData.photo;
      }
    );
    builder.addCase(
      resolveGetDetailProductCatalog.rejected,
      (state, { payload }: any) => {
        state.formProductCatalog.isLoading = false;
        state.formProductCatalog.isSuccess = false;
        state.formProductCatalog.isError = true;
        state.formProductCatalog.errorMessage =
          payload?.message || 'Gagal Mendapatkan Katalog Produk!';
      }
    );

    // Post Data Product Catalog
    builder.addCase(resolvePostProductCatalog.pending, (state) => {
      state.formProductCatalog.isLoading = true;
      state.formProductCatalog.isSuccess = false;
      state.formProductCatalog.isError = false;
    });
    builder.addCase(
      resolvePostProductCatalog.fulfilled,
      (state, { payload }) => {
        state.formProductCatalog.isLoading = false;
        state.formProductCatalog.isSuccess = true;
        state.formProductCatalog.isError = false;
        state.formProductCatalog.successMessage =
          payload?.message || 'Berhasil menambahkan produk katalog!';
      }
    );
    builder.addCase(
      resolvePostProductCatalog.rejected,
      (state, { payload }: any) => {
        state.formProductCatalog.isLoading = false;
        state.formProductCatalog.isSuccess = false;
        state.formProductCatalog.isError = true;
        state.formProductCatalog.errorMessage =
          payload?.message || 'Gagal menambahkan produk katalog!';
      }
    );

    // Put Data Product Catalog
    builder.addCase(resolvePutProductCatalog.pending, (state) => {
      state.formProductCatalog.isLoading = true;
      state.formProductCatalog.isSuccess = false;
      state.formProductCatalog.isError = false;
    });
    builder.addCase(
      resolvePutProductCatalog.fulfilled,
      (state, { payload }) => {
        state.formProductCatalog.isLoading = false;
        state.formProductCatalog.isSuccess = true;
        state.formProductCatalog.isError = false;
        state.formProductCatalog.successMessage =
          payload?.message || 'Berhasil mengupdate produk katalog!';
      }
    );
    builder.addCase(
      resolvePutProductCatalog.rejected,
      (state, { payload }: any) => {
        state.formProductCatalog.isLoading = false;
        state.formProductCatalog.isSuccess = false;
        state.formProductCatalog.isError = true;
        state.formProductCatalog.errorMessage =
          payload?.message || 'Gagal mengupdate produk katalog!';
      }
    );

    // Delete Data Product Catalog
    builder.addCase(resolveDeleteProductCatalog.pending, (state) => {
      state.modalDeleteProductCatalog.isLoading = true;
      state.modalDeleteProductCatalog.isError = false;
    });
    builder.addCase(resolveDeleteProductCatalog.fulfilled, (state) => {
      state.modalDeleteProductCatalog.isLoading = false;
      state.modalDeleteProductCatalog.isError = false;
      state.modalDeleteProductCatalog.isSuccess = true;
      state.modalDeleteProductCatalog.successMessage =
        'Berhasil menghapus produk katalog';
    });
    builder.addCase(
      resolveDeleteProductCatalog.rejected,
      (state, { payload }) => {
        state.modalDeleteProductCatalog.isLoading = false;
        state.modalDeleteProductCatalog.isError = true;
        state.modalDeleteProductCatalog.errorMessage =
          String(payload) || 'Gagal menghapus produk katalog';
      }
    );
  },
  reducers: {
    clearState: () => initialState,
    clearStateProductCatalogs: (state) => {
      state.productCatalogs = initialState.productCatalogs;
    },
    setParamsProductCatalogs: (state, { payload }) => {
      state.paramsProductCatalogs[payload.name] = payload.value;
    },
    resetParamsProductCatalogs: (state) => {
      state.paramsProductCatalogs = initialState.paramsProductCatalogs;
    },
    setFormProductCatalog: (state: any, { payload }) => {
      state.formProductCatalog[payload.label] = payload.value;
    },
    setFormInformation: (state: any, { payload }) => {
      state.formProductCatalog.formInformation[payload.label] = payload.value;
    },
    setFormDescription: (state: any, { payload }) => {
      state.formProductCatalog.formDescription[payload.label] = payload.value;
    },
    setFormDrugPhoto: (state: any, { payload }) => {
      state.formProductCatalog.photo[payload.label] = payload.value;
    },
    setTabFormProductCatalog: (state, { payload }) => {
      state.tabFormProductCatalog[payload.label] = payload.value;
    },
    setModalDeleteProductCatalog: (state, { payload }) => {
      state.modalDeleteProductCatalog[payload.label] = payload.value;
    },
  },
});

export const {
  clearState,
  clearStateProductCatalogs,
  setParamsProductCatalogs,
  resetParamsProductCatalogs,
  setFormProductCatalog,
  setFormInformation,
  setFormDescription,
  setFormDrugPhoto,
  setTabFormProductCatalog,
  setModalDeleteProductCatalog,
} = productCatalogSlice.actions;

export default productCatalogSlice.reducer;
