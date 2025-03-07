import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteDataDrugSubcategory,
  getDetailDrugSubcategory,
  getListDrugSubcategory,
  postDataDrugSubcategory,
  putDataDrugSubcategory,
} from '@/src/client/drugCategory';

const initialState = {
  drugSubcategories: {
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
  drugSubcategory: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  formModalDrugSubcategory: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    modalType: '',
    form: {
      subcategoryId: '',
      subcategoryName: '',
      subcategoryIcon: '',
    },
  },
  modalDeleteDrugSubcategory: {
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
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

export const resolveListDrugSubcategory = createAsyncThunk(
  'resolve/drugSubcategory/list',
  async (
    payload: {
      id: number | string;
      page?: number;
      limit?: number;
      search?: string;
    },
    { rejectWithValue }
  ) => {
    const params = {
      page: payload.page,
      limit: payload.limit,
      search: payload.search,
    };
    const response = await getListDrugSubcategory(payload.id, params);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolveDetailDrugSubcategory = createAsyncThunk(
  'resolve/drugSubcategory/detail',
  async (payload: { id: string | number }, { rejectWithValue }) => {
    const response = await getDetailDrugSubcategory(payload.id);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolvePostDrugSubcategory = createAsyncThunk(
  'resolve/drugSubcategory/post',
  async (
    payload: {
      category_id: number | string;
      name: string;
      icon: string;
    },
    { rejectWithValue }
  ) => {
    const response = await postDataDrugSubcategory(payload);
    if (!response.error) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolvePutDrugSubcategory = createAsyncThunk(
  'resolve/drugSubcategory/put',
  async (
    payload: {
      id: string | number;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await putDataDrugSubcategory(payload.id, payload.data);
    if (!response.error) {
      return response.data;
    }
    return rejectWithValue(response.data.message);
  }
);

export const resolveDeleteDrugSubcategory = createAsyncThunk(
  'resolve/drugSubcategory/delete',
  async (
    payload: {
      id: string | number;
    },
    { rejectWithValue }
  ) => {
    const response = await deleteDataDrugSubcategory(payload.id);
    if (!response.error) {
      return {
        data: response.data,
      };
    }
    return rejectWithValue(response.data.message);
  }
);

const drugSubcategorySlice = createSlice({
  name: 'drugSubcategory',
  initialState,
  extraReducers: (builder) => {
    // Get List Drug Subcategory
    builder.addCase(resolveListDrugSubcategory.pending, (state) => {
      state.drugSubcategories.isLoading = true;
      state.drugSubcategories.isError = false;
    });
    builder.addCase(
      resolveListDrugSubcategory.fulfilled,
      (state, { payload }) => {
        state.drugSubcategories.isLoading = false;
        state.drugSubcategories.isError = false;
        state.drugSubcategories.data = payload.data || [];

        // Metadata List Drug Subcategory
        state.drugSubcategories.metadata.page = payload?.metadata?.page || 1;
        state.drugSubcategories.metadata.size = payload?.metadata?.size || 10;
        state.drugSubcategories.metadata.totalPage =
          payload?.metadata?.totalPage || 1;
        state.drugSubcategories.metadata.totalData =
          payload?.metadata?.totalData || 10;
      }
    );
    builder.addCase(
      resolveListDrugSubcategory.rejected,
      (state, { payload }) => {
        state.drugSubcategories.isLoading = false;
        state.drugSubcategories.isError = true;
        state.drugSubcategories.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );

    // Get Detail Drug Subcategory
    builder.addCase(resolveDetailDrugSubcategory.pending, (state) => {
      state.drugSubcategory.isLoading = true;
      state.drugSubcategory.isError = false;
    });
    builder.addCase(
      resolveDetailDrugSubcategory.fulfilled,
      (state, { payload }) => {
        state.drugSubcategory.isLoading = false;
        state.drugSubcategory.data = payload;
        state.formModalDrugSubcategory.form = {
          subcategoryId: payload?.id || '',
          subcategoryName: payload?.name || '',
          subcategoryIcon: payload?.icon || '',
        };
      }
    );
    builder.addCase(
      resolveDetailDrugSubcategory.rejected,
      (state, { payload }) => {
        state.drugSubcategory.isError = true;
        state.drugSubcategory.isLoading = false;
        state.drugSubcategory.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );

    // Post Data Drug Subcategory
    builder.addCase(resolvePostDrugSubcategory.pending, (state) => {
      state.formModalDrugSubcategory.isLoading = true;
      state.formModalDrugSubcategory.isError = false;
    });
    builder.addCase(resolvePostDrugSubcategory.fulfilled, (state) => {
      state.formModalDrugSubcategory.isLoading = false;
      state.formModalDrugSubcategory.isSuccess = true;
      state.formModalDrugSubcategory.successMessage =
        'Berhasil menambahkan subkategori obat';
    });
    builder.addCase(
      resolvePostDrugSubcategory.rejected,
      (state, { payload }) => {
        state.formModalDrugSubcategory.isLoading = false;
        state.formModalDrugSubcategory.isError = true;
        state.formModalDrugSubcategory.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );

    // Put Data Drug Subcategory
    builder.addCase(resolvePutDrugSubcategory.pending, (state) => {
      state.formModalDrugSubcategory.isLoading = true;
      state.formModalDrugSubcategory.isError = false;
    });
    builder.addCase(resolvePutDrugSubcategory.fulfilled, (state) => {
      state.formModalDrugSubcategory.isLoading = false;
      state.formModalDrugSubcategory.isSuccess = true;
      state.formModalDrugSubcategory.successMessage =
        'Berhasil mengupdate subkategori obat';
    });
    builder.addCase(
      resolvePutDrugSubcategory.rejected,
      (state, { payload }) => {
        state.formModalDrugSubcategory.isLoading = false;
        state.formModalDrugSubcategory.isError = true;
        state.formModalDrugSubcategory.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );

    // Delete Data Drug Subcategory
    builder.addCase(resolveDeleteDrugSubcategory.pending, (state) => {
      state.modalDeleteDrugSubcategory.isLoading = true;
      state.modalDeleteDrugSubcategory.isError = false;
    });
    builder.addCase(
      resolveDeleteDrugSubcategory.fulfilled,
      (state, { payload }: any) => {
        if (payload.data.message) {
          state.modalDeleteDrugSubcategory.isLoading = false;
          state.modalDeleteDrugSubcategory.isError = false;
          state.modalDeleteDrugSubcategory.isSuccess = true;
          state.modalDeleteDrugSubcategory.successMessage =
            'Berhasil menghapus subkategori obat';
        } else {
          state.modalDeleteDrugSubcategory.isLoading = false;
          state.modalDeleteDrugSubcategory.isError = true;
          state.modalDeleteDrugSubcategory.errorMessage = String(
            payload.error.message
          );
          state.modalDeleteDrugSubcategory.isError = true;
        }
      }
    );
    builder.addCase(
      resolveDeleteDrugSubcategory.rejected,
      (state, { payload }) => {
        state.modalDeleteDrugSubcategory.isLoading = false;
        state.modalDeleteDrugSubcategory.isError = true;
        state.modalDeleteDrugSubcategory.isError = true;
        state.modalDeleteDrugSubcategory.errorMessage =
          String(payload) || 'Something Wrong !';
      }
    );
  },
  reducers: {
    setForm: (state, { payload }) => {
      state.formModalDrugSubcategory.form[payload.name] = payload.value;
    },
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.name] = payload.value;
    },
    setClearForm: (state) => {
      state.formModalDrugSubcategory = initialState.formModalDrugSubcategory;
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
} = drugSubcategorySlice.actions;

export default drugSubcategorySlice.reducer;
