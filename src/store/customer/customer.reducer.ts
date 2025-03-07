import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getListCustomer, postCustomer } from '@/client/customer';

export const initialState = {
  listCustomer: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
  },
  formCustomer: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    data: {
      customer_name: '',
      gender: '',
      mobile_no: '',
    },
  },
};

export const resolveGetListCustomer = createAsyncThunk(
  'resolve/customer/list',
  async (payload: any, { rejectWithValue }) => {
    const response = await getListCustomer({
      noIdentifier: payload.noIdentifier,
    });
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolvePostCustomer = createAsyncThunk(
  'resolve/customer/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postCustomer({
        data: payload.data,
      });
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  extraReducers: (builder) => {
    // Get List Customer
    builder.addCase(resolveGetListCustomer.pending, (state) => {
      state.listCustomer.isError = false;
      state.listCustomer.isLoading = true;
      state.listCustomer.isSuccess = false;
    });
    builder.addCase(resolveGetListCustomer.fulfilled, (state, { payload }) => {
      state.listCustomer.isError = false;
      state.listCustomer.isLoading = false;
      state.listCustomer.isSuccess = true;
      state.listCustomer.data = payload?.data?.data || [];
    });
    builder.addCase(
      resolveGetListCustomer.rejected,
      (state, { payload }: any) => {
        state.listCustomer.isError = true;
        state.listCustomer.isLoading = false;
        state.listCustomer.isSuccess = false;
        state.listCustomer.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Customer!';
      }
    );

    // Post Data Customer
    builder.addCase(resolvePostCustomer.pending, (state) => {
      state.formCustomer.isLoading = true;
      state.formCustomer.isSuccess = false;
      state.formCustomer.isError = false;
    });
    builder.addCase(resolvePostCustomer.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formCustomer.isLoading = false;
        state.formCustomer.isSuccess = true;
        state.formCustomer.isError = false;
      } else {
        state.formCustomer.isLoading = false;
        state.formCustomer.isSuccess = false;
        state.formCustomer.isError = true;
        state.formCustomer.errorMessage = 'Gagal Menambahkan Customer!';
      }
    });
    builder.addCase(resolvePostCustomer.rejected, (state, { payload }: any) => {
      state.formCustomer.isLoading = false;
      state.formCustomer.isSuccess = false;
      state.formCustomer.isError = true;
      state.formCustomer.errorMessage =
        payload?.message || 'Gagal Menambahkan Customer!';
    });
  },
  reducers: {
    clearStateCustomer: () => initialState,
    setFormCustomer: (state: any, { payload }) => {
      state.formCustomer.data[payload.label] = payload.value;
    },
    setModalCustomer: (state, { payload }) => {
      state.formCustomer[payload.label] = payload.value;
    },
  },
});

export const { clearStateCustomer, setFormCustomer, setModalCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
