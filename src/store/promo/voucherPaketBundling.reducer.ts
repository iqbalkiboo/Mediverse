import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  disableDataVoucherPromo,
  getDetailVoucherPromo,
  getListVoucherPromo,
  postDataVoucherPromo,
} from '@/src/client/promo';

import {
  getListDrugElastic,
} from '@/client/promo/BundlingPackage';

export const initialState: any = {
  bundlingPackages: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    metadata: {
      page: 1,
      limit: 1,
      totalData: 0,
      totalPage: 1,
    },
  },
  bundlingPackage: {
    data: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  drugs: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
  },
  modalUpdateListAction: {
    flag: '',
    bundlingPackageId: null,
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  formBundlingPackage: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      name: '',
      photo: '',
      faskes: '',
      endPeriod: '',
      startPeriod: '',
      drugItems: [],
    },
  },
  modalAddBundlingPackage: {
    isOpen: false,
    drugs: [],
    selectedDrugs: [],
    services: [],
    selectedServices: [],
  },
  modalDownloadBundlingPackage: {
    isOpen: false,
    isLoading: false,
    data: {},
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    type: '',
    target: '',
    drugType: '',
    drugSearch: '',
    serviceGroup: '',
    drugCateogory: '',
    serviceFaskesSearch: '',
  },
};

export const resolveListBundlingPackage = createAsyncThunk(
    'resolve/bundlingPackage/list',
    async (payload: {
  page: number,
  limit: number,
  search: string,
  target: string,
  status: string,
  type: string,
  providerType: string,
}, {rejectWithValue}) => {
      try {
        const response = await getListVoucherPromo(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDetailBundlingPackage = createAsyncThunk(
    'resolve/bundlingPackage/detail',
    async (payload: {id: any}, {rejectWithValue}) => {
      try {
        const response = await getDetailVoucherPromo(payload.id);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveListDrugElastic = createAsyncThunk(
    'resolve/drug/list',
    async (payload: {
  search: string,
  providerId: string,
}, {rejectWithValue}) => {
      try {
        const response = await getListDrugElastic(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostDataVoucherPromo = createAsyncThunk(
    'resolve/voucherPromo/create',
    async (payload: {data: any}, {rejectWithValue}) => {
      try {
        const response = await postDataVoucherPromo(payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDisableDataBundlingPackage = createAsyncThunk(
    'resolve/bundlingPackage/disable',
    async (payload: {
  id: string,
  data: any,
}, {rejectWithValue}) => {
      try {
        const response = await disableDataVoucherPromo(payload.id, payload.data);
        if (!response.error) {
          return response.data;
        }
        return rejectWithValue(response.data.message);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

const voucherPaketBundlingSlice = createSlice({
  name: 'voucherPaketBundling',
  initialState,
  extraReducers: (builder) => {
    // Get List Voucher Promo
    builder.addCase(resolveListBundlingPackage.pending, (state) => {
      state.bundlingPackages.isLoading = true;
      state.bundlingPackages.isError = false;
    });
    builder.addCase(resolveListBundlingPackage.fulfilled, (state, {payload}) => {
      state.bundlingPackages.isLoading = false;
      state.bundlingPackages.isError = false;
      state.bundlingPackages.data = payload?.data || [];

      // Metadata List Voucher Promo
      state.bundlingPackages.metadata.page = payload?.metadata?.page || 1;
      state.bundlingPackages.metadata.limit = payload?.metadata?.per_page || 10;
      state.bundlingPackages.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.bundlingPackages.metadata.totalData = payload?.metadata?.total_data || 0;
    });
    builder.addCase(resolveListBundlingPackage.rejected, (state, {payload}: any) => {
      state.bundlingPackages.isLoading = false;
      state.bundlingPackages.isError = true;
      state.bundlingPackages.data = [];
      state.bundlingPackages.errorMessage = payload?.message || 'Gagal mendapatkan data voucher paket bundling!';
    });

    // Get Detail Voucher Promo
    builder.addCase(resolveDetailBundlingPackage.pending, (state) => {
      state.bundlingPackage.isLoading = true;
      state.bundlingPackage.isError = false;
    });
    builder.addCase(resolveDetailBundlingPackage.fulfilled, (state, {payload}) => {
      state.bundlingPackage.isLoading = false;
      state.bundlingPackage.isError = false;
      state.bundlingPackage.data = payload?.data;
    });
    builder.addCase(resolveDetailBundlingPackage.rejected, (state, {payload}: any) => {
      state.bundlingPackage.isLoading = false;
      state.bundlingPackage.isError = true;
      state.bundlingPackage.errorMessage = payload?.message || 'Gagal mendapatkan data voucher paket bundling!';
    });

    // Get List Drug Elastic
    builder.addCase(resolveListDrugElastic.pending, (state) => {
      state.drugs.isLoading = true;
      state.drugs.isError = false;
    });
    builder.addCase(resolveListDrugElastic.fulfilled, (state, {payload}) => {
      state.drugs.isLoading = false;
      state.drugs.isError = false;
      state.modalAddBundlingPackage.drugs = payload || [];
    });
    builder.addCase(resolveListDrugElastic.rejected, (state, {payload}: any) => {
      state.drugs.isLoading = false;
      state.drugs.isError = true;
      state.drugs.errorMessage = payload?.message || 'Gagal Mendapatkan Data Obat!';
    });

    // Post Data Voucher Promo
    builder.addCase(resolvePostDataVoucherPromo.pending, (state) => {
      state.formBundlingPackage.isLoading = true;
      state.formBundlingPackage.isError = false;
    });
    builder.addCase(resolvePostDataVoucherPromo.fulfilled, (state, {payload}) => {
      state.formBundlingPackage.isLoading = false;
      state.formBundlingPackage.isSuccess = true;
      state.formBundlingPackage.successMessage = 'Berhasil menambahkan data voucher paket bundling';
    });
    builder.addCase(resolvePostDataVoucherPromo.rejected, (state, {payload}) => {
      state.formBundlingPackage.isLoading = false;
      state.formBundlingPackage.isError = true;
      state.formBundlingPackage.errorMessage = String(payload) || 'Something Wrong !';
    });

    // Disable Data Voucher Promo
    builder.addCase(resolveDisableDataBundlingPackage.pending, (state) => {
      state.modalUpdateListAction.isLoading = true;
      state.modalUpdateListAction.isError = false;
    });
    builder.addCase(resolveDisableDataBundlingPackage.fulfilled, (state, {payload}: any) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = false;
      state.modalUpdateListAction.isSuccess = true;
      state.modalUpdateListAction.successMessage =
        String(payload.message) || 'Berhasil mendisable promo paket bundling';
    });
    builder.addCase(resolveDisableDataBundlingPackage.rejected, (state, {payload}) => {
      state.modalUpdateListAction.isLoading = false;
      state.modalUpdateListAction.isError = true;
      state.modalUpdateListAction.isSuccess = false;
      state.modalUpdateListAction.errorMessage = String(payload) || 'Something Wrong !';
    });
  },
  reducers: {
    setFlag: (state, {payload}) => {
      state[payload.state].flag = payload.value;
    },
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.name] = payload.value;
    },
    setForm: (state, {payload}) => {
      state.formBundlingPackage.form[payload.name] = payload.value;
    },
    setBundlingPackageId: (state, {payload}) => {
      state.modalUpdateListAction.bundlingPackageId = payload.value;
    },
    setSelectedDrug: (state, {payload}) => {
      state.modalAddBundlingPackage.selectedDrugs.push(payload);
    },
    setSelectServices: (state, {payload}) => {
      state.modalAddBundlingPackage.selectedServices.push(payload);
    },
    deleteSelectedServices: (state, {payload}) => {
      state.modalAddBundlingPackage.selectedServices.splice(payload, 1);
    },
    deleteSelectedDrug: (state, {payload}) => {
      state.modalAddBundlingPackage.selectedDrugs.splice(payload, 1);
    },
    setPackagePriceDrugItem: (state, {payload}) => {
      state.formBundlingPackage.form.drugItems[payload.index][payload.name] = payload.value;
    },
    setDataDownloadBundlingPackage: (state, {payload}) => {
      state.modalDownloadBundlingPackage.data = payload.value;
    },
    resetFormBundlingPackage: (state) => {
      state.formBundlingPackage = initialState.formCashback;
    },
    resetStatePackageBundling: () => initialState,
  },
});

export const {
  setForm,
  setFlag,
  setModal,
  setParams,
  setSelectedDrug,
  setSelectServices,
  deleteSelectedDrug,
  setBundlingPackageId,
  deleteSelectedServices,
  setPackagePriceDrugItem,
  resetFormBundlingPackage,
  resetStatePackageBundling,
  setDataDownloadBundlingPackage,
} = voucherPaketBundlingSlice.actions;

export default voucherPaketBundlingSlice.reducer;
