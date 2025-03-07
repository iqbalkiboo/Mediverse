import {isArray} from 'lodash';

import {modifyServiceType} from '@/utils/transactions';

import {
  MedevoDetail,
  MedevoItemData,
} from '@/src/types/MasterTransaction/medevo';

export const mapListMedevo = (data: MedevoItemData[]) => {
  const result = isArray(data) ? data?.map((item: MedevoItemData) => {
    return {
      item: {
        id: item.id || '-',
        type: item.type || '-',
        total: item.total || '-',
        amount: item.amount || '-',
        itemId: item.item_id || '-',
        userId: item.user_id || '-',
        userName: item.user_name || '-',
        userPhone: item.user_phone || '-',
        paymentStatus: item.status || '-',
        itemImage: item.item_image || '-',
        createdAt: item.created_at || '-',
        expiredAt: item.expired_at || '-',
        speciality: item.spesiality || '-',
        clinicName: item.clinic_name || '-',
        providerId: item.provider_id || '-',
        doctorName: item.doctor_name || '-',
        paymentLimit: item.expired_at || null,
        providerName: item.provider_name || '-',
        providerType: item.provider_type || '-',
        insuranceType: item.insurance_type || '-',
        paymentProvider: item.payment_provider || '-',
        providerAddress: item.provider_address || '-',
        serviceType: modifyServiceType(item.service_type) || '-',
      },
    };
  }): [];
  return result;
};

export const mapDetailMedevo = (data: MedevoDetail) => {
  const item = data?.item[0];
  return {
    transaction: {
      id: data?.transaction?.id || '-',
      status: data?.transaction?.status || '-',
      createdAt: data?.transaction?.created_at || '-',
      expiredAt: data?.transaction?.expired_at || '-',
    },
    consultation: {
      result: data.consultation?.result || '-',
      scheduleDate: data?.consultation?.schedule_date || '-',
      scheduleTime: data?.consultation?.schedule_time || '-',
    },
    doctor: {
      rating: data.doctor?.rating || 0,
      doctorId: data?.doctor?.doctor_id || '-',
      speciality: data?.doctor?.speciality || '-',
      reviewCount: data.doctor?.review_count || 0,
      doctorName: data?.doctor?.doctor_name || '-',
      patientCount: data.doctor?.patient_count || 0,
    },
    payment: {
      paymentId: data?.payment?.payment_id || '-',
      totalPromo: data?.payment?.total_promo || '-',
      totalAmount: data?.payment?.total_amount || '-',
      paymentType: data?.payment?.payment_type || '-',
      insuranceType: data?.payment?.insurance_type || '-',
      totalDeliveryAmount: data?.payment?.total_delivery_amount || '-',
    },
    user: {
      id: data?.user?.id || '-',
      sex: data?.user?.sex || '-',
      illness: data.user?.illness || '-',
      userName: data?.user?.user_name || '-',
      bornDate: data?.user?.born_date || '-',
    },
    item: {
      providerName: item?.provider_name || '-',
    },
  };
};
