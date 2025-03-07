import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import { formatDateEng } from '@/src/utils/formatDate';
import {
  mapParamsUserMediverse,
  mapPayloadBannedUserMediverse,
} from '@/src/mappers/MasterUser/mediverseUser';
import Axios from '../services';
import AxiosFrappe from '../servicesFrappe';

const pathSearch = paths.search;
const pathUserPrivate = paths.userPrivate;
const pathUserShared = paths.userShared;
const pathTransactionV2 = paths.transactionV2;
const pathOnlineReservationDoctor = paths.onlineReservationDoctor;

// FRAPPE

export const getListUserFrappe = async (params) => {
  try {
    const queryParams = buildParams(mapParamsUserMediverse(params));
    const path = `${pathUserPrivate}/users${queryParams}`;
    return await AxiosFrappe.get(path, params);
  } catch (error: any) {
    return error.response;
  }
};

export const getListUser = async (params) => {
  try {
    const queryParams = buildParams(mapParamsUserMediverse(params));
    const path = `${pathUserPrivate}/users${queryParams}`;
    return await Axios.get(path, params);
  } catch (error: any) {
    return error.response;
  }
};

export const getListUserClinic = async (params) => {
  try {
    const queryParams = buildParams(params);
    const path = `${pathUserPrivate}/users/clinic${queryParams}`;
    return await Axios.get(path, params);
  } catch (error: any) {
    return error.response;
  }
};

export const getListAddress = async (idpSub) => {
  try {
    const queryParams = buildParams({
      idp_sub: idpSub,
    });
    return await Axios.get(`${pathUserPrivate}/address${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getUserDetail = async () => {
  try {
    return await Axios.get(`${pathUserPrivate}/me/`);
  } catch (error: any) {
    return error.response;
  }
};

export const getUserProviders = async () => {
  try {
    return await Axios.get(`${pathUserPrivate}/me/providers`);
  } catch (error: any) {
    return error.response;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await Axios.get(
      `${pathUserPrivate}/users/${id}?is_all_address=true`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getPatientById = async (id: string) => {
  try {
    return await AxiosFrappe.get(`/resource/Patient/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getMedicalRecordById = async (id: string) => {
  try {
    return await AxiosFrappe.get(
      `/method/healthcare.api.medical_record.get_medical_record?patient=${id}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getIntegratedById = async (id: string) => {
  try {
    return await AxiosFrappe.get(
      // `/method/mediverse_rme.soap.doctype.soap.soap.get_by_transaction?filters=[["transaction", "=", "${id}"]]`
      `/method/mediverse_rme.api.service_transaction.catatan_integrasi_by_patient?patient=${id}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getUserHealthProfile = async (idpSub: string) => {
  try {
    const queryParams = buildParams({
      user_id: idpSub,
    });
    return await Axios.get(`${pathUserPrivate}/health-profile${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postUserBanned = async (payload) => {
  try {
    const { id } = payload;
    const payloadBannedMediverse = mapPayloadBannedUserMediverse(payload);
    return await Axios.post(
      `${pathUserShared}/users/${id}/banned`,
      payloadBannedMediverse
    );
  } catch (error: any) {
    return error.response;
  }
};

export const cahngeStatusUser = async (id: string, payload) => {
  try {
    return await Axios.post(`${pathUserShared}/users/${id}/banned`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getListClinicByDoctor = async (id, channelId) => {
  try {
    return await Axios.get(
      `${pathOnlineReservationDoctor}/channel/${channelId}/doctor/${id}/placement`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getListReservationFrappe = async ({
  channelId = '',
  page = 1,
  limit = 10,
  search = '',
  outletId,
  outletType,
  treatmentTypeId,
  doctorId,
  reservationDate,
  reservationStatus,
}) => {
  const queryParams = buildParams({
    size: limit,
    page,
    keyword: search,
    outlet_id: outletId,
    outlet_type: outletType,
    treatment_type_id: treatmentTypeId,
    doctor_id: doctorId,
    reservation_date: reservationDate ? formatDateEng(reservationDate) : '',
    reservation_status: reservationStatus,
    with_participant: true,
    sort: 'desc',
  });

  const url = `${pathOnlineReservationDoctor}/channel/${channelId}/reservation${queryParams}`;
  try {
    return await AxiosFrappe.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListReservation = async ({
  channelId = '',
  page = 1,
  limit = 10,
  search = '',
  outletId,
  outletType,
  treatmentTypeId,
  doctorId,
  reservationDate,
  reservationStatus,
}) => {
  const queryParams = buildParams({
    size: limit,
    page,
    keyword: search,
    outlet_id: outletId,
    outlet_type: outletType,
    treatment_type_id: treatmentTypeId,
    doctor_id: doctorId,
    reservation_date: reservationDate ? formatDateEng(reservationDate) : '',
    reservation_status: reservationStatus,
    with_participant: true,
    sort: 'desc',
  });

  const url = `${pathOnlineReservationDoctor}/channel/${channelId}/reservation${queryParams}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailReservation = async (id, channelId) => {
  try {
    return await Axios.get(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}?with_participant=true`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getReservationDiagnostic = async (id, channelId) => {
  try {
    return await Axios.get(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/diagnostic`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getReservationPrescriptions = async (id, channelId) => {
  try {
    return await Axios.get(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/prescriptions`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getReservationMedicalSupport = async (id, channelId) => {
  try {
    return await Axios.get(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/medical-support`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getReservationHospitalReferral = async (id, channelId) => {
  try {
    return await Axios.get(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/hospital-referral`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const patchReservationStatus = async (id, channelId, status) => {
  try {
    return await Axios.patch(
      `${pathTransactionV2}/transaction/medpoint/${id}`,
      {
        update_type: status,
      }
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postReservationDiagnostic = async (id, channelId, payload) => {
  try {
    return await Axios.post(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/diagnostic`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postReservationMedicalSupport = async (id, channelId, payload) => {
  try {
    return await Axios.post(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/medical-support`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postReservationHospitalReferral = async (
  id,
  channelId,
  payload
) => {
  try {
    return await Axios.post(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/hospital-referral`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const postReservationPrescriptions = async (id, channelId, payload) => {
  try {
    return await Axios.post(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/prescriptions`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const deleteReservationPrescriptions = async (
  id: number,
  channelId: number,
  prescriptionId: number
) => {
  try {
    return await Axios.delete(
      `${pathOnlineReservationDoctor}/channel/${channelId}/reservation/${id}/prescriptions/${prescriptionId}`
    );
  } catch (error: any) {
    return error.response;
  }
};

export const getListDrug = async (search) => {
  const queryParams = buildParams({
    type: 'drug',
    item_name: search,
    limit: 500,
    is_banned: false,
  });
  try {
    const url = `${pathSearch}/medpharm${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const patchSecondaryProvider = async (userId, payload) => {
  try {
    return await Axios.patch(
      `${pathUserPrivate}/users/${userId}/secondary`,
      payload
    );
  } catch (error: any) {
    return error.response;
  }
};

export const userLogout = async () => {
  try {
    const path = `${paths.userPublic}/logout`;
    return await Axios.post(path);
  } catch (error: any) {
    return error.response;
  }
};
