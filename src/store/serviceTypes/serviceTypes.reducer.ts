import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getDataList,
  getDetail,
  postServiceTypes,
  putServiceTypes} from '@/client/serviceType/serviceTypesApi';

const initialState = {
  isLoading: false,
  isError: false,
  errMsg: '',
  listServiceTypes: [],
  detail: {},
  newServiceType: {
    id: '',
    name: '',
    foto: '',
    description: '',
  },
  countPage: 1,
  limit: 5,
};

export const fetchDataList = createAsyncThunk(
    'serviceTypes/list',
    async (payload: any, {rejectWithValue}) => {
      const response =
        await getDataList(payload.currentPage, payload.limit);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchDetail = createAsyncThunk(
    'serviceTypes/detail',
    async (payload: {id?: string}, {rejectWithValue}) => {
      const response = await getDetail(payload.id);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchServiceTypes = createAsyncThunk(
    'serviceTypes/add',
    async (payload: {}, {rejectWithValue}) => {
      const response = await postServiceTypes(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchServiceTypesEdit = createAsyncThunk(
    'serviceTypes/edit',
    async (payload: {}, {rejectWithValue}) => {
      const response = await putServiceTypes(payload);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

const vendorSlice = createSlice({
  name: 'serviceTypes',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDataList.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDataList.fulfilled, (state, {payload}) => {
      if (payload?.data) {
        state.isLoading = false;
        state.isError = false;
        state.listServiceTypes = payload.data;
      } else {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = payload.Exception;
      }
    });
    builder.addCase(fetchDataList.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Data its empty';
    });
    builder.addCase(fetchDetail.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDetail.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.detail = payload;
    });
    builder.addCase(fetchDetail.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Service type not found';
    });
    builder.addCase(fetchServiceTypes.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchServiceTypes.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.errMsg = payload;
    });
    builder.addCase(fetchServiceTypes.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(fetchServiceTypesEdit.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchServiceTypesEdit.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.errMsg = payload;
    });
    builder.addCase(fetchServiceTypesEdit.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
  },
  reducers: {
    setId: (state, action) => {
      state.newServiceType.id = action.payload;
    },
    setName: (state, action) => {
      state.newServiceType.name = action.payload;
    },
    setFoto: (state, action) => {
      state.newServiceType.foto = action.payload;
    },
    setDescription: (state, action) => {
      state.newServiceType.description = action.payload;
    },
  },
});

export const {
  setId,
  setDescription,
  setFoto,
  setName} = vendorSlice.actions;

export default vendorSlice.reducer;
