import { isEmpty } from 'lodash';
import { capitalizeFirstLetter } from '@/src/utils/formatText';
import { formatDateEng, formatDateWithDay } from '@/src/utils/formatDate';

import {
  IUserBannedPayload,
  IUserParams,
  UserAddressData,
  UserData,
} from '@/src/types/MasterUsers/mediverseUser';

export const getUsersData = (data: UserData[]) => {
  return data.map((item: UserData) => ({
    isActive: item.is_active,
    idpSub: item.idp_sub || '',
    userId: item.user_id || '-',
    fullName: item.full_name || '-',
    phoneNumber: item.phone_number || '-',
    profilePhoto: item.profile_photo || '',
    completeness: item.completeness || '-',
    noKtp: item.ktp_no || '-',
    createdAt: item.created_at ? formatDateWithDay(item.created_at) : '-',
  }));
};

export const getUserDetailData = (data: UserData) => {
  return {
    study: data.study || '-',
    email: data.email || '-',
    isActive: data.is_active,
    ktpNo: data.ktp_no || '-',
    gender: data.gender || '-',
    userId: data.user_id || '-',
    ktpPhoto: data.ktp_photo || '',
    fullName: data.full_name || '-',
    birthDate: data.birth_date || '-',
    allAddress: data.all_address || [],
    phoneNumber: data.phone_number || '-',
    profilePhoto: data.profile_photo || '',
    completeness: data.completeness || '-',
    noEmergency: data.no_emergency || data.phone_number || '-',
    providerId: data.provider_id || '',
  };
};

export const getAddressData = (data: UserAddressData[]) => {
  return !isEmpty(data)
    ? data.map((item: UserAddressData) => {
        return {
          city: item.city || '',
          notes: item.notes || '-',
          district: item.district || '',
          province: item.province || '',
          postalCode: item.postal_code || '',
          phoneNumber: item.phone_number || '-',
          label: item.label ? capitalizeFirstLetter(item.label) : '-',
          receiver: item.receiver ? capitalizeFirstLetter(item.receiver) : '-',
        };
      })
    : [];
};

export const mapParamsUserMediverse = (params: IUserParams) => {
  return {
    page: params.page,
    limit: params.limit,
    is_mobile_user: true,
    search: params.search,
    status: params.status,
    date_end: params.endDate && formatDateEng(params.endDate),
    date_start: params.startDate && formatDateEng(params.startDate),
  };
};

export const mapPayloadBannedUserMediverse = (payload: IUserBannedPayload) => {
  return {
    is_active: payload.status,
    suspend_note: payload.bannedReason,
    suspend_date: formatDateEng(new Date()),
  };
};
