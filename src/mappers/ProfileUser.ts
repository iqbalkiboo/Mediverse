import {capitalizeFirstLetter} from '@/src/utils/formatText';

export const mapDetailProfileUser = (data: any) => {
  return {
    id: data.id,
    name: data.full_name || '-',
    email: data.mail || data.email || '-',
    provider: data.provider || '-',
    provider_branch: data.outlet_name || '-',
    service: capitalizeFirstLetter(data.provider_type) || 'All',
    photo_profile: data.profile_photo || '',
  };
};
