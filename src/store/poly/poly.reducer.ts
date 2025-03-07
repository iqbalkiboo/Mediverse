import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  deleteDataPoly,
  getDetailPoly,
  getListHealthFacilityElastic,
  getListPoly,
  getListTreatmentInPoly,
  postDataPoly,
  putDataPoly,
} from '@/src/client/poly';

const initialState = {
  polis: {
    isLoading: false,
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
  poly: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  healthFacilitiesInPoly: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  treatmentsInPoly: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  formModalPoly: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      polyName: '',
      polyIcon: '',
    },
  },
  modalUpdateStatusPoly: {
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
    offset: 0,
    search: '',
    status: '',
    endDate: '',
    startDate: '',
    providerType: 'medpoint',
  },
};

export const resolveListPoly = createAsyncThunk(
    'resolve/poly/list',
    async (payload: {
    page: number,
    limit: number,
    search: string,
    status: boolean,
    endDate: number,
    startDate: number,
  }, {rejectWithValue}) => {
      try {
        const response = await getListPoly(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailPoly = createAsyncThunk(
    'resolve/poly/detail',
    async (payload: {id: any}, {rejectWithValue}) => {
      try {
        const response = await getDetailPoly(payload.id);
        if (response.error !== null) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveListHealthFacilityElasticInPoly = createAsyncThunk(
    'resolve/healthFacilityElasticInPoly/list',
    async (payload: {
  type: string,
  limit: string,
  offset: string,
  search: string,
  providerType: string,
}, {rejectWithValue}) => {
      try {
        const response = await getListHealthFacilityElastic(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveListTreatmentInPoly = createAsyncThunk(
    'resolve/treatmentInPoly/list',
    async (payload: {polyName: string}, {rejectWithValue}) => {
      try {
        const response = await getListTreatmentInPoly(payload);
        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostDataPoly = createAsyncThunk(
    'resolve/poly/post',
    async (payload: {data: any}, {rejectWithValue}) => {
      try {
        const response = await postDataPoly(payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePutDataPoly = createAsyncThunk(
    'resolve/poly/put',
    async (payload: {
      id: string,
      data: any,
    }, {rejectWithValue}) => {
      try {
        const response = await putDataPoly(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePatchDataStatusPoly = createAsyncThunk(
    'resolve/poly/patchDataStatus',
    async (payload: {
id: string,
data: any,
}, {rejectWithValue}) => {
      try {
        const response = await putDataPoly(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDeleteDataPoly = createAsyncThunk(
    'resolve/poly/delete',
    async (payload: {
  id: any
}, {rejectWithValue}) => {
      const response = await deleteDataPoly(payload.id);
      if (!response.error) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response.data.message);
    },
);

const polySlice = createSlice({
  name: 'poly',
  initialState,
  extraReducers: (builder) => {
    // Get List Poly
    builder.addCase(resolveListPoly.pending, (state) => {
      state.polis.isLoading = true;
      state.polis.isError = false;
    });
    builder.addCase(resolveListPoly.fulfilled, (state, {payload}) => {
      state.polis.isLoading = false;
      state.polis.isError = false;
      state.polis.data = payload?.data || [];

      // Metadata List Medpharm
      state.polis.metadata.page = payload?.metadata?.page || 1;
      state.polis.metadata.size = payload?.metadata?.size || 10;
      state.polis.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.polis.metadata.totalData = payload?.metadata?.total_data || 0;
    });
    builder.addCase(resolveListPoly.rejected, (state, {payload}) => {
      state.polis.isLoading = false;
      state.polis.isError = true;
      state.polis.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get Detail Poly
    builder.addCase(resolveDetailPoly.pending, (state) => {
      state.poly.isLoading = true;
      state.poly.isError = false;
    });
    builder.addCase(resolveDetailPoly.fulfilled, (state, {payload}) => {
      state.poly.isLoading = false;
      state.poly.data = payload?.data;
      state.formModalPoly.form = {
        polyName: payload?.data?.poly_name || '',
        polyIcon: payload?.data?.poly_icon || '',
      };
    });
    builder.addCase(resolveDetailPoly.rejected, (state, {payload}) => {
      state.poly.isError = true;
      state.poly.isLoading = false;
      state.poly.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get List Health Facility Elastic In Poly
    builder.addCase(resolveListHealthFacilityElasticInPoly.pending, (state) => {
      state.healthFacilitiesInPoly.isLoading = true;
      state.healthFacilitiesInPoly.isError = false;
    });
    builder.addCase(resolveListHealthFacilityElasticInPoly.fulfilled, (state, {payload}) => {
      state.healthFacilitiesInPoly.isLoading = false;
      state.healthFacilitiesInPoly.isError = false;
      state.healthFacilitiesInPoly.data = payload || [];
    });
    builder.addCase(resolveListHealthFacilityElasticInPoly.rejected, (state, {payload}) => {
      state.healthFacilitiesInPoly.isLoading = false;
      state.healthFacilitiesInPoly.isError = true;
      state.healthFacilitiesInPoly.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Get List Treatment In Poly
    builder.addCase(resolveListTreatmentInPoly.pending, (state) => {
      state.treatmentsInPoly.isLoading = true;
      state.treatmentsInPoly.isError = false;
    });
    builder.addCase(resolveListTreatmentInPoly.fulfilled, (state, {payload}) => {
      state.treatmentsInPoly.isLoading = false;
      state.treatmentsInPoly.isError = false;
      state.treatmentsInPoly.data = payload?.data || [];
    });
    builder.addCase(resolveListTreatmentInPoly.rejected, (state, {payload}) => {
      state.treatmentsInPoly.isLoading = false;
      state.treatmentsInPoly.isError = true;
      state.treatmentsInPoly.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Post Data Poly
    builder.addCase(resolvePostDataPoly.pending, (state) => {
      state.formModalPoly.isLoading = true;
      state.formModalPoly.isError = false;
    });
    builder.addCase(resolvePostDataPoly.fulfilled, (state, {payload}) => {
      state.formModalPoly.isLoading = false;
      state.formModalPoly.isSuccess = true;
      state.formModalPoly.successMessage = 'Berhasil menambahkan poli';
    });
    builder.addCase(resolvePostDataPoly.rejected, (state, {payload}) => {
      state.formModalPoly.isLoading = false;
      state.formModalPoly.isError = true;
      state.formModalPoly.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Put Data Poly
    builder.addCase(resolvePutDataPoly.pending, (state) => {
      state.formModalPoly.isLoading = true;
      state.formModalPoly.isError = false;
    });
    builder.addCase(resolvePutDataPoly.fulfilled, (state, {payload}) => {
      state.formModalPoly.isLoading = false;
      state.formModalPoly.isSuccess = true;
      state.formModalPoly.successMessage = 'Berhasil mengupdate poli';
    });
    builder.addCase(resolvePutDataPoly.rejected, (state, {payload}) => {
      state.formModalPoly.isLoading = false;
      state.formModalPoly.isError = true;
      state.formModalPoly.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Patch Update Status Poly
    builder.addCase(resolvePatchDataStatusPoly.pending, (state) => {
      state.modalUpdateStatusPoly.isError = false;
      state.modalUpdateStatusPoly.isLoading = true;
      state.modalUpdateStatusPoly.isSuccess = false;
    });
    builder.addCase(resolvePatchDataStatusPoly.fulfilled, (state, {payload}) => {
      state.modalUpdateStatusPoly.isLoading = false;
      state.modalUpdateStatusPoly.isError = false;
      state.modalUpdateStatusPoly.isSuccess = true;
      state.modalUpdateStatusPoly.successMessage = 'Berhasil mengupdate status poli';
    });
    builder.addCase(resolvePatchDataStatusPoly.rejected, (state, {payload}) => {
      state.modalUpdateStatusPoly.isError = true;
      state.modalUpdateStatusPoly.isLoading = false;
      state.modalUpdateStatusPoly.isSuccess = false;
      state.modalUpdateStatusPoly.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Delete Data Poly
    builder.addCase(resolveDeleteDataPoly.pending, (state) => {
      state.modalUpdateStatusPoly.isLoading = true;
      state.modalUpdateStatusPoly.isError = false;
    });
    builder.addCase(resolveDeleteDataPoly.fulfilled, (state, {payload}) => {
      if (payload.data.message) {
        state.modalUpdateStatusPoly.isLoading = false;
        state.modalUpdateStatusPoly.isError = false;
        state.modalUpdateStatusPoly.isSuccess = true;
        state.modalUpdateStatusPoly.successMessage = 'Berhasil menghapus poli';
      } else {
        state.modalUpdateStatusPoly.isLoading = false;
        state.modalUpdateStatusPoly.isError = true;
        state.modalUpdateStatusPoly.errorMessage = String(payload) || 'Something Wrong !';
      }
    });
    builder.addCase(resolveDeleteDataPoly.rejected, (state, {payload}) => {
      state.modalUpdateStatusPoly.isLoading = false;
      state.modalUpdateStatusPoly.isError = true;
      state.modalUpdateStatusPoly.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setForm: (state, {payload}) => {
      state.formModalPoly.form[payload.name] = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setFlagModalUpdateStatusPoly: (state, {payload}) => {
      state.modalUpdateStatusPoly.flag = payload;
    },
    resetForm: (state) => {
      state.formModalPoly = initialState.formModalPoly;
    },
    resetStatePoly: () => initialState,
    resetParams: (state) => {
      state.params = initialState.params;
    },
  },
});

export const {
  setForm,
  setModal,
  setParams,
  resetForm,
  resetStatePoly,
  setFlagModalUpdateStatusPoly,
  resetParams,
} = polySlice.actions;

export default polySlice.reducer;
