import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getListJoinPartner,
  patchStatusJoinPartner,
} from '@/src/client/joinPartner';

const initialState = {
  idJoinPartner: 0,
  joinPartners: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 0,
    },
  },
  modalUpdateStatusJoinPartner: {
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
    type: 'all',
    endDate: '',
    startDate: '',
    isConfirmed: false,
  },
};

export const resolveListJoinPartner = createAsyncThunk(
    'resolve/joinPartner/list',
    async (payload: {
  page: number,
  type: string,
  limit: number,
  endDate: number,
  startDate: number,
  isConfirmed: boolean,
}, {rejectWithValue}) => {
      try {
        const response = await getListJoinPartner(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePatchStatusJoinPartner = createAsyncThunk(
    'resolve/joinPartner/patchStatus',
    async (payload: {
id: string | number,
data: {is_confirm: boolean},
}, {rejectWithValue}) => {
      try {
        const response = await patchStatusJoinPartner(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const joinPartnerSlice = createSlice({
  name: 'joinPartner',
  initialState,
  extraReducers: (builder) => {
    // Get list join partner
    builder.addCase(resolveListJoinPartner.pending, (state) => {
      state.joinPartners.isLoading = true;
      state.joinPartners.isError = false;
    });
    builder.addCase(resolveListJoinPartner.fulfilled, (state, {payload}) => {
      state.joinPartners.isLoading = false;
      state.joinPartners.isError = false;
      state.joinPartners.data = payload?.data || [];

      // Metadata list join partner
      state.joinPartners.metadata.page = payload?.metadata?.page || 1;
      state.joinPartners.metadata.size = payload?.metadata?.size || 10;
      state.joinPartners.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.joinPartners.metadata.totalData = payload?.metadata?.total_data || 0;
    });
    builder.addCase(resolveListJoinPartner.rejected, (state, {payload}) => {
      state.joinPartners.isLoading = false;
      state.joinPartners.isError = true;
      state.joinPartners.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Patch update status join partner
    builder.addCase(resolvePatchStatusJoinPartner.pending, (state) => {
      state.modalUpdateStatusJoinPartner.isError = false;
      state.modalUpdateStatusJoinPartner.isLoading = true;
      state.modalUpdateStatusJoinPartner.isSuccess = false;
    });
    builder.addCase(resolvePatchStatusJoinPartner.fulfilled, (state, {payload}) => {
      state.modalUpdateStatusJoinPartner.isLoading = false;
      state.modalUpdateStatusJoinPartner.isError = false;
      state.modalUpdateStatusJoinPartner.isSuccess = true;
      state.modalUpdateStatusJoinPartner.successMessage = 'Berhasil mengupdate status gabung mitra';
    });
    builder.addCase(resolvePatchStatusJoinPartner.rejected, (state, {payload}) => {
      state.modalUpdateStatusJoinPartner.isError = true;
      state.modalUpdateStatusJoinPartner.isLoading = false;
      state.modalUpdateStatusJoinPartner.isSuccess = false;
      state.modalUpdateStatusJoinPartner.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setIdJoinPartner: (state, {payload}) => {
      state.idJoinPartner = payload;
    },
    resetStateJoinPartner: () => initialState,
  },
});

export const {
  setModal,
  setParams,
  setIdJoinPartner,
  resetStateJoinPartner,
} = joinPartnerSlice.actions;

export default joinPartnerSlice.reducer;
