import Axios from '@/src/client/services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {dateToUnixTimeStamp} from '@/src/utils/dates';

const pathHealthCareStore = paths.healthCareStore;
const pathOnlineReservation = paths.onlineReservation;

export const getListPlatformFee = async ({
  page,
  limit,
  search,
  status,
  endDate,
  startDate,
  providerType,
}) => {
  try {
    const queryParams = buildParams({
      'page': page,
      'size': limit,
      'provider-name': search,
      'is-active': status,
      'provider-type': providerType,
      'start-duration': startDate ? dateToUnixTimeStamp(startDate) : '',
      'end-duration': endDate ? dateToUnixTimeStamp(endDate) : '',
    });

    const host = providerType === 'medpoint' ? pathOnlineReservation : pathHealthCareStore;
    const url = `${host}/channel/platform-fee${queryParams}`;

    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailPlatformFee = async (channelId, id, providerType) => {
  const host = providerType === 'medpoint' ? pathOnlineReservation : pathHealthCareStore;
  try {
    return await Axios.get(`${host}/channel/${channelId}/platform-fee/${id}`);
  } catch (error: any) {
    return error.response;
  }
};
