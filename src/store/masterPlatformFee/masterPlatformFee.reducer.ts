import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getActivePpn,
  getDataList,
  postData,
} from '@/src/client/masterPlatformFee/index';

import {IParamsPlatformFee} from '@/src/types/MasterConfiguration/platformFee';

export const initialState = {
  masterPlatformFees: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    metadata: {
      page: 1,
      limit: 1,
      totalData: 0,
      totalPage: 1,
    },
  },
  activePpn: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    data: {},
  },
  formMasterPlatformFee: {
    data: {},
    modalType: '',
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    sucessMessage: '',
  },
  params: {
    search: '',
    limit: 10,
    page: 1,
    isActive: '',
  },
};

export const resolveMasterPlatformFeeList = createAsyncThunk(
    'resolve/masterPlatformFee/list',
    async (payload: IParamsPlatformFee, {rejectWithValue}) => {
      const response = await getDataList(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveActivePpn = createAsyncThunk(
    'resolve/ppn/active',
    async (payload, {rejectWithValue}) => {
      const response = await getActivePpn();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveCreatePlatformFee = createAsyncThunk(
    'resolve/masterPlatformFee/create',
    async (payload: any, {rejectWithValue}) => {
      const response = await postData(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

const masterPlatformFeeSlice = createSlice({
  name: 'masterPlatformFee',
  initialState,
  extraReducers: (builder) => {
    // Get List Master Platform Fee
    builder.addCase(resolveMasterPlatformFeeList.pending, (state) => {
      state.masterPlatformFees.isLoading = true;
      state.masterPlatformFees.isError = false;
      state.masterPlatformFees.isSuccess = false;
    });
    builder.addCase(resolveMasterPlatformFeeList.fulfilled, (state, {payload}) => {
      state.masterPlatformFees.isLoading = false;
      state.masterPlatformFees.isError = false;
      state.masterPlatformFees.isSuccess = true;
      state.masterPlatformFees.data = payload.data || [];

      // condition for handle if metadata from backend is not apropriate
      if (payload.metadata.page) {
        state.masterPlatformFees.metadata.page = payload.metadata.page;
      }

      if (payload.metadata.size) {
        state.masterPlatformFees.metadata.limit = payload.metadata.size;
      }

      if (payload.metadata.total_data) {
        state.masterPlatformFees.metadata.totalData = payload.metadata.total_data;
      }

      if (payload.metadata.total_page) {
        state.masterPlatformFees.metadata.totalPage = payload.metadata.total_page;
      }
    });
    builder.addCase(resolveMasterPlatformFeeList.rejected, (state, {payload}) => {
      state.masterPlatformFees.isLoading = false;
      state.masterPlatformFees.isError = true;
      state.masterPlatformFees.isSuccess = false;
      state.masterPlatformFees.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get Active Ppn
    builder.addCase(resolveActivePpn.pending, (state) => {
      state.activePpn.isLoading = true;
      state.activePpn.isError = false;
    });
    builder.addCase(resolveActivePpn.fulfilled, (state, {payload}) => {
      state.activePpn.isLoading = false;
      state.activePpn.isError = false;
      state.activePpn.data = payload?.data || {};
    });
    builder.addCase(resolveActivePpn.rejected, (state, {payload}: any) => {
      state.activePpn.isLoading = false;
      state.activePpn.isError = true;
      state.activePpn.data = [];
      state.activePpn.errorMessage = payload?.message || 'Gagal Mendapatkan Data Transaksi Medpharm!';
    });

    // Post Data Master Platform Fee
    builder.addCase(resolveCreatePlatformFee.pending, (state) => {
      state.formMasterPlatformFee.isLoading = true;
      state.formMasterPlatformFee.isError = false;
      state.formMasterPlatformFee.isSuccess = false;
      state.formMasterPlatformFee.errorMessage = '';
      state.formMasterPlatformFee.sucessMessage = '';
    });
    builder.addCase(resolveCreatePlatformFee.fulfilled, (state, {payload}) => {
      state.formMasterPlatformFee.isLoading = false;
      state.formMasterPlatformFee.isError = false;
      state.formMasterPlatformFee.isSuccess = true;
      state.formMasterPlatformFee.modalType = '';
      state.formMasterPlatformFee.sucessMessage = 'Berhasil menambahkan master platform fee';
    });
    builder.addCase(resolveCreatePlatformFee.rejected, (state, {payload}) => {
      state.formMasterPlatformFee.isLoading = false;
      state.formMasterPlatformFee.isError = true;
      state.formMasterPlatformFee.isSuccess = false;
      state.formMasterPlatformFee.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.label] = payload.value;
    },
    setFormMasterPlatformFee: (state, {payload}) => {
      state.formMasterPlatformFee[payload.label] = payload.value;
    },
    setFormMasterPlatformFeeData: (state, {payload}) => {
      state.formMasterPlatformFee.data[payload.field] = payload.value;
    },
    setClearStateMasterPlatformFee: () => initialState,
  },
});

export const {
  setParams,
  setFormMasterPlatformFee,
  setFormMasterPlatformFeeData,
  setClearStateMasterPlatformFee,
} = masterPlatformFeeSlice.actions;

export default masterPlatformFeeSlice.reducer;
