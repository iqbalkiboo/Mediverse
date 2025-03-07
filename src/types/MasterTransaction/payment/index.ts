export interface PaymentItemData {
  appointment_queue: {
    name: number;
    queue_type: string;
    queue_code: string;
    queue_number: string;
    queue_name: number;
    appointment_status: string;
    type_registration: string;
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

export interface PaymentDetailData {
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
      discount_percentage: number;
      base_price_list_rate: number;
      discount_amount: number;
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

export interface IPaymentState {
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
    page: number;
    limit: number;
    totalPage: number;
    totalData: number;
  };
  payments: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data: PaymentItemData[];
  };
  payment: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    data: PaymentDetailData | null;
  };
  paymentForm: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    data: PaymentDetailData | null;
  };
  formSalesOrder: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
  modalPayment: {
    transactionId: string;
    status: string;
    modalConfirmation: boolean;
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
  };
  listModePayment: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
  listBankAccount: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
}
