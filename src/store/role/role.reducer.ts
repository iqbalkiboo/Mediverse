import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  addRole,
  getListPermission,
  getListRole,
  updateRole,
} from '@/client/role/roleApi';

const metadata = {
  page: 1,
  per_page: 10,
  total_page: 0,
  total_row: 0,
};

const state = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  data: [],
};

const initialState = {
  ...state,
  metadata: metadata,
  isLoadingAdd: false,
  isErrorAdd: false,
  messageAdd: '',
  isSuccessAdd: false,
  permission: {
    ...state,
    metadata: metadata,
    isSuccess: false,
    isLoadingUpdate: false,
  },
  roleId: 0,
  roleName: '',
};

export const resolveRoleService = createAsyncThunk(
    'resolve/role/list',
    async (payload: {
      limit: number,
      page: number,
      search: any,
      status: any,
    }, {rejectWithValue}) => {
      const response = await getListRole(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response);
    },
);

export const resolveAddRole = createAsyncThunk(
    'resolve/role/add',
    async (payload: {
      name: string
    }, {rejectWithValue}) => {
      const response = await addRole(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveRolePermissionService = createAsyncThunk(
    'resolve/role/permission',
    async (payload: {
    id: number,
  }, {rejectWithValue}) => {
      const response = await getListPermission(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response);
    },
);

export const resolveUpdatePermission = createAsyncThunk(
    'resolve/role/update',
    async (payload: {
    permission: any,
    roleId: number,
  }, {rejectWithValue}) => {
      const response = await updateRole(payload);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response);
    },
);

const roleSlice = createSlice({
  name: 'role',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveRoleService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveRoleService.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.data = payload.data?.data || [];
      state.metadata = payload.data?.metadata;
    });
    builder.addCase(resolveRoleService.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage ='Something wrong!';
    });
    builder.addCase(resolveRolePermissionService.pending, (state) => {
      state.permission.isLoading = true;
      state.permission.isError = false;
    });
    builder.addCase(resolveRolePermissionService.fulfilled, (state, {payload}) => {
      state.permission.isLoading = false;
      state.permission.isError = false;
      state.permission.data = payload.data?.data || [];
      state.permission.metadata = payload.data?.metadata;
    });
    builder.addCase(resolveRolePermissionService.rejected, (state) => {
      state.permission.isLoading = false;
      state.permission.isError = true;
      state.permission.errorMessage ='Something wrong!';
    });
    builder.addCase(resolveUpdatePermission.pending, (state) => {
      state.permission.isLoadingUpdate = true;
      state.permission.isError = false;
      state.permission.isSuccess = false;
      state.permission.errorMessage = '';
    });
    builder.addCase(resolveUpdatePermission.fulfilled, (state, {payload}) => {
      state.permission.isLoadingUpdate = false;
      state.permission.isError = false;
      state.permission.isSuccess = true;
      state.permission.metadata = metadata;
    });
    builder.addCase(resolveUpdatePermission.rejected, (state) => {
      state.permission.isLoadingUpdate = false;
      state.permission.isError = true;
      state.permission.isSuccess = false;
      state.permission.errorMessage ='Something wrong!';
    });
    builder.addCase(resolveAddRole.pending, (state) => {
      state.isLoadingAdd = true;
      state.isErrorAdd = false;
      state.messageAdd = '';
      state.isSuccessAdd = false;
    });
    builder.addCase(resolveAddRole.fulfilled, (state, {payload}) => {
      state.isLoadingAdd = false;
      state.isErrorAdd = false;
      state.messageAdd = '';
      state.isSuccessAdd = true;
    });
    builder.addCase(resolveAddRole.rejected, (state) => {
      state.isLoadingAdd = false;
      state.isErrorAdd = true;
      state.isSuccessAdd = false;
      state.messageAdd = '';
    });
  },
  reducers: {
    setStateAdd: (state, {payload}) => {
      state[payload?.field] = payload.value;
    },
    setMetadata: (state, {payload}) => {
      state.metadata[payload?.field] = payload.value;
    },
    setStatePermission: (state, {payload}) => {
      state.permission[payload?.field] = payload.value;
    },
  },
});

export const {
  setStateAdd,
  setStatePermission,
} = roleSlice.actions;

export default roleSlice.reducer;
