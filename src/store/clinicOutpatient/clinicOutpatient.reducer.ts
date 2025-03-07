import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getListTransactions,
  getDetailTransaction,
  getDetailTransactionSoap,
  getDetailTransactionTreatment,
  getDetailIntegratedNotes,
  postTransactionSoap,
  putTransactionSoap,
  postTransactionProcedure,
  postTransactionDrugRecipe,
  postTransactionMedicalSupport,
  postTransactionRecommendationLetter,
  postUploadDocument,
  putServiceTransaction,
  putTransactionProcedure,
  getDetailTransactionDrugRecipe,
  putTransactionDrugRecipe,
  getDetailTransactionMedicalSupport,
  putTransactionMedicalSupport,
  getDetailTransactionRecommendationLetter,
  putTransactionRecommendationLetter,
  postCancelTransaction,
  deleteTransactionDrugRecipe,
  deleteTransactionProcedure,
} from '@/src/client/transaction';

import type { IClinicOutpatientState } from '@/types/MasterTransaction/clinicOutpatient';

export const initialState: IClinicOutpatientState = {
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
  clinicOutpatients: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    data: [],
  },
  clinicOutpatient: {
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
    isEditDoctor: false,
    successMessage: '',
    errorMessage: '',
    soapId: '',
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
    id: '',
    procedure: null,
  },
  formProcedure: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    procedure: [],
    procedureService: [],
    procedureServiceDelete: [],
  },
  formMedicalSupportItem: {
    medicalSupport: null,
    qty: 1,
  },
  formDrugRecipe: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    hasDrugRecipe: '',
    drug: [],
  },
  formMedicalSupport: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    id: '',
    hasMedicalSupport: '',
    medicalSupport: [],
  },
  formRecommendationLetter: {
    isLoading: false,
    isPutLoading: false,
    isSuccess: false,
    isCreateSuccess: false,
    isError: false,
    isEdit: false,
    successMessage: '',
    errorMessage: '',
    id: '',
    docname: '',
    detailRefer: {
      hasDetailRefer: '',
      hospital: '',
      facility: '',
      reference: '',
    },
    detailCertificate: {
      hasDetailCertificate: '',
      startDate: '',
      endDate: '',
      period: '0',
    },
    detailDocument: {
      hasDetailDocument: '',
    },
    documents: [],
  },
  formCancelReason: {
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
  modalClinicOutpatient: {
    transactionId: '',
    status: '',
    modalDetail: false,
    modalConfirmation: false,
    isSuccess: false,
    isError: false,
    isLoading: false,
  },
};

export const resolveListClinicOutpatient = createAsyncThunk(
  'resolve/clinic-outpatient/list',
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
    const response = await getListTransactions('Rawat Jalan', payload);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetDetailTransaction = createAsyncThunk(
  'resolve/vaccination/detail',
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

export const resolveGetDetailTreatment = createAsyncThunk(
  'resolve/treatment/get',
  async (
    payload: {
      id: string | number;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransactionTreatment(payload.id);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetDetailDrugRecipe = createAsyncThunk(
  'resolve/drug-recipe/get',
  async (
    payload: {
      id: string | number;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransactionDrugRecipe(payload.id);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetDetailMedicalSupport = createAsyncThunk(
  'resolve/medical-support/get',
  async (
    payload: {
      id: string | number;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransactionMedicalSupport(payload.id);
    if (response.status === 200) return response;
    return rejectWithValue(response.data);
  }
);

export const resolveGetDetailRecommendationLetter = createAsyncThunk(
  'resolve/recommendation-letter/get',
  async (
    payload: {
      id: string | number;
    },
    { rejectWithValue }
  ) => {
    const response = await getDetailTransactionRecommendationLetter(payload.id);
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
      if (response.status === 200) return response;
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

export const resolvePostDrugRecipe = createAsyncThunk(
  'resolve/drug-recipe/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postTransactionDrugRecipe({
        data: payload.data,
      });
      if (response.status === 200) return response;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostMedicalSupport = createAsyncThunk(
  'resolve/medical-support/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postTransactionMedicalSupport({
        data: payload.data,
      });
      if (response.status === 200) return response;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolvePostRecommendationLetter = createAsyncThunk(
  'resolve/recommendation-letter/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postTransactionRecommendationLetter({
        data: payload.data,
      });
      if (response.status === 200) return response;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveUploadDocument = createAsyncThunk(
  'resolve/upload-document/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postUploadDocument({
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

export const resolvePutProcedure = createAsyncThunk(
  'resolve/procedure/put',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await putTransactionProcedure({
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

export const resolvePutDrugRecipe = createAsyncThunk(
  'resolve/drug-recipe/put',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await putTransactionDrugRecipe({
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

export const resolvePutMedicalSupport = createAsyncThunk(
  'resolve/medical-support/put',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await putTransactionMedicalSupport({
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

export const resolvePutRecommendationLetter = createAsyncThunk(
  'resolve/recommendation-letter/put',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await putTransactionRecommendationLetter({
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

export const resolvePutServiceTransaction = createAsyncThunk(
  'resolve/service-transaction-clinic/put',
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

export const resolvePostCancelTransaction = createAsyncThunk(
  'resolve/transaction-clinic-cancel/post',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postCancelTransaction({
        data: payload.data,
      });
      if (response.status === 200) return response.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDeleteDrugRecipe = createAsyncThunk(
  'resolve/drug-recipe/delete',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await deleteTransactionDrugRecipe({
        transactionId: payload.transactionId,
      });
      if (response.status === 202) return response;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveDeleteProcedure = createAsyncThunk(
  'resolve/procedure/delete',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await deleteTransactionProcedure({
        transactionId: payload.transactionId,
      });
      if (response.status === 202) return response;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const clinicOutpatientSlice = createSlice({
  name: 'clinicOutpatient',
  initialState,
  extraReducers: (builder) => {
    // Get List Clinic
    builder.addCase(resolveListClinicOutpatient.pending, (state) => {
      state.clinicOutpatients.isLoading = true;
      state.clinicOutpatients.isError = false;
      state.clinicOutpatients.data = [];
      state.metadata.page = 1;
      state.metadata.limit = 1;
      state.metadata.totalPage = 1;
      state.metadata.totalData = 0;
    });
    builder.addCase(
      resolveListClinicOutpatient.fulfilled,
      (state, { payload }) => {
        state.clinicOutpatients.isLoading = false;
        state.clinicOutpatients.isError = false;
        state.clinicOutpatients.data = payload?.data?.message?.data || [];

        const { limit_start, limit_page_length, total_count } =
          payload?.data?.message?.metadata || null;
        state.metadata.page = limit_start / limit_page_length + 1 || 1;
        state.metadata.limit = limit_page_length || 1;
        state.metadata.totalPage =
          Math.ceil(total_count / limit_page_length) || 1;
        state.metadata.totalData = total_count || 0;
      }
    );
    builder.addCase(
      resolveListClinicOutpatient.rejected,
      (state, { payload }: any) => {
        state.clinicOutpatients.isError = true;
        state.clinicOutpatients.isLoading = false;
        state.clinicOutpatients.message =
          payload?.message || 'Gagal Mendapatkan Data Klinik/Rawat Jalan!';
      }
    );

    // Get Detail Clinic
    builder.addCase(resolveGetDetailTransaction.pending, (state) => {
      state.clinicOutpatient.isLoading = true;
      state.clinicOutpatient.isSuccess = false;
      state.clinicOutpatient.isError = false;
      state.clinicOutpatient.data = null;
    });
    builder.addCase(
      resolveGetDetailTransaction.fulfilled,
      (state, { payload }) => {
        state.clinicOutpatient.isLoading = false;
        state.clinicOutpatient.isSuccess = true;
        state.clinicOutpatient.isError = false;
        state.clinicOutpatient.data = payload?.data?.message || {};
      }
    );
    builder.addCase(
      resolveGetDetailTransaction.rejected,
      (state, { payload }: any) => {
        state.clinicOutpatient.isLoading = false;
        state.clinicOutpatient.isSuccess = false;
        state.clinicOutpatient.isError = true;
        state.clinicOutpatient.errorMessage =
          payload?.message || 'Gagal Mendapatkan Data Klinik/Rawat Jalan!';
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
        state.formSoap.soapId = data?.name;
        state.formSoap.assessment =
          data?.assessments
            ?.filter((item) => item.user_type === 'doctor')
            .map((item) => ({
              assessment: { name: item?.assessment_data },
              case_category: item?.case_category,
              case_type: item?.case_type,
              user_type: item?.user_type,
              name: item?.name,
            })) || [];
        state.formSoap.assessmentNurse =
          data?.assessments
            ?.filter((item) => item.user_type === 'nurse')
            .map((item) => ({
              assessment: { name: item?.assessment_data },
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
        state.formSoap.isEditDoctor = data?.user_type === 'doctor';
      }
    });
    builder.addCase(
      resolveGetDetailSoap.rejected,
      (state, { payload }: any) => {
        state.formSoap.isLoading = false;
        state.formSoap.isSuccess = false;
        state.formSoap.isEdit = false;
        state.formSoap.isError = true;
        state.formSoap.errorMessage =
          payload?.message || 'Gagal Mendapatkan SOAP!';
      }
    );

    // Get Detail Treatment
    builder.addCase(resolveGetDetailTreatment.pending, (state) => {
      state.formProcedure.isLoading = true;
      state.formProcedure.isSuccess = false;
      state.formProcedure.isError = false;
      state.formProcedure.isEdit = false;
    });
    builder.addCase(
      resolveGetDetailTreatment.fulfilled,
      (state, { payload }) => {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = false;
        state.formProcedure.isError = false;

        const data = payload?.data?.message;
        if (data) {
          const groupedData = Object.values(
            data.reduce((acc, item: any) => {
              if (!acc[item.procedure]) {
                acc[item.procedure] = {
                  procedure: item.procedure,
                  procedureService: [],
                };
              }
              const isDuplicate = acc[item.procedure].procedureService.some(
                (i) => i.item === item.item
              );
              if (!isDuplicate) acc[item.procedure].procedureService.push(item);
              return acc;
            }, {})
          );

          const procedureData: any[] = [];
          const procedureServiceData: any[] = [];
          groupedData.forEach((data: any) => {
            const { procedureService } = data;
            procedureData.push({
              id: Math.floor(Math.random() * 1000),
              procedure: procedureService[0]
                ? {
                    ...procedureService[0],
                    procedure_name:
                      procedureService[0].procedure_detail?.display || '',
                  }
                : {},
            });
            procedureServiceData.push(
              procedureService.map((service) => ({
                ...service,
                item_name: service?.item_detail?.item_name,
                isEdit: true,
              }))
            );
          });

          state.formProcedure.procedure = procedureData;
          state.formProcedure.procedureService = procedureServiceData;
          state.formProcedure.procedureServiceDelete = data
            ?.map((item) => item.name)
            .filter((item) => item);
          state.formProcedure.isEdit = procedureData.length > 0;
        }
      }
    );
    builder.addCase(
      resolveGetDetailTreatment.rejected,
      (state, { payload }: any) => {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = false;
        state.formProcedure.isEdit = false;
        state.formProcedure.isError = true;
        state.formProcedure.errorMessage =
          payload?.message || 'Gagal Mendapatkan Tindakan!';
      }
    );

    // Get Detail Drug Recipe
    builder.addCase(resolveGetDetailDrugRecipe.pending, (state) => {
      state.formDrugRecipe.isLoading = true;
      state.formDrugRecipe.isSuccess = false;
      state.formDrugRecipe.isError = false;
      state.formDrugRecipe.isEdit = false;
    });
    builder.addCase(
      resolveGetDetailDrugRecipe.fulfilled,
      (state, { payload }) => {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = false;
        state.formDrugRecipe.isError = false;

        const data = payload?.data?.message;
        if (data) {
          state.formDrugRecipe.hasDrugRecipe = data.length > 0 ? 'yes' : 'no';
          state.formDrugRecipe.drug = data.map((drug) => ({
            isEdit: true,
            name: drug?.name,
            item: drug?.item,
            itemName:
              drug?.is_concoction === 1
                ? drug?.concoction_name
                : drug?.item_detail?.item_name,
            unit: drug?.unit
              ? drug?.unit
              : drug?.is_concoction === 1
              ? 'Racik'
              : '',
            quantity: drug?.quantity ? Number(drug?.quantity) : 0,
            instruction: drug?.instructions || '',
            stock: drug?.item_detail?.stock?.actual_qty || '',
            isConcoction: drug?.is_concoction === 1,
            concoctionItems:
              drug?.concoction_items?.length > 0
                ? drug?.concoction_items?.map((item) => ({
                    itemName: item?.item_detail?.item_name,
                    name: item?.name,
                    item: item?.item,
                    quantity: item?.quantity ? Number(item?.quantity) : 0,
                    stock: item?.item_detail?.stock?.actual_qty || '',
                    unit: item?.unit || '',
                  }))
                : '',
          }));
          state.formDrugRecipe.isEdit = true;
        }
      }
    );
    builder.addCase(
      resolveGetDetailDrugRecipe.rejected,
      (state, { payload }: any) => {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = false;
        state.formDrugRecipe.isEdit = false;
        state.formDrugRecipe.isError = true;
        state.formDrugRecipe.errorMessage =
          payload?.message || 'Gagal Mendapatkan Resep Obat!';
      }
    );

    // Get Detail Medical Support
    builder.addCase(resolveGetDetailMedicalSupport.pending, (state) => {
      state.formMedicalSupport.isLoading = true;
      state.formMedicalSupport.isSuccess = false;
      state.formMedicalSupport.isError = false;
      state.formMedicalSupport.isEdit = false;
    });
    builder.addCase(
      resolveGetDetailMedicalSupport.fulfilled,
      (state, { payload }) => {
        state.formMedicalSupport.isLoading = false;
        state.formMedicalSupport.isSuccess = false;
        state.formMedicalSupport.isError = false;

        const data = payload?.data?.message;
        if (data && data[0]) {
          const dataItem = data[0];
          state.formMedicalSupport.hasMedicalSupport =
            dataItem.has_list === 1 ? 'yes' : 'no';
          state.formMedicalSupport.medicalSupport =
            dataItem.medical_support_items?.map((item) => ({
              medicalSupport: {
                id: item?.name,
                name: item?.laboratory_examination_detail?.name,
                item_name: item?.laboratory_examination_detail?.item_name,
                item_code: item?.laboratory_examination_detail?.item_code,
                item_group: item?.laboratory_examination_detail?.item_group,
              },
              qty: item?.quantity ? Number(item?.quantity) : 1,
            }));
          state.formMedicalSupport.id = dataItem.name;
          state.formMedicalSupport.isEdit = true;
        }
      }
    );
    builder.addCase(
      resolveGetDetailMedicalSupport.rejected,
      (state, { payload }: any) => {
        state.formMedicalSupport.isLoading = false;
        state.formMedicalSupport.isSuccess = false;
        state.formMedicalSupport.isEdit = false;
        state.formMedicalSupport.isError = true;
        state.formMedicalSupport.errorMessage =
          payload?.message || 'Gagal Mendapatkan Penunjang Medis!';
      }
    );

    // Get Detail Recommendation Letter
    builder.addCase(resolveGetDetailRecommendationLetter.pending, (state) => {
      state.formRecommendationLetter.isLoading = true;
      state.formRecommendationLetter.isSuccess = false;
      state.formRecommendationLetter.isError = false;
      state.formRecommendationLetter.isEdit = false;
    });
    builder.addCase(
      resolveGetDetailRecommendationLetter.fulfilled,
      (state, { payload }) => {
        state.formRecommendationLetter.isLoading = false;
        state.formRecommendationLetter.isSuccess = false;
        state.formRecommendationLetter.isError = false;

        const data = payload?.data?.message;
        if (data && data[0]) {
          const dataItem = data[0];
          state.formRecommendationLetter.detailRefer = {
            hasDetailRefer: dataItem?.has_refer_out === 1 ? 'yes' : 'no',
            hospital: dataItem?.hostpital_detail || '',
            facility: dataItem?.health_facilities || '',
            reference: dataItem?.reference_type || '',
          };
          state.formRecommendationLetter.detailCertificate = {
            hasDetailCertificate:
              dataItem?.has_medical_certificate === 1 ? 'yes' : 'no',
            startDate: dataItem?.medical_certificate_start_date || '',
            endDate: dataItem?.medical_certificate_end_date || '',
            period: dataItem?.medical_certificate_period || 0,
          };
          state.formRecommendationLetter.detailDocument = {
            hasDetailDocument: dataItem?.has_document === 1 ? 'yes' : 'no',
          };
          state.formRecommendationLetter.docname =
            dataItem?.documents[0]?.file_name;
          state.formRecommendationLetter.documents = dataItem?.documents;
          state.formRecommendationLetter.id = dataItem?.name;
          state.formRecommendationLetter.isEdit = true;
        }
      }
    );
    builder.addCase(
      resolveGetDetailRecommendationLetter.rejected,
      (state, { payload }: any) => {
        state.formRecommendationLetter.isLoading = false;
        state.formRecommendationLetter.isSuccess = false;
        state.formRecommendationLetter.isEdit = false;
        state.formRecommendationLetter.isError = true;
        state.formRecommendationLetter.errorMessage =
          payload?.message || 'Gagal Mendapatkan Surat Rekomendasi!';
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

    // Post Data Drug Recipe
    builder.addCase(resolvePostDrugRecipe.pending, (state) => {
      state.formDrugRecipe.isLoading = true;
      state.formDrugRecipe.isSuccess = false;
      state.formDrugRecipe.isError = false;
    });
    builder.addCase(resolvePostDrugRecipe.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = true;
        state.formDrugRecipe.isError = false;
      } else {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = false;
        state.formDrugRecipe.isError = true;
        state.formDrugRecipe.errorMessage = 'Gagal Menambahkan Resep Obat!';
      }
    });
    builder.addCase(
      resolvePostDrugRecipe.rejected,
      (state, { payload }: any) => {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = false;
        state.formDrugRecipe.isError = true;
        state.formDrugRecipe.errorMessage =
          payload?.message || 'Gagal Menambahkan Resep Obat!';
      }
    );

    // Post Data Medical Support
    builder.addCase(resolvePostMedicalSupport.pending, (state) => {
      state.formMedicalSupport.isLoading = true;
      state.formMedicalSupport.isSuccess = false;
      state.formMedicalSupport.isError = false;
    });
    builder.addCase(
      resolvePostMedicalSupport.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formMedicalSupport.isLoading = false;
          state.formMedicalSupport.isSuccess = true;
          state.formMedicalSupport.isError = false;
        } else {
          state.formMedicalSupport.isLoading = false;
          state.formMedicalSupport.isSuccess = false;
          state.formMedicalSupport.isError = true;
          state.formMedicalSupport.errorMessage =
            'Gagal Menambahkan Penunjang Medis!';
        }
      }
    );
    builder.addCase(
      resolvePostMedicalSupport.rejected,
      (state, { payload }: any) => {
        state.formMedicalSupport.isLoading = false;
        state.formMedicalSupport.isSuccess = false;
        state.formMedicalSupport.isError = true;
        state.formMedicalSupport.errorMessage =
          payload?.message || 'Gagal Menambahkan Penunjang Medis!';
      }
    );

    // Post Data Recommendation Letter
    builder.addCase(resolvePostRecommendationLetter.pending, (state) => {
      state.formRecommendationLetter.isLoading = true;
      state.formRecommendationLetter.isCreateSuccess = false;
      state.formRecommendationLetter.isError = false;
    });
    builder.addCase(
      resolvePostRecommendationLetter.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formRecommendationLetter.isLoading = false;
          state.formRecommendationLetter.isCreateSuccess = true;
          state.formRecommendationLetter.isError = false;
          state.formRecommendationLetter.docname = payload.data?.data?.name;
        } else {
          state.formRecommendationLetter.isLoading = false;
          state.formRecommendationLetter.isCreateSuccess = false;
          state.formRecommendationLetter.isError = true;
          state.formRecommendationLetter.errorMessage =
            'Gagal Menambahkan Surat Rekomendasi!';
        }
      }
    );
    builder.addCase(
      resolvePostRecommendationLetter.rejected,
      (state, { payload }: any) => {
        state.formRecommendationLetter.isLoading = false;
        state.formRecommendationLetter.isCreateSuccess = false;
        state.formRecommendationLetter.isError = true;
        state.formRecommendationLetter.errorMessage =
          payload?.message || 'Gagal Menambahkan Surat Rekomendasi!';
      }
    );

    // Post Data Recommendation Letter
    builder.addCase(resolveUploadDocument.pending, (state) => {
      state.formRecommendationLetter.isLoading = true;
      state.formRecommendationLetter.isSuccess = false;
      state.formRecommendationLetter.isError = false;
    });
    builder.addCase(resolveUploadDocument.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formRecommendationLetter.isLoading = false;
        state.formRecommendationLetter.isSuccess = true;
        state.formRecommendationLetter.isError = false;
      } else {
        state.formRecommendationLetter.isLoading = false;
        state.formRecommendationLetter.isSuccess = false;
        state.formRecommendationLetter.isError = true;
        state.formRecommendationLetter.errorMessage = 'Gagal Upload Dokumen!';
      }
    });
    builder.addCase(
      resolveUploadDocument.rejected,
      (state, { payload }: any) => {
        state.formRecommendationLetter.isLoading = false;
        state.formRecommendationLetter.isSuccess = false;
        state.formRecommendationLetter.isError = true;
        state.formRecommendationLetter.errorMessage =
          payload?.message || 'Gagal Upload Dokumen!';
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

    // Put Data Procedure
    builder.addCase(resolvePutProcedure.pending, (state) => {
      state.formProcedure.isLoading = true;
      state.formProcedure.isSuccess = false;
      state.formProcedure.isError = false;
    });
    builder.addCase(resolvePutProcedure.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = true;
        state.formProcedure.isError = false;
      } else {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = false;
        state.formProcedure.isError = true;
        state.formProcedure.errorMessage = 'Gagal Update Tindakan!';
      }
    });
    builder.addCase(resolvePutProcedure.rejected, (state, { payload }: any) => {
      state.formProcedure.isLoading = false;
      state.formProcedure.isSuccess = false;
      state.formProcedure.isError = true;
      state.formProcedure.errorMessage =
        payload?.message || 'Gagal Update Tindakan!';
    });

    // Put Data Drug Recipe
    builder.addCase(resolvePutDrugRecipe.pending, (state) => {
      state.formDrugRecipe.isLoading = true;
      state.formDrugRecipe.isSuccess = false;
      state.formDrugRecipe.isError = false;
    });
    builder.addCase(resolvePutDrugRecipe.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = true;
        state.formDrugRecipe.isError = false;
      } else {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = false;
        state.formDrugRecipe.isError = true;
        state.formDrugRecipe.errorMessage = 'Gagal Update Resep Obat!';
      }
    });
    builder.addCase(
      resolvePutDrugRecipe.rejected,
      (state, { payload }: any) => {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = false;
        state.formDrugRecipe.isError = true;
        state.formDrugRecipe.errorMessage =
          payload?.message || 'Gagal Update Resep Obat!';
      }
    );

    // Put Data Medical Support
    builder.addCase(resolvePutMedicalSupport.pending, (state) => {
      state.formMedicalSupport.isLoading = true;
      state.formMedicalSupport.isSuccess = false;
      state.formMedicalSupport.isError = false;
    });
    builder.addCase(
      resolvePutMedicalSupport.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formMedicalSupport.isLoading = false;
          state.formMedicalSupport.isSuccess = true;
          state.formMedicalSupport.isError = false;
        } else {
          state.formMedicalSupport.isLoading = false;
          state.formMedicalSupport.isSuccess = false;
          state.formMedicalSupport.isError = true;
          state.formMedicalSupport.errorMessage =
            'Gagal Update Penunjang Medis!';
        }
      }
    );
    builder.addCase(
      resolvePutMedicalSupport.rejected,
      (state, { payload }: any) => {
        state.formMedicalSupport.isLoading = false;
        state.formMedicalSupport.isSuccess = false;
        state.formMedicalSupport.isError = true;
        state.formMedicalSupport.errorMessage =
          payload?.message || 'Gagal Update Penunjang Medis!';
      }
    );

    // Put Data Medical Support
    builder.addCase(resolvePutRecommendationLetter.pending, (state) => {
      state.formRecommendationLetter.isLoading = true;
      state.formRecommendationLetter.isCreateSuccess = false;
      state.formRecommendationLetter.isError = false;
    });
    builder.addCase(
      resolvePutRecommendationLetter.fulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.formRecommendationLetter.isLoading = false;
          state.formRecommendationLetter.isCreateSuccess = true;
          state.formRecommendationLetter.isError = false;
          state.formRecommendationLetter.docname = payload.data?.data?.name;
        } else {
          state.formRecommendationLetter.isLoading = false;
          state.formRecommendationLetter.isCreateSuccess = false;
          state.formRecommendationLetter.isError = true;
          state.formRecommendationLetter.errorMessage =
            'Gagal Update Surat Rekomendasi!';
        }
      }
    );
    builder.addCase(
      resolvePutRecommendationLetter.rejected,
      (state, { payload }: any) => {
        state.formRecommendationLetter.isLoading = false;
        state.formRecommendationLetter.isCreateSuccess = false;
        state.formRecommendationLetter.isError = true;
        state.formRecommendationLetter.errorMessage =
          payload?.message || 'Gagal Update Surat Rekomendasi!';
      }
    );

    // Put Data Service Transaction
    builder.addCase(resolvePutServiceTransaction.pending, (state) => {
      state.modalClinicOutpatient.isLoading = true;
      state.modalClinicOutpatient.isSuccess = false;
      state.modalClinicOutpatient.isError = false;
    });
    builder.addCase(resolvePutServiceTransaction.fulfilled, (state) => {
      state.modalClinicOutpatient.isLoading = false;
      state.modalClinicOutpatient.isSuccess = true;
      state.modalClinicOutpatient.isError = false;
    });
    builder.addCase(resolvePutServiceTransaction.rejected, (state) => {
      state.modalClinicOutpatient.isLoading = false;
      state.modalClinicOutpatient.isSuccess = false;
      state.modalClinicOutpatient.isError = true;
    });

    // Post Data Cancel Transaction
    builder.addCase(resolvePostCancelTransaction.pending, (state) => {
      state.modalClinicOutpatient.isLoading = true;
      state.modalClinicOutpatient.isSuccess = false;
      state.modalClinicOutpatient.isError = false;
    });
    builder.addCase(resolvePostCancelTransaction.fulfilled, (state) => {
      state.modalClinicOutpatient.isLoading = false;
      state.modalClinicOutpatient.isSuccess = true;
      state.modalClinicOutpatient.isError = false;
    });
    builder.addCase(resolvePostCancelTransaction.rejected, (state) => {
      state.modalClinicOutpatient.isLoading = false;
      state.modalClinicOutpatient.isSuccess = false;
      state.modalClinicOutpatient.isError = true;
    });

    // Delete Data Drug Recipe
    builder.addCase(resolveDeleteDrugRecipe.pending, (state) => {
      state.formDrugRecipe.isLoading = true;
      state.formDrugRecipe.isSuccess = false;
      state.formDrugRecipe.isError = false;
    });
    builder.addCase(resolveDeleteDrugRecipe.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = true;
        state.formDrugRecipe.isError = false;
      } else {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = false;
        state.formDrugRecipe.isError = true;
        state.formDrugRecipe.errorMessage = 'Gagal Hapus Resep Obat!';
      }
    });
    builder.addCase(
      resolveDeleteDrugRecipe.rejected,
      (state, { payload }: any) => {
        state.formDrugRecipe.isLoading = false;
        state.formDrugRecipe.isSuccess = false;
        state.formDrugRecipe.isError = true;
        state.formDrugRecipe.errorMessage =
          payload?.message || 'Gagal Hapus Resep Obat!';
      }
    );

    // Delete Data Procedure
    builder.addCase(resolveDeleteProcedure.pending, (state) => {
      state.formProcedure.isLoading = true;
      state.formProcedure.isSuccess = false;
      state.formProcedure.isError = false;
    });
    builder.addCase(resolveDeleteProcedure.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = true;
        state.formProcedure.isError = false;
      } else {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = false;
        state.formProcedure.isError = true;
        state.formProcedure.errorMessage = 'Gagal Hapus Tindakan!';
      }
    });
    builder.addCase(
      resolveDeleteProcedure.rejected,
      (state, { payload }: any) => {
        state.formProcedure.isLoading = false;
        state.formProcedure.isSuccess = false;
        state.formProcedure.isError = true;
        state.formProcedure.errorMessage =
          payload?.message || 'Gagal Hapus Tindakan!';
      }
    );
  },
  reducers: {
    clearStateClinicOutpatient: () => initialState,
    clearParams: (state) => {
      state.params = initialState.params;
    },
    clearIntegratedNotes: (state: any) => {
      state.integratedNotes = initialState.integratedNotes;
      state.integratedNotesParams = initialState.integratedNotesParams;
    },
    clearModalClinicOutpatient: (state) => {
      state.modalClinicOutpatient = initialState.modalClinicOutpatient;
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
    setFormMedicalSupport: (state: any, { payload }) => {
      state.formMedicalSupport[payload.section][payload.label] = payload.value;
    },
    setFormRecommendationLetter: (state: any, { payload }) => {
      state.formRecommendationLetter[payload.section][payload.label] =
        payload.value;
    },
    setFormCancelReason: (state, { payload }) => {
      state.formCancelReason[payload.name] = payload.value;
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
    // --
    setAddProcedureForm: (state: any, { payload }) => {
      state.formProcedure.procedure.push(payload);
    },
    setRemoveProcedureForm: (state, { payload }) => {
      state.formProcedure.procedure.splice(payload, 1);
      state.formProcedure.procedureService.splice(payload, 1);
    },
    setProcedureItem: (state, { payload }) => {
      state.formProcedure.procedure[payload.index][payload.label] =
        payload.value;
    },
    // --
    setProcedureService: (state, { payload }) => {
      state.formProcedure.procedureService[payload.index] = payload.value;
    },
    setAddMedicalSupportForm: (state: any, { payload }) => {
      state.formMedicalSupport.medicalSupport.push(payload);
    },
    setRemoveMedicalSupportForm: (state, { payload }) => {
      state.formMedicalSupport.medicalSupport.splice(payload, 1);
    },
    setMedicalSupportItem: (state, { payload }) => {
      state.formMedicalSupport.medicalSupport[payload.index][payload.label] =
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
    setModalDrugRecipe: (state, { payload }) => {
      state.formDrugRecipe[payload.field] = payload.value;
    },
    setModalMedicalSupport: (state, { payload }) => {
      state.formMedicalSupport[payload.field] = payload.value;
    },
    setModalRecommendationLetter: (state, { payload }) => {
      state.formRecommendationLetter[payload.field] = payload.value;
    },
    setModalIntegratedNotes: (state, { payload }) => {
      state.integratedNotes[payload.field] = payload.value;
    },
    setModalClinicOutpatient: (state, { payload }) => {
      state.modalClinicOutpatient[payload.field] = payload.value;
    },
  },
});

export const {
  clearStateClinicOutpatient,
  clearParams,
  clearIntegratedNotes,
  clearModalClinicOutpatient,
  clearFormCancelReason,
  setParams,
  setFormIntegratedNotesParams,
  setFormCheckup,
  setFormSoap,
  setFormProcedure,
  setFormMedicalSupport,
  setFormRecommendationLetter,
  setFormCancelReason,
  setAddAssessmentForm,
  setRemoveAssessmentForm,
  setAssessmentItem,
  setAddProcedureForm,
  setRemoveProcedureForm,
  setProcedureItem,
  setProcedureService,
  setAddMedicalSupportForm,
  setRemoveMedicalSupportForm,
  setMedicalSupportItem,
  setModal,
  setModalCheckup,
  setModalProcedure,
  setModalDrugRecipe,
  setModalMedicalSupport,
  setModalRecommendationLetter,
  setModalIntegratedNotes,
  setModalClinicOutpatient,
} = clinicOutpatientSlice.actions;

export default clinicOutpatientSlice.reducer;
