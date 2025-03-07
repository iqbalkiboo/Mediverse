import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  banned,
  deleteClinic,
  getAllHealthFacilities,
  getDataDetail,
  getDataList,
  getDataListLocation,
  getDataListMasterPoli,
  getDataListPoli,
  getDataListProvider,
  getDetailDoctorList,
  getDetailHealthFacility,
  getDetailPolyList,
  getDetailServiceList,
  getDownloadTemplate,
  getHealthFacilitiesByProvider,
  getHealthFacilityByProvider,
  getListDoctor,
  getPolyByProvider,
  getPolysByProvider,
  patchRelated,
  postDataDoctorToClinic,
  postHealthFacility,
  postPoliHealthFacility,
  postUploadFile,
  putHealthFacility,
} from '@/src/client/healthFacility';
import { getDetailProvider } from '@/src/client/provider';
import { capitalizeFirstLetter } from '@/src/utils/formatText';

import type {
  IGetDataDetailHealthFacilityParams,
  IGetDataHealthFacilityParams,
} from '@/src/types/healthFacility';

const operationalHours = [
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
    notOpen: false,
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
    notOpen: false,
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
    notOpen: false,
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
    notOpen: false,
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
    notOpen: false,
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
    notOpen: false,
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
    notOpen: false,
  },
];

const initialState = {
  doctors: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  formModalDoctor: {
    open: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      doctors: null,
      doctorSip: '',
      polyIDs: [],
      treatmentIDs: [],
    },
  },
  isModalPoliOpen: false,
  isModalSuccessOpen: false,
  isModalErrorOpen: false,
  photoHealthFacility: '',
  modalEditRelated: {
    isError: false,
    isSuccess: false,
    errorMessage: '',
    successMessage: '',
    open: false,
  },
  detailPolyState: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    polyList: [],
    params: {
      page: 1,
      limit: 10,
    },
  },
  detailServiceState: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    serviceList: [],
    params: {
      page: 1,
      limit: 10,
    },
  },
  detailDoctorState: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    doctorList: [],
    params: {
      page: 1,
      limit: 10,
    },
  },
  params: {
    page: 1,
    date: '',
    limit: 10,
    offset: 0,
    status: 'false',
    keyword: '',
    totalData: 0,
    totalPage: 1,
    type: 'medevo',
  },
  paramsLocation: {
    province: '',
    districtOrCity: '',
    subDistrict: '',
    limit: 33,
  },
  pagination: {
    page: 1,
    limit: 10,
    totalPage: 1,
    masterData: [],
    currentData: [],
  },
  formHealthFacility: {
    data: {
      type: '',
      provider: '',
      id: '',
      name: '',
      phoneNumber: '',
      email: '',
      photo: '',
      province: '',
      provinceId: '',
      districtOrCity: '',
      districtOrCityId: '',
      subDistrict: '',
      subDistrictId: '',
      village: '',
      postalCode: '',
      street: '',
      longitude: '',
      latitude: '',
      operationalHours: operationalHours,
      polis: [] as any[],
      clientId: '',
      clientSecret: '',
      organizationId: '',
    },
    status: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      messsage: '',
    },
  },
  formInformation: {
    photo: '',
  },
  tabHealthFacility: {
    information: false,
    address: false,
    operationalHours: false,
    poli: false,
    configuration: false,
  },
  operationalHours: operationalHours,
  bannedFacility: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    isModalConfirmation: false,
    isModalConfirmationDelete: false,
  },
  formRelated: {
    detailRelated: [],
    related: [],
  },
  allHealthFacility: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    data: [],
    params: {
      page: 1,
      limit: 10,
      offset: 0,
      keyword: '',
      providerType: 'medevo',
    },
    metadata: {
      limit: 10,
      totalData: 1,
    },
  },
  listSlot: [],
  paramsNonAdmin: {
    keyword: '',
    page: 1,
    size: 10,
    type: 'medpoint-clinic',
  },
  modalUploadFile: false,
  uploadFile: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    channelId: '',
  },
  downloadFile: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
  },
  healthFacilities: {
    data: [],
    detail: {},
    listStatus: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: '',
    },
    detailStatus: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: '',
    },
    postStatus: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: '',
    },
    deleteStatus: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: '',
    },
  },
  businessSchema: {
    data: {},
    status: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      messsage: '',
    },
  },
  poli: {
    data: [],
    status: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      messsage: '',
    },
  },
  providers: {
    data: [],
    detail: {},
    status: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      messsage: '',
    },
  },
  locations: {
    data: [],
    status: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      messsage: '',
    },
  },
  masterPoli: {
    data: [],
    status: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      messsage: '',
    },
  },
};

export const resolvBannedFaskes = createAsyncThunk(
  'healthFacilities/resolvBannedFaskes',
  async (payload: any, { rejectWithValue }) => {
    const response = await banned(payload.id, payload.status, payload.type);
    if ([200, 201].includes(response.status)) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveHealthFacilitiesService = createAsyncThunk(
  'healthFacilities/resolveHealthFacilitiesService',
  async (payload: IGetDataHealthFacilityParams, { rejectWithValue }) => {
    const params = {
      page: payload.page,
      type: payload.type,
      limit: payload.limit,
      offset: payload.offset,
      keyword: payload.keyword,
      status: payload.status,
    };
    const response = await getDataList(params);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveBusinessHealthFacility = createAsyncThunk(
  'healthFacilities/business',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDetailProvider(payload.id, payload.providerType);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveHealthFacilityService = createAsyncThunk(
  'healthFacilities/resolveHealthFacilityService',
  async (
    payload: IGetDataDetailHealthFacilityParams,
    { rejectWithValue }: any
  ) => {
    try {
      const { id, type } = payload;
      const response = await getDataDetail(id, type);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailPolyList = createAsyncThunk(
  'healthFacilities/resolveDetailPolyList',
  async (
    payload: {
      clinicId: number | null;
      providerId: number | null;
    },
    { rejectWithValue }: any
  ) => {
    try {
      const response = await getDetailPolyList(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailServiceList = createAsyncThunk(
  'healthFacilities/resolveDetailServiceList',
  async (
    payload: {
      clinicId: number | null;
      providerId: number | null;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailServiceList(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveDetailDoctorList = createAsyncThunk(
  'healthFacilities/resolveDetailDoctorList',
  async (
    payload: {
      clinicId: number | null;
      providerId: number | null;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailDoctorList(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveListDoctor = createAsyncThunk(
  'resolve/healthFacilities/doctor/list',
  async (payload: any, { rejectWithValue }) => {
    const response = await getListDoctor(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListProvider = createAsyncThunk(
  'provider/service',
  async (_, { rejectWithValue }) => {
    const response = await getDataListProvider();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListLocation = createAsyncThunk(
  'pharmacy/province',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDataListLocation(
      payload.province,
      payload.districtOrCity,
      payload.subDistrict,
      payload.limit
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListPoli = createAsyncThunk(
  'healthFacilities/list/poli',
  async (
    payload: {
      channelId: string | number;
    },
    { rejectWithValue }
  ) => {
    const response = await getDataListPoli(payload.channelId);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListMasterPoli = createAsyncThunk(
  'healthFacilities/list/masterPoli',
  async (_, { rejectWithValue }) => {
    const response = await getDataListMasterPoli();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveDetailHealthFacility = createAsyncThunk(
  'healthFacilities/resolveDetailHealthFacility',
  async (
    payload: {
      channelId: string;
      itemId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailHealthFacility(
      payload.channelId,
      payload.itemId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveCreatePoliHealthFacility = createAsyncThunk(
  'healthFacility/create/poli',
  async (payload: any, { rejectWithValue }) => {
    const response = await postPoliHealthFacility(
      payload.channelId,
      payload.payload
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveUpdateHealthFacility = createAsyncThunk(
  'healthFacility/update',
  async (payload: any, { rejectWithValue }) => {
    const response = await putHealthFacility(
      payload.channelId,
      payload.itemId,
      payload.payload,
      payload.type
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolvePatchRelated = createAsyncThunk(
  'healthFacility/patch/related',
  async (
    payload: {
      type: string;
      id: any;
      payload: any;
    },
    { rejectWithValue }
  ) => {
    const response = await patchRelated(
      payload.type,
      payload.id,
      payload.payload
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetAllHealthFacility = createAsyncThunk(
  'healthFacility/getAll',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await getAllHealthFacilities(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetHealthFacilitysByProvider = createAsyncThunk(
  'healthFacility/getAll/byProviders',
  async (
    payload: {
      channelId: number;
      page: number;
      size: number;
      keyword: number;
    },
    { rejectWithValue }
  ) => {
    const response = await getHealthFacilitiesByProvider(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolvePostDoctorToClinic = createAsyncThunk(
  'resolve/healthFacility/doctorToClinic/post',
  async (payload: any, { rejectWithValue }) => {
    const response = await postDataDoctorToClinic(
      payload.channelId,
      payload.outletId,
      payload.data
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetPolysByProvider = createAsyncThunk(
  'healthFacility/getPolys/byProviders',
  async (
    payload: {
      channelId: number;
      page: number;
      size: number;
      keyword: number;
    },
    { rejectWithValue }
  ) => {
    const response = await getPolysByProvider(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetHealthFacilityByProvider = createAsyncThunk(
  'healthFacility/detail/byProviders',
  async (
    payload: {
      channelId: number;
      clinicId: number;
    },
    { rejectWithValue }
  ) => {
    const response = await getHealthFacilityByProvider(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetPolyByProvider = createAsyncThunk(
  'poly/detail/byProviders',
  async (
    payload: {
      channelId: number;
      id: number;
    },
    { rejectWithValue }
  ) => {
    const response = await getPolyByProvider(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const reolveCreateHealthFacility = createAsyncThunk(
  'healthFacility/create',
  async (payload: { id; data }, { rejectWithValue }) => {
    const response = await postHealthFacility(payload.id, payload.data);
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveUploadFile = createAsyncThunk(
  'healthFacilities/upload',
  async (
    payload: {
      file: any;
      channelId: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postUploadFile(payload.file, payload.channelId);
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveDeleteClinic = createAsyncThunk(
  'healthFacility/delete',
  async (payload: { channelId; clinicId }, { rejectWithValue }) => {
    const response = await deleteClinic(payload.channelId, payload.clinicId);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveDownloadFile = createAsyncThunk(
  'healthFacilities/download',
  async (_, { rejectWithValue }) => {
    const response = await getDownloadTemplate();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

const healthFacilitySlice = createSlice({
  name: 'healthFacility',
  initialState,
  extraReducers: (builder) => {
    // Get List Faskes
    builder.addCase(resolveHealthFacilitiesService.pending, (state) => {
      state.healthFacilities.listStatus.isLoading = true;
      state.healthFacilities.listStatus.isSuccess = false;
      state.healthFacilities.listStatus.isError = false;
    });
    builder.addCase(
      resolveHealthFacilitiesService.fulfilled,
      (state, { payload }) => {
        state.healthFacilities.listStatus.isLoading = false;
        state.healthFacilities.listStatus.isSuccess = true;
        state.healthFacilities.data = payload;
        state.pagination.masterData = payload;
        state.pagination.totalPage = Math.ceil(parseInt(payload.length) / 10);
        state.pagination.currentData = payload;
      }
    );
    builder.addCase(
      resolveHealthFacilitiesService.rejected,
      (state, { payload }: any) => {
        state.healthFacilities.listStatus.isLoading = false;
        state.healthFacilities.listStatus.isError = true;
        state.healthFacilities.listStatus.message =
          payload?.message || 'Gagal Mendapatkan Data Faskes!';
      }
    );

    // Get Business Health Facility
    builder.addCase(resolveBusinessHealthFacility.pending, (state) => {
      state.businessSchema.status.isLoading = true;
      state.businessSchema.status.isSuccess = false;
      state.businessSchema.status.isError = false;
    });
    builder.addCase(
      resolveBusinessHealthFacility.fulfilled,
      (state, { payload }) => {
        state.businessSchema.status.isLoading = false;
        state.businessSchema.status.isSuccess = true;
        state.businessSchema.data = payload.data;
        state.providers.detail = payload.data;
      }
    );
    builder.addCase(
      resolveBusinessHealthFacility.rejected,
      (state, { payload }: any) => {
        state.businessSchema.status.isLoading = false;
        state.businessSchema.status.isError = true;
        state.businessSchema.status.messsage =
          payload?.message || 'Gagal Mendapatkan Data';
      }
    );

    // Get Information Faskes
    builder.addCase(resolveHealthFacilityService.pending, (state) => {
      state.healthFacilities.detailStatus.isLoading = true;
      state.healthFacilities.detailStatus.isSuccess = false;
      state.healthFacilities.detailStatus.isError = false;
    });
    builder.addCase(
      resolveHealthFacilityService.fulfilled,
      (state, { payload }) => {
        state.healthFacilities.detailStatus.isLoading = false;
        state.healthFacilities.detailStatus.isSuccess = true;
        state.healthFacilities.detail = payload;
        state.formRelated.detailRelated = payload?.related || [];
        state.formRelated.related = payload?.related || [];
      }
    );
    builder.addCase(
      resolveHealthFacilityService.rejected,
      (state, { payload }: any) => {
        state.healthFacilities.detailStatus.isLoading = false;
        state.healthFacilities.detailStatus.isError = true;
        state.healthFacilities.detailStatus.message =
          payload?.message || 'Gagal Mendapatkan Data!';
      }
    );

    // Get Poly List
    builder.addCase(resolveDetailPolyList.pending, (state) => {
      state.detailPolyState.isLoading = true;
      state.detailPolyState.isError = false;
    });
    builder.addCase(resolveDetailPolyList.fulfilled, (state, { payload }) => {
      state.detailPolyState.isLoading = false;
      state.detailPolyState.isError = false;
      state.detailPolyState.polyList = payload.data.poly || [];
    });
    builder.addCase(
      resolveDetailPolyList.rejected,
      (state, { payload }: any) => {
        state.detailPolyState.isLoading = false;
        state.detailPolyState.isError = true;
        state.detailPolyState.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Poli!';
      }
    );

    // Get Service List
    builder.addCase(resolveDetailServiceList.pending, (state) => {
      state.detailServiceState.isLoading = true;
      state.detailServiceState.isError = false;
    });
    builder.addCase(
      resolveDetailServiceList.fulfilled,
      (state, { payload }) => {
        state.detailServiceState.isLoading = false;
        state.detailServiceState.isError = false;
        state.detailServiceState.serviceList = payload?.data || [];
      }
    );
    builder.addCase(
      resolveDetailServiceList.rejected,
      (state, { payload }: any) => {
        state.detailServiceState.isLoading = false;
        state.detailServiceState.isError = true;
        state.detailServiceState.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Servis!';
      }
    );

    // Get Doctor List
    builder.addCase(resolveDetailDoctorList.pending, (state) => {
      state.detailDoctorState.isLoading = true;
      state.detailDoctorState.isError = false;
    });
    builder.addCase(resolveDetailDoctorList.fulfilled, (state, { payload }) => {
      state.detailDoctorState.isLoading = false;
      state.detailDoctorState.isError = false;
      state.detailDoctorState.doctorList = payload?.data || [];
    });
    builder.addCase(
      resolveDetailDoctorList.rejected,
      (state, { payload }: any) => {
        state.detailDoctorState.isLoading = false;
        state.detailDoctorState.isError = true;
        state.detailDoctorState.errorMessage = payload?.message
          ? capitalizeFirstLetter(payload?.message)
          : 'Gagal Mendapatkan Data Dokter!';
      }
    );

    // Get Doctor List OR
    builder.addCase(resolveListDoctor.pending, (state) => {
      state.doctors.isLoading = true;
      state.doctors.isError = false;
    });
    builder.addCase(resolveListDoctor.fulfilled, (state, { payload }) => {
      state.doctors.isLoading = false;
      state.doctors.isError = false;
      state.doctors.data = payload.data || [];
    });
    builder.addCase(resolveListDoctor.rejected, (state, { payload }: any) => {
      state.doctors.isLoading = false;
      state.doctors.isError = true;
      state.doctors.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data Dokter!';
    });

    // Get List Provider for Select
    builder.addCase(resolveGetListProvider.pending, (state) => {
      state.providers.status.isLoading = true;
      state.providers.status.isSuccess = false;
      state.providers.status.isError = false;
    });
    builder.addCase(resolveGetListProvider.fulfilled, (state, { payload }) => {
      state.providers.status.isLoading = false;
      state.providers.status.isSuccess = true;
      state.providers.data = payload.data;
    });
    builder.addCase(
      resolveGetListProvider.rejected,
      (state, { payload }: any) => {
        state.providers.status.isLoading = false;
        state.providers.status.isError = true;
        state.providers.status.messsage =
          payload?.message || 'Gagal Mendapatkan Data Provider';
      }
    );

    // Get List Location for Select
    builder.addCase(resolveGetListLocation.pending, (state) => {
      state.locations.status.isLoading = true;
      state.locations.status.isSuccess = false;
      state.locations.status.isError = false;
    });
    builder.addCase(resolveGetListLocation.fulfilled, (state, { payload }) => {
      state.locations.status.isLoading = false;
      state.locations.status.isSuccess = true;
      state.locations.data = payload.data;
    });
    builder.addCase(
      resolveGetListLocation.rejected,
      (state, { payload }: any) => {
        state.locations.status.isLoading = false;
        state.locations.status.isError = true;
        state.locations.status.messsage =
          payload?.message || 'Gagal Mendapatkan Data Lokasi';
      }
    );

    // Get List Poli for Select
    builder.addCase(resolveGetListPoli.pending, (state) => {
      state.poli.status.isLoading = true;
      state.poli.status.isSuccess = false;
      state.poli.status.isError = false;
    });
    builder.addCase(resolveGetListPoli.fulfilled, (state, { payload }) => {
      state.poli.status.isLoading = false;
      state.poli.status.isSuccess = true;
      state.poli.data = payload.data;
    });
    builder.addCase(resolveGetListPoli.rejected, (state, { payload }: any) => {
      state.poli.status.isLoading = false;
      state.poli.status.isError = true;
      state.poli.status.messsage =
        payload?.message || 'Gagal Mendapatkan Data Poli';
    });

    // Get List Master Poli for Select Edit Related
    builder.addCase(resolveGetListMasterPoli.pending, (state) => {
      state.masterPoli.status.isLoading = true;
      state.masterPoli.status.isSuccess = false;
      state.masterPoli.status.isError = false;
    });
    builder.addCase(
      resolveGetListMasterPoli.fulfilled,
      (state, { payload }) => {
        state.masterPoli.status.isLoading = false;
        state.masterPoli.status.isSuccess = true;
        state.masterPoli.data = payload.data;
      }
    );
    builder.addCase(
      resolveGetListMasterPoli.rejected,
      (state, { payload }: any) => {
        state.masterPoli.status.isLoading = false;
        state.masterPoli.status.isError = true;
        state.masterPoli.status.messsage =
          payload?.message || 'Gagal Mendapatkan Data Master Poli';
      }
    );

    // Get Detail Health Facility
    builder.addCase(resolveDetailHealthFacility.pending, (state) => {
      state.formHealthFacility.status.isLoading = true;
      state.formHealthFacility.status.isSuccess = false;
      state.formHealthFacility.status.isError = false;
    });
    builder.addCase(
      resolveDetailHealthFacility.fulfilled,
      (state, { payload }) => {
        state.formHealthFacility.status.isLoading = false;
        state.formHealthFacility.status.isSuccess = true;
        state.formHealthFacility.data = {
          type: '',
          provider: '',
          id: payload?.data?.id || '',
          name: payload?.data?.name || '',
          phoneNumber: payload?.data?.phone || '',
          email: payload?.data?.email || '',
          photo: payload?.data?.image || '',
          province: payload?.data?.address?.province || '',
          provinceId: payload?.data?.address.provinceId || '',
          districtOrCity: payload?.data?.address?.city || '',
          districtOrCityId: payload?.data?.address?.cityId || '',
          subDistrict: payload?.data?.address?.subDistrict || '',
          subDistrictId: payload?.data?.address?.subDistrictId || '',
          village: payload?.data?.address?.village || '',
          postalCode: payload?.data?.address?.postcode || '',
          street: payload?.data?.address?.street || '',
          longitude: payload?.data?.address?.longitude || '',
          latitude: payload?.data?.address?.latitude || '',
          clientId: payload?.data?.clientId || '',
          clientSecret: payload?.data?.clientSecret || '',
          organizationId: payload?.data?.organizationId || '',
          operationalHours: state.formHealthFacility.data.operationalHours,
          polis:
            payload?.data?.poly?.map((item: any) => {
              return {
                id: item?.id || '',
                name: item?.name || '',
                categoryId: item?.categoryId,
                categoryName: item?.categoryName,
              };
            }) || [],
        };
        payload?.data?.openHours?.forEach((item, idx: number) => {
          let openHours;
          let openMinute;
          let closeHours;
          let closeMinute;
          if (item.openTime || item.closeTime) {
            openHours = item.openTime?.split(':')[0] || 0;
            openMinute = item.openTime?.split(':')[1] || 0;
            closeHours = item.closeTime?.split(':')[0] || 0;
            closeMinute = item.closeTime?.split(':')[1] || 0;
          }

          state.operationalHours[idx]['24HrsOpen'] = item['24HrsOpen'];
          state.operationalHours[idx]['notOpen'] =
            !item?.['24HrsOpen'] && !item?.closeTime && !item?.openTime;
          state.operationalHours[idx]['openTime'] = new Date().setHours(
            openHours,
            openMinute
          );
          state.operationalHours[idx]['closeTime'] = new Date().setHours(
            closeHours,
            closeMinute
          );
          state.operationalHours[idx]['day'] = item.day;

          state.formHealthFacility.data.operationalHours[idx]['24HrsOpen'] =
            item['24HrsOpen'];
          state.formHealthFacility.data.operationalHours[idx]['notOpen'] =
            !item?.['24HrsOpen'] && !item?.closeTime && !item?.openTime;
          state.formHealthFacility.data.operationalHours[idx]['openTime'] =
            new Date().setHours(openHours, openMinute);
          state.formHealthFacility.data.operationalHours[idx]['closeTime'] =
            new Date().setHours(closeHours, closeMinute);
          state.formHealthFacility.data.operationalHours[idx]['day'] = item.day;
        });
      }
    );
    builder.addCase(
      resolveDetailHealthFacility.rejected,
      (state, { payload }: any) => {
        state.formHealthFacility.status.isLoading = false;
        state.formHealthFacility.status.isError = true;
        state.formHealthFacility.status.messsage =
          payload?.message || 'Gagal Mendapatkan Data Faskes';
      }
    );

    // Post Create Poli Health Facility
    builder.addCase(resolveCreatePoliHealthFacility.pending, () => {});
    builder.addCase(
      resolveCreatePoliHealthFacility.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formHealthFacility.data = {
            ...state.formHealthFacility.data,
            polis: [
              ...state.formHealthFacility.data.polis,
              {
                id: payload?.data?.id,
                name: payload?.data?.name,
                categoryId: payload?.data?.categoryId,
                categoryName: payload?.data?.categoryName,
              },
            ],
          };
        }
      }
    );
    builder.addCase(resolveCreatePoliHealthFacility.rejected, () => {});

    // Banned Facility
    builder.addCase(resolvBannedFaskes.pending, (state) => {
      state.bannedFacility.isLoading = true;
      state.bannedFacility.isError = false;
    });
    builder.addCase(resolvBannedFaskes.fulfilled, (state) => {
      state.bannedFacility.isLoading = false;
      state.bannedFacility.isError = false;
      state.bannedFacility.isSuccess = true;
      state.bannedFacility.isModalConfirmation = false;
    });
    builder.addCase(resolvBannedFaskes.rejected, (state) => {
      state.bannedFacility.isLoading = false;
      state.bannedFacility.isError = true;
      state.bannedFacility.isSuccess = false;
      state.bannedFacility.errorMessage = 'Something wrong!';
    });

    // Get All Health Facility
    builder.addCase(resolveGetAllHealthFacility.pending, (state) => {
      state.allHealthFacility.isLoading = true;
      state.allHealthFacility.isError = false;
    });
    builder.addCase(
      resolveGetAllHealthFacility.fulfilled,
      (state, { payload }) => {
        state.allHealthFacility.isLoading = false;
        state.allHealthFacility.isError = false;
        state.allHealthFacility.data = payload;
        state.allHealthFacility.metadata.totalData = payload.length;
      }
    );
    builder.addCase(resolveGetAllHealthFacility.rejected, (state) => {
      state.allHealthFacility.isLoading = false;
      state.allHealthFacility.isError = true;
      state.allHealthFacility.errorMessage = 'Something wrong!';
    });
    // Get health facilities by provider
    builder.addCase(resolveGetHealthFacilitysByProvider.pending, (state) => {
      state.healthFacilities.listStatus.isLoading = true;
      state.healthFacilities.listStatus.isError = false;
      state.healthFacilities.listStatus.isSuccess = false;
    });
    builder.addCase(
      resolveGetHealthFacilitysByProvider.fulfilled,
      (state, { payload }) => {
        state.healthFacilities.listStatus.isLoading = false;
        state.healthFacilities.listStatus.isSuccess = true;
        state.healthFacilities.data = payload.data;
        state.params.totalData = payload.metadata.total_data;
        state.params.totalPage = payload.metadata.total_page;
      }
    );
    builder.addCase(resolveGetHealthFacilitysByProvider.rejected, (state) => {
      state.healthFacilities.listStatus.isLoading = false;
      state.healthFacilities.listStatus.isError = true;
    });
    // Get Polys by provider
    builder.addCase(resolveGetPolysByProvider.pending, (state) => {
      state.healthFacilities.listStatus.isLoading = true;
      state.healthFacilities.listStatus.isError = false;
      state.healthFacilities.listStatus.isSuccess = false;
    });
    builder.addCase(
      resolveGetPolysByProvider.fulfilled,
      (state, { payload }) => {
        state.healthFacilities.listStatus.isLoading = false;
        state.healthFacilities.listStatus.isSuccess = true;
        state.healthFacilities.data = payload.data;
        state.params.totalData = payload.metadata.total_data;
        state.params.totalPage = payload.metadata.total_page;
      }
    );
    builder.addCase(resolveGetPolysByProvider.rejected, (state) => {
      state.healthFacilities.listStatus.isLoading = false;
      state.healthFacilities.listStatus.isError = true;
    });
    // get detail health facility by provider
    builder.addCase(resolveGetHealthFacilityByProvider.pending, (state) => {
      state.healthFacilities.listStatus.isLoading = true;
      state.healthFacilities.listStatus.isError = false;
      state.healthFacilities.listStatus.isSuccess = false;
    });
    builder.addCase(
      resolveGetHealthFacilityByProvider.fulfilled,
      (state, { payload }) => {
        state.healthFacilities.listStatus.isLoading = false;
        state.healthFacilities.listStatus.isSuccess = true;
        state.healthFacilities.detail = payload.data;
      }
    );
    builder.addCase(resolveGetHealthFacilityByProvider.rejected, (state) => {
      state.healthFacilities.listStatus.isLoading = false;
      state.healthFacilities.listStatus.isError = true;
    });
    // get detail health facility by provider
    builder.addCase(resolveGetPolyByProvider.pending, (state) => {
      state.healthFacilities.listStatus.isLoading = true;
      state.healthFacilities.listStatus.isError = false;
      state.healthFacilities.listStatus.isSuccess = false;
    });
    builder.addCase(
      resolveGetPolyByProvider.fulfilled,
      (state, { payload }) => {
        state.healthFacilities.listStatus.isLoading = false;
        state.healthFacilities.listStatus.isSuccess = true;
        state.healthFacilities.detail = payload.data;
      }
    );
    builder.addCase(resolveGetPolyByProvider.rejected, (state) => {
      state.healthFacilities.listStatus.isLoading = false;
      state.healthFacilities.listStatus.isError = true;
    });

    // Post Doctor Category
    builder.addCase(resolvePostDoctorToClinic.pending, (state) => {
      state.formModalDoctor.isLoading = true;
      state.formModalDoctor.isError = false;
    });
    builder.addCase(resolvePostDoctorToClinic.fulfilled, (state) => {
      state.formModalDoctor.isLoading = false;
      state.formModalDoctor.isSuccess = true;
      state.formModalDoctor.successMessage = 'Berhasil menambahkan dokter';
    });
    builder.addCase(resolvePostDoctorToClinic.rejected, (state) => {
      state.formModalDoctor.isLoading = false;
      state.formModalDoctor.isError = true;
      state.formModalDoctor.errorMessage = 'Gagal menambahkan dokter';
    });

    // Post Create Health Facility
    builder.addCase(reolveCreateHealthFacility.pending, (state) => {
      state.healthFacilities.postStatus.isLoading = true;
      state.healthFacilities.postStatus.isSuccess = false;
      state.healthFacilities.postStatus.isError = false;
    });
    builder.addCase(reolveCreateHealthFacility.fulfilled, (state) => {
      state.healthFacilities.postStatus.isLoading = false;
      state.healthFacilities.postStatus.isSuccess = true;
      state.isModalSuccessOpen = true;
    });
    builder.addCase(reolveCreateHealthFacility.rejected, (state) => {
      state.healthFacilities.postStatus.isLoading = false;
      state.healthFacilities.postStatus.isError = true;
      state.isModalErrorOpen = true;
      state.isModalSuccessOpen = false;
    });

    // Upload file
    builder.addCase(resolveUploadFile.pending, (state) => {
      state.uploadFile.isLoading = true;
      state.uploadFile.isError = false;
      state.uploadFile.isSuccess = false;
    });
    builder.addCase(resolveUploadFile.fulfilled, (state, { payload }) => {
      state.uploadFile.isLoading = false;
      state.uploadFile.isError = false;
      state.uploadFile.isSuccess = true;
      state.uploadFile.message = payload.message;
      state.modalUploadFile = false;
    });
    builder.addCase(resolveUploadFile.rejected, (state) => {
      state.uploadFile.isLoading = false;
      state.uploadFile.isError = true;
      state.uploadFile.isSuccess = false;
    });

    // Download file
    builder.addCase(resolveDownloadFile.pending, (state) => {
      state.downloadFile.isLoading = true;
      state.downloadFile.isError = false;
      state.downloadFile.isSuccess = false;
    });
    builder.addCase(resolveDownloadFile.fulfilled, (state, { payload }) => {
      state.downloadFile.isLoading = false;
      state.downloadFile.isError = false;
      state.downloadFile.isSuccess = true;
      state.downloadFile.message = payload.message;
      state.downloadFile.data = payload;
    });
    builder.addCase(resolveDownloadFile.rejected, (state, { payload }: any) => {
      state.downloadFile.isLoading = false;
      state.downloadFile.isError = true;
      state.downloadFile.isSuccess = false;
      state.downloadFile.message = payload?.data?.message;
    });
    // Update Health Facility
    builder.addCase(resolveUpdateHealthFacility.pending, (state) => {
      state.healthFacilities.postStatus.isLoading = true;
      state.healthFacilities.postStatus.isSuccess = false;
      state.healthFacilities.postStatus.isError = false;
    });
    builder.addCase(resolveUpdateHealthFacility.fulfilled, (state) => {
      state.healthFacilities.postStatus.isLoading = false;
      state.healthFacilities.postStatus.isSuccess = true;
      state.isModalSuccessOpen = true;
    });
    builder.addCase(resolveUpdateHealthFacility.rejected, (state) => {
      state.healthFacilities.postStatus.isLoading = false;
      state.healthFacilities.postStatus.isError = true;
      state.isModalErrorOpen = true;
      state.isModalSuccessOpen = false;
    });
    // delete helath facility
    builder.addCase(resolveDeleteClinic.pending, (state) => {
      state.healthFacilities.deleteStatus.isLoading = true;
      state.healthFacilities.deleteStatus.isSuccess = false;
      state.healthFacilities.deleteStatus.isError = false;
    });
    builder.addCase(resolveDeleteClinic.fulfilled, (state) => {
      state.healthFacilities.deleteStatus.isLoading = false;
      state.healthFacilities.deleteStatus.isSuccess = true;
    });
    builder.addCase(resolveDeleteClinic.rejected, (state, { payload }: any) => {
      state.healthFacilities.deleteStatus.isLoading = false;
      state.healthFacilities.deleteStatus.isError = true;
      state.healthFacilities.deleteStatus.message = payload?.data?.message;
    });
  },
  reducers: {
    setFormDoctor: (state, { payload }) => {
      if (payload.name === 'doctors') {
        state.formModalDoctor.form[payload.name] = payload.value;
      } else if (
        payload.name === 'treatmentIDs' ||
        payload.name === 'polyIDs'
      ) {
        state.formModalDoctor.form[payload.name].push(payload.value);
      } else {
        state.formModalDoctor.form[payload.name] = payload.value;
      }
    },
    setParams: (state, { payload }) => {
      state.params[payload.key] = payload.value;
    },
    setIsModalPoliOpen: (state, { payload }) => {
      state.isModalPoliOpen = payload;
    },
    setIsModalSuccessOpen: (state, { payload }) => {
      state.isModalSuccessOpen = payload;
    },
    setIsModalErrorOpen: (state, { payload }) => {
      state.isModalErrorOpen = payload;
    },
    setFormHealthFacility: (state, { payload }) => {
      state.formHealthFacility.data = payload;
    },
    setUpdateFormHealthFacility: (state, { payload }) => {
      state.formHealthFacility.data[payload.name] = payload.value;
    },
    setClearFormHealthFacility: (state) => {
      state.formHealthFacility = initialState.formHealthFacility;
      state.tabHealthFacility = initialState.tabHealthFacility;
      state.formInformation = initialState.formInformation;
    },
    setOperationalHours: (state, { payload }) => {
      state.operationalHours[payload.index][payload.name] = payload.value;
    },
    setUpdateOperationalHours: (state, { payload }) => {
      state.formHealthFacility.data.operationalHours[payload.index][
        payload.name
      ] = payload.value;
    },
    setParamsLocation: (state, { payload }) => {
      state.paramsLocation[payload.name] = payload.value;
    },
    setTabHealthFacility: (state, { payload }) => {
      state.tabHealthFacility[payload.name] = payload.value;
    },
    setFormInformation: (state, { payload }) => {
      state.formInformation[payload.name] = payload.value;
    },
    clearState: () => initialState,
    setPageLocal: (state, { payload }) => {
      let first: any;
      if (payload.page < 0) {
        first = 0;
      } else {
        first = payload.page * 10 - 10;
      }
      const last = payload.page * 10;
      state.pagination.currentData = state.pagination.masterData.slice(
        first,
        last
      );
      state.pagination.page = payload.page;
    },
    setBannedFacility: (state, { payload }) => {
      state.bannedFacility[payload.name] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.name].open = payload.value;
    },
    setModalFormDoctor: (state, { payload }) => {
      state.formModalDoctor[payload.name] = payload.value;
    },
    setIsModalSuccessEditRelated: (state, { payload }) => {
      state.modalEditRelated.isSuccess = payload.value;
    },
    setIsModalErrorEditRelated: (state, { payload }) => {
      state.modalEditRelated.isError = payload.value;
    },
    setClearFormRelated: (state, { payload }) => {
      state.formRelated.related = payload;
    },
    setAllHealthFacilityMetadata: (state, { payload }) => {
      state.allHealthFacility.metadata[payload.label] = payload.value;
    },
    setAllHealthFacilityParams: (state, { payload }) => {
      state.allHealthFacility.params[payload.label] = payload.value;
    },
    setParamsNonAdmin: (state, { payload }) => {
      state.paramsNonAdmin[payload.key] = payload.value;
    },
    setModalUploadFile: (state, { payload }) => {
      state.modalUploadFile = payload;
    },
    resetStatusHelathFacility: (state) => {
      state.healthFacilities.listStatus =
        initialState.healthFacilities.listStatus;
      state.healthFacilities.postStatus =
        initialState.healthFacilities.postStatus;
      state.healthFacilities.detailStatus =
        initialState.healthFacilities.detailStatus;
      state.healthFacilities.deleteStatus =
        initialState.healthFacilities.deleteStatus;
    },
    resetStatusUploadFile: (state) => {
      state.uploadFile = initialState.uploadFile;
      state.downloadFile = initialState.downloadFile;
    },
    setChannelIdUpload: (state, { payload }) => {
      state.uploadFile.channelId = payload.channelId;
    },
  },
});

export const {
  setModal,
  clearState,
  setPageLocal,
  setFormDoctor,
  setParamsLocation,
  setModalFormDoctor,
  setFormInformation,
  setIsModalPoliOpen,
  setOperationalHours,
  setClearFormRelated,
  setIsModalErrorOpen,
  setTabHealthFacility,
  setIsModalSuccessOpen,
  setFormHealthFacility,
  setUpdateOperationalHours,
  setClearFormHealthFacility,
  setUpdateFormHealthFacility,
  setBannedFacility,
  setIsModalErrorEditRelated,
  setIsModalSuccessEditRelated,
  setAllHealthFacilityMetadata,
  setAllHealthFacilityParams,
  setParamsNonAdmin,
  setModalUploadFile,
  resetStatusUploadFile,
  setChannelIdUpload,
  setParams,
  resetStatusHelathFacility,
} = healthFacilitySlice.actions;

export default healthFacilitySlice.reducer;
