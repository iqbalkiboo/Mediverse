import { isArray } from 'lodash';
import dayjs from 'dayjs';

import { formatRupiah } from '@/src/utils/formatRupiah';
import { capitalizeFirstLetter } from '@/src/utils/formatText';

export const mapListRefund = (data: any[]) => {
  if (!isArray(data) || data.length === 0) return [];

  const groupingList = [
    ...new Map(data.map((item) => [item['refund_no'], item])).values(),
  ];

  return groupingList.map((item: any) => {
    return {
      id: item.id || 0,
      status: item.status || '-',
      noRefund: item.refund_no || '-',
      noTransaction: item.code || '-',
      createdAt: item.created_at || '-',
      patientName: item.pasien_name || '-',
      transactionId: item.transaction_id || '-',
      paymentGateway: item.payout_provider || '-',
      transactionType: item.transaction_type || '-',
      transactionDetailId: item.transaction_detail_id || 0,
    };
  });
};

export const mapDetailRefund = (data: any) => {
  const services = isArray(data?.services)
    ? data?.services?.map((item: any) => {
        return {
          detail: '-',
          medQty: item.med_qty || 0,
          medName: item.med_name || '-',
          medType: item.med_type || '-',
          medPhoto: item.med_photo || '-',
          medAmount: item.med_amount || 0,
          clinicName: item.clinic_name || '-',
          doctorName: item.doctor_name || '-',
          serviceName: item.service_name || '-',
          patientCount: item.patient_count || 0,
          serviceType: item.service_type || '-',
          doctorRatingVal: item.doctor_rating_val || 0,
          doctorSpecialist: item.doctor_specialist || '-',
          doctorRatingCount: item.doctor_rating_count || 0,
        };
      })
    : [];

  const dateDeviation = (date: any, deviationDate: number) => {
    const nowDate = dayjs(date);
    const soonDate = nowDate.add(deviationDate, 'days');

    return soonDate.diff(dayjs(), 'day');
  };

  return {
    id: data?.id || '-',
    user: data?.user || '-',
    services: services,
    gender: data?.gender || '-',
    status: data?.status || '-',
    createdAt: data?.created_at,
    refundNo: data?.refund_no || '-',
    vaNumber: data?.va_number || '-',
    noTransaction: data?.code || '-',
    vaPayout: data?.va_payment || '-',
    adminCost: data?.admin_cost || '0',
    birthDate: data?.birth_date || '-',
    payoutFee: data?.payout_fee || 0,
    totalAmount: data?.total_amount || 0,
    referenceNo: data?.reference_no || '',
    accountName: data?.account_name || '-',
    phoneNumber: data?.phone_number || '-',
    refundAmount: data?.refund_amount || 0,
    refundReason: data?.refund_reason || '-',
    feePercentage: data?.fee_percentage || 0,
    deliveryCost: data?.delivery_amount || 0,
    accountNumber: data?.account_number || '',
    guaranteeType: data?.guarantee_type || '-',
    paymentMethod: data?.payment_method || '-',
    transactionId: data?.transaction_id || '-',
    complaintImage: data?.complaint_image || [],
    payoutProvider: data?.payout_provider || '-',
    paymentGateway: data?.payment_provider || '-',
    complaintReason: data?.complaint_reason || '-',
    transactionType: data?.transaction_type || '-',
    refundProcessed: dateDeviation(data?.created_at, 5),
    bankName: capitalizeFirstLetter(data?.bank_name) || '-',
    paymentProviderType: data?.payment_provider_type || '-',
    isRefundProcessed: dateDeviation(data?.created_at, 5) > 0,
  };
};

export const mapDataRefundRecapitulation = (data: any) => {
  return [
    {
      id: 1,
      title: 'Refund Diproses',
      value: data?.approved + data?.processed || 0,
    },
    {
      id: 2,
      title: 'Refund Berhasil',
      value: data?.completed || 0,
    },
    {
      id: 3,
      title: 'Refund Berhasil Midtrans',
      value: formatRupiah(data?.midtrans_completed_amount || 0),
    },
    {
      id: 4,
      title: 'Refund Berhasil Nicepay',
      value: formatRupiah(data?.nicepay_completed_amount || 0),
    },
  ];
};
