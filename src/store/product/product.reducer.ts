import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getListMappingProduct,
  getListProductCatalog,
  postCategoryProduct,
  postMapProduct,
} from '@/client/product';
import {
  getDetailDrugByChannelId,
  postDataDrug,
  putDataDrug,
} from '@/client/drug';

import type {
  IListMappingProductParams,
  IListProductCatalogParams,
} from '@/types/MasterProduct/product';
import { mapDetailProductDrug } from '@/src/mappers/MasterProduct/products';

const initialState: any = {
  mappingProducts: {
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
  products: {
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
  tabFormProduct: {
    information: false,
    photo: false,
    description: false,
    variants: false,
  },
  formProduct: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isModalSuccessOpen: false,
    isModalErrorOpen: false,
    successMessage: '',
    errorMessage: '',
    formInformation: {
      providerId: '',
      outletId: '',
      category: '',
      subcategory: '',
      type: '',
      name: '',
      produceBy: '',
      unit: '',
      noIzinEdar: '',
    },
    formDescription: {
      description: '',
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
    formVariants: [],
  },
  formModalAddVariant: {
    isOpen: false,
    isLoading: false,
    isError: false,
    isEdit: false,
    errorMessage: '',
    data: {
      sku: '',
      variant: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      minQty: '',
      stock: '',
      batchNumber: '',
      expiredDate: '',
      price: '',
    },
  },
  formAddProduct: {
    isOpen: false,
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  paramsMappingProducts: {
    page: 1,
    size: 10,
    keyword: '',
  },
  paramsProducts: {
    page: 1,
    limit: 10,
    keyword: '',
  },
};

export const resolveGetListMappingProduct = createAsyncThunk(
  'resolve/mappingProduct/list',
  async (payload: IListMappingProductParams, { rejectWithValue }) => {
    try {
      const response = await getListMappingProduct(payload);
      if (response.status === 200) return response?.data;
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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

export const resolveGetDetailProduct = createAsyncThunk(
  'resolve/product/detail',
  async (
    payload: {
      channelId: string | number;
      itemId: string | number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getDetailDrugByChannelId(
        payload.channelId,
        payload.itemId
      );
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveAddProduct = createAsyncThunk(
  'resolve/product/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postDataDrug(payload.channelId, payload.data);
      if (response.status === 201) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveAddProductDrug = createAsyncThunk(
  'resolve/product-drug/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postDataDrug(payload.channelId, payload.data);
      if (response.status === 201) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveUpdateProductDrug = createAsyncThunk(
  'resolve/product-drug/put',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await putDataDrug(
        payload.providerId,
        payload.itemId,
        payload.data
      );
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveAddMapProduct = createAsyncThunk(
  'resolve/map-product/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postMapProduct(payload);
      if (response.status === 201) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveAddCategoryProduct = createAsyncThunk(
  'resolve/category-product/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postCategoryProduct(payload);
      if (response.status === 201) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    // Get List Mapping Product
    builder.addCase(resolveGetListMappingProduct.pending, (state) => {
      state.mappingProducts.isLoading = true;
      state.mappingProducts.isError = false;
      state.mappingProducts.isSuccess = false;
      state.mappingProducts.errorMessage = '';
    });
    builder.addCase(
      resolveGetListMappingProduct.fulfilled,
      (state, { payload }) => {
        state.mappingProducts.isLoading = false;
        state.mappingProducts.isError = false;
        state.mappingProducts.isSuccess = true;
        state.mappingProducts.data = payload.data || [];
        state.mappingProducts.metadata = {
          page: payload.metadata?.page || 1,
          limit: payload.metadata?.limit || 10,
          totalData: payload.metadata?.totalData || 1,
          totalPage: payload.metadata?.totalPage || 1,
        };
      }
    );
    builder.addCase(resolveGetListMappingProduct.rejected, (state) => {
      state.mappingProducts.isLoading = false;
      state.mappingProducts.isError = true;
      state.mappingProducts.isSuccess = false;
      state.mappingProducts.errorMessage = 'Something wrong!';
    });

    // Get List Product Catalog
    builder.addCase(resolveGetListProductCatalog.pending, (state) => {
      state.products.isLoading = true;
      state.products.isError = false;
      state.products.isSuccess = false;
      state.products.errorMessage = '';
    });
    builder.addCase(
      resolveGetListProductCatalog.fulfilled,
      (state, { payload }) => {
        state.products.isLoading = false;
        state.products.isError = false;
        state.products.isSuccess = true;
        state.products.data = payload.data || [];
        state.products.metadata = {
          page: payload.metadata?.page || 1,
          limit: payload.metadata?.limit || 10,
          totalData: payload.metadata?.totalData || 1,
          totalPage: payload.metadata?.totalPage || 1,
        };
      }
    );
    builder.addCase(resolveGetListProductCatalog.rejected, (state) => {
      state.products.isLoading = false;
      state.products.isError = true;
      state.products.isSuccess = false;
      state.products.errorMessage = 'Something wrong!';
    });

    // Get Detail Drug by Channel Id
    builder.addCase(resolveGetDetailProduct.pending, (state) => {
      state.formProduct.isLoading = true;
      state.formProduct.isError = false;
      state.formProduct.isSuccess = false;
    });
    builder.addCase(
      resolveGetDetailProduct.fulfilled,
      (state: any, { payload }) => {
        state.formProduct.isLoading = false;
        state.formProduct.isError = false;

        const formatData = mapDetailProductDrug(payload?.data);
        state.formProduct.formInformation = formatData.formInformation;
        state.formProduct.formDescription = formatData.formDescription;
        state.formProduct.photo = formatData.photo;
        state.formProduct.formVariants = formatData.formVariants;
      }
    );
    builder.addCase(
      resolveGetDetailProduct.rejected,
      (state, { payload }: any) => {
        state.formProduct.isLoading = false;
        state.formProduct.isError = true;
        state.formProduct.isSuccess = false;
        state.formProduct.errorMessage =
          payload?.message || 'Gagal mendapatkan data produk!';
      }
    );

    // Post Data Product
    builder.addCase(resolveAddProduct.pending, (state) => {
      state.formAddProduct.isLoading = true;
      state.formAddProduct.isError = false;
      state.formAddProduct.isSuccess = false;
    });
    builder.addCase(resolveAddProduct.fulfilled, (state, { payload }) => {
      state.formAddProduct.isLoading = false;
      state.formAddProduct.isSuccess = true;
      state.formAddProduct.successMessage =
        payload?.message || 'Berhasil Menambahkan Produk!';
    });
    builder.addCase(resolveAddProduct.rejected, (state, { payload }: any) => {
      state.formAddProduct.isLoading = false;
      state.formAddProduct.isError = true;
      state.formAddProduct.errorMessage =
        payload?.message || 'Gagal Menambahkan Produk!';
    });

    // Post Data Product Drug
    builder.addCase(resolveAddProductDrug.pending, (state) => {
      state.formProduct.isLoading = true;
      state.formProduct.isError = false;
      state.formProduct.isSuccess = false;
    });
    builder.addCase(resolveAddProductDrug.fulfilled, (state, { payload }) => {
      state.formProduct.isLoading = false;
      state.formProduct.isSuccess = true;
      state.formProduct.successMessage =
        payload?.message || 'Berhasil Menambahkan Produk!';
    });
    builder.addCase(
      resolveAddProductDrug.rejected,
      (state, { payload }: any) => {
        state.formProduct.isLoading = false;
        state.formProduct.isError = true;
        state.formProduct.errorMessage =
          payload?.message || 'Gagal Menambahkan Produk!';
      }
    );

    // Put Data Product Drug
    builder.addCase(resolveUpdateProductDrug.pending, (state) => {
      state.formProduct.isLoading = true;
      state.formProduct.isError = false;
      state.formProduct.isSuccess = false;
    });
    builder.addCase(
      resolveUpdateProductDrug.fulfilled,
      (state, { payload }) => {
        state.formProduct.isLoading = false;
        state.formProduct.isSuccess = true;
        state.formProduct.successMessage =
          payload?.message || 'Berhasil Mengupdate Produk!';
      }
    );
    builder.addCase(
      resolveUpdateProductDrug.rejected,
      (state, { payload }: any) => {
        state.formProduct.isLoading = false;
        state.formProduct.isError = true;
        state.formProduct.errorMessage =
          payload?.message || 'Gagal Mengupdate Produk!';
      }
    );

    // Post Mapping Product
    builder.addCase(resolveAddMapProduct.pending, (state) => {
      state.formAddProduct.isLoading = true;
      state.formAddProduct.isError = false;
      state.formAddProduct.isSuccess = false;
    });
    builder.addCase(resolveAddMapProduct.fulfilled, (state, { payload }) => {
      state.formAddProduct.isLoading = false;
      state.formAddProduct.isSuccess = true;
      state.formAddProduct.successMessage =
        payload?.message || 'Berhasil Menyimpan Produk!';
    });
    builder.addCase(
      resolveAddMapProduct.rejected,
      (state, { payload }: any) => {
        state.formAddProduct.isLoading = false;
        state.formAddProduct.isError = true;
        state.formAddProduct.errorMessage =
          payload?.message || 'Gagal Menyimpan Produk!';
      }
    );

    // Post Category Product
    builder.addCase(resolveAddCategoryProduct.pending, (state) => {
      state.formAddProduct.isLoading = true;
      state.formAddProduct.isError = false;
      state.formAddProduct.isSuccess = false;
    });
    builder.addCase(
      resolveAddCategoryProduct.fulfilled,
      (state, { payload }) => {
        state.formAddProduct.isLoading = false;
        state.formAddProduct.isSuccess = true;
        state.formAddProduct.successMessage =
          payload?.message || 'Berhasil Menyimpan Produk!';
      }
    );
    builder.addCase(
      resolveAddCategoryProduct.rejected,
      (state, { payload }: any) => {
        state.formAddProduct.isLoading = false;
        state.formAddProduct.isError = true;
        state.formAddProduct.errorMessage =
          payload?.message || 'Gagal Menyimpan Produk!';
      }
    );
  },
  reducers: {
    clearState: () => initialState,
    clearStateProducts: (state) => {
      state.products = initialState.products;
    },
    setParamsMappingProducts: (state, { payload }) => {
      state.paramsMappingProducts[payload.name] = payload.value;
    },
    setParamsProducts: (state, { payload }) => {
      state.paramsProducts[payload.name] = payload.value;
    },
    setFormInformation: (state: any, { payload }) => {
      state.formProduct.formInformation[payload.label] = payload.value;
    },
    setFormDescription: (state: any, { payload }) => {
      state.formProduct.formDescription[payload.label] = payload.value;
    },
    setFormDrugPhoto: (state: any, { payload }) => {
      state.formProduct.photo[payload.label] = payload.value;
    },
    setFormVariants: (state: any, { payload }) => {
      state.formProduct.formVariants.push(payload);
    },
    setEditFormVariants: (state: any, { payload }) => {
      state.formProduct.formVariants[payload.index] = payload.data;
    },
    setRemoveVariant: (state: any, { payload }) => {
      state.formProduct.formVariants.splice(payload, 1);
    },
    setModalDrug: (state: any, { payload }) => {
      state[payload.state][payload.name] = payload.value;
    },
    setFormModalAddVariant: (state, { payload }) => {
      state.formModalAddVariant.data[payload.label] = payload.value;
    },
    resetFormModalVariant: (state) => {
      state.formModalAddVariant = initialState.formModalAddVariant;
    },
    resetParamsMappingProducts: (state) => {
      state.paramsMappingProducts = initialState.paramsMappingProducts;
    },
    resetParamsProducts: (state) => {
      state.paramsProducts = initialState.paramsProducts;
    },
    setTabFormProduct: (state, { payload }) => {
      state.tabFormProduct[payload.name] = payload.value;
    },
    setFormAddProduct: (state, { payload }) => {
      state.formAddProduct[payload.name] = payload.value;
    },
  },
});

export const {
  clearState,
  clearStateProducts,
  setParamsMappingProducts,
  setParamsProducts,
  setFormInformation,
  setFormDescription,
  setFormDrugPhoto,
  setFormVariants,
  setEditFormVariants,
  setFormModalAddVariant,
  setRemoveVariant,
  setModalDrug,
  setTabFormProduct,
  setFormAddProduct,
  resetFormModalVariant,
  resetParamsMappingProducts,
  resetParamsProducts,
} = productSlice.actions;

export default productSlice.reducer;
