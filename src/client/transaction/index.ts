import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import { formatDateEng } from '@/src/utils/formatDate';
import { TRANSACTION_FILTER_PARAMS_MEDPOINT } from '@/src/constants';
import Axios from '../services';
import AxiosFrappe from '@/client/servicesFrappe';

const pathHealthCareStore = paths.healthCareStore;
const pathMediverseTransaction = paths.mediverseTransaction;
const pathMediverseTransactionPrivate = paths.mediverseTransactionPrivate;

const pathFrappe =
  '/method/mediverse_rme.registration.doctype.appointment_queue.api';

export const getListTransactions = async (queueType, params) => {
  try {
    const queryParams = buildParams({
      queue_type: queueType,
      transaction_status: params.status,
      sales_order_status: params.statusPayment,
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

export const getDetailTransaction = async (payload) => {
  try {
    const { id } = payload;
    const queryParams = buildParams({
      transaction: id,
    });
    const path = `/method/mediverse_rme.registration.doctype.service_transaction.service_transaction.get_by_id${queryParams}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListCancelReason = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([
      ['display', 'like', `%${search}%`],
      ['code_system', '=', 'Act Reason'],
    ]);
    const url = `/resource/Code Value`;
    return await AxiosFrappe.get(url, {
      params: {
        filters: filters,
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListObservationReason = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([
      ['display', 'like', `%${search}%`],
      ['code_system', '=', 'Observation'],
    ]);
    const url = `/resource/Code Value`;
    return await AxiosFrappe.get(url, {
      params: {
        filters: filters,
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListIcd9 = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([
      ['display', 'like', `%${search}%`],
      ['code_system', '=', 'ICD 9'],
    ]);
    const url = `/resource/Code Value`;
    return await AxiosFrappe.get(url, {
      params: {
        filters: filters,
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListIcd10 = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([
      ['display', 'like', `%${search}%`],
      ['code_system', '=', 'ICD 10'],
    ]);
    const url = `/resource/Code Value`;
    return await AxiosFrappe.get(url, {
      params: {
        filters: filters,
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListImmunizationCategory = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([
      ['display', 'like', `%${search}%`],
      ['code_system', '=', 'Immunization Category'],
    ]);
    const url = `/resource/Code Value`;
    return await AxiosFrappe.get(url, {
      params: {
        filters: filters,
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListAssessment = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([
      ['display', 'like', `%${search}%`],
      ['code_system', '=', 'Assessment Nurse'],
    ]);
    const url = `/resource/Code Value`;
    return await AxiosFrappe.get(url, {
      params: {
        filters: filters,
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListBatch = async (id = '') => {
  try {
    const filters = `[["item", "=", "${id}"],["batch_qty", ">", 0]]`;
    const url = `/resource/Batch?filters=${filters}&fields=["*"]`;
    return await AxiosFrappe.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListLaboratory = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([
      ['item_group', '=', 'Laboratory'],
      ['item_name', 'like', `%${search}%`],
    ]);
    const fields = JSON.stringify([
      'name',
      'item_name',
      'item_code',
      'item_group',
    ]);
    const path = `/resource/Item`;
    return await AxiosFrappe.get(path, {
      params: {
        filters: filters,
        fields: fields,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListItemOther = async ({ search = '', onlyOther }) => {
  try {
    const filterOther = onlyOther ? ',["item_group", "=", "Others"]' : '';
    const filters = `[["item_name", "like", "%${search}%"]${filterOther}]`;
    const fields = JSON.stringify([
      'item_name',
      'item_code',
      'item_group',
      'stock_uom',
      'valuation_rate',
    ]);
    const path = `/resource/Item`;
    return await AxiosFrappe.get(path, {
      params: {
        filters: filters,
        fields: fields,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListReferralHospital = async ({
  search = '',
  type = '',
}) => {
  try {
    const filters = JSON.stringify([
      ['health_facility_name', 'like', `%${search}%`],
      ['health_facility_type', '=', `${type}`],
    ]);
    const path = `/resource/Referral Hospital`;
    return await AxiosFrappe.get(path, {
      params: {
        filters: filters,
        fields: '["*"]',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListProcedure = async ({ search = '' }) => {
  try {
    const filters = JSON.stringify([['procedure_name', 'like', `%${search}%`]]);
    const path = `/method/mediverse_rme.mediverse_rme.doctype.procedure_item.procedure_item.get_list`;
    return await AxiosFrappe.get(path, {
      params: {
        group_by: '`procedure`',
        filters: filters,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListProcedureItem = async ({
  procedure = '',
  search = '',
}) => {
  try {
    const filters = JSON.stringify([
      ['procedure', '=', `${procedure}`],
      ['item_name', 'like', `%${search}%`],
    ]);
    const path = `/method/mediverse_rme.mediverse_rme.doctype.procedure_item.procedure_item.get_list`;
    return await AxiosFrappe.get(path, {
      params: {
        filters: filters,
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListPayor = async () => {
  try {
    const fields = JSON.stringify(['*']);
    const path = `/resource/Payor?fields=${fields}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailItem = async (id) => {
  try {
    const path = `/resource/Item/${id}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailTransactionSoap = async (id: string | number) => {
  try {
    const path = `/method/mediverse_rme.soap.doctype.soap.soap.get_by_transaction?filters=[["transaction","=","${id}"]]`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailTransactionTreatment = async (id: string | number) => {
  try {
    const path = `/method/mediverse_rme.outpatient_care.doctype.outpatient_procedure.outpatient_procedure.get_by_transaction?transaction=${id}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailTransactionDrugRecipe = async (id: string | number) => {
  try {
    const path = `/method/mediverse_rme.outpatient_care.doctype.drug_recipe_items.drug_recipe_items.get_by_transaction?transaction=${id}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailTransactionMedicalSupport = async (
  id: string | number
) => {
  try {
    const path = `/method/mediverse_rme.outpatient_care.doctype.medical_support.medical_support.get_by_transaction?transaction=${id}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailTransactionRecommendationLetter = async (
  id: string | number
) => {
  try {
    const path = `/method/mediverse_rme.outpatient_care.doctype.recommendation_letter.recommendation_letter.get_by_transaction?transaction=${id}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailIntegratedNotes = async (id: string | number) => {
  try {
    const queryParams = buildParams({
      patient: id,
    });
    const path = `/method/healthcare.api.medical_record.get_medical_record${queryParams}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getAssessmentHistory = async (id: string, code: string) => {
  try {
    const queryParams = buildParams({
      patient: id,
      assessment: code,
    });
    const path = `/method/mediverse_rme.soap.doctype.assessment.assessment.has_history${queryParams}`;
    return await AxiosFrappe.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postTransactionSoap = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post('/resource/SOAP', data);
  } catch (error: any) {
    return error.response;
  }
};

export const putTransactionSoap = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await AxiosFrappe.put(`/resource/SOAP/${transactionId}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postTransactionProcedure = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(`/method/frappe.client.insert_many`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putTransactionProcedure = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await AxiosFrappe.put(
      `/resource/Outpatient Procedure/${transactionId}`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const deleteTransactionProcedure = async (payload) => {
  try {
    const { transactionId } = payload;
    return await AxiosFrappe.delete(
      `/resource/Outpatient Procedure/${transactionId}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postTransactionDrugRecipe = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(`/method/frappe.client.insert_many`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putTransactionDrugRecipe = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await AxiosFrappe.put(
      `/resource/Drug Recipe Items/${transactionId}`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const deleteTransactionDrugRecipe = async (payload) => {
  try {
    const { transactionId } = payload;
    return await AxiosFrappe.delete(
      `/resource/Drug Recipe Items/${transactionId}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postTransactionMedicalSupport = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(`/resource/Medical Support`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putTransactionMedicalSupport = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await AxiosFrappe.put(
      `/resource/Medical Support/${transactionId}`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postTransactionRecommendationLetter = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(`/resource/Recommendation Letter`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putTransactionRecommendationLetter = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await AxiosFrappe.put(
      `/resource/Recommendation Letter/${transactionId}`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postUploadDocument = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(`/method/upload_file`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postTransactionKipi = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(`/resource/KIPI`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const postCancelTransaction = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(
      `/method/mediverse_rme.api.service_transaction.cancel_transaction`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const putServiceTransaction = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await AxiosFrappe.put(
      `/resource/Service Transaction/${transactionId}`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getListTransaction = async (params) => {
  try {
    const queryParams = buildParams({
      limit: params.limit,
      page: params.page,
      status:
        params.status === TRANSACTION_FILTER_PARAMS_MEDPOINT.TODAY
          ? ''
          : params.status,
      provider_type: params.providerType,
      search: params.search,
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
      service_type: params.serviceType,
      is_prescription: false,
      name: params.name,
      phone_number: params.phoneNumber,
      no_ticket: params.noTicket,
    });
    const path = `${pathMediverseTransaction}/cms/transaction${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getAllTransaction = async ({
  query = '',
  page = 1,
  limit = 10,
  startDate,
  endDate,
}) => {
  try {
    const queryParams = buildParams({
      order: 'created_at',
      sort: 'DESC',
      limit,
      search: query,
      page,
      start_date: startDate,
      end_date: endDate,
    });
    const url = `${pathMediverseTransactionPrivate}/cms/transaction/records${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadAllTransaction = async ({
  query = '',
  startDate,
  endDate,
}) => {
  try {
    const queryParams = buildParams({
      order: 'created_at',
      sort: 'DESC',
      search: query,
      start_date: startDate,
      end_date: endDate,
    });
    const url = `${pathMediverseTransaction}/cms/download/transaction-records${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadRecapitulationTransaction = async ({
  startDate,
  endDate,
}) => {
  try {
    const queryParams = buildParams({
      start_date: startDate,
      end_date: endDate,
    });
    const url = `${pathMediverseTransaction}/cms/download/transaction-recap${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataCardTransaction = async ({ startDate, endDate }) => {
  try {
    const queryParams = buildParams({
      start_date: startDate,
      end_date: endDate,
    });
    const url = `${pathMediverseTransactionPrivate}/cms/transaction/recap${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListProviderBalance = async ({
  query = '',
  page = 1,
  limit = 10,
}) => {
  try {
    const queryParams = buildParams({
      page,
      size: limit,
      name: query,
    });
    const url = `${pathHealthCareStore}/channel${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListExpeditionBalance = async ({
  query = '',
  page = 1,
  limit = 10,
}) => {
  try {
    const queryParams = buildParams({
      page,
      size: limit,
      name: query,
    });
    const url = `${pathHealthCareStore}/channel${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListExpeditionProviderPayment = async ({
  query = '',
  page = 1,
  limit = 10,
}) => {
  try {
    const queryParams = buildParams({
      page,
      size: limit,
      name: query,
    });
    const url = `${pathHealthCareStore}/channel${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};
