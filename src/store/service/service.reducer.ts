import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getListDepartment,
  getListService,
  postAddAppointment,
} from '@/client/service';

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
  listService: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  listDepartment: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  formRegister: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
  },
};

export const resolveGetListService = createAsyncThunk(
  'resolve/service/list',
  async (payload: { type: string }, { rejectWithValue }) => {
    const response = await getListService(payload);
    if (response.status === 200) return response.data;
    return rejectWithValue(response.data.message);
  }
);

export const resolveGetListDepartment = createAsyncThunk(
  'resolve/department/list',
  async (_, { rejectWithValue }) => {
    const response = await getListDepartment();
    if (response.status === 200) return response.data;
    return rejectWithValue(response.data.message);
  }
);

export const resolveAddAppointment = createAsyncThunk(
  'resolve/appointment/post',
  async (payload: any, { rejectWithValue }) => {
    const response = await postAddAppointment(payload);
    if (response.status === 200) return response.data;
    return rejectWithValue(response.data.message);
  }
);

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    // Get List Service
    builder.addCase(resolveGetListService.pending, (state) => {
      state.listService.isError = false;
      state.listService.isLoading = true;
      state.listService.isSuccess = false;
    });
    builder.addCase(resolveGetListService.fulfilled, (state, { payload }) => {
      state.listService.isError = false;
      state.listService.isLoading = false;
      state.listService.isSuccess = true;
      state.listService.data = payload?.message || [];

      state.metadata.page = payload.metadata?.page ?? 1;
      state.metadata.perPage = payload.metadata?.size ?? 10;
      state.metadata.totalPage = payload.metadata?.total_page ?? 1;
      state.metadata.totalRow = payload.metadata?.total_data ?? 1;
    });
    builder.addCase(
      resolveGetListService.rejected,
      (state, { payload }: any) => {
        state.listService.isError = true;
        state.listService.isLoading = false;
        state.listService.isSuccess = false;
        state.listService.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Layanan!';
      }
    );

    // Get List Service
    builder.addCase(resolveGetListDepartment.pending, (state) => {
      state.listDepartment.isError = false;
      state.listDepartment.isLoading = true;
      state.listDepartment.isSuccess = false;
    });
    builder.addCase(
      resolveGetListDepartment.fulfilled,
      (state, { payload }) => {
        state.listDepartment.isError = false;
        state.listDepartment.isLoading = false;
        state.listDepartment.isSuccess = true;
        state.listDepartment.data = payload.data || [];

        state.metadata.page = payload.metadata?.page ?? 1;
        state.metadata.perPage = payload.metadata?.size ?? 10;
        state.metadata.totalPage = payload.metadata?.total_page ?? 1;
        state.metadata.totalRow = payload.metadata?.total_data ?? 1;
      }
    );
    builder.addCase(
      resolveGetListDepartment.rejected,
      (state, { payload }: any) => {
        state.listDepartment.isError = true;
        state.listDepartment.isLoading = false;
        state.listDepartment.isSuccess = false;
        state.listDepartment.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Poli!';
      }
    );

    // Post Appointment
    builder.addCase(resolveAddAppointment.pending, (state) => {
      state.formRegister.isLoading = true;
      state.formRegister.isError = false;
      state.formRegister.isSuccess = false;
      state.formRegister.errorMessage = '';
    });
    builder.addCase(resolveAddAppointment.fulfilled, (state) => {
      state.formRegister.isLoading = false;
      state.formRegister.isError = false;
      state.formRegister.isSuccess = true;
      state.formRegister.errorMessage = '';
    });
    builder.addCase(
      resolveAddAppointment.rejected,
      (state, { payload }: any) => {
        state.formRegister.isLoading = false;
        state.formRegister.isError = true;
        state.formRegister.isSuccess = false;
        state.formRegister.errorMessage = payload || 'Something wrong!';
      }
    );
  },
  reducers: {
    clearStateService: () => initialState,
    setParams: (state, { payload }) => {
      state.params[payload?.field] = payload.value;
    },
    setModalRegister: (state, { payload }) => {
      state.formRegister[payload.label] = payload.value;
    },
  },
});

export const { clearStateService, setParams, setModalRegister } =
  serviceSlice.actions;

export default serviceSlice.reducer;
