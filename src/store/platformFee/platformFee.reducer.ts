import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getDetailPlatformFee,
  getListPlatformFee,
} from '@/client/platformFee';

import {
  IPlatformFeeState,
} from '@/src/types/MasterProvider/platformFee/platformFee';

const initialState: IPlatformFeeState = {
  platformFees: {
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
  platformFee: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  params: {
    page: 1,
    limit: 10,
    status: '',
    search: '',
    endDate: '',
    startDate: '',
    providerType: 'medpharm',
  },
};

export const resolveListPlatformFee = createAsyncThunk(
    'resolve/platformFee/list',
    async (payload: {
    page: number,
    limit: number,
    search: string,
    status: boolean | string,
    endDate: string,
    startDate: string,
    providerType: string,
  }, {rejectWithValue}) => {
      try {
        const response = await getListPlatformFee(payload);

        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailPlatformFee = createAsyncThunk(
    'resolve/platformFee/detail',
    async (payload: {
    channelId: any,
    id: any,
    providerType: any,
  }, {rejectWithValue}) => {
      try {
        const response = await getDetailPlatformFee(payload.channelId, payload.id, payload.providerType);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const platformFeeSlice = createSlice({
  name: 'providerPlatformFee',
  initialState,
  extraReducers: (builder) => {
    // Get List Platform Fee
    builder.addCase(resolveListPlatformFee.pending, (state, {payload}) => {
      state.platformFees.isError = false;
      state.platformFees.isLoading = true;
    });
    builder.addCase(resolveListPlatformFee.fulfilled, (state, {payload}) => {
      state.platformFees.isError = false;
      state.platformFees.isLoading = false;
      state.platformFees.data = payload.data;

      // Metadata List Platform Fee
      state.platformFees.metadata.page = payload.metadata?.page || 1;
      state.platformFees.metadata.size = payload.metadata?.size || 10;
      state.platformFees.metadata.totalPage = payload.metadata?.totalPage || 1;
      state.platformFees.metadata.totalData = payload.metadata?.totalData || 10;
    });
    builder.addCase(resolveListPlatformFee.rejected, (state, {payload}) => {
      state.platformFees.isError = true;
      state.platformFees.isLoading = false;
      state.platformFees.errorMessage = 'Something wrong!';
    });

    // Get Detail Platform Fee
    builder.addCase(resolveDetailPlatformFee.pending, (state) => {
      state.platformFee.isLoading = true;
      state.platformFee.isError = false;
    });
    builder.addCase(resolveDetailPlatformFee.fulfilled, (state, {payload}) => {
      state.platformFee.isLoading = false;
      state.platformFee.isError = false;
      state.platformFee.data = payload?.data;
    });
    builder.addCase(resolveDetailPlatformFee.rejected, (state, {payload}) => {
      state.platformFee.isLoading = false;
      state.platformFee.isError = true;
      state.platformFee.errorMessage = payload?.message || 'Something wrong';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
  },
});

export const {
  setParams,
} = platformFeeSlice.actions;

export default platformFeeSlice.reducer;
