import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getListClinicByDoctor,
  getUserDetail,
  getUserProviders,
} from '@/src/client/user';
import { resetPassword } from '@/src/client/permission';
import { getDetailProvider } from '@/src/client/provider';
import { getDetailPharmacyElastic } from '@/src/client/pharmacy';
import { getGeneralSetting } from '@/src/client/general';
import { loginApi } from '@/client/auth/loginApi';

const initialState = {
  isLoading: false,
  isError: false,
  isListClinicError: false,
  isListClinicLoading: false,
  isListClinicSuccess: false,
  errorMessage: '',
  data: {},
  listClinic: [],
  username: '',
  password: '',
  validation: {
    isValid: false,
    username: '',
  },
  forgot: {
    isLoading: false,
    email: '',
    isError: false,
    errorMessage: '',
    validation: false,
    isSuccess: false,
  },
  newPassword: {
    isLoading: false,
    password: '',
    rePassword: '',
    isError: false,
    errorMessage: '',
  },
  userDetails: {},
  providers: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    detail: {},
    detailStatus: 0,
  },
  pharmacy: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  general: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
};

export const resolveLoginService = createAsyncThunk(
  'resolve/auth/login',
  async (
    payload: {
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const response = await loginApi({
      username: payload.username,
      password: payload.password,
    });
    if (response.error !== null) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveForgotPassword = createAsyncThunk(
  'resolve/auth/forgot',
  async (
    payload: {
      email: string;
    },
    { rejectWithValue }
  ) => {
    const response = await resetPassword(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetUserDetail = createAsyncThunk(
  'resolve/user/detail',
  async (payload: void, { rejectWithValue }) => {
    const response = await getUserDetail();
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetUserProviders = createAsyncThunk(
  'resolve/user/providers',
  async (payload: void, { rejectWithValue }) => {
    const response = await getUserProviders();
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveListClinicByDoctor = createAsyncThunk(
  'resolve/clinic/list',
  async (
    payload: {
      id: string;
      channelId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getListClinicByDoctor(payload.id, payload.channelId);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetDetailProvider = createAsyncThunk(
  'resolve/detail/provider',
  async (
    payload: {
      id: string;
      type: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailProvider(payload.id, payload.type);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetGeneralSetting = createAsyncThunk(
  'resolve/detail/general-seeting',
  async (payload, { rejectWithValue }) => {
    const response = await getGeneralSetting();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetDetailPharmacy = createAsyncThunk(
  'resolve/detail/pharmacy',
  async (payload: { id: string; type: string }, { rejectWithValue }) => {
    const response = await getDetailPharmacyElastic(payload.id, payload.type);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveLoginService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveLoginService.fulfilled, (state, { payload }) => {
      if (payload?.data) {
        state.isLoading = false;
        state.isError = false;
        state.data = payload.data;
      } else {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload.Exception ?? payload.message;
      }
    });
    builder.addCase(resolveLoginService.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = 'Email atau Password yang anda masukkan salah';
    });

    builder.addCase(resolveForgotPassword.pending, (state) => {
      state.forgot.isLoading = true;
      state.forgot.isError = false;
      state.forgot.errorMessage = '';
    });
    builder.addCase(resolveForgotPassword.fulfilled, (state) => {
      state.forgot.isLoading = false;
      state.forgot.isSuccess = true;
      state.forgot.errorMessage = '';
    });
    builder.addCase(
      resolveForgotPassword.rejected,
      (state, { payload }: any) => {
        state.forgot.isLoading = false;
        state.forgot.isError = true;
        state.forgot.errorMessage = payload?.data?.message;
      }
    );

    builder.addCase(resolveGetUserDetail.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveGetUserDetail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.userDetails = payload.data?.data || {};
    });
    builder.addCase(resolveGetUserDetail.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = 'Something wrong!';
    });

    builder.addCase(resolveListClinicByDoctor.pending, (state) => {
      state.isListClinicError = false;
      state.isListClinicLoading = true;
      state.isListClinicSuccess = false;
    });
    builder.addCase(
      resolveListClinicByDoctor.fulfilled,
      (state, { payload }) => {
        state.isListClinicError = false;
        state.isListClinicLoading = false;
        state.isListClinicSuccess = true;
        state.listClinic = payload.data || [];
      }
    );
    builder.addCase(resolveListClinicByDoctor.rejected, (state) => {
      state.isListClinicError = true;
      state.isListClinicLoading = false;
      state.isListClinicSuccess = false;
      state.errorMessage = 'Something wrong!';
    });

    builder.addCase(resolveGetUserProviders.pending, (state) => {
      state.providers.isError = false;
      state.providers.isLoading = true;
      state.providers.errorMessage = '';
    });
    builder.addCase(resolveGetUserProviders.fulfilled, (state, { payload }) => {
      state.providers.isError = false;
      state.providers.isLoading = false;
      state.providers.errorMessage = '';
      state.providers.data = payload.data || [];
    });
    builder.addCase(resolveGetUserProviders.rejected, (state) => {
      state.providers.isError = true;
      state.providers.isLoading = false;
      state.providers.errorMessage = '';
      state.errorMessage = 'Something wrong!';
    });

    builder.addCase(resolveGetDetailProvider.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(
      resolveGetDetailProvider.fulfilled,
      (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.providers.detail = payload.data || {};
      }
    );
    builder.addCase(
      resolveGetDetailProvider.rejected,
      (state, { payload }: any) => {
        if (payload.status !== 401) {
          state.errorMessage = payload.data.message;
        }
        state.providers.detailStatus = payload.status;
        state.isError = true;
        state.isLoading = false;
      }
    );

    builder.addCase(resolveGetDetailPharmacy.pending, (state) => {
      state.pharmacy.isError = false;
      state.pharmacy.isLoading = true;
    });
    builder.addCase(
      resolveGetDetailPharmacy.fulfilled,
      (state, { payload }) => {
        state.pharmacy.isLoading = false;
        state.pharmacy.isError = false;
        state.pharmacy.data = payload.item;
      }
    );
    builder.addCase(resolveGetDetailPharmacy.rejected, (state) => {
      state.pharmacy.isError = true;
      state.pharmacy.isLoading = false;
      state.pharmacy.errorMessage = 'Something wrong';
    });

    builder.addCase(resolveGetGeneralSetting.pending, (state) => {
      state.general.isError = false;
      state.general.isLoading = true;
    });
    builder.addCase(
      resolveGetGeneralSetting.fulfilled,
      (state, { payload }) => {
        state.general.isLoading = false;
        state.general.isError = false;
        state.general.data = payload.data;
      }
    );
    builder.addCase(resolveGetGeneralSetting.rejected, (state) => {
      state.general.isError = true;
      state.general.isLoading = false;
      state.general.errorMessage = 'Something wrong';
    });
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsErrorUsername: (state, action) => {
      state.validation.username = action.payload;
    },
    setIsValidValidation: (state, action) => {
      state.validation.isValid = action.payload;
    },
    setForgotEmail: (state, action) => {
      state.forgot.email = action.payload;
    },
    setIsErrorForgot: (state, action) => {
      state.forgot.validation = action.payload;
    },
    setResetState: () => initialState,
    setNewPassword: (state, action) => {
      state.newPassword.password = action.payload;
    },
    setNewRePassword: (state, action) => {
      state.newPassword.rePassword = action.payload;
    },
    resetForgotPassword: (state) => {
      state.forgot = initialState.forgot;
    },
    resetStatusForgot: (state) => {
      state.forgot.isLoading = false;
      state.forgot.isError = false;
      state.forgot.isSuccess = false;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setIsErrorUsername,
  setIsValidValidation,
  setErrorMessage,
  setForgotEmail,
  setIsErrorForgot,
  setNewPassword,
  setNewRePassword,
  setResetState,
  resetForgotPassword,
  resetStatusForgot,
} = authSlice.actions;

export default authSlice.reducer;
