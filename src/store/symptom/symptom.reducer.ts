import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  deleteSymptom,
  getDetailSymptom,
  getListSymptom,
  getListSymptomChecker,
  patchSymptom,
  postSymptom,
} from '@/client/symptom';

const initialState = {
  symptoms: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 10,
    },
  },
  symptomCheckers: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    data: [],
  },
  symptom: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    data: {},
  },
  formSymptom: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  deleteSymptom: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  form: {
    symptom_id: '',
    symptom_name: '',
    symptom_icon: '',
    is_deleted: false,
    is_active: false,
    medevo_symptom_id: [],
  },
  modal: {
    modalSymptom: false,
    modalConfirmation: false,
  },
  params: {
    page: 1,
    limit: 10,
    status: '',
    search: '',
    startDate: '',
    endDate: '',
  },
};

export const resolveListSymptom = createAsyncThunk(
    'resolve/symptom/list',
    async (payload: any, {rejectWithValue}) => {
      const response = await getListSymptom(payload);
      if (response.status === 200) {
        return response.data;
      }

      return rejectWithValue(response.data.message);
    },
);

export const resolveListSymptomChecker = createAsyncThunk(
    'resolve/symptom/checker/list',
    async (any, {rejectWithValue}) => {
      const response = await getListSymptomChecker();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveDetailSymptom = createAsyncThunk(
    'resolve/symptom/detail',
    async (payload: {
    id: number,
  }, {rejectWithValue}) => {
      const response = await getDetailSymptom(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolvePostSymptom = createAsyncThunk(
    'resolve/symptom/post',
    async (payload: {
    symptom_name: string,
    symptom_icon: string,
    is_deleted: boolean,
    is_active: boolean,
    medevo_symptom_id: number[],
  }, {rejectWithValue}) => {
      const params = {
        symptom_name: payload.symptom_name,
        symptom_icon: payload.symptom_icon,
        is_deleted: payload.is_deleted,
        is_active: payload.is_active,
        medevo_symptom_id: payload.medevo_symptom_id,
      };
      const response = await postSymptom(params);

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolvePatchSymptom = createAsyncThunk(
    'resolve/symptom/patch',
    async (payload: {
    id: number,
    data: object,
  }, {rejectWithValue}) => {
      const response = await patchSymptom(payload.id, payload.data);

      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveDeleteSymptom = createAsyncThunk(
    'resolve/symptom/delete',
    async (payload: {
    id: number,
  }, {rejectWithValue}) => {
      const response = await deleteSymptom(payload.id);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data.message);
    },
);

const symptomSlice = createSlice({
  name: 'symptom',
  initialState,
  extraReducers: (builder) => {
    // Get List Symptom
    builder.addCase(resolveListSymptom.pending, (state) => {
      state.symptoms.isLoading = true;
      state.symptoms.isError = false;
      state.symptoms.isSuccess = false;
    });
    builder.addCase(resolveListSymptom.fulfilled, (state, {payload}) => {
      state.symptoms.isLoading = false;
      state.symptoms.isError = false;
      state.symptoms.isSuccess = true;
      state.symptoms.data = payload.data || [];
      state.symptoms.metadata.page = payload.metadata.page;
      state.symptoms.metadata.size = payload.metadata.size;
      state.symptoms.metadata.totalPage = payload.metadata.totalPage;
      state.symptoms.metadata.totalData = payload.metadata.totalData;
    });
    builder.addCase(resolveListSymptom.rejected, (state, {payload}) => {
      state.symptoms.isLoading = false;
      state.symptoms.isError = true;
      state.symptoms.isSuccess = false;
      state.symptoms.errorMessage = String(payload) || 'Something Wrong !';
    });
    // Get List Symptom Checker
    builder.addCase(resolveListSymptomChecker.pending, (state) => {
      state.symptomCheckers.isLoading = true;
      state.symptomCheckers.isError = false;
      state.symptomCheckers.isSuccess = false;
    });
    builder.addCase(resolveListSymptomChecker.fulfilled, (state, {payload}) => {
      state.symptomCheckers.isLoading = false;
      state.symptomCheckers.isError = false;
      state.symptomCheckers.isSuccess = true;
      state.symptomCheckers.data = payload.data || [];
    });
    builder.addCase(resolveListSymptomChecker.rejected, (state, payload) => {
      state.symptomCheckers.isLoading = false;
      state.symptomCheckers.isError = true;
      state.symptomCheckers.isSuccess = false;
      state.symptomCheckers.errorMessage = String(payload) || 'Something Wrong !';
    });
    // Get Detail Symptom
    builder.addCase(resolveDetailSymptom.pending, (state) => {
      state.symptom.isLoading = true;
      state.symptom.isError = false;
      state.symptom.isSuccess = false;
    });
    builder.addCase(resolveDetailSymptom.fulfilled, (state, {payload}) => {
      state.symptom.isLoading = false;
      state.symptom.isError = false;
      state.symptom.isSuccess = true;
      state.symptom.data = payload.data || {};
    });
    builder.addCase(resolveDetailSymptom.rejected, (state, {payload}) => {
      state.symptom.isLoading = false;
      state.symptom.isError = true;
      state.symptom.isSuccess = false;
      state.symptom.errorMessage = String(payload) || 'Something Wrong !';
    });
    // Post Symptom
    builder.addCase(resolvePostSymptom.pending, (state) => {
      state.formSymptom.isLoading = true;
      state.formSymptom.isError = false;
      state.formSymptom.isSuccess = false;
    });
    builder.addCase(resolvePostSymptom.fulfilled, (state, {payload}) => {
      state.formSymptom.isLoading = false;
      state.formSymptom.isError = false;
      state.formSymptom.isSuccess = true;
      state.formSymptom.successMessage = payload.message;
    });
    builder.addCase(resolvePostSymptom.rejected, (state, {payload}) => {
      state.formSymptom.isLoading = false;
      state.formSymptom.isError = true;
      state.formSymptom.isSuccess = false;
      state.formSymptom.errorMessage = String(payload) || 'Something Wrong !';
    });
    // Patch Symptom
    builder.addCase(resolvePatchSymptom.pending, (state) => {
      state.formSymptom.isLoading = true;
      state.formSymptom.isError = false;
      state.formSymptom.isSuccess = false;
    });
    builder.addCase(resolvePatchSymptom.fulfilled, (state, {payload}) => {
      state.formSymptom.isLoading = false;
      state.formSymptom.isError = false;
      state.formSymptom.isSuccess = true;
      state.formSymptom.successMessage = payload.message || '';
    });
    builder.addCase(resolvePatchSymptom.rejected, (state, {payload}) => {
      state.formSymptom.isLoading = false;
      state.formSymptom.isError = true;
      state.formSymptom.isSuccess = false;
      state.formSymptom.errorMessage = String(payload) || 'Something Wrong !';
    });
    // Delete Symptom
    builder.addCase(resolveDeleteSymptom.pending, (state) => {
      state.deleteSymptom.isLoading = true;
      state.deleteSymptom.isError = false;
      state.deleteSymptom.isSuccess = false;
    });
    builder.addCase(resolveDeleteSymptom.fulfilled, (state, {payload}) => {
      state.deleteSymptom.isLoading = false;
      state.deleteSymptom.isError = false;
      state.deleteSymptom.isSuccess = true;
      state.deleteSymptom.successMessage = payload.message || '';
    });
    builder.addCase(resolveDeleteSymptom.rejected, (state, {payload}) => {
      state.deleteSymptom.isLoading = false;
      state.deleteSymptom.isError = true;
      state.deleteSymptom.isSuccess = false;
      state.deleteSymptom.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setForm: (state, {payload}) => {
      state.form[payload?.field] = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload?.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state.modal[payload?.name] = payload.value;
    },
    resetDetailSymptom: (state) => {
      state.symptom = initialState.symptom;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
    resetStatusForm: (state) => {
      state.formSymptom = initialState.formSymptom;
    },
    resetStatusDelete: (state) => {
      state.deleteSymptom = initialState.deleteSymptom;
    },
    resetParams: (state) => {
      state.params = initialState.params;
    },
  },
});

export const {
  setForm,
  setParams,
  setModal,
  resetDetailSymptom,
  resetForm,
  resetStatusForm,
  resetStatusDelete,
  resetParams,
} = symptomSlice.actions;

export default symptomSlice.reducer;
