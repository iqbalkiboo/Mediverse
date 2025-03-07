export interface TransactionItemData {
  appointment_queue: {
    name: number;
    queue_type: string;
    queue_code: string;
    queue_number: string;
    queue_name: number;
    appointment_status: string;
  };
  service_transaction: {
    name: number;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    patient: string;
    doctor: string;
    service_schedule: string;
    sales_order: {
      name: string;
      customer: string;
      transaction_date: string;
      status: string;
      items: string[];
    };
    payor: string;
    service_transaction_status: string;
    is_prescription: number;
    is_lab: number;
    doctype: string;
  };
  patient: {
    patient_name: string;
  };
}

export interface TransactionDetailData {
  sales_order: {
    name: string;
    customer: string;
    transaction_date: string;
    delivery_date: string;
    currency: string;
    company: string;
    selling_price_list: string;
    set_warehouse: string;
    status: string;
    grand_total: number;
    items: {
      item_code: string;
      item_name: string;
      qty: number;
      rate: number;
      amount: number;
    }[];
  };
  patient: {
    name: string;
    patient_name: string;
    no_identifier: string;
    dob: string;
    patient_type: string;
  };
  service_transaction: {
    payor: string;
  };
}

export interface FormSoapAssessment {
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

export interface FormProcedureAssessment {
  description: string;
}

export interface ITransactionState {
  transactionDetail: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    data: TransactionDetailData | null;
  };
  moduleAssessment: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleCancelReason: {
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
  moduleIcd9: {
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
  moduleObservationReason: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleLaboratory: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleReferralHospital: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleProcedure: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleProcedureItem: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  moduleOtherItem: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
  modulePayor: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any[];
  };
}
