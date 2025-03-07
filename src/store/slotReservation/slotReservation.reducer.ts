import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getDetailHealthFacility,
  getDetailSlot,
  getDownloadFileSlot,
  getListHealthFacility,
  getListProvider,
  getListSlot,
  patchDataSlot,
  postDataSlot,
  postUploadFileSlot,
} from '@/src/client/slotReservation';

const initialState = {
  slots: {
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
  slot: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
  healthFacilities: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  healthFacility: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    listPoly: [],
    listDoctor: [],
    listTreatment: [],
  },
  providers: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
  },
  modalDownloadFileSlot: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
  },
  modalUploadFileSlot: {
    isOpen: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    provider: 0,
  },
  formAdditionalData: {
    vaccine: {},
    batch: [
      {
        lotNumber: '',
        expirationDate: '',
      },
    ],
  },
  formAdditionalDataBatch: {
    lotNumber: '',
    expirationDate: '',
  },
  formModalSlot: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      providerId: '',
      healthFacility: {},
      poly: {},
      doctor: {},
      treatment: {},
      additionalData: [],
      date: '',
      startTime: '',
      endTime: '',
      maxReservation: '',
    },
  },
  params: {
    search: '',
    status: true,
    poli: '',
    faskes: '',
    providerId: '',
    page: 1,
    size: 10,
  },
};

export const resolveListSlot = createAsyncThunk(
  'resolve/slot/list',
  async (
    payload: {
      providerId: string;
      params: {
        search: string;
        page: number;
        size: number;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListSlot(payload.providerId, payload.params);

      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailSlot = createAsyncThunk(
  'resolve/slot/detail',
  async (
    payload: {
      providerId: string | number;
      slotId: string | number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getDetailSlot(payload.providerId, payload.slotId);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListHealthFacility = createAsyncThunk(
  'resolve/healthFacility/list',
  async (
    payload: {
      providerId: string;
      search?: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getListHealthFacility(
      payload.providerId,
      payload.search
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveDetailHealthFacility = createAsyncThunk(
  'resolve/healthFacility/detail',
  async (
    payload: {
      providerId: string;
      clinicId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailHealthFacility(
      payload.providerId,
      payload.clinicId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveListProvider = createAsyncThunk(
  'resolve/provider/list',
  async (any, { rejectWithValue }) => {
    try {
      const response = await getListProvider();

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDownloadFileSlot = createAsyncThunk(
  'resolve/slot/download',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDownloadFileSlot();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveUploadFileSlot = createAsyncThunk(
  'resolve/slot/upload',
  async (
    payload: {
      providerId: string;
      payload: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postUploadFileSlot(
      payload.providerId,
      payload.payload
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePostSlot = createAsyncThunk(
  'resolve/slot/post',
  async (
    payload: {
      providerId: string;
      payload: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postDataSlot(payload.providerId, payload.payload);
      if (!response.error) {
        return response.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePatchSlot = createAsyncThunk(
  'resolve/slot/patch',
  async (
    payload: {
      providerId: string;
      slotId: string;
      payload: any;
    },
    { rejectWithValue }
  ) => {
    const response = await patchDataSlot(
      payload.providerId,
      payload.slotId,
      payload.payload
    );
    if (!response.error) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

const mapAdditionalData = (data) => {
  let listVaccine: any[] = [];
  data.forEach((item) => {
    const index = listVaccine.findIndex(
      (data: any) => data.vaccine.kfa.display === item.vaccine.kfa.display
    );
    if (index === -1) {
      listVaccine.push({
        vaccine: item.vaccine,
        batch: [
          {
            lotNumber: item.lotNumber,
            expirationDate: new Date(item.expirationDate.slice(0, -1)),
          },
        ],
      });
    } else {
      listVaccine[index].batch.push({
        lotNumber: item.lotNumber,
        expirationDate: new Date(item.expirationDate.slice(0, -1)),
      });
    }
  });
  return listVaccine;
};

const slotReservationSlice = createSlice({
  name: 'slotReservation',
  initialState,
  extraReducers: (builder) => {
    // Get List Slot
    builder.addCase(resolveListSlot.pending, (state) => {
      state.slots.isLoading = true;
      state.slots.isError = false;
    });
    builder.addCase(resolveListSlot.fulfilled, (state, { payload }) => {
      state.slots.isLoading = false;
      state.slots.isError = false;
      state.slots.data = payload?.data || [];

      // Metadata List Slot
      state.slots.metadata.page = payload?.metadata?.page || 1;
      state.slots.metadata.size = payload?.metadata?.per_page || 10;
      state.slots.metadata.totalPage = payload?.metadata?.total_page || 1;
      state.slots.metadata.totalData = payload?.metadata?.total_data || 0;
    });
    builder.addCase(resolveListSlot.rejected, (state) => {
      state.slots.isLoading = false;
      state.slots.isError = true;
      state.slots.errorMessage = 'Something wrong!';
    });

    // Get Detail Slot
    builder.addCase(resolveDetailSlot.pending, (state) => {
      state.slot.isLoading = true;
      state.slot.isError = false;
    });
    builder.addCase(resolveDetailSlot.fulfilled, (state, { payload }) => {
      state.slot.isLoading = false;
      state.slot.isError = false;
      state.slot.data = payload?.data;
      state.formModalSlot.form = {
        healthFacility: {
          name: payload?.data?.clinic?.name,
          id: payload?.data?.clinic?.id,
        },
        poly: {
          name: payload?.data?.poly?.name,
          id: payload?.data?.clinic?.id,
        },
        doctor: {
          name: payload?.data?.doctor?.nama,
          id: payload?.data?.doctor?.id,
        },
        treatment: {
          name: payload?.data?.treatment?.name,
          id: payload?.data?.treatment?.id,
          type: payload?.data?.treatment?.type,
          additionalData: payload?.data?.treatment?.additionalData?.vaccine,
        },
        maxReservation: payload?.data?.maxCount,
        date: new Date(
          new Date(payload?.data?.endTime.slice(0, -1)).setHours(0, 0, 0)
        ),
        startTime: new Date(payload?.data?.startTime.slice(0, -1)),
        endTime: new Date(payload?.data?.endTime.slice(0, -1)),
        additionalData: payload?.data?.additionalData
          ? mapAdditionalData(payload?.data?.additionalData)
          : null,
      };
    });
    builder.addCase(resolveDetailSlot.rejected, (state) => {
      state.slot.isLoading = false;
      state.slot.isError = true;
      state.slot.errorMessage = 'Something wrong!';
    });

    // Get List health Facility
    builder.addCase(resolveListHealthFacility.pending, (state) => {
      state.healthFacilities.isLoading = true;
      state.healthFacilities.isError = false;
    });
    builder.addCase(
      resolveListHealthFacility.fulfilled,
      (state, { payload }) => {
        state.healthFacilities.isLoading = false;
        state.healthFacilities.isError = false;
        state.healthFacilities.data = payload?.data || [];
      }
    );
    builder.addCase(resolveListHealthFacility.rejected, (state) => {
      state.healthFacilities.isLoading = false;
      state.healthFacilities.isError = true;
      state.healthFacilities.errorMessage = 'Something wrong!';
    });

    // Get Detail Health Facility
    builder.addCase(resolveDetailHealthFacility.pending, (state) => {
      state.healthFacility.isLoading = true;
      state.healthFacility.isError = false;
    });
    builder.addCase(
      resolveDetailHealthFacility.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.healthFacility.listPoly = payload?.data?.poly || [];
          state.healthFacility.listDoctor = payload?.data?.doctors || [];
          state.healthFacility.listTreatment = payload?.data?.treatments || [];
        } else {
          state.healthFacility.isLoading = false;
          state.healthFacility.isError = true;
          state.healthFacility.errorMessage = 'Something wrong!';
        }
      }
    );
    builder.addCase(resolveDetailHealthFacility.rejected, (state) => {
      state.healthFacility.isLoading = false;
      state.healthFacility.isError = true;
    });

    // Get List Provider
    builder.addCase(resolveListProvider.pending, (state) => {
      state.providers.isLoading = true;
      state.providers.isError = false;
      state.providers.isSuccess = false;
    });
    builder.addCase(resolveListProvider.fulfilled, (state, { payload }) => {
      state.providers.isLoading = false;
      state.providers.isError = false;
      state.providers.isSuccess = true;
      state.providers.data = payload?.data || [];
    });
    builder.addCase(resolveListProvider.rejected, (state) => {
      state.providers.isLoading = false;
      state.providers.isError = true;
      state.providers.isSuccess = false;
      state.providers.errorMessage = 'Something wrong!';
    });

    // Post Data Slot Reservation
    builder.addCase(resolvePostSlot.pending, (state) => {
      state.formModalSlot.isLoading = true;
      state.formModalSlot.isError = false;
    });
    builder.addCase(resolvePostSlot.fulfilled, (state) => {
      state.formModalSlot.isLoading = false;
      state.formModalSlot.isSuccess = true;
      state.formModalSlot.successMessage = 'Berhasil menambahkan slot';
    });
    builder.addCase(resolvePostSlot.rejected, (state, { payload }: any) => {
      state.formModalSlot.isLoading = false;
      state.formModalSlot.isError = true;
      state.formModalSlot.errorMessage = payload || 'Gagal menambahkan slot';
    });

    // Patch Data Slot Reservation
    builder.addCase(resolvePatchSlot.pending, (state) => {
      state.formModalSlot.isLoading = true;
      state.formModalSlot.isError = false;
    });
    builder.addCase(resolvePatchSlot.fulfilled, (state) => {
      state.formModalSlot.isLoading = false;
      state.formModalSlot.isSuccess = true;
      state.formModalSlot.successMessage = 'Berhasil mengupdate slot';
    });
    builder.addCase(resolvePatchSlot.rejected, (state) => {
      state.formModalSlot.isLoading = false;
      state.formModalSlot.isError = true;
      state.formModalSlot.errorMessage = 'Gagal mengupdate slot';
    });

    // Get Upload Slot Reservation
    builder.addCase(resolveUploadFileSlot.pending, (state) => {
      state.modalUploadFileSlot.isLoading = true;
      state.modalUploadFileSlot.isError = false;
      state.modalUploadFileSlot.isSuccess = false;
    });
    builder.addCase(resolveUploadFileSlot.fulfilled, (state) => {
      state.modalUploadFileSlot.isLoading = false;
      state.modalUploadFileSlot.isError = false;
      state.modalUploadFileSlot.isSuccess = true;
      state.modalUploadFileSlot.message = ''; // JSON.stringify(payload);
    });
    builder.addCase(resolveUploadFileSlot.rejected, (state) => {
      state.modalUploadFileSlot.isLoading = false;
      state.modalUploadFileSlot.isError = true;
      state.modalUploadFileSlot.isSuccess = false;
      state.modalUploadFileSlot.message = 'Unggah file gagal';
    });

    // Get Download Slot Reservation
    builder.addCase(resolveDownloadFileSlot.pending, (state) => {
      state.modalDownloadFileSlot.isLoading = true;
      state.modalDownloadFileSlot.isError = false;
      state.modalDownloadFileSlot.isSuccess = false;
    });
    builder.addCase(resolveDownloadFileSlot.fulfilled, (state, { payload }) => {
      state.modalDownloadFileSlot.isLoading = false;
      state.modalDownloadFileSlot.isError = false;
      state.modalDownloadFileSlot.isSuccess = true;
      state.modalDownloadFileSlot.message = payload.message;
      state.modalDownloadFileSlot.data = payload;
    });
    builder.addCase(resolveDownloadFileSlot.rejected, (state) => {
      state.modalDownloadFileSlot.isLoading = false;
      state.modalDownloadFileSlot.isError = true;
      state.modalDownloadFileSlot.isSuccess = false;
    });
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.field] = payload.value;
    },
    setForm: (state, { payload }) => {
      state.formModalSlot.form[payload.name] = payload.value;
    },
    setProviderUploadSlot: (state, { payload }) => {
      state.modalUploadFileSlot.provider = payload.value;
    },
    setAddAdditionalDataForm: (state: any, { payload }) => {
      state.formModalSlot.form.additionalData.push(payload);
    },
    setAdditionalDataItem: (state, { payload }) => {
      state.formModalSlot.form.additionalData[payload.index][payload.label] =
        payload.value;
    },
    setRemoveAdditionalDataForm: (state, { payload }) => {
      state.formModalSlot.form.additionalData.splice(payload, 1);
    },
    setAddAdditionalDataBatchForm: (state: any, { payload }) => {
      state.formModalSlot.form.additionalData[payload.indexData].batch.push(
        payload.data
      );
    },
    setAdditionalDataBatchItem: (state, { payload }) => {
      state.formModalSlot.form.additionalData[payload.indexData].batch[
        payload.indexBatch
      ][payload.label] = payload.value;
    },
    setRemoveAdditionalDataBatchForm: (state, { payload }) => {
      state.formModalSlot.form.additionalData[payload.indexData].batch.splice(
        payload.indexBatch,
        1
      );
    },
    resetFormModalSlot: (state) => {
      state.formModalSlot = initialState.formModalSlot;
    },
    resetModalDownloadFileSlot: (state) => {
      state.modalDownloadFileSlot = initialState.modalDownloadFileSlot;
    },
    resetModalUploadFileSlot: (state) => {
      state.modalUploadFileSlot = initialState.modalUploadFileSlot;
    },
    resetStateSlotReservation: () => initialState,
  },
});

export const {
  setForm,
  setModal,
  setParams,
  setProviderUploadSlot,
  setAddAdditionalDataForm,
  setAdditionalDataItem,
  setRemoveAdditionalDataForm,
  setAddAdditionalDataBatchForm,
  setAdditionalDataBatchItem,
  setRemoveAdditionalDataBatchForm,
  resetFormModalSlot,
  resetModalUploadFileSlot,
  resetStateSlotReservation,
  resetModalDownloadFileSlot,
} = slotReservationSlice.actions;

export default slotReservationSlice.reducer;
