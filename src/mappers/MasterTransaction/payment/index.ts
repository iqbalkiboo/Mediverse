import type {
  PaymentDetailData,
  PaymentItemData,
} from '@/types/MasterTransaction/payment';

export const mapListPayment = (data: PaymentItemData[]) => {
  return data
    .map((item: PaymentItemData) => ({
      item: {
        created_date: item?.service_transaction?.creation,
        service_type:
          item?.appointment_queue.type_registration === 'Pembelian Langsung'
            ? 'Lain-Lain'
            : item?.appointment_queue?.queue_type,
        appointment_status: item?.appointment_queue?.appointment_status,
        queue_number: item?.appointment_queue?.queue_number,
        queue_code: item?.appointment_queue?.queue_code,
        queue_type: item?.appointment_queue?.queue_type,
        queue_name: item?.appointment_queue?.queue_name,
        patient: item?.service_transaction?.patient,
        patient_name: item?.patient?.patient_name,
        payor: item?.service_transaction?.payor || 'Umum',
        status: item?.service_transaction?.sales_order?.status || '',
        services: item?.service_transaction?.sales_order?.items.join(', '),
        service_status:
          item?.service_transaction.service_transaction_status || '',
        service_transaction_id: item?.service_transaction.name || '',
      },
    }))
    .sort((a, b) => a.item?.queue_name - b.item?.queue_name);
};

export const mapDetailPayment = (data: PaymentDetailData) => {
  return {
    sales_order: {
      name: data?.sales_order?.name,
      transaction_date: data?.sales_order?.transaction_date,
      company: data?.sales_order?.company,
      set_warehouse: data?.sales_order?.set_warehouse,
      status: data?.sales_order?.status,
    },
    patient: {
      name: data?.patient?.name,
      patient_name: data?.patient?.patient_name,
      no_identifier: data?.patient?.no_identifier,
      dob: data?.patient?.dob,
      patient_type: data?.patient?.patient_type,
    },
    payor: data?.service_transaction?.payor || 'Umum',
    items: data?.sales_order?.items?.map((item) => ({
      ...item,
      rate: item?.base_price_list_rate || 0,
      discount: item?.discount_percentage || 0,
      totalDiscount: item?.discount_amount || 0,
      status: data?.sales_order?.status || 0,
    })),
  };
};

export const mapDirectPayment = (
  customer,
  data,
  paymentMode,
  paidAmount,
  bankAccount,
  bankNumber
) => {
  const itemPayload = data?.map((item) => ({
    item_code: item.item_code,
    qty: item.qty,
    rate: item.rate - (item.totalDiscount || 0),
    amount: item.amount,
    discount_percentage: Number(item.discount),
    discount_amount: item.totalDiscount || 0,
  }));

  return {
    company: import.meta.env.VITE_APP_FRAPPE_COMPANY,
    customer: customer?.name,
    mode_of_payment: paymentMode,
    paid_amount: paidAmount,
    bank_account: bankAccount ? bankAccount : undefined,
    card_number: bankNumber ? bankNumber : undefined,
    items: itemPayload,
  };
};
