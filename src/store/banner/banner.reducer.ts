import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  deleteDataBanner,
  getDetailBanner,
  getListBanner,
  postDataBanner,
  putDataBanner,
} from '@/src/client/banner';

const initialState = {
  idBanner: 0,
  banners: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 0,
    },
  },
  bannerById: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  modalDeleteBanner: {
    id: 0,
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  formModalUploadBanner: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      name: '',
      imageMobile: '',
      imageTablet: '',
      imageDesktop: '',
      imagePartnerLogo: '',
    },
  },
  params: {
    type: '',
    page: 1,
    limit: 10,
  },
};

export const resolveListBanner = createAsyncThunk(
    'resolve/banner/list',
    async (payload: {
type: string,
page: number,
limit: number,
}, {rejectWithValue}) => {
      try {
        const response = await getListBanner(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailBannerById = createAsyncThunk(
    'resolve/banner/detailById',
    async (payload: {id: any}, {rejectWithValue}) => {
      try {
        const response = await getDetailBanner(payload.id);
        if (response.error !== null) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostDataBanner = createAsyncThunk(
    'resolve/banner/post',
    async (payload: {data: any}, {rejectWithValue}) => {
      try {
        const response = await postDataBanner(payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePutDataBanner = createAsyncThunk(
    'resolve/banner/put',
    async (payload: {
    id: string | number,
    data: any,
  }, {rejectWithValue}) => {
      try {
        const response = await putDataBanner(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDeleteDataBanner = createAsyncThunk(
    'resolve/banner/delete',
    async (payload: {id: any}, {rejectWithValue}) => {
      const response = await deleteDataBanner(payload.id);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    },
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  extraReducers: (builder) => {
    // Get list banner
    builder.addCase(resolveListBanner.pending, (state) => {
      state.banners.isLoading = true;
      state.banners.isError = false;
    });
    builder.addCase(resolveListBanner.fulfilled, (state, {payload}) => {
      state.banners.isLoading = false;
      state.banners.isError = false;
      state.banners.data = payload?.data || [];

      // Metadata list banner
      state.banners.metadata.page = payload?.metadata?.page || 1;
      state.banners.metadata.size = payload?.metadata?.size || 10;
      state.banners.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.banners.metadata.totalData = payload?.metadata?.total_data || 0;
    });
    builder.addCase(resolveListBanner.rejected, (state, {payload}) => {
      state.banners.isLoading = false;
      state.banners.isError = true;
      state.banners.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get detail banner by id
    builder.addCase(resolveDetailBannerById.pending, (state) => {
      state.bannerById.isLoading = true;
      state.bannerById.isError = false;
    });
    builder.addCase(resolveDetailBannerById.fulfilled, (state, {payload}) => {
      state.bannerById.isLoading = false;
      state.bannerById.data = payload;
      state.formModalUploadBanner.form = {
        name: payload?.name,
        imageMobile: payload?.url_banner_mobile,
        imageTablet: payload?.url_banner_tablet,
        imageDesktop: payload?.url_banner_desktop,
        imagePartnerLogo: payload?.url_banner_partner,
      };
    });
    builder.addCase(resolveDetailBannerById.rejected, (state, {payload}) => {
      state.bannerById.isError = true;
      state.bannerById.isLoading = false;
      state.bannerById.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Post data banner
    builder.addCase(resolvePostDataBanner.pending, (state) => {
      state.formModalUploadBanner.isLoading = true;
      state.formModalUploadBanner.isError = false;
    });
    builder.addCase(resolvePostDataBanner.fulfilled, (state, {payload}) => {
      state.formModalUploadBanner.isLoading = false;
      state.formModalUploadBanner.isSuccess = true;
      state.formModalUploadBanner.successMessage = 'Berhasil Unggah Banner';
    });
    builder.addCase(resolvePostDataBanner.rejected, (state, {payload}) => {
      state.formModalUploadBanner.isLoading = false;
      state.formModalUploadBanner.isError = true;
      state.formModalUploadBanner.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put data banner
    builder.addCase(resolvePutDataBanner.pending, (state) => {
      state.formModalUploadBanner.isLoading = true;
      state.formModalUploadBanner.isError = false;
    });
    builder.addCase(resolvePutDataBanner.fulfilled, (state, {payload}) => {
      state.formModalUploadBanner.isLoading = false;
      state.formModalUploadBanner.isSuccess = true;
      state.formModalUploadBanner.successMessage = 'Banner Berhasil di ubah';
    });
    builder.addCase(resolvePutDataBanner.rejected, (state, {payload}) => {
      state.formModalUploadBanner.isLoading = false;
      state.formModalUploadBanner.isError = true;
      state.formModalUploadBanner.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Delete data banner
    builder.addCase(resolveDeleteDataBanner.pending, (state) => {
      state.modalDeleteBanner.isLoading = true;
      state.modalDeleteBanner.isError = false;
    });
    builder.addCase(resolveDeleteDataBanner.fulfilled, (state, {payload}) => {
      state.modalDeleteBanner.isLoading = false;
      state.modalDeleteBanner.isError = false;
      state.modalDeleteBanner.isSuccess = true;
      state.modalDeleteBanner.successMessage = 'Berhasil menghapus banner';
    });
    builder.addCase(resolveDeleteDataBanner.rejected, (state, {payload}) => {
      state.modalDeleteBanner.isLoading = false;
      state.modalDeleteBanner.isError = true;
      state.modalDeleteBanner.errorMessage = String(payload) || 'Gagal menghapus banner';
    });
  },
  reducers: {
    setForm: (state, {payload}) => {
      state.formModalUploadBanner.form[payload.name] = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.name] = payload.value;
    },
    setIdBanner: (state, {payload}) => {
      state.idBanner = payload;
    },
    setIdDeletedBanner: (state, {payload}) => {
      state.modalDeleteBanner.id = payload;
    },
    resetForm: (state) => {
      state.formModalUploadBanner = initialState.formModalUploadBanner;
    },
    resetStateBanner: () => initialState,
  },
});

export const {
  setForm,
  setModal,
  setParams,
  resetForm,
  setIdBanner,
  resetStateBanner,
  setIdDeletedBanner,
} = bannerSlice.actions;

export default bannerSlice.reducer;
