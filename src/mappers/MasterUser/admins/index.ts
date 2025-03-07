import {isArray} from 'lodash';
import {formatDate} from '@/src/utils/formatDate';
import {profilePlaceholder} from '@/assets/images';
import {capitalizeFirstLetter} from '@/src/utils/formatText';
import {IDataAdmin, IParamsGetListAdmin} from '@/src/types/MasterUsers/admins';

export const mapListAdmin = (data) => {
  return isArray(data) ? data.map((item) => ({
    idpSub: item?.idp_sub,
    id: item?.user_id || '-',
    name: item?.full_name || '-',
    role: item?.role_name || '-',
    provider: item?.provider_name || '-',
    status: item?.is_active || false,
    createdAt: formatDate(item?.created_at) || '-',
  })) : [];
};

export const mapDetailAdmin = (data: IDataAdmin) => {
  return {
    email: data?.email || '-',
    is_active: data?.is_active,
    outlet: data?.outlet_name || '-',
    name: data?.full_name || '-',
    role: data?.role_name || '-',
    service: data?.service || '-',
    providerId: data?.provider_id,
    phoneNumber: data?.phone_number || '',
    profile_photo: data?.profile_photo || profilePlaceholder,
    providerName: data?.provider_name || '-',
    providerType: data?.provider_type || '-',
    secondaryProviderType: data?.secondary_provider_type || '-',
    userId: data?.user_id || '-',
  };
};

export const mapParamsGetListAdmin = (data: IParamsGetListAdmin) => {
  return {
    page: data.page,
    limit: data.limit,
    search: data.search,
    status: data.status,
    role_id: data.roleId,
  };
};

export const mapProviderOptions = (data: any) => {
  return isArray(data) ? data.map((item) => ({
    value: item.id || '',
    title: item.name || '',
    providerType: item.providerType || '',
  })) : [];
};

export const mapRoles = (data: any) => {
  const tmp = [];

  const recurse = (data) => {
    data.forEach((item) => {
      if (item.children.length > 0) {
        tmp.push(item.children);
        recurse(item.children);
      }
    });
  };

  isArray(data) && recurse(data);

  const result = [...data, ...tmp];

  return result.flat(1);
};

export const mapRoleOption = (data) => {
  const result = isArray(data) ? data.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  }) : [];

  return result.filter((value, idx, array)=>array.findIndex((item) =>(item.value === value.value))===idx);
};

export const mapListSelectDoctor = (data: any[]) => {
  const listSelectDoctor = isArray(data) ? data.map((item: any) => {
    return {
      title: capitalizeFirstLetter(item.nama) || '-',
      value: item.id,
    };
  }) : [];

  return listSelectDoctor;
};
