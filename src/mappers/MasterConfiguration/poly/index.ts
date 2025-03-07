import {isArray} from 'lodash';
import {unixTimeStampToDate} from '@/src/utils/dates';
import {capitalizeFirstLetter} from '@/src/utils/formatText';

export const mapListPoly = (data: any[]) => {
  const result = isArray(data) ? data.map((item: any) => {
    return {
      id: item?.id || null,
      name: item?.poly_name || '-',
      code: item?.poly_code || '-',
      treatmentTotal: item?.treatment_total || 0,
      createdDate: item?.created_at ? unixTimeStampToDate(item.created_at) : '-',
      status: item?.is_active || false,
      serviceCount: item?.service_count || 0,
    };
  }) : [];

  return result;
};

export const mapDetailPoly = (data: any) => {
  const result = {
    id: data?.id || null,
    name: data?.poly_name || '-',
    icon: data?.poly_icon || '',
    code: data?.poly_code || '-',
    treatmentTotal: data?.treatment_total || 0,
    createdDate: data?.created_at ? unixTimeStampToDate(data.created_at) : '-',
    status: data?.is_active || false,
  };

  return result;
};

export const mapListHealthFacilityInPoly = (data: any) => {
  const mapHealthFacilityType = (type) => {
    switch (type) {
      case 'hospital':
        return 'Rumah Sakit';
      case 'clinic':
      case 'outlet':
        return 'Klinik';
      case 'lab':
        return 'Lab';
      default:
        return '-';
    }
  };
  const result = isArray(data) ? data?.map((item: any) => {
    return {
      id: item?.id || '-',
      name: item?.item?.name || item?.item?.nama_provider || '-',
      healthFacilityType: mapHealthFacilityType(item?.item_type) || '-',
      providerType: capitalizeFirstLetter(item?.provider_type) || '-',
      status: !item?.is_banned,
    };
  }) : [];

  return result;
};

export const mapListTreatmentInPoly = (data: any) => {
  const result = isArray(data) ? data?.map((item) => {
    return {
      id: item?.id || '',
      name: item?.service_name || '-',
    };
  }) : [];

  return result;
};

