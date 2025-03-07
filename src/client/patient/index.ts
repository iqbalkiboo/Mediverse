import AxiosFrappe from '@/client/servicesFrappe';

const pathResourcePatient = '/resource/Patient';
const pathResourcePatientPayor = '/resource/Patient Payor';

export const getListPatient = async (params) => {
  try {
    const { noIdentifier } = params;
    const filters = JSON.stringify([
      ['patient_name', 'like', `%${noIdentifier}%`],
      ['mobile', 'like', `%${noIdentifier}%`],
      ['no_identifier', 'like', `%${noIdentifier}%`],
    ]);
    const fields = JSON.stringify([
      'name',
      'patient_name',
      'no_identifier',
      'dob',
      'email',
      'mobile',
      'sex',
    ]);
    return await AxiosFrappe.get(`${pathResourcePatient}`, {
      params: {
        or_filters: filters,
        fields: fields,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getListPayorByPatient = async (params) => {
  try {
    const { noIdentifier } = params;
    const filters = JSON.stringify([['patient', '=', noIdentifier]]);
    const fields = JSON.stringify(['*']);
    return await AxiosFrappe.get(`${pathResourcePatientPayor}`, {
      params: {
        filters: filters,
        fields: fields,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getPatientPayor = async (params) => {
  try {
    const { noIdentifierPatient, noIdentifier, payor } = params;
    const filters = JSON.stringify([
      ['patient', '=', noIdentifierPatient],
      ['no_identifier', '=', noIdentifier],
      ['payor', '=', payor],
    ]);
    const fields = JSON.stringify(['*']);
    return await AxiosFrappe.get(`${pathResourcePatientPayor}`, {
      params: {
        filters: filters,
        fields: fields,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getPatientIdentifier = async (params) => {
  try {
    const { noIdentifier } = params;
    const filters = JSON.stringify([['no_identifier', '=', `${noIdentifier}`]]);
    const fields = JSON.stringify(['no_identifier']);
    return await AxiosFrappe.get(`${pathResourcePatient}`, {
      params: {
        filters: filters,
        fields: fields,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const postPatient = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(pathResourcePatient, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postPatientPayor = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post('/method/frappe.client.insert_many', data);
  } catch (error: any) {
    return error.response;
  }
};
