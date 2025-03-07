import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  getListAdmin,
  getListOutlet,
  postData,
  putData,
  resetPassword,
} from '@/client/permission';

import {
  IAdminState,
  IParamsGetListAdmin,
  IParamsGetListProvider,
} from '@/src/types/MasterUsers/admins';

import {getListRole} from '@/client/role/roleApi';
import {
  cahngeStatusUser,
  getUserById,
  patchSecondaryProvider,
  getPatientById,
} from '@/src/client/user';
import {getDataList as getListProvider} from '@/client/provider';

const initialState: IAdminState = {
  admins: {
    data: [],
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
  admin: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    providers: [
      {
        type: '',
        provider: '',
      },
    ],
  },
  patient: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    providers: [
      {
        type: '',
        provider: '',
      },
    ],
  },
  providers: {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
  },
  outlets: {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  roles: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
  },
  adminForm: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isModalOpen: false,
    data: {
      type: '',
      email: '',
      category: 0,
      provider: 0,
      full_name: '',
      phone_number: '',
      role: 0,
      doctor: 0,
      providers: [
        {
          type: '',
          provider: 0,
        },
      ],
    },
  },
  suspend: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    isModalOpen: false,
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    endDate: '',
    startDate: '',
  },
  form: {
    type: '',
    email: '',
    category: 0,
    provider: 0,
    full_name: '',
    phone_number: '',
  },
  resetPassword: {
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    isModalConfirmOpen: false,
  },
  secondaryProvider: {
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    form: {
      type: '',
      provider: 0,
    },
    isModalAddOpen: false,
  },
};

export const resolveGetListAdmin = createAsyncThunk(
    'admin/resolveGetListAdmin',
    async (payload: IParamsGetListAdmin, {rejectWithValue}) => {
      try {
        const response = await getListAdmin(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetDetailAdmin = createAsyncThunk(
    'admin/resolveGetDetailAdmin',
    async (payload: {id: string}, {rejectWithValue}) => {
      try {
        const response = await getUserById(payload.id);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetDetailPatient = createAsyncThunk(
  'admin/resolveGetDetailPatient',
  async (payload: { id: string }, { rejectWithValue }) => {
    try {
      const response = await getPatientById(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetListProvider = createAsyncThunk(
    'admin/resolveGetListProvider',
    async (payload: IParamsGetListProvider, {rejectWithValue}) => {
      const response = await getListProvider(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveCreateData = createAsyncThunk(
    'resolve/resolveCreateData',
    async (payload: any, {rejectWithValue}) => {
      const response = await postData(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveUpdateData = createAsyncThunk(
    'resolve/resolveUpdateData',
    async (payload: any, {rejectWithValue}) => {
      const response = await putData(payload.id, payload.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveRoleService = createAsyncThunk(
    'resolve/resolveRoleService',
    async (payload: any, {rejectWithValue}) => {
      const response = await getListRole(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveListOutlet = createAsyncThunk(
    'resolver/resolveListOutlet',
    async (payload: any, {rejectWithValue}) => {
      const response = await getListOutlet(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveChangeStatusUser = createAsyncThunk(
    'resolver/resolveChangeStatusUser',
    async (payload: any, {rejectWithValue}) => {
      const response = await cahngeStatusUser(payload.id, payload.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveResetPassword = createAsyncThunk(
    'resolve/admin/resetPassword',
    async (payload: {email: string}, {rejectWithValue}) => {
      const response = await resetPassword(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveAddSecondaryProvider = createAsyncThunk(
    'resovle/admin/add/secondaryProvider',
    async (payload: {id: string, data: any}, {rejectWithValue}) => {
      const response = await patchSecondaryProvider(payload.id, payload.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  extraReducers: (builder) => {
    // Get All Admin
    builder.addCase(resolveGetListAdmin.pending, (state) => {
      state.admins.isLoading = true;
      state.admins.isError = false;
      state.admins.isSuccess = false;
      state.admins.errorMessage = '';
    });
    builder.addCase(resolveGetListAdmin.fulfilled, (state, {payload}) => {
      state.admins.isLoading = false;
      state.admins.isError = false;
      state.admins.isSuccess = true;
      state.admins.data = payload.data || [];
      state.admins.metadata = {
        page: payload.metadata?.page || 1,
        limit: payload.metadata?.limit || 10,
        totalData: payload.metadata?.totalData || 1,
        totalPage: payload.metadata?.totalPage || 1,
      };
    });
    builder.addCase(resolveGetListAdmin.rejected, (state, {payload}) => {
      state.admins.isLoading = false;
      state.admins.isError = true;
      state.admins.isSuccess = false;
      state.admins.errorMessage = 'Something wrong!';
    });

    // Get Detail Admin
    builder.addCase(resolveGetDetailAdmin.pending, (state) => {
      state.admin.isLoading = true;
      state.admin.isError = false;
      state.admin.isSuccess = false;
    });
    builder.addCase(resolveGetDetailAdmin.fulfilled, (state, {payload}) => {
      state.admin.isLoading = false;
      state.admin.isError = false;
      state.admin.isSuccess = true;
      state.admin.data = payload.data;
      state.adminForm.data.provider = payload.data?.provider_id || '';
      state.admin.providers[0].type = payload.data.provider_type;
      state.admin.providers[0].provider = payload.data.provider_id;
      if (payload.data.secondary_provider_type) {
        const secondaryProvider = {
          type: payload.data.secondary_provider_type,
          provider: payload.data.secondary_provider_id,
        };
        state.admin.providers[1] = secondaryProvider;
      }
    });
    builder.addCase(resolveGetDetailAdmin.rejected, (state, {payload}: any) => {
      state.admin.isLoading = false;
      state.admin.isError = true;
      state.admin.isSuccess = false;
      // clear value admin when data not found
      state.admin.data = {};
      state.admin.errorMessage = payload.data?.message || 'Something wrong!';
    });

    // PATIENT 
    builder.addCase(resolveGetDetailPatient.pending, (state) => {
      state.patient.isLoading = true;
      state.patient.isError = false;
      state.patient.isSuccess = false;
    });
    builder.addCase(resolveGetDetailPatient.fulfilled, (state, { payload }) => {
      state.patient.isLoading = false;
      state.patient.isError = false;
      state.patient.isSuccess = true;
      state.patient.data = payload.data;
      state.adminForm.data.provider = payload.data?.provider_id || '';
      state.patient.providers[0].type = payload.data.provider_type;
      state.patient.providers[0].provider = payload.data.provider_id;
      if (payload.data.secondary_provider_type) {
        const secondaryProvider = {
          type: payload.data.secondary_provider_type,
          provider: payload.data.secondary_provider_id,
        };
        state.patient.providers[1] = secondaryProvider;
      }
    });
    builder.addCase(
      resolveGetDetailPatient.rejected,
      (state, { payload }: any) => {
        state.patient.isLoading = false;
        state.patient.isError = true;
        state.patient.isSuccess = false;
        // clear value patient when data not found
        state.patient.data = {};
        state.patient.errorMessage = payload.data?.message || 'Something wrong!';
      }
    );

    // Get List Provider
    builder.addCase(resolveGetListProvider.pending, (state) => {
      state.providers.isLoading = true;
      state.providers.isError = false;
      state.providers.isSuccess = false;
    });
    builder.addCase(resolveGetListProvider.fulfilled, (state, {payload}) => {
      state.providers.isLoading = false;
      state.providers.isError = false;
      state.providers.isSuccess = true;
      state.providers.data = payload.data;
    });
    builder.addCase(resolveGetListProvider.rejected, (state, {payload}) => {
      state.providers.isLoading = false;
      state.providers.isError = true;
      state.providers.isSuccess = false;
    });

    // Get List Roles
    builder.addCase(resolveRoleService.pending, (state) => {
      state.roles.isLoading = true;
      state.roles.isError = false;
      state.roles.isSuccess = false;
    });
    builder.addCase(resolveRoleService.fulfilled, (state, {payload}) => {
      state.roles.isLoading = false;
      state.roles.isError = false;
      state.roles.isSuccess = true;
      state.roles.data = (payload.data || []);
    });
    builder.addCase(resolveRoleService.rejected, (state, {payload}) => {
      state.roles.isLoading = false;
      state.roles.isError = true;
      state.roles.isSuccess = false;
    });

    // Get List Outlets
    builder.addCase(resolveListOutlet.pending, (state) => {
      state.outlets.isLoading = true;
      state.outlets.isError = false;
      state.outlets.isSuccess = false;
    });
    builder.addCase(resolveListOutlet.fulfilled, (state, {payload}) => {
      state.outlets.isLoading = false;
      state.outlets.isError = false;
      state.outlets.isSuccess = true;
      state.outlets.data = payload || [];
    });
    builder.addCase(resolveListOutlet.rejected, (state, {payload}) => {
      state.outlets.isLoading = false;
      state.outlets.isError = true;
      state.outlets.isSuccess = false;
    });

    // Create Data Admin
    builder.addCase(resolveCreateData.pending, (state) => {
      state.adminForm.isLoading = true;
      state.adminForm.isError = false;
      state.adminForm.errorMessage = '';
    });
    builder.addCase(resolveCreateData.fulfilled, (state, {payload}) => {
      state.adminForm.isLoading = false;
      state.adminForm.isError = false;
      state.adminForm.isSuccess = true;
      state.adminForm.successMessage = payload.message;
      state.adminForm.data = initialState.adminForm.data;
      state.adminForm.isModalOpen = false;
    });
    builder.addCase(resolveCreateData.rejected, (state, {payload}: any) => {
      state.adminForm.isLoading = false;
      state.adminForm.isError = true;
      state.adminForm.isSuccess = false;
      state.adminForm.errorMessage = payload.data?.message || 'Create user is failed!';
    });

    // Update Data Admin
    builder.addCase(resolveUpdateData.pending, (state) => {
      state.adminForm.isLoading = true;
      state.adminForm.isError = false;
      state.adminForm.isSuccess = false;
      state.adminForm.errorMessage = '';
    });
    builder.addCase(resolveUpdateData.fulfilled, (state, {payload}) => {
      state.adminForm.isLoading = false;
      state.adminForm.isError = false;
      state.adminForm.isSuccess = true;
      state.adminForm.successMessage = payload.message;
      state.adminForm.data = initialState.adminForm.data;
      state.adminForm.isModalOpen = false;
    });
    builder.addCase(resolveUpdateData.rejected, (state, {payload}) => {
      state.adminForm.isLoading = false;
      state.adminForm.isError = true;
      state.adminForm.isSuccess = false;
      state.adminForm.errorMessage = 'Update user gagal.';
    });

    // Suspend Data Admin
    builder.addCase(resolveChangeStatusUser.pending, (state) => {
      state.suspend.isLoading = true;
      state.suspend.isError = false;
      state.suspend.errorMessage = '';
    });
    builder.addCase(resolveChangeStatusUser.fulfilled, (state, {payload}) => {
      state.suspend.isLoading = false;
      state.suspend.isError = false;
      state.suspend.isSuccess = true;
      state.suspend.successMessage = payload.message;
    });
    builder.addCase(resolveChangeStatusUser.rejected, (state, {payload}) => {
      state.suspend.isLoading = false;
      state.suspend.isError = true;
      state.suspend.errorMessage = 'Suspend user gagal.';
    });

    // Reset password
    builder.addCase(resolveResetPassword.pending, (state) => {
      state.resetPassword.status.isLoading = true;
      state.resetPassword.status.isError = false;
      state.resetPassword.status.isSuccess = false;
    });
    builder.addCase(resolveResetPassword.fulfilled, (state, {payload}) => {
      state.resetPassword.status.isLoading = false;
      state.resetPassword.status.isSuccess = true;
      state.resetPassword.isModalConfirmOpen = false;
    });
    builder.addCase(resolveResetPassword.rejected, (state, {payload}: any) => {
      state.resetPassword.status.isLoading = false;
      state.resetPassword.status.isError = true;
      state.resetPassword.status.message = payload?.data?.message;
      state.resetPassword.isModalConfirmOpen = false;
    });

    // patch secondary provider
    builder.addCase(resolveAddSecondaryProvider.pending, (state) => {
      state.secondaryProvider.status.isLoading = true;
      state.secondaryProvider.status.isError = false;
      state.secondaryProvider.status.isSuccess = false;
    });
    builder.addCase(resolveAddSecondaryProvider.fulfilled, (state, {payload}) => {
      state.secondaryProvider.status.isLoading = false;
      state.secondaryProvider.status.isSuccess = true;
      state.secondaryProvider.isModalAddOpen = false;
    });
    builder.addCase(resolveAddSecondaryProvider.rejected, (state, {payload}: any) => {
      state.secondaryProvider.status.isLoading = false;
      state.secondaryProvider.status.isError = true;
      state.secondaryProvider.status.message = payload?.data?.message;
      state.secondaryProvider.isModalAddOpen = false;
    });
  },
  reducers: {
    setForm: (state, {payload}) => {
      state.adminForm.data[payload.field] = payload.value;
    },
    resetStatusForm: (state) => {
      state.adminForm.isError = false;
      state.adminForm.isSuccess = false;
      state.adminForm.isLoading = false;
    },
    resetStatusSuspend: (state) => {
      state.suspend.isError = false;
      state.suspend.isSuccess = false;
      state.suspend.isLoading = false;
      state.suspend.errorMessage = '';
      state.suspend.successMessage = '';
    },
    setModal: (state, {payload}) => {
      state[payload.field] = payload.value;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
    setParamsValue: (state, {payload}) => {
      state.params[payload.label] = payload.value;
    },
    setAdminValue: (state, {payload}) => {
      state.admin[payload.label] = payload.value;
    },
    setAdminFormValue: (state, {payload}) => {
      state.adminForm[payload.label] = payload.value;
    },
    setAdminFormDataValue: (state, {payload}) => {
      switch (payload.index) {
        case 0:
          state.adminForm.data.providers[0][payload.field] = payload.value;
          break;
        case 1:
          state.adminForm.data.providers[1][payload.field] = payload.value;
          break;
        default:
          state.adminForm.data[payload.field] = payload.value;
      }
      state.adminForm.data[payload.field] = payload.value;
    },
    setSuspendValue: (state, {payload}) => {
      state.suspend[payload.label] = payload.value;
    },
    clearParamsValue: (state) => {
      state.params = {
        page: 1,
        limit: 10,
        search: '',
        status: '',
        endDate: '',
        startDate: '',
      };
    },
    setModalResetPassword: (state, {payload}) => {
      state.resetPassword.isModalConfirmOpen = payload.value;
    },
    resetStatusResetPassword: (state) => {
      state.resetPassword.status = initialState.resetPassword.status;
    },
    addSecondaryProvider: (state) => {
      state.adminForm.data.providers.push({provider: 0, type: ''});
    },
    setModalAddSecondaryProvider: (state, {payload}) => {
      state.secondaryProvider.isModalAddOpen = payload.value;
    },
    resetStatusSecondaryProvider: (state) => {
      state.secondaryProvider.status = initialState.secondaryProvider.status;
    },
    setSecondaryForm: (state, {payload}) => {
      state.secondaryProvider.form[payload.key] = payload.value;
    },
  },
});

export const {
  setForm,
  setModal,
  resetForm,
  setAdminValue,
  setParamsValue,
  resetStatusForm,
  setSuspendValue,
  clearParamsValue,
  setAdminFormValue,
  resetStatusSuspend,
  setAdminFormDataValue,
  setModalResetPassword,
  resetStatusResetPassword,
  addSecondaryProvider,
  setModalAddSecondaryProvider,
  resetStatusSecondaryProvider,
  setSecondaryForm,
} = permissionSlice.actions;

export default permissionSlice.reducer;
