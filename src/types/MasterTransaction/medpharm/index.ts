export type IMedpharmState = {
  idMedpharm: number;
  transactionDetailIds: string[];
  cardOrder: {
    showAll: string;
    showInformation: string;
  };
  rejectReason: {
    reason: string;
    otherReason: string;
  };
  medpharms: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isFetching: false;
    isSearching: boolean;
    errorMessage: string;
    data: any;
    metadata: {
      page: number;
      size: number;
      totalPage: number;
      totalData: number;
    };
  };
  medpharm: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
  medpharmConsultation: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
  complainReasons: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    data: any;
  };
  orderTracking: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    isSuccess: boolean;
    data: any;
  };
  modalUpdateStatusMedpharm: {
    flag: string;
    isConfirmation: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
  };
  modalUpdateStatusComplain: {
    flag: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
    isOpenApprove: boolean;
    isOpenReject: boolean;
  };
  params: {
    page: number;
    limit: number;
    search: string;
    status: any;
    endDate: string;
    startDate: string;
  };
};

export type IMedpharmItem = {
  id: string;
  bill: number;
  status: string;
  amount: number;
  item_id: string;
  user_id: string;
  item_name: string;
  item_type: string;
  user_name: string;
  item_total: number;
  user_phone: string;
  created_at: string;
  item_image: string;
  expired_at: string;
  delivery_id: string;
  item_variant: string;
  provider_name: string;
  provider_type: string;
  delivery_type: string;
  payment_provider: string;
  delivery_address: string;
  provider_id: string | number;
  transaction_detail_ids: string[];
  recipient_metadata: IDetailMedpharmUserData;
};

export type IGetListMedpharmParams = {
  page: number;
  limit: number;
  search: string;
  status: string;
  endDate: string;
  startDate: string;
  providerType: string;
};

export type IDetailMedpharm = {
  consultation_id: string;
  is_recipe: boolean;
  consultation: {};
  doctor: {};
  item: IDetailMedpharmItemData[];
  payment: IDetailMedpharmPaymentData;
  payment_per_outlet: IDetailMedpharmPaymentPerOutletData[];
  transaction: IDetailMedpharmTransactionData;
  user: IDetailMedpharmUserData;
  delivery: IDetailMedpharmDeliveryData;
  transaction_complaint: IDetailMedpharmTransactionComplaintData;
  recipient_metadata: IDetailMedpharmUserData;
};

export type IDetailMedpharmItemData = {
  delivery: any;
  item_id: string;
  item_qty: number;
  outlet_id: string;
  item_name: string;
  item_type: string;
  item_image: string;
  outlet_name: string;
  item_amount: number;
  delivery_id: string;
  provider_id: string;
  item_variant: string;
  provider_name: string;
  provider_type: string;
  provider_address: any;
  user_platform_fee: number;
  selling_factor_fee: number;
  transaction_detail_id: string;
  transaction_detail_status: string;
  recipe_id: string;
};

export type IDetailMedpharmPaymentData = {
  payment_id: number;
  total_promo: number;
  total_price: number;
  payment_name: string;
  payment_type: string;
  total_amount: number;
  platform_fee: number;
  total_delivery_amount: number;
};

export type IDetailMedpharmPaymentPerOutletData = {
  outlet_id: string;
  outlet_name: string;
  user_platform_fee: number;
  selling_factor_fee: number;
  total_amount: number;
  total_delivery_amount: number;
  total_price: number;
  total_promo: number;
};

export type IDetailMedpharmTransactionData = {
  id: string;
  status: string;
  created_at: string;
  expired_at: string;
  is_multiple_outlet: boolean;
};

export type IDetailMedpharmUserData = {
  id: string;
  sex: string;
  user_name: string;
  born_date: string;
  full_name?: string;
  email?: string;
  no_telp?: string;
  address?: string;
  username?: string;
  phone_number?: string;
};

export type IDetailMedpharmDeliveryData = {
  delivery_id: string;
  delivery_provider: string;
  delivery_service_type: string;
  delivery_recipient_name: string;
  delivery_destination_address: string;
};

export type IDetailMedpharmTransactionComplaintData = {
  notes: string;
  complaint: string;
  attachment_url: any;
};

export type IGetDetailMedpharmParams = {
  id: string;
  providerType: string;
};

export type IComplainReasonItem = {
  id: any;
  title: string;
};

export type IPatchStatusMedpharmPayload = {
  status: string;
  transactionDetailIds?: string[];
};
