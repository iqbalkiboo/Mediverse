
import {isArray} from 'lodash';
import {RoleData} from '@/src/types';
import {formatDate} from '@/src/utils/formatDate';

export const getRolesData = (data: RoleData[]): RoleData[] => {
  return isArray(data) ? data.map((item) => ({
    name: item.name,
    count_user: item.count_user,
    status: item.status,
    id: item.id,
    created_at: item.created_at,
    updated_at: item.updated_at,
  })) : [];
};

export const mapRolesData = (data: any) => {
  return isArray(data) ? data.map((item: any) => ({
    idpSub: item.idp_sub,
    id: item.user_id || '-',
    name: item.full_name || '-',
    role: item.role_name || '-',
    provider: item.provider_id || '-',
    status: item.is_active || false,
    createdAt: formatDate(item.created_at) || '-',
  })) : [];
};
