import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  deleteDataVendor,
  getDetailVendor,
  getListVendor,
  postDataVendor,
  putDataVendor,
} from '@/src/client/vendor';

const initialState = {
  vendors: {
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
  vendor: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  modalUpdateStatusVendor: {
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  formModalVendor: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      code: '',
      name: '',
      type: '',
      status: null,
      startContract: '',
      endContract: '',
    },
  },
  params: {
    page: 1,
    limit: 10,
    type: '',
    search: '',
    status: '',
    endDate: '',
    startDate: '',
  },
};

export const resolveListVendor = createAsyncThunk(
    'resolve/vendor/list',
    async (payload: {
    page: string | number
    limit: string | number,
    type: string,
    search: string,
    status: string,
    startDate: string,
    endDate: string
  }, {rejectWithValue}) => {
      try {
        const response = await getListVendor(payload);
        if (response.status === 200) {
          return response?.data;
        }

        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailVendor = createAsyncThunk(
    'resolve/vendor/detail',
    async (payload: {
    id: string | number,
  }, {rejectWithValue}) => {
      try {
        const response = await getDetailVendor(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostDataVendor = createAsyncThunk(
    'resolve/vendor/post',
    async (payload: {data: any}, {rejectWithValue}) => {
      try {
        const response = await postDataVendor(payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePutDataVendor = createAsyncThunk(
    'resolve/vendor/put',
    async (payload: {
    id: string,
    data: any,
  }, {rejectWithValue}) => {
      try {
        const response = await putDataVendor(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePatchVendor = createAsyncThunk(
    'resolve/vendor/patch',
    async (payload: {
    id: any,
    data: any,
  }, {rejectWithValue}) => {
      const response = await putDataVendor(payload.id, payload.data);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveDeleteVendor = createAsyncThunk(
    'resolve/vendor/delete',
    async (payload: {
    id: any
  }, {rejectWithValue}) => {
      const response = await deleteDataVendor(payload.id);
      if (!response.error) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response.data);
    },
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  extraReducers: (builder) => {
    // Get List Vendor
    builder.addCase(resolveListVendor.pending, (state) => {
      state.vendors.isLoading = true;
      state.vendors.isError = false;
    });
    builder.addCase(resolveListVendor.fulfilled, (state, {payload}) => {
      state.vendors.isLoading = false;
      state.vendors.isError = false;
      state.vendors.data = payload?.data || [];

      // Metadata List Vendor
      state.vendors.metadata.page = payload?.metadata?.page || 1;
      state.vendors.metadata.size = payload?.metadata?.per_page || 10;
      state.vendors.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.vendors.metadata.totalData = payload?.metadata?.total_row || 10;
    });
    builder.addCase(resolveListVendor.rejected, (state, action) => {
      state.vendors.isLoading = false;
      state.vendors.isError = true;
      state.vendors.errorMessage = 'Something wrong!';
    });

    // Get Detail Vendor
    builder.addCase(resolveDetailVendor.pending, (state) => {
      state.vendor.isLoading = true;
      state.vendor.isError = false;
    });
    builder.addCase(resolveDetailVendor.fulfilled, (state, {payload}) => {
      state.vendor.isLoading = false;
      state.vendor.isError = false;
      state.vendor.data = payload?.data;

      state.formModalVendor.form = {
        code: payload?.data?.code,
        name: payload?.data?.name,
        type: payload?.data?.type,
        status: payload?.data?.status || false,
        startContract: new Date(payload?.data?.start_contract * 1000),
        endContract: new Date(payload?.data?.end_contract * 1000) || '',
      };
    });
    builder.addCase(resolveDetailVendor.rejected, (state, action) => {
      state.vendor.isLoading = false;
      state.vendor.isError = true;
      state.vendor.errorMessage = 'Something wrong!';
    });

    // Post Data Vendor
    builder.addCase(resolvePostDataVendor.pending, (state) => {
      state.formModalVendor.isLoading = true;
      state.formModalVendor.isError = false;
    });
    builder.addCase(resolvePostDataVendor.fulfilled, (state, {payload}) => {
      state.formModalVendor.isLoading = false;
      state.formModalVendor.isSuccess = true;
      state.formModalVendor.successMessage = 'Berhasil menambahkan vendor';
    });
    builder.addCase(resolvePostDataVendor.rejected, (state, {payload}) => {
      state.formModalVendor.isLoading = false;
      state.formModalVendor.isError = true;
      state.formModalVendor.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put Data Vendor
    builder.addCase(resolvePutDataVendor.pending, (state) => {
      state.formModalVendor.isLoading = true;
      state.formModalVendor.isError = false;
    });
    builder.addCase(resolvePutDataVendor.fulfilled, (state, {payload}) => {
      state.formModalVendor.isLoading = false;
      state.formModalVendor.isSuccess = true;
      state.formModalVendor.successMessage = 'Berhasil mengupdate vendor';
    });
    builder.addCase(resolvePutDataVendor.rejected, (state, {payload}) => {
      state.formModalVendor.isLoading = false;
      state.formModalVendor.isError = true;
      state.formModalVendor.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Patch Update Status Vendor
    builder.addCase(resolvePatchVendor.pending, (state) => {
      state.modalUpdateStatusVendor.isError = false;
      state.modalUpdateStatusVendor.isLoading = true;
      state.modalUpdateStatusVendor.isSuccess = false;
    });
    builder.addCase(resolvePatchVendor.fulfilled, (state, {payload}) => {
      state.modalUpdateStatusVendor.isLoading = false;
      state.modalUpdateStatusVendor.isError = false;
      state.modalUpdateStatusVendor.isSuccess = true;
      state.modalUpdateStatusVendor.successMessage = 'Berhasil mengupdate status vendor !';
    });
    builder.addCase(resolvePatchVendor.rejected, (state, {payload}) => {
      state.modalUpdateStatusVendor.isError = true;
      state.modalUpdateStatusVendor.isLoading = false;
      state.modalUpdateStatusVendor.isSuccess = false;
      state.modalUpdateStatusVendor.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Delete Data Vendor
    builder.addCase(resolveDeleteVendor.pending, (state) => {
      state.modalUpdateStatusVendor.isLoading = true;
      state.modalUpdateStatusVendor.isError = false;
    });
    builder.addCase(resolveDeleteVendor.fulfilled, (state, {payload}: any) => {
      if (payload.data.message) {
        state.modalUpdateStatusVendor.isLoading = false;
        state.modalUpdateStatusVendor.isError = false;
        state.modalUpdateStatusVendor.isSuccess = true;
        state.modalUpdateStatusVendor.successMessage = 'Berhasil menghapus vendor';
      } else {
        state.modalUpdateStatusVendor.isLoading = false;
        state.modalUpdateStatusVendor.isError = true;
        state.modalUpdateStatusVendor.errorMessage = String(payload.error.message);
      }
    });
    builder.addCase(resolveDeleteVendor.rejected, (state, {payload}: any) => {
      state.modalUpdateStatusVendor.isLoading = false;
      state.modalUpdateStatusVendor.isError = true;
      state.modalUpdateStatusVendor.errorMessage = String(payload?.message) || 'Something Wrong !';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setFormModal: (state, {payload}) => {
      state.formModalVendor.form[payload.name] = payload.value;
    },
    resetFormModalVendor: (state) => {
      state.formModalVendor = initialState.formModalVendor;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setFlagModalStatusVendor: (state, {payload}) => {
      state.modalUpdateStatusVendor.flag = payload;
    },
    resetStateVendor: () => initialState,
  },
});

export const {
  setModal,
  setParams,
  setFormModal,
  resetStateVendor,
  resetFormModalVendor,
  setFlagModalStatusVendor,
} = vendorSlice.actions;

export default vendorSlice.reducer;
