import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getDataList,
  getDataListHealthFacility,
  getDataListServiceGroup,
  getDetail,
  getDetailHealthFacility,
  getDetailProvider,
  getDetailTreatment,
  getListProvider,
  getListTreatment,
  postTreatmentProductService,
  postTreatmentToClinic,
  putTreatmentProductService,
} from '@/src/client/productService';

import {IProductServiceState} from '@/src/types/ProductService';

const initialState: IProductServiceState = {
  treatments: {
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
  providers: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  provider: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  params: {
    page: 1,
    limit: 10,
    status: '',
    search: '',
  },
  isLoading: false,
  isError: false,
  isErrorDetail: false,
  isModalErrorOpen: false,
  isModalSuccessOpen: false,
  isModalErrorPostToClinicOpen: false,
  isModalSuccessPostToClinicOpen: false,
  errMsg: '',
  successMsg: '',
  listProductService: [],
  listHealthFacility: [],
  listServiceGroup: [],
  listPoli: [],
  detail: {},
  countPage: 10,
  currentPage: 1,
  limit: '',
  formProductService: {
    code: '',
    information: {
      isSuccess: false,
      type: '',
      provider: {},
      healthFacility: {},
      name: '',
      serviceGroup: {},
      poli: {},
      price: '',
    },
    detail: {
      isSuccess: false,
      detail: '',
      preparation: '',
    },
    criteria: {
      isSuccess: false,
      maxAge: '',
      minAge: '',
      durationPerService: '',
      maxParticipant: '',
      preOrderSetting: '',
      participantPerVial: '',
    },
    informationHealthFacility: {
      isSuccess: false,
      provider: {},
      healthFacility: {},
      treatmentIDs: [],
    },
  },
  pagination: {
    page: 1,
    limit: 10,
    totalPage: 1,
    masterData: [],
    currentData: [],
  },
};

export const fetchDataList = createAsyncThunk(
    'productService/list',
    async (payload: {
      type: string,
      limit: string,
      offset: string,
      keyword: string,
      isBanned: string,
    }, {rejectWithValue}) => {
      const response = await getDataList(
          payload.type, payload.limit, payload.offset, payload.keyword, payload.isBanned,
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveListTreatment = createAsyncThunk(
    'resolve/treatment/list',
    async (payload: {
    channelId: any;
    page: number;
    limit: number;
    search: string;
  }, {rejectWithValue}) => {
      const response = await getListTreatment(payload);
      try {
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const fetchDataListHealthFacility = createAsyncThunk(
    'productService/list/healthFacility',
    async (payload: {
      providerId: any
    }, {rejectWithValue}) => {
      const response = await getDataListHealthFacility(payload.providerId);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const resolveListProvider = createAsyncThunk(
    'resolve/provider/list',
    async (any, {rejectWithValue}) => {
      try {
        const response = await getListProvider();

        if (response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailProvider = createAsyncThunk(
    'resolve/provider/detail',
    async (payload: {
    id: any
  }, {rejectWithValue}) => {
      const response = await getDetailProvider(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchDataListServiceGroup = createAsyncThunk(
    'productService/list/serviceGroup',
    async (payload, {rejectWithValue}) => {
      const response = await getDataListServiceGroup();
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchDetail = createAsyncThunk(
    'productService/detail',
    async (payload: any, {rejectWithValue}) => {
      const response = await getDetail(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchDetailHealthFacility = createAsyncThunk(
    'productService/detail/healthFacility',
    async (payload: {
    channelId: string,
    itemId: string,
  }, {rejectWithValue}) => {
      const response = await getDetailHealthFacility(payload.channelId, payload.itemId);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchDetailTreatment = createAsyncThunk(
    'productService/detail/treatment',
    async (payload: {
  channelId: string,
  itemId: string,
}, {rejectWithValue}) => {
      const response = await getDetailTreatment(payload.channelId, payload.itemId);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchPostTreatmentProductService = createAsyncThunk(
    'productService/create/treatment',
    async (payload: {
    channelId: string,
    payload: any
  }, {rejectWithValue}) => {
      const response = await postTreatmentProductService(payload.channelId, payload.payload);
      if (response.status === 201) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchPostTreatmentToClinic = createAsyncThunk(
    'productService/create/treatmentToClinic',
    async (payload: {
  channelId: string,
  id: string | number,
  payload: any
}, {rejectWithValue}) => {
      const response = await postTreatmentToClinic(payload.channelId, payload.id, payload.payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

export const fetchPutTreatmentProductService = createAsyncThunk(
    'productService/update/treatment',
    async (payload: {
  channelId: string,
  id: any,
  payload: any
}, {rejectWithValue}) => {
      const response = await putTreatmentProductService(payload.channelId, payload.id, payload.payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

const productServiceSlice = createSlice({
  name: 'productService',
  initialState,
  extraReducers: (builder) => {
    // Get List Product Service
    builder.addCase(fetchDataList.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDataList.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.listProductService = payload;
      state.pagination.masterData = payload;
      state.pagination.totalPage = Math.ceil(parseInt(payload.length) / 10);
      state.pagination.currentData = payload.slice(0, 10);
    });
    builder.addCase(fetchDataList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });

    // Get List Treatment from OR
    builder.addCase(resolveListTreatment.pending, (state) => {
      state.treatments.isLoading = true;
      state.treatments.isError = false;
    });
    builder.addCase(resolveListTreatment.fulfilled, (state, {payload}) => {
      state.treatments.isLoading = false;
      state.treatments.isError = false;
      state.treatments.data = payload?.data || [];

      // Metadata List Treatment from OR
      state.treatments.metadata.page = payload?.metadata?.page || 1;
      state.treatments.metadata.size = payload?.metadata?.size || 10;
      state.treatments.metadata.totalPage = Math.ceil(payload?.metadata?.total_data / state.params.limit) || 1;
      state.treatments.metadata.totalData = payload?.metadata?.total_data || 10;
    });
    builder.addCase(resolveListTreatment.rejected, (state, action) => {
      state.treatments.data = [];
      state.treatments.isLoading = false;
      state.treatments.isError = true;
      state.treatments.errorMessage = 'Something wrong!';
    });

    // Get List Provider For Select
    builder.addCase(resolveListProvider.pending, (state) => {
      state.providers.isLoading = true;
      state.providers.isError = false;
    });
    builder.addCase(resolveListProvider.fulfilled, (state, {payload}) => {
      state.providers.isLoading = false;
      state.providers.isError = false;
      state.providers.data = payload?.data || [];
    });
    builder.addCase(resolveListProvider.rejected, (state, action) => {
      state.providers.isLoading = false;
      state.providers.isError = true;
      state.providers.errorMessage = 'Something wrong!';
    });

    // Get Detail Provider
    builder.addCase(resolveDetailProvider.pending, (state) => {
      state.provider.isLoading = true;
      state.provider.isError = false;
    });
    builder.addCase(resolveDetailProvider.fulfilled, (state, {payload}) => {
      state.provider.isLoading = false;
      state.provider.isError = false;
      state.provider.data = payload?.data;

      state.formProductService.information = {
        ...state.formProductService.information,
        provider: {
          id: payload?.data?.id,
          name: payload?.data?.name,
        },
      };
    });
    builder.addCase(resolveDetailProvider.rejected, (state, action) => {
      state.provider.isLoading = false;
      state.provider.isError = true;
      state.provider.errorMessage = 'Something wrong!';
    });

    // Get List HealthFacility for Select
    builder.addCase(fetchDataListHealthFacility.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDataListHealthFacility.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.listHealthFacility = payload?.data || [];
    });
    builder.addCase(fetchDataListHealthFacility.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Get List Service for Select
    builder.addCase(fetchDataListServiceGroup.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDataListServiceGroup.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = false;
      state.listServiceGroup = payload?.data;
    });
    builder.addCase(fetchDataListServiceGroup.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Get Detail Health Facility for Select Poli
    builder.addCase(fetchDetailHealthFacility.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDetailHealthFacility.fulfilled, (state, {payload}) => {
      if (payload.data) {
        state.listPoli = payload?.data?.poly;

        state.formProductService.information = {
          ...state.formProductService.information,
          healthFacility: {
            id: payload?.data?.id,
            name: payload?.data?.name,
            image: payload?.data?.image,
          },
        };
      } else {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = 'Something wrong!';
      }
    });
    builder.addCase(fetchDetailHealthFacility.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Get Detail Product Service
    builder.addCase(fetchDetail.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDetail.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.detail = payload;
    });
    builder.addCase(fetchDetail.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });

    // Get Detail Treatment Product Service
    builder.addCase(fetchDetailTreatment.pending, (state) => {
      state.isLoading = true;
      state.isErrorDetail = false;
    });
    builder.addCase(fetchDetailTreatment.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.detail = payload;
      state.formProductService = {
        ...state.formProductService,
        code: payload?.data?.code || '',
        information: {
          isSuccess: true,
          type: payload?.data?.type || payload?.data?.configs?.type || '',
          provider: {
            id: payload?.data?.configs?.['provider']?.id,
            name: payload?.data?.configs?.['provider']?.name || '',
          },
          healthFacility: {
            channelId: payload?.data?.configs?.['health-facility']?.channelId || 0,
            itemId: payload?.data?.configs?.['health-facility']?.itemId,
            id: payload?.data?.configs?.['health-facility']?.id,
            name: payload?.data?.configs?.['health-facility']?.name || '',
            image: payload?.data?.configs?.['health-facility']?.image || '',
          },
          name: payload?.data?.name || '',
          serviceGroup: {
            id: payload?.data?.configs?.['service-group']?.id,
            name: payload?.data?.configs?.['service-group']?.name || '',
            icon: payload?.data?.configs?.['service-group']?.icon || '',
          },
          poli: {
            id: payload?.data?.configs?.['poli']?.id,
            name: payload?.data?.configs?.['poli']?.name || '',
          },
          price: payload?.data?.price || '',
        },
        detail: {
          isSuccess: true,
          detail: payload?.data?.description || '',
          preparation: payload?.data?.preparation || '',
        },
        criteria: {
          isSuccess: true,
          maxAge: payload?.data?.configs?.['max-age']?.value || '',
          minAge: payload?.data?.configs?.['min-age']?.value || '',
          durationPerService: payload?.data?.configs?.['slot-duration']?.value || '',
          maxParticipant: payload?.data?.configs?.['max-participant']?.value || '',
          preOrderSetting: payload?.data?.configs?.['setting_preorder']?.value || '',
          participantPerVial: payload?.data?.configs?.['number-participant-per-vial']?.value || '',
        },
      };
    });
    builder.addCase(fetchDetailTreatment.rejected, (state) => {
      state.isLoading = false;
      state.isErrorDetail = true;
      state.errMsg = 'Something wrong!';
    });

    // Post Treatment Product Service
    builder.addCase(fetchPostTreatmentProductService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchPostTreatmentProductService.fulfilled, (state, {payload}) => {
      if (payload.data) {
        state.isLoading = false;
        state.isError = false;
        state.isModalSuccessOpen = true;
        state.formProductService.informationHealthFacility = {
          isSuccess: true,
          provider: {
            id: payload?.data?.configs['provider']?.id,
            name: payload?.data?.configs['provider']?.name || '',
          },
          healthFacility: {
            id: payload?.data?.configs['health-facility']?.id,
            name: payload?.data?.configs['health-facility']?.name || '',
            image: payload?.data?.configs['health-facility']?.image || '',
          },
          treatmentIDs: [
            ...state.formProductService.informationHealthFacility.treatmentIDs,
            payload?.data?.id,
          ],
        };
      } else {
        state.isLoading = false;
        state.isError = true;
        state.isModalErrorOpen = true;
        state.errMsg = 'Something wrong!';
      }
    });
    builder.addCase(fetchPostTreatmentProductService.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
      state.isModalErrorOpen = true;
      state.isModalSuccessOpen = false;
    });

    // Post Treatment To Clinic
    builder.addCase(fetchPostTreatmentToClinic.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchPostTreatmentToClinic.fulfilled, (state, {payload}) => {
      if (payload) {
        state.isLoading = false;
        state.isError = false;
        state.isModalSuccessPostToClinicOpen = true;
      } else {
        state.isLoading = false;
        state.isError = true;
        state.isModalErrorPostToClinicOpen = true;
        state.errMsg = 'Something wrong!';
      }
    });
    builder.addCase(fetchPostTreatmentToClinic.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
      state.isModalErrorPostToClinicOpen = true;
      state.isModalSuccessPostToClinicOpen = false;
    });

    // Put Treatment Product Service
    builder.addCase(fetchPutTreatmentProductService.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchPutTreatmentProductService.fulfilled, (state, {payload}) => {
      if (payload.data) {
        state.isLoading = false;
        state.isError = false;
        state.isModalSuccessOpen = true;
      } else {
        state.isLoading = false;
        state.isError = true;
        state.isModalErrorOpen = true;
        state.errMsg = 'Something wrong!';
      }
    });
    builder.addCase(fetchPutTreatmentProductService.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
      state.isModalErrorOpen = true;
      state.isModalSuccessOpen = false;
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setFormInformation: (state, {payload}) => {
      state.formProductService.information[payload.name] = payload.value;
    },
    setFormDetail: (state, {payload}) => {
      state.formProductService.detail[payload.name] = payload.value;
    },
    setFormCriteria: (state, {payload}) => {
      state.formProductService.criteria[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.name] = payload.value;
    },
    setIsModalSuccessOpen: (state, {payload}) => {
      state.isModalSuccessOpen = payload;
    },
    setIsModalErrorOpen: (state, {payload}) => {
      state.isModalErrorOpen = payload;
    },
    setClearFormProductService: (state) => {
      state.formProductService = initialState.formProductService;
    },
    setPageLocal: (state, {payload}) => {
      let first: any;
      if (payload.page < 0) {
        first = 0;
      } else {
        first = (payload.page * 10) - 10;
      }
      const last = payload.page * 10;
      state.pagination.currentData = state.pagination.masterData.slice(first, last);
      state.pagination.page = payload.page;
    },
  },
});

export const {
  setModal,
  setParams,
  setPageLocal,
  setFormDetail,
  setFormCriteria,
  setFormInformation,
  setIsModalErrorOpen,
  setIsModalSuccessOpen,
  setClearFormProductService,
} = productServiceSlice.actions;

export default productServiceSlice.reducer;
