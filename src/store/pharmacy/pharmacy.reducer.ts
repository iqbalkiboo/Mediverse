import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getByName,
  getDataList,
  getDataListProvider,
  getDetail,
  getDetailPharmacys,
  getListDrugCategory,
  getListItem,
  getListMedicine,
  getListPharmacys,
  getListSymptom,
  getLocation,
  getPharmacyById,
  patchRelatedPharmacy,
  postMedicine,
  postPharmacy,
  putPharmacy,
} from '@/client/pharmacy/getApi';
import { getDetailProvider } from '@/client/provider';

const openHoursPerDays = [
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
  },
  {
    openTime: '',
    '24HrsOpen': '',
    closeTime: '',
    day: '',
  },
];

const initialState = {
  isLoading: false,
  isError: false,
  isDrugCategoryError: false,
  isDrugCategoryLoading: false,
  isDrugCategorySuccess: false,
  isSymptomError: false,
  isSymptomLoading: false,
  isSymptomSuccess: false,
  isPatchRelatedError: false,
  isPatchRelatedLoading: false,
  isPatchRelatedSuccess: false,
  successMessage: '',
  errorMessage: '',
  hasMedicine: false,
  errMsg: '',
  data: [],
  countPage: 1,
  limit: 10,
  keyword: '',
  detail: {},
  sucessMsg: '',
  medicine: {},
  listMedicine: [],
  listProvider: [],
  params: {
    page: 1,
    limit: 10,
    status: '',
    search: '',
    endDate: '',
    startDate: '',
    providerType: '',
  },
  formInformation: {
    deliveryServiceAvailable: false,
    isPickupOutletAvailable: false,
    acceptsInstantDelivery: false,
    pc: '',
    phone: '',
    name: '',
    provider: '',
    outletPicture: '',
  },
  formAddress: {
    city: '',
    cityId: '',
    district: '',
    districtId: '',
    latitude: '',
    longitude: '',
    postcode: '',
    province: '',
    provinceId: '',
    street: '',
    village: '',
  },
  formOpenHours: openHoursPerDays,
  listLocation: {},
  paramsLocation: {
    province: '',
    district: '',
    regency: '',
    limit: 33,
  },
  channelId: '',
  openHours: openHoursPerDays,
  formPharmacyStatus: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  formValue: {
    formInformation: '',
    formAddress: '',
    formOpenHours: '',
  },
  detailProvider: {},
  isModalRelated: false,
  listDrugCategory: [],
  listSymptom: [],
  pharmacyRelated: [],
  pharmacys: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      size: 10,
      totalPage: 1,
      totalData: 10,
    },
  },
  pharmacy: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  item: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  modalUploadFile: false,
};

export const fetchPharmacy = createAsyncThunk(
  'pharmacy/service',
  async (
    payload: {
      type: string;
      limit: number;
      offset: string;
      keyword: string;
      isBanned: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDataList(
      payload.type,
      payload.limit,
      payload.offset,
      payload.keyword,
      payload.isBanned
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchPharmacys = createAsyncThunk(
  'pharmacys/service',
  async (
    payload: {
      page: number;
      size: number;
      keyword: string;
      channelId: number;
    },
    { rejectWithValue }
  ) => {
    const response = await getListPharmacys(
      payload.page,
      payload.size,
      payload.keyword,
      payload.channelId
    );
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchItem = createAsyncThunk(
  'outlet/item/service',
  async (
    payload: {
      channelId: number;
      outletId: number;
    },
    { rejectWithValue }
  ) => {
    const response = await getListItem(payload.channelId, payload.outletId);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchPharmacyById = createAsyncThunk(
  'pharmacy/detail',
  async (payload: { id?: string | null }, { rejectWithValue }) => {
    const response = await getPharmacyById(payload.id);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchDetailPharmacys = createAsyncThunk(
  'pharmacys/detail/',
  async (payload: { id: string; channelId: number }, { rejectWithValue }) => {
    const response = await getDetailPharmacys(payload.id, payload.channelId);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchDetail = createAsyncThunk(
  'pharmacy/detail',
  async (payload: { id?: string }, { rejectWithValue }) => {
    const response = await getDetail(payload.id);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchPharmacyEdit = createAsyncThunk(
  'pharmacy/edit',
  async (payload: any, { rejectWithValue }) => {
    const response = await putPharmacy(
      payload.cahannelId,
      payload.id,
      payload.data
    );
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchMedicineByName = createAsyncThunk(
  'pharmacy/medicinename',
  async (payload: { type?: string }, { rejectWithValue }) => {
    const response = await getByName(payload.type);

    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchListMedicine = createAsyncThunk(
  'pharmacy/medicines',
  async (payload: { id?: string }, { rejectWithValue }) => {
    const response = await getListMedicine(payload.id);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchMedicine = createAsyncThunk(
  'pharmacy/medicine',
  async (payload: {}, { rejectWithValue }) => {
    const response = await postMedicine(payload);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchProvider = createAsyncThunk(
  'provider/service',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDataListProvider();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resloveListLocation = createAsyncThunk(
  'pharmacy/province',
  async (payload: any, { rejectWithValue }) => {
    const response = await getLocation(
      payload.province,
      payload.regency,
      payload.district,
      payload.limit
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveCreatePharmacy = createAsyncThunk(
  'pharmacy/create',
  async (payload: any, { rejectWithValue }) => {
    const response = await postPharmacy(payload.channelId, payload.payload);
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveUpdatePharmacy = createAsyncThunk(
  'pharmacy/update',
  async (payload: any, { rejectWithValue }) => {
    const response = await putPharmacy(
      payload.channelId,
      payload.id,
      payload.payload
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveBusinessPharmacy = createAsyncThunk(
  'pharmacy/business',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDetailProvider(payload.id, payload.type);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetListDrugCategory = createAsyncThunk(
  'resolve/drug-category/list',
  async (any, { rejectWithValue }) => {
    const response = await getListDrugCategory();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetListSymptom = createAsyncThunk(
  'resolve/symptom/list',
  async (any, { rejectWithValue }) => {
    const response = await getListSymptom({
      page: 1,
      limit: 50,
      isActive: true,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePatchRelatedPharmacy = createAsyncThunk(
  'resolve/pharmacy/patch',
  async (
    payload: {
      id: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await patchRelatedPharmacy(payload.id, payload.data);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response);
  }
);

const pharmacySlice = createSlice({
  name: 'pharmacy',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPharmacy.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchPharmacy.fulfilled, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.isError = false;
        state.data = payload;
      } else {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = payload.Exception;
      }
    });
    builder.addCase(fetchPharmacy.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });

    // Get List Pharmacys
    builder.addCase(fetchPharmacys.pending, (state) => {
      state.pharmacys.isLoading = true;
      state.pharmacys.isError = false;
    });
    builder.addCase(fetchPharmacys.fulfilled, (state, { payload }) => {
      state.pharmacys.isLoading = false;
      state.pharmacys.isError = false;
      if (payload.data) {
        state.pharmacys.data = payload.data || [];
        // Metadata List Pharmacy Non Super Admin
        state.pharmacys.metadata.page = payload?.metadata?.page || 1;
        state.pharmacys.metadata.size = payload?.metadata?.size || 10;
        state.pharmacys.metadata.totalPage =
          Math.ceil(payload?.metadata?.totalData / state.params.limit) || 1;
        state.pharmacys.metadata.totalData = payload?.metadata?.totalData || 10;
      }
    });
    builder.addCase(fetchPharmacys.rejected, (state) => {
      state.pharmacys.data = [];
      state.pharmacys.isLoading = false;
      state.pharmacys.isError = true;
      state.pharmacys.errorMessage = 'Something wrong!';
    });

    // Get Detail Pharmacy
    builder.addCase(fetchDetailPharmacys.pending, (state) => {
      state.pharmacy.isLoading = true;
      state.pharmacy.isError = false;
    });
    builder.addCase(fetchDetailPharmacys.fulfilled, (state, { payload }) => {
      state.pharmacy.isLoading = false;
      state.pharmacy.isError = false;
      state.pharmacy.data = payload.data;
    });
    builder.addCase(fetchDetailPharmacys.rejected, (state) => {
      state.pharmacy.isLoading = false;
      state.pharmacy.isError = true;
      state.pharmacy.errorMessage = 'Something wrong';
    });

    // Get Detail Item
    builder.addCase(fetchItem.pending, (state) => {
      state.item.isLoading = true;
      state.item.isError = false;
    });
    builder.addCase(fetchItem.fulfilled, (state, { payload }) => {
      state.item.isLoading = false;
      state.item.isError = false;
      state.item.data = payload.data;
    });
    builder.addCase(fetchItem.rejected, (state) => {
      state.item.data = [];
      state.item.isLoading = false;
      state.item.isError = true;
      state.item.errorMessage = 'Something wrong';
    });

    builder.addCase(fetchDetail.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDetail.fulfilled, (state: any, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.detail = payload;
      state.formValue.formOpenHours = payload.item.openHours;
      state.formValue.formAddress = payload.item.address;
      state.formValue.formInformation = payload;
      state.pharmacyRelated = payload.related;

      const payloadItem = payload.item;

      // Set Default Value Form Pharmacy
      state.formInformation = {
        name: payloadItem?.name || '',
        pc: payloadItem?.pc || '',
        phone: payload.item.phone || '',
        acceptsInstantDelivery: payload.item?.acceptsInstantDelivery || false,
        deliveryServiceAvailable:
          payload.item?.deliveryServiceAvailable || false,
        isPickupOutletAvailable: payload.item?.isPickupOutletAvailable || false,
        outletPicture: payloadItem?.outletPicture || '',
      };

      state.formAddress = {
        city: payloadItem?.address?.city || '',
        district: payloadItem?.address?.district || '',
        latitude: payloadItem?.address?.latitude || '',
        longitude: payloadItem?.address?.longitude || '',
        postcode: payloadItem?.address?.postcode || '',
        province: payloadItem?.address?.province || '',
        street: payloadItem?.address?.street || '',
        village: payloadItem?.address?.village || '',
      };
    });
    builder.addCase(fetchDetail.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Somthing wrong!';
    });
    builder.addCase(fetchPharmacyEdit.pending, (state) => {
      state.formPharmacyStatus.isLoading = true;
    });
    builder.addCase(fetchPharmacyEdit.fulfilled, (state) => {
      state.formPharmacyStatus.isLoading = false;
      state.formPharmacyStatus.isSuccess = true;
    });
    builder.addCase(fetchPharmacyEdit.rejected, (state) => {
      state.formPharmacyStatus.isLoading = false;
      state.formPharmacyStatus.isError = true;
    });
    builder.addCase(fetchMedicineByName.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchMedicineByName.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.hasMedicine = true;
      state.medicine = payload;
    });
    builder.addCase(fetchMedicineByName.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Somthing wrong!';
      state.hasMedicine = false;
    });
    builder.addCase(fetchListMedicine.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchListMedicine.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.listMedicine = payload;
    });
    builder.addCase(fetchListMedicine.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Somthing wron!';
    });
    builder.addCase(fetchMedicine.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchMedicine.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchMedicine.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Somthing wron!';
    });
    builder.addCase(fetchProvider.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchProvider.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.listProvider = payload.data;
    });
    builder.addCase(fetchProvider.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(resloveListLocation.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resloveListLocation.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.listLocation = payload.data;
    });
    builder.addCase(resloveListLocation.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(resolveCreatePharmacy.pending, (state) => {
      state.formPharmacyStatus.isLoading = true;
      state.formPharmacyStatus.isError = false;
    });
    builder.addCase(resolveCreatePharmacy.fulfilled, (state) => {
      state.formPharmacyStatus.isLoading = false;
      state.formPharmacyStatus.isSuccess = true;
    });
    builder.addCase(resolveCreatePharmacy.rejected, (state) => {
      state.formPharmacyStatus.isLoading = false;
      state.formPharmacyStatus.isError = true;
    });
    builder.addCase(resolveUpdatePharmacy.pending, (state) => {
      state.formPharmacyStatus.isLoading = true;
      state.formPharmacyStatus.isError = false;
    });
    builder.addCase(resolveUpdatePharmacy.fulfilled, (state) => {
      state.formPharmacyStatus.isLoading = false;
      state.formPharmacyStatus.isSuccess = true;
    });
    builder.addCase(
      resolveUpdatePharmacy.rejected,
      (state, { payload }: any) => {
        state.formPharmacyStatus.isLoading = false;
        state.formPharmacyStatus.isError = true;
        state.formPharmacyStatus.errorMessage = payload.message;
      }
    );
    builder.addCase(resolveBusinessPharmacy.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveBusinessPharmacy.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.detailProvider = payload.data;
    });
    builder.addCase(resolveBusinessPharmacy.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(resolveGetListDrugCategory.pending, (state) => {
      state.isDrugCategoryError = false;
      state.isDrugCategoryLoading = true;
      state.isDrugCategorySuccess = false;
    });
    builder.addCase(
      resolveGetListDrugCategory.fulfilled,
      (state, { payload }) => {
        state.isDrugCategoryError = false;
        state.isDrugCategoryLoading = false;
        state.isDrugCategorySuccess = true;
        state.listDrugCategory = payload.data || [];
      }
    );
    builder.addCase(resolveGetListDrugCategory.rejected, (state) => {
      state.isDrugCategoryError = true;
      state.isDrugCategoryLoading = false;
      state.isDrugCategorySuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveGetListSymptom.pending, (state) => {
      state.isSymptomError = false;
      state.isSymptomLoading = true;
      state.isSymptomSuccess = false;
    });
    builder.addCase(resolveGetListSymptom.fulfilled, (state, { payload }) => {
      state.isSymptomError = false;
      state.isSymptomLoading = false;
      state.isSymptomSuccess = true;
      state.listSymptom = payload.data || [];
    });
    builder.addCase(resolveGetListSymptom.rejected, (state) => {
      state.isSymptomError = true;
      state.isSymptomLoading = false;
      state.isSymptomSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolvePatchRelatedPharmacy.pending, (state) => {
      state.isPatchRelatedError = false;
      state.isPatchRelatedLoading = true;
      state.isPatchRelatedSuccess = false;
    });
    builder.addCase(resolvePatchRelatedPharmacy.fulfilled, (state) => {
      state.isPatchRelatedError = false;
      state.isPatchRelatedLoading = false;
      state.isPatchRelatedSuccess = true;
    });
    builder.addCase(resolvePatchRelatedPharmacy.rejected, (state) => {
      state.isPatchRelatedError = true;
      state.isPatchRelatedLoading = false;
      state.isPatchRelatedSuccess = false;
    });
  },
  reducers: {
    setEndDate: (state, { payload }) => {
      state.params.endDate = payload;
    },
    setStartDate: (state, { payload }) => {
      state.params.startDate = payload;
    },
    setForm: (state, { payload }) => {
      state.formValue[payload.formName] = payload.value;
    },
    setParamsLocation: (state, { payload }) => {
      state.paramsLocation[payload.name] = payload.value;
    },
    setChannelId: (state, { payload }) => {
      state.channelId = payload.value;
    },
    setOpenHours: (state, { payload }) => {
      state.openHours[payload.index][payload.name] = payload.value;
    },
    setIsModalRelated: (state, { payload }) => {
      state.isModalRelated = payload;
    },
    resetStatusFormPharmacy: (state) => {
      state.formPharmacyStatus.isError = false;
      state.formPharmacyStatus.isSuccess = false;
      state.formPharmacyStatus.isLoading = false;
    },
    setFormInfromation: (state, { payload }) => {
      state.formInformation[payload.name] = payload.value;
    },
    setFromAddress: (state, { payload }) => {
      state.formAddress[payload.name] = payload.value;
    },
    setPharmacyRelated: (state, { payload }) => {
      state.pharmacyRelated = payload;
    },
    clearStatePatchRelated: (state) => {
      state.isPatchRelatedError = false;
      state.isPatchRelatedLoading = false;
      state.isPatchRelatedSuccess = false;
    },
    clearFormInformation: (state) => {
      state.formInformation = {
        deliveryServiceAvailable: false,
        isPickupOutletAvailable: false,
        acceptsInstantDelivery: false,
        pc: '',
        phone: '',
        name: '',
        provider: '',
        outletPicture: '',
      };

      state.formAddress = {
        city: '',
        cityId: '',
        district: '',
        districtId: '',
        latitude: '',
        longitude: '',
        postcode: '',
        province: '',
        provinceId: '',
        street: '',
        village: '',
      };

      state.paramsLocation = {
        province: '',
        district: '',
        regency: '',
        limit: 33,
      };
    },
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setModalUploadFile: (state, { payload }) => {
      state.modalUploadFile = payload;
    },
  },
});

export const {
  setEndDate,
  setStartDate,
  setForm,
  setParamsLocation,
  setChannelId,
  setOpenHours,
  setIsModalRelated,
  setPharmacyRelated,
  clearStatePatchRelated,
  resetStatusFormPharmacy,
  setFormInfromation,
  setFromAddress,
  clearFormInformation,
  setParams,
  setModalUploadFile,
} = pharmacySlice.actions;

export default pharmacySlice.reducer;
