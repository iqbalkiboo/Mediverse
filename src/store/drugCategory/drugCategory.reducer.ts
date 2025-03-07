import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteDataDrugCategory,
  getDetailDrugCategory,
  getListDrugCategory,
  postDataDrugCategory,
  putDataDrugCategory,
} from '@/src/client/drugCategory';

const initialState = {
  drugCategories: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 10,
    },
  },
  drugCategory: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  modalUpdateStatusDrugCategory: {
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  formModalDrugCategory: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      categoryName: '',
      categoryIcon: '',
    },
  },
  params: {
    page: 1,
    limit: 10,
    status: '',
    search: '',
    endDate: '',
    startDate: '',
  },
};

export const resolveListDrugCategory = createAsyncThunk(
  'resolve/drugCategory/list',
  async (
    payload: {
      page: number;
      limit: number;
      search: string;
      status?: boolean;
      endDate?: number;
      startDate?: number;
    },
    { rejectWithValue }
  ) => {
    const params = {
      page: payload.page,
      limit: payload.limit,
      search: payload.search,
      status: payload.status,
      endDate: payload.endDate,
      startDate: payload.startDate,
    };
    const response = await getListDrugCategory(params);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolveDetailDrugCategory = createAsyncThunk(
  'resolve/drugCategory/detail',
  async (payload: { id: string | number }, { rejectWithValue }) => {
    const response = await getDetailDrugCategory(payload.id);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolvePostDrugCategory = createAsyncThunk(
  'resolve/drugCategory/post',
  async (
    payload: {
      name: string;
      icon: string;
    },
    { rejectWithValue }
  ) => {
    const response = await postDataDrugCategory(payload);
    if (!response.error) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolvePutDrugCategory = createAsyncThunk(
  'resolve/drugCategory/put',
  async (
    payload: {
      id: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await putDataDrugCategory(payload.id, payload.data);
    if (!response.error) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolvePatchDrugCategory = createAsyncThunk(
  'resolve/drugCategory/patch',
  async (
    payload: {
      id: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await putDataDrugCategory(payload.id, payload.data);
    if (!response.error) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolveDeleteDrugCategory = createAsyncThunk(
  'resolve/drugCategory/delete',
  async (
    payload: {
      id: any;
    },
    { rejectWithValue }
  ) => {
    const response = await deleteDataDrugCategory(payload.id);
    if (!response.error) {
      return {
        data: response.data,
      };
    }
    return rejectWithValue(response.data.message);
  }
);

const drugCategorySlice = createSlice({
  name: 'drugCategory',
  initialState,
  extraReducers: (builder) => {
    // Get List Drug Category
    builder.addCase(resolveListDrugCategory.pending, (state) => {
      state.drugCategories.isLoading = true;
      state.drugCategories.isError = false;
    });
    builder.addCase(resolveListDrugCategory.fulfilled, (state, { payload }) => {
      state.drugCategories.isLoading = false;
      state.drugCategories.isError = false;
      state.drugCategories.data = payload.data || [];

      // Metadata List Drug Category
      state.drugCategories.metadata.page = payload?.metadata?.page || 1;
      state.drugCategories.metadata.size = payload?.metadata?.size || 10;
      state.drugCategories.metadata.totalPage =
        payload?.metadata?.totalPage || 1;
      state.drugCategories.metadata.totalData =
        payload?.metadata?.totalData || 10;
    });
    builder.addCase(resolveListDrugCategory.rejected, (state, { payload }) => {
      state.drugCategories.isLoading = false;
      state.drugCategories.isError = true;
      state.drugCategories.errorMessage =
        String(payload) || 'Something Wrong !';
    });

    // Get Detail Drug Category
    builder.addCase(resolveDetailDrugCategory.pending, (state) => {
      state.drugCategory.isLoading = true;
      state.drugCategory.isError = false;
    });
    builder.addCase(
      resolveDetailDrugCategory.fulfilled,
      (state, { payload }) => {
        state.drugCategory.isLoading = false;
        state.drugCategory.data = payload;
        state.formModalDrugCategory.form = {
          categoryName: payload?.name || '',
          categoryIcon: payload?.icon || '',
        };
      }
    );
    builder.addCase(
      resolveDetailDrugCategory.rejected,
      (state, { payload }) => {
        state.drugCategory.isError = true;
        state.drugCategory.isLoading = false;
        state.drugCategory.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );

    // Post Drug Category
    builder.addCase(resolvePostDrugCategory.pending, (state) => {
      state.formModalDrugCategory.isLoading = true;
      state.formModalDrugCategory.isError = false;
    });
    builder.addCase(resolvePostDrugCategory.fulfilled, (state) => {
      state.formModalDrugCategory.isLoading = false;
      state.formModalDrugCategory.isSuccess = true;
      state.formModalDrugCategory.successMessage =
        'Berhasil menambahkan kategori obat';
    });
    builder.addCase(resolvePostDrugCategory.rejected, (state, { payload }) => {
      state.formModalDrugCategory.isLoading = false;
      state.formModalDrugCategory.isError = true;
      state.formModalDrugCategory.errorMessage =
        String(payload) || 'Something Wrong !';
    });

    // Put Drug Category
    builder.addCase(resolvePutDrugCategory.pending, (state) => {
      state.formModalDrugCategory.isLoading = true;
      state.formModalDrugCategory.isError = false;
    });
    builder.addCase(resolvePutDrugCategory.fulfilled, (state) => {
      state.formModalDrugCategory.isLoading = false;
      state.formModalDrugCategory.isSuccess = true;
      state.formModalDrugCategory.successMessage =
        'Berhasil mengupdate kategori obat';
    });
    builder.addCase(resolvePutDrugCategory.rejected, (state, { payload }) => {
      state.formModalDrugCategory.isLoading = false;
      state.formModalDrugCategory.isError = true;
      state.formModalDrugCategory.errorMessage =
        String(payload) || 'Something Wrong !';
    });

    // Patch Update Status Drug Category
    builder.addCase(resolvePatchDrugCategory.pending, (state) => {
      state.modalUpdateStatusDrugCategory.isError = false;
      state.modalUpdateStatusDrugCategory.isLoading = true;
      state.modalUpdateStatusDrugCategory.isSuccess = false;
    });
    builder.addCase(resolvePatchDrugCategory.fulfilled, (state) => {
      state.modalUpdateStatusDrugCategory.isLoading = false;
      state.modalUpdateStatusDrugCategory.isError = false;
      state.modalUpdateStatusDrugCategory.isSuccess = true;
      state.modalUpdateStatusDrugCategory.successMessage =
        'Berhasil mengupdate status kategori obat !';
    });
    builder.addCase(resolvePatchDrugCategory.rejected, (state, { payload }) => {
      state.modalUpdateStatusDrugCategory.isError = true;
      state.modalUpdateStatusDrugCategory.isLoading = false;
      state.modalUpdateStatusDrugCategory.isSuccess = false;
      state.modalUpdateStatusDrugCategory.errorMessage =
        String(payload) || 'Something Wrong !';
    });

    // Delete Data Drug Category
    builder.addCase(resolveDeleteDrugCategory.pending, (state) => {
      state.modalUpdateStatusDrugCategory.isLoading = true;
      state.modalUpdateStatusDrugCategory.isError = false;
    });
    builder.addCase(
      resolveDeleteDrugCategory.fulfilled,
      (state, { payload }: any) => {
        if (payload.data.message) {
          state.modalUpdateStatusDrugCategory.isLoading = false;
          state.modalUpdateStatusDrugCategory.isError = false;
          state.modalUpdateStatusDrugCategory.isSuccess = true;
          state.modalUpdateStatusDrugCategory.successMessage =
            'Berhasil menghapus kategori obat';
        } else {
          state.modalUpdateStatusDrugCategory.isLoading = false;
          state.modalUpdateStatusDrugCategory.isError = true;
          state.modalUpdateStatusDrugCategory.errorMessage = String(
            payload.error.message
          );
          state.modalUpdateStatusDrugCategory.isError = true;
        }
      }
    );
    builder.addCase(
      resolveDeleteDrugCategory.rejected,
      (state, { payload }) => {
        state.modalUpdateStatusDrugCategory.isLoading = false;
        state.modalUpdateStatusDrugCategory.isError = true;
        state.modalUpdateStatusDrugCategory.isError = true;
        state.modalUpdateStatusDrugCategory.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );
  },
  reducers: {
    setForm: (state, { payload }) => {
      state.formModalDrugCategory.form[payload.name] = payload.value;
    },
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.name] = payload.value;
    },
    setFlagModalUpdateStatusDrugCategory: (state, { payload }) => {
      state.modalUpdateStatusDrugCategory.flag = payload;
    },
    setClearForm: (state) => {
      state.formModalDrugCategory = initialState.formModalDrugCategory;
    },
    setClearInitialState: () => initialState,
  },
});

export const {
  setForm,
  setModal,
  setParams,
  setClearForm,
  setClearInitialState,
  setFlagModalUpdateStatusDrugCategory,
} = drugCategorySlice.actions;

export default drugCategorySlice.reducer;
