import { isArray } from 'lodash';

import { formatRupiah } from '@/src/utils/fromatCurrency';
import { unixTimeStampToDate } from '@/src/utils/dates';
import { capitalizeFirstLetter } from '@/src/utils/formatText';
import { ROLES } from '@/src/constants';

export const mapListTreatment = (
  data: any[],
  roleId: number,
  type?: string
) => {
  const resultElastic = isArray(data)
    ? data
        ?.map((item: any) => {
          return {
            id: item?.id || null,
            providerId: item?.provider_id || null,
            name: capitalizeFirstLetter(item?.item?.treatmentType?.name) || '-',
            group:
              capitalizeFirstLetter(
                item?.item?.treatmentType?.configs?.['service-group']?.name
              ) || '-',
            provider:
              capitalizeFirstLetter(
                item?.item?.treatmentType?.configs?.['provider']?.name
              ) || '-',
            price: formatRupiah(item?.item?.treatmentType?.price) || 0,
            mediversePrice:
              formatRupiah(item?.item?.treatmentType?.customerPrice) || 0,
            status: !item?.is_banned || false,
            itemType: item?.item_type || null,
          };
        })
        .filter((item: any) => item?.itemType === type)
    : [];

  const resultTreatment = isArray(data)
    ? data?.map((item: any) => {
        return {
          id: item?.id || null,
          providerId: item?.provider_id || null,
          name: capitalizeFirstLetter(item?.name) || '-',
          group:
            capitalizeFirstLetter(item?.configs?.['service-group']?.name) ||
            '-',
          provider:
            capitalizeFirstLetter(item?.configs?.['provider']?.name) || '-',
          price: formatRupiah(item?.price) || 0,
          mediversePrice: formatRupiah(item?.customerPrice) || 0,
          status: !item?.status || false,
        };
      })
    : [];

  const resultTreatmentByOutletId = isArray(data)
    ? data?.map((item: any) => {
        return {
          id: item?.treatmentType?.id || null,
          providerId: item?.treatmentType?.provider_id || null,
          name: capitalizeFirstLetter(item?.treatmentType?.name) || '-',
          group:
            capitalizeFirstLetter(
              item?.treatmentType?.configs?.['service-group']?.name
            ) || '-',
          provider:
            capitalizeFirstLetter(
              item?.treatmentType?.configs?.['provider']?.name
            ) || '-',
          price: formatRupiah(item?.treatmentType?.price) || 0,
          mediversePrice: formatRupiah(item?.treatmentType?.customerPrice) || 0,
          status: !item?.treatmentType?.status || false,
        };
      })
    : [];

  if (
    [
      ROLES.ADMINISTRATOR_MEDIVERSE,
      ROLES.ADMINISTRATOR_MEDIVERSE_VIEW_ONLY,
      ROLES.SUPER_ADMIN,
      ROLES.SUPER_ADMIN_VIEW_ONLY,
    ].includes(roleId)
  ) {
    return resultElastic;
  }

  if (
    [
      ROLES.ADMINISTRATOR_PROVIDER_MEDPOINT,
      ROLES.ADMINISTRATOR_PROVIDER,
    ].includes(roleId)
  ) {
    return resultTreatment;
  }

  if ([ROLES.ADMINISTRATOR_FASYANKES, ROLES.OPERATOR_FASKES].includes(roleId)) {
    return resultTreatmentByOutletId;
  }

  return [];
};

export const mapDetailTreatment = (data: any, roleId: number) => {
  const resultElastic = {
    id: data?.id || null,
    itemId: data?.item_id || null,
    name: data?.item?.treatmentType?.name || '-',
    status: !data?.is_banned,
    type: data?.item?.treatmentType?.type || '-',
    information: {
      type: data?.item?.treatmentType?.type || '-',
      provider:
        capitalizeFirstLetter(
          data?.item?.treatmentType?.configs?.['provider']?.name
        ) || '-',
      healthFacility:
        capitalizeFirstLetter(
          data?.item?.treatmentType?.configs?.['health-facility']?.name
        ) || '-',
      treatmentGroup:
        capitalizeFirstLetter(
          data?.item?.treatmentType?.configs?.['service-group']?.name
        ) || '-',
      poly:
        capitalizeFirstLetter(data?.item?.treatmentType?.configs?.poli.name) ||
        '-',
      price: formatRupiah(data?.item?.treatmentType?.price) || 0,
      sellingFactor: data?.item?.treatmentType?.sellingFactor || 0,
      mediversePrice:
        formatRupiah(data?.item?.treatmentType?.customerPrice) || 0,
      createdDate: unixTimeStampToDate(data?.indexed_at) || 0,
      vaccine: data?.additionalData?.vaccine || [],
    },
    description: {
      detail: data?.item?.treatmentType?.description || '-',
      preparation: data?.item?.treatmentType?.preparation || '-',
    },
    criteria: {
      maxAge: data?.item?.treatmentType?.configs?.['max-age']?.value || '-',
      minAge: data?.item?.treatmentType?.configs?.['min-age']?.value || '-',
      durationPerService:
        data?.item?.treatmentType?.configs?.['slot-duration']?.value || '-',
      maxParticipant:
        data?.item?.treatmentType?.configs?.['max-participant']?.value || '-',
      preOrderSetting:
        data?.item?.treatmentType?.configs?.['setting_preorder']?.value || '-',
      participantPerVial:
        data?.item?.treatmentType?.configs?.['number-participant-per-vial']
          ?.value || '-',
    },
  };

  const resultTreatment = {
    id: data?.id || null,
    itemId: data?.id || null,
    name: data?.name || '-',
    status: data?.is_banned || false,
    type: data?.type || '-',
    information: {
      type: data?.type || '-',
      provider: capitalizeFirstLetter(data?.configs?.['provider']?.name) || '-',
      healthFacility:
        capitalizeFirstLetter(data?.configs?.['health-facility']?.name) || '-',
      treatmentGroup:
        capitalizeFirstLetter(data?.configs?.['service-group']?.name) || '-',
      poly: capitalizeFirstLetter(data?.configs?.['poli']?.name) || '-',
      price: formatRupiah(data?.price) || 0,
      sellingFactor: data?.sellingFactor || 0,
      mediversePrice: formatRupiah(data?.customerPrice) || 0,
      createdDate: unixTimeStampToDate(data?.createdAt) || 0,
      vaccine: data?.additionalData?.vaccine || [],
    },
    description: {
      detail: data?.description || '-',
      preparation: data?.preparation || '-',
    },
    criteria: {
      maxAge: data?.configs?.['max-age']?.value || '-',
      minAge: data?.configs?.['min-age']?.value || '-',
      durationPerService: data?.configs?.['slot-duration']?.value || '-',
      maxParticipant: data?.configs?.['max-participant']?.value || '-',
      preOrderSetting: data?.configs?.['setting_preorder']?.value || '-',
      participantPerVial:
        data?.configs?.['number-participant-per-vial']?.value || '-',
    },
  };

  if (
    [
      ROLES.ADMINISTRATOR_MEDIVERSE,
      ROLES.ADMINISTRATOR_MEDIVERSE_VIEW_ONLY,
      ROLES.SUPER_ADMIN,
      ROLES.SUPER_ADMIN_VIEW_ONLY,
    ].includes(roleId)
  ) {
    return resultElastic;
  }

  return resultTreatment;
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

export const mapListSelectHealthFacility = (data) => {
  return isArray(data)
    ? data.map((item: any) => {
        return {
          title: item?.name || '-',
          value: {
            id: item?.id,
            name: item?.name || '',
            image: item?.image || '',
          },
        };
      })
    : [];
};

export const mapListSearchHealthFacility = (data) => {
  return data.map((item: any) => {
    return {
      title: item?.name || '-',
      value: {
        id: item?.id,
        name: item?.name || '',
        image: item?.image || '',
      },
    };
  });
};

export const mapListSelectTreatmentGroup = (data) => {
  return isArray(data)
    ? data.map((item: any) => {
        return {
          title: item?.service_name || '-',
          value: {
            id: item?.id,
            name: item?.service_name || '-',
            icon: item?.service_icon,
          },
        };
      })
    : [];
};

export const mapListSelectPoly = (data) => {
  return isArray(data)
    ? data.map((item: any) => {
        return {
          label: item?.name || '',
          value: {
            id: item?.id,
            name: item?.name,
          },
        };
      })
    : [];
};

export const mapListSelectVaccine = (data) => {
  return isArray(data)
    ? data.map((item: any) => {
        return {
          title: item?.kfa_display || '-',
          value: {
            cvx_group: {
              code: item?.cvxgroup_code || '',
              display: item?.cvxgroup_display || '',
              system: item?.cvxgroup_system || '',
            },
            cvx_name: {
              code: item?.cvxname_code || '',
              display: item?.cvxname_display || '',
              system: item?.cvxname_system || '',
            },
            dosage_sequence: item?.dosage_sequence || 0,
            kfa: {
              code: item?.kfa_code || '',
              display: item?.kfa_display || '',
              system: item?.kfa_system || '',
            },
            route: item?.route || {},
          },
        };
      })
    : [];
};

export const mapPayloadTreatment = (data: any, id?: string | number) => {
  return {
    additionalData: { vaccine: data.vaccine },
    benefit: '',
    code: id
      ? data?.information?.code
      : String(Math.floor(100000 + Math.random() * 900000)),
    codeConfig: '',
    description: data?.description?.detail,
    imageUrl: '',
    name: data?.information?.name,
    preparation: data?.description?.preparation,
    price: parseFloat(data?.information?.price),
    customerPrice: data?.information?.customerPrice,
    procedure: '',
    type: data?.information?.type,
    configs: {
      provider: {
        id: data?.information?.provider?.id,
        name: data?.information?.provider?.name,
      },
      'health-facility': {
        id: data?.information?.healthFacility?.id,
        name: data?.information?.healthFacility?.name,
        image: data?.information?.healthFacility?.image,
      },
      'service-group': {
        id: data?.information?.serviceGroup?.id,
        name: data?.information?.serviceGroup?.name,
        icon: data?.information?.serviceGroup?.icon,
      },
      poli: {
        id: data?.information?.poli?.id,
        name: data?.information?.poli?.name,
      },
      'max-age': {
        name: 'max-age',
        value: data?.criteria?.maxAge,
        group: null,
      },
      'min-age': {
        name: 'min-age',
        value: data?.criteria?.minAge,
        group: null,
      },
      'slot-duration': {
        name: 'slot-duration',
        value: data?.criteria?.durationPerService,
        group: null,
      },
      'max-participant': {
        name: 'max-participant',
        value: data?.criteria?.maxParticipant,
        group: null,
      },
      setting_preorder: {
        name: 'setting_preorder',
        value: data?.criteria?.preOrderSetting,
        group: null,
      },
      'number-participant-per-vial': {
        name: 'number-participant-per-vial',
        value: data?.criteria?.participantPerVial,
        group: null,
      },
    },
  };
};
