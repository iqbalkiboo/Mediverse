import {MedevoDetail, MedevoOrderItemData} from '@/src/types/MedevoOrder';
import {modifyServiceType} from '@/src/utils/transactions';

export const getListAllOrder = (data: MedevoOrderItemData[]) => {
  const result = data.map((item) => {
    return {
      item: {
        amount: item.amount,
        clinic_name: item.clinic_name,
        created_at: item.created_at,
        doctor_name: item.doctor_name,
        id: item.id,
        insurance_type: item.insurance_type,
        item_id: item.item_id,
        item_image: item.item_image,
        item_total: item.total,
        item_type: item.type,
        payment_provider: item.payment_provider,
        payment_limit: item.expired_at,
        provider_address: item.provider_address,
        provider_id: item.provider_id,
        provider_name: item.provider_name,
        provider_type: item.provider_type,
        service_type: modifyServiceType(item.service_type),
        spesiality: item.spesiality,
        status: item.status,
        user_id: item.user_id,
        user_name: item.user_name,
        phone_number_patient: item.user_phone,
      },
    };
  });

  return result;
};

export const getDetail = (data: MedevoDetail) => {
  const item = data?.item[0];
  return {
    transaction: {
      id: data?.transaction?.id,
      status: data?.transaction?.status,
      created_at: data?.transaction?.created_at,
      expired_at: data?.transaction?.expired_at,
    },
    consultation: {
      schedule_date: data?.consultation?.schedule_date,
      schedule_time: data?.consultation?.schedule_time,
      result: data.consultation?.result ?? '-',
    },
    doctor: {
      doctor_id: data?.doctor?.doctor_id,
      doctor_name: data?.doctor?.doctor_name,
      speciality: data?.doctor?.speciality,
      rating: data.doctor?.rating ?? 0,
      patient_count: data.doctor?.patient_count ?? 0,
      review_count: data.doctor?.review_count ?? 0,
    },
    payment: {
      payment_id: data?.payment?.payment_id,
      payment_type: data?.payment?.payment_type,
      total_amount: data?.payment?.total_amount,
      total_promo: data?.payment?.total_promo,
      total_delivery_amount: data?.payment?.total_delivery_amount,
      insurance_type: data?.payment?.insurance_type,
    },
    user: {
      id: data?.user?.id,
      user_name: data?.user?.user_name,
      born_date: data?.user?.born_date,
      sex: data?.user?.sex,
      illness: data.user?.illness ?? '-',
    },
    item: {
      provider_name: item?.provider_name,
    },
  };
};
