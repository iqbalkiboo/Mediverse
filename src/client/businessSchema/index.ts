import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {dateToUnixTimeStamp} from '@/src/utils/dates';
import {IGetDataBusinessSchemaParams} from '@/src/types/BusinessSchema';

const pathOnlineReservation = paths.onlineReservation;
const pathHealthcareStore = paths.healthCareStore;

export const getDataList = async (params: IGetDataBusinessSchemaParams) => {
  try {
    const queryString = buildParams({
      'page': params.page,
      'size': params.limit,
      'is-active': params.status,
      'provider-type': params.type,
      'provider-name': params.keyword,
      'end-duration': dateToUnixTimeStamp(params.endDate || '', false, false) - (86400 * 2),
      'start-duration': dateToUnixTimeStamp(params.startDate || '', false, false),
    });

    const host = params.type === 'medpoint' ? pathOnlineReservation : pathHealthcareStore;
    const url = `${host}/channel/business-schema${queryString}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetail = async (channelId: string, businessSchemaId: string, providerType?: string) => {
  try {
    const host = providerType?.toLowerCase() === 'medpoint' ? pathOnlineReservation : pathHealthcareStore;
    const url = `${host}/channel/${channelId}/business-schema/${businessSchemaId}`;
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};
