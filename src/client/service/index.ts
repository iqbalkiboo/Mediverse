import AxiosFrappe from '@/client/servicesFrappe';

export const getListService = async ({ type = '' }) => {
  try {
    const filters = JSON.stringify([['item_group', '=', type]]);
    const fields = JSON.stringify([
      'name',
      'item_name',
      'item_code',
      'item_group',
      'valuation_rate',
    ]);

    const path = `/method/mediverse_rme.api.item.get_list?company=${
      import.meta.env.VITE_APP_FRAPPE_COMPANY
    }&has_stock=true&filters=${filters}&fields=${fields}&limit_page_length=1000`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListDepartment = async () => {
  try {
    const filters = JSON.stringify([
      ['clinic', '=', import.meta.env.VITE_APP_FRAPPE_COMPANY],
    ]);
    const fields = JSON.stringify(['*']);
    const path = `/resource/Medical Department?filters=${filters}&fields=${fields}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postAddAppointment = async (payload) => {
  try {
    const path = `/method/mediverse_rme.registration.doctype.appointment_queue.api.create_sales_order_appointment_and_transaction`;
    return await AxiosFrappe.post(path, payload);
  } catch (error: any) {
    return error.response;
  }
};
