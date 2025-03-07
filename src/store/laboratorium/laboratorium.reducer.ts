import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getDetailTransaction,
  getListTransactions,
  getDetailTransactionSoap,
  getDetailIntegratedNotes,
  postTransactionSoap,
  putTransactionSoap,
  postTransactionProcedure,
  putServiceTransaction,
} from '@/src/client/transaction';

import type { ILaboratoryState } from '@/types/MasterTransaction/laboratorium';

export const initialState: ILaboratoryState = {
  params: {
    search: '',
    page: 1,
    limit: 10,
    totalData: 1,
    totalPage: 1,
    status: '',
    startDate: '',
    endDate: '',
    serviceType: '',
  },
  metadata: {
    page: 1,
    limit: 10,
    totalPage: 1,
    totalData: 0,
  },
  laboratoriums: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    data: [],
  },
  laboratorium: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: null,
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
  formCancelReason: {
    actionReason: '',
    description: '',
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
  modalLaboratory: {
    transactionId: '',
    status: '',
    modalDetail: false,
    modalConfirmation: false,
    modalKipi: false,
    isSuccess: false,
    isError: false,
    isLoading: false,
  },
};

export const resolveListLaboratory = createAsyncThunk(
  'resolve/laboratorium/list',
  async (
    payload: {
      search: string;
      status: string;
      statusPayment: string;
      start: string | number;
      pageLength: string | number;
      fromDate: string;
      endDate: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getListTransactions('Laboratorium', payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetDetailTransaction = createAsyncThunk(
  'resolve/laboratorium/detail',
  async (
    payload: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransaction(payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
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
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailIntegratedNotes(payload.id);
    if (response.status === 200) return response;
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

export const resolvePostProcedure = createAsyncThunk(
  'resolve/procedure/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postTransactionProcedure({
        data: payload.data,
      });
      if (response.status === 200) return response;
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
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePutServiceTransaction = createAsyncThunk(
  'resolve/service-transaction-laboratory/put',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await putServiceTransaction({
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

export const laboratorySlice = createSlice({
  name: 'laboratorium',
  initialState,
  extraReducers: (builder) => {
    // Get List laboratorium
    builder.addCase(resolveListLaboratory.pending, (state) => {
      state.laboratoriums.isLoading = true;
      state.laboratoriums.isError = false;
      state.laboratoriums.data = [];
      state.metadata.page = 1;
      state.metadata.limit = 1;
      state.metadata.totalPage = 1;
      state.metadata.totalData = 0;
    });
    builder.addCase(resolveListLaboratory.fulfilled, (state, { payload }) => {
      state.laboratoriums.isLoading = false;
      state.laboratoriums.isError = false;
      state.laboratoriums.data = payload?.data?.message?.data || [];

      const { limit_start, limit_page_length, total_count } =
        payload?.data?.message?.metadata || null;
      state.metadata.page = limit_start / limit_page_length + 1 || 1;
      state.metadata.limit = limit_page_length || 1;
      state.metadata.totalPage =
        Math.ceil(total_count / limit_page_length) || 1;
      state.metadata.totalData = total_count || 0;
    });
    builder.addCase(
      resolveListLaboratory.rejected,
      (state, { payload }: any) => {
        state.laboratoriums.isError = true;
        state.laboratoriums.isLoading = false;
        state.laboratoriums.message =
          payload?.message || 'Gagal Mendapatkan Data Vaksinasi!';
      }
    );

    // Get Detail laboratorium
    builder.addCase(resolveGetDetailTransaction.pending, (state) => {
      state.laboratorium.isLoading = true;
      state.laboratorium.isSuccess = false;
      state.laboratorium.isError = false;
      state.laboratorium.data = null;
    });
    builder.addCase(
      resolveGetDetailTransaction.fulfilled,
      (state, { payload }) => {
        state.laboratorium.isLoading = false;
        state.laboratorium.isSuccess = true;
        state.laboratorium.isError = false;
        state.laboratorium.data = payload?.data?.message || {};
        if (payload?.data?.message?.sales_order_detail?.items?.length > 0) {
          state.formProcedure.procedure =
            payload?.data?.message?.sales_order_detail?.items.map((item) => ({
              description: '',
              dosage_sequence: '',
              dosage_sequence_number: '',
              expiration_date: '',
              is_booster: true,
              is_protektif: false,
              lot_number: '',
              titer_result: '',
              procedure: null,
              vaccine: {
                name: item.item_name,
                code: item.item_code,
                route: '',
                routeName: '',
                dosage_sequence: '',
              },
              vaccine_category: null,
            }));
        }
      }
    );
    builder.addCase(
      resolveGetDetailTransaction.rejected,
      (state, { payload }: any) => {
        state.laboratorium.isLoading = false;
        state.laboratorium.isSuccess = false;
        state.laboratorium.isError = true;
        state.laboratorium.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Vaksinasi!';
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
          data?.assessments
            ?.filter((item) => item.user_type === 'doctor')
            .map((item) => ({
              assessment: item?.assessment_data,
              case_category: item?.case_category,
              case_type: item?.case_type,
              user_type: item?.user_type,
              name: item?.name,
            })) || [];
        state.formSoap.assessmentNurse =
          data?.assessments
            ?.filter((item) => item.user_type === 'nurse')
            .map((item) => ({
              assessment: item?.assessment_data,
              id: item?.id,
              transaction_detail_id: item?.transaction_detail_id,
              transaction_id: item?.transaction_id,
              user_type: item?.user_type,
              name: item?.name,
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

    // Put Data Service Transaction
    builder.addCase(resolvePutServiceTransaction.pending, (state) => {
      state.modalLaboratory.isLoading = true;
      state.modalLaboratory.isSuccess = false;
      state.modalLaboratory.isError = false;
    });
    builder.addCase(resolvePutServiceTransaction.fulfilled, (state) => {
      state.modalLaboratory.isLoading = false;
      state.modalLaboratory.isSuccess = true;
      state.modalLaboratory.isError = false;
    });
    builder.addCase(resolvePutServiceTransaction.rejected, (state) => {
      state.modalLaboratory.isLoading = false;
      state.modalLaboratory.isSuccess = false;
      state.modalLaboratory.isError = true;
    });
  },
  reducers: {
    clearStateVaccination: () => initialState,
    clearParams: (state) => {
      state.params = initialState.params;
    },
    clearIntegratedNotes: (state: any) => {
      state.integratedNotes = initialState.integratedNotes;
      state.integratedNotesParams = initialState.integratedNotesParams;
    },
    clearModalVaccination: (state) => {
      state.modalLaboratory = initialState.modalLaboratory;
    },
    clearFormCancelReason: (state) => {
      state.formCancelReason = initialState.formCancelReason;
    },
    setParams: (state, { payload }) => {
      state.params[payload.name] = payload.value;
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
    setFormCancelReason: (state, { payload }) => {
      state.formCancelReason[payload.section] = payload.value;
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
    setModalCheckup: (state, { payload }) => {
      state.formCheckup[payload.field] = payload.value;
    },
    setModalProcedure: (state, { payload }) => {
      state.formProcedure[payload.field] = payload.value;
    },
    setModalIntegratedNotes: (state, { payload }) => {
      state.integratedNotes[payload.field] = payload.value;
    },
    setModalVaccination: (state, { payload }) => {
      state.modalLaboratory[payload.field] = payload.value;
    },
  },
});

export const {
  clearStateVaccination,
  clearParams,
  clearIntegratedNotes,
  clearModalVaccination,
  clearFormCancelReason,
  setParams,
  setFormIntegratedNotesParams,
  setFormCheckup,
  setFormSoap,
  setFormProcedure,
  setFormCancelReason,
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
  setModalVaccination,
} = laboratorySlice.actions;

export default laboratorySlice.reducer;
