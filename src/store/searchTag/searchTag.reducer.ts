import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getListMasterPoli,
  getListMasterService,
  getListMasterSpecialist,
  getProviders,
  patchRelated,
} from '@/client/masterConfiguration/searchTag';
import {getListSymptoms} from '@/client/masterConfiguration/searchTag';

type symptomParams = {
  search: string,
  status: string|boolean,
}

type providerParams = {
  keyword: string,
  showBanned: boolean | string,
  providerType: string,
  type: string,
};

export type relatedParams = {
  type: string,
  id: string,
  data: any[],
}

export type initialState = {
  isOpenModalConfirmation: boolean,
  providerType: string,
  searchType: {},
  menuType: {},
  providers: {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    errorMessage: string,
    data: any[]
  },
  masterServices: {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    errorMessage: string,
    data: any[]
  },
  searchSymptom: {},
  symptomName: string,
  symptoms: {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    errorMessage: string,
    data: any[],
  },
  masterPolis: {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    errorMessage: string,
    data: any[]
  },
  masterSpecialist: {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    errorMessage: string,
    data: any[]
  },
  relateds: {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    errorMessage: string,
    data: any,
    inputValue: string,
    isLocal: any
  },
}

const initialState: initialState = {
  isOpenModalConfirmation: false,
  providerType: '',
  searchType: {},
  menuType: {},
  providers: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    data: [],
  },
  symptomName: '',
  searchSymptom: {},
  symptoms: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    data: [],
  },
  masterServices: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    data: [],
  },
  masterPolis: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    data: [],
  },
  masterSpecialist: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    data: [],
  },
  relateds: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    inputValue: '',
    data: [],
    isLocal: [],
  },
};

export const resolveGetProviders = createAsyncThunk(
    'resolve/searchTag/providers',
    async (payload: providerParams, {rejectWithValue}) => {
      try {
        const response = await getProviders(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetSymptom = createAsyncThunk(
    'resolve/searchTag/symptomps',
    async (payload: symptomParams, {rejectWithValue}) => {
      try {
        const response = await getListSymptoms(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);
export const resolveGetListMasterService = createAsyncThunk(
    'resolve/searchTag/masterServices',
    async (payload, {rejectWithValue}) => {
      try {
        const response = await getListMasterService();
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetListMasterPoli = createAsyncThunk(
    'resolve/searchTag/masterPolis',
    async (payload, {rejectWithValue}) => {
      try {
        const response = await getListMasterPoli();
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetListMasterSpecialist = createAsyncThunk(
    'resolve/searchTag/masterSpecialist',
    async (payload, {rejectWithValue}) => {
      try {
        const response = await getListMasterSpecialist();
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePatchRelated = createAsyncThunk(
    'resolve/searchTag/patchRelated',
    async (payload: relatedParams, {rejectWithValue}) => {
      try {
        const response = await patchRelated(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const searchTagSlice = createSlice({
  name: 'searchTag',
  initialState,
  extraReducers: (builder) => {
    // Get List Provider
    builder.addCase(resolveGetProviders.pending, (state) => {
      state.providers.isLoading = true;
      state.providers.isError = false;
      state.providers.isSuccess = false;
      state.providers.errorMessage ='';
    });
    builder.addCase(resolveGetProviders.fulfilled, (state, {payload}) => {
      state.providers.isLoading = false;
      state.providers.isError = false;
      state.providers.isSuccess = true;
      state.providers.data = payload || [];
    });
    builder.addCase(resolveGetProviders.rejected, (state, {payload}) => {
      state.providers.isLoading = false;
      state.providers.isError = true;
      state.providers.isSuccess = false;
      state.providers.errorMessage = String(payload) || 'Something Wrong !';
    });
    builder.addCase(resolveGetSymptom.pending, (state) => {
      state.symptoms.isLoading = true;
      state.symptoms.isError = false;
      state.symptoms.isSuccess = false;
      state.symptoms.errorMessage = '';
    });
    builder.addCase(resolveGetSymptom.fulfilled, (state, {payload}) => {
      state.symptoms.isLoading = false;
      state.symptoms.isError = false;
      state.symptoms.isSuccess = true;
      state.symptoms.data = payload.data || [];
    });
    builder.addCase(resolveGetSymptom.rejected, (state, {payload}) => {
      state.symptoms.isLoading = false;
      state.symptoms.isError = true;
      state.symptoms.isSuccess = false;
      state.symptoms.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get List Master Service
    builder.addCase(resolveGetListMasterService.pending, (state) => {
      state.masterServices.isLoading = true;
      state.masterServices.isError = false;
      state.masterServices.isSuccess = false;
      state.masterServices.errorMessage ='';
    });
    builder.addCase(resolveGetListMasterService.fulfilled, (state, {payload}) => {
      state.masterServices.isLoading = false;
      state.masterServices.isError = false;
      state.masterServices.isSuccess = true;
      state.masterServices.data = payload.data || [];
    });
    builder.addCase(resolveGetListMasterService.rejected, (state, {payload}) => {
      state.masterServices.isLoading = false;
      state.masterServices.isError = true;
      state.masterServices.isSuccess = false;
      state.masterServices.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get List Master Poli
    builder.addCase(resolveGetListMasterPoli.pending, (state) => {
      state.masterPolis.isLoading = true;
      state.masterPolis.isError = false;
      state.masterPolis.isSuccess = false;
      state.masterPolis.errorMessage ='';
    });
    builder.addCase(resolveGetListMasterPoli.fulfilled, (state, {payload}) => {
      state.masterPolis.isLoading = false;
      state.masterPolis.isError = false;
      state.masterPolis.isSuccess = true;
      state.masterPolis.data = payload.data || [];
    });
    builder.addCase(resolveGetListMasterPoli.rejected, (state, {payload}) => {
      state.masterPolis.isLoading = false;
      state.masterPolis.isError = true;
      state.masterPolis.isSuccess = false;
      state.masterPolis.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get List Master Specialist
    builder.addCase(resolveGetListMasterSpecialist.pending, (state) => {
      state.masterSpecialist.isLoading = true;
      state.masterSpecialist.isError = false;
      state.masterSpecialist.isSuccess = false;
      state.masterSpecialist.errorMessage ='';
    });
    builder.addCase(resolveGetListMasterSpecialist.fulfilled, (state, {payload}) => {
      state.masterSpecialist.isLoading = false;
      state.masterSpecialist.isError = false;
      state.masterSpecialist.isSuccess = true;
      state.masterSpecialist.data = payload.data || [];
    });
    builder.addCase(resolveGetListMasterSpecialist.rejected, (state, {payload}) => {
      state.masterSpecialist.isLoading = false;
      state.masterSpecialist.isError = true;
      state.masterSpecialist.isSuccess = false;
      state.masterSpecialist.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Patch Related
    builder.addCase(resolvePatchRelated.pending, (state) => {
      state.relateds.isLoading = true;
      state.relateds.isError = false;
      state.relateds.isSuccess = false;
      state.relateds.errorMessage ='';
    });
    builder.addCase(resolvePatchRelated.fulfilled, (state, {payload}) => {
      state.relateds.isLoading = false;
      state.relateds.isError = false;
      state.relateds.isSuccess = true;
      state.isOpenModalConfirmation = false;
    });
    builder.addCase(resolvePatchRelated.rejected, (state, {payload}) => {
      state.relateds.isLoading = false;
      state.relateds.isError = true;
      state.relateds.isSuccess = false;
      state.isOpenModalConfirmation = false;
      state.relateds.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setProviderType: (state, {payload}) => {
      state.providerType = payload.value;
    },
    setSearchType: (state, {payload}) => {
      state.searchType = payload.value;
    },
    setSearchSymptom: (state, {payload}) => {
      state.searchSymptom = payload.value;
    },
    setSymptomName: (state, {payload}) => {
      state.symptomName = payload.value;
    },
    setMenuType: (state, {payload}) => {
      state.menuType = payload.value;
    },
    setClearSearchType: (state) => {
      state.searchType = initialState.searchType;
    },
    setClearMenuType: (state) => {
      state.menuType = initialState.menuType;
    },
    addRelated: (state, {payload}) => {
      payload.value.forEach((item) => {
        state.relateds.isLocal.push({name: item, isLocal: payload.isLocal});
        state.relateds.data.push(item);
      });
    },
    resetProvidersType: (state) =>{
      state = initialState;
    },
    resetStatus: (state, {payload}) => {
      state[payload.name].isError = false;
      state[payload.name].isSuccess = false;
      state[payload.name].isLoading = false;
    },
    resetRelated: (state) => {
      if (state.relateds.data.length >= 1 || state.relateds.isLocal.length >= 1) {
        state.relateds.data = [];
        state.relateds.isLocal = [];
      }
    },
    setRelatedInputValue: (state, {payload}) => {
      state.relateds.inputValue = payload.value;
    },
    removeRelated: (state, {payload}) => {
      const currentData = state.relateds.data;
      const currentDataLocal = state.relateds.isLocal;
      currentData.splice(payload.value, 1);
      currentDataLocal.splice(payload.value, 1);
      state.relateds.data = currentData;
      state.relateds.isLocal = currentDataLocal;
    },
    setOpenModal: (state, {payload}) => {
      state[payload.field] = payload.value;
    },
  },
});

export const {
  setMenuType,
  setSearchType,
  setProviderType,
  setClearMenuType,
  setSearchSymptom,
  setSymptomName,
  setClearSearchType,
  addRelated,
  resetStatus,
  resetRelated,
  setRelatedInputValue,
  removeRelated,
  setOpenModal,
  resetProvidersType,
} = searchTagSlice.actions;

export default searchTagSlice.reducer;
