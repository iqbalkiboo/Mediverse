import {isArray} from 'lodash';
import {formatDateWithDay} from '@/src/utils/formatDate';

import {
  ISpecialistData,
} from '@/src/types/Specialist';

export const mapSpecialistData = (data: ISpecialistData[]) => {
  return isArray(data) ? data.map((item) => ({
    id: item.id || '',
    status: item.is_active || false,
    updatedAt: item.updated_at || '',
    icon: item.specialist_icon || '',
    name: item.specialist_name || '-',
    parameters: item.parameters || '',
    isDeleted: item.is_deleted || false,
    description: item.description || '',
    specialistId: item.specialist_id || '',
    createdAt: item.created_at ? formatDateWithDay(new Date(item.created_at * 1000)) : '-',
  })) : [];
};

export const mapSpecialistDetail = (data: ISpecialistData) => {
  return {
    id: data.id || '',
    status: data.is_active || false,
    createdAt: data.created_at || '',
    updatedAt: data.updated_at || '',
    icon: data.specialist_icon || '',
    name: data.specialist_name || '-',
    parameters: data.parameters || '',
    isDeleted: data.is_deleted || false,
    description: data.description || '-',
    specialistId: data.specialist_id || '',
  };
};

export const getSpecialistData = (data: ISpecialistData[]): ISpecialistData[] => {
  return data.map((item) => ({
    created_at: item.created_at,
    updated_at: item.updated_at,
    is_deleted: item.is_deleted,
    id: item.id,
    specialist_id: item.specialist_id,
    specialist_name: item.specialist_name,
    description: item.description,
    specialist_icon: item.specialist_icon,
    parameters: item.parameters,
    is_active: item.is_active,
  }));
};

export const getSpecialistDetailData = (data: ISpecialistData): ISpecialistData => {
  return {
    created_at: data.created_at,
    updated_at: data.updated_at,
    is_deleted: data.is_deleted,
    id: data.id,
    specialist_id: data.specialist_id,
    specialist_name: data.specialist_name,
    description: data.description,
    specialist_icon: data.specialist_icon,
    parameters: data.parameters,
    is_active: data.is_active,
  };
};

export const getDoctorData = (data) => {
  const filteredData = data?.filter((item: any) => item?.item_type === 'doctor');

  const result = filteredData?.map((item: any) => {
    return {
      no_str: item?.item?.noStrDokter || '-',
      doctor_name: item?.item?.nama || '-',
      health_facility: item?.item?.child_configs['health-facility'].name || '-',
      sex: item?.item?.sex || '-',
      sip_number: item?.item?.sip || '-',
      status: !item?.is_banned,
    };
  });

  return result;
};
