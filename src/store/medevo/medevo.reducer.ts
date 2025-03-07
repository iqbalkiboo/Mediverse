import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getDetailMedevo,
  getListMedevo,
} from '@/src/client/medevo';

import {
  IGetDetailMedevoParams,
  IGetListMedevoParams,
  IMedevoState,
} from '@/src/types/MasterTransaction/medevo';

const initialState: IMedevoState = {
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    endDate: '',
    totalData: 1,
    totalPage: 1,
    startDate: '',
    serviceType: '',
  },
  medevos: {
    data: [],
    message: '',
    isError: false,
    isLoading: false,
    metadata: {
      page: 1,
      perPage: 10,
      totalRow: 0,
      totalPage: 1,
    },
  },
  medevo: {
    message: '',
    isError: false,
    isLoading: false,
    isSuccess: false,
    data: {item: []},
  },
};

export const resolveGetListMedevo = createAsyncThunk(
    'resolve/medevo/list',
    async (payload: IGetListMedevoParams, {rejectWithValue}) => {
      try {
        const response = await getListMedevo(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetDetailMedevo = createAsyncThunk(
    'resolve/medevo/detail',
    async (payload: IGetDetailMedevoParams, {rejectWithValue}) => {
      try {
        const response = await getDetailMedevo(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const medevoSlice = createSlice({
  name: 'medevo',
  initialState,
  extraReducers: (builder) => {
    // Get List Medevo
    builder.addCase(resolveGetListMedevo.pending, (state) => {
      state.medevos.isError = false;
      state.medevos.isLoading = true;
    });
    builder.addCase(resolveGetListMedevo.fulfilled, (state, {payload}) => {
      state.medevos.isError = false;
      state.medevos.isLoading = false;
      state.medevos.data = payload?.data || [];

      // Medevo Metadata
      state.medevos.metadata.page = payload?.metadata?.page || 1;
      state.medevos.metadata.perPage = payload?.metadata?.per_page || 10;
      state.medevos.metadata.totalRow = payload?.metadata?.total_row || 10;
      state.medevos.metadata.totalPage = payload?.metadata?.total_page || 1;
    });
    builder.addCase(resolveGetListMedevo.rejected, (state, {payload}: any) => {
      state.medevos.isError = true;
      state.medevos.isLoading = false;
      state.medevos.message = payload?.message || 'Gagal Mendapatkan Data Transaksi Medevo!';
    });

    // Get Detail Medevo
    builder.addCase(resolveGetDetailMedevo.pending, (state) => {
      state.medevo.isError = false;
      state.medevo.isLoading = true;
    });
    builder.addCase(resolveGetDetailMedevo.fulfilled, (state, {payload}) => {
      state.medevo.isError = false;
      state.medevo.isLoading = false;
      state.medevo.data = payload?.data;
    });
    builder.addCase(resolveGetDetailMedevo.rejected, (state, {payload}: any) => {
      state.medevo.isError = true;
      state.medevo.isLoading = false;
      state.medevo.message = payload?.message || 'Gagal Mendapatkan Data Transaksi Medevo!';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    clearStateTransaction: () => initialState,
  },
});

export const {
  setParams,
  clearStateTransaction,
} = medevoSlice.actions;

export default medevoSlice.reducer;
