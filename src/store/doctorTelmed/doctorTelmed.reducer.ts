import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getDataDetail,
  getDataList,
  getDetail,
  getSchedulesDoctorTelmed,
} from '@/client/doctorTelmed';
import {patchRelatedDoctor} from '@/src/client/doctorTelmed/index';

type IInitialState = {
  isError: boolean;
  isLoading: boolean;
  isPatchRelatedError: boolean;
  isPatchRelatedSuccess: boolean;
  isPatchRelatedLoading: boolean;
  doctorRelated: any[];
  errorMessage: string;
  listDoctorTelmed: any[];
  detailDoctorTelmed: {};
  schedulesDoctorTelmed: any[],
  params: {
    page: number | string,
    limit: number | string,
    offset: number | string,
    status: string | boolean,
    search: string,
    endDate: string,
    startDate: string,
    medevoStatus: string | boolean,
  };
  modalSchedule: {
    isOpen: boolean,
    data: [],
    masterData: string,
  },
  metadata: {
    page: number;
    size: number;
    totalData: number;
    totalPage: number;
  };
}

const initialState: IInitialState = {
  isError: false,
  isLoading: false,
  isPatchRelatedError: false,
  isPatchRelatedSuccess: false,
  isPatchRelatedLoading: false,
  errorMessage: '',
  doctorRelated: [],
  listDoctorTelmed: [],
  detailDoctorTelmed: {},
  schedulesDoctorTelmed: [],
  params: {
    page: 1,
    limit: 10,
    offset: 0,
    status: 'false',
    search: '',
    endDate: '',
    startDate: '',
    medevoStatus: 'all',
  },
  modalSchedule: {
    isOpen: false,
    data: [],
    masterData: '',
  },
  metadata: {
    page: 1,
    size: 10,
    totalData: 10,
    totalPage: 1,
  },
};

export const resolveListDoctorTelmed = createAsyncThunk(
    'resolve/doctorTelmed/list',

    async (payload: {
    page: number,
    limit: number,
    offset: number,
    search: string,
    status: boolean | string,
    endDate: string,
    startDate: string,
  }, {rejectWithValue}) => {
      const params = {
        page: payload.page,
        limit: payload.limit,
        offset: payload.offset,
        search: payload.search,
        status: payload.status,
        endDate: payload.endDate,
        startDate: payload.startDate,
      };
      const response = await getDataList(params);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetDetailDoctorTelmed = createAsyncThunk(
    'resolve/doctorTelmed/detail',
    async (payload: {
    id: any,
  }, {rejectWithValue}) => {
      const response = await getDetail(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetScheduleDoctorTelmed = createAsyncThunk(
    'resolve/doctorTelmed/schedules',
    async (payload: {id: string}, {rejectWithValue}) => {
      try {
        const response = await getSchedulesDoctorTelmed(payload.id);

        if (response.status === 200) {
          return response.data;
        }

        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePatchRelatedDoctor = createAsyncThunk(
    'resolve/doctorTelmed/patch',
    async (payload: {
    id: string,
    data: any,
  }, {rejectWithValue}) => {
      const response = await patchRelatedDoctor(payload.id, payload.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveDoctorDetail = createAsyncThunk(
    'doctor/detail',
    async (payload: {
      id?: string,
    }, {rejectWithValue}) => {
      const response =
        await getDataDetail(payload.id);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

const doctorTelmedSlice = createSlice({
  name: 'doctorTelmed',
  initialState,
  extraReducers: (builder) => {
    // Get List
    builder.addCase(resolveListDoctorTelmed.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(resolveListDoctorTelmed.fulfilled, (state, {payload}) => {
      state.isError = false;
      state.isLoading = false;
      state.listDoctorTelmed = payload;
      state.metadata.page = payload.metadata?.page;
      state.metadata.size = payload.metadata?.size;
      state.metadata.totalPage = payload.metadata?.totalPage;
      state.metadata.totalData = payload.metadata?.totalData;
    });
    builder.addCase(resolveListDoctorTelmed.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = 'Something wrong!';
    });

    // Get Detail
    builder.addCase(resolveGetDetailDoctorTelmed.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(resolveGetDetailDoctorTelmed.fulfilled, (state, {payload}) => {
      state.isError = false;
      state.isLoading = false;
      state.detailDoctorTelmed = payload,
      state.doctorRelated = payload?.related;
    });
    builder.addCase(resolveGetDetailDoctorTelmed.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = 'Something wrong!';
    });

    // Get Schedules
    builder.addCase(resolveGetScheduleDoctorTelmed.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(resolveGetScheduleDoctorTelmed.fulfilled, (state, {payload}) => {
      state.isError = false;
      state.isLoading = false;
      state.schedulesDoctorTelmed = payload.data;
    });
    builder.addCase(resolveGetScheduleDoctorTelmed.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = 'Something wrong!';
    });

    builder.addCase(resolvePatchRelatedDoctor.pending, (state) => {
      state.isPatchRelatedError = false,
      state.isPatchRelatedSuccess = false,
      state.isError = false,
      state.isLoading = true;
    });
    builder.addCase(resolvePatchRelatedDoctor.fulfilled, (state, {payload}) => {
      state.isPatchRelatedError = false,
      state.isPatchRelatedSuccess = true,
      state.isError = false,
      state.isLoading = false;
    });
    builder.addCase(resolvePatchRelatedDoctor.rejected, (state) => {
      state.isPatchRelatedError = true,
      state.isPatchRelatedSuccess = false,
      state.isError = true,
      state.isLoading = false,
      state.errorMessage = 'Something wrong!';
    });
  },
  reducers: {
    setPage: (state, {payload}) => {
      state.params.page = payload;
    },
    setLimit: (state, {payload}) => {
      state.params.limit = payload;
    },
    setOffset: (state, {payload}) => {
      state.params.offset = payload;
    },
    setStatus: (state, {payload}) => {
      state.params.status = payload;
    },
    setSearch: (state, {payload}) => {
      state.params.search = payload;
    },
    setEndDate: (state, {payload}) => {
      state.params.endDate = payload;
    },
    setStartDate: (state, {payload}) => {
      state.params.startDate = payload;
    },
    setMedevoStatus: (state, {payload}) => {
      state.params.medevoStatus = payload;
    },
    setDoctorRelated: (state, {payload}) => {
      state.doctorRelated = payload;
    },
    clearStatePatchRelated: (state) => {
      state.isPatchRelatedError = false;
      state.isPatchRelatedLoading = false;
      state.isPatchRelatedSuccess = false;
    },
  },
});

export const {
  setPage,
  setLimit,
  setOffset,
  setStatus,
  setSearch,
  setEndDate,
  setStartDate,
  setMedevoStatus,
  setDoctorRelated,
  clearStatePatchRelated,
} = doctorTelmedSlice.actions;

export default doctorTelmedSlice.reducer;
