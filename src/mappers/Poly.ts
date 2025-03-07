import {unixTimeStampToDate} from '@/src/utils/dates';
import {isArray} from 'lodash';
import {capitalizeFirstLetter} from '@/src/utils/formatText';

export const mapDataTablePoly = (data: any) => {
  return (data && data.length > 0) ? data.map((item: any) => ({
    id: item.id,
    code: item.poly_code || '-',
    name: item.poly_name || '-',
    serviceCount: item.service_count || 0,
    createdAt: item.created_at ? unixTimeStampToDate(item.created_at) : '-',
    status: item.is_active || false,
  })) : [];
};

export const mapDataDetailPoly = (data: any) => ({
  id: data.id || '',
  icon: data.poly_icon || '',
  name: data.poly_name || '-',
  code: data.poly_code || '-',
  parameter: data.parameter ? data.parameter : [],
  status: data.is_active || false,
});

export const mapEditModalPolyData = (data: any) => ({
  id: data.id || '',
  poly_code: data.poly_code || '',
  parameter: data.parameter ? data.parameter : [],
  poly_name: data.poly_name || '',
  icon: data.poly_icon || '',
});

export const mapListFaskes = (data: any) => {
  return (data && data.length > 0) ? data.map((item: any) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    providerType: item.provider_type,
    providerName: item.provider_name,
    status: item.status,
  })) : [];
};

export const mapListServices = (data: any) => {
  return (data && data.length > 0) ? data.map((item: any) => ({
    id: data.id,
    name: data.name,
    code: data.code,
  })) : [];
};

export const mapListServicePoly = (data: any) => {
  return isArray(data) ? data.map((item: any) => ({
    id: item.id,
    name: item.service_name,
  })) : [];
};

export const mapListHealthFacilities = (data: any) => {
  return isArray(data) ? data.map((item: any) => ({
    id: item.id || '-',
    name: item.item?.nama_provider || item.item?.name || '-',
    providerType: item.provider_type || 'Medpoint',
    providerName: item.item?.nama_provider || item.provider_name || '-',
    status: !item.is_banned,
    related: item.related || [],
  })) : [];
};


export const mapListSelectMasterPoli = (data: any[]) => {
  const listSelectPoli = data.map((item: any) => {
    return {
      label: capitalizeFirstLetter(item.poly_name),
      value: item.id,
    };
  });

  return listSelectPoli;
};
