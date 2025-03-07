import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteDataDoctor,
  getDetailDoctor,
  getDetailDoctorElastic,
  getDownloadFileDoctor,
  getListDoctor,
  getListDoctorByOutletId,
  getListDoctorElastic,
  getListProvider,
  getListSpecialist,
  patchUpdateStatusDoctor,
  postDataDoctor,
  postUploadFileDoctor,
  putDataDoctor,
} from '@/src/client/doctors';

import type {
  IDoctorState,
  IGetListDoctorElasticParams,
  IGetListDoctorParams,
  IPostDoctorData,
} from '@/src/types/MasterProvider/doctors/doctors';

const initialState: IDoctorState = {
  doctors: {
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
  doctor: {
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
  specialists: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
  },
  tabFormDoctor: {
    information: false,
    documents: false,
    schedule: false,
  },
  formDoctor: {
    isLoading: false,
    isPutLoading: false,
    isError: false,
    isModalSuccessOpen: false,
    isModalErrorOpen: false,
    errorMessage: '',
    tabInformation: {
      provider: '',
      fullName: '',
      noStr: '',
      experience: 0,
      experienceUnit: '',
      strRegistrationDate: '',
      birthPlace: '',
      birthDay: '',
      gender: '',
      phoneNumber: '',
      email: '',
      specialist: '',
      languages: [],
      biografi: '',
      practitionerType: '',
    },
    tabDocument: {
      photo: '',
      photoStr: '',
      photoSip: '',
      photoSignature: '',
    },
  },
  modalUpdateStatusDoctor: {
    flag: '',
    isConfirmation: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  modalDownloadFileDoctor: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    data: '',
  },
  modalUploadFileDoctor: {
    isOpen: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    provider: {},
    message: '',
  },
  params: {
    page: 1,
    limit: 10,
    search: '',
    offset: 0,
    status: false,
    type: 'doctor',
  },
};

export const resolveGetListDoctor = createAsyncThunk(
  'resolve/doctor/list',
  async (payload: IGetListDoctorParams, { rejectWithValue }) => {
    try {
      const response = await getListDoctor(payload);
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetDetailDoctor = createAsyncThunk(
  'resolve/doctor/detail',
  async (
    payload: {
      channelId: any;
      itemId: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getDetailDoctor(payload.channelId, payload.itemId);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetListDoctorElastic = createAsyncThunk(
  'resolve/doctorElastic/list',
  async (payload: IGetListDoctorElasticParams, { rejectWithValue }) => {
    try {
      const response = await getListDoctorElastic(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetDetailDoctorElastic = createAsyncThunk(
  'resolve/doctorElastic/detail',
  async (
    payload: {
      id?: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailDoctorElastic(payload.id);
    if (response.error !== null) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListDoctorByOutletId = createAsyncThunk(
  'resolve/doctorByOutletId/list',
  async (
    payload: {
      channelId: any;
      outletId: any;
    },
    { rejectWithValue }
  ) => {
    const response = await getListDoctorByOutletId(
      payload.channelId,
      payload.outletId
    );
    try {
      if (response.status === 200) {
        return response?.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetDetailDoctorById = createAsyncThunk(
  'resolve/doctorById/detail',
  async (
    payload: {
      channelId: any;
      itemId: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getDetailDoctor(payload.channelId, payload.itemId);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetListProvider = createAsyncThunk(
  'resolve/provider/list',
  async (
    payload: {
      search?: any;
    },
    { rejectWithValue }
  ) => {
    const response = await getListProvider(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveListSpecialist = createAsyncThunk(
  'resolve/specialist/list',
  async (
    payload: {
      search: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getListSpecialist(payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDownloadFileDoctor = createAsyncThunk(
  'reosolve/doctor/download',
  async (payload: any, { rejectWithValue }) => {
    const response = await getDownloadFileDoctor();
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveUploadFileDoctor = createAsyncThunk(
  'resolve/doctor/upload',
  async (
    payload: {
      providerId: string;
      payload: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postUploadFileDoctor(
      payload.providerId,
      payload.payload
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePostDataDoctor = createAsyncThunk(
  'resolve/doctor/post',
  async (
    payload: {
      channelId: any;
      data: IPostDoctorData;
    },
    { rejectWithValue }
  ) => {
    const response = await postDataDoctor(payload.channelId, payload.data);
    if (response.error !== null) {
      return response.data;
    }

    return rejectWithValue(response.data);
  }
);

export const resolvePutDataDoctor = createAsyncThunk(
  'resolve/doctor/put',
  async (
    payload: {
      channelId: string | undefined;
      doctorId: string | undefined;
      data: IPostDoctorData;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await putDataDoctor(
        payload.channelId,
        payload.doctorId,
        payload.data
      );

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePatchUpdateStatusDoctor = createAsyncThunk(
  'resolve/doctor/patch',
  async (
    payload: {
      id: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await patchUpdateStatusDoctor(payload.id, payload.data);
    if (!response.error) {
      return response.data;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveDeleteDoctor = createAsyncThunk(
  'resolve/doctor/delete',
  async (
    payload: {
      providerId: any;
      itemId: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await deleteDataDoctor(
        payload.providerId,
        payload.itemId
      );
      if (!response.error) {
        return {
          data: response.data,
        };
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  extraReducers: (builder) => {
    // Get List Doctor from OR
    builder.addCase(resolveGetListDoctor.pending, (state) => {
      state.doctors.isLoading = true;
      state.doctors.isError = false;
    });
    builder.addCase(resolveGetListDoctor.fulfilled, (state, { payload }) => {
      state.doctors.isLoading = false;
      state.doctors.isError = false;
      state.doctors.data = payload?.data || [];

      // Metadata List Doctor from OR
      state.doctors.metadata.page = payload?.metadata?.page || 1;
      state.doctors.metadata.size = payload?.metadata?.size || 10;
      state.doctors.metadata.totalPage =
        Math.ceil(payload?.metadata?.total_data / state.params.limit) || 1;
      state.doctors.metadata.totalData = payload?.metadata?.total_data || 10;
    });
    builder.addCase(
      resolveGetListDoctor.rejected,
      (state, { payload }: any) => {
        state.doctors.data = [];
        state.doctors.isLoading = false;
        state.doctors.isError = true;
        state.doctors.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Tenaga Kesehatan!';
      }
    );

    // Get Detail Doctor from OR
    builder.addCase(resolveGetDetailDoctor.pending, (state) => {
      state.doctor.isLoading = true;
      state.doctor.isError = false;
    });
    builder.addCase(resolveGetDetailDoctor.fulfilled, (state, { payload }) => {
      state.doctor.isLoading = false;
      state.doctor.data = payload?.data || {};
    });
    builder.addCase(
      resolveGetDetailDoctor.rejected,
      (state, { payload }: any) => {
        state.doctor.isError = true;
        state.doctor.isLoading = false;
        state.doctor.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Tenaga Kesehatan!';
      }
    );

    // Get List Doctor from Elastic Search
    builder.addCase(resolveGetListDoctorElastic.pending, (state) => {
      state.doctors.isLoading = true;
      state.doctors.isError = false;
    });
    builder.addCase(
      resolveGetListDoctorElastic.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.doctors.isLoading = false;
          state.doctors.isError = false;
          state.doctors.data = payload;
        } else {
          state.doctors.isLoading = false;
          state.doctors.isError = true;
          state.doctors.errorMessage = payload.Exception;
        }
      }
    );
    builder.addCase(
      resolveGetListDoctorElastic.rejected,
      (state, { payload }: any) => {
        state.doctors.isLoading = false;
        state.doctors.isError = true;
        state.doctors.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Tenaga Kesehatan';
      }
    );

    // Get Detail Doctor from Elastic Search
    builder.addCase(resolveGetDetailDoctorElastic.pending, (state) => {
      state.doctor.isLoading = true;
      state.doctor.isError = false;
    });
    builder.addCase(
      resolveGetDetailDoctorElastic.fulfilled,
      (state, { payload }) => {
        state.doctor.isLoading = false;
        state.doctor.isError = false;
        state.doctor.data = payload;
      }
    );
    builder.addCase(
      resolveGetDetailDoctorElastic.rejected,
      (state, { payload }: any) => {
        state.doctor.isLoading = false;
        state.doctor.isError = true;
        state.doctor.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Tenaga Kesehatan';
      }
    );

    // Get List Doctor By Outlet Id from OR
    builder.addCase(resolveGetListDoctorByOutletId.pending, (state) => {
      state.doctors.isLoading = true;
      state.doctors.isError = false;
    });
    builder.addCase(
      resolveGetListDoctorByOutletId.fulfilled,
      (state, { payload }) => {
        state.doctors.isLoading = false;
        state.doctors.isError = false;
        state.doctors.data = payload?.data || [];

        // Metadata List Doctor By Outlet Id from OR
        state.doctors.metadata.page = payload?.metadata?.page || 1;
        state.doctors.metadata.size = payload?.metadata?.size || 10;
        state.doctors.metadata.totalPage =
          Math.ceil(payload?.metadata?.total_data / state.params.limit) || 1;
        state.doctors.metadata.totalData = payload?.metadata?.total_data || 10;
      }
    );
    builder.addCase(
      resolveGetListDoctorByOutletId.rejected,
      (state, { payload }: any) => {
        state.doctors.data = [];
        state.doctors.isLoading = false;
        state.doctors.isError = true;
        state.doctors.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Tenaga Kesehatan!';
      }
    );

    // Get Detail Doctor By Id
    builder.addCase(resolveGetDetailDoctorById.pending, (state) => {
      state.formDoctor.isLoading = true;
      state.formDoctor.isError = false;
    });
    builder.addCase(
      resolveGetDetailDoctorById.fulfilled,
      (state, { payload }) => {
        state.formDoctor.isLoading = false;
        state.formDoctor.isError = false;
        state.formDoctor = {
          ...state.formDoctor,
          tabInformation: {
            ...state.formDoctor.tabInformation,
            fullName: payload.data.nama || '',
            noStr: payload.data.noStrDokter || '',
            birthPlace: payload.data.tempatLahir || '',
            birthDay: payload.data.tanggalLahir || '',
            gender: payload.data.sex || '',
            phoneNumber: payload.data.telepon || '',
            email: payload.data.email || '',
            specialist: payload.data.spesialis || '',
            languages: payload.data.bahasa || [],
            biografi: payload.data.biografi || '',
            strRegistrationDate: payload.data.tanggalRegistrasiStr || '',
            practitionerType: payload.data.practitionerType || '',
          },
          tabDocument: {
            ...state.formDoctor.tabDocument,
            photo: payload.data.foto || '',
            photoStr: payload.data.fotoStr || '',
            photoSip: payload.data.fotoSip || '',
            photoSignature: payload.data.fotoTandaTangan || '',
          },
        };
      }
    );
    builder.addCase(
      resolveGetDetailDoctorById.rejected,
      (state, { payload }: any) => {
        state.formDoctor.isLoading = false;
        state.formDoctor.isError = true;
        state.formDoctor.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Tenaga Kesehatan!';
      }
    );

    // Get List Provider
    builder.addCase(resolveGetListProvider.pending, (state) => {
      state.providers.isLoading = true;
      state.providers.isError = false;
      state.providers.errorMessage = '';
    });
    builder.addCase(resolveGetListProvider.fulfilled, (state, { payload }) => {
      state.providers.isLoading = false;
      state.providers.isError = false;
      state.providers.data = payload.data || [];
    });
    builder.addCase(
      resolveGetListProvider.rejected,
      (state, { payload }: any) => {
        state.providers.isLoading = false;
        state.providers.isError = true;
        state.providers.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Provider!';
      }
    );

    // Get List Specialist
    builder.addCase(resolveListSpecialist.pending, (state) => {
      state.specialists.isLoading = true;
      state.specialists.isError = false;
      state.specialists.isSuccess = false;
      state.specialists.errorMessage = '';
    });
    builder.addCase(resolveListSpecialist.fulfilled, (state, { payload }) => {
      state.specialists.isLoading = false;
      state.specialists.isError = false;
      state.specialists.isSuccess = true;
      state.specialists.data = payload.data || [];
    });
    builder.addCase(
      resolveListSpecialist.rejected,
      (state, { payload }: any) => {
        state.specialists.isLoading = false;
        state.specialists.isError = true;
        state.specialists.isSuccess = false;
        state.specialists.data = [];
        state.specialists.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Spesialis!';
      }
    );

    // Get Download Doctor
    builder.addCase(resolveDownloadFileDoctor.pending, (state) => {
      state.modalDownloadFileDoctor.isLoading = true;
      state.modalDownloadFileDoctor.isError = false;
      state.modalDownloadFileDoctor.isSuccess = false;
    });
    builder.addCase(
      resolveDownloadFileDoctor.fulfilled,
      (state, { payload }) => {
        state.modalDownloadFileDoctor.isLoading = false;
        state.modalDownloadFileDoctor.isError = false;
        state.modalDownloadFileDoctor.isSuccess = true;
        state.modalDownloadFileDoctor.message = payload.message;
        state.modalDownloadFileDoctor.data = payload;
      }
    );
    builder.addCase(
      resolveDownloadFileDoctor.rejected,
      (state, { payload }) => {
        state.modalDownloadFileDoctor.isLoading = false;
        state.modalDownloadFileDoctor.isError = true;
        state.modalDownloadFileDoctor.isSuccess = false;
      }
    );

    // Post Upload Doctor
    builder.addCase(resolveUploadFileDoctor.pending, (state) => {
      state.modalUploadFileDoctor.isLoading = true;
      state.modalUploadFileDoctor.isError = false;
      state.modalUploadFileDoctor.isSuccess = false;
    });
    builder.addCase(resolveUploadFileDoctor.fulfilled, (state, { payload }) => {
      state.modalUploadFileDoctor.isLoading = false;
      state.modalUploadFileDoctor.isError = false;
      state.modalUploadFileDoctor.isSuccess = true;
      state.modalUploadFileDoctor.message = JSON.stringify(payload);
    });
    builder.addCase(resolveUploadFileDoctor.rejected, (state) => {
      state.modalUploadFileDoctor.isLoading = false;
      state.modalUploadFileDoctor.isError = true;
      state.modalUploadFileDoctor.isSuccess = false;
      state.modalUploadFileDoctor.message = 'Unggah file gagal';
    });

    // Post Data Doctor
    builder.addCase(resolvePostDataDoctor.pending, (state) => {
      state.formDoctor.isLoading = true;
      state.formDoctor.isError = false;
    });
    builder.addCase(resolvePostDataDoctor.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formDoctor.isLoading = false;
        state.formDoctor.isError = false;
        state.formDoctor.isModalSuccessOpen = true;
      } else {
        state.formDoctor.isLoading = false;
        state.formDoctor.isError = true;
        state.formDoctor.isModalErrorOpen = true;
        state.formDoctor.errorMessage = 'Gagal Menambahkan Tenaga Kesehatan!';
      }
    });
    builder.addCase(
      resolvePostDataDoctor.rejected,
      (state, { payload }: any) => {
        state.formDoctor.isLoading = false;
        state.formDoctor.isError = true;
        state.formDoctor.isModalErrorOpen = true;
        state.formDoctor.errorMessage =
          payload?.message || 'Gagal Menambahkan Tenaga Kesehatan!';
      }
    );

    // Update Data Doctor
    builder.addCase(resolvePutDataDoctor.pending, (state) => {
      state.formDoctor.isPutLoading = true;
      state.formDoctor.isError = false;
    });
    builder.addCase(resolvePutDataDoctor.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formDoctor.isPutLoading = false;
        state.formDoctor.isError = false;
        state.formDoctor.isModalSuccessOpen = true;
      } else {
        state.formDoctor.isPutLoading = false;
        state.formDoctor.isError = true;
        state.formDoctor.isModalErrorOpen = true;
        state.formDoctor.errorMessage = 'Gagal Update Data Tenaga Kesehatan!';
      }
    });
    builder.addCase(
      resolvePutDataDoctor.rejected,
      (state, { payload }: any) => {
        state.formDoctor.isLoading = false;
        state.formDoctor.isError = true;
        state.formDoctor.isModalErrorOpen = true;
        state.formDoctor.errorMessage =
          payload?.message || 'Gagal Update Data Tenaga Kesehatan!';
      }
    );

    // Patch Update Status Doctor
    builder.addCase(resolvePatchUpdateStatusDoctor.pending, (state) => {
      state.modalUpdateStatusDoctor.isError = false;
      state.modalUpdateStatusDoctor.isLoading = true;
      state.modalUpdateStatusDoctor.isSuccess = false;
    });
    builder.addCase(
      resolvePatchUpdateStatusDoctor.fulfilled,
      (state, { payload }) => {
        state.modalUpdateStatusDoctor.isLoading = false;
        state.modalUpdateStatusDoctor.isError = false;
        state.modalUpdateStatusDoctor.isSuccess = true;
        state.modalUpdateStatusDoctor.successMessage =
          payload?.message || 'Berhasil mengupdate status dokter !';
      }
    );
    builder.addCase(
      resolvePatchUpdateStatusDoctor.rejected,
      (state, { payload }: any) => {
        state.modalUpdateStatusDoctor.isError = true;
        state.modalUpdateStatusDoctor.isLoading = false;
        state.modalUpdateStatusDoctor.isSuccess = false;
        state.modalUpdateStatusDoctor.errorMessage =
          payload?.message || 'Gagal mengupdate status dokter !';
      }
    );

    // Delete Data Doctor
    builder.addCase(resolveDeleteDoctor.pending, (state) => {
      state.modalUpdateStatusDoctor.isLoading = true;
      state.modalUpdateStatusDoctor.isError = false;
    });
    builder.addCase(
      resolveDeleteDoctor.fulfilled,
      (state, { payload }: any) => {
        state.modalUpdateStatusDoctor.isLoading = false;
        state.modalUpdateStatusDoctor.isError = false;
        state.modalUpdateStatusDoctor.isSuccess = true;
        state.modalUpdateStatusDoctor.successMessage =
          payload?.message || 'Berhasil menghapus dokter';
      }
    );
    builder.addCase(resolveDeleteDoctor.rejected, (state, { payload }: any) => {
      state.modalUpdateStatusDoctor.isLoading = false;
      state.modalUpdateStatusDoctor.isError = true;
      state.modalUpdateStatusDoctor.errorMessage =
        payload?.message || 'Gagal menghapus dokter';
      state.modalUpdateStatusDoctor.isError = true;
    });
  },
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
    },
    setCloseModalError: (state) => {
      state.doctor.isError = false;
    },
    setFormDoctorField: (state, { payload }) => {
      state.formDoctor[payload.field][payload.key] = payload.value;
    },
    setFormDoctor: (state, { payload }) => {
      state.formDoctor = payload;
    },
    setTabFormDoctor: (state, { payload }) => {
      state.tabFormDoctor[payload.key] = payload.value;
    },
    clearState: () => initialState,
    setIsModalSuccessOpen: (state, { payload }) => {
      state.formDoctor.isModalSuccessOpen = payload.state;
    },
    setIsModalErrorOpen: (state, { payload }) => {
      state.formDoctor.isModalErrorOpen = payload.state;
    },
    setFlagModalUpdateStatusDoctor: (state, { payload }) => {
      state.modalUpdateStatusDoctor.flag = payload;
    },
    setModal: (state, { payload }) => {
      state[payload.state][payload.name] = payload.value;
    },
    setModalUploadFileDoctor: (state, { payload }) => {
      state.modalUploadFileDoctor[payload.name] = payload.value;
    },
    resetStateFormDoctor: (state) => {
      state.formDoctor = initialState.formDoctor;
    },
    resetModalDownloadFileDoctor: (state) => {
      state.modalDownloadFileDoctor = initialState.modalDownloadFileDoctor;
    },
    resetModalUploadFileDoctor: (state) => {
      state.modalUploadFileDoctor = initialState.modalUploadFileDoctor;
    },
  },
});

export const {
  setModal,
  setParams,
  clearState,
  setFormDoctor,
  setTabFormDoctor,
  setCloseModalError,
  setFormDoctorField,
  setIsModalErrorOpen,
  resetStateFormDoctor,
  setIsModalSuccessOpen,
  setModalUploadFileDoctor,
  resetModalUploadFileDoctor,
  resetModalDownloadFileDoctor,
  setFlagModalUpdateStatusDoctor,
} = doctorSlice.actions;

export default doctorSlice.reducer;
