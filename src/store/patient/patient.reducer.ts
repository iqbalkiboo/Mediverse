import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getListPatient,
  getListPayorByPatient,
  postPatient,
  postPatientPayor,
} from '@/client/patient';
import {
  getIntegratedById,
  getMedicalRecordById,
  getPatientById,
} from '@/src/client/user';

export const initialState = {
  listPatient: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
  },
  listPatientPayor: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
  },
  detailPatient: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
  },
  medicalRecords: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
  },
  integratedNotes: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    data: [],
  },
  formPatient: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    data: {
      blood_group: '',
      status: 'Active',
      patient_type: 'Biasa/External',
      default_currency: 'IDR',
      language: 'en',
      invite_user: 0,
      marital_status: '',
      first_name: '',
      sex: 'Male',
      dob: '',
      pob: '',
      mobile: '',
      email: '',
      no_identifier: '',
      no_nikes: '',
      village: '',
      subdistrict: '',
      city: '',
      province: '',
      address: '',
    },
  },
};

export const resolveGetListPatient = createAsyncThunk(
  'resolve/patient/list',
  async (payload: any, { rejectWithValue }) => {
    const response = await getListPatient({
      noIdentifier: payload.noIdentifier,
    });
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListPayorByPatient = createAsyncThunk(
  'resolve/payor-patient/list',
  async (payload: any, { rejectWithValue }) => {
    const response = await getListPayorByPatient({
      noIdentifier: payload.noIdentifier,
    });
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListDetailPatient = createAsyncThunk(
  'resolve/patient/detail',
  async (payload: { id: string }, { rejectWithValue }) => {
    const response = await getPatientById(payload.id);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListMedicalRecord = createAsyncThunk(
  'resolve/patient/medical',
  async (payload: { id: string }, { rejectWithValue }) => {
    const response = await getMedicalRecordById(payload.id);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetListIntegratedNote = createAsyncThunk(
  'resolve/patient/integrated',
  async (payload: { id: string }, { rejectWithValue }) => {
    const response = await getIntegratedById(payload.id);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolvePostPatient = createAsyncThunk(
  'resolve/patient/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postPatient({
        data: payload.data,
      });
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostPatientPayor = createAsyncThunk(
  'resolve/patient-payor/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postPatientPayor({
        data: payload.data,
      });
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  extraReducers: (builder) => {
    // Get List Patient
    builder.addCase(resolveGetListPatient.pending, (state) => {
      state.listPatient.isError = false;
      state.listPatient.isLoading = true;
      state.listPatient.isSuccess = false;
    });
    builder.addCase(resolveGetListPatient.fulfilled, (state, { payload }) => {
      state.listPatient.isError = false;
      state.listPatient.isLoading = false;
      state.listPatient.isSuccess = true;
      state.listPatient.data = payload?.data?.data || [];
    });
    builder.addCase(
      resolveGetListPatient.rejected,
      (state, { payload }: any) => {
        state.listPatient.isError = true;
        state.listPatient.isLoading = false;
        state.listPatient.isSuccess = false;
        state.listPatient.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Pasien!';
      }
    );

    // Get List Patient Payor
    builder.addCase(resolveGetListPayorByPatient.pending, (state) => {
      state.listPatientPayor.isError = false;
      state.listPatientPayor.isLoading = true;
      state.listPatientPayor.isSuccess = false;
    });
    builder.addCase(
      resolveGetListPayorByPatient.fulfilled,
      (state, { payload }) => {
        state.listPatientPayor.isError = false;
        state.listPatientPayor.isLoading = false;
        state.listPatientPayor.isSuccess = true;
        state.listPatientPayor.data = payload?.data?.data || [];
      }
    );
    builder.addCase(
      resolveGetListPayorByPatient.rejected,
      (state, { payload }: any) => {
        state.listPatientPayor.isError = true;
        state.listPatientPayor.isLoading = false;
        state.listPatientPayor.isSuccess = false;
        state.listPatientPayor.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Penjamin Pasien!';
      }
    );

    // Get List Detail Patient
    builder.addCase(resolveGetListDetailPatient.pending, (state) => {
      state.detailPatient.isError = false;
      state.detailPatient.isLoading = true;
      state.detailPatient.isSuccess = false;
    });
    builder.addCase(
      resolveGetListDetailPatient.fulfilled,
      (state, { payload }) => {
        state.detailPatient.isError = false;
        state.detailPatient.isLoading = false;
        state.detailPatient.isSuccess = true;
        state.detailPatient.data = payload?.data?.data || [];
      }
    );
    builder.addCase(
      resolveGetListDetailPatient.rejected,
      (state, { payload }: any) => {
        state.detailPatient.isError = true;
        state.detailPatient.isLoading = false;
        state.detailPatient.isSuccess = false;
        state.detailPatient.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Pasien!';
      }
    );

    // Get List Medical Records
    builder.addCase(resolveGetListMedicalRecord.pending, (state) => {
      state.medicalRecords.isError = false;
      state.medicalRecords.isLoading = true;
      state.medicalRecords.isSuccess = false;
    });
    builder.addCase(
      resolveGetListMedicalRecord.fulfilled,
      (state, { payload }) => {
        state.medicalRecords.isError = false;
        state.medicalRecords.isLoading = false;
        state.medicalRecords.isSuccess = true;
        state.medicalRecords.data = payload?.data?.message || [];
      }
    );
    builder.addCase(
      resolveGetListMedicalRecord.rejected,
      (state, { payload }: any) => {
        state.medicalRecords.isError = true;
        state.medicalRecords.isLoading = false;
        state.medicalRecords.isSuccess = false;
        state.medicalRecords.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Pasien!';
      }
    );

    // Get List Integrated Note
    builder.addCase(resolveGetListIntegratedNote.pending, (state) => {
      state.integratedNotes.isError = false;
      state.integratedNotes.isLoading = true;
      state.integratedNotes.isSuccess = false;
    });
    builder.addCase(
      resolveGetListIntegratedNote.fulfilled,
      (state, { payload }) => {
        state.integratedNotes.isError = false;
        state.integratedNotes.isLoading = false;
        state.integratedNotes.isSuccess = true;
        state.integratedNotes.data = payload?.data?.message || [];
      }
    );
    builder.addCase(
      resolveGetListIntegratedNote.rejected,
      (state, { payload }: any) => {
        state.integratedNotes.isError = true;
        state.integratedNotes.isLoading = false;
        state.integratedNotes.isSuccess = false;
        state.integratedNotes.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Pasien!';
      }
    );

    // Post Data Patient
    builder.addCase(resolvePostPatient.pending, (state) => {
      state.formPatient.isLoading = true;
      state.formPatient.isSuccess = false;
      state.formPatient.isError = false;
    });
    builder.addCase(resolvePostPatient.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formPatient.isLoading = false;
        state.formPatient.isSuccess = true;
        state.formPatient.isError = false;
        state.formPatient.data = payload.data;
      } else {
        state.formPatient.isLoading = false;
        state.formPatient.isSuccess = false;
        state.formPatient.isError = true;
        state.formPatient.errorMessage = 'Gagal Menambahkan Pasien!';
      }
    });
    builder.addCase(resolvePostPatient.rejected, (state, { payload }: any) => {
      state.formPatient.isLoading = false;
      state.formPatient.isSuccess = false;
      state.formPatient.isError = true;
      state.formPatient.errorMessage =
        payload?.message || 'Gagal Menambahkan Pasien!';
    });
  },
  reducers: {
    clearStatePatient: () => initialState,
    setFormPatient: (state: any, { payload }) => {
      state.formPatient.data[payload.label] = payload.value;
    },
    setModalPatient: (state, { payload }) => {
      state.formPatient[payload.label] = payload.value;
    },
  },
});

export const { clearStatePatient, setFormPatient, setModalPatient } =
  patientSlice.actions;

export default patientSlice.reducer;
