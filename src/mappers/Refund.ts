import { capitalizeFirstLetter } from '@/src/utils/formatText';

import type {
  RefundData,
  RefundRecapData,
  RefundRecapListData,
} from '@/src/types/Refund';

export const getListRefund = (data: RefundData[]) => {
  return data.map((item: RefundData) => {
    return {
      id: item.id ?? 0,
      transaction_detail_id: item.transaction_detail_id ?? 0,
      no_transaction: item.no_transaction ?? '-',
      created_at: item.created_at ?? '-',
      pasien_name: item.pasien_name ?? '-',
      transaction_type: item.transaction_type ?? '-',
      status: item.status ?? '-',
      no_refund: item.refund_no ?? '-',
      transaction_id: item.transaction_id || '-',
    };
  });
};

export const getListRefundRecap = (
  data: RefundRecapData
): RefundRecapListData[] => {
  return [
    {
      id: 1,
      title: 'Refund Diajukan',
      value: data.total_refund,
    },
    {
      id: 2,
      title: 'Perlu Diproses',
      value: data.waiting,
    },
    {
      id: 3,
      title: 'Refund Diterima',
      value: data.approved,
    },
    {
      id: 4,
      title: 'Refund Ditolak',
      value: data.rejected,
    },
  ];
};

export const getDetailRefund = (data: any) => {
  const services = data?.services?.map((item: any) => {
    return {
      clinic_name: item.clinic_name || '-',
      detail: '-',
      med_photo: item.med_photo || '-',
      med_name: item.med_name || '-',
      med_qty: item.med_qty || 0,
      med_type: item.med_type || '-',
      med_amount: item.med_amount || 0,
      service_name: item.service_name || '-',
      doctor_name: item.doctor_name || '-',
      doctor_specialist: item.doctor_specialist || '-',
      doctor_rating_count: item.doctor_rating_count || 0,
      doctor_rating_val: item.doctor_rating_val || 0,
      patient_count: item.patient_count || 0,
      service_type: item.service_type || '-',
    };
  });

  return {
    id: data?.id || '-',
    account_name: data?.account_name || '-',
    account_number: data?.account_number || '',
    admin_cost: data?.admin_cost || '0',
    bank_name: capitalizeFirstLetter(data?.bank_name) || '-',
    birth_date: data?.birth_date || '-',
    complaint_reason: data?.complaint_reason || '-',
    complaint_image: data?.complaint_image || [],
    created_at: data?.created_at,
    gender: data?.gender || '-',
    guarantee_type: data?.guarantee_type || '-',
    payment_method: data?.payment_method || '-',
    phone_number: data?.phone_number || '-',
    reference_no: data?.reference_no || '',
    refund_amount: data?.refund_amount || 0,
    refund_reason: data?.refund_reason || '-',
    refund_no: data?.refund_no || '-',
    services: services || [],
    status: data?.status || '-',
    total_amount: data?.total_amount || 0,
    transaction_id: data?.transaction_id || '-',
    transaction_type: data?.transaction_type || '-',
    user: data?.user || '-',
    va_number: data?.va_number || '-',
  };
};
