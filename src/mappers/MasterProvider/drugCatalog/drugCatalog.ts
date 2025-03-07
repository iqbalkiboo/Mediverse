import {
  isArray,
  isNull,
  isNumber,
} from 'lodash';

import {formatDate} from '@/src/utils/formatDate';
import {formatRupiah} from '@/src/utils/fromatCurrency';

export const mapListDrugCatalog = (data: any[]) => {
  const result = isArray(data) ? data.map((item: any) => {
    return {
      id: item?.id || null,
      name: item?.name || '-',
      drugCategory: item?.drug_category || '-',
      price: item?.price || '-',
      status: item?.status || false,
    };
  }) : [];

  return result;
};

export const mapListVariantInDrugCatalog = (data: any[]) => {
  const result = isArray(data) ? data.map((item: any) => {
    return {
      id: item?.id || null,
      sku: item?.sku || '-',
      variants: item?.variants || '-',
      price: isNumber(item?.price) ? formatRupiah(item?.price) : '-',
      priceOnMediverse: isNumber(item?.priceOnMediverse) ? formatRupiah(item?.priceOnMediverse) : '-',
      size: isNull(
          item?.size?.length || item?.size?.width || item?.size?.height) ?
          '-' : `P: ${item?.size?.length || '-'}
          L: ${item?.size?.width || '-'}
          T: ${item?.size?.height || '-'}` || '-',
      weight: item?.weight || '-',
      minQuantities: item?.minQuantities || '-',
      batchNumber: item?.batchNumber || '-',
      expiredDate: formatDate(item?.expiredDate) || '-',
    };
  }) : [];
  return result;
};

export const mapDetailDrugCatalog = (data: any) => {
  const result = {
    id: data?.id || null,
    name: data?.name || '-',
    description: data?.description || '-',
    category: data?.category || [],
    type: data?.type || '',
  };

  return result;
};

export const mapDetailFormDrugCatalog = (data) => {
  return {
    id: data?.id || 0,
    name: data?.name || '',
    drugCategory: data?.drugCategory || [],
    drugType: data?.drugType || '',
    variants: data?.variants || [],
  };
};

