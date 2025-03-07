import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addStock,
  deleteVariant,
  getDataList,
  getDetail,
  getDetailMedicine,
  getDetailVariant,
  getListMerchant,
  getMedicineNonAdmin,
  getMedicinesNonAdmin,
  getStock,
  getVariants,
  postData,
  postVariant,
  putData,
  putMedicineInformation,
  updateMedicine,
  updateRelated,
  updateVariant,
} from '@/src/client/Medicine';

type IMedicine = {
  isLoading: boolean;
  isError: boolean;
  errMsg: string;
  successMsg: string;
  listMedicine: any[];
  detail: {};
  listMerchant: any[];
  listVariant: any[];
  newServiceType: {
    id: string;
    name: string;
    foto: string;
    description: string;
  };
  countPage: number;
  limit: number;
  formMedicine: {
    provider: string;
    apotek: string;
    id: string;
    name: string;
    category: string;
    type: string;
    unit: string;
    produceBy: string;
    licenseNumber: string;
    description: string;
    dosage: string;
    sideEffect: string;
    indication: string;
    howToUse: string;
    contradiction: string;
    storage: string;
    specialAttention: string;
    expiredDate: string;
    variants: any[];
    photo: {
      'photo-0': string;
      'photo-1': string;
      'photo-2': string;
      'photo-3': string;
      'photo-4': string;
    };
  };
  selectedVariant: {};
  pagination: {
    page: number;
    limit: number;
    totalPage: number;
    masterData: any[];
    currentData: any[];
  };
  itemId: string;
  providerId: string;
  formMedicineStatus: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  formInformation: {};
  formPhotos: string;
  formDescription: {};
  formMedicineStatusUpdate: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  formAddVariantStatus: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  formDeleteVariantStatus: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  // variants: any [],
  isModalEditRelatedOpen: boolean;
  relatedMedicine: any[];
  defaultRelated: any[];
  formAddRelated: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isModalSuccessOpen: boolean;
    isModalErrorOpen: boolean;
  };
  activeVariant: string;
  detailVariant: {};
  stockVariant: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    value: number;
    currentValue: number;
  };
  variants: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data: any[];
    variantId: string;
    successMessage: string;
    errorMessage: string;
  };
  modal: {
    addStockModal: boolean;
  };
  paramsNonAdmin: {
    page: number;
    limit: number;
    keyword: string;
  };
  modalUploadFile: boolean;
};

const initialState: IMedicine = {
  isLoading: false,
  isError: false,
  errMsg: '',
  successMsg: '',
  listMedicine: [],
  detail: {},
  listMerchant: [],
  listVariant: [],
  newServiceType: {
    id: '',
    name: '',
    foto: '',
    description: '',
  },
  countPage: 1,
  limit: 5,
  formMedicine: {
    provider: '',
    apotek: '',
    id: '',
    name: '',
    category: '',
    type: '',
    unit: '',
    produceBy: '',
    licenseNumber: '',
    description: '',
    dosage: '',
    sideEffect: '',
    indication: '',
    howToUse: '',
    contradiction: '',
    storage: '',
    specialAttention: '',
    expiredDate: '',
    variants: [],
    photo: {
      'photo-0': '',
      'photo-1': '',
      'photo-2': '',
      'photo-3': '',
      'photo-4': '',
    },
  },
  selectedVariant: {},
  pagination: {
    page: 1,
    limit: 10,
    totalPage: 1,
    masterData: [],
    currentData: [],
  },
  itemId: '',
  providerId: '',
  formMedicineStatus: {
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  formInformation: {},
  formPhotos: '',
  formDescription: {},
  formMedicineStatusUpdate: {
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  formAddVariantStatus: {
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  formDeleteVariantStatus: {
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  // variants: [],
  isModalEditRelatedOpen: false,
  relatedMedicine: [],
  defaultRelated: [],
  formAddRelated: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isModalSuccessOpen: false,
    isModalErrorOpen: false,
  },
  activeVariant: '',
  detailVariant: {},
  stockVariant: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    value: 0,
    currentValue: 0,
  },
  variants: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
    variantId: '',
    successMessage: '',
    errorMessage: '',
  },
  modal: {
    addStockModal: false,
  },
  paramsNonAdmin: {
    page: 1,
    limit: 10,
    keyword: '',
  },
  modalUploadFile: false,
};

export const fetchDataList = createAsyncThunk(
  'medicine/list',
  async (
    payload: {
      type: string;
      limit: string;
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
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchDetail = createAsyncThunk(
  'medicine/detail',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDetail(payload.id);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchListMerchant = createAsyncThunk(
  'medicine/detailMerchant',
  async (_, { rejectWithValue }) => {
    const response = await getListMerchant();
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveCreateMedicine = createAsyncThunk(
  'medicine/create',
  async (payload: any, { rejectWithValue }) => {
    const response = await postData(payload.channelId, payload.data);
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const fetchDataUpdate = createAsyncThunk(
  'medicine/update',
  async (payload: any, { rejectWithValue }) => {
    const response = await putData(payload.id, payload.data);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveDetailMedicine = createAsyncThunk(
  'medicine/detail-hs',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDetailMedicine(
      payload.providerId,
      payload.itemId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveUpdateMedicine = createAsyncThunk(
  'medicine/update-hs',
  async (payload: any, { rejectWithValue }) => {
    const response = await updateMedicine(
      payload.providerId,
      payload.itemId,
      payload.data
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveAddVariant = createAsyncThunk(
  'medicine/add/variant',
  async (payload: any, { rejectWithValue }) => {
    const response = await postVariant(
      payload.providerId,
      payload.itemId,
      payload.data
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveDeleteVariant = createAsyncThunk(
  'medicine/delete/variant',
  async (payload: any, { rejectWithValue }) => {
    const response = await deleteVariant(
      payload.providerId,
      payload.itemId,
      payload.variantId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetVariants = createAsyncThunk(
  'medicine/variants',
  async (payload: any, { rejectWithValue }) => {
    const response = await getVariants(payload.providerId, payload.itemId);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveUpdateRelatedMedicine = createAsyncThunk(
  'medicine/related',
  async (payload: any, { getState, rejectWithValue }) => {
    try {
      const { id } = payload;
      const { medicine }: any = getState();

      const response = await updateRelated(id, [
        ...new Set([...medicine.relatedMedicine]),
      ]);

      if (response.status === 200) {
        return response.data;
      }

      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetListVariant = createAsyncThunk(
  'medicine/list/variant',
  async (payload: any, { rejectWithValue }) => {
    const response = await getVariants(payload.providerId, payload.itemId);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetDetailVariant = createAsyncThunk(
  'mediciner/detail/variant',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDetailVariant(payload);

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue(response.error);
  }
);

export const resolveUpdateVariant = createAsyncThunk(
  'medicine/update/variant',
  async (payload: any, { rejectWithValue }) => {
    const response = await updateVariant({
      providerId: payload.providerId,
      itemId: payload.itemId,
      variantId: payload.variantId,
      data: payload.data,
    });
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveAddStock = createAsyncThunk(
  'medicine/update/variant/stock',
  async (
    payload: {
      channelId: string;
      outletId: string;
      itemId: string;
      value: number;
    },
    { rejectWithValue }
  ) => {
    const response = await addStock(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetStock = createAsyncThunk(
  'medicine/update/variant/stock/get',
  async (
    payload: {
      channelId: string;
      outletId: string;
      itemId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getStock(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetMedicinesNonAdmin = createAsyncThunk(
  'medicine/list/nonAdmin',
  async (
    payload: {
      channelId: number;
      params: {
        page: number;
        size: number;
        keyword: string;
      };
    },
    { rejectWithValue }
  ) => {
    const response = await getMedicinesNonAdmin(
      payload.channelId,
      payload.params
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetMedicineNonAdmin = createAsyncThunk(
  'medicine/detail/nonAdmin',
  async (
    payload: {
      channelId: number;
      itemId: number;
    },
    { rejectWithValue }
  ) => {
    const response = await getMedicineNonAdmin(
      payload.channelId,
      payload.itemId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const reolvePutMedicine = createAsyncThunk(
  'medecine/put/information',
  async (
    payload: {
      channelId: string;
      itemId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await putMedicineInformation(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDataList.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDataList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.listMedicine = payload;
      state.pagination.masterData = payload;
      state.pagination.totalPage = Math.ceil(parseInt(payload.length) / 10);
      state.pagination.currentData = payload.slice(0, 10);
    });
    builder.addCase(fetchDataList.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveCreateMedicine.pending, (state) => {
      state.formMedicineStatus.isLoading = true;
      state.formMedicineStatus.isError = false;
      state.formMedicineStatus.isSuccess = false;
    });
    builder.addCase(resolveCreateMedicine.fulfilled, (state, { payload }) => {
      state.formMedicineStatus.isLoading = false;
      state.formMedicineStatus.isSuccess = true;
      state.itemId = payload.data.id;
      state.successMsg = 'Data has been saved';
    });
    builder.addCase(resolveCreateMedicine.rejected, (state) => {
      state.formMedicineStatus.isLoading = false;
      state.formMedicineStatus.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(fetchDetail.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDetail.fulfilled, (state: any, { payload }) => {
      state.isLoading = false;
      state.detail = payload;
      if (payload.related && payload.related.length > 0) {
        state.relatedMedicine = [...payload.related];
        state.defaultRelated = [...payload.related];
      }
    });
    builder.addCase(fetchDetail.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(fetchListMerchant.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchListMerchant.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.listMerchant = payload;
    });
    builder.addCase(fetchListMerchant.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(fetchDataUpdate.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDataUpdate.fulfilled, (state) => {
      state.isLoading = false;
      state.successMsg = 'Data haas been updated';
    });
    builder.addCase(fetchDataUpdate.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveDetailMedicine.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveDetailMedicine.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      state.formInformation = {
        id: payload.data.variants[0].id || '',
        name: payload.data.variants[0].name || '',
        produceBy: payload.data.variants[0].manufacturer.name || '',
        licenseNumber: payload.data.variants[0].noIzinEdar,
      };

      state.formPhotos = payload.data.variants[0]?.imageUrls || [];

      state.formDescription = {
        description: payload.data.variants[0].description,
        dosage: payload.data.variants[0].dosage,
        sideEffect: payload.data.variants[0].sideEffect,
        indication: payload.data.variants[0].indication,
        howToUse: payload.data.variants[0].howToUse,
        contradiction: payload.data.variants[0].contraIndication,
        storage: payload.data.variants[0].storage,
        specialAttention: payload.data.variants[0].specialAttention,
        composition: payload.data.variants[0].composition,
        dosageForm: payload.data.variants[0].dosageForm,
      };
    });
    builder.addCase(resolveDetailMedicine.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveUpdateMedicine.pending, (state) => {
      state.formMedicineStatusUpdate.isLoading = true;
      state.formMedicineStatusUpdate.isError = false;
      state.formMedicineStatusUpdate.isSuccess = false;
    });
    builder.addCase(resolveUpdateMedicine.fulfilled, (state) => {
      state.formMedicineStatusUpdate.isLoading = false;
      state.formMedicineStatusUpdate.isSuccess = true;
      state.successMsg = 'Data has been saved';
    });
    builder.addCase(resolveUpdateMedicine.rejected, (state) => {
      state.formMedicineStatusUpdate.isLoading = false;
      state.formMedicineStatusUpdate.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveAddVariant.pending, (state) => {
      state.formAddVariantStatus.isLoading = true;
      state.formAddVariantStatus.isError = false;
      state.formAddVariantStatus.isSuccess = false;
    });
    builder.addCase(resolveAddVariant.fulfilled, (state) => {
      state.formAddVariantStatus.isLoading = false;
      state.formAddVariantStatus.isSuccess = true;
      state.successMsg = 'Data has been saved';
    });
    builder.addCase(resolveAddVariant.rejected, (state) => {
      state.formAddVariantStatus.isLoading = false;
      state.formAddVariantStatus.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveDeleteVariant.pending, (state) => {
      state.formDeleteVariantStatus.isLoading = true;
      state.formDeleteVariantStatus.isError = false;
      state.formDeleteVariantStatus.isSuccess = false;
    });
    builder.addCase(resolveDeleteVariant.fulfilled, (state) => {
      state.formDeleteVariantStatus.isLoading = false;
      state.formDeleteVariantStatus.isSuccess = true;
      state.successMsg = 'Data has been saved';
    });
    builder.addCase(resolveDeleteVariant.rejected, (state) => {
      state.formDeleteVariantStatus.isLoading = false;
      state.formDeleteVariantStatus.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveGetVariants.pending, (state) => {
      state.variants.isLoading = true;
      state.variants.isError = false;
    });
    builder.addCase(resolveGetVariants.fulfilled, (state, { payload }) => {
      state.variants.isLoading = false;
      state.variants.successMessage = 'Data has been saved';
      state.variants.data = payload.data;
    });
    builder.addCase(resolveGetVariants.rejected, (state) => {
      state.variants.isLoading = false;
      state.variants.isError = true;
      state.variants.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveUpdateRelatedMedicine.pending, (state) => {
      state.formAddRelated.isLoading = true;
      state.formAddRelated.isError = false;
      state.formAddRelated.isSuccess = false;
      state.formAddRelated.isModalSuccessOpen = false;
      state.formAddRelated.isModalErrorOpen = false;
    });
    builder.addCase(resolveUpdateRelatedMedicine.fulfilled, (state) => {
      state.formAddRelated.isLoading = false;
      state.formAddRelated.isError = false;
      state.formAddRelated.isSuccess = true;
      state.isModalEditRelatedOpen = false;
      state.formAddRelated.isModalSuccessOpen = true;
    });
    builder.addCase(resolveUpdateRelatedMedicine.rejected, (state) => {
      state.formAddRelated.isLoading = false;
      state.formAddRelated.isError = true;
      state.formAddRelated.isModalErrorOpen = true;
    });
    builder.addCase(resolveGetListVariant.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveGetListVariant.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.listVariant = payload.data;
    });
    builder.addCase(resolveGetListVariant.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveGetDetailVariant.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resolveGetDetailVariant.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.detailVariant = {
        ...payload.data,
        id: payload.data.id,
        sku: payload.data.sku,
        variant: payload.data.variant?.name || '',
        length: payload.data.length,
        width: payload.data.width,
        weight: payload.data.weight,
        height: payload.data.height,
        minQty: payload.data.minQty,
        stock: payload.data.stock,
        batchNumber: payload.data.batchNumber,
        price: payload.data.price,
        dosage: payload.data.dosage,
        sideEffect: payload.data.sideEffect,
        indication: payload.data.indication,
        howToUse: payload.data.howToUse,
        contraIndication: payload.data.contraIndication,
        storage: payload.data.storage,
        specialAttention: payload.data.specialAttention,
        imageUrls: payload.data.imageUrls,
        composition: payload.data.composition,
        dosageForm: payload.data.dosageForm,
      };
    });
    builder.addCase(resolveGetDetailVariant.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(resolveUpdateVariant.pending, (state) => {
      state.formAddVariantStatus.isLoading = true;
      state.formAddVariantStatus.isError = false;
      state.formAddVariantStatus.isSuccess = false;
    });
    builder.addCase(resolveUpdateVariant.fulfilled, (state) => {
      state.formAddVariantStatus.isLoading = false;
      state.formAddVariantStatus.isSuccess = true;
      state.successMsg = 'Data has been updated';
    });
    builder.addCase(resolveUpdateVariant.rejected, (state) => {
      state.formAddVariantStatus.isLoading = false;
      state.formAddVariantStatus.isError = true;
      state.errMsg = 'Something wrong!';
    });

    // Put stock variant
    builder.addCase(resolveAddStock.pending, (state) => {
      state.stockVariant.isLoading = true;
      state.stockVariant.isError = false;
      state.stockVariant.isSuccess = false;
    });
    builder.addCase(resolveAddStock.fulfilled, (state, { payload }) => {
      state.stockVariant.isLoading = false;
      state.stockVariant.isSuccess = true;
      state.stockVariant.value = payload.data;
      state.modal.addStockModal = false;
    });
    builder.addCase(resolveAddStock.rejected, (state) => {
      state.stockVariant.isLoading = false;
      state.stockVariant.isError = true;
    });
    // get Stock
    builder.addCase(resolveGetStock.pending, () => {
      // state.stockVariant.isLoading = true;
      // state.stockVariant.isError = false;
      // state.stockVariant.isSuccess = false;
    });
    builder.addCase(resolveGetStock.fulfilled, (state, { payload }) => {
      // state.stockVariant.isLoading = false;
      // state.stockVariant.isSuccess = true;
      state.stockVariant.currentValue = payload.stock;
    });
    builder.addCase(resolveGetStock.rejected, () => {
      // state.stockVariant.isLoading = false;
      // state.stockVariant.isError = true;
    });
    // get list medicine non admin
    builder.addCase(resolveGetMedicinesNonAdmin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      resolveGetMedicinesNonAdmin.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.listMedicine = payload.data;
        // state.pagination.masterData = payload;
        // state.pagination.totalPage = Math.ceil(parseInt(payload.length) / 10);
        // state.pagination.currentData = payload.slice(0, 10);
      }
    );
    builder.addCase(resolveGetMedicinesNonAdmin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    // get list medicine detail
    builder.addCase(resolveGetMedicineNonAdmin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      resolveGetMedicineNonAdmin.fulfilled,
      (state: any, { payload }) => {
        state.isLoading = false;
        state.detail = payload.data;
      }
    );
    builder.addCase(resolveGetMedicineNonAdmin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = 'Something wrong!';
    });
    builder.addCase(reolvePutMedicine.pending, (state) => {
      state.formMedicineStatus.isLoading = true;
      state.formMedicineStatus.isError = false;
      state.formMedicineStatus.isSuccess = false;
    });
    builder.addCase(reolvePutMedicine.fulfilled, (state, { payload }) => {
      state.formMedicineStatus.isLoading = false;
      state.formMedicineStatus.isSuccess = true;
      state.itemId = payload.data.id;
      state.successMsg = 'Data has been Updated';
    });
    builder.addCase(reolvePutMedicine.rejected, (state) => {
      state.formMedicineStatus.isLoading = false;
      state.formMedicineStatus.isError = true;
      state.errMsg = 'Something wrong!';
    });
  },
  reducers: {
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
    setFormMedicine: (state, { payload }) => {
      state.formMedicine = payload;
    },
    removeMedicineVariant: (state, { payload }) => {
      const filteredVariants = state.formMedicine.variants.filter(
        (item: any) => item.id !== payload.id
      );

      state.formMedicine = {
        ...state.formMedicine,
        variants: filteredVariants,
      };
    },
    setSelectedVariant: (state, { payload }) => {
      state.selectedVariant = state.formMedicine.variants.filter((item: any) =>
        item.id.includes(payload.id)
      )[0];
    },
    removeSelectedVariant: (state) => {
      state.selectedVariant = {};
    },
    setForm: (state, { payload }) => {
      state.formMedicine[payload?.field] = payload.value;
    },
    resetStatusForm: (state, { payload }) => {
      state[payload.name].isLoading = false;
      state[payload.name].isError = false;
      state[payload.name].isSuccess = false;
    },
    setFormMedicineByName: (state, { payload }) => {
      if (payload.name === 'variants') {
        state.formMedicine.variants.push(payload.value);
      } else {
        state.formMedicine[payload.name] = payload.value;
      }
    },
    resetForm: (state) => {
      state.formMedicine = initialState.formMedicine;
      state.formInformation = initialState.formInformation;
      state.formPhotos = initialState.formPhotos;
      state.formDescription = initialState.formDescription;
    },
    setProviderId: (state, { payload }) => {
      state.providerId = payload.value;
    },
    setIsModalEditRelatedOpen: (state, { payload }) => {
      state.isModalEditRelatedOpen = payload.value;
    },
    setFormAddRelated: (state, { payload }) => {
      state.formAddRelated[payload.name] = payload.value;
    },
    setRelatedMedicine: (state: any, { payload }) => {
      state.relatedMedicine = [
        ...new Set([...state.defaultRelated, ...payload.data]),
      ];
    },
    setRemoveRelated: (state, { payload }) => {
      state.relatedMedicine = state.relatedMedicine.filter(
        (item: any) => !item.toLowerCase().includes(payload.value.toLowerCase())
      );
    },
    setDefaultRelatedMedicine: (state: any, { payload }) => {
      state.relatedMedicine = payload.data;
    },
    setFormInformation: (state: any, { payload }) => {
      state.formInformation[payload.label] = payload.value;
    },
    setFormDescription: (state: any, { payload }) => {
      state.formDescription[payload.label] = payload.value;
    },
    setFormMedicinePhoto: (state, { payload }) => {
      state.formMedicine.photo[payload.label] = payload.value;
    },
    setActiveVariant: (state, { payload }) => {
      state.activeVariant = payload.value;
    },
    setRemoveDetailVariant: (state) => {
      state.detailVariant = {};
    },
    setDetailVariant: (state, { payload }) => {
      state.detailVariant[payload.label] = payload.value;
    },
    setStockValue: (state, { payload }) => {
      state.stockVariant.value = payload.value;
    },
    resetStockStatus: (state) => {
      state.stockVariant.isError = false;
      state.stockVariant.isLoading = false;
      state.stockVariant.isSuccess = false;
    },
    setVariantId: (state, { payload }) => {
      state.variants.variantId = payload.value;
    },
    setModal: (state, { payload }) => {
      state.modal[payload.name] = payload.value;
    },
    setParamsNonAdmin: (state, { payload }) => {
      state.paramsNonAdmin[payload.name] = payload.value;
    },
    resetVariants: (state) => {
      state.variants.data = initialState.variants.data;
      state.formMedicine.variants = initialState.formMedicine.variants;
    },
    setModalUploadFile: (state, { payload }) => {
      state.modalUploadFile = payload;
    },
  },
});

export const {
  setForm,
  setPageLocal,
  setFormMedicine,
  setSelectedVariant,
  removeMedicineVariant,
  removeSelectedVariant,
  resetStatusForm,
  setFormMedicineByName,
  resetForm,
  setProviderId,
  setIsModalEditRelatedOpen,
  setFormAddRelated,
  setRelatedMedicine,
  setRemoveRelated,
  setDefaultRelatedMedicine,
  setFormInformation,
  setFormDescription,
  setFormMedicinePhoto,
  setActiveVariant,
  setRemoveDetailVariant,
  setDetailVariant,
  setStockValue,
  resetStockStatus,
  setVariantId,
  setModal,
  setParamsNonAdmin,
  resetVariants,
  setModalUploadFile,
} = medicineSlice.actions;

export default medicineSlice.reducer;
