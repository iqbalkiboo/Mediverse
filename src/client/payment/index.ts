import { buildParams } from '@/src/utils/buildParams';
import AxiosFrappe from '@/client/servicesFrappe';

const pathFrappe =
  '/method/mediverse_rme.registration.doctype.appointment_queue.api';
const pathModePayment = '/resource/Mode of Payment';
const pathBank = '/resource/Bank';

export const getListPayment = async (params) => {
  try {
    const queryParams = buildParams({
      queue_type: params.queueType,
      sales_order_status: params.status,
      limit_start: params.start.toString(),
      limit_page_length: params.pageLength.toString(),
      from_date: params.fromDate,
      end_date: params.endDate,
      queue_code: params.search,
      filter_patient: params.search,
    });
    const path = `${pathFrappe}.get_appointment_queue_with_relations${queryParams}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListModePayment = async () => {
  try {
    const filters = JSON.stringify([['enabled', '=', '1']]);
    return await AxiosFrappe.get(pathModePayment, {
      params: {
        filters: filters,
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getListBankAccount = async () => {
  try {
    return await AxiosFrappe.get(pathBank, {
      params: {
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getPaymentDetail = async (params) => {
  try {
    const queryParams = buildParams({
      service_transaction_id: params.queue,
    });
    const path = `${pathFrappe}.get_sales_order_by_queue_code${queryParams}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const updateStatusSalesOrder = async (payload) => {
  try {
    const { salesOrder, status } = payload;
    const bodyPayload = {
      sales_order_name: salesOrder,
      new_status: status,
    };
    const path = `/method/erpnext.selling.doctype.sales_order.api.update_sales_order_status`;
    return await AxiosFrappe.post(path, bodyPayload);
  } catch (error: any) {
    return error.response;
  }
};

export const updateSalesOrder = async (payload) => {
  try {
    const { paymentId, data } = payload;
    const path = `/resource/Sales Order/${paymentId}`;
    return await AxiosFrappe.put(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const addDirectSalesOrder = async (payload) => {
  try {
    const { data } = payload;
    const path = `/method/mediverse_rme.api.sales_order.direct_buy`;
    return await AxiosFrappe.post(path, data);
  } catch (error: any) {
    return error.response;
  }
};

export const addPaymentEntry = async (payload) => {
  try {
    const { salesOrder, paymentMode, paidAmount, bankAccount, bankNumber } =
      payload;
    const bodyPayload = {
      sales_order_name: salesOrder,
      mode_of_payment: paymentMode,
      paid_amount: paidAmount,
      bank_account: bankAccount ? bankAccount : undefined,
      card_number: bankNumber ? bankNumber : undefined,
    };
    const path = `/method/mediverse_rme.api.sales_order.process_sales_order`;
    return await AxiosFrappe.post(path, bodyPayload);
  } catch (error: any) {
    return error.response;
  }
};
