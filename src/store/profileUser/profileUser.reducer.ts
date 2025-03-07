import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  changePassword,
  getMe,
  putMe,
} from '@/src/client/profileUser';

import {IProfileUserState} from '@/src/types/ProfileUser';

const initialState: IProfileUserState = {
  me: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  formMe: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isConfirmation: false,
    errorMessage: '',
    successMessage: '',
    form: {
      name: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      photoProfile: '',
      confirmationNewPassword: '',
    },
  },
  formChangePassword: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isConfirmation: false,
    errorMessage: '',
    successMessage: '',
    form: {
      oldPassword: '',
      newPassword: '',
      confirmationNewPassword: '',
    },
  },
  isOpenOldPassword: false,
  isOpenNewPassword: false,
  isOpenConfirmationNewPassword: false,
};

export const resolveGetMe = createAsyncThunk(
    'resolve/me/get',
    async (payload: void, {rejectWithValue}) => {
      const response = await getMe();
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolvePutMe = createAsyncThunk(
    'resolve/me/put',
    async (payload: {data: any}, {rejectWithValue}) => {
      const response = await putMe(payload.data);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

export const resolveChangePassword = createAsyncThunk(
    'profileUser/changePassword',
    async (payload: {
      old_password: string,
      new_password: string,
    }, {rejectWithValue}) => {
      const response = await changePassword(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

const profileUserSlice = createSlice({
  name: 'profileUser',
  initialState,
  extraReducers: (builder) => {
    // Get User Detail
    builder.addCase(resolveGetMe.pending, (state) => {
      state.me.isLoading = true;
      state.me.isError = false;
    });
    builder.addCase(resolveGetMe.fulfilled, (state, {payload}) => {
      state.me.isLoading = false;
      state.me.isError = false;
      state.me = payload.data || {};
    });
    builder.addCase(resolveGetMe.rejected, (state) => {
      state.me.isError = true;
      state.me.isLoading = false;
      state.me.errorMessage = 'Something wrong!';
    });

    // Put Me
    builder.addCase(resolvePutMe.pending, (state) => {
      state.formMe.isLoading = true;
      state.formMe.isError = false;
    });
    builder.addCase(resolvePutMe.fulfilled, (state, {payload}) => {
      state.formMe.isLoading = false;
      state.formMe.isSuccess = true;
      state.formMe.successMessage = 'Berhasil mengupdate kategori obat';
    });
    builder.addCase(resolvePutMe.rejected, (state, {payload}) => {
      state.formMe.isLoading = false;
      state.formMe.isError = true;
      state.formMe.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Post Change Password
    builder.addCase(resolveChangePassword.pending, (state) => {
      state.formChangePassword.isLoading = true;
      state.formChangePassword.isError = false;
    });
    builder.addCase(resolveChangePassword.fulfilled, (state, {payload}) => {
      state.formChangePassword.isLoading = false;
      state.formChangePassword.isSuccess = true;
      state.formChangePassword.successMessage = 'Berhasil mengupdate kategori obat';
    });
    builder.addCase(resolveChangePassword.rejected, (state, {payload}: any) => {
      state.formChangePassword.isLoading = false;
      state.formChangePassword.isError = true;
      state.formChangePassword.errorMessage = String(payload?.data?.message) || 'Something Wrong !';
    });
  },
  reducers: {
    setFormMe: (state, {payload}) => {
      state.formMe.form[payload.field] = payload.value;
    },
    setFormChangePassword: (state, {payload}) => {
      state.formChangePassword.form[payload.field] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.name] = payload.value;
    },
    setOpenPassword: (state, {payload}) => {
      state[payload.field] = payload.value;
    },
    resetFormMe: (state) => {
      state.formMe = initialState.formMe;
    },
    resetFormChangePassword: (state) => {
      state.formChangePassword = initialState.formChangePassword;
    },
  },
});

export const {
  setModal,
  setFormMe,
  resetFormMe,
  setOpenPassword,
  setFormChangePassword,
  resetFormChangePassword,
} = profileUserSlice.actions;

export default profileUserSlice.reducer;
