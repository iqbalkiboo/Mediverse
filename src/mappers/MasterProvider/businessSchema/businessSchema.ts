import {
  calcDate,
  checkPeriodeStatus,
  formatDatePeriode,
  unixTimeStampToDate,
} from '@/src/utils/dates';

import {
  IBusinessSchemaDetailType,
  IBusinessSchemaType,
} from '@/src/types/BusinessSchema';
import {capitalizeFirstLetter} from '@/src/utils/formatText';

export const mapBusinessSchema = (data: IBusinessSchemaType[], type: string) => {
  return data?.map((item: IBusinessSchemaType) => {
    return {
      id: item.id,
      channelId: item.channelId,
      appliesTo: item.channelName,
      status: checkPeriodeStatus(item.startDuration, item.endDuration),
      cooperationPeriode: formatDatePeriode(
          unixTimeStampToDate(item.startDuration),
          unixTimeStampToDate(item.endDuration),
          false,
      ),
      providerType: capitalizeFirstLetter(type),
      restOfCooperation: checkPeriodeStatus(item.startDuration, item.endDuration) ?
        calcDate(
            unixTimeStampToDate(item.startDuration),
            unixTimeStampToDate(item.endDuration),
        ).result : '-',
    };
  });
};

export const mapBusinessSchemaDetail = (data: IBusinessSchemaDetailType, type: string) => {
  return {
    id: data?.id || '-',
    applyTo: data?.channel?.name || '-',
    information: {
      providerType: data?.channel?.providerType || type || '-',
    },
    businessSchema: {
      type: data?.type || '-',
      endDuration: data?.endDuration || '',
      startDuration: data?.startDuration || '',
      periode: data?.periode || '-',
      remainingCooperation: data?.remainingCooperation || '-',
      sharingFlat: {
        id: data?.sharingFlat?.id || '-',
        percentage: data?.sharingFlat?.percentage || 0,
        percentageWithPpn: data?.sharingFlat?.percentageWithPpn || 0,
      },
      sharingShare: data?.sharingShare && data?.sharingShare.length > 0 ? data?.sharingShare.map((item: any) => ({
        id: item.id || '-',
        percentage: item.percentage || 0,
        percentageWithPpn: item.percentageWithPpn || 0,
        minAmount: item.minAmount || 0,
        maxAmount: item.maxAmount || 0,
      })) : [],
    },
  };
};
