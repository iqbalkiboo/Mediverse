import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  deleteDataById,
  editDataById,
  getAllData,
  getDataList,
  getDetail,
  getDetailById,
  postData,
} from '@/src/client/poli';
import {getListService} from '@/src/client/service';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isLoadingAddPoli: false,
  isLoadingEditPoli: false,
  isError: false,
  isErrorAddPoli: false,
  isErrorEditPoli: false,
  errMsg: '',
  listPolis: [],
  listPolisParams: {
    limit: 10,
    page: 1,
    status: '',
    startDate: '',
    endDate: '',
    query: '',
  },
  listPolisMetadata: {
    page: 1,
    size: 10,
    totalData: 1,
    totalPage: 1,
  },
  detailPoli: {},
  countPage: 1,
  limit: 5,
  isSuccessAdd: false,
  isSuccessEdit: false,
  isModalSuccessOpen: false,
  isModalErrorOpen: false,
  isModalSuccessDelete: false,
  isModalErrorDelete: false,
  listServicePoly: [],
};

export const resolvePoliService = createAsyncThunk(
    'resolve/getListPoli',
    async (
        payload: {
      currentPage: number;
      limit: number;
      type: string;
      keyword: string;
    },
        {rejectWithValue},
    ) => {
      const response = await getDataList(
          payload.currentPage,
          payload.limit,
          payload.type,
          payload.keyword,
      );
      if (!response.error) {
        return {
          data: response.data.map((item) => {
            return {
              id: item.id,
              item_id: item.item_id,
              name: item.item.nama,
              create_date: item.create_date || '-',
              count_provider: '-',
              status: item.is_banned,
              item_type: item.item_type,
            };
          }),
          countPage: 1,
        };
      }
      return rejectWithValue(response);
    },
);

export const resolvePoliServiceDetail = createAsyncThunk(
    'resolve/getDetailPoli',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDetail(payload.id);
      if (response.error !== null) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveGetAllPoliService = createAsyncThunk(
    'resolve/getAllPoli',
    async (payload: any, {rejectWithValue}) => {
      try {
        const response = await getAllData(payload);

        if (response.error !== null) {
          return response.data;
        }

        return rejectWithValue(response.error);
      } catch (error: any) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetDetailPoliService = createAsyncThunk(
    'resolve/getDetail',
    async (payload: any, {rejectWithValue}) => {
      try {
        const response = await getDetailById(payload.id);

        if (response.error !== null) {
          return response.data;
        }

        return rejectWithValue(response.error);
      } catch (error: any) {
        return rejectWithValue(error);
      }
    },
);

export const resolveAddPoliService = createAsyncThunk(
    'resolve/addPoli',
    async (payload: any, {rejectWithValue}) => {
      const response = await postData(payload);
      if (!response.error) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response);
    },
);

export const resolveEditPoliService = createAsyncThunk(
    'resolve/editPoli',
    async (payload: any, {rejectWithValue}) => {
      const {id, ...newPayload} = payload;
      const response = await editDataById(id, newPayload);
      if (!response.error) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response);
    },
);
export const resolveDeletePoliService = createAsyncThunk(
    'resolve/deletePoli',
    async (payload: any, {rejectWithValue}) => {
      const response = await deleteDataById(payload.id);
      if (!response.error) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response);
    },
);

export const resolveGetListServicePoly = createAsyncThunk(
    'resolve/listServicePoly',
    async (payload: any, {rejectWithValue}) => {
      try {
        const params = {
          page: 1,
          limit: 10,
          isActive: true,
          startDate: '',
          endDate: '',
          search: '',
          serviceType: '',
          polyType: payload.type,
        };

        const response = await getListService(params);

        if (response.status === 200) {
          return response.data;
        }

        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const poliSlice = createSlice({
  name: 'poli',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolvePoliService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolvePoliService.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.listPolis = payload.data;
      state.countPage = payload.countPage;
    });
    builder.addCase(resolvePoliService.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something Wrong';
    });
    builder.addCase(resolvePoliServiceDetail.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolvePoliServiceDetail.fulfilled, (state, {payload}) => {
      state.listPolis = [];
      state.isLoading = false;
      state.isError = false;
      state.detailPoli = payload;
    });
    builder.addCase(resolvePoliServiceDetail.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something Wrong';
    });
    builder.addCase(resolveGetAllPoliService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveGetAllPoliService.fulfilled, (state, {payload}: any) => {
      state.isLoading = false;
      state.isError = false;

      // handle if data from backend is not available
      if (payload?.data) {
        state.listPolis = payload.data;
      }

      if (payload?.metadata?.page) {
        state.listPolisMetadata.page = payload?.metadata?.page;
      }

      if (payload?.metadata?.size) {
        state.listPolisMetadata.size = payload?.metadata?.size;
      }

      if (payload?.metadata?.total_data) {
        state.listPolisMetadata.totalData = payload?.metadata?.total_data;
      }

      if (payload?.metadata?.total_page) {
        state.listPolisMetadata.totalPage = payload?.metadata?.total_page;
      }
    });
    builder.addCase(resolveGetAllPoliService.rejected, (state, {payload}: any) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveGetDetailPoliService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveGetDetailPoliService.fulfilled, (state, {payload}: any) => {
      state.isLoading = false;
      state.isError = false;
      state.detailPoli = payload.data;
    });
    builder.addCase(resolveGetDetailPoliService.rejected, (state, {payload}: any) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveAddPoliService.pending, (state) => {
      state.isLoadingAddPoli = true;
      state.isErrorAddPoli = false;
    });
    builder.addCase(resolveAddPoliService.fulfilled, (state, {payload}) => {
      if (payload.data.message) {
        state.isLoadingAddPoli = false;
        state.isErrorAddPoli = false;
        state.isSuccessAdd = true;
        state.isModalSuccessOpen = true;
      } else {
        state.isLoadingAddPoli = false;
        state.isErrorAddPoli = true;
        state.errMsg = 'Gagal menambahkan master poli';
        state.isModalErrorOpen = true;
      }
    });
    builder.addCase(resolveAddPoliService.rejected, (state, {payload}) => {
      state.isLoadingAddPoli = false;
      state.isErrorAddPoli = true;
      state.errMsg = 'Gagal menambahkan master poli';
      state.isModalErrorOpen = true;
    });
    builder.addCase(resolveEditPoliService.pending, (state) => {
      state.isLoadingEditPoli = true;
      state.isErrorEditPoli = false;
    });
    builder.addCase(resolveEditPoliService.fulfilled, (state, {payload}) => {
      if (payload.data.message) {
        state.isLoadingEditPoli = false;
        state.isErrorEditPoli = false;
        state.isSuccessEdit = true;
        state.isModalSuccessOpen = true;
      } else {
        state.isLoadingEditPoli = false;
        state.isErrorEditPoli = true;
        state.errMsg = 'Gagal mengubah data master poli';
        state.isModalErrorOpen = true;
      }
    });
    builder.addCase(resolveEditPoliService.rejected, (state, {payload}) => {
      state.isLoadingEditPoli = false;
      state.isErrorEditPoli = true;
      state.errMsg = 'Gagal mengubah data master poli';
      state.isModalErrorOpen = true;
    });
    builder.addCase(resolveDeletePoliService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isModalErrorDelete = false;
    });
    builder.addCase(resolveDeletePoliService.fulfilled, (state, {payload}) => {
      if (payload.data.message) {
        state.isLoading = false;
        state.isError = false;
        state.isModalSuccessDelete = true;

        state.listPolisParams = {
          ...state.listPolisParams,
          page: 1,
          status: '',
          startDate: '',
          endDate: '',
          query: '',
        };
      } else {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = 'Gagal menghapus master poli';
        state.isModalErrorDelete = true;
      }
    });
    builder.addCase(resolveDeletePoliService.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Gagal menghapus master poli';
      state.isModalErrorDelete = true;
    });
    builder.addCase(resolveGetListServicePoly.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(resolveGetListServicePoly.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.listServicePoly = payload.data;
    });
    builder.addCase(resolveGetListServicePoly.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
  reducers: {
    setIsModalSuccessOpen: (state, {payload}) => {
      state.isModalSuccessOpen = payload.state;
    },
    setIsModalErrorOpen: (state, {payload}) => {
      state.isModalErrorOpen = payload.state;
    },
    setIsModalSuccessDelete: (state, {payload}) => {
      state.isModalSuccessDelete = payload.state;
    },
    setIsModalErrorDelete: (state, {payload}) => {
      state.isModalErrorDelete = payload.state;
    },
    setListPolisParams: (state, {payload}) => {
      state.listPolisParams[payload.name] = payload.value;
    },
    setClearState: () => initialState,
  },
});

export const {
  setIsModalSuccessOpen,
  setIsModalErrorOpen,
  setIsModalSuccessDelete,
  setIsModalErrorDelete,
  setClearState,
  setListPolisParams,
} = poliSlice.actions;

export default poliSlice.reducer;
