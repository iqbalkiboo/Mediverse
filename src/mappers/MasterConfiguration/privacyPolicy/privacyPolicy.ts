import {
  IPrivacyPolicyDetail,
  IPrivacyPolicyItem,
} from '@/src/types/MasterConfiguration/privacyPolicy/PrivacyPolicy';
import {unixTimeStampToDate} from '@/src/utils/dates';

export const mapListPrivacyPolicy = (data: IPrivacyPolicyItem[]) => {
  const result = data?.map((item: IPrivacyPolicyItem) => {
    return {
      id: item?.id || '-',
      category: item?.category || '-',
      version: item?.version || '-',
      createdDate: item?.createdAt ? unixTimeStampToDate(item?.createdAt) : '-',
      status: item?.status === 1 ? true : false,
      description: item?.description || '-',
    };
  });

  return result;
};

export const mapDetailPrivacyPolicy = (data: IPrivacyPolicyDetail) => {
  return {
    id: data?.id || null,
    category: data?.category || '-',
    description: data?.description || '-',
    version: data?.version || '-',
    status: data?.status === 1 ? true : false,
  };
};
