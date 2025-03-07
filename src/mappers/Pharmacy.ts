import {capitalizeFirstLetter} from '@/src/utils/formatText';
import {dateTimeToTimes} from '@/src/utils/formatDate';
import {isArray} from 'lodash';

export const mapListPharmacy = (data: any[], providerId = null) => {
  if (providerId) {
    return data.filter((item) => String(item.provider_id) === String(providerId)).map((item: any) => ({
      id: item.id,
      provider_id: item.provider_id,
      pharmacy_id: item.item.id || '',
      pharmacy_name: item.item.name || '-',
      provider: item.item.provider || '-',
      created_date: item.indexed_at || '-',
      status: !item.is_banned,
    }));
  }

  return data.map((item: any) => {
    return {
      id: item.id,
      provider_id: item.provider_id,
      pharmacy_id: item.item.id || '',
      pharmacy_name: item.item.name || '-',
      provider: item.item.provider || '-',
      created_date: item.indexed_at || '-',
      status: !item.is_banned,
    };
  });
};

export const mapListPharmacys = (data: any[]) => {
  return data.length > 0 ? data.map((item: any) => {
    return {
      id: item.id,
      provider_id: item.provider_id,
      pharmacy_id: item.id || '',
      pharmacy_name: item.name || '-',
      provider: item.item?.provider || '-',
      created_date: item.createdAt || '-',
      status: !item.is_banned,
    };
  }): [];
};

export const mapListItem = (data: any[]) => {
  return data.length > 0 ? data.map((item: any) => {
    return {
      id: item?.id || '-',
      item_id: item?.itemID || '-',
      name: item?.name || '-',
      sku: item?.itemCode || '-',
      stock: item?.stock || '0',
      price: item?.price || '0',
      status: item?.is_available || false,
    };
  }) : [];
};

export const mapDetailPharmacy = (data: any) => {
  return {
    id: data?.id,
    pharmacy_name: data?.name,
    provider_id: data?.provider_id,
    information: {
      provider_id: data?.provider_id,
      provider_name: data?.provider_name,
      address: data?.address?.street,
      phone: data?.phone,
      email: data?.email,
      pic: data?.pc,
      openHours: data?.openHours,
      lon: data?.address?.longitude,
      lat: data?.address?.latitude,
      promo: data?.promo,
      bank: data?.bank,
      description: data?.description,
    },
  };
};

export const mapListSelectProvider = (data: any[]) => {
  const listSelectProvider = data
      .filter((item: any) => item.providerType.toLowerCase() === 'medpharm')
      .map((item: any) => {
        return {
          label: capitalizeFirstLetter(item.name),
          value: item.id,
        };
      });

  return [{label: 'Semua Provider', value: 0}, ...listSelectProvider];
};

export const mapLocation = (data: any) => {
  const result = isArray(data) ? data.map((item) => {
    return {
      label: item.name,
      value: item.code,
    };
  }) : [];

  return result;
};

export const mapOpenHours = (template: any, data: any) => {
  const result = template.map((item, idx) => {
    return {
      '24HrsOpen': data[`24HrsOpen${idx}`],
      'closeTime': dateTimeToTimes(data[`closeTime${idx}`]) || '',
      'day': idx,
      'openTime': dateTimeToTimes(data[`openTime${idx}`]) || '',
    };
  });
  return result;
};

export const mapFormInfromation = (data: any) => {
  return {
    pc: data?.pc || '',
    phone: data?.phone || '',
    name: data?.name || '',
  };
};

export const mapFormAddress = (data: any) => {
  return {
    village: data?.village || '',
    postcode: data?.postcode || '',
    street: data?.street || '',
    longitude: data?.longitude || '',
    latitude: data?.latitude || '',
  };
};

export const mapRelatedPharmacys = (data: any) => {
  return data.related ?? [];
};

export const getListDrugCategory = (data: any) => {
  const result = data.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  });

  return result;
};

export const getListSymptom = (data: any) => {
  const result = data.map((item) => {
    return {
      label: item.symptom_name,
      value: item.symptom_name,
    };
  });

  return result;
};
