import {paths} from '@/src/configs';
import Axios from '@/src/client/services';
import {buildParams} from '@/src/utils/buildParams';

const pathMediverseCmsPrivate = paths.mediverseCmsPrivate;

export const getListJoinPartner = async (params: any) => {
  const queryParams = buildParams({
    page: params.page,
    type: params.type,
    limit: params.limit,
    end_date: params.endDate,
    start_date: params.startDate,
    is_confirm: params.isConfirmed,
  });

  try {
    const path = `${pathMediverseCmsPrivate}/partner${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.message;
  }
};

export const patchStatusJoinPartner = async (id: any, data: any) => {
  try {
    const path = `${pathMediverseCmsPrivate}/partner/${id}`;
    return await Axios.patch(path, data);
  } catch (error: any) {
    return error.response;
  }
};
