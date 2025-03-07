import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getGeneralSetting,
  putGeneralSetting,
} from '@/src/client/general';

const initialState = {
  generalSetting: {
    isLoading: false,
    isError: false,
    errorMessage: {},
    data: {},
  },
  formGeneralSetting: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    successMessage: '',
    errorMessage: '',
    isPpnSetting: false,
    form: {
      ppn: 0,
    },
  },
};

export const resolveGeneralSetting = createAsyncThunk(
    'resolve/generalSetting/data',
    async (payload, {rejectWithValue}) => {
      const response = await getGeneralSetting();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolvePutGeneralSetting = createAsyncThunk(
    'resolve/generalSetting/put',
    async (payload: {
    key: string,
    data: any,
  }, {rejectWithValue}) => {
      const response = await putGeneralSetting(payload.key, payload.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

const generalSlice = createSlice({
  name: 'general',
  initialState,
  extraReducers: (builder) => {
    // Get Data General Setting
    builder.addCase(resolveGeneralSetting.pending, (state) => {
      state.generalSetting.isLoading = true;
      state.generalSetting.isError = false;
    });
    builder.addCase(resolveGeneralSetting.fulfilled, (state, {payload}) => {
      state.generalSetting.isLoading = false;
      state.generalSetting.isError = false;
      state.generalSetting.data = payload.data || {};
    });
    builder.addCase(resolveGeneralSetting.rejected, (state, {payload}) => {
      state.generalSetting.isLoading = false;
      state.generalSetting.isError = true;
      state.generalSetting.errorMessage = 'Data General Setting Tidak Di Temukan';
    });

    // Put General Setting
    builder.addCase(resolvePutGeneralSetting.pending, (state) => {
      state.formGeneralSetting.isLoading = true;
      state.formGeneralSetting.isError = false;
    });
    builder.addCase(resolvePutGeneralSetting.fulfilled, (state, {payload}) => {
      state.formGeneralSetting.isLoading = false;
      state.formGeneralSetting.isSuccess = true;
      state.formGeneralSetting.successMessage = 'Berhasil melakukan perubahan master data di general';
    });
    builder.addCase(resolvePutGeneralSetting.rejected, (state, {payload}) => {
      state.formGeneralSetting.isLoading = false;
      state.formGeneralSetting.isError = true;
      state.formGeneralSetting.errorMessage = String(payload) || 'Gagal melakukan perubahan master data di general';
    });
  },
  reducers: {
    setModal: (state, {payload}) => {
      state[payload.state][payload.name] = payload.value;
    },
    setFormGeneralSetting: (state, {payload}) => {
      state.formGeneralSetting.form[payload.name] = payload.value;
    },
    resetFormGeneralSetting: (state) => {
      state.formGeneralSetting = initialState.formGeneralSetting;
    },
  },
});
export const {
  setModal,
  setFormGeneralSetting,
  resetFormGeneralSetting,
} = generalSlice.actions;

export default generalSlice.reducer;

