import {
  IPlatformFeeDetail,
  IPlatformFeeItem,
} from '@/src/types/MasterProvider/platformFee/platformFee';
import {
  calcDate,
  checkPeriodeStatus,
  formatDatePeriode,
  unixTimeStampToDate,
} from '@/src/utils/dates';
import {capitalizeFirstLetter} from '@/src/utils/formatText';
import {isArray, isEmpty} from 'lodash';

export const mapListProviderPlatformFee = (data: IPlatformFeeItem[]) => {
  if (isEmpty(data)) return [];

  const result = data.map((item: IPlatformFeeItem) => {
    return {
      id: item.id,
      channel_id: item.channelID || item?.channelId,
      applies_to: item.channelName || '-',
      provider_type: capitalizeFirstLetter(item.channelProviderType) || '-',
      status: checkPeriodeStatus(item.startDuration, item.endDuration),
      cooperation_periode: formatDatePeriode(
          unixTimeStampToDate(item.startDuration),
          unixTimeStampToDate(item.endDuration),
          false,
      ),
      rest_of_cooperation: checkPeriodeStatus(
          item.startDuration,
          item.endDuration,
      ) ?
        calcDate(
            unixTimeStampToDate(item.startDuration),
            unixTimeStampToDate(item.endDuration),
        ).result :
        '-',
    };
  });

  return result;
};

export const mapDetailProviderPlatformFee = (data: IPlatformFeeDetail) => {
  const plans = data?.plans?.map((item: any) => {
    return {
      id: item.id,
      start_period: item.startPeriod || 0,
      end_period: item.endPeriod || 0,
      holding: item.holding || 0,
      merchant: item.merchan || 0,
      user: item.user || 0,
      percentage: item.percentage || 0,
    };
  });

  const services = data?.services?.map((item: any) => {
    return {
      id: item.id,
      service_type: item.serviceType || '-',
      type: item.type || '-',
      value: item.value || 0,
    };
  });

  return {
    id: data?.id,
    information: {
      applies_to: data?.channel?.name || '-',
      provider_type: data?.channel?.providerType || '-',
    },
    platformFee: {
      time_start_duration: data?.startDuration,
      time_end_duration: data?.endDuration,
      rest_time: '-',
      plans: isArray(plans) ? plans : [],
      services: isArray(services) ? services : [],
    },
  };
};
