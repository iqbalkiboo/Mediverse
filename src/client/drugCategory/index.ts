import { paths } from '@/src/configs';
import { buildParams } from '@/src/utils/buildParams';
import Axios from '@/src/client/services';

const pathHealthCare = paths.healthCareStore;
const pathCategory = pathHealthCare
  ? `${pathHealthCare}/drug/category`
  : '/drug/category';
const pathSubcategory = pathHealthCare
  ? `${pathHealthCare}/drug/subcategory`
  : '/drug/subcategory';

export const getListDrugCategory = async ({
  search = '',
  page = 1,
  limit = 5,
  status,
  startDate,
  endDate,
}) => {
  try {
    const queryParams = buildParams({
      page,
      size: limit,
      search: search,
      is_active: status,
      'start-date': startDate,
      'end-date': endDate,
    });
    const url = `${pathCategory}${queryParams}`;
    return await Axios.get(`${url}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getSearchListDrugCategory = async (search) => {
  try {
    const queryParams = buildParams({
      search: search,
    });
    const url = `${pathCategory}${queryParams}`;
    return await Axios.get(`${url}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailDrugCategory = async (id: string | number) => {
  try {
    return await Axios.get(`${pathCategory}/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataDrugCategory = async (payload) => {
  try {
    return await Axios.post(pathCategory, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataDrugCategory = async (id: string | number, data) => {
  try {
    return await Axios.put(`${pathCategory}/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataDrugCategory = async (id: any) => {
  try {
    return await Axios.delete(`${pathCategory}/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getListDrugSubcategory = async (id: string | number, params) => {
  try {
    const { search, page, limit } = params;
    const queryParams = buildParams({
      category_id: id,
      page,
      size: limit,
      search: search,
    });
    const url = `${pathSubcategory}${queryParams}`;
    return await Axios.get(`${url}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailDrugSubcategory = async (id: string | number) => {
  try {
    return await Axios.get(`${pathSubcategory}/${id}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postDataDrugSubcategory = async (payload) => {
  try {
    return await Axios.post(pathSubcategory, payload);
  } catch (error: any) {
    return error.response;
  }
};

export const putDataDrugSubcategory = async (id: string | number, data) => {
  try {
    return await Axios.put(`${pathSubcategory}/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteDataDrugSubcategory = async (id: any) => {
  try {
    return await Axios.delete(`${pathSubcategory}/${id}`);
  } catch (error: any) {
    return error.response;
  }
};
