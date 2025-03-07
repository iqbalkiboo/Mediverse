import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getListDoctor } from '@/src/client/doctor';

const initialState = {
  params: {
    page: 1,
    limit: 10,
    isActive: '',
    startDate: '',
    endDate: '',
    search: '',
  },
  metadata: {
    page: 1,
    perPage: 10,
    totalRow: 0,
    totalPage: 1,
    totalData: 1,
  },
  listDoctor: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: [],
    detail: {},
  },
  formDoctor: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    data: {},
  },
};

export const resolveGetListDoctor = createAsyncThunk(
  'resolve/doctor/list',
  async (payload: any, { rejectWithValue }) => {
    const response = await getListDoctor(payload.department);
    if (response.status === 200) return response.data;
    return rejectWithValue(response.data.message);
  }
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  extraReducers: (builder) => {
    // Get List Doctor
    builder.addCase(resolveGetListDoctor.pending, (state) => {
      state.listDoctor.isError = false;
      state.listDoctor.isLoading = true;
      state.listDoctor.isSuccess = false;
    });
    builder.addCase(resolveGetListDoctor.fulfilled, (state, { payload }) => {
      state.listDoctor.isError = false;
      state.listDoctor.isLoading = false;
      state.listDoctor.isSuccess = true;
      state.listDoctor.data = payload.message || [];

      state.metadata.page = payload.metadata?.page ?? 1;
      state.metadata.perPage = payload.metadata?.size ?? 10;
      state.metadata.totalPage = payload.metadata?.total_page ?? 1;
      state.metadata.totalRow = payload.metadata?.total_data ?? 1;
    });
    builder.addCase(
      resolveGetListDoctor.rejected,
      (state, { payload }: any) => {
        state.listDoctor.isError = true;
        state.listDoctor.isLoading = false;
        state.listDoctor.isSuccess = false;
        state.listDoctor.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Layanan!';
      }
    );
  },
  reducers: {
    clearStateDoctor: () => initialState,
    setParams: (state, { payload }) => {
      state.params[payload?.field] = payload.value;
    },
    setModalDoctor: (state, { payload }) => {
      state.formDoctor[payload.label] = payload.value;
    },
  },
});

export const { clearStateDoctor, setParams, setModalDoctor } =
  doctorSlice.actions;

export default doctorSlice.reducer;
