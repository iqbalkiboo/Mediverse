import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBankAccountProvider,
  getBankAccounts,
  getBankList,
  getDataList,
  getDataListPlatformFeeServices,
  getDetailProvider,
  getDownloadProviderFile,
  getMemberList,
  getResourceDataList,
  getResourceDataListMedpoint,
  patchPaymentSecondary,
  postBusiness,
  postImage,
  postPayment,
  postProvider,
  postResourceDataList,
  postResourceDataListMedpoint,
  postSyncProvider,
  postUploadProvidedrFile,
  putBusiness,
  putPayment,
  putProvider,
  putResourceDataList,
} from '@/client/provider';
import { buildParams } from '@/src/utils/buildParams';
import { decryptCFBMode } from '@/src/mappers/aes/decrypt';
import { paths } from '@/src/configs';
import Axios from '@/src/client/services';
import secure from '@/src/utils/secure';

const initialState = {
  resourceDataList: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  formProvider: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      formDataListExternal: {
        formMappingProduct: {
          isSuccess: false,
          dataUploadCsv: [],
          dataMapping: [],
          productFileName: '',
          productName: '',
          category: '',
          type: '',
          productType: '',
          description: '',
          sku: '',
          manufacturer: '',
          distributionNumber: '',
          length: '',
          height: '',
          width: '',
          weight: '',
          minQty: '',
          dosage: '',
          sideEffect: '',
          contraIndication: '',
          indication: '',
          howToUse: '',
          storage: '',
          specialAttention: '',
          batchNumber: '',
          expiredDate: '',
          imageUrl: '',
          unit: '',
          price: '',
          username: '',
          password: '',
          authUrl: '',
          usernameToken: '',
          passwordToken: '',
          refreshUrl: '',
          refreshDuration: '',
          key: '',
          secret: '',
          apiProduct: '',
          composition: '',
          dosageForm: '',
        },
        formMappingOutlet: {
          isSuccess: false,
          dataUploadCsv: [],
          dataMapping: [],
          outletFileName: '',
          code: '',
          name: '',
          phoneNumber: '',
          pic: '',
          apa: '',
          sipa: '',
          acceptInstantDelivery: '',
          isPickupOutletAvailable: '',
          deliveryServiceAvailable: '',
          picture: '',
          provinceCode: '',
          province: '',
          cityCode: '',
          city: '',
          districtCode: '',
          district: '',
          villageCode: '',
          village: '',
          postCode: '',
          longitude: '',
          latitude: '',
          street: '',
          isHub: '',
          apiOutlet: '',
          openHours: '',
          practiceHours: '',
        },
        formMappingReference: {
          isSuccess: false,
          dataUploadCsv: [],
          dataMapping: [],
          referenceFileName: '',
          outletCode: '',
          productSku: '',
          stock: '',
          price: '',
          apiReference: '',
        },
        formMappingClinic: {
          isSuccess: false,
          id: '',
          name: '',
          email: '',
          phoneNumber: '',
          village: '',
          villageId: '',
          district: '',
          districtId: '',
          subDistrict: '',
          subDistrictId: '',
          city: '',
          cityId: '',
          province: '',
          provinceId: '',
          street: '',
          postcode: '',
          longitude: '',
          latitude: '',
          openHours: '',
          type: '',
          image: '',
          clinicType: '',
        },
        formMappingDoctor: {
          isSuccess: false,
          id: '',
          name: '',
          email: '',
          phoneNumber: '',
          foto: '',
          gender: '',
          nomorSip: '',
          nomorStr: '',
          specialis: '',
          tanggalLahir: '',
          tempatLahir: '',
          bahasa: '',
          biografi: '',
          clinic: '',
          treatments: '',
        },
        formMappingTreatment: {
          isSuccess: false,
          id: '',
          name: '',
          code: '',
          benefit: '',
          description: '',
          preparation: '',
          procedure: '',
          price: '',
          customerPrice: '',
          type: '',
          image: '',
          clinic: '',
          poly: '',
          doctors: '',
        },
        formMappingPoly: {
          isSuccess: false,
          id: '',
          name: '',
          code: '',
          category: '',
          image: '',
          clinic: '',
        },
        formMappingPlacementOrder: {
          isSuccess: false,
          itemId: '',
          itemQty: '',
          itemKey: '',
          latitude: '',
          username: '',
          outletId: '',
          longitude: '',
          itemPrice: '',
          orderTime: '',
          phoneNumber: '',
          deliveryType: '',
          transactionId: '',
          apiPlacementOrder: '',
          apiPlacementOrderMethod: '',
          apiPlacementOrderResponseId: '',
        },
        formMappingUpdateStatus: {
          isSuccess: false,
          transactionId: '',
          status: '',
          dataMapping: [],
          apiUpdate: '',
          apiUpdateMethod: '',
        },
      },
    },
  },
  syncProvider: {
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  formScheme: false,
  formFactor: false,
  formFee: false,
  modalConfirmationSchema: false,
  modalConfirmationSelling: false,
  modalConfirmationPlatform: false,
  channelId: '',
  businessSchemaParams: {
    startDuration: new Date(),
    endDuration: '',
  },
  type: '',
  listMember: {
    data: [],
    datas: [],
    params: {
      search: '',
      limit: 10,
      page: 1,
      totalData: 0,
      totalPage: 1,
      first: 0,
      last: 10,
    },
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
  },
  resource: {
    key: '',
    type: '',
    prefix: '',
    secret: '',
    username: '',
    password: '',
    apiRefund: '',
    apiOutlet: '',
    apiUpdate: '',
    apiProduct: '',
    authConfig: '',
    secretToken: '',
    apiReference: '',
    apiCancelOrder: '',
    apiPlacementOrder: '',
    placementOrderCanceledUrl: '',
    placementOrderComplitedUrl: '',
    placementOrderUrl: '',
    isOpenPassword: false,
    apiPoly: '',
    apiClinic: '',
    apiDoctor: '',
    apiTreatment: '',
    authUrl: '',
    usernameToken: '',
    passwordToken: '',
    refreshUrl: '',
    refreshDuration: 0,
  },
  linkApi: {
    apiProduct: {
      link: '',
      requestPage: '',
      requestLimit: '',
      responsePage: '',
      responseLimit: '',
      requestTotalPage: '',
      responseTotalPage: '',
    },
    apiOutlet: {
      link: '',
      requestPage: '',
      requestLimit: '',
      responsePage: '',
      responseLimit: '',
      requestTotalPage: '',
      responseTotalPage: '',
    },
    apiReference: {
      link: '',
      requestPage: '',
      requestLimit: '',
      responsePage: '',
      responseLimit: '',
      requestTotalPage: '',
      responseTotalPage: '',
    },
    apiPlacementOrder: {
      link: '',
      method: '',
      responseId: '',
      header: {
        key: '',
        value: '',
      },
      query: {
        key: '',
        value: '',
      },
      isSuccess: '',
    },
    apiUpdateStatus: {
      link: '',
      method: '',
      header: {
        key: '',
        value: '',
      },
      query: {
        key: '',
        value: '',
      },
      isSuccess: '',
    },
    apiClinic: {
      link: '',
      requestPage: '',
      requestLimit: '',
      responseLimit: '',
      requestTotalPage: '',
      responseTotalPage: '',
      responseData: '',
    },
    apiDoctor: {
      link: '',
      requestPage: '',
      requestLimit: '',
      responseLimit: '',
      requestTotalPage: '',
      responseTotalPage: '',
      responseData: '',
    },
    apiPoly: {
      link: '',
      requestPage: '',
      requestLimit: '',
      responseLimit: '',
      requestTotalPage: '',
      responseTotalPage: '',
      responseData: '',
    },
    apiTreatment: {
      link: '',
      requestPage: '',
      requestLimit: '',
      responseLimit: '',
      requestTotalPage: '',
      responseTotalPage: '',
      responseData: '',
    },
    apiCompleteOrder: {
      link: '',
      requestPage: '',
      requestLimit: '',
      responseLimit: '',
      requestTotalPage: '',
      responseTotalPage: '',
      responseData: '',
    },
  },
  formInfromationStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  formInformationData: {
    name: '',
    pic: '',
    email: '',
    phoneNumber: '',
    isOfficial: false,
    type: '',
    providerType: '',
    address: '',
    description: '',
    isActive: true,
    tags: [],
    image: '',
    integrationOption: '',
    resource: {
      getCityByProvinceUrl: '',
      getDistrictByCityUrl: '',
      getDrugByCategoryUrl: '',
      getDrugCategoryByGroupUrl: '',
      getDrugGroupUrl: '',
      getDrugRecomendedUrl: '',
      getOutleByCityUrl: '',
      getProvinceUrl: '',
      getVillageByDistrictUrl: '',
      placementOrderCanceledUrl: '',
      placementOrderComplitedUrl: '',
      placementOrderUrl: '',
      secret: '',
      get_clinic_url: '',
      get_poly_url: '',
      get_doctor_url: '',
      get_clinic_treatment_url: '',
      get_lab_url: '',
      get_lab_treatment_url: '',
    },
  },
  formPayment: {
    accountNumber: '',
    bankName: '',
    email: '',
    accountName: '',
    channelId: 0,
    aliasName: '',
  },
  formPaymentStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  uploadImage: {
    isSuccess: false,
    isError: false,
    isLoading: false,
  },
  businessType: '',
  modalUploadFile: false,
  uploadFile: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  downloadFile: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
  },
  provider: {
    data: [],
    detail: {},
    sellingFactor: {},
    businessSchema: {},
    platformFee: {},
    status: {
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
    params: {
      startDate: '',
      endDate: '',
      status: [],
      provider: [],
      type: '',
      inputs: [],
      query: '',
      page: 1,
      limit: 10,
      isActive: '',
      providerType: '',
      endPeriod: 0,
      dateRange: [],
      totalPage: 1,
      totalData: 1,
    },
    metaData: {
      page: 1,
      limit: 10,
      totalPage: 1,
      totalData: 1,
    },
  },
  businessSchema: {
    data: {},
    form: {
      maxAmount: 0,
    },
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
    inputs: [{ percentage: 0, minAmount: 0, maxAmount: 0 }],
    lastInputs: { percentage: 0, minAmount: 0, maxAmount: 0 },
    input: { percentage: 0 },
  },
  sellingFactor: {
    data: {},
    form: {
      startDate: '',
      endDate: '',
      withPpn: 0,
    },
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  },
  platformFee: {
    data: {},
    form: {
      endPeriod: '',
      startPeriod: new Date(),
      endDuration: '',
    },
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
    serviceStatus: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    platformFeeServices: [],
    feePlans: [{ holding: 0, merchan: 0, user: 0 }],
    feePlansStatus: [{ status: true }],
    feePlansError: true,
    showErrorFeePlan: false,
    lastFeePlans: {
      startPeriod: 0,
      endPeriod: 0,
      holding: 0,
      merchan: 0,
      user: 0,
    },
    lastFeePlansError: true,
    max: {
      holding: 100,
      merchan: 100,
      user: 100,
    },
    totalPercentage: 0,
  },
  businessStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  bank: {
    data: [],
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    bankProviderStatus: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    bankProvider: [],
  },
  bankAccount: {
    data: [],
    selectedAccount: {},
    status: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
  },
  dataApi: {
    apiProduct: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
    apiOutlet: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
    apiReference: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
    apiClinic: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
    apiDoctor: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
    apiPoly: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
    apiTreatment: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
    apiCompleteOrder: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
    },
  },
};

export const resolveProviderService = createAsyncThunk(
  'resolve/provider/list',
  async (
    payload: {
      page: number;
      limit: number;
      query: string;
      isActive: boolean | string;
      providerType: string;
      type: string;
      startDate: any;
      endDate: any;
    },
    { rejectWithValue }
  ) => {
    const params = {
      page: payload.page,
      limit: payload.limit,
      query: payload.query,
      isActive: payload.isActive,
      providerType: payload.providerType,
      type: payload.type,
      startDate: payload.startDate,
      endDate: payload.endDate,
    };
    const response = await getDataList(params);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePlatformFeeService = createAsyncThunk(
  'resolve/platformfee/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListPlatformFeeServices();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePostProviderService = createAsyncThunk(
  'resolve/provider/post',
  async (payload: any, { rejectWithValue }) => {
    const response = await postProvider(payload);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePutProviderService = createAsyncThunk(
  'resolve/provider/put',
  async (payload: any, { rejectWithValue }) => {
    const response = await putProvider(payload.data, payload.id);

    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePostBusinessProvider = createAsyncThunk(
  'resolve/provider/business/post',
  async (payload: any, { rejectWithValue }) => {
    const response = await postBusiness(payload);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePutBusinessProvider = createAsyncThunk(
  'resolve/provider/business/put',
  async (payload: any, { rejectWithValue }) => {
    const response = await putBusiness(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetDetailProvider = createAsyncThunk(
  'resolve/provider/detail',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDetailProvider(payload.id, payload.providerType);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetMemberlistProvider = createAsyncThunk(
  'resolve/provider/memberlist',
  async (payload: any, { rejectWithValue }) => {
    const response = await getMemberList(payload);
    if (response.status === 200) {
      return response.data.filter((item: any) => {
        return item.provider_id === payload.id;
      });
    }
    return rejectWithValue(response);
  }
);

export const resolvePostProfile = createAsyncThunk(
  'resolve/provider/profile',
  async (payload: any, { rejectWithValue }) => {
    const response = await postImage(
      payload.file,
      payload.id,
      payload.providerType
    );
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetListBank = createAsyncThunk(
  'resolve/bank/list',
  async (any, { rejectWithValue }) => {
    const response = await getBankList();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePostPayment = createAsyncThunk(
  'resolve/provider/payment',
  async (payload: any, { rejectWithValue }) => {
    const response = await postPayment(payload);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePutPayment = createAsyncThunk(
  'resolve/provider/payment/update',
  async (payload: any, { rejectWithValue }) => {
    const response = await putPayment(payload);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetBankProvider = createAsyncThunk(
  'resolve/provider/bank_account',
  async (
    payload: {
      channelId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getBankAccountProvider(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveDownloadProviderFile = createAsyncThunk(
  'providers/download',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDownloadProviderFile();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePostUploadProviderFile = createAsyncThunk(
  'providers/upload',
  async (payload: any, { rejectWithValue }) => {
    const response = await postUploadProvidedrFile(payload);
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolvePostPaymentSecondary = createAsyncThunk(
  'providers/payment/secondary',
  async (payload: { id: number; data: any }, { rejectWithValue }) => {
    const response = await patchPaymentSecondary(payload.id, payload.data);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetBankAccounts = createAsyncThunk(
  'proivders/list/bankAccounts',
  async (payload: any, { rejectWithValue }) => {
    const response = await getBankAccounts();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetResourceDataListApi = createAsyncThunk(
  'resolve/resourceDataListApi/get',
  async (
    payload: {
      providerId: string;
      integrationSchema: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getResourceDataList(
        payload.providerId,
        payload.integrationSchema
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetResourceDataList = createAsyncThunk(
  'resolve/resourceDataList/get',
  async (
    payload: {
      providerId: string;
      integrationSchema: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getResourceDataList(
        payload.providerId,
        payload.integrationSchema
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostResourceDataList = createAsyncThunk(
  'resolve/resourceDataList/create',
  async (
    payload: {
      providerId: string;
      integrationSchema: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postResourceDataList(
        payload.providerId,
        payload.integrationSchema,
        payload.data
      );
      if (response.status === 201) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostDataListMedpharmApi = createAsyncThunk(
  'resolve/data-list/create',
  async (
    payload: {
      providerId: string;
      integrationSchema: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postResourceDataList(
        payload.providerId,
        payload.integrationSchema,
        payload.data
      );
      if (response.status !== null) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePutResourceDataList = createAsyncThunk(
  'resolve/resourceDataList/edit',
  async (
    payload: {
      providerId: string;
      integrationSchema: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await putResourceDataList(
        payload.providerId,
        payload.integrationSchema,
        payload.data
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostSyncProvider = createAsyncThunk(
  'resolve/syncProvider/post',
  async (
    payload: {
      providerId: string | number;
      providerType: string;
    },
    { rejectWithValue }
  ) => {
    const response = await postSyncProvider(
      payload.providerId,
      payload.providerType
    );

    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

export const resolveGetDataApiProduct = createAsyncThunk(
  'resolve/get-api/product',
  async (
    payload: {
      keyword: string;
      page: string;
      limit: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const queryParams = buildParams({
      [payload.page]: 1,
      [payload.limit]: 1,
    });
    const pathHealthCareStore = paths.healthCareStore + '/request-proxy';
    const response = await Axios.post(pathHealthCareStore, {
      url: payload.keyword + queryParams,
      header: payload.data,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetDataApiOutlet = createAsyncThunk(
  'resolve/get-api/outlet',
  async (
    payload: {
      keyword: string;
      page: string;
      limit: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const queryParams = buildParams({
      [payload.page]: 1,
      [payload.limit]: 1,
    });
    const pathHealthCareStore = paths.healthCareStore + '/request-proxy';
    const response = await Axios.post(pathHealthCareStore, {
      url: payload.keyword + queryParams,
      header: payload.data,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetDataApiReference = createAsyncThunk(
  'resolve/get-api/reference',
  async (
    payload: {
      keyword: string;
      page: string;
      limit: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const queryParams = buildParams({
      [payload.page]: 1,
      [payload.limit]: 1,
    });
    const pathHealthCareStore = paths.healthCareStore + '/request-proxy';
    const response = await Axios.post(pathHealthCareStore, {
      url: payload.keyword + queryParams,
      header: payload.data,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

// get api clinic
export const resolveGetDataApiClinic = createAsyncThunk(
  'resolve/get-api/clinic',
  async (
    payload: {
      keyword: string;
      configAuth?: any;
    },
    { rejectWithValue }
  ) => {
    const pathOnlineReservation = paths.onlineReservation + '/request-proxy';
    const response = await Axios.post(pathOnlineReservation, {
      url: payload.keyword,
      header: payload.configAuth,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response?.data);
  }
);

// get api doctor
export const resolveGetDataApiDoctor = createAsyncThunk(
  'resolve/get-api/doctor',
  async (
    payload: {
      keyword: string;
      configAuth?: any;
    },
    { rejectWithValue }
  ) => {
    const pathOnlineReservation = paths.onlineReservation + '/request-proxy';
    const response = await Axios.post(pathOnlineReservation, {
      url: payload.keyword,
      header: payload.configAuth,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response?.data);
  }
);

// get api poly
export const resolveGetDataApiPoly = createAsyncThunk(
  'resolve/get-api/poly',
  async (
    payload: {
      keyword: string;
      configAuth?: any;
    },
    { rejectWithValue }
  ) => {
    const pathOnlineReservation = paths.onlineReservation + '/request-proxy';
    const response = await Axios.post(pathOnlineReservation, {
      url: payload.keyword,
      header: payload.configAuth,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response?.data);
  }
);

// get api treatment
export const resolveGetDataApiTreatment = createAsyncThunk(
  'resolve/get-api/treatment',
  async (
    payload: {
      keyword: string;
      configAuth?: any;
    },
    { rejectWithValue }
  ) => {
    const pathOnlineReservation = paths.onlineReservation + '/request-proxy';
    const response = await Axios.post(pathOnlineReservation, {
      url: payload.keyword,
      header: payload.configAuth,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response?.data);
  }
);

// create medpoint external provider
export const resolvePostDataListMedpointApi = createAsyncThunk(
  'resolve/data-list/medpoint/create',
  async (
    payload: {
      providerId: string;
      integrationSchema: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postResourceDataListMedpoint(
        payload.providerId,
        payload.integrationSchema,
        payload.data
      );
      if (response.status === 201) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// get medpoint external provider
export const resolveGetDataListMedpointApi = createAsyncThunk(
  'resolve/resourceDataList/get-medpoint',
  async (
    payload: {
      providerId: string;
      integrationSchema: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getResourceDataListMedpoint(
        payload.providerId,
        payload.integrationSchema
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  extraReducers: (builder) => {
    // Get list providers
    builder.addCase(resolveProviderService.pending, (state) => {
      state.provider.status.isLoading = true;
      state.provider.status.isError = false;
      state.provider.status.isSuccess = false;
      state.provider.status.message = '';
    });
    builder.addCase(resolveProviderService.fulfilled, (state, { payload }) => {
      state.provider.status.isLoading = false;
      state.provider.status.isError = false;
      state.provider.status.isSuccess = true;
      state.provider.data = payload.data || [];
      state.provider.metaData.limit = payload.metadata.size;
      state.provider.metaData.totalPage =
        payload.metadata.totalPage || payload.metadata.total_page;
      state.provider.metaData.totalData =
        payload.metadata.totalData || payload.metadata.total_data;
      state.provider.metaData.page = payload.metadata.page;
    });
    builder.addCase(
      resolveProviderService.rejected,
      (state, { payload }: any) => {
        state.provider.status.isLoading = false;
        state.provider.status.isError = true;
        state.provider.status.isSuccess = false;
        state.provider.status.message = payload?.data?.message;
      }
    );

    // Get Platform Fee Services
    builder.addCase(resolvePlatformFeeService.pending, (state) => {
      state.platformFee.serviceStatus.isLoading = true;
      state.platformFee.serviceStatus.isError = false;
      state.platformFee.serviceStatus.isSuccess = false;
    });
    builder.addCase(
      resolvePlatformFeeService.fulfilled,
      (state, { payload }) => {
        state.platformFee.serviceStatus.isLoading = false;
        state.platformFee.serviceStatus.isSuccess = true;
        state.platformFee.platformFeeServices = payload.data || [];
      }
    );
    builder.addCase(
      resolvePlatformFeeService.rejected,
      (state, { payload }: any) => {
        state.platformFee.serviceStatus.isLoading = false;
        state.platformFee.serviceStatus.isError = true;
        state.platformFee.serviceStatus.message = payload?.data?.message;
      }
    );
    // Post Provider
    builder.addCase(resolvePostProviderService.pending, (state) => {
      state.formInfromationStatus.isLoading = true;
      state.formInfromationStatus.isError = false;
    });
    builder.addCase(
      resolvePostProviderService.fulfilled,
      (state, { payload }) => {
        state.formInfromationStatus.isLoading = false;
        state.formInfromationStatus.isError = false;
        state.formInfromationStatus.isSuccess = true;
        state.modalConfirmationPlatform = false;
        state.modalConfirmationSelling = false;
        state.modalConfirmationSchema = false;
        state.formInfromationStatus.message = payload.message;
        // state.form = initialState.form;
        state.channelId = payload.data.channelId;
      }
    );
    builder.addCase(
      resolvePostProviderService.rejected,
      (state, { payload }: any) => {
        state.formInfromationStatus.isLoading = false;
        state.formInfromationStatus.isError = true;
        state.formInfromationStatus.isSuccess = false;
        state.modalConfirmationPlatform = false;
        state.modalConfirmationSelling = false;
        state.modalConfirmationSchema = false;
        state.formInfromationStatus.message = payload?.data?.message;
      }
    );
    // Post Business
    builder.addCase(resolvePostBusinessProvider.pending, (state) => {
      state.businessStatus.isLoading = true;
      state.businessStatus.isError = false;
      state.businessStatus.isSuccess = false;
      if (state.businessType === 'business-schema') {
        state.businessSchema.status.isLoading = true;
      }
      if (state.businessType === 'selling-factor') {
        state.sellingFactor.status.isLoading = true;
      }
      if (state.businessType === 'platform-fee') {
        state.platformFee.status.isLoading = true;
      }
    });
    builder.addCase(resolvePostBusinessProvider.fulfilled, (state) => {
      state.businessStatus.isLoading = false;
      state.businessStatus.isSuccess = true;
      state.formFee = false;
      state.formFactor = false;
      state.formScheme = false;
      // state.isSuccess = true;
      state.modalConfirmationPlatform = false;
      state.modalConfirmationSchema = false;
      state.modalConfirmationSelling = false;
      if (state.businessType === 'business-schema') {
        state.businessSchema.status.isSuccess = true;
        state.businessSchema.status.isLoading = false;
      }
      if (state.businessType === 'selling-factor') {
        state.sellingFactor.status.isSuccess = true;
        state.sellingFactor.status.isLoading = false;
      }
      if (state.businessType === 'platform-fee') {
        state.platformFee.status.isSuccess = true;
        state.platformFee.status.isLoading = false;
      }
    });
    builder.addCase(resolvePostBusinessProvider.rejected, (state) => {
      state.businessStatus.isLoading = false;
      state.businessStatus.isError = true;
      state.modalConfirmationSchema = false;
      state.modalConfirmationSelling = false;
      state.modalConfirmationPlatform = false;
      if (state.businessType === 'business-schema') {
        state.businessSchema.status.isError = true;
        state.businessSchema.status.isLoading = false;
      }
      if (state.businessType === 'selling-factor') {
        state.sellingFactor.status.isError = true;
        state.sellingFactor.status.isLoading = false;
      }
      if (state.businessType === 'platform-fee') {
        state.platformFee.status.isError = true;
        state.platformFee.status.isLoading = false;
      }
    });

    // Update Business
    builder.addCase(resolvePutBusinessProvider.pending, (state) => {
      state.businessStatus.isLoading = true;
      state.businessStatus.isError = false;
      state.businessStatus.isSuccess = false;
      if (state.businessType === 'business-schema') {
        state.businessSchema.status.isLoading = true;
      }
      if (state.businessType === 'selling-factor') {
        state.sellingFactor.status.isLoading = true;
      }
      if (state.businessType === 'platform-fee') {
        state.platformFee.status.isLoading = true;
      }
    });
    builder.addCase(resolvePutBusinessProvider.fulfilled, (state) => {
      state.businessStatus.isLoading = false;
      state.businessStatus.isSuccess = true;
      state.formScheme = false;
      state.formFactor = false;
      state.formFee = false;
      state.modalConfirmationSchema = false;
      state.modalConfirmationSelling = false;
      state.modalConfirmationPlatform = false;
      if (state.businessType === 'business-schema') {
        state.businessSchema.status.isLoading = false;
        state.businessSchema.status.isSuccess = true;
      }
      if (state.businessType === 'selling-factor') {
        state.sellingFactor.status.isLoading = false;
        state.sellingFactor.status.isSuccess = true;
      }
      if (state.businessType === 'platform-fee') {
        state.platformFee.status.isLoading = false;
        state.platformFee.status.isSuccess = true;
      }
    });
    builder.addCase(resolvePutBusinessProvider.rejected, (state) => {
      state.businessStatus.isLoading = false;
      state.businessStatus.isError = true;
      state.modalConfirmationSchema = false;
      state.modalConfirmationSelling = false;
      state.modalConfirmationPlatform = false;
      state.formScheme = false;
      if (state.businessType === 'business-schema') {
        state.businessSchema.status.isLoading = false;
        state.businessSchema.status.isError = true;
      }
      if (state.businessType === 'selling-factor') {
        state.sellingFactor.status.isLoading = false;
        state.sellingFactor.status.isError = true;
      }
      if (state.businessType === 'platform-fee') {
        state.platformFee.status.isLoading = false;
        state.platformFee.status.isError = true;
      }
    });
    // get detail provider
    builder.addCase(resolveGetDetailProvider.pending, (state) => {
      state.provider.detailStatus.isLoading = true;
      state.provider.detailStatus.isSuccess = false;
      state.provider.detailStatus.isError = false;
    });
    builder.addCase(
      resolveGetDetailProvider.fulfilled,
      (state, { payload }) => {
        state.provider.detailStatus.isLoading = false;
        state.provider.detailStatus.isSuccess = true;
        state.businessSchema.inputs =
          payload.data?.businessSchema?.sharingShare?.slice(0, -1) ?? [
            { percentage: 0, minAmount: 0, maxAmount: 0 },
          ];
        state.businessSchema.lastInputs =
          payload.data?.businessSchema?.sharingShare?.slice(-1)[0] ?? {
            percentage: 0,
            minAmount: 0,
            maxAmount: 0,
          };
        state.platformFee.feePlans = payload.data?.platformFee?.plans ?? [];
        state.platformFee.totalPercentage =
          payload.data?.platformFee?.percentage ?? 0;
        state.platformFee.max.holding =
          100 -
            (payload.data?.platformFee?.user +
              payload.data?.platformFee?.merchan) ?? 100;
        state.platformFee.max.merchan =
          100 -
            (payload.data?.platformFee?.user +
              payload.data?.platformFee?.holding) ?? 100;
        state.platformFee.max.user =
          100 -
            (payload.data?.platformFee?.holding +
              payload.data?.platformFee?.merchan) ?? 100;
        state.type = payload.data?.businessSchemas?.type;
        state.provider.detail = payload.data;
        state.provider.businessSchema = payload.data?.businessSchema || {};
        state.provider.sellingFactor = payload.data?.sellingFactor || {};
        state.provider.platformFee = payload.data?.platformFee || {};
        state.sellingFactor.form.withPpn =
          payload.data?.sellingFactor?.percentageWithPpn || 0;
        state.formInformationData.name = payload.data.name;
        state.formInformationData.pic = payload.data.pic;
        state.formInformationData.email = payload.data.email;
        state.formInformationData.phoneNumber = payload.data.phoneNumber;
        state.formInformationData.type = payload.data.type;
        state.formInformationData.address = payload.data.address;
        state.formInformationData.description = payload.data.description;
        state.formInformationData.providerType = payload.data.providerType;
        if (payload.data.type === 'external') {
          state.resource = {
            ...state.resource,
            ...payload.data.resource,
          };
        }
        state.formInformationData = {
          ...state.formInformationData,
          name: payload.data.name || '',
          pic: payload.data.pic || '',
          email: payload.data.email || '',
          phoneNumber: payload.data.phoneNumber || '',
          type: payload.data.type || '',
          providerType: payload.data.providerType || '',
          address: payload.data.address || '',
          description: payload.data.description || '',
          isActive: payload.data.isActive,
          tags: payload.data.tags || [],
          integrationOption: payload.data.integrationSchema || '',
          isOfficial: payload.data.isOfficial || false,
        };
      }
    );
    builder.addCase(
      resolveGetDetailProvider.rejected,
      (state, { payload }: any) => {
        state.provider.detailStatus.isLoading = false;
        state.provider.detailStatus.isError = true;
        state.provider.detailStatus.message = payload?.data?.message;
      }
    );
    // Update Provider
    builder.addCase(resolvePutProviderService.pending, (state) => {
      state.formInfromationStatus.isLoading = true;
      state.formInfromationStatus.isError = false;
    });
    builder.addCase(resolvePutProviderService.fulfilled, (state) => {
      state.formInfromationStatus.isLoading = false;
      state.formInfromationStatus.isError = false;
      state.formInfromationStatus.isSuccess = true;
      state.modalConfirmationSchema = false;
      state.modalConfirmationSelling = false;
      state.modalConfirmationPlatform = false;
    });
    builder.addCase(resolvePutProviderService.rejected, (state) => {
      state.formInfromationStatus.isLoading = false;
      state.formInfromationStatus.isError = true;
      state.formInfromationStatus.isSuccess = false;
      state.modalConfirmationSchema = false;
      state.modalConfirmationSelling = false;
      state.modalConfirmationPlatform = false;
    });
    // get member of provider
    builder.addCase(resolveGetMemberlistProvider.pending, (state) => {
      state.listMember.status.isLoading = true;
      state.listMember.status.isError = false;
      state.listMember.status.isSuccess = false;
    });
    builder.addCase(
      resolveGetMemberlistProvider.fulfilled,
      (state, { payload }) => {
        state.listMember.status.isLoading = false;
        if (payload.length == 0) {
          state.listMember.status.message = 'Provider tidak memiliki member';
          state.listMember.status.isError = true;
          state.listMember.params.totalPage = 1;
          state.listMember.params.totalData = 0;
        } else {
          state.listMember.data = payload.slice(0, 10);
          state.listMember.datas = payload;
          state.listMember.params.totalPage = Math.ceil(
            parseInt(payload.length) / 10
          );
          state.listMember.params.totalData = payload.length;
        }
      }
    );
    builder.addCase(
      resolveGetMemberlistProvider.rejected,
      (state, { payload }: any) => {
        state.listMember.status.isLoading = false;
        state.listMember.status.isError = true;
        state.listMember.status.message = payload?.data?.message;
      }
    );
    builder.addCase(resolvePostProfile.pending, (state) => {
      state.uploadImage.isLoading = true;
      state.uploadImage.isSuccess = false;
      state.uploadImage.isError = false;
    });
    builder.addCase(resolvePostProfile.fulfilled, (state) => {
      state.uploadImage.isLoading = false;
      state.uploadImage.isSuccess = true;
    });
    builder.addCase(resolvePostProfile.rejected, (state) => {
      state.uploadImage.isLoading = false;
      state.uploadImage.isError = true;
    });

    // get list bank
    builder.addCase(resolveGetListBank.pending, (state) => {
      state.bank.status.isError = false;
      state.bank.status.isLoading = true;
      state.bank.status.isSuccess = false;
    });
    builder.addCase(resolveGetListBank.fulfilled, (state, { payload }) => {
      state.bank.status.isLoading = false;
      state.bank.status.isSuccess = true;
      state.bank.data = payload.data || [];
    });
    builder.addCase(resolveGetListBank.rejected, (state, { payload }: any) => {
      state.bank.status.isLoading = false;
      state.bank.status.isError = true;
      state.bank.status.message = payload?.data?.message;
    });
    // post payment
    builder.addCase(resolvePostPayment.pending, (state) => {
      state.formPaymentStatus.isError = false;
      state.formPaymentStatus.isLoading = true;
      state.formPaymentStatus.isSuccess = false;
    });
    builder.addCase(resolvePostPayment.fulfilled, (state) => {
      state.formPaymentStatus.isError = false;
      state.formPaymentStatus.isLoading = false;
      state.formPaymentStatus.isSuccess = true;
      state.formPaymentStatus.message = 'Berhasil menambah pembayaran';
    });
    builder.addCase(resolvePostPayment.rejected, (state, { payload }: any) => {
      state.formPaymentStatus.isError = true;
      state.formPaymentStatus.isLoading = false;
      state.formPaymentStatus.isSuccess = false;
      state.formPaymentStatus.message = payload?.data?.message;
    });
    // Bank Provider
    builder.addCase(resolveGetBankProvider.pending, (state) => {
      state.bank.bankProviderStatus.isLoading = true;
      state.bank.bankProviderStatus.isSuccess = false;
      state.bank.bankProviderStatus.isError = false;
    });
    builder.addCase(resolveGetBankProvider.fulfilled, (state, { payload }) => {
      state.bank.bankProviderStatus.isLoading = false;
      state.bank.bankProviderStatus.isSuccess = true;
      state.bank.bankProvider = payload.data[0] || [];
      state.formPayment = {
        accountNumber: payload.data[0].account_number || '',
        accountName: payload.data[0].name || '',
        bankName: payload.data[0].bank_name,
        email: '',
        channelId: 0,
        aliasName: payload.data[0].alias_name,
      };
    });
    builder.addCase(
      resolveGetBankProvider.rejected,
      (state, { payload }: any) => {
        state.bank.bankProviderStatus.isLoading = false;
        state.bank.bankProviderStatus.isError = true;
        state.bank.bankProviderStatus.message = payload?.data?.message;
      }
    );
    // update payment
    builder.addCase(resolvePutPayment.pending, (state) => {
      state.formPaymentStatus.isError = false;
      state.formPaymentStatus.isLoading = true;
      state.formPaymentStatus.isSuccess = false;
    });
    builder.addCase(resolvePutPayment.fulfilled, (state) => {
      state.formPaymentStatus.isError = false;
      state.formPaymentStatus.isLoading = false;
      state.formPaymentStatus.isSuccess = true;
      state.formInfromationStatus.message = 'Berhasil menambah pembayaran';
    });
    builder.addCase(resolvePutPayment.rejected, (state, { payload }: any) => {
      state.formPaymentStatus.isError = true;
      state.formPaymentStatus.isLoading = false;
      state.formPaymentStatus.isSuccess = false;
      state.formPaymentStatus.message = payload?.data?.message;
    });

    // Upload file
    builder.addCase(resolvePostUploadProviderFile.pending, (state) => {
      state.uploadFile.isLoading = true;
      state.uploadFile.isError = false;
      state.uploadFile.isSuccess = false;
    });
    builder.addCase(resolvePostUploadProviderFile.fulfilled, (state) => {
      state.uploadFile.isLoading = false;
      state.uploadFile.isError = false;
      state.uploadFile.isSuccess = true;
      state.uploadFile.message = 'Berhasil menggunggah file';
      state.modalUploadFile = false;
    });
    builder.addCase(
      resolvePostUploadProviderFile.rejected,
      (state, { payload }: any) => {
        state.uploadFile.isLoading = false;
        state.uploadFile.isError = true;
        state.uploadFile.isSuccess = false;
        state.uploadFile.message = payload?.data?.message;
      }
    );

    // Download file
    builder.addCase(resolveDownloadProviderFile.pending, (state) => {
      state.downloadFile.isLoading = true;
      state.downloadFile.isError = false;
      state.downloadFile.isSuccess = false;
    });
    builder.addCase(
      resolveDownloadProviderFile.fulfilled,
      (state, { payload }) => {
        state.downloadFile.isLoading = false;
        state.downloadFile.isError = false;
        state.downloadFile.isSuccess = true;
        state.downloadFile.message = payload.message;
        state.downloadFile.data = payload;
      }
    );
    builder.addCase(resolveDownloadProviderFile.rejected, (state) => {
      state.downloadFile.isLoading = false;
      state.downloadFile.isError = true;
      state.downloadFile.isSuccess = false;
    });

    // post payment secondary
    builder.addCase(resolvePostPaymentSecondary.pending, (state) => {
      state.formPaymentStatus.isError = false;
      state.formPaymentStatus.isLoading = true;
      state.formPaymentStatus.isSuccess = false;
    });
    builder.addCase(resolvePostPaymentSecondary.fulfilled, (state) => {
      state.formPaymentStatus.isError = false;
      state.formPaymentStatus.isLoading = false;
      state.formPaymentStatus.isSuccess = true;
      state.formPaymentStatus.message = 'Berhasil menambah pembayaran';
    });
    builder.addCase(
      resolvePostPaymentSecondary.rejected,
      (state, { payload }: any) => {
        state.formPaymentStatus.isError = true;
        state.formPaymentStatus.isLoading = false;
        state.formPaymentStatus.isSuccess = false;
        state.formPaymentStatus.message = payload?.data?.message;
      }
    );

    // Bank Provider
    builder.addCase(resolveGetBankAccounts.pending, (state) => {
      state.bankAccount.status.isLoading = true;
      state.bankAccount.status.isSuccess = false;
      state.bankAccount.status.isError = false;
    });
    builder.addCase(resolveGetBankAccounts.fulfilled, (state, { payload }) => {
      state.bankAccount.status.isLoading = false;
      state.bankAccount.status.isSuccess = true;
      state.bankAccount.data = payload.data || [];
    });
    builder.addCase(
      resolveGetBankAccounts.rejected,
      (state, { payload }: any) => {
        state.bankAccount.status.isLoading = false;
        state.bankAccount.status.isError = true;
        state.bankAccount.status.message = payload?.data?.message;
      }
    );

    // Get Data Resource Data List
    builder.addCase(resolveGetResourceDataList.pending, (state) => {
      state.resourceDataList.isLoading = true;
      state.resourceDataList.isError = false;
    });
    builder.addCase(
      resolveGetResourceDataList.fulfilled,
      (state, { payload }) => {
        state.resourceDataList.isLoading = false;
        state.resourceDataList.isError = false;
        state.resourceDataList.data = payload?.data;

        state.formProvider.form.formDataListExternal = {
          formMappingProduct: {
            ...state.formProvider.form.formDataListExternal.formMappingProduct,
            isSuccess: true,
            productFileName: payload?.data?.sftpResource?.productFileName || '',
            productName:
              payload?.data?.sftpResource?.productMapping?.name || '',
            category:
              payload?.data?.sftpResource?.productMapping?.category || '',
            productType:
              payload?.data?.sftpResource?.productMapping?.type || '',
            description:
              payload?.data?.sftpResource?.productMapping?.description || '',
            sku: payload?.data?.sftpResource?.productMapping?.sku || '',
            manufacturer:
              payload?.data?.sftpResource?.productMapping?.manufacturer || '',
            distributionNumber:
              payload?.data?.sftpResource?.productMapping?.noIzinEdar || '',
            length: payload?.data?.sftpResource?.productMapping?.length || '',
            height: payload?.data?.sftpResource?.productMapping?.height || '',
            width: payload?.data?.sftpResource?.productMapping?.width || '',
            weight: payload?.data?.sftpResource?.productMapping?.weight || '',
            minQty:
              payload?.data?.sftpResource?.productMapping?.minimumQuantity ||
              '',
            dosage: payload?.data?.sftpResource?.productMapping?.dosage || '',
            sideEffect:
              payload?.data?.sftpResource?.productMapping?.sideEffect || '',
            contraIndication:
              payload?.data?.sftpResource?.productMapping?.contraIndication ||
              '',
            indication:
              payload?.data?.sftpResource?.productMapping?.indication || '',
            howToUse:
              payload?.data?.sftpResource?.productMapping?.howToUse || '',
            storage: payload?.data?.sftpResource?.productMapping?.storage || '',
            specialAttention:
              payload?.data?.sftpResource?.productMapping?.specialAttention ||
              '',
            batchNumber:
              payload?.data?.sftpResource?.productMapping?.batchNumber || '',
            expiredDate:
              payload?.data?.sftpResource?.productMapping?.expiredDate || '',
            imageUrl:
              payload?.data?.sftpResource?.productMapping?.imageUrl || '',
            unit: payload?.data?.sftpResource?.productMapping?.unit || '',
            composition:
              payload?.data?.sftpResource?.productMapping?.composition || '',
            dosageForm:
              payload?.data?.sftpResource?.productMapping?.dosageForm || '',
          },
          formMappingOutlet: {
            ...state.formProvider.form.formDataListExternal.formMappingOutlet,
            isSuccess: true,
            outletFileName: payload?.data?.sftpResource?.outletFileName || '',
            code: payload?.data?.sftpResource?.outletMapping?.code || '',
            name: payload?.data?.sftpResource?.outletMapping?.name || '',
            phoneNumber:
              payload?.data?.sftpResource?.outletMapping?.phoneNumber || '',
            pic: payload?.data?.sftpResource?.outletMapping?.pic || '',
            apa: payload?.data?.sftpResource?.outletMapping?.apa || '',
            sipa: payload?.data?.sftpResource?.outletMapping?.sipa || '',
            acceptInstantDelivery:
              payload?.data?.sftpResource?.outletMapping
                ?.acceptsInstantDelivery || '',
            isPickupOutletAvailable:
              payload?.data?.sftpResource?.outletMapping
                ?.isPickupOutletAvailable || '',
            deliveryServiceAvailable:
              payload?.data?.sftpResource?.outletMapping
                ?.deliveryServiceAvailable || '',
            picture: payload?.data?.sftpResource?.outletMapping?.image || '',
            provinceCode:
              payload?.data?.sftpResource?.outletMapping?.provinceCode || '',
            province:
              payload?.data?.sftpResource?.outletMapping?.province || '',
            cityCode:
              payload?.data?.sftpResource?.outletMapping?.cityCode || '',
            city: payload?.data?.sftpResource?.outletMapping?.city || '',
            districtCode:
              payload?.data?.sftpResource?.outletMapping?.districtCode || '',
            district:
              payload?.data?.sftpResource?.outletMapping?.district || '',
            villageCode:
              payload?.data?.sftpResource?.outletMapping?.villageCode || '',
            village: payload?.data?.sftpResource?.outletMapping?.village || '',
            postCode:
              payload?.data?.sftpResource?.outletMapping?.postcode || '',
            longitude:
              payload?.data?.sftpResource?.outletMapping?.longitude || '',
            latitude:
              payload?.data?.sftpResource?.outletMapping?.latitude || '',
            street: payload?.data?.sftpResource?.outletMapping?.street || '',
            isHub: payload?.data?.sftpResource?.outletMapping?.isHub || '',
            openHours:
              payload?.data?.sftpResource?.outletMapping?.openHours || '',
            practiceHours:
              payload?.data?.sftpResource?.outletMapping?.practiceHours || '',
          },
          formMappingReference: {
            ...state.formProvider.form.formDataListExternal
              .formMappingReference,
            isSuccess: true,
            referenceFileName:
              payload?.data?.sftpResource?.productMappingFileName,
            outletCode:
              payload?.data?.sftpResource?.productRelatedMapping?.outletCode,
            productSku:
              payload?.data?.sftpResource?.productRelatedMapping?.productSku,
            stock: payload?.data?.sftpResource?.productRelatedMapping?.Stock,
            price: payload?.data?.sftpResource?.productRelatedMapping?.Price,
          },
        };
      }
    );
    builder.addCase(
      resolveGetResourceDataList.rejected,
      (state, { payload }: any) => {
        state.resourceDataList.isLoading = false;
        state.resourceDataList.isError = true;
        state.resourceDataList.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Resource Data List!';
      }
    );
    // get resource data list API
    builder.addCase(resolveGetResourceDataListApi.pending, (state) => {
      state.resourceDataList.isLoading = true;
      state.resourceDataList.isError = false;
    });
    builder.addCase(
      resolveGetResourceDataListApi.fulfilled,
      (state, { payload }) => {
        state.resourceDataList.isLoading = false;
        state.resourceDataList.isError = false;
        state.resourceDataList.data = payload.data;

        const PROVIDER_KEY = secure.decrypt(
          import.meta.env.VITE_APP_PROVIDER_KEY
        );
        const decryptedData = decryptCFBMode(
          PROVIDER_KEY,
          payload?.data?.apiResource?.authConfig
        );
        const { type, basicConfig, bearerConfig, apiKeyConfig } = decryptedData;
        state.resource.type = type || '';
        state.resource.username = basicConfig?.username || '';
        state.resource.password = basicConfig?.password || '';
        state.resource.key = apiKeyConfig?.headerKey || '';
        state.resource.secret = apiKeyConfig?.secretKey || '';
        state.resource.authUrl =
          bearerConfig?.externalRequest?.body?.authUrl || '';
        state.resource.usernameToken =
          bearerConfig?.externalRequest?.body?.username || '';
        state.resource.passwordToken =
          bearerConfig?.externalRequest?.body?.password || '';
        state.resource.refreshUrl =
          bearerConfig?.externalRequest?.body?.refreshUrl || '';
        state.resource.refreshDuration =
          bearerConfig?.externalRequest?.body?.refreshDuration || '';
        state.linkApi.apiProduct.link =
          payload?.data?.apiResource?.productUrl || '';
        state.linkApi.apiProduct.requestPage =
          payload?.data?.apiResource?.productRequestMapping?.query?.page || '';
        state.linkApi.apiProduct.requestLimit =
          payload?.data?.apiResource?.productRequestMapping?.query?.limit || '';
        state.linkApi.apiProduct.requestTotalPage =
          payload?.data?.apiResource?.productRequestMapping?.query?.totalPage ||
          '';
        state.linkApi.apiProduct.responsePage =
          payload?.data?.apiResource?.productResponseMapping?.page || '';
        state.linkApi.apiProduct.responseLimit =
          payload?.data?.apiResource?.productResponseMapping?.limit || '';
        state.linkApi.apiProduct.responseTotalPage =
          payload?.data?.apiResource?.productResponseMapping?.totalPage || '';
        state.linkApi.apiOutlet.link =
          payload?.data?.apiResource?.outletUrl || '';
        state.linkApi.apiOutlet.requestPage =
          payload?.data?.apiResource?.outletRequestMapping?.query?.page || '';
        state.linkApi.apiOutlet.requestLimit =
          payload?.data?.apiResource?.outletRequestMapping?.query?.limit || '';
        state.linkApi.apiOutlet.requestTotalPage =
          payload?.data?.apiResource?.outletRequestMapping?.query?.totalPage ||
          '';
        state.linkApi.apiOutlet.responsePage =
          payload?.data?.apiResource?.outletResponseMapping?.page || '';
        state.linkApi.apiOutlet.responseLimit =
          payload?.data?.apiResource?.productResponseMapping?.limit || '';
        state.linkApi.apiOutlet.responseTotalPage =
          payload?.data?.apiResource?.productResponseMapping?.totalPage || '';
        state.linkApi.apiReference.link =
          payload?.data?.apiResource?.productRelatedUrl || '';
        state.linkApi.apiReference.requestPage =
          payload?.data?.apiResource?.productRelatedRequestMapping?.query
            ?.page || '';
        state.linkApi.apiReference.requestLimit =
          payload?.data?.apiResource?.productRelatedRequestMapping?.query
            ?.limit || '';
        state.linkApi.apiReference.requestTotalPage =
          payload?.data?.apiResource?.productRelatedRequestMapping?.query
            ?.totalPage || '';
        state.linkApi.apiReference.responsePage =
          payload?.data?.apiResource?.productRelatedResponseMapping?.page || '';
        state.linkApi.apiReference.responseLimit =
          payload?.data?.apiResource?.productRelatedResponseMapping?.limit ||
          '';
        state.linkApi.apiReference.responseTotalPage =
          payload?.data?.apiResource?.productRelatedResponseMapping
            ?.totalPage || '';
        state.linkApi.apiPlacementOrder.link =
          payload?.data?.apiResource?.placementOrderUrl || '';
        state.linkApi.apiPlacementOrder.method =
          payload?.data?.apiResource?.placementOrderRequestMapping?.method ||
          '';
        state.linkApi.apiPlacementOrder.responseId =
          payload?.data?.apiResource?.placementOrderResponseMapping
            ?.transactionPartnerID || '';
        state.linkApi.apiPlacementOrder.header.key = Object.keys(
          payload?.data?.apiResource?.placementOrderRequestMapping?.header
        )[0];
        state.linkApi.apiPlacementOrder.header.value = Object.values(
          payload?.data?.apiResource?.placementOrderRequestMapping?.header
        )[0];
        state.linkApi.apiPlacementOrder.query.key = Object.keys(
          payload?.data?.apiResource?.placementOrderRequestMapping?.query
        )[0];
        state.linkApi.apiPlacementOrder.query.value = Object.values(
          payload?.data?.apiResource?.placementOrderRequestMapping?.query
        )[0];
        state.linkApi.apiUpdateStatus.link =
          payload?.data?.apiResource?.updateStatusUrl || '';
        state.linkApi.apiUpdateStatus.method =
          payload?.data?.apiResource?.updateStatusRequestMapping?.method || '';
        state.linkApi.apiUpdateStatus.header.key = Object.keys(
          payload?.data?.apiResource?.updateStatusRequestMapping?.header
        )[0];
        state.linkApi.apiUpdateStatus.header.value = Object.values(
          payload?.data?.apiResource?.updateStatusRequestMapping?.header
        )[0];
        state.linkApi.apiUpdateStatus.query.key = Object.keys(
          payload?.data?.apiResource?.updateStatusRequestMapping?.query
        )[0];
        state.linkApi.apiUpdateStatus.query.value = Object.values(
          payload?.data?.apiResource?.updateStatusRequestMapping?.query
        )[0];
        state.formProvider.form.formDataListExternal.formMappingProduct = {
          isSuccess: true,
          type: type || '',
          username: basicConfig?.username || '',
          password: basicConfig?.password || '',
          authUrl: bearerConfig?.externalRequest?.body?.authUrl || '',
          usernameToken: bearerConfig?.externalRequest?.body?.username || '',
          passwordToken: bearerConfig?.externalRequest?.body?.password || '',
          refreshUrl: bearerConfig?.externalRequest?.body?.refreshUrl || '',
          refreshDuration:
            bearerConfig?.externalRequest?.body?.refreshDuration || '',
          key: apiKeyConfig?.headerKey || '',
          secret: apiKeyConfig?.secretKey || '',
          apiProduct: payload?.data?.apiResource?.productUrl || '',
          productName: payload?.data?.apiResource?.productMapping?.name || '',
          category: payload?.data?.apiResource?.productMapping?.category || '',
          productType: payload?.data?.apiResource?.productMapping?.type || '',
          description:
            payload?.data?.apiResource?.productMapping?.description || '',
          sku: payload?.data?.apiResource?.productMapping?.sku || '',
          manufacturer:
            payload?.data?.apiResource?.productMapping?.manufacturer || '',
          distributionNumber:
            payload?.data?.apiResource?.productMapping?.noIzinEdar || '',
          length: payload?.data?.apiResource?.productMapping?.length || '',
          height: payload?.data?.apiResource?.productMapping?.height || '',
          width: payload?.data?.apiResource?.productMapping?.width || '',
          weight: payload?.data?.apiResource?.productMapping?.weight || '',
          minQty:
            payload?.data?.apiResource?.productMapping?.minimumQuatity || '',
          dosage: payload?.data?.apiResource?.productMapping?.dosage || '',
          sideEffect:
            payload?.data?.apiResource?.productMapping?.sideEffect || '',
          contraIndication:
            payload?.data?.apiResource?.productMapping?.contraIndication || '',
          indication:
            payload?.data?.apiResource?.productMapping?.indication || '',
          howToUse: payload?.data?.apiResource?.productMapping?.howToUse || '',
          storage: payload?.data?.apiResource?.productMapping?.storage || '',
          specialAttention:
            payload?.data?.apiResource?.productMapping?.specialAttention || '',
          batchNumber:
            payload?.data?.apiResource?.productMapping?.batchNumber || '',
          expiredDate:
            payload?.data?.apiResource?.productMapping?.expiredDate || '',
          imageUrl: payload?.data?.apiResource?.productMapping?.imageUrl || '',
          unit: payload?.data?.apiResource?.productMapping?.unit,
          price: payload?.data?.apiResource?.productMapping?.price,
          composition: payload?.data?.apiResource?.productMapping?.composition,
          dosageForm: payload?.data?.apiResource?.productMapping?.dosageForm,
        };
        state.formProvider.form.formDataListExternal.formMappingOutlet = {
          isSuccess: true,
          apiOutlet: payload?.data?.apiResource?.outletUrl || '',
          code: payload?.data?.apiResource?.outletMapping?.code || '',
          name: payload?.data?.apiResource?.outletMapping?.name || '',
          phoneNumber:
            payload?.data?.apiResource?.outletMapping?.phoneNumber || '',
          pic: payload?.data?.apiResource?.outletMapping?.pic || '',
          apa: payload?.data?.apiResource?.outletMapping?.apa || '',
          sipa: payload?.data?.apiResource?.outletMapping?.sipa || '',
          acceptInstantDelivery:
            payload?.data?.apiResource?.outletMapping?.acceptsInstantDelivery ||
            '',
          isPickupOutletAvailable:
            payload?.data?.apiResource?.outletMapping
              ?.isPickupOutletAvailable || '',
          deliveryServiceAvailable:
            payload?.data?.apiResource?.outletMapping
              ?.deliveryServiceAvailable || '',
          picture: payload?.data?.apiResource?.outletMapping?.image || '',
          provinceCode:
            payload?.data?.apiResource?.outletMapping?.provinceCode || '',
          province: payload?.data?.apiResource?.outletMapping?.province || '',
          cityCode: payload?.data?.apiResource?.outletMapping?.cityCode || '',
          city: payload?.data?.apiResource?.outletMapping?.city || '',
          districtCode:
            payload?.data?.apiResource?.outletMapping?.districtCode || '',
          district: payload?.data?.apiResource?.outletMapping?.district || '',
          villageCode:
            payload?.data?.apiResource?.outletMapping?.villageCode || '',
          village: payload?.data?.apiResource?.outletMapping?.village || '',
          postCode: payload?.data?.apiResource?.outletMapping?.postcode || '',
          latitude: payload?.data?.apiResource?.outletMapping?.latitude || '',
          longitude: payload?.data?.apiResource?.outletMapping?.longitude || '',
          street: payload?.data?.apiResource?.outletMapping?.street || '',
          isHub: payload?.data?.apiResource?.outletMapping?.isHub || '',
          openHours: payload?.data?.apiResource?.outletMapping?.openHours || '',
          practiceHours:
            payload?.data?.apiResource?.outletMapping?.practiceHours || '',
        };
        state.formProvider.form.formDataListExternal.formMappingReference = {
          isSuccess: true,
          apiReference: payload?.data?.apiResource?.productRelatedUrl || '',
          outletCode:
            payload?.data?.apiResource?.productRelatedMapping?.outletCode || '',
          productSku:
            payload?.data?.apiResource?.productRelatedMapping?.productSku || '',
          stock: payload?.data?.apiResource?.productRelatedMapping?.Stock || '',
          price: payload?.data?.apiResource?.productRelatedMapping?.Price || '',
        };
        state.formProvider.form.formDataListExternal.formMappingPlacementOrder =
          {
            isSuccess: true,
            apiPlacementOrder:
              payload?.data?.apiResource?.placementOrderUrl || '',
            apiPlacementOrderMethod:
              payload?.data?.apiResource?.placementOrderRequestMapping
                ?.method || '',
            apiPlacementOrderResponseId:
              payload?.data?.apiResource?.placementOrderResponseMapping
                ?.transactionPartnerID || '',
            itemId:
              payload?.data?.apiResource?.placementOrderMapping?.itemID || '',
            itemQty:
              payload?.data?.apiResource?.placementOrderMapping?.itemQty || '',
            itemKey:
              payload?.data?.apiResource?.placementOrderMapping?.itemKey || '',
            itemPrice:
              payload?.data?.apiResource?.placementOrderMapping?.itemPrice ||
              '',
            latitude:
              payload?.data?.apiResource?.placementOrderMapping
                ?.addressLatitude || '',
            longitude:
              payload?.data?.apiResource?.placementOrderMapping
                ?.addresslongitude || '',
            username:
              payload?.data?.apiResource?.placementOrderMapping?.buyerName ||
              '',
            outletId:
              payload?.data?.apiResource?.placementOrderMapping?.outletID || '',
            deliveryType:
              payload?.data?.apiResource?.placementOrderMapping?.deliveryType ||
              '',
            orderTime:
              payload?.data?.apiResource?.placementOrderMapping?.orderTime ||
              '',
            phoneNumber:
              payload?.data?.apiResource?.placementOrderMapping
                ?.buyerPhoneNumber || '',
            transactionId:
              payload?.data?.apiResource?.placementOrderMapping
                ?.transactionID || '',
          };
        state.formProvider.form.formDataListExternal.formMappingUpdateStatus = {
          isSuccess: true,
          apiUpdate:
            payload?.data?.apiResource?.updateStatusRequestMapping?.method ||
            '',
          status: payload?.data?.apiResource?.updateStatusMapping?.status || '',
          transactionId:
            payload?.data?.apiResource?.updateStatusMapping?.transactionID ||
            '',
          apiUpdateMethod:
            payload?.data?.apiResource?.updateStatusRequestMapping?.method ||
            '',
          dataMapping: [],
        };
      }
    );
    builder.addCase(resolveGetResourceDataListApi.rejected, (state) => {
      state.resourceDataList.isLoading = false;
      state.resourceDataList.isError = false;
    });

    // Post Data Resource Data List
    builder.addCase(resolvePostResourceDataList.pending, (state) => {
      state.formProvider.isLoading = true;
      state.formProvider.isError = false;
    });
    builder.addCase(
      resolvePostResourceDataList.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formProvider.isLoading = false;
          state.formProvider.isError = false;
          state.formProvider.isSuccess = true;
        } else {
          state.formProvider.isLoading = false;
          state.formProvider.isError = true;
          state.formProvider.isError = true;
          state.formProvider.errorMessage =
            payload?.message || 'Gagal menambahkan data list!';
        }
      }
    );
    builder.addCase(
      resolvePostResourceDataList.rejected,
      (state, { payload }: any) => {
        state.formProvider.isLoading = false;
        state.formProvider.isError = true;
        state.formProvider.isError = true;
        state.formProvider.isSuccess = false;
        state.formProvider.errorMessage =
          payload?.message || 'Gagal menambahkan data list!';
      }
    );

    // Put Data Resource Data List
    builder.addCase(resolvePutResourceDataList.pending, (state) => {
      state.formProvider.isLoading = true;
      state.formProvider.isError = false;
    });
    builder.addCase(
      resolvePutResourceDataList.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formProvider.isLoading = false;
          state.formProvider.isError = false;
          state.formProvider.isSuccess = true;
        } else {
          state.formProvider.isLoading = false;
          state.formProvider.isError = true;
          state.formProvider.isError = true;
          state.formProvider.errorMessage =
            payload?.message || 'Gagal mengedit data list!';
        }
      }
    );
    builder.addCase(
      resolvePutResourceDataList.rejected,
      (state, { payload }: any) => {
        state.formProvider.isLoading = false;
        state.formProvider.isError = true;
        state.formProvider.isError = true;
        state.formProvider.isSuccess = false;
        state.formProvider.errorMessage =
          payload?.message || 'Gagal mengedit data list!';
      }
    );
    // Post Sync Provider
    builder.addCase(resolvePostSyncProvider.pending, (state) => {
      state.syncProvider.isLoading = true;
      state.syncProvider.isError = false;
    });
    builder.addCase(resolvePostSyncProvider.fulfilled, (state) => {
      state.syncProvider.isLoading = false;
      state.syncProvider.isError = false;
    });
    builder.addCase(resolvePostSyncProvider.rejected, (state) => {
      state.syncProvider.isLoading = false;
      state.syncProvider.isError = true;
    });
    // post data list medpharm api
    builder.addCase(resolvePostDataListMedpharmApi.pending, (state) => {
      state.formProvider.isLoading = true;
      state.formProvider.isError = false;
    });
    builder.addCase(
      resolvePostDataListMedpharmApi.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formProvider.isLoading = false;
          state.formProvider.isError = false;
          state.formProvider.isSuccess = true;
        } else {
          state.formProvider.isLoading = false;
          state.formProvider.isError = true;
          state.formProvider.isSuccess = false;
          state.formProvider.errorMessage =
            payload?.message || 'Gagal menambahakan data list';
        }
      }
    );
    builder.addCase(
      resolvePostDataListMedpharmApi.rejected,
      (state, { payload }: any) => {
        state.formProvider.isLoading = false;
        state.formProvider.isSuccess = false;
        state.formProvider.isError = true;
        state.formProvider.errorMessage =
          payload?.message || 'Gagal menambahkan data list';
      }
    );
    // get data api product
    builder.addCase(resolveGetDataApiProduct.pending, (state) => {
      state.dataApi.apiProduct.isLoading = true;
      state.dataApi.apiProduct.isError = false;
    });
    builder.addCase(
      resolveGetDataApiProduct.fulfilled,
      (state, { payload }) => {
        state.dataApi.apiProduct.isLoading = false;
        state.dataApi.apiProduct.isError = false;
        state.dataApi.apiProduct.isSuccess = true;
        state.dataApi.apiProduct.data = payload.data;
      }
    );
    builder.addCase(resolveGetDataApiProduct.rejected, (state) => {
      state.dataApi.apiProduct.isLoading = false;
      state.dataApi.apiProduct.isError = true;
      state.dataApi.apiProduct.isSuccess = false;
    });
    // get data api outlet
    builder.addCase(resolveGetDataApiOutlet.pending, (state) => {
      state.dataApi.apiOutlet.isLoading = true;
      state.dataApi.apiOutlet.isError = false;
    });
    builder.addCase(resolveGetDataApiOutlet.fulfilled, (state, { payload }) => {
      state.dataApi.apiOutlet.isLoading = false;
      state.dataApi.apiOutlet.isError = false;
      state.dataApi.apiOutlet.isSuccess = true;
      state.dataApi.apiOutlet.data = payload.data;
    });
    builder.addCase(resolveGetDataApiOutlet.rejected, (state) => {
      state.dataApi.apiOutlet.isLoading = false;
      state.dataApi.apiOutlet.isError = true;
      state.dataApi.apiOutlet.isSuccess = false;
    });
    // get data api reference
    builder.addCase(resolveGetDataApiReference.pending, (state) => {
      state.dataApi.apiReference.isLoading = true;
      state.dataApi.apiReference.isError = false;
    });
    builder.addCase(
      resolveGetDataApiReference.fulfilled,
      (state, { payload }) => {
        state.dataApi.apiReference.isLoading = false;
        state.dataApi.apiReference.isError = false;
        state.dataApi.apiReference.isSuccess = true;
        state.dataApi.apiReference.data = payload.data;
      }
    );
    builder.addCase(resolveGetDataApiReference.rejected, (state) => {
      state.dataApi.apiReference.isLoading = false;
      state.dataApi.apiReference.isError = true;
      state.dataApi.apiReference.isSuccess = false;
    });
    // get data api clinic
    builder.addCase(resolveGetDataApiClinic.pending, (state) => {
      state.dataApi.apiClinic.isLoading = true;
      state.dataApi.apiClinic.isError = false;
    });
    builder.addCase(resolveGetDataApiClinic.fulfilled, (state, { payload }) => {
      state.dataApi.apiClinic.isLoading = false;
      state.dataApi.apiClinic.isError = false;
      state.dataApi.apiClinic.isSuccess = true;
      state.dataApi.apiClinic.data = payload.data;
    });
    builder.addCase(resolveGetDataApiClinic.rejected, (state) => {
      state.dataApi.apiClinic.isLoading = false;
      state.dataApi.apiClinic.isSuccess = false;
      state.dataApi.apiClinic.isError = true;
    });
    // get data api doctor
    builder.addCase(resolveGetDataApiDoctor.pending, (state) => {
      state.dataApi.apiDoctor.isLoading = true;
      state.dataApi.apiDoctor.isError = false;
    });
    builder.addCase(resolveGetDataApiDoctor.fulfilled, (state, { payload }) => {
      state.dataApi.apiDoctor.isLoading = false;
      state.dataApi.apiDoctor.isError = false;
      state.dataApi.apiDoctor.isSuccess = true;
      state.dataApi.apiDoctor.data = payload.data;
    });
    builder.addCase(resolveGetDataApiDoctor.rejected, (state) => {
      state.dataApi.apiDoctor.isLoading = false;
      state.dataApi.apiDoctor.isSuccess = false;
      state.dataApi.apiDoctor.isError = true;
    });
    // get data api poly
    builder.addCase(resolveGetDataApiPoly.pending, (state) => {
      state.dataApi.apiPoly.isLoading = true;
      state.dataApi.apiPoly.isError = false;
    });
    builder.addCase(resolveGetDataApiPoly.fulfilled, (state, { payload }) => {
      state.dataApi.apiPoly.isLoading = false;
      state.dataApi.apiPoly.isError = false;
      state.dataApi.apiPoly.isSuccess = true;
      state.dataApi.apiPoly.data = payload.data;
    });
    builder.addCase(resolveGetDataApiPoly.rejected, (state) => {
      state.dataApi.apiPoly.isLoading = false;
      state.dataApi.apiPoly.isSuccess = false;
      state.dataApi.apiPoly.isError = true;
    });
    // get data api treatment
    builder.addCase(resolveGetDataApiTreatment.pending, (state) => {
      state.dataApi.apiTreatment.isLoading = true;
      state.dataApi.apiTreatment.isError = false;
    });
    builder.addCase(
      resolveGetDataApiTreatment.fulfilled,
      (state, { payload }) => {
        state.dataApi.apiTreatment.isLoading = false;
        state.dataApi.apiTreatment.isError = false;
        state.dataApi.apiTreatment.isSuccess = true;
        state.dataApi.apiTreatment.data = payload.data;
      }
    );
    builder.addCase(resolveGetDataApiTreatment.rejected, (state) => {
      state.dataApi.apiTreatment.isLoading = false;
      state.dataApi.apiTreatment.isSuccess = false;
      state.dataApi.apiTreatment.isError = true;
    });

    // Post Data Resource External Provider
    builder.addCase(resolvePostDataListMedpointApi.pending, (state) => {
      state.formProvider.isLoading = true;
      state.formProvider.isError = false;
    });
    builder.addCase(
      resolvePostDataListMedpointApi.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formProvider.isLoading = false;
          state.formProvider.isError = false;
          state.formProvider.isSuccess = true;
        } else {
          state.formProvider.isLoading = false;
          state.formProvider.isError = true;
          state.formProvider.isError = true;
          state.formProvider.errorMessage =
            payload?.message || 'Gagal menambahkan data list!';
        }
      }
    );
    builder.addCase(
      resolvePostDataListMedpointApi.rejected,
      (state, { payload }: any) => {
        state.formProvider.isLoading = false;
        state.formProvider.isError = true;
        state.formProvider.isError = true;
        state.formProvider.isSuccess = false;
        state.formProvider.errorMessage =
          payload?.message || 'Gagal menambahkan data list!';
      }
    );

    // Get Data Resource External Provider
    builder.addCase(resolveGetDataListMedpointApi.pending, (state) => {
      state.resourceDataList.isLoading = true;
      state.resourceDataList.isError = false;
    });
    builder.addCase(
      resolveGetDataListMedpointApi.fulfilled,
      (state, { payload }) => {
        const PROVIDER_KEY = secure.decrypt(
          import.meta.env.VITE_APP_PROVIDER_KEY
        );
        const decryptedData = decryptCFBMode(
          PROVIDER_KEY,
          payload?.data?.apiResource?.auth
        );
        const { apiKey, basic, token, type } = decryptedData;
        const {
          apiResource: {
            clinic,
            doctor,
            placementOrder,
            placementOrderCompleted,
            poly,
            treatment,
          },
        } = payload?.data;
        state.resource.type = type ? type.toUpperCase() : '';
        state.resource.username = basic?.username;
        state.resource.password = basic?.password;
        state.resource.key = apiKey?.key;
        state.resource.secret = apiKey?.secret;
        state.resource.usernameToken = token?.username;
        state.resource.passwordToken = token?.password;
        state.resourceDataList.isLoading = false;
        state.resourceDataList.isError = false;
        state.resourceDataList.data = payload?.data?.apiResource;
        state.linkApi.apiClinic.link = clinic?.url;
        state.linkApi.apiClinic.requestPage = clinic?.query?.pageAttribute;
        state.linkApi.apiClinic.responseLimit = clinic?.query?.limitAttribute;
        state.linkApi.apiClinic.responseTotalPage =
          clinic?.response?.totalPageAttribute;
        state.linkApi.apiClinic.responseData = clinic?.response?.dataAttribute;
        state.linkApi.apiDoctor.link = doctor?.url;
        state.linkApi.apiDoctor.requestPage = doctor?.query?.pageAttribute;
        state.linkApi.apiDoctor.responseLimit = doctor?.query?.limitAttribute;
        state.linkApi.apiDoctor.responseTotalPage =
          doctor?.response?.totalPageAttribute;
        state.linkApi.apiDoctor.responseData = doctor?.response?.dataAttribute;
        state.linkApi.apiPoly.link = poly?.url;
        state.linkApi.apiPoly.requestPage = poly?.query?.pageAttribute;
        state.linkApi.apiPoly.responseLimit = poly?.query?.limitAttribute;
        state.linkApi.apiPoly.responseTotalPage =
          poly?.response?.totalPageAttribute;
        state.linkApi.apiPoly.responseData = poly?.response?.dataAttribute;
        state.linkApi.apiTreatment.link = treatment?.url;
        state.linkApi.apiTreatment.requestPage =
          treatment?.query?.pageAttribute;
        state.linkApi.apiTreatment.responseLimit =
          treatment?.query?.limitAttribute;
        state.linkApi.apiTreatment.responseTotalPage =
          treatment?.response?.totalPageAttribute;
        state.linkApi.apiTreatment.responseData =
          treatment?.response?.dataAttribute;
        state.linkApi.apiPlacementOrder.link = placementOrder?.url;
        state.linkApi.apiCompleteOrder.link = placementOrderCompleted?.url;
        state.formProvider.form.formDataListExternal.formMappingClinic = {
          isSuccess: true,
          id: clinic?.data?.id,
          name: clinic?.data?.name,
          email: clinic?.data?.email,
          phoneNumber: clinic?.data?.phoneNumber,
          village: clinic?.data?.address?.village,
          villageId: clinic?.data?.address?.villageId,
          district: clinic?.data?.address?.district,
          districtId: clinic?.data?.address?.districtId,
          subDistrict: clinic?.data?.address?.subDistrict,
          subDistrictId: clinic?.data?.address?.subDistrictId,
          city: clinic?.data?.address?.city,
          cityId: clinic?.data?.address?.cityId,
          province: clinic?.data?.address?.province,
          provinceId: clinic?.data?.address?.provinceId,
          street: clinic?.data?.address?.street,
          postcode: clinic?.data?.address?.postcode,
          longitude: clinic?.data?.address?.longitude,
          latitude: clinic?.data?.address?.latitude,
          openHours: clinic?.data?.openHours,
          clinicType: clinic?.data?.type,
          image: clinic?.data?.image,
          type: type.toUpperCase(),
        };
        state.formProvider.form.formDataListExternal.formMappingDoctor = {
          isSuccess: true,
          id: doctor?.data?.id,
          name: doctor?.data?.name,
          email: doctor?.data?.email,
          phoneNumber: doctor?.data?.phoneNumber,
          foto: doctor?.data?.foto,
          gender: doctor?.data?.gender,
          nomorSip: doctor?.data?.nomorSip,
          nomorStr: doctor?.data?.nomorStr,
          specialis: doctor?.data?.specialis,
          tanggalLahir: doctor?.data?.tanggalLahir,
          tempatLahir: doctor?.data?.tempatLahir,
          bahasa: doctor?.data?.bahasa,
          biografi: doctor?.data?.biografi,
          clinic: doctor?.data?.clinic,
          treatments: doctor?.data?.treatments,
        };
        state.formProvider.form.formDataListExternal.formMappingPoly = {
          isSuccess: true,
          id: poly?.data?.id,
          name: poly?.data?.name,
          code: poly?.data?.code,
          category: poly?.data?.category,
          image: poly?.data?.image,
          clinic: poly?.data?.clinic,
        };
        state.formProvider.form.formDataListExternal.formMappingTreatment = {
          isSuccess: true,
          id: treatment?.data?.id,
          name: treatment?.data?.name,
          code: treatment?.data?.code,
          benefit: treatment?.data?.benefit,
          description: treatment?.data?.description,
          preparation: treatment?.data?.preparation,
          procedure: treatment?.data?.procedure,
          price: treatment?.data?.price,
          customerPrice: treatment?.data?.customerPrice,
          type: treatment?.data?.type,
          image: treatment?.data?.image,
          clinic: treatment?.data?.clinic,
          poly: treatment?.data?.poly,
          doctors: treatment?.data?.doctors,
        };
      }
    );
    builder.addCase(
      resolveGetDataListMedpointApi.rejected,
      (state, { payload }: any) => {
        state.resourceDataList.isLoading = false;
        state.resourceDataList.isError = true;
        state.resourceDataList.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Resource Data List!';
      }
    );
  },
  reducers: {
    setModal: (state, { payload }) => {
      state[payload.state][payload.field] = payload.value;
    },
    setFormMappingProduct: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingProduct[
        payload.name
      ] = payload.value;
    },
    setFormMappingOutlet: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingOutlet[
        payload.name
      ] = payload.value;
    },
    setFormMappingReference: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingReference[
        payload.name
      ] = payload.value;
    },
    setFormMappingPlacementOrder: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingPlacementOrder[
        payload.name
      ] = payload.value;
    },
    setFormMappingUpdateStatus: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingUpdateStatus[
        payload.name
      ] = payload.value;
    },
    setFormMappingClinic: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingClinic[
        payload.name
      ] = payload.value;
    },
    setFormMappingDoctor: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingDoctor[
        payload.name
      ] = payload.value;
    },
    setFormMappingTreatment: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingTreatment[
        payload.name
      ] = payload.value;
    },
    setFormMappingPoly: (state, { payload }) => {
      state.formProvider.form.formDataListExternal.formMappingPoly[
        payload.name
      ] = payload.value;
    },
    setForm: (state, { payload }) => {
      state.formInformationData[payload?.field] = payload.value;
    },
    setResource: (state, { payload }) => {
      state.resource[payload?.field] = payload.value;
    },
    setTypeProvider: (state, { payload }) => {
      state.formInformationData.providerType = payload.value;
    },
    setLastFeePlans: (state, { payload }) => {
      state.platformFee.lastFeePlans[payload?.type] = parseInt(payload.value);
    },
    setShowErrorFeePlan: (state, { payload }) => {
      state.platformFee.showErrorFeePlan = payload.value;
    },
    setStartDurationBusinessSchema: (state, { payload }) => {
      state.businessSchemaParams.startDuration = payload.value;
    },
    setEndDurationBusinessSchema: (state, { payload }) => {
      state.businessSchemaParams.endDuration = payload.value;
    },
    resetStatus: (state) => {
      state.provider.status = initialState.provider.status;
      state.provider.detailStatus = initialState.provider.detailStatus;
    },
    setFormModal: (state, { payload }) => {
      if (payload.type == 'inputs') {
        state.businessSchema[payload.type].push(payload.value);
      } else if (payload.type == 'feePlans') {
        state.platformFee[payload.type].push(payload.value);
      } else {
        state[payload.type] = payload.value;
      }
    },
    removeInputs: (state, { payload }) => {
      switch (payload.type) {
        case 'inputs':
          state.businessSchema.inputs.pop();
          break;
        case 'feePlans':
          state.platformFee.feePlans.pop();
          break;
        default:
          state.businessSchema.inputs.pop();
      }
    },
    minMaxPercentage: (state, { payload }) => {
      if (payload.value) {
        state.platformFee.totalPercentage = parseInt(payload.value);
        if (payload.type === 'holding') {
          state.platformFee.max.merchan = 100 - payload.total.merchan;
          state.platformFee.max.user = 100 - payload.total.user;
        } else if (payload.type === 'merchan') {
          state.platformFee.max.holding = 100 - payload.total.holding;
          state.platformFee.max.user = 100 - payload.total.user;
        } else {
          state.platformFee.max.holding = 100 - payload.total.holding;
          state.platformFee.max.merchan = 100 - payload.total.merchan;
        }
      }
    },
    minFeePlans: (state, { payload }) => {
      state.platformFee.feePlans[payload.index][payload.type] = parseInt(
        payload.value
      );
    },
    setInputs: (state, { payload }) => {
      state.businessSchema.inputs[payload.index][payload.type] = parseFloat(
        payload.value
      );
    },
    setLastInputs: (state, { payload }) => {
      state.businessSchema.lastInputs[payload?.type] = parseFloat(
        payload.value
      );
    },
    setInput: (state, { payload }) => {
      state.businessSchema.input[payload.type] = parseFloat(payload.value);
    },
    feePlansCheck: (state, { payload }) => {
      if (state.platformFee.feePlansStatus[payload.index] !== null) {
        state.platformFee.feePlansStatus[payload.index] = {
          status: payload.value,
        };
      }
      state.platformFee.feePlansStatus.map((feePlan) => {
        state.platformFee.feePlansError = feePlan.status == false;
      });
    },
    lastFeePlansCheck: (state, { payload }) => {
      state.platformFee.lastFeePlansError = payload;
    },
    listMemeberManipulate: (state, { payload }) => {
      let first: any;
      if (payload.page < 0) {
        first = 0;
      } else {
        first = payload.page * 10 - 10;
      }
      const last = payload.page * 10;
      state.listMember.data = state.listMember.datas.slice(first, last);
      state.listMember.params.page = payload.page;
    },
    listMemberSearch: (state, { payload }) => {
      if (payload.keyword == '') {
        const result = state.listMember.datas;
        state.listMember.data = result.slice(0, 10);
        state.listMember.params.totalData = result.length;
        state.listMember.params.totalPage = Math.ceil(result.length / 10);
        state.listMember.params.page = 1;
      } else {
        const result = state.listMember.datas.filter((item: any) => {
          return item.item.name
            ? item.item.name
                .toLowerCase()
                .includes(payload.keyword.toLowerCase())
            : item.item.nama
                .toLowerCase()
                .includes(payload.keyword.toLowerCase());
        });
        state.listMember.data = result.slice(0, 10);
        state.listMember.params.totalPage = Math.ceil(result.length / 10);
      }
    },
    resetStatusInfromation: (state) => {
      state.formInfromationStatus.isError = false;
      state.formInfromationStatus.isLoading = false;
      state.formInfromationStatus.isSuccess = false;
    },
    resetStatusLogo: (state) => {
      state.uploadImage.isError = false;
      state.uploadImage.isLoading = false;
      state.uploadImage.isSuccess = false;
    },
    resetStatusPayment: (state) => {
      state.formPaymentStatus.isError = false;
      state.formPaymentStatus.isLoading = false;
      state.formPaymentStatus.isSuccess = false;
    },
    sellingFactorWithPpn: (state, { payload }) => {
      const ppn = payload.value / 100 / (1 - 11 / 100);
      state.sellingFactor.form.withPpn =
        payload.value + parseFloat(ppn.toFixed(2));
    },
    setFormInformation: (state, { payload }) => {
      state.formInformationData = payload.value;
    },
    setFormInformationField: (state, { payload }) => {
      state.formInformationData[payload.field] = payload.value;
    },
    setFormPayment: (state, { payload }) => {
      state.formPayment[payload?.field] = payload.value;
    },
    resetFormPayment: (state) => {
      state.formPayment = initialState.formPayment;
    },
    clearStateProvider: () => initialState,
    clearStateListMember: (state) => {
      state.listMember = initialState.listMember;
    },
    setBusinessType: (state, { payload }) => {
      state.businessType = payload.type;
    },
    clearStatusBusiness: (state, { payload }) => {
      state[payload.name].status = initialState[payload.name].status;
    },
    clearStateDetail: (state) => {
      state.provider.detail = {};
    },
    setModalUploadFile: (state, { payload }) => {
      state.modalUploadFile = payload;
    },
    resetStatusUploadFile: (state) => {
      state.uploadFile = initialState.uploadFile;
    },
    setParams: (state, { payload }) => {
      state.provider.params[payload.key] = payload.value;
    },
    setFormSellinFactor: (state, { payload }) => {
      state.sellingFactor.form[payload.key] = payload.value;
    },
    setFormBusinessSchema: (state, { payload }) => {
      state.businessSchema.form[payload.key] = payload.value;
    },
    setFormPlatformFee: (state, { payload }) => {
      state.platformFee.form[payload.key] = payload.value;
    },
    setBankAccount: (state, { payload }) => {
      state.bankAccount.selectedAccount = payload.value;
    },
    setLinkApi: (state, { payload }) => {
      state.linkApi[payload.name][payload.state] = payload.value;
    },
    setHeader: (state, { payload }) => {
      state.linkApi[payload.name].header[payload.state] = payload.value;
    },
    setQuery: (state, { payload }) => {
      state.linkApi[payload.name].query[payload.state] = payload.value;
    },
    setClearAuthDataList: (state) => {
      state.resource = initialState.resource;
    },
    setIsSuccess: (state, { payload }) => {
      state.linkApi[payload.name].isSuccess = payload.value;
    },
  },
});

export const {
  setForm,
  setModal,
  setInput,
  setQuery,
  setInputs,
  setParams,
  setHeader,
  setLinkApi,
  setResource,
  resetStatus,
  minFeePlans,
  setFormModal,
  removeInputs,
  setIsSuccess,
  feePlansCheck,
  setLastInputs,
  setFormPayment,
  setBankAccount,
  setTypeProvider,
  resetStatusLogo,
  setLastFeePlans,
  setBusinessType,
  minMaxPercentage,
  resetFormPayment,
  clearStateDetail,
  listMemberSearch,
  lastFeePlansCheck,
  clearStateProvider,
  setFormMappingPoly,
  setFormPlatformFee,
  resetStatusPayment,
  setFormInformation,
  setModalUploadFile,
  setShowErrorFeePlan,
  clearStatusBusiness,
  setFormSellinFactor,
  clearStateListMember,
  setClearAuthDataList,
  setFormMappingClinic,
  setFormMappingOutlet,
  setFormMappingDoctor,
  sellingFactorWithPpn,
  setFormBusinessSchema,
  resetStatusUploadFile,
  setFormMappingProduct,
  listMemeberManipulate,
  resetStatusInfromation,
  setFormInformationField,
  setFormMappingReference,
  setFormMappingTreatment,
  setFormMappingUpdateStatus,
  setFormMappingPlacementOrder,
  setEndDurationBusinessSchema,
  setStartDurationBusinessSchema,
} = providerSlice.actions;

export default providerSlice.reducer;
