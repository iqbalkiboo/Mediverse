import {paths} from '@/src/configs';
import Axios from '@/src/client/services';
import {buildParams} from '@/src/utils/buildParams';

const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;
const pathSearch = paths.search;
const pathSpecialist = `${pathMediverseCmsPrivate}/specialist`;

export const getDataListSpecialist = async ({
  search = '',
  page = 1,
  limit = 10,
  isActive,
}) => {
  const queryParams = buildParams({
    page,
    limit,
    search,
    is_active: isActive !== 'all' ? isActive : '',
  });
  const url = `${pathSpecialist}${queryParams}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataListDoctor = async (name) => {
  try {
    const queryParams = buildParams({
      keyword: name,
    });

    return await Axios.get(`${pathSearch}/medpoint${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDataDetailSpecialist = async (id) => {
  try {
    return await Axios.get(`${pathSpecialist}/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataSpecialist = async (payload) => {
  try {
    return await Axios.post(pathSpecialist, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataSpecialist = async (id, payload) => {
  const url = `${pathSpecialist}/${id}`;

  try {
    return await Axios.put(url, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataSpecialist = async (id) => {
  const url = `${pathSpecialist}/${id}`;

  try {
    return await Axios.delete(url);
  } catch (error: any) {
    return error.response;
  }
};
