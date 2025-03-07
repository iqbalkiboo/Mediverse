export type MedevoOrderData = {
  item: MedevoOrderItemData,
};

export type MedevoOrderItemData = {
  amount: number,
  clinic_name: string,
  created_at: string,
  expired_at: string,
  doctor_name: string,
  id: string,
  insurance_type: string,
  item_id: string,
  item_image: string,
  total: number,
  type: string,
  payment_provider: string,
  provider_address: string,
  provider_id: string,
  provider_name: string,
  provider_type: string,
  service_type: string,
  spesiality: string,
  status: string,
  user_id: string,
  user_name: string,
  user_phone: string,
}

export type MedEvoDetailItem = {
  item_id: string,
  item_type: string,
  item_name: string,
  item_qty: number,
  item_image: string,
  item_amount: number,
  item_variant: string,
  provider_id: string,
  provider_name: string,
  provider_type: string,
}

export type MedevoDetail = {
  transaction: {
    id: string,
    status: string,
    created_at: string,
    expired_at: string
  },
  consultation: {
    schedule_date: string,
    schedule_time: string,
    result: string
  },
  doctor: {
    doctor_id: string,
    doctor_name: string,
    speciality: string,
    rating: number,
    patient_count: number,
    review_count: number,
  },
  payment: {
    payment_id: string,
    payment_type: string,
    total_amount: number,
    total_promo: number,
    total_delivery_amount: number,
    insurance_type: string
  },
  user: {
    id: string,
    user_name: string,
    born_date: string,
    sex: string,
    illness: string,
  },
  item: [
    {
      item_id: string,
      item_type: string,
      item_name: string,
      item_qty: number,
      item_image: string,
      item_amount: number,
      item_variant: string,
      provider_id: string,
      provider_name: string,
      provider_type: string,
    }
  ],
}

