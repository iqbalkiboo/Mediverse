import {isArray} from 'lodash';
import {unixTimeStampToDate} from '@/src/utils/dates';

export const mapListBanner = (data: any[]) => {
  const result = isArray(data) ? data?.map((item: any) => {
    return {
      id: item?.id || null,
      date: item?.created_at ? unixTimeStampToDate(item.created_at) : '-',
      bannerName: item?.name || '-',
      bannerUrls: [
        item?.url_banner_desktop,
        item?.url_banner_tablet,
        item?.url_banner_mobile,
      ] || [],
      bannerPartnerUrl: item?.url_banner_partner || '-',
    };
  }) : [];

  return result;
};

export const mapPayloadType = (type: string) => {
  switch (type) {
    case 'banner-header':
      return 'header';
    case 'banner-popup':
      return 'popup';
    case 'partner-logo':
      return 'partner';
    default:
      return '';
  }
};
