import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getListLocation } from '@/client/location';

const initialState = {
  listLocation: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    successMessage: '',
    errorMessage: '',
    data: {},
  },
  paramsLocation: {
    province: '',
    regency: '',
    district: '',
    limit: 40,
  },
};

export const resolveListLocation = createAsyncThunk(
  'resolve/location/list',
  async (payload: any, { rejectWithValue }) => {
    const response = await getListLocation(
      payload.province,
      payload.regency,
      payload.limit
    );
    if (response.status === 200) return response.data;

    return rejectWithValue(response.error);
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveListLocation.pending, (state) => {
      state.listLocation.isLoading = true;
      state.listLocation.isSuccess = false;
      state.listLocation.isError = false;
    });
    builder.addCase(resolveListLocation.fulfilled, (state, { payload }) => {
      state.listLocation.isLoading = false;
      state.listLocation.isSuccess = true;
      state.listLocation.isError = false;
      state.listLocation.data = payload.data;
    });
    builder.addCase(resolveListLocation.rejected, (state) => {
      state.listLocation.isLoading = false;
      state.listLocation.isSuccess = false;
      state.listLocation.isError = true;
    });
  },
  reducers: {
    clearStateLocation: () => initialState,
    setParamsLocation: (state, { payload }) => {
      state.paramsLocation[payload.name] = payload.value;
    },
  },
});

export const { clearStateLocation, setParamsLocation } = locationSlice.actions;

export default locationSlice.reducer;
