import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  apiAddCorporate,
  getCorporates,
  getDetailCorporate,
  getEmployeByCompany,
  postEmployePerCompany,
  putCorporate,
} from '@/client/corporate';

interface IPayload {
  id: string;
  name: string;
  create_date: string;
  count_provider: string;
  countPage: number;
  status: boolean;
}

const initialState = {
  isLoading: false,
  isLoadingAddCorporate: false,
  isError: false,
  isErrorAddCorporate: false,
  isErrorAddEmploye: false,
  modal: {
    success: false,
    confirmation: false,
    confirmationEmploye: false,
    error: false,
    add: false,
    edit: false,
    employe: false,
  },
  errMsg: '',
  successMesage: '',
  listCorporate: [],
  listEmploye: [],
  detailCorporate: {},
  countPage: 1,
  limit: 5,
  isSuccessAdd: false,
};

export const resolveGetListCorporateService = createAsyncThunk(
    'resolve/getListCorporate',
    async (payload: {
      page: number,
      limit: number,
      query: string,
      isActive: boolean | string,
    },
    {rejectWithValue},
    ) => {
      const response = await getCorporates(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveAddCorporateService = createAsyncThunk(
    'resolve/addCorporate',
    async (payload: IPayload, {rejectWithValue}) => {
      const response = await apiAddCorporate(payload);
      if (!response.error) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response);
    },
);

export const resolveDetailCorporateService = createAsyncThunk(
    'resolve/detailCorporate',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDetailCorporate(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveEditCorporateService = createAsyncThunk(
    'resolve/editCorporate',
    async (payload: any, {rejectWithValue}) => {
      const response = await putCorporate(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolveGetEmploye = createAsyncThunk(
    'resolve/getEmploye',
    async (payload: any, {rejectWithValue}) => {
      const response = await getEmployeByCompany(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

export const resolvePostEmploye = createAsyncThunk(
    'resolve/postEmploye',
    async (payload: any, {rejectWithValue}) => {
      const response = await postEmployePerCompany(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    },
);

const corporateSlice = createSlice({
  name: 'corporate',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveGetListCorporateService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
        resolveGetListCorporateService.fulfilled,
        (state, {payload}) => {
          state.isLoading = false;
          state.isError = false;
          state.listCorporate = payload.data;
          state.countPage = payload.metadata.total_page;
        },
    );
    builder.addCase(
        resolveGetListCorporateService.rejected,
        (state, {payload}) => {
          state.isLoading = false;
          state.isError = true;
          state.errMsg = 'Something Wrong';
        },
    );
    builder.addCase(resolveAddCorporateService.pending, (state) => {
      state.isLoadingAddCorporate = true;
      state.isErrorAddCorporate = false;
    });
    builder.addCase(
        resolveAddCorporateService.fulfilled,
        (state, {payload}) => {
          state.isLoadingAddCorporate = false;
          state.isErrorAddCorporate = false;
          state.successMesage = 'Company have been added';
          state.modal.success = true;
          state.modal.confirmation = false;
          state.isSuccessAdd = true;
          state.modal.confirmation = false;
          state.modal.add = false;
        },
    );
    builder.addCase(
        resolveAddCorporateService.rejected,
        (state, {payload}) => {
          state.isLoadingAddCorporate = false;
          state.isErrorAddCorporate = true;
          state.errMsg = 'Something Wrong';
        },
    );
    builder.addCase(resolveDetailCorporateService.pending, (state) => {
      state.isLoadingAddCorporate = true;
      state.isErrorAddCorporate = false;
    });
    builder.addCase(
        resolveDetailCorporateService.fulfilled,
        (state, {payload}) => {
          state.isLoading = false;
          state.detailCorporate = payload.data;
        },
    );
    builder.addCase(
        resolveDetailCorporateService.rejected,
        (state, {payload}) => {
          state.isLoading = false;
          state.isError = true;
          state.errMsg = 'Something Wrong';
        },
    );
    builder.addCase(resolveEditCorporateService.pending, (state) => {
      state.isLoadingAddCorporate = true;
      state.isErrorAddCorporate = false;
    });
    builder.addCase(
        resolveEditCorporateService.fulfilled,
        (state, {payload}) => {
          state.isLoading = false;
          state.modal.confirmation = false;
          state.modal.success = true;
          state.modal.confirmation = false;
          state.successMesage = 'Data have been edited';
        },
    );
    builder.addCase(
        resolveEditCorporateService.rejected,
        (state, {payload}) => {
          state.isLoading = false;
          state.modal.success = false;
          state.modal.error = true;
          state.modal.confirmation = false;
          state.errMsg = 'Something Wrong';
        },
    );
    builder.addCase(resolveGetEmploye.pending, (state) => {
      state.isLoadingAddCorporate = true;
      state.isErrorAddCorporate = false;
    });
    builder.addCase(resolveGetEmploye.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.listEmploye = payload;
    });
    builder.addCase(resolveGetEmploye.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(resolvePostEmploye.pending, (state) => {
      state.isLoadingAddCorporate = true;
      state.isErrorAddEmploye = false;
    });
    builder.addCase(resolvePostEmploye.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.modal.success = true;
      state.modal.confirmationEmploye = false;
      state.modal.employe = false;
      state.successMesage = 'data have been added';
    });
    builder.addCase(resolvePostEmploye.rejected, (state) => {
      state.isLoading = false;
      state.modal.error = true;
      state.modal.confirmationEmploye = false;
      state.modal.employe = false;
      state.errMsg = 'Somthing wrong';
    });
  },
  reducers: {
    closeModal: (state, {payload}) => {
      if (payload.all) {
        state.modal.confirmation = false;
        state.modal.success = false;
        state.modal.error = false;
        state.modal.add = false;
      } else {
        state.modal[payload.type] = false;
      }
    },
    openModal: (state, {payload}) => {
      if (payload.all) {
        state.modal.confirmation = true;
        state.modal.success = true;
        state.modal.error = true;
        state.modal.add = true;
      } else {
        state.modal[payload.type] = true;
      }
    },
  },
});

export const {
  closeModal,
  openModal,
} = corporateSlice.actions;

export default corporateSlice.reducer;
