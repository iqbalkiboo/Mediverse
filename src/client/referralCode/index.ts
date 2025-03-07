import Axios from '@/src/client/services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {dateToUnixTimeStamp} from '@/src/utils/dates';
import dayjs from 'dayjs';

const pathMediverseReferral = paths.mediverseReferral;
const pathVoucher = `${pathMediverseReferral}/cms/voucher`;

const startMonth = dayjs().startOf('month');
const endMonth = dayjs().endOf('month');

export const getDataRecapReferralCode = async () => {
  const url = `${pathMediverseReferral}/cms/referral/recap`;

  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListVoucher = async ({
  search = '',
  page = 1,
  limit = 10,
  status,
  startDate,
  endDate,
}) => {
  const queryParams = buildParams({
    limit,
    page,
    status: status || '',
    name: search || '',
    start_date: startDate === '' ?
      dateToUnixTimeStamp(startMonth.toString()) :
      dateToUnixTimeStamp(startDate),
    end_date: endDate === '' ?
      dateToUnixTimeStamp(endMonth.toString()) :
      dateToUnixTimeStamp(endDate),
  });
  const url = `${pathVoucher}${queryParams}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};

export const getListVoucherUsage = async ({
  search = '',
  page = 1,
  limit = 10,
}) => {
  const queryParams = buildParams({
    limit,
    page,
    name: search || '',
  });
  const url = `${pathVoucher}/usage${queryParams}`;
  try {
    return await Axios.get(url);
  } catch (error: any) {
    return error.response;
  }
};
