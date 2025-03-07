export interface MedpointOrderData {
  item: MedpointOrderItemData;
}

export interface MedpointOrderItemData {
  amount: number;
  bill: number;
  created_at: string;
  doctor_name: string;
  id: string;
  insurance_type: string;
  item_id: string;
  item_image: string;
  item_total: number;
  item_type: string;
  payment_provider: string;
  provider_id: string;
  provider_type: string;
  service_type: string;
  spesiality: string;
  status: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  expired_at?: string;
  updated_at?: string;
  transaction_detail_ids?: string[];
  reservation_id?: number;
  have_complaint?: boolean;
  recipient_metadata?: any;
}

export interface medPointItem {
  item_id: string;
  item_type: string;
  item_name: string;
  item_qty: number;
  item_image: string;
  item_amount: number;
  item_variant: string;
  provider_id: string;
  provider_name: string;
  provider_type: string;
  outlet_name: string;
  outlet_id: string;
  clinic_name: string;
  transaction_detail_status: string;
  service_type: string;
}

export interface doctors {
  doctor_id: string;
  doctor_name: string;
  speciality: string;
  clinic_name: string;
  service_type: string;
}

export interface consultation {
  schedule_date: string;
  schedule_time: string;
  consultation_duration: string;
  result: string;
  item_id: string;
}

export interface MedpointDetail {
  title: string;
  transaction: {
    id: string;
    slot_id: number;
    status: string;
    reservation_id: any;
    created_at: string;
    expired_at: string;
  };
  consultation: {
    schedule_date: string;
    schedule_time: string;
    consultation_duration: string;
    result: string;
  };
  consultations: consultation[];
  doctor: doctors;
  doctors: doctors[];
  payment: {
    payment_id: string;
    payment_type: string;
    total_amount: number;
    total_promo: number;
    total_price: number;
    total_delivery_amount: number;
    insurance_type: string;
  };
  user: {
    id: string;
    user_name: string;
    born_date: string;
    sex: string;
    allergy: string[];
    phone_number: string;
    emergency_phone_number: string;
  };
  recipient_metadata: {
    user_id: string;
    birth_date: string;
    full_name: string;
    gender: string;
    ktp_no: string;
    address: string;
  };
  item: medPointItem[];
}
