import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  deleteReservationPrescriptions,
  getDetailReservation,
  getListDrug,
  getListReservation,
  getListReservationFrappe,
  getReservationDiagnostic,
  getReservationHospitalReferral,
  getReservationMedicalSupport,
  getReservationPrescriptions,
  getUserHealthProfile,
  patchReservationStatus,
  postReservationDiagnostic,
  postReservationHospitalReferral,
  postReservationMedicalSupport,
  postReservationPrescriptions,
} from '@/src/client/user';

const initialState = {
  idDoctor: '',
  errorMessage: '',
  successMessage: '',
  isReservationError: false,
  isReservationLoading: false,
  isReservationSuccess: false,
  isDetailReservationError: false,
  isDetailReservationLoading: false,
  isDetailReservationSuccess: false,
  isReservationDiagnosticError: false,
  isReservationDiagnosticLoading: false,
  isReservationDiagnosticSuccess: false,
  isReservationPrescriptionsError: false,
  isReservationPrescriptionsLoading: false,
  isReservationPrescriptionsSuccess: false,
  isReservationMedicalError: false,
  isReservationMedicalLoading: false,
  isReservationMedicalSuccess: false,
  isReservationHospitalReferralError: false,
  isReservationHospitalReferralLoading: false,
  isReservationHospitalReferralSuccess: false,
  isPatchReservationError: false,
  isPatchReservationLoading: false,
  isPatchReservationSuccess: false,
  isPostReservationDiagnosticError: false,
  isPostReservationDiagnosticLoading: false,
  isPostReservationDiagnosticSuccess: false,
  isPostReservationMedicalSupportError: false,
  isPostReservationMedicalSupportLoading: false,
  isPostReservationMedicalSupportSuccess: false,
  isPostReservationHospitalReferralError: false,
  isPostReservationHospitalReferralLoading: false,
  isPostReservationHospitalReferralSuccess: false,
  isPostReservationPrescriptionsError: false,
  isPostReservationPrescriptionsLoading: false,
  isPostReservationPrescriptionsSuccess: false,
  isUserHealthProfileError: false,
  isUserHealthProfileLoading: false,
  isUserHealthProfileSuccess: false,
  isListDrugError: false,
  isListDrugLoading: false,
  isListDrugSuccess: false,
  listReservation: [],
  detailReservation: {},
  reservationDiagnostic: {},
  reservationPrescriptions: [],
  reservationMedicalSupport: {},
  reservationHospitalReferral: {},
  listDrug: [],
  userHealthProfile: {},
  pdfViewUrl: '',
  formType: '',
  params: {
    page: 1,
    limit: 10,
    search: '',
    outletId: 0,
    outletType: '',
    treatmentTypeId: 0,
    doctorId: 0,
    reservationDate: '',
    reservationStatus: 'scheduled',
  },
  metadata: {
    page: 1,
    perPage: 10,
    totalRow: 0,
    totalPage: 1,
  },
  dropdown: {
    diagnosis: false,
    prescription: false,
    support: false,
    reference: false,
  },
  isOpenModal: {
    diagnosis: false,
    prescription: false,
    support: false,
    reference: false,
    startCheckup: false,
    finishCheckup: false,
    previewPdf: false,
  },
  formDiagnose: {
    patientComplain: '',
    initialDiagnose: '',
    bodyTemperature: '',
    bloodPressure: '',
    patientWeight: '',
    patientHeight: '',
    subject: '',
    object: '',
  },
  formPrescription: {
    itemName: '',
    itemPrimaryTag: '',
    usageDescription: '',
    id: '',
  },
  formSupport: {
    description: '',
    attachmentUrl: '',
  },
  formReferral: {
    faskesName: '',
    polyName: '',
    doctorName: '',
    attachmentUrl: '',
  },
  updateStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    confirmation: false,
    id: '',
    providerId: '',
    status: '',
  },
  deletePrescription: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    confirmation: false,
    id: '',
  },
};

export const resolveListReservation = createAsyncThunk(
  'resolve/reservation/list',
  async (
    payload: {
      channelId: string;
      page: number;
      limit: number;
      search: string;
      outletId: number;
      outletType: string;
      treatmentTypeId: number;
      doctorId: number;
      reservationDate: string;
      reservationStatus: string;
    },
    { rejectWithValue }
  ) => {
    const params = {
      channelId: payload.channelId,
      page: payload.page,
      limit: payload.limit,
      search: payload.search,
      outletId: payload.outletId,
      outletType: payload.outletType,
      treatmentTypeId: payload.treatmentTypeId,
      doctorId: payload.doctorId,
      reservationDate: payload.reservationDate,
      reservationStatus: payload.reservationStatus,
    };
    const response = await getListReservation(params);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const testing = createAsyncThunk(
  'resolve/reservation/list',
  async (
    payload: {
      channelId: string;
      page: number;
      limit: number;
      search: string;
      outletId: number;
      outletType: string;
      treatmentTypeId: number;
      doctorId: number;
      reservationDate: string;
      reservationStatus: string;
    },
    { rejectWithValue }
  ) => {
    const params = {
      channelId: payload.channelId,
      page: payload.page,
      limit: payload.limit,
      search: payload.search,
      outletId: payload.outletId,
      outletType: payload.outletType,
      treatmentTypeId: payload.treatmentTypeId,
      doctorId: payload.doctorId,
      reservationDate: payload.reservationDate,
      reservationStatus: payload.reservationStatus,
    };
    const response = await getListReservationFrappe(params);
    if (response.status === 200) return response.data;
    return rejectWithValue(response.error);
  }
);

export const resolveDetailReservation = createAsyncThunk(
  'resolve/reservation/detail',
  async (
    payload: {
      id: string;
      channelId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailReservation(payload.id, payload.channelId);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveReservationDiagnostic = createAsyncThunk(
  'resolve/reservation/diagnostic',
  async (
    payload: {
      id: string;
      channelId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getReservationDiagnostic(
      payload.id,
      payload.channelId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveReservationPrescriptions = createAsyncThunk(
  'resolve/reservation/prescriptions',
  async (
    payload: {
      id: string;
      channelId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getReservationPrescriptions(
      payload.id,
      payload.channelId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveReservationMedicalSupport = createAsyncThunk(
  'resolve/reservation/medical-support',
  async (
    payload: {
      id: string;
      channelId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getReservationMedicalSupport(
      payload.id,
      payload.channelId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveReservationHospitalReferral = createAsyncThunk(
  'resolve/reservation/hospital-referral',
  async (
    payload: {
      id: string;
      channelId: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getReservationHospitalReferral(
      payload.id,
      payload.channelId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePatchReservationStatus = createAsyncThunk(
  'resolve/reservation/status',
  async (
    payload: {
      id: string;
      channelId: string;
      status: string;
    },
    { rejectWithValue }
  ) => {
    const response = await patchReservationStatus(
      payload.id,
      payload.channelId,
      payload.status
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePostReservationDiagnostic = createAsyncThunk(
  'resolve/reservation/diagnostic/post',
  async (
    payload: {
      id: number;
      channelId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postReservationDiagnostic(
      payload.id,
      payload.channelId,
      payload.data
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePostReservationMedicalSupport = createAsyncThunk(
  'resolve/reservation/medical-support/post',
  async (
    payload: {
      id: string;
      channelId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postReservationMedicalSupport(
      payload.id,
      payload.channelId,
      payload.data
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePostReservationHospitalReferral = createAsyncThunk(
  'resolve/reservation/hospital-referral/post',
  async (
    payload: {
      id: string;
      channelId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postReservationHospitalReferral(
      payload.id,
      payload.channelId,
      payload.data
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePostReservationPrescriptions = createAsyncThunk(
  'resolve/reservation/prescriptions/post',
  async (
    payload: {
      id: string;
      channelId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    const response = await postReservationPrescriptions(
      payload.id,
      payload.channelId,
      payload.data
    );
    if (response.status === 201) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveDeleteReservationPrescriptions = createAsyncThunk(
  'resolve/reservation/prescriptions/delete',
  async (
    payload: {
      id: number;
      channelId: number;
      prescriptionId: number;
    },
    { rejectWithValue }
  ) => {
    const response = await deleteReservationPrescriptions(
      payload.id,
      payload.channelId,
      payload.prescriptionId
    );
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveListDrug = createAsyncThunk(
  'resolve/drug/list',
  async (payload: string, { rejectWithValue }) => {
    const response = await getListDrug(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolveUserHealthProfile = createAsyncThunk(
  'resolve/user/health-profile',
  async (payload: string, { rejectWithValue }) => {
    const response = await getUserHealthProfile(payload);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const resolvePatchStatusReservation = createAsyncThunk(
  'resolve/medpoint/patch',
  async (
    payload: {
      data: {
        status: string;
        providerId?: string;
        id: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { id, status, providerId } = payload.data;
      const response = await patchReservationStatus(id, providerId, status);
      if (response.status === 200) {
        return response;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const medpointDoctorSlice = createSlice({
  name: 'medpointDoctor',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resolveListReservation.pending, (state) => {
      state.isReservationError = false;
      state.isReservationLoading = true;
      state.isReservationSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(resolveListReservation.fulfilled, (state, { payload }) => {
      state.isReservationError = false;
      state.isReservationLoading = false;
      state.isReservationSuccess = true;
      state.listReservation = payload.data || [];
      state.metadata.page = payload.metadata.page ?? 1;
      state.metadata.perPage = payload.metadata.size ?? 10;
      state.metadata.totalPage = payload.metadata.total_page ?? 1;
      state.metadata.totalRow = payload.metadata.total_data ?? 0;
    });
    builder.addCase(resolveListReservation.rejected, (state) => {
      state.isReservationError = true;
      state.isReservationLoading = false;
      state.isReservationSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveDetailReservation.pending, (state) => {
      state.isDetailReservationError = false;
      state.isDetailReservationLoading = true;
      state.isDetailReservationSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(
      resolveDetailReservation.fulfilled,
      (state, { payload }) => {
        state.isDetailReservationError = false;
        state.isDetailReservationLoading = false;
        state.isDetailReservationSuccess = true;
        state.detailReservation = payload.data || {};
      }
    );
    builder.addCase(resolveDetailReservation.rejected, (state) => {
      state.isDetailReservationError = true;
      state.isDetailReservationLoading = false;
      state.isDetailReservationSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveReservationDiagnostic.pending, (state) => {
      state.isReservationDiagnosticError = false;
      state.isReservationDiagnosticLoading = true;
      state.isReservationDiagnosticSuccess = false;
    });
    builder.addCase(
      resolveReservationDiagnostic.fulfilled,
      (state, { payload }) => {
        state.isReservationDiagnosticError = false;
        state.isReservationDiagnosticLoading = false;
        state.isReservationDiagnosticSuccess = true;
        state.reservationDiagnostic = payload.data || {};
        state.formDiagnose = payload.data || {};
      }
    );
    builder.addCase(resolveReservationDiagnostic.rejected, (state) => {
      state.reservationDiagnostic = {};
      state.isReservationDiagnosticError = true;
      state.isReservationDiagnosticLoading = false;
      state.isReservationDiagnosticSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveReservationPrescriptions.pending, (state) => {
      state.isReservationPrescriptionsError = false;
      state.isReservationPrescriptionsLoading = true;
      state.isReservationPrescriptionsSuccess = false;
    });
    builder.addCase(
      resolveReservationPrescriptions.fulfilled,
      (state, { payload }) => {
        state.isReservationPrescriptionsError = false;
        state.isReservationPrescriptionsLoading = false;
        state.isReservationPrescriptionsSuccess = true;
        state.reservationPrescriptions = payload.data || [];
      }
    );
    builder.addCase(resolveReservationPrescriptions.rejected, (state) => {
      state.reservationPrescriptions = [];
      state.isReservationPrescriptionsError = true;
      state.isReservationPrescriptionsLoading = false;
      state.isReservationPrescriptionsSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveReservationMedicalSupport.pending, (state) => {
      state.isReservationMedicalError = false;
      state.isReservationMedicalLoading = true;
      state.isReservationMedicalSuccess = false;
    });
    builder.addCase(
      resolveReservationMedicalSupport.fulfilled,
      (state, { payload }) => {
        state.isReservationMedicalError = false;
        state.isReservationMedicalLoading = false;
        state.isReservationMedicalSuccess = true;
        state.reservationMedicalSupport = payload.data || {};
        state.formSupport = payload.data;
      }
    );
    builder.addCase(resolveReservationMedicalSupport.rejected, (state) => {
      state.reservationMedicalSupport = {};
      state.isReservationMedicalError = true;
      state.isReservationMedicalLoading = false;
      state.isReservationMedicalSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolveReservationHospitalReferral.pending, (state) => {
      state.isReservationHospitalReferralError = false;
      state.isReservationHospitalReferralLoading = true;
      state.isReservationHospitalReferralSuccess = false;
    });
    builder.addCase(
      resolveReservationHospitalReferral.fulfilled,
      (state, { payload }) => {
        state.isReservationHospitalReferralError = false;
        state.isReservationHospitalReferralLoading = false;
        state.isReservationHospitalReferralSuccess = true;
        state.reservationHospitalReferral = payload.data || {};
        state.formReferral = payload.data;
      }
    );
    builder.addCase(resolveReservationHospitalReferral.rejected, (state) => {
      state.reservationHospitalReferral = {};
      state.isReservationHospitalReferralError = true;
      state.isReservationHospitalReferralLoading = false;
      state.isReservationHospitalReferralSuccess = false;
      state.errorMessage = 'Something wrong!';
    });
    builder.addCase(resolvePatchReservationStatus.pending, (state) => {
      state.isPatchReservationError = false;
      state.isPatchReservationLoading = true;
      state.isPatchReservationSuccess = false;
    });
    builder.addCase(resolvePatchReservationStatus.fulfilled, (state) => {
      state.isPatchReservationError = false;
      state.isPatchReservationLoading = false;
      state.isPatchReservationSuccess = true;
      state.successMessage = 'Berhasil mengubah status reservasi!';
    });
    builder.addCase(resolvePatchReservationStatus.rejected, (state) => {
      state.isPatchReservationError = true;
      state.isPatchReservationLoading = false;
      state.isPatchReservationSuccess = false;
      state.errorMessage = 'Gagal mengubah status reservasi!';
    });
    builder.addCase(resolvePostReservationDiagnostic.pending, (state) => {
      state.isPostReservationDiagnosticError = false;
      state.isPostReservationDiagnosticLoading = true;
      state.isPostReservationDiagnosticSuccess = false;
    });
    builder.addCase(resolvePostReservationDiagnostic.fulfilled, (state) => {
      state.isPostReservationDiagnosticError = false;
      state.isPostReservationDiagnosticLoading = false;
      state.isPostReservationDiagnosticSuccess = true;
      state.successMessage = 'Berhasil menambahkan diagnosis dokter!';
    });
    builder.addCase(resolvePostReservationDiagnostic.rejected, (state) => {
      state.isPostReservationDiagnosticError = true;
      state.isPostReservationDiagnosticLoading = false;
      state.isPostReservationDiagnosticSuccess = false;
      state.errorMessage = 'Gagal menambahkan diagnosis dokter!';
    });
    builder.addCase(resolvePostReservationMedicalSupport.pending, (state) => {
      state.isPostReservationMedicalSupportError = false;
      state.isPostReservationMedicalSupportLoading = true;
      state.isPostReservationMedicalSupportSuccess = false;
    });
    builder.addCase(resolvePostReservationMedicalSupport.fulfilled, (state) => {
      state.isPostReservationMedicalSupportError = false;
      state.isPostReservationMedicalSupportLoading = false;
      state.isPostReservationMedicalSupportSuccess = true;
      state.successMessage = 'Berhasil menambahkan penunjang medis!';
    });
    builder.addCase(resolvePostReservationMedicalSupport.rejected, (state) => {
      state.isPostReservationMedicalSupportError = true;
      state.isPostReservationMedicalSupportLoading = false;
      state.isPostReservationMedicalSupportSuccess = false;
      state.errorMessage = 'Gagal menambahkan penunjang medis!';
    });
    builder.addCase(resolvePostReservationHospitalReferral.pending, (state) => {
      state.isPostReservationHospitalReferralError = false;
      state.isPostReservationHospitalReferralLoading = true;
      state.isPostReservationHospitalReferralSuccess = false;
    });
    builder.addCase(
      resolvePostReservationHospitalReferral.fulfilled,
      (state) => {
        state.isPostReservationHospitalReferralError = false;
        state.isPostReservationHospitalReferralLoading = false;
        state.isPostReservationHospitalReferralSuccess = true;
        state.successMessage = 'Berhasil menambahkan rujukan!';
      }
    );
    builder.addCase(
      resolvePostReservationHospitalReferral.rejected,
      (state) => {
        state.isPostReservationHospitalReferralError = true;
        state.isPostReservationHospitalReferralLoading = false;
        state.isPostReservationHospitalReferralSuccess = false;
        state.errorMessage = 'Gagal menambahkan rujukan!';
      }
    );
    builder.addCase(resolvePostReservationPrescriptions.pending, (state) => {
      state.isPostReservationPrescriptionsError = false;
      state.isPostReservationPrescriptionsLoading = true;
      state.isPostReservationPrescriptionsSuccess = false;
    });
    builder.addCase(resolvePostReservationPrescriptions.fulfilled, (state) => {
      state.isPostReservationPrescriptionsError = false;
      state.isPostReservationPrescriptionsLoading = false;
      state.isPostReservationPrescriptionsSuccess = true;
      state.successMessage = 'Berhasil menambahkan resep obat!';
    });
    builder.addCase(resolvePostReservationPrescriptions.rejected, (state) => {
      state.isPostReservationPrescriptionsError = true;
      state.isPostReservationPrescriptionsLoading = false;
      state.isPostReservationPrescriptionsSuccess = false;
      state.errorMessage = 'Gagal menambahkan resep obat!';
    });
    builder.addCase(resolveListDrug.pending, (state) => {
      state.isListDrugError = false;
      state.isListDrugLoading = true;
      state.isListDrugSuccess = false;
    });
    builder.addCase(resolveListDrug.fulfilled, (state, { payload }) => {
      state.isListDrugError = false;
      state.isListDrugLoading = false;
      state.isListDrugSuccess = true;
      state.listDrug = payload || [];
    });
    builder.addCase(resolveListDrug.rejected, (state) => {
      state.isListDrugError = true;
      state.isListDrugLoading = false;
      state.isListDrugSuccess = false;
    });
    builder.addCase(resolveUserHealthProfile.pending, (state) => {
      state.isUserHealthProfileError = false;
      state.isUserHealthProfileLoading = true;
      state.isUserHealthProfileSuccess = false;
    });
    builder.addCase(
      resolveUserHealthProfile.fulfilled,
      (state, { payload }) => {
        state.isUserHealthProfileError = false;
        state.isUserHealthProfileLoading = false;
        state.isUserHealthProfileSuccess = true;
        state.userHealthProfile = payload.data || {};
      }
    );
    builder.addCase(resolveUserHealthProfile.rejected, (state) => {
      state.isUserHealthProfileError = true;
      state.isUserHealthProfileLoading = false;
      state.isUserHealthProfileSuccess = false;
    });

    // Update transaction
    builder.addCase(resolvePatchStatusReservation.pending, (state) => {
      state.updateStatus.isLoading = true;
      state.updateStatus.isError = false;
      state.updateStatus.isSuccess = false;
    });
    builder.addCase(
      resolvePatchStatusReservation.fulfilled,
      (state, { payload }) => {
        state.updateStatus.isLoading = false;
        state.updateStatus.isSuccess = true;
        state.updateStatus.confirmation = false;
        state.updateStatus.id = '';
        state.updateStatus.providerId = '';
        state.updateStatus.status = '';
      }
    );
    builder.addCase(
      resolvePatchStatusReservation.rejected,
      (state, { payload }: any) => {
        state.updateStatus.isLoading = false;
        state.updateStatus.isError = true;
        state.updateStatus.isSuccess = false;
      }
    );
    // Update prescription
    builder.addCase(resolveDeleteReservationPrescriptions.pending, (state) => {
      state.deletePrescription.isLoading = true;
      state.deletePrescription.isError = false;
      state.deletePrescription.isSuccess = false;
    });
    builder.addCase(
      resolveDeleteReservationPrescriptions.fulfilled,
      (state, { payload }) => {
        state.deletePrescription.isLoading = false;
        state.deletePrescription.isSuccess = true;
        state.deletePrescription.confirmation = false;
        state.deletePrescription.isError = false;
        state.deletePrescription.id = '';
      }
    );
    builder.addCase(
      resolveDeleteReservationPrescriptions.rejected,
      (state, { payload }: any) => {
        state.deletePrescription.isLoading = false;
        state.deletePrescription.isError = true;
        state.deletePrescription.isSuccess = false;
      }
    );
  },
  reducers: {
    setIdDoctor: (state, { payload }) => {
      state.idDoctor = payload;
    },
    setParams: (state, { payload }) => {
      state.params[payload?.field] = payload.value;
    },
    setDropdown: (state, { payload }) => {
      state.dropdown[payload?.field] = payload.value;
    },
    setIsOpenModal: (state, { payload }) => {
      state.isOpenModal[payload?.field] = payload.value;
    },
    setPdfViewUrl: (state, { payload }) => {
      state.pdfViewUrl = payload;
    },
    setModalConfirmDeletePrescription: (state, { payload }) => {
      state.deletePrescription[payload.field] = payload.value;
    },
    setFormType: (state, { payload }) => {
      state.formType = payload;
    },
    setFormDiagnose: (state, { payload }) => {
      state.formDiagnose[payload?.field] = payload.value;
    },
    setFormMedicalSupport: (state, { payload }) => {
      state.formSupport[payload?.field] = payload.value;
    },
    setFormHospitalReferral: (state, { payload }) => {
      state.formReferral[payload?.field] = payload.value;
    },
    setFormPrescriptions: (state, { payload }) => {
      state.formPrescription[payload?.field] = payload.value;
    },
    addFormPrescriptions: (state, { payload }) => {
      state.formPrescription = payload;
    },
    deleteFormPrescriptions: (state, { payload }) => {
      state.formPrescription.id = payload.value;
    },
    clearStateReservation: (state) => {
      state.isReservationError = false;
      state.isReservationLoading = false;
      state.isReservationSuccess = false;
      state.errorMessage = '';
      state.successMessage = '';
      state.listReservation = [];
      state.params = initialState.params;
      state.metadata = initialState.metadata;
    },
    clearStatePatchReservation: (state) => {
      state.isPatchReservationError = false;
      state.isPatchReservationLoading = false;
      state.isPatchReservationSuccess = false;
      state.isOpenModal.startCheckup = false;
      state.isOpenModal.finishCheckup = false;
      state.errorMessage = '';
      state.successMessage = '';
    },
    clearStatePostReservation: (state) => {
      state.isPostReservationDiagnosticError = false;
      state.isPostReservationDiagnosticLoading = false;
      state.isPostReservationDiagnosticSuccess = false;
      state.isPostReservationHospitalReferralError = false;
      state.isPostReservationHospitalReferralLoading = false;
      state.isPostReservationHospitalReferralSuccess = false;
      state.isPostReservationMedicalSupportError = false;
      state.isPostReservationMedicalSupportLoading = false;
      state.isPostReservationMedicalSupportSuccess = false;
      state.isPostReservationPrescriptionsError = false;
      state.isPostReservationPrescriptionsLoading = false;
      state.isPostReservationPrescriptionsSuccess = false;
      state.errorMessage = '';
      state.successMessage = '';
    },
    clearFormDiagnose: (state) => {
      state.formDiagnose = initialState.formDiagnose;
    },
    clearFormMedicalSupport: (state) => {
      state.formSupport = initialState.formSupport;
    },
    clearFormHospitalReferral: (state) => {
      state.formReferral = initialState.formReferral;
    },
    clearFormPrescriptions: (state) => {
      state.formPrescription = initialState.formPrescription;
    },
    updateStatusConfirmation: (state, { payload }) => {
      state.updateStatus.confirmation = true;
      state.updateStatus.id = payload.data.id;
      state.updateStatus.providerId = payload.data.providerId;
      state.updateStatus.status = payload.data.status;
    },
    clearUpdateStatus: (state, { payload }) => {
      state.updateStatus[payload.name] = payload.value;
    },
    clearDeletePrescription: (state) => {
      state.deletePrescription = initialState.deletePrescription;
    },
  },
});

export const {
  setParams,
  setIdDoctor,
  setDropdown,
  setIsOpenModal,
  setPdfViewUrl,
  setFormType,
  setFormDiagnose,
  setFormMedicalSupport,
  setFormHospitalReferral,
  setFormPrescriptions,
  addFormPrescriptions,
  deleteFormPrescriptions,
  clearStateReservation,
  clearStatePatchReservation,
  clearStatePostReservation,
  clearFormHospitalReferral,
  clearFormDiagnose,
  clearFormMedicalSupport,
  clearFormPrescriptions,
  updateStatusConfirmation,
  clearUpdateStatus,
  setModalConfirmDeletePrescription,
  clearDeletePrescription,
} = medpointDoctorSlice.actions;

export default medpointDoctorSlice.reducer;
