import AxiosFrappe from '@/client/servicesFrappe';

const pathResourceCustomer = '/resource/Customer';

export const getListCustomer = async (params) => {
  try {
    const { noIdentifier } = params;
    const filters = JSON.stringify([
      ['customer_name', 'like', `%${noIdentifier}%`],
      ['mobile_no', 'like', `%${noIdentifier}%`],
    ]);
    const fields = JSON.stringify(['*']);
    return await AxiosFrappe.get(`${pathResourceCustomer}`, {
      params: {
        or_filters: filters,
        fields: fields,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const postCustomer = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(pathResourceCustomer, data);
  } catch (error: any) {
    return error.response;
  }
};
