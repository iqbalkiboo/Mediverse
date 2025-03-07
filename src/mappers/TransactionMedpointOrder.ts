import { modifyServiceType } from '@/utils/transactions';

import type {
  MedpointDetail,
  MedpointOrderItemData,
} from '@/src/types/MedpointOrder';

export const getListTransactionMedpointOrder = (
  data: MedpointOrderItemData[]
) => {
  return data.map((item: MedpointOrderItemData) => {
    return {
      item: {
        amount: item.amount,
        created_date: item.created_at,
        doctor_name: item.doctor_name,
        id: item.id,
        insurance_type: item.insurance_type,
        item_id: item.item_id,
        item_image: item.item_image,
        item_total: item.item_total,
        item_type: item.item_type,
        payment_provider: item.payment_provider,
        provider_id: item.provider_id,
        provider_type: item.provider_type,
        service_type: modifyServiceType(item.service_type),
        spesiality: item.spesiality,
        payment_status: item.status,
        user_id: item.user_id,
        name_patient: item.user_name,
        phone_number_patient: item.user_phone,
        payment_limit: item.expired_at || null,
      },
    };
  });
};

export const getDetail = (data: MedpointDetail) => {
  const item = data?.item[0];
  return {
    title: '-',
    transaction: {
      id: data?.transaction?.id,
      status: data?.transaction?.status,
      created_at: data?.transaction?.created_at,
      expired_at: data?.transaction?.expired_at,
    },
    consultation: {
      schedule_date: data?.consultation?.schedule_date,
      schedule_time: data?.consultation?.schedule_time,
      result: data?.consultation?.result ?? '-',
    },
    doctor: {
      doctor_id: data?.doctor?.doctor_id ?? '-',
      doctor_name: data?.doctor?.doctor_name ?? '-',
      speciality: data?.doctor?.speciality ?? '-',
      clinic_name: data?.doctor?.clinic_name ?? '-',
      service_type: data?.doctor?.service_type ?? '-',
    },
    payment: {
      payment_id: data?.payment?.payment_id,
      payment_type: data?.payment?.payment_type,
      total_amount: data?.payment?.total_amount,
      total_promo: data?.payment?.total_promo ?? 0,
      total_delivery_amount: data?.payment?.total_delivery_amount ?? 0,
      insurance_type: data?.payment?.insurance_type,
    },
    user: {
      id: data?.user?.id,
      user_name: data?.user?.user_name,
      born_date: data?.user?.born_date,
      sex: data?.user?.sex,
    },
    item: {
      provider_name: item?.provider_name ?? '-',
      provider_type: item?.provider_type ?? '-',
    },
  };
};
