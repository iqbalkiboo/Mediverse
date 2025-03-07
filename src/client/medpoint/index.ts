import { paths } from '@/src/configs';
import { buildParams } from '@/utils/buildParams';
import Axios from '../services';
import AxiosFrappe from '@/client/servicesFrappe';

const pathHealthCareStore = paths.healthCareStore;
const pathOnlineReservationDoctor = paths.onlineReservationDoctor;
const pathMediverseTransaction = paths.mediverseTransaction;

export const getCheckupResult = async (channelId, reservationId) => {
  try {
    const renderText = [
      'Diagnosis Dokter',
      'Resep Obat',
      'Penunjang Medis',
      'Rujukan',
    ];

    const results = await Promise.allSettled([
      Axios.get(
        `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${reservationId}/diagnostic`
      ),
      Axios.get(
        `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${reservationId}/prescriptions`
      ),
      Axios.get(
        `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${reservationId}/medical-support`
      ),
      Axios.get(
        `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${reservationId}/hospital-referral`
      ),
    ]);

    const resultFullfiled = [
      ...results.flatMap((result, index) =>
        result?.status === 'fulfilled' ? renderText[index] : false
      ),
    ];

    return {
      data: resultFullfiled.filter((item) => item !== false),
    };
  } catch (error: any) {
    return error.response;
  }
};

export const patchDataStatusMedpoint = async (payload) => {
  try {
    const path = `${pathMediverseTransaction}/cms/transaction/status/${payload.id}`;
    return await Axios.patch(path, payload.data);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListIcd9 = async ({
  search = '',
  page = 1,
  size = 100,
}) => {
  try {
    const queryParams = buildParams({
      module: 'icd9',
      page,
      size,
      keyword: search,
    });
    const url = `/resource/Code Value?filters=[["code_system", "=", "ICD 9"]]&fields=["*"]`;
    return await AxiosFrappe.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListIcd10 = async ({
  search = '',
  page = 1,
  size = 100,
}) => {
  try {
    const queryParams = buildParams({
      module: 'icd10',
      page,
      size,
      keyword: search,
    });
    const url = `/resource/Code Value?filters=[["code_system", "=", "ICD 10"]]&fields=["*"]`;
    return await AxiosFrappe.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListImmunizationCategory = async ({
  search = '',
  page = 1,
  size = 100,
}) => {
  try {
    const queryParams = buildParams({
      module: 'immunization_category',
      page,
      size,
      display: search,
    });
    const url = `/resource/Code Value?filters=[["code_system", "=", "Immunization Category"]]&fields=["*"]`;
    return await AxiosFrappe.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListAssessment = async ({
  search = '',
  page = 1,
  size = 100,
}) => {
  try {
    const queryParams = buildParams({
      module: 'assessment_nurse',
      page,
      size,
      display: search,
    });
    const url = `/resource/Code Value?filters=[["code_system", "=", "Assessment Nurse"]]&fields=["*"]`;
    return await AxiosFrappe.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getAssessmentHistory = async (id: string, code: string) => {
  try {
    const path = `${pathMediverseTransaction}/soap-assessment/check-history/${id}/${code}`;
    return await Axios.get(path);
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

export const postTransactionSoaps = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await Axios.post(
      `${pathMediverseTransaction}/soap/${transactionId}`,
      data
    );
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

export const postTransactionProcedureOutpatient = async (payload) => {
  try {
    const { data } = payload;
    return await AxiosFrappe.post(`/method/frappe.client.insert_many`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putTransactionSoaps = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await Axios.put(
      `${pathMediverseTransaction}/soap/${transactionId}`,
      data
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postTransactionProcedure = async (payload) => {
  try {
    const { transactionId, data } = payload;
    return await Axios.post(
      `${pathMediverseTransaction}/soap-procedure/${transactionId}`,
      data
    );
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

export const getDetailTransactionSoaps = async (id: string | number) => {
  try {
    const path = `${pathMediverseTransaction}/soap/${id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const getDetailIntegratedNotes = async (
  id: string | number,
  page = 1,
  limit = 100
) => {
  try {
    const queryParams = buildParams({
      user_id: id,
      page,
      limit,
    });
    const path = `${pathMediverseTransaction}/soap${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.message;
  }
};
