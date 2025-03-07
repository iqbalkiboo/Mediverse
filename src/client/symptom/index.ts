import Axios from '../services';
import axios from 'axios';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {dateToUnixTimeStamp} from '@/src/utils/dates';

const pathCmsPrivate = paths.mediverseCmsPrivate;
const pathSymptomChecker = paths.symptomChecker;

export const getListSymptom = async ({
  search = '',
  page = 1,
  limit = 10,
  status,
  startDate,
  endDate,
}) => {
  try {
    const queryParams = buildParams({
      page,
      limit,
      search: search,
      is_active: status !== 'all' ? status : '',
      start_date: startDate ? dateToUnixTimeStamp(startDate, true) : '',
      end_date: endDate ? dateToUnixTimeStamp(endDate, false) : '',
    });
    const url = `${pathCmsPrivate}/symptom${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListSymptomChecker = async () => {
  try {
    return await axios.get(pathSymptomChecker);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailSymptom = async (id) => {
  try {
    const url = `${pathCmsPrivate}/symptom/${id}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const postSymptom = async (payload) => {
  try {
    return await Axios.post(`${pathCmsPrivate}/symptom`, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const patchSymptom = async (id, payload) => {
  try {
    const url = `${pathCmsPrivate}/symptom/${id}`;
    return await Axios.patch(url, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteSymptom = async (id) => {
  try {
    const url = `${pathCmsPrivate}/symptom/${id}`;
    return await Axios.delete(url);
  } catch (error: any) {
    return error.response;
  }
};
