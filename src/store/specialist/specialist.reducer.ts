import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  deleteDataSpecialist,
  getDataDetailSpecialist,
  getDataListDoctor,
  getDataListSpecialist,
  postDataSpecialist,
  putDataSpecialist,
} from '@/client/specialist';

import {
  IParamsGetSpecialists,
  IPayloadPostSpecialist,
  IPayloadPutSpecialist,
} from '@/src/types/Specialist';

const initialState = {
  specialists: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    metadata: {
      page: 1,
      limit: 10,
      totalData: 0,
      totalPage: 1,
    },
  },
  specialist: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  doctors: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    metadata: {
      page: 1,
      limit: 10,
      totalData: 0,
      totalPage: 1,
    },
  },
  formSpecialist: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isModalOpen: false,
    data: {
      specialist_id: '',
      specialist_name: '',
      description: '',
      specialist_icon: '',
      parameters: '',
      is_active: false,
    },
  },
  deleteSpecialist: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isModalOpen: false,
  },
  statusSpecialist: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    isModalOpen: false,
    successMessage: '',
  },
  params: {
    search: '',
    page: 1,
    limit: 10,
    isActive: 'all',
  },
};

export const resolveListSpecialist = createAsyncThunk(
    'resolve/specialist/list',
    async (payload: IParamsGetSpecialists, {rejectWithValue}) => {
      try {
        const response = await getDataListSpecialist(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveListDoctor = createAsyncThunk(
    'resolve/doctor/list',
    async (payload: {name: string}, {rejectWithValue}) => {
      try {
        const response = await getDataListDoctor(payload.name);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailSpecialist = createAsyncThunk(
    'resolve/specialist/detail',
    async (payload: {id: number}, {rejectWithValue}) => {
      try {
        const response = await getDataDetailSpecialist(payload.id);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostSpecialist = createAsyncThunk(
    'resolve/specialist/post',
    async (payload: IPayloadPostSpecialist, {rejectWithValue}) => {
      try {
        const response = await postDataSpecialist(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePutSpecialist = createAsyncThunk(
    'resolve/specialist/put',
    async (payload: IPayloadPutSpecialist, {rejectWithValue}) => {
      try {
        const params = {
          specialist_id: '',
          specialist_name: payload.specialist_name,
          description: payload.description,
          specialist_icon: payload.specialist_icon,
          parameters: '',
          is_active: payload.is_active,
        };
        const response = await putDataSpecialist(payload.id, params);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDeleteSpecialist = createAsyncThunk(
    'resolve/specialist/delete',
    async (payload: {id: number}, {rejectWithValue}) => {
      try {
        const response = await deleteDataSpecialist(payload.id);
        if (response.status === 200) {
          return response;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const specialistSlice = createSlice({
  name: 'specialist',
  initialState,
  extraReducers: (builder) => {
    // Get List Specialist
    builder.addCase(resolveListSpecialist.pending, (state) => {
      state.specialists.isLoading = true;
      state.specialists.isError = false;
      state.specialists.isSuccess = false;
      state.specialists.errorMessage = '';
    });
    builder.addCase(resolveListSpecialist.fulfilled, (state, {payload}) => {
      state.specialists.isLoading = false;
      state.specialists.isError = false;
      state.specialists.isSuccess = true;
      state.specialists.data = payload.data || [];

      // handle possible error from backend
      if (payload.metadata?.page) {
        state.specialists.metadata.page = payload.metadata.page;
      }

      if (payload.metadata?.limit) {
        state.specialists.metadata.limit = payload.metadata.limit;
      }

      if (payload.metadata?.total_page) {
        state.specialists.metadata.totalPage = payload.metadata.total_page;
      }

      if (payload.metadata?.total_data) {
        state.specialists.metadata.totalData = payload.metadata.total_data;
      }
    });
    builder.addCase(resolveListSpecialist.rejected, (state, {payload}: any) => {
      state.specialists.isLoading = false;
      state.specialists.isError = true;
      state.specialists.isSuccess = false;
      state.specialists.data = [];
      state.specialists.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get List Doctors
    builder.addCase(resolveListDoctor.pending, (state) => {
      state.doctors.isLoading = true;
      state.doctors.isError = false;
      state.doctors.isSuccess = false;
      state.doctors.errorMessage = '';
    });
    builder.addCase(resolveListDoctor.fulfilled, (state, {payload}) => {
      state.doctors.isLoading = false;
      state.doctors.isError = false;
      state.doctors.isSuccess = true;
      state.doctors.data = payload || [];
      state.formSpecialist.data = initialState.formSpecialist.data;
    });
    builder.addCase(resolveListDoctor.rejected, (state, payload) => {
      state.doctors.isLoading = false;
      state.doctors.isError = true;
      state.doctors.isSuccess = false;
      state.doctors.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get Detail Specialist
    builder.addCase(resolveDetailSpecialist.pending, (state) => {
      state.specialist.isLoading = true;
      state.specialist.isError = false;
      state.specialist.isSuccess = false;
      state.specialist.errorMessage = '';
    });
    builder.addCase(resolveDetailSpecialist.fulfilled, (state, {payload}) => {
      state.specialist.isLoading = false;
      state.specialist.isError = false;
      state.specialist.isSuccess = true;
      state.specialist.data = payload.data || {};
      state.formSpecialist.data = payload.data || {};
    });
    builder.addCase(resolveDetailSpecialist.rejected, (state, payload) => {
      state.specialist.isLoading = false;
      state.specialist.isError = true;
      state.specialist.isSuccess = false;
      state.specialist.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Post Data Specialist
    builder.addCase(resolvePostSpecialist.pending, (state) => {
      state.formSpecialist.isLoading = true;
      state.formSpecialist.isError = false;
      state.formSpecialist.isSuccess = false;
      state.formSpecialist.errorMessage = '';
    });
    builder.addCase(resolvePostSpecialist.fulfilled, (state, {payload}) => {
      state.formSpecialist.isLoading = false;
      state.formSpecialist.isError = false;
      state.formSpecialist.isSuccess = true;
      state.formSpecialist.isModalOpen = false;
      state.formSpecialist.successMessage = 'Berhasil menambahkan master spesialis!';
      state.formSpecialist.data = initialState.formSpecialist.data;
    });
    builder.addCase(resolvePostSpecialist.rejected, (state, {payload}: any) => {
      state.formSpecialist.isLoading = false;
      state.formSpecialist.isError = true;
      state.formSpecialist.isSuccess = false;
      state.formSpecialist.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put Data Specialist
    builder.addCase(resolvePutSpecialist.pending, (state) => {
      state.formSpecialist.isLoading = true;
      state.formSpecialist.isError = false;
      state.formSpecialist.isSuccess = false;
      state.formSpecialist.errorMessage = '';
    });
    builder.addCase(resolvePutSpecialist.fulfilled, (state, {payload}) => {
      state.formSpecialist.isLoading = false;
      state.formSpecialist.isError = false;
      state.formSpecialist.isSuccess = true;
      state.formSpecialist.isModalOpen = false;
      state.formSpecialist.successMessage = 'Berhasil edit master spesialis!';
      state.formSpecialist.data = initialState.formSpecialist.data;
    });
    builder.addCase(resolvePutSpecialist.rejected, (state, {payload}) => {
      state.formSpecialist.isLoading = false;
      state.formSpecialist.isError = true;
      state.formSpecialist.isSuccess = false;
      state.formSpecialist.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Delete Data Specialist
    builder.addCase(resolveDeleteSpecialist.pending, (state) => {
      state.deleteSpecialist.isLoading = true;
      state.deleteSpecialist.isError = false;
      state.deleteSpecialist.isSuccess = false;
      state.deleteSpecialist.errorMessage = '';
    });
    builder.addCase(resolveDeleteSpecialist.fulfilled, (state, {payload}) => {
      state.deleteSpecialist.isLoading = false;
      state.deleteSpecialist.isError = false;
      state.deleteSpecialist.isModalOpen = false;
      state.deleteSpecialist.isSuccess = true;
      state.deleteSpecialist.successMessage = 'Berhasil menghapus master spesialis!';
    });
    builder.addCase(resolveDeleteSpecialist.rejected, (state, {payload}) => {
      state.deleteSpecialist.isLoading = false;
      state.deleteSpecialist.isError = true;
      state.deleteSpecialist.isSuccess = false;
      state.deleteSpecialist.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setModalAdd: (state, {payload}) => {
      state.formSpecialist.isModalOpen = payload;
    },
    setModalEdit: (state, {payload}) => {
      state.formSpecialist.isModalOpen = payload;
    },
    setModalDelete: (state, {payload}) => {
      state.deleteSpecialist.isModalOpen = payload;
    },
    setStateParams: (state, {payload}) => {
      state.params[payload.label] = payload.value;
    },
    setStateFormSpecialist: (state, {payload}) => {
      state.formSpecialist[payload.label] = payload.value;
    },
    setStateFormSpecialistData: (state, {payload}) => {
      state.formSpecialist.data[payload.field] = payload.value;
    },
    setStateStatusSpecialist: (state, {payload}) => {
      state.statusSpecialist[payload.label] = payload.value;
    },
    resetDelete: (state) => {
      state.formSpecialist = initialState.formSpecialist;
      state.deleteSpecialist = initialState.deleteSpecialist;
    },
    resetDefaultValueForm: (state: any, {payload}) => {
      state.formSpecialist.data = {
        specialist_id: payload.data.id,
        specialist_name: payload.data.name,
        description: payload.data.description,
        specialist_icon: payload.data.icon,
        parameters: payload.data.parameters,
        is_active: payload.data.status,
      };
    },
    resetFormState: (state) => {
      state.formSpecialist = initialState.formSpecialist;
    },
    setClearInitialState: () => initialState,
  },
});

export const {
  setModalAdd,
  resetDelete,
  setModalEdit,
  setStateParams,
  setModalDelete,
  resetFormState,
  setClearInitialState,
  resetDefaultValueForm,
  setStateFormSpecialist,
  setStateStatusSpecialist,
  setStateFormSpecialistData,
} = specialistSlice.actions;

export default specialistSlice.reducer;
