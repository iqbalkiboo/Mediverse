import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathSearch = paths.search;
const pathMediverseTelemedicineDoctorPublic = paths.mediverseTelemedicineDoctorPublic;

export const getDataList = async ({
  limit,
  offset,
  search,
  status,
  endDate,
  startDate,
}) => {
  try {
    const queryParams = buildParams({
      type: !search ? 'doctor' : '',
      limit,
      offset,
      keyword: search,
      show_banned: status,
    });
    const url = `${pathSearch}/medevo${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetail = async (id: any) => {
  try {
    return await Axios.get(`${pathSearch}/medevo/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const patchDoctorTelmedBanned = async (id?: string, status?: boolean) => {
  try {
    return await Axios.patch(`${pathSearch}/medevo/${id}/banned`, {
      is_banned: status,
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getSchedulesDoctorTelmed = async (id: string) => {
  try {
    const queryParams = buildParams({
      id_dokter: id,
    });
    const url = `${pathMediverseTelemedicineDoctorPublic}/get_jadwal_by_day${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};
export const patchRelatedDoctor = async (id, data) => {
  try {
    return Axios.patch(`${pathSearch}/medevo/${id}/related`, data);
  } catch (error: any) {
    return error.response;
  }
};
export const getDataDetail = async (id?: string) => {
  try {
    return await Axios.get(`${pathSearch}/medevo/${id}`);
  } catch (error: any) {
    return error.response;
  }
};
