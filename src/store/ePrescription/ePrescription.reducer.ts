import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  IGetListEPrescriptionParams,
} from '@/src/types/MasterTransaction/eprescription';

import {
  getDetailEPrescription,
  getDownloadFileCopyRecipe,
  getJID,
  getListDrugs,
  getListEPrescription,
  getStockDrug,
  patchHowToUseEPrescription,
  postCancelOrderEPresription,
  postDataCopyRecipe,
  postRegisterJID,
  putClaimPrescription,
  putConfirmEPrescription,
} from '@/src/client/ePrescription';
import {MESSAGE, TRANSACTION_STATUS_RESPONSE} from '@/src/constants';
import cookieUtils from '@/src/utils/cookieUtils';

const userInfo = await cookieUtils.getUser();
const domain = '@' + import.meta.env.VITE_APP_WEBSOCKET_DOMAIN;

const initialState = {
  cardOrder: {
    isShowAll: false,
    isShowInformation: true,
  },
  cardApproval: {
    isShowPhotoRecipe: true,
  },
  ePrescriptions: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
    metadata: {
      page: 1,
      perPage: 10,
      totalPage: 1,
      totalRow: 0,
    },
  },
  itemEPrescriptions: {
    data: [],
  },
  formModalCreateRecipeDrug: {
    isOpen: false,
    isEdit: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    isSubstitute: false,
    form: {
      id: '',
      name: '',
      image: '',
      dosage: '',
      item: '',
      stock: 0,
      itemPrice: 0,
      totalPrice: 0,
      totalRecipe: 0,
      totalBought: 0,
      substitutionDrug: '',
      isConcoction: false,
    },
  },
  formModalAddConcoctionDrug: {
    isOpen: false,
    isEdit: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      recipeName: '',
      totalConcoction: 0,
      totalBought: 0,
      items: [],
    },
  },
  ePrescription: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    id: 0,
    data: {},
    searchDrug: '',
    expandSeeMore: false,
    showAllDrug: false,
    expandFoto: true,
    expandInfo: true,
    disabled: false,
    autocompleteDrugs: [],
    prescriptions: [],
    isOpenModal: {
      add: false,
      create: false,
    },
    form: {
      action: '',
      item: [] as any,
      total_amount: '',
    },
    dataChat: {},
    claim: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
    cancelOrder: {
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    status: '',
    endDate: '',
    startDate: '',
  },
  listDrugs: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    search: '',
    totalPrice: 0,
    data: [],
  },
  onModalCreate: {
    search: '',
    totalOfDrug: 1,
    recipeOfDrug: [],
    isLoading: false,
    autocompleteDrugs: [],
    totalPrice: 0,
    name: '',
    totalPack: 0,
  },
  informationShipper: {
    orderId: 'E-38287',
    date: '21 Juni 2022 12:21',
    // status using uderscore if has a spacing example siap_dikirim
    status: 'menunggu_konfirmasi',
    pasienName: 'Andri Shecvenko',
    phoneNumber: '081222333444',
    oldPasien: '25 tahun',
    shipper: 'Subhan David Effendi',
    address: 'Jl Merdeka, RT 01. RW 02, Kelurahan Pakua, Kec. Bogor Selatan, Kota Bogor, Jawa Barat, Indonesia',
  },
  chat: {
    isShow: false,
    isBack: false,
    isEdit: false,
    data: {},
    auth: {
      username: '',
      to: '',
    },
    jid: '',
    messages: [],
    status: TRANSACTION_STATUS_RESPONSE.ADMIN_CONFIRMATION,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isConfirm: false,
    errorMessage: '',
    isRegistered: false,
    sendItem: false,
  },
  formRejectOrder: {
    isOpen: false,
    form: {
      status: '',
      selectedReason: '',
      notes: '',
    },
  },
  confirmReceiptOrder: {
    isLoading: false,
    isError: false,
    modalConfirmation: false,
    errorMessage: '',
    isSuccess: false,
  },
  itemConfirm: {
    items: [],
    totalAmount: 0,
  },
  orderFailedModal: {
    isOpen: true,
  },
  completeStatusModal: {
    isOpen: false,
    isReadyPickUpModal: false,
    selectedId: null,
  },
  howToUseDrug: {
    isLoading: false,
    isError: false,
    modalConfirmation: false,
    errorMessage: '',
    isSuccess: false,
  },
  previewMedia: {
    type: '',
    isShow: false,
    src: '',
  },
  formCopyRecipe: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      doctorName: '',
      doctorSip: '',
      date: '',
      isIterationRecipe: false,
      iterationRecipe: '',
      nonMixtureDrug: [] as any[],
      mixtureDrug: [] as any[],
    },
  },
  downloadCopyRecipe: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
  },
};

export const resolveGetListEPrescription = createAsyncThunk(
    'resolve/ePrescription/list',
    async (payload: IGetListEPrescriptionParams, {rejectWithValue}) => {
      try {
        const response = await getListEPrescription(payload);
        if (([
          TRANSACTION_STATUS_RESPONSE.NEW,
          TRANSACTION_STATUS_RESPONSE.ADMIN_CONFIRMATION,
        ]).includes(payload.status)) {
          return response.data;
        }
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetDetailEPrescription = createAsyncThunk(
    'resolve/ePrescription/detail',
    async (payload: {id: number}, {rejectWithValue}) => {
      try {
        const response = await getDetailEPrescription(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePutConfirmEPrescription = createAsyncThunk(
    'resolve/ePrescription/confirm',
    async (payload: {
    id: any,
    data: any,
  }, {rejectWithValue}) => {
      const response = await putConfirmEPrescription(payload.id, payload.data);
      try {
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePatchHowToUseEPrescription = createAsyncThunk(
    'resolve/ePrescription/howToUse',
    async (payload: {
  id: any,
  data: any,
}, {rejectWithValue}) => {
      const response = await patchHowToUseEPrescription(payload.id, payload.data);
      try {
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveCancelOrderEPresription = createAsyncThunk(
    'resolve/ePrescription/cancelOrder',
    async (payload: any, {rejectWithValue}) => {
      try {
        const response = await postCancelOrderEPresription(payload);
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        rejectWithValue(error);
      }
    },
);

export const resolveGetListDrugs = createAsyncThunk(
    'resolve/ePrescription/getListDrug',
    async (payload: any, {rejectWithValue}) => {
      try {
        const response = await getListDrugs(payload);
        if (response.status === 200) {
          return response;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        rejectWithValue(error);
      }
    },
);

export const resolveClaimPrescription = createAsyncThunk(
    'resolve/prescription/claim',
    async (params: any, {rejectWithValue}) => {
      const response = await putClaimPrescription(params);
      try {
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolvePostRegisterJID = createAsyncThunk(
    'resolve/prescription/chat/register',
    async (payload: any, {rejectWithValue}) => {
      const response = await postRegisterJID(payload);
      try {
        if (response.status === 201) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetJID = createAsyncThunk(
    'resolve/prescription/chat/get',
    async (payload, {rejectWithValue}) => {
      const response = await getJID();
      try {
        if (response.status === 200) {
          return response?.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveGetStockDrug = createAsyncThunk(
    'resolve/ePrescription/getStockDrug',
    async (payload: any, {rejectWithValue}) => {
      try {
        const response = await getStockDrug(payload);
        if (response.status === 200) {
          return response;
        }
        return rejectWithValue(response.error);
      } catch (error) {
        rejectWithValue(error);
      }
    },
);

export const resolvePostDataCopyRecipe = createAsyncThunk(
    'resolve/copy-recipe/create',
    async (payload: {
    id: string,
    data: any
  }, {rejectWithValue}) => {
      try {
        const response = await postDataCopyRecipe(payload.id, payload.data);
        if (response.status === 201 || response.status === 200) {
          return response.data;
        }
        return rejectWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
);

export const resolveDownloadFileCopyRecipe = createAsyncThunk(
    'resolve/copy-recipe/download',
    async (payload: {
    id: string | number,
  }, {rejectWithValue}) => {
      const response = await getDownloadFileCopyRecipe(payload.id);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    },
);

const ePrescriptionSlice = createSlice({
  name: 'ePrescription',
  initialState,
  extraReducers: (builder) => {
    // Get List E-Prescription
    builder.addCase(resolveGetListEPrescription.pending, (state) => {
      state.ePrescriptions.isError = false;
      state.ePrescriptions.isLoading = true;
    });
    builder.addCase(resolveGetListEPrescription.fulfilled, (state, {payload}) => {
      const data = Array.isArray(payload?.data) && payload?.data.sort((a, b) => b.updated_at - a.updated_at) || [];
      state.ePrescriptions.isError = false;
      state.ePrescriptions.isLoading = false;
      state.ePrescriptions.data = data;
      state.ePrescription = initialState.ePrescription;
      state.chat = initialState.chat;

      // E-Prescription Metadata
      state.ePrescriptions.metadata.page = payload?.metadata?.page || 1;
      state.ePrescriptions.metadata.perPage = payload?.metadata?.per_page || 10;
      state.ePrescriptions.metadata.totalRow = payload?.metadata?.total_row || 0;
      state.ePrescriptions.metadata.totalPage = payload?.metadata?.total_page || 1;
    });
    builder.addCase(resolveGetListEPrescription.rejected, (state) => {
      state.ePrescriptions.isError = true;
      state.ePrescriptions.isLoading = false;
      state.ePrescriptions.errorMessage = 'Something wrong!';
    });

    // Get Detail E-Prescription
    builder.addCase(resolveGetDetailEPrescription.pending, (state) => {
      state.ePrescription.isError = false;
      state.ePrescription.isSuccess = false;
      state.ePrescription.data = initialState.ePrescription.data;
      state.ePrescription.isLoading = true;
    });

    builder.addCase(resolveGetDetailEPrescription.fulfilled, (state, {payload}) => {
      state.ePrescription.isLoading = false;
      state.ePrescription.isError = false;
      state.ePrescription.data = payload?.data;
      state.ePrescription.dataChat = payload?.data;
      state.chat.auth.to = payload?.data?.user?.user_id + domain + '/user';
      state.chat.auth.username = userInfo.provider_id + userInfo.outlet_id + domain;
      state.ePrescription.isSuccess = true;
      state.ePrescription.claim.isSuccess = false;
      state.confirmReceiptOrder.isSuccess = false;
      state.chat.data = payload?.data;
    });

    builder.addCase(resolveGetDetailEPrescription.rejected, (state) => {
      state.ePrescription.isLoading = false;
      state.ePrescription.isError = true;
      state.ePrescription.isSuccess = false;
      state.ePrescription.errorMessage = 'Something wrong!';
      state.ePrescription.claim.isSuccess = false;
      state.ePrescription.data = initialState.ePrescription.data;
    });
    // End Get Detail E-Prescription

    // Put confirm E-Prescription
    builder.addCase(resolvePutConfirmEPrescription.pending, (state) => {
      state.confirmReceiptOrder.isError = false;
      state.confirmReceiptOrder.isLoading = true;
      state.confirmReceiptOrder.isSuccess = false;
    });

    builder.addCase(resolvePutConfirmEPrescription.fulfilled, (state, {payload}) => {
      state.confirmReceiptOrder.isError = false;
      state.confirmReceiptOrder.isLoading = false;
      state.confirmReceiptOrder.isSuccess = true;
      state.confirmReceiptOrder.modalConfirmation = false;
    });

    builder.addCase(resolvePutConfirmEPrescription.rejected, (state, {payload}: any) => {
      state.confirmReceiptOrder.isError = true;
      state.confirmReceiptOrder.isLoading = false;
      state.confirmReceiptOrder.isSuccess = false;
      state.confirmReceiptOrder.modalConfirmation = false;
      state.confirmReceiptOrder.errorMessage = payload?.message || MESSAGE.ALREADY_CONFIRMED;
    });

    // Patch how to use E-Prescription
    builder.addCase(resolvePatchHowToUseEPrescription.pending, (state) => {
      state.howToUseDrug.isError = false;
      state.howToUseDrug.isLoading = true;
      state.howToUseDrug.isSuccess = false;
    });

    builder.addCase(resolvePatchHowToUseEPrescription.fulfilled, (state) => {
      state.howToUseDrug.isError = false;
      state.howToUseDrug.isLoading = false;
      state.howToUseDrug.isSuccess = true;
    });

    builder.addCase(resolvePatchHowToUseEPrescription.rejected, (state, {payload}: any) => {
      state.howToUseDrug.isError = true;
      state.howToUseDrug.isLoading = false;
      state.howToUseDrug.isSuccess = false;
      state.confirmReceiptOrder.isError = true;
      state.completeStatusModal.isOpen = false;
      state.confirmReceiptOrder.errorMessage = payload?.message || MESSAGE.ALREADY_CONFIRMED;
    });

    // Cancel Order E-Prescription
    builder.addCase(resolveCancelOrderEPresription.pending, (state) => {
      state.ePrescription.isError = false;
      state.ePrescription.isLoading = true;
    });

    builder.addCase(resolveCancelOrderEPresription.fulfilled, (state, {payload}) => {
      state.ePrescription.isError = false;
      state.ePrescription.isLoading = false;
      state.ePrescription.cancelOrder.isSuccess = true;
    });

    builder.addCase(resolveCancelOrderEPresription.rejected, (state) => {
      state.ePrescription.isError = true;
      state.ePrescription.isLoading = false;
      state.ePrescription.errorMessage = 'Something wrong!';
      state.ePrescription.cancelOrder.isError = true;
    });

    // Get list drug
    builder.addCase(resolveGetListDrugs.pending, (state) => {
      state.listDrugs.isLoading = true;
      state.listDrugs.isError = false;
    });
    builder.addCase(resolveGetListDrugs.fulfilled, (state, {payload}) => {
      state.listDrugs.isLoading = false;
      state.listDrugs.isError = false;
      state.listDrugs.isSuccess = true;
      state.listDrugs.data = payload.data;
    });
    builder.addCase(resolveGetListDrugs.rejected, (state) => {
      state.listDrugs.isError = true;
      state.listDrugs.isLoading = false;
      state.listDrugs.isSuccess = false;
    });

    // claim prescription
    builder.addCase(resolveClaimPrescription.pending, (state) => {
      state.ePrescription.claim.isError = false;
      state.ePrescription.claim.isLoading = true;
      state.ePrescription.claim.isSuccess = false;
    });
    builder.addCase(resolveClaimPrescription.fulfilled, (state, {payload}) => {
      state.ePrescription.claim.isError = false;
      state.ePrescription.claim.isLoading = false;
      state.ePrescription.claim.isSuccess = true;
    });
    builder.addCase(resolveClaimPrescription.rejected, (state) => {
      state.ePrescription.claim.isError = true;
      state.ePrescription.claim.isLoading = false;
      state.ePrescription.claim.isSuccess = false;
      state.ePrescription.claim.errorMessage = 'Something wrong!';
    });

    // register chat
    builder.addCase(resolvePostRegisterJID.pending, (state) => {
      state.ePrescription.isError = false;
      state.ePrescription.isLoading = true;
      state.chat.isSuccess = false;
    });
    builder.addCase(resolvePostRegisterJID.fulfilled, (state, {payload}) => {
      state.ePrescription.isError = false;
      state.ePrescription.isLoading = false;
      state.chat.auth = payload.data;
      state.chat.isSuccess = false;
    });
    builder.addCase(resolvePostRegisterJID.rejected, (state) => {
      state.ePrescription.isError = true;
      state.ePrescription.isLoading = false;
      state.chat.isSuccess = false;
      state.ePrescription.errorMessage = 'Something wrong!';
    });

    // get jid
    builder.addCase(resolveGetJID.pending, (state) => {
      state.chat.isError = false;
      state.chat.isLoading = true;
      state.chat.isSuccess = false;
    });
    builder.addCase(resolveGetJID.fulfilled, (state, {payload}) => {
      const isRegistered = payload.some((id: string) => id === state.chat.auth.username);
      state.chat.isError = false;
      state.chat.isLoading = false;
      state.chat.isSuccess = true;
      state.chat.isRegistered = isRegistered;
    });
    builder.addCase(resolveGetJID.rejected, (state) => {
      state.chat.isError = true;
      state.chat.isLoading = false;
      state.chat.errorMessage = 'Something wrong!';
      state.chat.isSuccess = false;
    });

    // get stock drug
    builder.addCase(resolveGetStockDrug.pending, (state) => {
      state.formModalCreateRecipeDrug.isLoading = true;
      state.formModalCreateRecipeDrug.isError = false;
    });
    builder.addCase(resolveGetStockDrug.fulfilled, (state, {payload}) => {
      state.formModalCreateRecipeDrug.isLoading = false;
      state.formModalCreateRecipeDrug.isError = false;
      state.formModalCreateRecipeDrug.isSuccess = true;
      state.formModalCreateRecipeDrug.form.stock = payload.data.stock;
      state.formModalCreateRecipeDrug.form.dosage = payload.data.item.dosage;
      state.formModalCreateRecipeDrug.form.item = payload.data.item.unit;
    });
    builder.addCase(resolveGetStockDrug.rejected, (state) => {
      state.formModalCreateRecipeDrug.isError = true;
      state.formModalCreateRecipeDrug.isLoading = false;
      state.formModalCreateRecipeDrug.isSuccess = false;
    });

    // Post data copy recipe
    builder.addCase(resolvePostDataCopyRecipe.pending, (state) => {
      state.formCopyRecipe.isLoading = true;
      state.formCopyRecipe.isError = false;
    });
    builder.addCase(resolvePostDataCopyRecipe.fulfilled, (state, {payload}) => {
      state.formCopyRecipe.isLoading = false;
      state.formCopyRecipe.isError = false;
      state.formCopyRecipe.isSuccess = true;
    });
    builder.addCase(resolvePostDataCopyRecipe.rejected, (state, {payload}: any) => {
      state.formCopyRecipe.isLoading = false;
      state.formCopyRecipe.isError = true;
      state.formCopyRecipe.isSuccess = false;
      state.formCopyRecipe.errorMessage = payload?.message || 'Gagal menambahkan copy resep!';
    });

    // Get Download File Copy Recipe
    builder.addCase(resolveDownloadFileCopyRecipe.pending, (state) => {
      state.downloadCopyRecipe.isLoading = true;
      state.downloadCopyRecipe.isError = false;
      state.downloadCopyRecipe.isSuccess = false;
    });
    builder.addCase(resolveDownloadFileCopyRecipe.fulfilled, (state, {payload}) => {
      state.downloadCopyRecipe.isLoading = false;
      state.downloadCopyRecipe.isError = false;
      state.downloadCopyRecipe.isSuccess = true;
      state.downloadCopyRecipe.data = payload;
    });
    builder.addCase(resolveDownloadFileCopyRecipe.rejected, (state, {payload}) => {
      state.downloadCopyRecipe.isLoading = false;
      state.downloadCopyRecipe.isError = true;
      state.downloadCopyRecipe.isSuccess = false;
    });
  },
  reducers: {
    setParams: (state, {payload}) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, {payload}) => {
      state[payload.state][payload.field] = payload.value;
    },
    setForm: (state, {payload}) => {
      state[payload.state].form[payload.field] = payload.value;
    },
    setFormModalCreateRecipeDrug: (state, {payload}) => {
      state.formModalCreateRecipeDrug.form = payload;
    },
    setFormModalAddConcoctionDrug: (state, {payload}) => {
      state.formModalAddConcoctionDrug.form[payload.name] = payload.value;
    },
    setFormTotalRecipeModalConcoctionDrug: (state, {payload}) => {
      state.formModalAddConcoctionDrug.form.items[payload.index][payload.name] = payload.value;
    },
    setCardOrder: (state, {payload}) => {
      state.cardOrder[payload.name] = payload.value;
    },
    setDrugs: (state, {payload}) => {
      state.listDrugs[payload.name] = payload.value;
    },
    setCardApproval: (state, {payload}) => {
      state.cardApproval[payload.name] = payload.value;
    },
    setItemEPrescription: (state, {payload}) => {
      state.itemEPrescriptions.data = payload;
    },
    resetStateEPrescription: () => initialState,
    setFormRejectOrder: (state, {payload}) => {
      state.formRejectOrder.form.selectedReason = payload.selectedReason;
      state.formRejectOrder.form.notes = payload.notes;
      state.formRejectOrder.form.status = payload.status;
    },
    setResetFormRejectOrder: (state) => {
      state.formRejectOrder.form = initialState.formRejectOrder.form;
    },
    setFormEPrescription: (state, {payload}) => {
      payload.index !== -1 && payload.name ?
      payload.isConcoction ?
        state.ePrescription.form.item.forEach((item) => {
          if (item.items && item.items.find((child) => child.id === payload.id)) {
            item.items[payload.index][payload.name] = payload.value;
          }
        }) :
        state.ePrescription.form.item[payload.index][payload.name] = payload.value :
      state.ePrescription.form.item = payload.value;
    },
    setStateChat: (state, {payload}) => {
      state.chat[payload.name] = payload.value;
    },
    setPayloadConfirm: (state, {payload}) => {
      state.itemConfirm.items = payload.items;
      state.ePrescription.form.item = payload.items;
    },
    resetStateDrugs: (state) => {
      state.listDrugs = initialState.listDrugs;
    },
    setUsernameJID: (state, {payload}) => {
      state.chat.auth.username = payload;
    },
    setToJID: (state, {payload}) => {
      state.chat.auth.to = payload;
    },
    setDeleteFormModal: (state, {payload}) => {
      state.formModalAddConcoctionDrug.form.items?.splice(payload.value, 1);
    },
    setDeleteFormModalCreate: (state, {payload}) => {
      state.ePrescription.form.item.splice(payload, 1);
    },
    setIdEpress: (state, {payload}) => {
      state.ePrescription.id = payload;
    },
    setEditConcoction: (state, {payload}) => {
      state.ePrescription.form.item[payload.index] = payload.value;
    },
    resetFormModal: (state) => {
      state.formModalAddConcoctionDrug.form = initialState.formModalAddConcoctionDrug.form;
    },
    setModalCancelOrder: (state, {payload}) => {
      state.ePrescription.cancelOrder[payload.name] = payload.value;
    },
    setEpresscriptionList: (state, {payload}) => {
      state.ePrescription.form.item[payload.index][payload.name] = payload.value;
    },
    setPreviewMedia: (state, {payload}) => {
      state.previewMedia.isShow = payload.isShow;
    },
    resetCreateReceiptDrug: (state) => {
      state.formModalCreateRecipeDrug.form = initialState.formModalCreateRecipeDrug.form;
    },
    setFormCopyRecipe: (state, {payload}) => {
      state.formCopyRecipe.form[payload.name] = payload.value;
    },
    setFormMixtureDrug: (state, {payload}) => {
      state.formCopyRecipe.form.mixtureDrug[payload.index][payload.name] = payload.value;
    },
    setFormNonMixtureDrug: (state, {payload}) => {
      state.formCopyRecipe.form.nonMixtureDrug[payload.index][payload.name] = payload.value;
    },
    setAddFormMixtureDrug: (state, {payload}) => {
      state.formCopyRecipe.form.mixtureDrug.push(payload);
    },
    setAddFormNonMixtureDrug: (state, {payload}) => {
      state.formCopyRecipe.form.nonMixtureDrug.push(payload);
    },
    setClaimEprescription: (state, {payload}) => {
      state.ePrescription.claim[payload.name] = payload.value;
    },
    resetDownloadFileCopyRecipe: (state) => {
      state.downloadCopyRecipe = initialState.downloadCopyRecipe;
    },
  },
});

export const {
  setForm,
  setModal,
  setDrugs,
  setParams,
  setIdEpress,
  setStateChat,
  setCardOrder,
  resetFormModal,
  setCardApproval,
  setEditConcoction,
  setDeleteFormModal,
  setFormRejectOrder,
  setModalCancelOrder,
  setFormEPrescription,
  setItemEPrescription,
  setClaimEprescription,
  resetCreateReceiptDrug,
  setResetFormRejectOrder,
  resetStateEPrescription,
  setDeleteFormModalCreate,
  setFormModalCreateRecipeDrug,
  setFormModalAddConcoctionDrug,
  setFormTotalRecipeModalConcoctionDrug,
  setEpresscriptionList,
  setPayloadConfirm,
  resetStateDrugs,
  setUsernameJID,
  setToJID,
  setPreviewMedia,
  setFormCopyRecipe,
  setFormMixtureDrug,
  setFormNonMixtureDrug,
  setAddFormMixtureDrug,
  setAddFormNonMixtureDrug,
  resetDownloadFileCopyRecipe,
} = ePrescriptionSlice.actions;

export default ePrescriptionSlice.reducer;
