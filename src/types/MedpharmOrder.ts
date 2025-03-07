export type MedpharmOrderDetailData = {
  consultation: {},
  doctor: {},
  item: MedpharmOrderItemData[],
  payment: MedpharmOrderPaymentData,
  transaction: MedpharmOrderTransactionData,
  user: MedpharmOrderUserData,
  delivery: MedpharmOrderDeliveryData,
  transaction_complaint: MedpharmOrderComplaintData,
}

export type MedpharmOrderTransactionData = {
  id: string,
  status: string,
  created_at: string,
  expired_at: string,
}

export type MedpharmOrderPaymentData = {
  payment_id: number,
  payment_name: string,
  payment_type: string,
  total_amount: number,
  total_promo: number,
  total_delivery_amount: number,
  total_price: number,
}

export type MedpharmOrderUserData = {
  id: string,
  user_name: string,
  born_date: string,
  sex: string,
}

export type MedpharmOrderItemData = {
  item_id: string,
  item_qty: number,
  outlet_id: string
  item_name: string,
  item_type: string,
  item_image: string,
  item_amount: number,
  delivery_id: string,
  provider_id: string,
  item_variant: string,
  provider_name: string,
  provider_type: string,
  provider_address: string,
  transaction_detail_id: string,
  outlet_name: string
}


export type MedpharmOrderDeliveryData = {
  delivery_id: string,
  delivery_provider: string,
  delivery_service_type: string,
  delivery_recipient_name: string,
  delivery_destination_address: string,
};

export type MedpharmOrderComplaintData = {
  attachment_url: any,
  complaint: string,
  notes: string,
}
