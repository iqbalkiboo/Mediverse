import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';


const pathNotif = paths.notification;


export const getListNotification = async (params) => {
  try {
    const queryParams = buildParams({
      category: params.category,
      limit: params.limit,
      offset: params.offset,
      start_date: params.startDate,
      end_date: params.endDate,
      is_read: params.isRead,
    });

    const path = `${pathNotif}/v2/notifications${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const putNotification = async (params) => {
  try {
    const payload = {
      id: params.id,
      is_read: params.isRead,
    };

    const path = `${pathNotif}/v2/notifications`;
    return await Axios.put(path, payload);
  } catch (error: any) {
    return error.response;
  }
};
