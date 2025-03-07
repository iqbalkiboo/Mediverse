import {isArray} from 'lodash';

export const mapPlacements = (data) => {
  return isArray(data) ? data.map((item) => {
    return {
      id: item.clinicID || null,
      name: item.clinicName || '-',
      address: '-',
      image: item.treatments[0].configs['health-facility'].image || '',
    };
  }) : [];
};

export const mapHealthFacilityOption = (data) => {
  return isArray(data) ? data.map((item) => {
    return {
      value: item.clinicID || null,
      label: item.clinicName || '-',
    };
  }) : [];
};
