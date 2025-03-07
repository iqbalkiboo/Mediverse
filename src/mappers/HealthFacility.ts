import { isArray } from 'lodash';

import { dateTimeToTimes, formatDate } from '@/src/utils/formatDate';
import { capitalizeFirstLetter, formatAddress } from '@/src/utils/formatText';

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const mapHealthFacilities = (data: any, params: any) => {
  const filteredData = data.filter((item: any) => {
    if (params.status && params.keyword) {
      return params.status === 'true'
        ? !item.is_banned === params.status
        : item;
    } else {
      return item;
    }
  });

  return filteredData.map((item: any) => ({
    id: item?.id || '-',
    status: !item?.is_banned,
    type: item?.item?.type ? item?.item?.type : item?.item_type,
    providerId: item?.provider_id || '-',
    clinicId: parseInt(item?.item_id) || '-',
    date: formatDate(item?.indexed_at, ' ', 'MMM') || '-',
    providerType: item?.provider_type || '-',
    name: item?.item.name || item?.item.nama_provider || item?.item.nama || '-',
  }));
};

export const mapHealthFacility = (data: any, providerSourceType: string) => {
  return {
    indexed_at: data.indexed_at,
    id: data.id || '-',
    isBanned: data.is_banned,
    providerType: data?.provider_type || '-',
    itemId: data?.item_id,
    type: data?.item?.type ? data?.item?.type : data?.item_type,
    latitude: data?.location?.lat,
    longitude: data?.location?.lon,
    email: data.item?.email || data?.item?.email_provider || '-',
    provider: data.item?.nama_provider || '-',
    phoneNumber: data.item?.phone || data?.item?.nohp_provider || '-',
    image:
      data.item?.imageUrl || data.item?.url_foto_provider || data.item?.image,
    address: data.item?.address
      ? formatAddress(data.item?.address)
      : data?.item?.alamat_provider || '-',
    name: data.item?.name || data.item?.nama_provider || data.item?.nama || '-',
    operationalHours:
      data?.item?.openHours?.length > 0
        ? data?.item?.openHours?.map((item: any) => ({
            day: days[item.day],
            open: item?.open || '-',
            '24HrsOpen': item['24HrsOpen'],
            close: item?.close || '-',
          }))
        : [],
    related: data?.related || [],
    providerSource: data?.provider_source_type || providerSourceType,
    providerId: data?.provider_id,
    clientId: data?.clientId,
    clientSecret: data?.clientSecret,
    organizationId: data?.organizationId,
  };
};

export const mapDetailPolyList = (data?: any) => {
  return data.map((item: any) => ({
    id: item.id || '-',
    name: item.name || '-',
    categoryName: item?.categoryName || '-',
    categoryId: item?.categoryId || '-',
    clinics: item.clinics || [],
    createdAt: item.createdAt || null,
    updatedAt: item.updatedAt || null,
    deletedAt: item.deletedAt || null,
  }));
};

export const mapDetailServiceList = (data: any) => {
  return data?.map((item: any) => ({
    id: item?.treatmentType?.id || '-',
    service_name: item?.treatmentType?.name || '-',
    service_group: item?.treatmentType?.configs?.['service-group']?.name || '-',
    service_type: item?.treatmentType?.type || '-',
    mediverse_price: item?.treatmentType?.price || 0,
  }));
};

export const mapDetailDoctorList = (data: any) => {
  const mapTreatment = (data: any[], type: string) => {
    if (isArray(data) && data?.length > 0) {
      if (type === 'treatment') {
        return data?.map((item) => item?.name);
      }

      if (type === 'treatmentGroup') {
        return data?.map((item) => item?.configs?.['service-group']?.name);
      }

      if (type === 'poly') {
        return data?.map((item) => item?.configs?.poli?.name);
      }
    } else {
      return '-';
    }
  };
  return data.map((item: any) => ({
    doctorId: item.id || '-',
    doctorName: item.nama || '-',
    specialist: item.spesialis || '-',
    service: mapTreatment(item?.treatments, 'treatment') || '-',
    serviceType: mapTreatment(item?.treatments, 'treatmentGroup') || '-',
    poly: mapTreatment(item?.treatments, 'poly') || '-',
  }));
};

export const mapDetailRatingAndReview = (data: any) => {
  const mapRatingAndReviewList = data.ratings.map((item: any) => ({
    id: item.id || '-',
    reviewer_name: item.reviewer_name || '-',
    reviewer_profile: item.reviewer_profile || '-',
    reviewer_star_rating: item.reviewer_star_rating || 0,
    review_date: item.review_date || '-',
  }));

  return {
    rating_star_avg: data.rating_star_avg,
    rating_total: data.rating_total,
    item: mapRatingAndReviewList,
  };
};

export const mapBusinessSchema = (data: any) => {
  return {
    id: data?.id || 0,
    createdAt: data?.createdAt || 0,
    deletedAt: data?.deletedAt || 0,
    updatedAt: data?.updatedAt || 0,
    endDuration: data?.endDuration || 0,
    periode: data?.periode || 0,
    startDuration: data?.startDuration || 0,
    type: data?.type || '-',
    unit: data?.unit || '-',
    channelID: data?.channelID || '-',
    sharingShare: data?.sharingShare || [],
  };
};

export const mapSellingFactor = (data: any) => {
  return {
    id: data?.id || 0,
    deletedAt: data?.deletedAt || 0,
    updatedAt: data?.updatedAt || 0,
    endDuration: data?.endDuration || 0,
    percentage: data?.percentage || 0,
    percentageWithPpn: data?.percentageWithPpn || 0,
    startDuration: data?.startDuration || 0,
    channelID: data?.channelID || 0,
  };
};

export const mapPlatformFee = (data: any) => {
  let plans;
  let services;

  if (data?.plans) {
    plans = (data?.plans || []).map((item) => {
      if (item) {
        return {
          id: item.id,
          createdAt: item.createdAt,
          deletedAt: item.deletedAt,
          updatedAt: item.updatedAt,
          endPeriod: item.endPeriod,
          holding: item.holding,
          merchan: item.merchan,
          startPeriod: item.startPeriod,
          user: item.user,
          platformFeeID: item.platformFeeID,
        };
      }
    });
  }

  if (data?.services) {
    services = (data?.services || []).map((item) => {
      if (item) {
        return {
          id: item.id,
          createdAt: item.createdAt,
          deletedAt: item.deletedAt,
          updatedAt: item.updatedAt,
          serviceType: item.serviceType,
          startDate: item.startDate,
          type: item.type,
          value: item.value,
          valueWithPpn: item.valueWithPpn,
          platformFeeID: item.platformFeeID,
        };
      }
    });
  }

  return {
    id: data?.id || 0,
    createdAt: data?.createdAt || 0,
    deletedAt: data?.deletedAt || 0,
    updatedAt: data?.updatedAt || 0,
    endDuration: data?.endDuration || 0,
    startDuration: data?.startDuration || 0,
    channelID: data?.channelID || 0,
    plans: plans,
    services: services,
  };
};

export const mapOperationalHours = (template: any, data: any) => {
  return template
    .filter((item) => !item.notOpen)
    .map((item, idx) => {
      return {
        '24HrsOpen': template[idx]['24HrsOpen']
          ? template[idx]['24HrsOpen']
          : false,
        closeTime: dateTimeToTimes(data[`closeTime${idx}`]) || '',
        day: idx,
        openTime: dateTimeToTimes(data[`openTime${idx}`]) || '',
      };
    });
};

export const mapListSelectProvider = (data: any[]) => {
  return data.map((item: any) => {
    return {
      title: capitalizeFirstLetter(item.name),
      value: item.id,
    };
  });
};

export const mapListSelectLocation = (data: any) => {
  return data.map((item) => {
    return {
      title: item.name,
      value: item.code,
    };
  });
};

export const mapListSelectPoli = (data: any[]) => {
  return data.map((item: any) => {
    return {
      label: capitalizeFirstLetter(item.name),
      value: item.id,
    };
  });
};

export const mapListSelectMasterPoli = (data: any[]) => {
  return data?.map((item: any) => {
    return {
      label: item?.poly_name,
      value: item?.poly_name,
    };
  });
};

export const mapListSelectMasterSymptom = (data: any[]) => {
  return data?.map((item: any) => {
    return {
      label: item?.symptom_name,
      value: item?.symptom_name,
    };
  });
};

export const mapListSelectDoctor = (data: any[]) => {
  return data.map((item: any) => {
    return {
      title: capitalizeFirstLetter(item.nama) || '-',
      value: item,
    };
  });
};

export const mapPayloadLaboratorium = (data: any, hours) => {
  return {
    name: data.name,
    phone: data.phoneNumber,
    email: data.email,
    image: data.photo,
    timezone: 'WIB',
    servesHomeService: null,
    openHours: hours,
    type: data.type,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
    organizationId: data.organizationId,
    address: {
      village: data.village,
      villageId: '',
      district: '',
      districtId: '',
      subDistrict: data.subDistrict,
      subDistrictId: data.subDistrictId,
      city: data.districtOrCity,
      cityId: data.districtOrCityId,
      province: data.province,
      provinceId: data.provinceId,
      street: data.street,
      postcode: data.postalCode,
      longitude: parseFloat(data.longitude),
      latitude: parseFloat(data.latitude),
    },
  };
};

export const mapPayloadLaboratoriumUpdate = (data: any, hours) => {
  return {
    name: data.name,
    phone: data.phoneNumber,
    email: data.email,
    image: data.photo,
    timezone: 'WIB',
    servesHomeService: null,
    openHours: hours,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
    organizationId: data.organizationId,
    address: {
      village: data.village,
      subDistrict: data.subDistrict,
      subDistrictId: data.subDistrictId,
      city: data.districtOrCity,
      cityId: data.districtOrCityId,
      province: data.province,
      provinceId: data.provinceId,
      street: data.street,
      postcode: data.postalCode,
      longitude: parseFloat(data.longitude),
      latitude: parseFloat(data.latitude),
    },
    polyIDs: data?.polis?.map((item: any) => item.id),
  };
};

export const mapPayloadClinic = (data: any) => {
  return {
    name: data.name,
    phone: data.phoneNumber,
    email: data.email,
    image: data.photo,
    timezone: 'WIB',
    servesHomeService: null,
    openHours: data.operationalHours,
    address: {
      village: data.village,
      villageId: '',
      district: '',
      districtId: '',
      subDistrict: data.subDistrict,
      subDistrictId: data.subDistrictId,
      city: data.districtOrCity,
      cityId: data.districtOrCityId,
      province: data.province,
      provinceId: data.provinceId,
      street: data.street,
      postcode: data.postalCode,
      longitude: parseFloat(data.longitude),
      latitude: parseFloat(data.latitude),
    },
    polyIDs: data?.polis?.map((item: any) => item.id),
  };
};

export const mapPayloadClinicUpdate = (data: any, hours) => {
  return {
    name: data.name,
    phone: data.phoneNumber,
    email: data.email,
    image: data.photo,
    timezone: 'WIB',
    servesHomeService: null,
    openHours: hours,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
    organizationId: data.organizationId,
    address: {
      village: data.village,
      subDistrict: data.subDistrict,
      subDistrictId: data.subDistrictId,
      city: data.districtOrCity,
      cityId: data.districtOrCityId,
      province: data.province,
      provinceId: data.provinceId,
      street: data.street,
      postcode: data.postalCode,
      longitude: parseFloat(data.longitude),
      latitude: parseFloat(data.latitude),
    },
    polyIDs: data?.polis?.map((item: any) => item.id),
  };
};

export const mapHealthFacilitiesByProvider = (data) => {
  return data.length > 0
    ? data.map((item: any) => ({
        id: item.id,
        name: item.name,
        providerType: 'medpoint',
        type: item.type,
        date: formatDate(item?.createdAt * 1000, ' ', 'MMM'),
      }))
    : [];
};

export const mapHealthFacilityByProvider = (
  data,
  providerSourceType: string
) => {
  return {
    indexed_at: data.createdAt || '-',
    id: data.id || '-',
    isBanned: data?.is_banned,
    providerType: 'medpoint',
    itemId: data?.id || '-',
    type: data?.type || '-',
    latitude: data?.address?.latitude || '-',
    longitude: data?.address?.longitude || '-',
    email: data?.email || '-',
    provider: data.item?.nama_provider || '-',
    phoneNumber: data?.phone || '-',
    image: data.item?.imageUrl || data.item?.url_foto_provider,
    address: data?.address ? formatAddress(data?.address) : '-',
    name: data?.name || '-',
    operationalHours:
      data?.openHours?.length > 0
        ? data?.openHours?.map((item: any) => ({
            day: days[item.day],
            open: item?.openTime || '-',
            '24HrsOpen': item['24HrsOpen'],
            close: item?.closeTime || '-',
          }))
        : [],
    related: data?.related || [],
    providerSource: data?.provider_source_type || providerSourceType,
    clientId: data?.clientId,
    clientSecret: data?.clientSecret,
    organizationId: data?.organizationId,
  };
};

export const mapPayloadHealthFacility = (data: any, hours) => {
  return {
    name: data.name,
    phone: data.phoneNumber,
    email: data.email,
    image: data.photo,
    timezone: 'WIB',
    servesHomeService: null,
    openHours: hours,
    type: data.type,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
    organizationId: data.organizationId,
    address: {
      village: data.village,
      villageId: '',
      district: '',
      districtId: '',
      subDistrict: data.subDistrict,
      subDistrictId: data.subDistrictId,
      city: data.districtOrCity,
      cityId: data.districtOrCityId,
      province: data.province,
      provinceId: data.provinceId,
      street: data.street,
      postcode: data.postalCode,
      longitude: parseFloat(data.longitude),
      latitude: parseFloat(data.latitude),
    },
    polyIDs: data?.polis?.map((item: any) => item.id),
  };
};

export const mapProvidersOption = (data: any) => {
  return data.map((item) => {
    return {
      title: item?.name,
      value: item?.id,
    };
  });
};

export const mapOperationalHoursUpdate = (template: any, data: any) => {
  return template.map((_, idx) => {
    return {
      '24HrsOpen': template[idx]['24HrsOpen']
        ? template[idx]['24HrsOpen']
        : false,
      closeTime: dateTimeToTimes(data[idx]['closeTime']) || '',
      day: idx,
      openTime: dateTimeToTimes(data[idx]['openTime']) || '',
    };
  });
};

export const mapProviderOptionDefault = (data) => {
  return {
    title: data.name,
    value: data.id,
  };
};
