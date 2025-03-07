import { isArray } from 'lodash';

import {
  dateDeviation,
  dateTimeToTimes,
  formatDateWithDay,
} from '@/src/utils/formatDate';
import { unixTimeStampToDate } from '@/src/utils/dates';
import { capitalizeFirstLetter } from '@/src/utils/formatText';
import { formatRupiah } from '@/src/utils/fromatCurrency';
import { ROLES_NAME } from '@/src/constants';

export const mapListPharmacy = (
  data: any[],
  roleName: string,
  type?: string,
  providerType?: string
) => {
  const resultElastic = isArray(data)
    ? data
        ?.map((item: any) => {
          return {
            id: item?.id || null,
            providerId: item?.provider_id || null,
            isHub: item?.item?.isHub || false,
            name: capitalizeFirstLetter(item?.item?.name) || '-',
            providerType: capitalizeFirstLetter(item?.provider_type) || '-',
            createdDate: formatDateWithDay(item?.indexed_at) || '-',
            status: !item?.is_banned,
            itemType: item?.item_type || null,
          };
        })
        .filter((item: any) => item?.itemType === type)
    : [];

  const resultPharmacy = isArray(data)
    ? data?.map((item: any) => {
        return {
          id: item?.id || null,
          providerId: item?.provider_id || null,
          isHub: item?.isHub || false,
          name: capitalizeFirstLetter(item?.name) || '-',
          providerType: 'Medpharm',
          createdDate: formatDateWithDay(item?.createdAt * 1000) || '-',
          status: !item?.is_banned,
        };
      })
    : [];

  switch (roleName) {
    case ROLES_NAME.ADMINISTRATOR_PROVIDER_MEDPHARM:
      switch (providerType) {
        case 'internal':
          return resultPharmacy;
        case 'external':
          return resultElastic;
        default:
          return [];
      }
    case ROLES_NAME.SUPER_ADMIN:
    case ROLES_NAME.ADMINISTRATOR_MEDIVERSE:
      return resultElastic;
    default:
      return [];
  }
};

export const mapDetailPharmacy = (
  data: any,
  roleName: string,
  providerType?: string
) => {
  const mapDeliveryTypes = (
    isInstant: boolean,
    isReguler: boolean,
    isSelfPickup: boolean
  ) => {
    return [
      isInstant ? 'Pengiriman Instant' : false,
      isReguler ? 'Pengiriman Reguler' : false,
      isSelfPickup ? 'Pickup Mandiri' : false,
    ].filter((item) => item !== false);
  };

  const mapAddress = (address) => {
    return address
      ? [
          address?.street,
          address?.village,
          address?.district,
          address?.city,
          address?.province,
          address?.postcode,
        ].join(', ')
      : '-';
  };

  const mapHourSchedules = (schedules) => {
    return isArray(schedules)
      ? schedules.map((schedule) => {
          return {
            is24Hour: schedule['24HrsOpen'],
            closeTime: schedule?.close || schedule?.closeTime,
            day: schedule?.day,
            openTime: schedule?.open || schedule?.openTime,
          };
        })
      : [];
  };

  const resultElastic = {
    id: data?.id || null,
    itemId: data?.item?.id || null,
    name: capitalizeFirstLetter(data?.item?.name) || '-',
    status: !data?.is_banned,
    information: {
      providerType: capitalizeFirstLetter(data?.provider_type) || '-',
      isHub: data?.item?.isHub || false,
      pic: capitalizeFirstLetter(data?.item?.pc) || '-',
      sipa: data?.item?.sipa || '-',
      apa: data?.item?.apa || '-',
      sia: data?.item?.sia || '-',
      phoneNumber: data?.item?.phone || '-',
      email: data?.item?.email || '-',
      deliveryTypes:
        mapDeliveryTypes(
          data?.item?.acceptsInstantDelivery,
          data?.item?.deliveryServiceAvailable,
          data?.item?.isPickupOutletAvailable
        ) || [],
      address: mapAddress(data?.item?.address) || '-',
      operationalHourSchedules: mapHourSchedules(data?.item?.openHours),
      practiceHourSchedules: mapHourSchedules(data?.item?.practiceHours),
      longitude: data?.item?.address?.longitude || '-',
      latitude: data?.item?.address?.latitude || '-',
      maps:
        data?.item?.address?.longitude && data?.item?.address?.latitude
          ? `https://maps.google.com/?q=${data?.item?.address?.longitude}${data?.item?.address?.latitude}`
          : '-',
      photoSignaturePic: data?.item?.signaturePic || '-',
    },
  };

  const resultPharmacy = {
    id: data?.id || null,
    itemId: data?.id || null,
    name: capitalizeFirstLetter(data?.name) || '-',
    status: !data?.is_banned,
    information: {
      providerType: 'Medpharm' || '-',
      isHub: data?.isHub || false,
      pic: capitalizeFirstLetter(data?.pc) || '-',
      sipa: data?.sipa || '-',
      apa: data?.apa || '-',
      sia: data?.sia || '-',
      phoneNumber: data?.phone || '-',
      deliveryTypes:
        mapDeliveryTypes(
          data?.acceptsInstantDelivery,
          data?.deliveryServiceAvailable,
          data?.isPickupOutletAvailable
        ) || [],
      address: mapAddress(data?.address) || '-',
      operationalHourSchedules: mapHourSchedules(data?.openHours),
      practiceHourSchedules: mapHourSchedules(data?.practiceHours),
      longitude: data?.address?.longitude || '-',
      latitude: data?.address?.latitude || '-',
      maps:
        data?.address?.longitude && data?.address?.latitude
          ? `https://maps.google.com/?q=${data?.address?.longitude}${data?.address?.latitude}`
          : '-',
      photoSignaturePic: data?.signaturePic || '-',
    },
  };

  switch (roleName) {
    case ROLES_NAME.SUPER_ADMIN:
    case ROLES_NAME.ADMINISTRATOR_MEDIVERSE:
      return resultElastic;
    case ROLES_NAME.ADMINISTRATOR_PROVIDER_MEDPHARM:
      switch (providerType) {
        case 'internal':
          return resultPharmacy;
        case 'external':
          return resultElastic;
        default:
          return [];
      }
  }
};

export const mapDetailProvider = (data) => {
  const mapPlans = (plans) => {
    return isArray(plans)
      ? plans?.map((plan) => {
          return {
            holding: plan?.holding || 0,
            merchant: plan?.merchan || 0,
            user: plan?.user || 0,
          };
        })
      : [];
  };

  let valueWithPPN: string;
  if (data?.platformFee?.services[0].type === 'nominal') {
    valueWithPPN = `${formatRupiah(
      data?.platformFee?.services[0]?.valueWithPpn || 0
    )}`;
  } else {
    valueWithPPN = `${data?.platformFee?.services[0]?.valueWithPpn || 0}%`;
  }
  return {
    businessSchema: {
      startDuration:
        unixTimeStampToDate(data?.businessSchema?.startDuration) || '-',
      endDuration:
        unixTimeStampToDate(data?.businessSchema?.endDuration) || '-',
      restCollaboration:
        data?.businessSchema?.endDuration &&
        dateDeviation(
          new Date(),
          unixTimeStampToDate(data?.businessSchema?.endDuration)
        ),
      type: data?.businessSchema?.type || '-',
      revenue: 0,
      withPpn: `${data?.businessSchema?.sharingFlat?.percentageWithPpn || 0}%`,
    },
    sellingFactor: {
      startDuration:
        unixTimeStampToDate(data?.sellingFactor?.startDuration) || '-',
      endDuration: unixTimeStampToDate(data?.sellingFactor?.endDuration) || '-',
      restCollaboration:
        data?.sellingFactor?.endDuration &&
        dateDeviation(
          new Date(),
          unixTimeStampToDate(data?.sellingFactor?.endDuration)
        ),
      withPpn: `${data?.sellingFactor?.percentageWithPpn || 0}%`,
    },
    platformFee: {
      startDuration:
        unixTimeStampToDate(data?.platformFee?.startDuration) || '-',
      endDuration: unixTimeStampToDate(data?.platformFee?.endDuration) || '-',
      service: 'Medpharm',
      restCollaboration:
        data?.platformFee?.endDuration &&
        dateDeviation(
          new Date(),
          unixTimeStampToDate(data?.platformFee?.endDuration)
        ),
      periodCollaboration: `Bulan ke-${
        data?.platformFee?.periodCollaboration || 0
      }`,
      withPpn: valueWithPPN,
      plans: mapPlans(data?.platformFee?.plans),
    },
  };
};

export const mapPayloadPharmacy = (data: any) => {
  const mapHourSchedules = (schedules) => {
    return isArray(schedules)
      ? schedules?.map((schedule) => {
          return {
            '24HrsOpen': schedule?.is24Hour,
            closeTime: dateTimeToTimes(schedule?.closeTime),
            day: schedule?.day,
            openTime: dateTimeToTimes(schedule?.openTime),
          };
        })
      : [];
  };
  return {
    isHub: data?.information?.isHub,
    name: data?.information?.name,
    phone: data?.information?.phoneNumber,
    email: data?.information?.email,
    outletPicture: data?.information?.photo,
    pc: data?.information?.pic,
    sipa: data?.information?.sipa,
    apa: data?.information?.apa,
    sia: data?.information?.sia,
    signaturePic: data?.information?.photoSignaturePic,
    acceptsInstantDelivery: data?.information?.isDeliveryInstant,
    isPickupOutletAvailable: data?.information?.isDeliverySelfPickup,
    deliveryServiceAvailable: data?.information?.isDeliveryReguler,
    openHours: mapHourSchedules(data?.operationalHour?.schedules),
    practiceHours: mapHourSchedules(data?.practiceHour?.schedules),
    address: {
      province: data?.address?.province?.name,
      provinceId: data?.address?.province?.id,
      city: data?.address?.regency?.name,
      cityId: data?.address?.regency?.id,
      district: data?.address?.district?.name,
      districtId: data?.address?.district?.id,
      village: data?.address?.village,
      street: data?.address?.street,
      postcode: data?.address?.postCode,
      longitude: parseFloat(data?.address?.longitude),
      latitude: parseFloat(data?.address?.latitude),
    },
  };
};

export const mapListSelectProvider = (data) => {
  return isArray(data)
    ? data.map((item: any) => {
        return {
          title: item?.name || '',
          value: {
            id: item?.id,
            name: item?.name,
          },
        };
      })
    : [];
};

export const mapListSelectLocation = (data: any) => {
  return isArray(data)
    ? data.map((item) => {
        return {
          title: item?.name || '',
          value: {
            id: item?.code,
            name: item?.name,
          },
        };
      })
    : [];
};

export const mapListSelectPharmacy = (data: any) => {
  return isArray(data)
    ? data.map((item) => {
        return {
          title: item?.item?.name || '',
          value: {
            id: item?.id,
            name: item?.item?.name || '',
          },
        };
      })
    : [];
};
