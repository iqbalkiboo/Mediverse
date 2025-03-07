import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getDataList, getDetail} from '@/src/client/businessSchema';

import {
  IBusinessSchemaState,
  IGetDataBusinessSchemaParams,
  IGetDetailBusinessSchemaParams,
} from '@/src/types/BusinessSchema';

const initialState: IBusinessSchemaState = {
  params: {
    page: 1,
    type: 'medpharm',
    limit: 10,
    status: '',
    keyword: '',
    endDate: '',
    startDate: '',
  },
  metadata: {
    page: 1,
    size: 1,
    totalData: 1,
    totalPage: 1,
  },
  businessSchema: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    data: [],
    detail: {},
  },
};

export const resolveBusinessSchemaService = createAsyncThunk(
    'businessSchema/resolveBusinessSchemaService',
    async (payload: IGetDataBusinessSchemaParams, {rejectWithValue}) => {
      try {
        const response = await getDataList(payload);
        if (response.status === 200) {
          return response.data;
        }

        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveBusinessSchemaDetailService = createAsyncThunk(
    'businessSchema/detail',
    async (payload: IGetDetailBusinessSchemaParams, {rejectWithValue}) => {
      try {
        const response = await getDetail(payload.channelId, payload.businessSchemaId, payload.providerType);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const businessSchemaSlice = createSlice({
  name: 'businessSchema',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveBusinessSchemaService.pending, (state) => {
      state.businessSchema.isLoading = true;
      state.businessSchema.isError = false;
    });
    builder.addCase(resolveBusinessSchemaService.fulfilled, (state, {payload}) => {
      state.businessSchema.isLoading = false;
      state.businessSchema.data = payload.data;
      state.metadata.page = payload.metadata?.page;
      state.metadata.totalPage = payload.metadata?.totalPage;
      state.metadata.size = payload.metadata?.size;
      state.metadata.totalData = payload.metadata?.totalData;
      state.businessSchema.isError = false;
    });
    builder.addCase(resolveBusinessSchemaService.rejected, (state) => {
      state.businessSchema.isLoading = false;
      state.businessSchema.isError = true;
      state.businessSchema.errorMessage = 'Something wrong!';
    });

    builder.addCase(resolveBusinessSchemaDetailService.pending, (state) => {
      state.businessSchema.isLoading = true;
      state.businessSchema.isError = false;
    });
    builder.addCase(resolveBusinessSchemaDetailService.fulfilled, (state, {payload}) => {
      state.businessSchema.isLoading = false;
      state.businessSchema.isError = false;
      state.businessSchema.detail = payload.data;
    });
    builder.addCase(resolveBusinessSchemaDetailService.rejected, (state) => {
      state.businessSchema.isLoading = false;
      state.businessSchema.isError = true;
      state.businessSchema.errorMessage = 'Something wrong!';
    });
  },
  reducers: {
    setStatus: (state, {payload}) => {
      state.params.status = payload;
    },
    setPage: (state, {payload}) => {
      state.params.page = payload;
    },
    setLimit: (state, {payload}) => {
      state.params.limit = payload;
    },
    setKeyword: (state, {payload}) => {
      state.params.keyword = payload;
    },
    setType: (state, {payload}) => {
      state.params.type = payload;
    },
    setStartDate: (state, {payload}) => {
      state.params.startDate = payload;
    },
    setEndDate: (state, {payload}) => {
      state.params.endDate = payload;
    },
  },
});

export const {
  setType,
  setPage,
  setLimit,
  setStatus,
  setKeyword,
  setEndDate,
  setStartDate,
} = businessSchemaSlice.actions;

export default businessSchemaSlice.reducer;
