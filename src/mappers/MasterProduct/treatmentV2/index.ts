import {isArray} from 'lodash';
import {unixTimeStampToDate} from '@/src/utils/dates';
import {formatRupiah} from '@/src/utils/fromatCurrency';
import {capitalizeFirstLetter} from '@/src/utils/formatText';

export const mapListTreatment = (data: any[]) => {
  const result = isArray(data) ? data?.map((item: any) => {
    return {
      treatmentId: item?.id || null,
      providerId: item?.providerId || null,
      providerName: item?.providerName || '-',
      serviceName: item?.serviceName || '-',
      serviceType: item?.serviceType || '-',
      mediversePrice: formatRupiah(item?.price) || '-',
      status: item?.status || false,
    };
  }) : [];
  return result;
};

export const mapDetailTreatment = (data: any) => {
  return {
    name: data?.name || '-',
    id: data?.id || '-',
    information: {
      provider: capitalizeFirstLetter(data?.information?.provider) || '-',
      type: data?.information?.type || '-',
      poly: capitalizeFirstLetter(data?.information?.poly) || '-',
      masterTreatment: capitalizeFirstLetter(data?.information?.masterTreatment) || '-',
      price: formatRupiah(data?.information?.price) || 0,
      sellingFactor: data?.information?.sellingFactor || 0,
      mediversePrice: formatRupiah(data?.information?.mediversePrice) || 0,
      createdDate: unixTimeStampToDate(data?.information?.createdDate) || '-',
    },
    criteria: {
      maxAge: data?.criteria?.maxAge || 0,
      minAge: data?.criteria?.minAge || 0,
      durationTreatment: data?.criteria?.durationTreatment || 0,
      maxParticipant: data?.criteria?.maxParticipant || 0,
      preorderSetting: data?.criteria?.preorderSetting || 0,
      countParticipantPerVial: data?.criteria?.countParticipantPerVial || 0,
    },
    listHealthFacility: isArray(data?.listHealthFacility) ? data?.listHealthFacility?.map((item: any) => {
      return {
        id: item?.id || null,
        name: item?.name || '-',
        countDoctors: item?.countDoctors || 0,
        status: item?.status || false,
      };
    }) : [],
  };
};

export const mapListDoctor = (data: any[]) => {
  const result = isArray(data) ? data?.map((item: any) => {
    return {
      id: item?.id || null,
      strNumber: item?.strNumber || '-',
      sipNumber: item?.sipNumber || '-',
      doctorName: item?.doctorName || '-',
      specialization: item?.specialization || '-',
      treatments: item?.treatments || [],
    };
  }) : [];
  return result;
};

export const mapDetailDoctor = (data: any) => {
  const result = {
    name: data?.nameDoctor || '-',
    noSIP: data?.noSIP || '-',
    treatments: data?.treatments.map((treatment) => {
      return {
        name: treatment?.name || '-',
        price: treatment?.price || '-',
      };
    }),
  };
  return result;
};
