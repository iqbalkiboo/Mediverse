export type IMedevoState = {
  params: {
    page: number,
    limit: number,
    search: string,
    status: string,
    endDate: string,
    totalData: number,
    totalPage: number,
    startDate: string,
    serviceType: string,
  },
  medevos: {
    data: [],
    message: string,
    isError: boolean,
    isLoading: boolean,
    metadata: {
      page: number;
      perPage: number;
      totalRow: number;
      totalPage: number;
    },
  },
  medevo: {
    data: {},
    message: string,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
  },
};

export type MedevoItemData = {
  id: string,
  type: string,
  total: number,
  status: string,
  amount: number,
  item_id: string,
  user_id: string,
  user_name: string,
  user_phone: string,
  created_at: string,
  expired_at: string,
  item_image: string,
  spesiality: string,
  clinic_name: string,
  doctor_name: string,
  provider_id: string,
  service_type: string,
  provider_name: string,
  provider_type: string,
  payment_limit: number,
  insurance_type: string,
  payment_provider: string,
  provider_address: string,
};

export type MedevoDetail = {
  transaction: {
    id: string,
    status: string,
    created_at: string,
    expired_at: string,
  },
  consultation: {
    result: string,
    schedule_date: string,
    schedule_time: string,
  },
  doctor: {
    rating: number,
    doctor_id: string,
    speciality: string,
    doctor_name: string,
    review_count: number,
    patient_count: number,
  },
  payment: {
    payment_id: string,
    total_promo: number,
    payment_type: string,
    total_amount: number,
    insurance_type: string
    total_delivery_amount: number,
  },
  user: {
    id: string,
    sex: string,
    illness: string,
    user_name: string,
    born_date: string,
  },
  item: [
    {
      item_id: string,
      item_qty: number,
      item_type: string,
      item_name: string,
      item_image: string,
      provider_id: string,
      item_amount: number,
      item_variant: string,
      provider_name: string,
      provider_type: string,
    }
  ],
};

export type IGetListMedevoParams = {
  status: any,
  search: any,
  page: number,
  endDate: any,
  limit: number,
  startDate: any,
  serviceType: string,
  providerType: string,
};

export type IGetDetailMedevoParams = {
  id?: string,
  providerType: string,
};
