import dayjs from 'dayjs';

import { formatTextHealthFacilityType } from '@/utils/formatLanguage';

export const mappingPayloadSalesOrderAppointment = (queueCode, data) => {
  const patient = data?.service?.payor?.patient
    ? data?.service?.payor?.patient
    : data?.patient?.name;
  const queueType = data?.service?.serviceType
    ? formatTextHealthFacilityType(data?.service?.serviceType)
    : undefined;

  return {
    sales_order: {
      customer: patient || undefined,
      transaction_date: dayjs().format('YYYY-MM-DD'),
      delivery_date: dayjs().format('YYYY-MM-DD'),
      currency: 'IDR',
      company: import.meta.env.VITE_APP_FRAPPE_COMPANY,
      selling_price_list: 'Standard Selling',
      set_warehouse: import.meta.env.VITE_APP_FRAPPE_WAREHOUSE,
      items:
        data?.service?.serviceType === 'Clinic'
          ? [
              {
                item_code:
                  data?.service?.doctor?.value?.outpatient_care_item || '',
                rate: data?.service?.doctor?.value?.outpatient_care_price || 0,
                qty: 1,
              },
            ]
          : data.service?.service?.map((item: any) => ({
              item_code: item.value?.name || '',
              rate: item.value?.valuation_rate || 0,
              qty: 1,
            })),
    },
    appointment_queue: {
      arrival: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      type_registration: 'Registrasi Mandiri',
      queue_type: queueType === 'Klinik' ? 'Rawat Jalan' : queueType,
      company: import.meta.env.VITE_APP_FRAPPE_COMPANY,
      service_transaction_status: 'Registrasi',
      previous_appointment: queueCode ? queueCode : undefined,
    },
    service_transaction: {
      patient: patient || undefined,
      doctor: data?.service?.doctor?.value?.practitioner || undefined,
      service_schedule: data?.service?.practiceHour || undefined,
      medical_action: undefined,
      payor: data?.service?.payor?.payor
        ? data?.service?.payor?.payor
        : undefined,
      payment_status: 'Belum Lunas',
    },
  };
};
