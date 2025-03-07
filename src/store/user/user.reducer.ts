import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getListAddress,
  getListUser,
  getListUserClinic,
  getUserById,
  postUserBanned,
} from '@/src/client/user';

import type {
  IUserBannedPayload,
  IUserParams,
  IUserState,
} from '@/src/types/MasterUsers/mediverseUser';

const initialState: IUserState = {
  users: {
    data: [],
    roles: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    metadata: {
      page: 1,
      limit: 10,
      totalData: 1,
      totalPage: 1,
    },
  },
  user: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  userBanned: {
    text: '',
    status: '',
    reason: '',
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isModalOpen: false,
  },
  params: {
    search: '',
    page: 1,
    limit: 10,
    status: '',
    startDate: '',
    endDate: '',
  },
};

export const resolveListUser = createAsyncThunk(
  'resolve/user/list',
  async (payload: IUserParams, { rejectWithValue }) => {
    try {
      const response = await getListUser(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListUserClinic = createAsyncThunk(
  'resolve/user/list',
  async (payload: any, { rejectWithValue }) => {
    try {
      const params = {
        ...payload.params,
        provider_ids: payload.providerId,
        service_type: 'vaccination',
        is_mobile_user: true,
      };
      const response = await getListUserClinic(params);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListAddress = createAsyncThunk(
  'resolve/address/list',
  async (payload: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await getListAddress(payload.userId);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailUser = createAsyncThunk(
  'resolve/user/detail',
  async (payload: { id: string }, { rejectWithValue }) => {
    try {
      const response = await getUserById(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostBannedUser = createAsyncThunk(
  'resolve/user/banned',
  async (payload: IUserBannedPayload, { rejectWithValue }) => {
    try {
      const response = await postUserBanned(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    // Get List Mediverse Users
    builder.addCase(resolveListUser.pending, (state) => {
      state.users.isError = false;
      state.users.isLoading = true;
      state.users.isSuccess = false;
    });
    builder.addCase(resolveListUser.fulfilled, (state, { payload }) => {
      state.users.isError = false;
      state.users.isLoading = false;
      state.users.isSuccess = true;
      state.users.data = payload.data || [];
      state.users.roles = payload.data || [];
      state.users.metadata = payload.metadata;
    });
    builder.addCase(resolveListUser.rejected, (state) => {
      state.users.isError = true;
      state.users.isLoading = false;
      state.users.isSuccess = false;
      state.users.errorMessage = 'Something wrong!';
    });

    // Get Detail Mediverse Users
    builder.addCase(resolveDetailUser.pending, (state) => {
      state.user.isError = false;
      state.user.isLoading = true;
      state.user.isSuccess = false;
    });
    builder.addCase(resolveDetailUser.fulfilled, (state, { payload }) => {
      state.user.isError = false;
      state.user.isLoading = false;
      state.user.isSuccess = true;
      state.user.data = payload.data;
    });
    builder.addCase(resolveDetailUser.rejected, (state) => {
      state.user.isError = true;
      state.user.isLoading = false;
      state.user.isSuccess = false;
      state.user.errorMessage = 'Something wrong!';
    });

    // Update Status Mediverse User
    builder.addCase(resolvePostBannedUser.pending, (state) => {
      state.userBanned.isError = false;
      state.userBanned.isLoading = true;
      state.userBanned.isSuccess = false;
    });
    builder.addCase(resolvePostBannedUser.fulfilled, (state, { payload }) => {
      state.userBanned.isError = false;
      state.userBanned.isLoading = false;
      state.userBanned.isSuccess = true;
      state.userBanned.successMessage = 'Berhasil hapus user!';
    });
    builder.addCase(resolvePostBannedUser.rejected, (state) => {
      state.userBanned.isError = true;
      state.userBanned.isLoading = false;
      state.userBanned.isSuccess = false;
      state.userBanned.errorMessage = 'Something wrong!';
    });
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.field] = payload.value;
    },
    setIsOpenModalBanned: (state, { payload }) => {
      state.userBanned.isModalOpen = payload;
    },
    setBannedReason: (state, { payload }) => {
      state.userBanned.reason = payload;
    },
    setBannedText: (state, { payload }) => {
      state.userBanned.text = payload;
    },
    setModalStatus: (state, { payload }) => {
      state.userBanned.status = payload;
    },
    clearBannedUser: (state) => {
      state.userBanned = {
        text: '',
        status: '',
        reason: '',
        isError: false,
        isLoading: false,
        isSuccess: false,
        errorMessage: '',
        successMessage: '',
        isModalOpen: false,
      };
    },
    clearParamsValue: (state) => {
      state.params = {
        search: '',
        page: 1,
        limit: 10,
        status: '',
        startDate: '',
        endDate: '',
      };
    },
  },
});

export const {
  setParams,
  setBannedText,
  setModalStatus,
  setBannedReason,
  clearBannedUser,
  clearParamsValue,
  setIsOpenModalBanned,
} = userSlice.actions;

export default userSlice.reducer;
