import type { CancelReasonType } from '@/types/MasterTransaction/reason';

export interface IMedpointOrderState {
  params: {
    search: string;
    limit: number;
    page: number;
    totalData: number;
    totalPage: number;
    status: string;
    startDate: string;
    endDate: string;
    serviceType: string;
  };
  metadata: {
    per_page: number;
    page: number;
    total_row: number;
    total_page: number;
  };
  medpointOrder: {
    data: [];
    detail: any;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  checkupResult: {
    isLoading: boolean;
    isError: boolean;
    data: string[];
  };
  updateStatus: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    confirmation: boolean;
    detail: boolean;
    kipi: boolean;
    transactionId: string;
    transactionIds: string[];
    status: string;
  };
  listCancelReason: CancelReasonType;
  listObservationReason: CancelReasonType;
  formCancelReason: {
    coding: any;
    text: string;
  };
  formObservationReason: {
    have_complaint?: boolean;
    reason: any[];
  };
}

interface FormSoapAssessment {
  assessment: {
    additionalProp?: string;
    code?: string;
    system?: string;
    display?: string;
  };
  case_category?: string;
  case_type?: string;
  created_at?: string;
  description?: string;
  id?: string;
  transaction_detail_id?: number;
  transaction_id?: string;
  updated_at?: string;
  user_type: string;
}

interface FormProcedureAssessment {
  description: string;
}

export interface IMedpointTreatmentState {
  medpointDetail: {
    data: [];
    detail: any;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  moduleIcd9: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleIcd10: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleImmunizationCategory: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleAssessment: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  formCheckup: {
    isLoading: boolean;
    isPutLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isEdit: boolean;
    successMessage: string;
    errorMessage: string;
    objective: {
      allergy_history: string;
      bmi: number | string;
      bmi_result: string;
      description: string;
      diastolic: number | string;
      heart_rate: number | string;
      height: number | string;
      pulse_rate: number | string;
      respiration_rate: number | string;
      systolic: number | string;
      temperature: number | string;
      weight: number | string;
    };
    soap: {
      assessment: string;
      family_health_history: string;
      medication_history: string;
      patient_health_history: string;
      psychosocial_spiritual: string;
      nurses_note: string;
      other: string;
    };
  };
  formAssessment: {
    assessment: {
      code: string;
      system: string;
      display: string;
    };
    case_category: string;
    case_type: string;
    user_type: string;
  };
  formSoap: {
    isLoading: boolean;
    isPutLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isEdit: boolean;
    successMessage: string;
    errorMessage: string;
    assessment: FormSoapAssessment[];
    assessmentNurse: any[];
    objective: {
      id: string;
      allergy_history: string;
      bmi: number | string;
      bmi_result: string;
      description: string;
      diastolic: number | string;
      heart_rate: number | string;
      height: number | string;
      pulse_rate: number | string;
      respiration_rate: number | string;
      systolic: number | string;
      temperature: number | string;
      weight: number | string;
    };
    education: {
      id: string;
      complications: boolean;
      disease_explanation: boolean;
      examination_results: boolean;
      medical_action: boolean;
      side_effects_risks: boolean;
      other_details: string;
    };
    planning: {
      id: string;
      doctors_note: string;
      nurses_note: string;
      description: string;
    };
    subjective: {
      id: string;
      family_health_history: string;
      doctors_note: string;
      medication_history: string;
      patient_health_history: string;
      psychosocial_spiritual: string;
      description: string;
    };
  };
  formProcedureItem: {
    description: string;
    dosage_sequence: number | string;
    dosage_sequence_number: number | string;
    expiration_date: string;
    is_booster: boolean;
    is_protektif: boolean;
    lot_number: string;
    titer_result: string;
    procedure: any;
    vaccine: any;
    vaccine_category: any;
  };
  formProcedure: {
    isLoading: boolean;
    isPutLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    successMessage: string;
    errorMessage: string;
    procedure: FormProcedureAssessment[];
  };
  integratedNotes: {
    isOpen: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    successMessage: string;
    errorMessage: string;
    data: any[];
    metadata: {
      page: number;
      size: number;
      totalData: number;
      totalPage: number;
    };
  };
  integratedNotesParams: {
    page: number;
    limit: number;
  };
}
