import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteDataTreatment,
  getDetailHealthFacility,
  getDetailProvider,
  getDetailTreatment,
  getDetailTreatmentElastic,
  getDownloadFileTreatment,
  getListHealthFacility,
  getListProvider,
  getListTreatment,
  getListTreatmentByOutletId,
  getListTreatmentElastic,
  getListTreatmentGroup,
  patchDataStatusTreatmentElastic,
  postDataTreatment,
  postDataTreatmentToClinic,
  postUploadFileTreatment,
  putDataTreatment,
} from '@/src/client/treatment';
import { getListVaccine } from '@/client/vaccine';
import getErrorMessage from '@/src/utils/getErrorMessage';

import type { ITreatmentState } from '@/src/types/MasterProduct/treatment';

const initialState: ITreatmentState = {
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
  treatment: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
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
    data: {
      polis: [],
    },
  },
  treatmentGroups: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  modalUpdateStatusTreatment: {
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  modalDownloadFileTreatment: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
  },
  modalUploadFileTreatment: {
    isOpen: false,
    isError: false,
    isLoading: false,
    isSuccess: false,
    provider: {},
    message: '',
  },
  formTreatment: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      information: {
        isSuccess: false,
        code: '',
        type: '',
        name: '',
        poli: {},
        price: 0,
        customerPrice: 0,
        provider: {},
        serviceGroup: {},
        healthFacility: {},
      },
      description: {
        isSuccess: false,
        detail: '',
        preparation: '',
      },
      criteria: {
        isSuccess: false,
        maxAge: '',
        minAge: '',
        maxParticipant: '',
        preOrderSetting: '',
        durationPerService: '',
        participantPerVial: '',
      },
      vaccine: [''],
    },
  },
  formTreatmentToClinic: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    form: {
      informationHealthFacility: {
        isSuccess: false,
        provider: {},
        healthFacility: {},
        treatmentIDs: [],
      },
    },
  },
  vaccines: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  params: {
    page: 1,
    offset: 0,
    limit: 10,
    search: '',
    status: true,
    type: 'treatment',
  },
};

export const resolveListTreatmentElastic = createAsyncThunk(
  'resolve/treatmentElastic/list',
  async (
    payload: {
      type: string;
      limit: string;
      offset: string;
      search: string;
      status: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListTreatmentElastic(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailTreatmentElastic = createAsyncThunk(
  'resolve/treatmentElastic/detail',
  async (payload: { id: any }, { rejectWithValue }) => {
    try {
      const response = await getDetailTreatmentElastic(payload?.id);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListTreatment = createAsyncThunk(
  'resolve/treatment/list',
  async (
    payload: {
      providerId: any;
      page: number;
      limit: number;
      search: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListTreatment(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveListTreatmentByOutletId = createAsyncThunk(
  'resolve/treatmentByOutletId/list',
  async (
    payload: {
      providerId: any;
      outletId: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListTreatmentByOutletId(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailTreatment = createAsyncThunk(
  'resolve/treatment/detail',
  async (
    payload: {
      providerId: string;
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getDetailTreatment(payload.providerId, payload.id);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
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
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDetailProvider = createAsyncThunk(
  'resolve/provider/detail',
  async (
    payload: {
      id: any;
    },
    { rejectWithValue }
  ) => {
    try {
      return await getDetailProvider(payload.id);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resolveListHealthFacility = createAsyncThunk(
  'resolve/healthFacility/list',
  async (
    payload: {
      providerId: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListHealthFacility(payload?.providerId);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resolveDetailHealthFacility = createAsyncThunk(
  'resolve/healthFacility/detail',
  async (
    payload: {
      providerId: string;
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getDetailHealthFacility(
        payload.providerId,
        payload.id
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

export const resolveListTreatmentGroup = createAsyncThunk(
  'resolve/treatmentGroup/list',
  async (
    payload: {
      search?: string;
      serviceType?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListTreatmentGroup(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resolveDownloadFileTreatment = createAsyncThunk(
  'resolve/treatment/download',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDownloadFileTreatment();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveUploadFileTreatment = createAsyncThunk(
  'resolve/treatment/upload',
  async (
    payload: {
      providerId: string;
      payload: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postUploadFileTreatment(
      payload.providerId,
      payload.payload
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePostDataTreatment = createAsyncThunk(
  'resolve/treatment/create',
  async (
    payload: {
      providerId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postDataTreatment(
        payload.providerId,
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

export const resolvePostDataTreatmentToClinic = createAsyncThunk(
  'resolve/treatment/createTreatmentToClinic',
  async (
    payload: {
      providerId: string;
      id: string | number;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postDataTreatmentToClinic(
        payload.providerId,
        payload.id,
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

export const resolvePutDataTreatment = createAsyncThunk(
  'resolve/treatment/update',
  async (
    payload: {
      providerId: any;
      id: any;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await putDataTreatment(
        payload.providerId,
        payload.id,
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

export const resolvePatchStatusTreatmentElastic = createAsyncThunk(
  'resolve/treatmentElastic/patch',
  async (
    payload: {
      id: string | number;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await patchDataStatusTreatmentElastic(
        payload.id,
        payload.data
      );
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDeleteTreatment = createAsyncThunk(
  'resolve/treatmentElastic/delete',
  async (
    payload: {
      providerId: any;
      itemId: any;
    },
    { rejectWithValue }
  ) => {
    const response = await deleteDataTreatment(
      payload.providerId,
      payload.itemId
    );
    if (!response.error) {
      return {
        data: response.data,
      };
    }
    return rejectWithValue(response.data);
  }
);

export const resolveListVaccine = createAsyncThunk(
  'resolve/vaccine/list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListVaccine({});
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const treatmentSlice = createSlice({
  name: 'treatment',
  initialState,
  extraReducers: (builder) => {
    // Get List Treatment Elastic
    builder.addCase(resolveListTreatmentElastic.pending, (state) => {
      state.treatments.isLoading = true;
      state.treatments.isError = false;
    });
    builder.addCase(
      resolveListTreatmentElastic.fulfilled,
      (state, { payload }) => {
        state.treatments.isLoading = false;
        state.treatments.isError = false;
        state.treatments.data = payload || [];
      }
    );
    builder.addCase(
      resolveListTreatmentElastic.rejected,
      (state, { payload }: any) => {
        state.treatments.isLoading = false;
        state.treatments.isError = true;
        state.treatments.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Layanan!';
      }
    );

    // Get Detail Treatment Elastic
    builder.addCase(resolveDetailTreatmentElastic.pending, (state) => {
      state.treatment.isLoading = true;
      state.treatment.isError = false;
    });
    builder.addCase(
      resolveDetailTreatmentElastic.fulfilled,
      (state, { payload }) => {
        state.treatment.isLoading = false;
        state.treatment.isError = false;
        state.treatment.data = payload;
      }
    );
    builder.addCase(
      resolveDetailTreatmentElastic.rejected,
      (state, { payload }: any) => {
        state.treatment.isLoading = false;
        state.treatment.isError = true;
        state.treatment.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Layanan!';
      }
    );

    // Get List Treatment
    builder.addCase(resolveListTreatment.pending, (state) => {
      state.treatments.isLoading = true;
      state.treatments.isError = false;
    });
    builder.addCase(resolveListTreatment.fulfilled, (state, { payload }) => {
      state.treatments.isLoading = false;
      state.treatments.isError = false;
      state.treatments.data = payload?.data || [];

      // Metadata List Treatment
      state.treatments.metadata.page = payload?.metadata?.page || 1;
      state.treatments.metadata.size = payload?.metadata?.size || 10;
      state.treatments.metadata.totalPage =
        Math.ceil(payload?.metadata?.total_data / state.params.limit) || 1;
      state.treatments.metadata.totalData = payload?.metadata?.total_data || 10;
    });
    builder.addCase(
      resolveListTreatment.rejected,
      (state, { payload }: any) => {
        state.treatments.data = [];
        state.treatments.isLoading = false;
        state.treatments.isError = true;
        state.treatments.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Layanan!';
      }
    );

    // Get List Treatment By Outlet Id
    builder.addCase(resolveListTreatmentByOutletId.pending, (state) => {
      state.treatments.isLoading = true;
      state.treatments.isError = false;
    });
    builder.addCase(
      resolveListTreatmentByOutletId.fulfilled,
      (state, { payload }) => {
        state.treatments.isLoading = false;
        state.treatments.isError = false;
        state.treatments.data = payload?.data || [];

        // Metadata List Treatment By Outlet Id
        state.treatments.metadata.page = payload?.metadata?.page || 1;
        state.treatments.metadata.size = payload?.metadata?.size || 10;
        state.treatments.metadata.totalPage =
          Math.ceil(payload?.metadata?.total_data / state.params.limit) || 1;
        state.treatments.metadata.totalData =
          payload?.metadata?.total_data || 10;
      }
    );
    builder.addCase(
      resolveListTreatmentByOutletId.rejected,
      (state, { payload }: any) => {
        state.treatments.data = [];
        state.treatments.isLoading = false;
        state.treatments.isError = true;
        state.treatments.errorMessage =
          getErrorMessage(payload?.message) ||
          'Gagal Mendapatkan Data Layanan!';
      }
    );

    // Get Detail Treatment
    builder.addCase(resolveDetailTreatment.pending, (state) => {
      state.treatment.isLoading = true;
      state.treatment.isError = false;
    });
    builder.addCase(resolveDetailTreatment.fulfilled, (state, { payload }) => {
      state.treatment.isLoading = false;
      state.treatment.isError = false;
      state.treatment.data = payload?.data;

      // Fill Data Form Treatment
      state.formTreatment.form = {
        ...state.formTreatment.form,
        information: {
          code: payload?.data?.code || '',
          isSuccess: true,
          type: payload?.data?.type || payload?.data?.configs?.type || '',
          provider: {
            id: payload?.data?.configs?.['provider']?.id,
            name: payload?.data?.configs?.['provider']?.name || '',
          },
          healthFacility: {
            channelId:
              payload?.data?.configs?.['health-facility']?.channelId || 0,
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
          price: payload?.data?.price || 0,
          customerPrice: payload?.data?.customerPrice || 0,
        },
        description: {
          isSuccess: true,
          detail: payload?.data?.description || '',
          preparation: payload?.data?.preparation || '',
        },
        criteria: {
          isSuccess: true,
          maxAge: payload?.data?.configs?.['max-age']?.value || '',
          minAge: payload?.data?.configs?.['min-age']?.value || '',
          durationPerService:
            payload?.data?.configs?.['slot-duration']?.value || '',
          maxParticipant:
            payload?.data?.configs?.['max-participant']?.value || '',
          preOrderSetting:
            payload?.data?.configs?.['setting_preorder']?.value || '',
          participantPerVial:
            payload?.data?.configs?.['number-participant-per-vial']?.value ||
            '',
        },
        vaccine: payload?.data?.additionalData?.vaccine || [],
      };
    });
    builder.addCase(
      resolveDetailTreatment.rejected,
      (state, { payload }: any) => {
        state.treatment.isLoading = false;
        state.treatment.isError = true;
        state.treatment.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Layanan!';
      }
    );

    // Get List Provider For Select
    builder.addCase(resolveListProvider.pending, (state) => {
      state.providers.isLoading = true;
      state.providers.isError = false;
    });
    builder.addCase(resolveListProvider.fulfilled, (state, { payload }) => {
      state.providers.isLoading = false;
      state.providers.isError = false;
      state.providers.data = payload?.data || [];
    });
    builder.addCase(resolveListProvider.rejected, (state, { payload }: any) => {
      state.providers.isLoading = false;
      state.providers.isError = true;
      state.providers.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data Provider!';
    });

    // Get Detail Provider
    builder.addCase(resolveDetailProvider.pending, (state) => {
      state.provider.isLoading = true;
      state.provider.isError = false;
    });
    builder.addCase(resolveDetailProvider.fulfilled, (state, { payload }) => {
      if (payload?.status === 'fulfilled') {
        state.provider.isLoading = false;
        state.provider.isError = false;
        state.provider.data = payload?.data || {};
      } else {
        state.provider.isLoading = false;
        state.provider.isError = true;
        state.provider.data = {};
      }
    });
    builder.addCase(
      resolveDetailProvider.rejected,
      (state, { payload }: any) => {
        state.provider.isLoading = false;
        state.provider.isError = true;
        state.provider.errorMessage =
          payload?.message || 'Gagal Mendapatkan Detail Provider!';
      }
    );

    // Get List Health Facility Elastic For Select
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
    builder.addCase(
      resolveListHealthFacility.rejected,
      (state, { payload }: any) => {
        state.healthFacilities.isLoading = false;
        state.healthFacilities.isError = true;
        state.healthFacilities.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Health Facility!';
      }
    );

    // Get Detail Health Facility (For Select Poly)
    builder.addCase(resolveDetailHealthFacility.pending, (state) => {
      state.healthFacility.isLoading = true;
      state.healthFacility.isError = false;
    });
    builder.addCase(
      resolveDetailHealthFacility.fulfilled,
      (state, { payload }) => {
        state.healthFacility.isLoading = false;
        state.healthFacility.isError = false;
        state.healthFacility.data.polis = payload?.data?.poly || [];
      }
    );
    builder.addCase(
      resolveDetailHealthFacility.rejected,
      (state, { payload }: any) => {
        state.healthFacility.isLoading = false;
        state.healthFacility.isError = true;
        state.healthFacility.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Poli!';
      }
    );

    // Get List Treatment Group For Select
    builder.addCase(resolveListTreatmentGroup.pending, (state) => {
      state.treatmentGroups.isLoading = true;
      state.treatmentGroups.isError = false;
    });
    builder.addCase(
      resolveListTreatmentGroup.fulfilled,
      (state, { payload }) => {
        state.treatmentGroups.isLoading = false;
        state.treatmentGroups.isError = false;
        state.treatmentGroups.data = payload?.data || [];
      }
    );
    builder.addCase(
      resolveListTreatmentGroup.rejected,
      (state, { payload }: any) => {
        state.treatmentGroups.isLoading = false;
        state.treatmentGroups.isError = true;
        state.treatmentGroups.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Treatment Group!';
      }
    );

    // Get Download File Treatment
    builder.addCase(resolveDownloadFileTreatment.pending, (state) => {
      state.modalDownloadFileTreatment.isLoading = true;
      state.modalDownloadFileTreatment.isError = false;
      state.modalDownloadFileTreatment.isSuccess = false;
    });
    builder.addCase(
      resolveDownloadFileTreatment.fulfilled,
      (state, { payload }) => {
        state.modalDownloadFileTreatment.isLoading = false;
        state.modalDownloadFileTreatment.isError = false;
        state.modalDownloadFileTreatment.isSuccess = true;
        state.modalDownloadFileTreatment.message = payload.message;
        state.modalDownloadFileTreatment.data = payload;
      }
    );
    builder.addCase(resolveDownloadFileTreatment.rejected, (state) => {
      state.modalDownloadFileTreatment.isLoading = false;
      state.modalDownloadFileTreatment.isError = true;
      state.modalDownloadFileTreatment.isSuccess = false;
    });

    // Post Upload File Pharmacy
    builder.addCase(resolveUploadFileTreatment.pending, (state) => {
      state.modalUploadFileTreatment.isLoading = true;
      state.modalUploadFileTreatment.isError = false;
      state.modalUploadFileTreatment.isSuccess = false;
    });
    builder.addCase(
      resolveUploadFileTreatment.fulfilled,
      (state, { payload }) => {
        state.modalUploadFileTreatment.isLoading = false;
        state.modalUploadFileTreatment.isError = false;
        state.modalUploadFileTreatment.isSuccess = true;
        state.modalUploadFileTreatment.message = JSON.stringify(payload);
      }
    );
    builder.addCase(resolveUploadFileTreatment.rejected, (state) => {
      state.modalUploadFileTreatment.isLoading = false;
      state.modalUploadFileTreatment.isError = true;
      state.modalUploadFileTreatment.isSuccess = false;
      state.modalUploadFileTreatment.message = 'Unggah file gagal';
    });

    // Post Data Treatment
    builder.addCase(resolvePostDataTreatment.pending, (state) => {
      state.formTreatment.isLoading = true;
      state.formTreatment.isError = false;
    });
    builder.addCase(
      resolvePostDataTreatment.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formTreatment.isLoading = false;
          state.formTreatment.isError = false;
          state.formTreatment.isSuccess = true;

          // Fill Data Form Treatment To Clinic
          state.formTreatmentToClinic.form.informationHealthFacility = {
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
            treatmentIDs: [payload?.data?.id],
          };
        } else {
          state.formTreatment.isLoading = false;
          state.formTreatment.isError = true;
          state.formTreatment.isError = true;
          state.formTreatment.errorMessage = 'Gagal Menambahkan Layanan!';
        }
      }
    );
    builder.addCase(
      resolvePostDataTreatment.rejected,
      (state, { payload }: any) => {
        state.formTreatment.isLoading = false;
        state.formTreatment.isError = true;
        state.formTreatment.isError = true;
        state.formTreatment.isSuccess = false;
        state.formTreatment.errorMessage =
          payload?.message || 'Gagal Menambahkan Layanan!';
      }
    );

    // Post Data Treatment To Clinic
    builder.addCase(resolvePostDataTreatmentToClinic.pending, (state) => {
      state.formTreatmentToClinic.isLoading = true;
      state.formTreatmentToClinic.isError = false;
    });
    builder.addCase(
      resolvePostDataTreatmentToClinic.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.formTreatmentToClinic.isLoading = false;
          state.formTreatmentToClinic.isError = false;
          state.formTreatmentToClinic.isSuccess = true;
        } else {
          state.formTreatmentToClinic.isLoading = false;
          state.formTreatmentToClinic.isError = true;
          state.formTreatmentToClinic.isError = true;
          state.formTreatmentToClinic.errorMessage =
            'Gagal Menambahkan Layanan!';
        }
      }
    );
    builder.addCase(
      resolvePostDataTreatmentToClinic.rejected,
      (state, { payload }: any) => {
        state.formTreatmentToClinic.isLoading = false;
        state.formTreatmentToClinic.isError = true;
        state.formTreatmentToClinic.isError = true;
        state.formTreatmentToClinic.isSuccess = false;
        state.formTreatment.errorMessage =
          payload?.message || 'Gagal Menambahkan Layanan!';
      }
    );

    // Put Data Treatment
    builder.addCase(resolvePutDataTreatment.pending, (state) => {
      state.formTreatment.isLoading = true;
      state.formTreatment.isError = false;
    });
    builder.addCase(resolvePutDataTreatment.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formTreatment.isLoading = false;
        state.formTreatment.isError = false;
        state.formTreatment.isSuccess = true;
      } else {
        state.formTreatment.isLoading = false;
        state.formTreatment.isError = true;
        state.formTreatment.isError = true;
        state.formTreatment.errorMessage =
          payload?.message || 'Gagal Mengupdate Data Treatment!';
      }
    });
    builder.addCase(
      resolvePutDataTreatment.rejected,
      (state, { payload }: any) => {
        state.formTreatment.isLoading = false;
        state.formTreatment.isError = true;
        state.formTreatment.isError = true;
        state.formTreatment.isSuccess = false;
        state.formTreatment.errorMessage =
          payload?.message || 'Gagal Mengupdate Data Treatment!';
      }
    );

    // Patch Update Status Treatment Elastic
    builder.addCase(resolvePatchStatusTreatmentElastic.pending, (state) => {
      state.modalUpdateStatusTreatment.isError = false;
      state.modalUpdateStatusTreatment.isLoading = true;
      state.modalUpdateStatusTreatment.isSuccess = false;
    });
    builder.addCase(resolvePatchStatusTreatmentElastic.fulfilled, (state) => {
      state.modalUpdateStatusTreatment.isLoading = false;
      state.modalUpdateStatusTreatment.isError = false;
      state.modalUpdateStatusTreatment.isSuccess = true;
      state.modalUpdateStatusTreatment.successMessage =
        'Berhasil mengupdate status layanan !';
    });
    builder.addCase(
      resolvePatchStatusTreatmentElastic.rejected,
      (state, { payload }: any) => {
        state.modalUpdateStatusTreatment.isError = true;
        state.modalUpdateStatusTreatment.isLoading = false;
        state.modalUpdateStatusTreatment.isSuccess = false;
        state.modalUpdateStatusTreatment.errorMessage =
          payload?.message || 'Gagal mengupdate status layanan !';
      }
    );

    // Delete Data Treatment
    builder.addCase(resolveDeleteTreatment.pending, (state) => {
      state.modalUpdateStatusTreatment.isLoading = true;
      state.modalUpdateStatusTreatment.isError = false;
    });
    builder.addCase(resolveDeleteTreatment.fulfilled, (state, { payload }) => {
      if (payload.data.message) {
        state.modalUpdateStatusTreatment.isLoading = false;
        state.modalUpdateStatusTreatment.isError = false;
        state.modalUpdateStatusTreatment.isSuccess = true;
        state.modalUpdateStatusTreatment.successMessage =
          'Berhasil menghapus layanan';
      } else {
        state.modalUpdateStatusTreatment.isLoading = false;
        state.modalUpdateStatusTreatment.isError = true;
        state.modalUpdateStatusTreatment.errorMessage =
          'Gagal menghapus layanan';
        state.modalUpdateStatusTreatment.isError = true;
      }
    });
    builder.addCase(
      resolveDeleteTreatment.rejected,
      (state, { payload }: any) => {
        state.modalUpdateStatusTreatment.isLoading = false;
        state.modalUpdateStatusTreatment.isError = true;
        state.modalUpdateStatusTreatment.errorMessage =
          payload?.message || 'Gagal menghapus layanan';
        state.modalUpdateStatusTreatment.isError = true;
      }
    );

    // Get List Vaccine For Select
    builder.addCase(resolveListVaccine.pending, (state) => {
      state.vaccines.isLoading = true;
      state.vaccines.isError = false;
    });
    builder.addCase(resolveListVaccine.fulfilled, (state, { payload }) => {
      state.vaccines.isLoading = false;
      state.vaccines.isError = false;
      state.vaccines.data = payload?.data || [];
    });
    builder.addCase(resolveListVaccine.rejected, (state, { payload }: any) => {
      state.vaccines.isLoading = false;
      state.vaccines.isError = true;
      state.vaccines.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data Vaksin!';
    });
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.field] = payload.value;
    },
    setFormInformation: (state, { payload }) => {
      state.formTreatment.form.information[payload.name] = payload.value;
    },
    setFormDescription: (state, { payload }) => {
      state.formTreatment.form.description[payload.name] = payload.value;
    },
    setFormCriteria: (state, { payload }) => {
      state.formTreatment.form.criteria[payload.name] = payload.value;
    },
    setFormVaccine: (state, { payload }) => {
      state.formTreatment.form.vaccine = payload.value;
    },
    setFlagModalUpdateStatusTreatment: (state, { payload }) => {
      state.modalUpdateStatusTreatment.flag = payload;
    },
    setModalUploadFileTreatment: (state, { payload }) => {
      state.modalUploadFileTreatment[payload.name] = payload.value;
    },
    resetFormTreatment: (state) => {
      state.formTreatment = initialState.formTreatment;
    },
    resetModalDownloadFileTreatment: (state) => {
      state.modalDownloadFileTreatment =
        initialState.modalDownloadFileTreatment;
    },
    resetModalUploadFileTreatment: (state) => {
      state.modalUploadFileTreatment = initialState.modalUploadFileTreatment;
    },
    resetStateTreatment: () => initialState,
  },
});

export const {
  setModal,
  setParams,
  setFormCriteria,
  setFormDescription,
  setFormInformation,
  setFormVaccine,
  resetFormTreatment,
  resetStateTreatment,
  setModalUploadFileTreatment,
  resetModalUploadFileTreatment,
  resetModalDownloadFileTreatment,
  setFlagModalUpdateStatusTreatment,
} = treatmentSlice.actions;

export default treatmentSlice.reducer;
