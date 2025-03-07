import Axios from '@/client/services';
import { paths } from '@/src/configs';
import { buildParams } from '@/utils/buildParams';

const pathHealthCareStore = paths.healthCareStore;

export const getListVaccine = async ({ search = '', page = 1, size = 50 }) => {
  try {
    const queryParams = buildParams({
      page,
      size,
      display: search,
    });
    const url = `${pathHealthCareStore}/vaccine${queryParams}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};
