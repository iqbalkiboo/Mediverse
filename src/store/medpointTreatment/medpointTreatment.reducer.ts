import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getDetailTransaction } from '@/src/client/transaction';
import {
  getDataListAssessment,
  getDataListIcd10,
  getDataListIcd9,
  getDataListImmunizationCategory,
  getDetailIntegratedNotes,
  getDetailTransactionSoap,
  postTransactionProcedure,
  postTransactionProcedureOutpatient,
  postTransactionSoap,
  putTransactionSoap,
} from '@/client/medpoint';

import { IMedpointTreatmentState } from '@/src/types/MasterTransaction/medpoint';

export const initialState: IMedpointTreatmentState = {
  medpointDetail: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    data: [],
    detail: { item: [] },
  },
  moduleIcd9: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleIcd10: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleImmunizationCategory: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  moduleAssessment: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: [],
  },
  formCheckup: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    objective: {
      allergy_history: '',
      bmi: '',
      bmi_result: '',
      description: '',
      diastolic: '',
      heart_rate: '',
      height: '',
      pulse_rate: '',
      respiration_rate: '',
      systolic: '',
      temperature: '',
      weight: '',
    },
    soap: {
      assessment: '',
      family_health_history: '',
      medication_history: '',
      patient_health_history: '',
      psychosocial_spiritual: '',
      nurses_note: '',
      other: '',
    },
  },
  formAssessment: {
    assessment: {
      code: '',
      system: '',
      display: '',
    },
    case_category: '',
    case_type: '',
    user_type: '',
  },
  formSoap: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    assessment: [],
    assessmentNurse: [],
    objective: {
      id: '',
      allergy_history: '',
      bmi: '',
      bmi_result: '',
      description: '',
      diastolic: '',
      heart_rate: '',
      height: '',
      pulse_rate: '',
      respiration_rate: '',
      systolic: '',
      temperature: '',
      weight: '',
    },
    education: {
      id: '',
      complications: false,
      disease_explanation: false,
      examination_results: false,
      medical_action: false,
      side_effects_risks: false,
      other_details: '',
    },
    planning: {
      id: '',
      doctors_note: '',
      nurses_note: '',
      description: '',
    },
    subjective: {
      id: '',
      family_health_history: '',
      doctors_note: '',
      medication_history: '',
      patient_health_history: '',
      psychosocial_spiritual: '',
      description: '',
    },
  },
  formProcedureItem: {
    description: '',
    dosage_sequence: '',
    dosage_sequence_number: '',
    expiration_date: '',
    is_booster: true,
    is_protektif: false,
    lot_number: '',
    titer_result: '',
    procedure: null,
    vaccine: null,
    vaccine_category: null,
  },
  formProcedure: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    successMessage: '',
    errorMessage: '',
    procedure: [],
  },
  integratedNotes: {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    successMessage: '',
    errorMessage: '',
    data: [],
    metadata: {
      page: 0,
      size: 0,
      totalPage: 0,
      totalData: 0,
    },
  },
  integratedNotesParams: {
    page: 1,
    limit: 50,
  },
};

export const resolveGetDetailTransaction = createAsyncThunk(
  'resolve/detailTransaction',
  async (
    payload: {
      id?: string;
      providerType: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransaction(payload);
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListIcd9 = createAsyncThunk(
  'resolve/icd9/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListIcd9({});
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListIcd10 = createAsyncThunk(
  'resolve/icd10/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListIcd10({});
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListImmunizationCategory = createAsyncThunk(
  'resolve/immunization_category/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListImmunizationCategory({});
    if (response.status === 200) {
      return response;
    }
    return rejectWithValue(response.data);
  }
);

export const resolveGetListAssessment = createAsyncThunk(
  'resolve/assessment/list',
  async (_, { rejectWithValue }) => {
    const response = await getDataListAssessment({});
    if (response.status === 200) return response.data;
    return rejectWithValue(response.data);
  }
);

export const resolvePostCheckup = createAsyncThunk(
  'resolve/checkup/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postTransactionSoap({
        transactionId: payload.transactionId,
        data: payload.data,
      });
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostSoap = createAsyncThunk(
  'resolve/soap/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postTransactionSoap({
        transactionId: payload.transactionId,
        data: payload.data,
      });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePutSoap = createAsyncThunk(
  'resolve/soap/put',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await putTransactionSoap({
        transactionId: payload.transactionId,
        data: payload.data,
      });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostProcedureOutpatient = createAsyncThunk(
  'resolve/procedure-outpatient/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postTransactionProcedureOutpatient({
        transactionId: payload.transactionId,
        data: payload.data,
      });
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostProcedure = createAsyncThunk(
  'resolve/procedure/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postTransactionProcedure({
        transactionId: payload.transactionId,
        data: payload.data,
      });
      if (response.status === 200) return response;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveGetDetailSoap = createAsyncThunk(
  'resolve/soap/get',
  async (
    payload: {
      id: string | number;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransactionSoap(payload.id);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetDetailIntegratedNotes = createAsyncThunk(
  'resolve/integrated-notes/get',
  async (
    payload: {
      id: string | number;
      page?: number;
      limit?: number;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailIntegratedNotes(
      payload.id,
      payload.page,
      payload.limit
    );
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const medpointTreatmentSlice = createSlice({
  name: 'medpointTreatment',
  initialState,
  extraReducers: (builder) => {
    // Get detail medpoint
    builder.addCase(resolveGetDetailTransaction.pending, (state) => {
      state.medpointDetail.isLoading = true;
      state.medpointDetail.isError = false;
    });
    builder.addCase(
      resolveGetDetailTransaction.fulfilled,
      (state, { payload }) => {
        state.medpointDetail.isLoading = false;
        state.medpointDetail.isError = false;
        state.medpointDetail.detail = payload?.data?.data;
      }
    );
    builder.addCase(
      resolveGetDetailTransaction.rejected,
      (state, { payload }: any) => {
        state.medpointDetail.isLoading = false;
        state.medpointDetail.isError = true;
        state.medpointDetail.message =
          payload?.message || 'Gagal Mendapatkan Data Transaksi Medpoint!';
      }
    );

    // Get List ICD 9
    builder.addCase(resolveGetListIcd9.pending, (state) => {
      state.moduleIcd9.isLoading = true;
      state.moduleIcd9.isError = false;
    });
    builder.addCase(resolveGetListIcd9.fulfilled, (state, { payload }) => {
      state.moduleIcd9.isLoading = false;
      state.moduleIcd9.isError = false;
      state.moduleIcd9.data = payload?.data || [];
    });
    builder.addCase(resolveGetListIcd9.rejected, (state, { payload }: any) => {
      state.moduleIcd9.isLoading = false;
      state.moduleIcd9.isError = true;
      state.moduleIcd9.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data ICD9!';
    });

    // Get List ICD 10
    builder.addCase(resolveGetListIcd10.pending, (state) => {
      state.moduleIcd10.isLoading = true;
      state.moduleIcd10.isError = false;
    });
    builder.addCase(resolveGetListIcd10.fulfilled, (state, { payload }) => {
      state.moduleIcd10.isLoading = false;
      state.moduleIcd10.isError = false;
      state.moduleIcd10.data = payload?.data || [];
    });
    builder.addCase(resolveGetListIcd10.rejected, (state, { payload }: any) => {
      state.moduleIcd10.isLoading = false;
      state.moduleIcd10.isError = true;
      state.moduleIcd10.errorMessage =
        payload?.message || 'Gagal Mendapatkan Data ICD10!';
    });

    // Get List Immunization Category
    builder.addCase(resolveGetListImmunizationCategory.pending, (state) => {
      state.moduleImmunizationCategory.isLoading = true;
      state.moduleImmunizationCategory.isError = false;
    });
    builder.addCase(
      resolveGetListImmunizationCategory.fulfilled,
      (state, { payload }) => {
        state.moduleImmunizationCategory.isLoading = false;
        state.moduleImmunizationCategory.isError = false;
        state.moduleImmunizationCategory.data = payload?.data || [];
      }
    );
    builder.addCase(
      resolveGetListImmunizationCategory.rejected,
      (state, { payload }: any) => {
        state.moduleImmunizationCategory.isLoading = false;
        state.moduleImmunizationCategory.isError = true;
        state.moduleImmunizationCategory.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Kategori Imunisasi!';
      }
    );

    // Get List Assessment
    builder.addCase(resolveGetListAssessment.pending, (state) => {
      state.moduleAssessment.isLoading = true;
      state.moduleAssessment.isError = false;
    });
    builder.addCase(
      resolveGetListAssessment.fulfilled,
      (state, { payload }) => {
        state.moduleAssessment.isLoading = false;
        state.moduleAssessment.isError = false;
        state.moduleAssessment.data = payload?.data || [];
      }
    );
    builder.addCase(
      resolveGetListAssessment.rejected,
      (state, { payload }: any) => {
        state.moduleAssessment.isLoading = false;
        state.moduleAssessment.isError = true;
        state.moduleAssessment.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Assessment!';
      }
    );

    // Post Data Checkup
    builder.addCase(resolvePostCheckup.pending, (state) => {
      state.formCheckup.isLoading = true;
      state.formCheckup.isSuccess = false;
      state.formCheckup.isError = false;
    });
    builder.addCase(resolvePostCheckup.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formCheckup.isLoading = false;
        state.formCheckup.isSuccess = true;
        state.formCheckup.isError = false;
      } else {
        state.formCheckup.isLoading = false;
        state.formCheckup.isSuccess = false;
        state.formCheckup.isError = true;
        state.formCheckup.errorMessage =
          'Gagal Menambahkan Pemeriksaan Pasien!';
      }
    });
    builder.addCase(resolvePostCheckup.rejected, (state, { payload }: any) => {
      state.formCheckup.isLoading = false;
      state.formCheckup.isSuccess = false;
      state.formCheckup.isError = true;
      state.formCheckup.errorMessage =
        payload?.message || 'Gagal Menambahkan Pemeriksaan Pasien!';
    });

    // Post Data SOAP
    builder.addCase(resolvePostSoap.pending, (state) => {
      state.formSoap.isLoading = true;
      state.formSoap.isSuccess = false;
      state.formSoap.isError = false;
    });
    builder.addCase(resolvePostSoap.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formSoap.isLoading = false;
        state.formSoap.isSuccess = true;
        state.formSoap.isError = false;
      } else {
        state.formSoap.isLoading = false;
        state.formSoap.isSuccess = false;
        state.formSoap.isError = true;
        state.formSoap.errorMessage = 'Gagal Menambahkan SOAP!';
      }
    });
    builder.addCase(resolvePostSoap.rejected, (state, { payload }: any) => {
      state.formSoap.isLoading = false;
      state.formSoap.isSuccess = false;
      state.formSoap.isError = true;
      state.formSoap.errorMessage =
        payload?.message || 'Gagal Menambahkan SOAP!';
    });

    // Put Data SOAP
    builder.addCase(resolvePutSoap.pending, (state) => {
      state.formSoap.isLoading = true;
      state.formSoap.isSuccess = false;
      state.formSoap.isError = false;
    });
    builder.addCase(resolvePutSoap.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formSoap.isLoading = false;
        state.formSoap.isSuccess = true;
        state.formSoap.isError = false;
      } else {
        state.formSoap.isLoading = false;
        state.formSoap.isSuccess = false;
        state.formSoap.isError = true;
        state.formSoap.errorMessage = 'Gagal Update SOAP!';
      }
    });
    builder.addCase(resolvePutSoap.rejected, (state, { payload }: any) => {
      state.formSoap.isLoading = false;
      state.formSoap.isSuccess = false;
      state.formSoap.isError = true;
      state.formSoap.errorMessage = payload?.message || 'Gagal Update SOAP!';
    });

    // Post Data Procedure Outpatient
    builder.addCase(resolvePostProcedureOutpatient.pending, (state) => {
      state.formProcedure.isLoading = true;
      state.formProcedure.isSuccess = false;
      state.formProcedure.isError = false;
    });
    builder.addCase(
      resolvePostProcedureOutpatient.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formProcedure.isLoading = false;
          state.formProcedure.isSuccess = true;
          state.formProcedure.isError = false;
        } else {
          state.formProcedure.isLoading = false;
          state.formProcedure.isSuccess = false;
          state.formProcedure.isError = true;
          state.formProcedure.errorMessage = 'Gagal Menambahkan Tindakan!';
        }
      }
    );
    builder.addCase(
      resolvePostProcedureOutpatient.rejected,
      (state, { payload }: any) => {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = false;
        state.formProcedure.isError = true;
        state.formProcedure.errorMessage =
          payload?.message || 'Gagal Menambahkan Tindakan!';
      }
    );

    // Post Data Procedure
    builder.addCase(resolvePostProcedure.pending, (state) => {
      state.formProcedure.isLoading = true;
      state.formProcedure.isSuccess = false;
      state.formProcedure.isError = false;
    });
    builder.addCase(resolvePostProcedure.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = true;
        state.formProcedure.isError = false;
      } else {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = false;
        state.formProcedure.isError = true;
        state.formProcedure.errorMessage = 'Gagal Menambahkan Tindakan!';
      }
    });
    builder.addCase(
      resolvePostProcedure.rejected,
      (state, { payload }: any) => {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = false;
        state.formProcedure.isError = true;
        state.formProcedure.errorMessage =
          payload?.message || 'Gagal Menambahkan Tindakan!';
      }
    );

    // Get Detail SOAP
    builder.addCase(resolveGetDetailSoap.pending, (state) => {
      state.formSoap.isLoading = true;
      state.formSoap.isSuccess = false;
      state.formSoap.isError = false;
      state.formSoap.isEdit = false;
    });
    builder.addCase(resolveGetDetailSoap.fulfilled, (state, { payload }) => {
      const { message } = payload.data;
      const data = message[0];
      if (data) {
        state.formSoap.assessment =
          data?.assessment
            ?.filter((item) => item.user_type === 'doctor')
            .map((item) => ({
              assessment: item?.assessment,
              case_category: item?.case_category,
              case_type: item?.case_type,
              user_type: item?.user_type,
            })) || [];
        state.formSoap.assessmentNurse =
          data?.assessment
            ?.filter((item) => item.user_type === 'nurse')
            .map((item) => ({
              assessment: item?.assessment,
              id: item?.id,
              transaction_detail_id: item?.transaction_detail_id,
              transaction_id: item?.transaction_id,
              user_type: item?.user_type,
            })) || [];
        state.formSoap.objective = {
          id: data?.name || '',
          allergy_history: data?.allergy_history || '',
          bmi: data?.bmi || '',
          bmi_result: data?.bmi_result || '',
          description: data?.description || '',
          diastolic: data?.diastolic || '',
          heart_rate: data?.heart_rate || '',
          height: data?.height || '',
          pulse_rate: data?.pulse_rate || '',
          respiration_rate: data?.respiration_rate || '',
          systolic: data?.systolic || '',
          temperature: data?.temperature || '',
          weight: data?.weight || '',
        };
        state.formSoap.education = {
          id: data?.name || '',
          complications: data?.complications || false,
          disease_explanation: data?.disease_explanation || false,
          examination_results: data?.examination_results || false,
          medical_action: data?.medical_action || false,
          side_effects_risks: data?.side_effects_risks || false,
          other_details: data?.other_education || '',
        };
        state.formSoap.planning = {
          id: data?.name || '',
          doctors_note:
            data?.planning_description ||
            data?.doctors_note ||
            data?.nurses_note ||
            '',
          nurses_note: data?.nurses_note || '',
          description: data?.description || '',
        };
        state.formSoap.subjective = {
          id: data?.name || '',
          family_health_history: data?.family_health_history || '',
          doctors_note: data?.doctors_note || '',
          medication_history: data?.medication_history || '',
          patient_health_history: data?.patient_health_history || '',
          psychosocial_spiritual: data?.psychosocial_spiritual || '',
          description: data?.patient_complaint || '',
        };
        state.formSoap.isLoading = false;
        state.formSoap.isEdit = true;
      }
    });
    builder.addCase(
      resolveGetDetailSoap.rejected,
      (state, { payload }: any) => {
        state.formSoap.isLoading = false;
        state.formSoap.isSuccess = false;
        state.formSoap.isEdit = false;
        state.formSoap.isError = true;
        state.formProcedure.errorMessage =
          payload?.message || 'Gagal Mendapatkan SOAP!';
      }
    );

    // Get Detail Integrated Notes
    builder.addCase(resolveGetDetailIntegratedNotes.pending, (state) => {
      state.integratedNotes.isLoading = true;
      state.integratedNotes.isSuccess = false;
      state.integratedNotes.isError = false;
    });
    builder.addCase(
      resolveGetDetailIntegratedNotes.fulfilled,
      (state, { payload }) => {
        state.integratedNotes.isLoading = false;
        state.integratedNotes.isSuccess = true;
        state.integratedNotes.isError = false;
        state.integratedNotes.data = payload?.data?.data;
        state.integratedNotes.metadata = payload?.data?.metadata;
      }
    );
    builder.addCase(
      resolveGetDetailIntegratedNotes.rejected,
      (state, { payload }: any) => {
        state.integratedNotes.isLoading = false;
        state.integratedNotes.isSuccess = false;
        state.integratedNotes.isError = true;
        state.integratedNotes.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Integrasi Catatan!';
      }
    );
  },
  reducers: {
    clearStateTreatment: () => initialState,
    clearIntegratedNotes: (state: any) => {
      state.integratedNotes = initialState.integratedNotes;
      state.integratedNotesParams = initialState.integratedNotesParams;
    },
    setFormIntegratedNotesParams: (state: any, { payload }) => {
      state.integratedNotesParams[payload.label] = payload.value;
    },
    setFormCheckup: (state: any, { payload }) => {
      state.formCheckup[payload.section][payload.label] = payload.value;
    },
    setFormSoap: (state: any, { payload }) => {
      state.formSoap[payload.section][payload.label] = payload.value;
    },
    setFormProcedure: (state: any, { payload }) => {
      state.formProcedure[payload.section][payload.label] = payload.value;
    },
    setAddAssessmentForm: (state: any, { payload }) => {
      state.formSoap.assessment.push(payload);
    },
    setRemoveAssessmentForm: (state, { payload }) => {
      state.formSoap.assessment.splice(payload, 1);
    },
    setAssessmentItem: (state, { payload }) => {
      state.formSoap.assessment[payload.index][payload.label] = payload.value;
    },
    setAddProcedureForm: (state: any, { payload }) => {
      state.formProcedure.procedure.push(payload);
    },
    setRemoveProcedureForm: (state, { payload }) => {
      state.formProcedure.procedure.splice(payload, 1);
    },
    setProcedureItem: (state, { payload }) => {
      state.formProcedure.procedure[payload.index][payload.label] =
        payload.value;
    },
    setModal: (state, { payload }) => {
      state.formSoap[payload.field] = payload.value;
    },
    setModalProcedure: (state, { payload }) => {
      state.formProcedure[payload.field] = payload.value;
    },
    setModalCheckup: (state, { payload }) => {
      state.formCheckup[payload.field] = payload.value;
    },
    setModalIntegratedNotes: (state, { payload }) => {
      state.integratedNotes[payload.field] = payload.value;
    },
  },
});

export const {
  clearStateTreatment,
  clearIntegratedNotes,
  setFormIntegratedNotesParams,
  setFormCheckup,
  setFormSoap,
  setFormProcedure,
  setAddAssessmentForm,
  setAssessmentItem,
  setRemoveAssessmentForm,
  setAddProcedureForm,
  setRemoveProcedureForm,
  setProcedureItem,
  setModal,
  setModalProcedure,
  setModalCheckup,
  setModalIntegratedNotes,
} = medpointTreatmentSlice.actions;

export default medpointTreatmentSlice.reducer;
