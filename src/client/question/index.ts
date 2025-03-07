import {paths} from '@/src/configs';
import Axios from '@/src/client/services';
import {buildParams} from '@/src/utils/buildParams';

const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;

export const getListQuestion = async (params: any) => {
  const queryParams = buildParams({
    page: params.page,
    limit: params.limit,
    end_date: params.endDate,
    start_date: params.startDate,
    is_confirm: params.isConfirmed,
  });

  try {
    const path = `${pathMediverseCmsPrivate}/faq${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const patchStatusQuestion = async (id: any, data: any) => {
  try {
    const path = `${pathMediverseCmsPrivate}/faq/${id}`;
    return await Axios.patch(path, data);
  } catch (error: any) {
    return error.response;
  }
};
