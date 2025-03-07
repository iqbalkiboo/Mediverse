import {MedpharmOrderDetailData} from '@/src/types/MedpharmOrder';

export const getListAllOrder = (data: any) => {
  const result = data.map((item) => {
    return {
      item: {
        id: item.id,
        item_id: item.item_id,
        item_name: item.item_name,
        item_image: item.item_image,
        item_total: item.item_total,
        item_variant: item.item_variant,
        name_patient: item.user_name,
        pharmacy: item.provider_name,
        delivery_id: item.delivery_id,
        delivery_address: item.delivery_address,
        delivery_type: item.delivery_type,
        provider_type: item.provider_type,
        payment_total: item.amount,
        payment_status: item.status,
        payment_limit: item.expired_at,
        created_date: item.created_at,
      },
    };
  });

  return result;
};

export const getDetailMedpharmOrder = (data: MedpharmOrderDetailData): MedpharmOrderDetailData => {
  const result = {
    consultation: {},
    doctor: {},
    item: data.item?.map((item) => {
      return {
        item_id: item.item_id,
        item_qty: item.item_qty,
        item_name: item.item_name,
        item_type: item.item_type,
        outlet_id: item.outlet_id,
        item_image: item.item_image,
        item_amount: item.item_amount,
        delivery_id: item.delivery_id,
        provider_id: item.provider_id,
        item_variant: item.item_variant,
        provider_name: item.provider_name,
        provider_type: item.provider_type,
        provider_address: item.provider_address ?? '-',
        transaction_detail_id: item.transaction_detail_id,
        outlet_name: item?.outlet_name ?? '-',
      };
    }),
    payment: {
      total_promo: data.payment?.total_promo ?? 0,
      total_price: data.payment?.total_price ?? 0,
      payment_id: data.payment?.payment_id,
      payment_name: data.payment?.payment_name,
      payment_type: data.payment?.payment_type,
      total_amount: data.payment?.total_amount,
      total_delivery_amount: data.payment?.total_delivery_amount ?? 0,
    },
    transaction: {
      created_at: data.transaction?.created_at,
      expired_at: data.transaction?.expired_at,
      id: data.transaction?.id,
      status: data.transaction?.status,
    },
    user: {
      id: data.user?.id,
      user_name: data.user?.user_name,
      born_date: data.user?.born_date,
      sex: data.user?.sex,
    },
    delivery: {
      delivery_id: data.delivery?.delivery_id,
      delivery_provider: data.delivery?.delivery_provider,
      delivery_service_type: data.delivery?.delivery_service_type,
      delivery_recipient_name: data.delivery?.delivery_recipient_name,
      delivery_destination_address: data.delivery?.delivery_destination_address,
    },
    transaction_complaint: {
      attachment_url: Array.isArray(data?.transaction_complaint?.attachment_url) ?
        data?.transaction_complaint?.attachment_url : [],
      complaint: data?.transaction_complaint?.complaint || '-',
      notes: data?.transaction_complaint?.notes || '-',
    },
  };

  return result;
};

export const getRejectReason = (data: any) => {
  const result = data.map((item) => {
    return {
      id: item?.id || '-',
      title: item?.title || '',
    };
  });

  return result;
};
