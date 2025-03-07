import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  deletePrivacyPolicy,
  getDetailPrivacyPolicy,
  getListPrivacyPolicy,
  patchStatusPrivacyPolicy,
  postPrivacyPolicy,
  putPrivacyPolicy,
} from '@/client/privacyPolicy';

const initialState = {
  privacyPolicies: {
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
  privacyPolicy: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  formPrivacyPolicy: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  modalUpdateStatusPrivacyPolicy: {
    flag: '',
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
    status: '',
    search: '',
    endDate: '',
    category: '',
    startDate: '',
  },
};

export const resolveListPrivacyPolicy = createAsyncThunk(
    'privacyPolicy/list',
    async (payload: any, {rejectWithValue}) => {
      const response = await getListPrivacyPolicy(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveDetailPrivacyPolicy = createAsyncThunk(
    'privacyPolicy/detail',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDetailPrivacyPolicy(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolvePostPrivacyPolicy = createAsyncThunk(
    'privacyPolicy/post',
    async (payload: any, {rejectWithValue}) => {
      const response = await postPrivacyPolicy(payload.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolvePutPrivacyPolicy = createAsyncThunk(
    'privacyPolicy/put',
    async (payload: any, {rejectWithValue}) => {
      const response = await putPrivacyPolicy(payload.data, payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolvePatchPrivacyPolicy = createAsyncThunk(
    'resolve/privacyPolicy/patch',
    async (payload: {
  id: string,
  data: any,
}, {rejectWithValue}) => {
      const response = await patchStatusPrivacyPolicy(payload.id, payload.data);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveDeletePrivacyPolicy = createAsyncThunk(
    'resolve/privacyPolicy/delete',
    async (payload: {
  id: any
}, {rejectWithValue}) => {
      const response = await deletePrivacyPolicy(payload.id);
      if (!response.error) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response.data.message);
    },
);

const privacyPolicySlice = createSlice({
  name: 'privacyPolicy',
  initialState,
  extraReducers: (builder) => {
    // Get List Privacy Policy
    builder.addCase(resolveListPrivacyPolicy.pending, (state) => {
      state.privacyPolicies.isLoading = true;
      state.privacyPolicies.isError = false;
    });
    builder.addCase(resolveListPrivacyPolicy.fulfilled, (state, {payload}) => {
      state.privacyPolicies.isLoading = false;
      state.privacyPolicies.isError = false;
      state.privacyPolicies.data = payload.data;

      // Metadata List Privacy Policy
      state.privacyPolicies.metadata.page = payload?.metadata?.page || 1;
      state.privacyPolicies.metadata.size = payload?.metadata?.per_page || 10;
      state.privacyPolicies.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.privacyPolicies.metadata.totalData = payload?.metadata?.total_row || 10;
    });
    builder.addCase(resolveListPrivacyPolicy.rejected, (state, {payload}) => {
      state.privacyPolicies.isLoading = false;
      state.privacyPolicies.isError = true;
      state.privacyPolicies.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get Detail Privacy Policy
    builder.addCase(resolveDetailPrivacyPolicy.pending, (state) => {
      state.privacyPolicy.isLoading = true;
      state.privacyPolicy.isError = false;
    });
    builder.addCase(resolveDetailPrivacyPolicy.fulfilled, (state, {payload}) => {
      state.privacyPolicy.isLoading = false;
      state.privacyPolicy.isError = false;
      state.privacyPolicy.data = payload.data;
    });
    builder.addCase(resolveDetailPrivacyPolicy.rejected, (state, {payload}) => {
      state.privacyPolicy.isLoading = false;
      state.privacyPolicy.isError = true;
      state.privacyPolicy.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Post Create Privacy Policy
    builder.addCase(resolvePostPrivacyPolicy.pending, (state) => {
      state.formPrivacyPolicy.isLoading = true;
      state.formPrivacyPolicy.isError = false;
    });
    builder.addCase(resolvePostPrivacyPolicy.fulfilled, (state, {payload}) => {
      state.formPrivacyPolicy.isLoading = false;
      state.formPrivacyPolicy.isSuccess = true;
    });
    builder.addCase(resolvePostPrivacyPolicy.rejected, (state, {payload}) => {
      state.formPrivacyPolicy.isLoading = false;
      state.formPrivacyPolicy.isError = true;
      state.formPrivacyPolicy.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put Update Privacy Policy
    builder.addCase(resolvePutPrivacyPolicy.pending, (state) => {
      state.formPrivacyPolicy.isLoading = true;
      state.formPrivacyPolicy.isError = false;
    });
    builder.addCase(resolvePutPrivacyPolicy.fulfilled, (state, {payload}) => {
      state.formPrivacyPolicy.isLoading = false;
      state.formPrivacyPolicy.isSuccess = true;
    });
    builder.addCase(resolvePutPrivacyPolicy.rejected, (state, {payload}) => {
      state.formPrivacyPolicy.isLoading = false;
      state.formPrivacyPolicy.isError = true;
      state.formPrivacyPolicy.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Patch Update Status Privacy Policy
    builder.addCase(resolvePatchPrivacyPolicy.pending, (state) => {
      state.modalUpdateStatusPrivacyPolicy.isError = false;
      state.modalUpdateStatusPrivacyPolicy.isLoading = true;
      state.modalUpdateStatusPrivacyPolicy.isSuccess = false;
    });
    builder.addCase(resolvePatchPrivacyPolicy.fulfilled, (state, {payload}) => {
      state.modalUpdateStatusPrivacyPolicy.isLoading = false;
      state.modalUpdateStatusPrivacyPolicy.isError = false;
      state.modalUpdateStatusPrivacyPolicy.isSuccess = true;
      state.modalUpdateStatusPrivacyPolicy.successMessage = 'Berhasil mengupdate status privacy policy !';
    });
    builder.addCase(resolvePatchPrivacyPolicy.rejected, (state, {payload}) => {
      state.modalUpdateStatusPrivacyPolicy.isError = true;
      state.modalUpdateStatusPrivacyPolicy.isLoading = false;
      state.modalUpdateStatusPrivacyPolicy.isSuccess = false;
      state.modalUpdateStatusPrivacyPolicy.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Delete Privacy Policy
    builder.addCase(resolveDeletePrivacyPolicy.pending, (state) => {
      state.modalUpdateStatusPrivacyPolicy.isLoading = true;
      state.modalUpdateStatusPrivacyPolicy.isError = false;
    });
    builder.addCase(resolveDeletePrivacyPolicy.fulfilled, (state, {payload}: any) => {
      if (payload.data.message) {
        state.modalUpdateStatusPrivacyPolicy.isLoading = false;
        state.modalUpdateStatusPrivacyPolicy.isError = false;
        state.modalUpdateStatusPrivacyPolicy.isSuccess = true;
        state.modalUpdateStatusPrivacyPolicy.successMessage = 'Berhasil menghapus privacy policy';
      } else {
        state.modalUpdateStatusPrivacyPolicy.isLoading = false;
        state.modalUpdateStatusPrivacyPolicy.isError = true;
        state.modalUpdateStatusPrivacyPolicy.errorMessage = String(payload.error.message);
      }
    });
    builder.addCase(resolveDeletePrivacyPolicy.rejected, (state, {payload}) => {
      state.modalUpdateStatusPrivacyPolicy.isLoading = false;
      state.modalUpdateStatusPrivacyPolicy.isError = true;
      state.modalUpdateStatusPrivacyPolicy.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setFlagModalUpdateStatusPrivacyPolicy: (state, {payload}) => {
      state.modalUpdateStatusPrivacyPolicy.flag = payload;
    },
    resetFormPrivacyPolicy: (state) => {
      state.formPrivacyPolicy = initialState.formPrivacyPolicy;
    },
  },
});

export const {
  setModal,
  setParams,
  resetFormPrivacyPolicy,
  setFlagModalUpdateStatusPrivacyPolicy,
} = privacyPolicySlice.actions;

export default privacyPolicySlice.reducer;
