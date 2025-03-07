import Axios from '../services';
import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import {
  IGetListDoctorElasticParams,
  IGetListDoctorParams,
  IPostDoctorData,
} from '@/src/types/MasterProvider/doctors/doctors';

const pathSearch = paths.search;
const pathOnlineReservation = paths.onlineReservation;
const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;
const pathOnlineReservationDoctor = paths.onlineReservationDoctor;
const pathOnlineReservationClinic = paths.onlineReservationClinic;
const onlineReservationUpload = paths.onlineReservationUpload;

export const getListDoctor = async (params: IGetListDoctorParams) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      size: params.limit,
      status: params.status,
      keyword: params.search,
    });

    const path = `${pathOnlineReservationDoctor}/channel/${params.channelId}/doctor${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailDoctor = async (channelId, itemId) => {
  try {
    const queryParams = buildParams({
      with_schedule: true,
      with_poly: true,
    });

    const path = `${pathOnlineReservationClinic}/channel/${channelId}/doctor/${itemId}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListDoctorElastic = async (
  params: IGetListDoctorElasticParams
) => {
  try {
    const queryParams = buildParams({
      type: params.type,
      limit: params.limit,
      offset: params.offset,
      keyword: params.search,
      show_banned: params.status,
    });
    return await Axios.get(`${pathSearch}/medpoint${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailDoctorElastic = async (id?: string) => {
  try {
    return await Axios.get(`${pathSearch}/medpoint/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getListDoctorByOutletId = async (channelId, outletId) => {
  try {
    const queryParams = buildParams({
      with_schedule: true,
    });

    const path = `${pathOnlineReservationClinic}/channel/${channelId}/clinic/${outletId}/doctor${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListProvider = async (params) => {
  try {
    const queryParams = buildParams({
      name: params.search,
      'provider-type': 'medpoint',
    });

    const path = `${pathOnlineReservation}/channel${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListSpecialist = async (params) => {
  try {
    const queryParams = buildParams({
      search: params.search,
    });

    const path = `${pathMediverseCmsPrivate}/specialist${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDownloadFileDoctor = async () => {
  try {
    const path = `${pathMediverseCmsPrivate}/template/download/doctor`;
    return await Axios.get(path, { responseType: 'blob' });
  } catch (error: any) {
    return error.response;
  }
};

export const postUploadFileDoctor = async (providerId, payload) => {
  const path = `${onlineReservationUpload}/channel/${providerId}/doctor/upload`;
  const formDataFile = new FormData();
  formDataFile.append('upload-file', payload);
  try {
    return await Axios.post(path, formDataFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const postDataDoctor = async (
  channelId: string | number,
  data: IPostDoctorData
) => {
  try {
    const url = `${pathOnlineReservation}/channel/${channelId}/doctor`;
    return await Axios.post(url, data);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataDoctor = async (
  channelId: string | undefined,
  doctorId: string | undefined,
  data: IPostDoctorData
) => {
  try {
    const queryParams = buildParams({
      with_schedule: true,
    });
    const url = `${pathOnlineReservationClinic}/channel/${channelId}/doctor/${doctorId}${queryParams}`;
    return await Axios.put(url, data);
  } catch (error: any) {
    return error.message;
  }
};

export const patchUpdateStatusDoctor = async (id?: string, status?: any) => {
  try {
    return await Axios.patch(`${pathSearch}/medpoint/${id}/banned`, {
      is_banned: status.is_banned,
      update_mode: 'batch',
      item_type: 'doctor',
    });
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataDoctor = async (providerId: any, id: any) => {
  try {
    const path = `${pathOnlineReservationClinic}/channel/${providerId}/doctor/${id}`;
    return await Axios.delete(path);
  } catch (error: any) {
    return error.response;
  }
};
