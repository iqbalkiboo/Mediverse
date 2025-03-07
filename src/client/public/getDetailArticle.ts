import Axios from '../services';
import {buildParams} from '@/src/utils/buildParams';

export const Service = async (slug) => {
  try {
    const queryParams = buildParams({
      slug,
    });
    return await Axios.get(`/detail_article${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};
