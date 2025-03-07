import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';

const pathUserShared = paths.userShared;

export const apiAddCorporate = async (payload) => {
  try {
    return await Axios.post('/corporates', payload);
  } catch (error: any) {
    return error.response;
  }
};

export const getCorporates = async ({
  page = 1,
  limit = 10,
}) => {
  try {
    const queryParams = buildParams({
      page,
      limit,
    });
    return await Axios.get(`${pathUserShared}/company${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};
