import Axios from '../services';
import {buildParams} from '@/src/utils/buildParams';

export const Service = async (page: number = 1, limit: number = 3) => {
  try {
    const queryParams = buildParams({
      _page: page,
      _limit: limit,
    });
    return await Axios.get(`/corporates${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};
