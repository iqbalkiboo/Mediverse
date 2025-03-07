import { formatDate } from '@/src/utils/formatDate';

import type {
  IDrugCategoryDetail,
  IDrugCategoryItem,
  IDrugSubcategoryItem,
} from '@/src/types/MasterConfiguration/drugCategory/DrugCategory';

export const mapListDrugCategory = (data: IDrugCategoryItem[]) => {
  return data.map((item: IDrugCategoryItem) => ({
    id: item.id,
    drugName: item.drugName || [],
    drugCategoryIcon: item.icon || '-',
    drugCategoryName: item.name || '-',
    drugSubcategory: item.subcategory || '-',
    createdDate: item.createdAt
      ? formatDate(item.createdAt * 1000, ' ', 'MMM')
      : '-',
    status: item.is_active || false,
  }));
};

export const mapDetailDrugCategory = (data: IDrugCategoryDetail) => {
  return {
    id: data?.id,
    listDrug: [],
    parameters: [],
    name: data?.name,
    icon: data?.icon,
    status: data?.is_active,
    createdAt: data?.createdAt,
  };
};

export const mapDrugCategoryRelated = (data: any) => {
  return data && data.length > 0
    ? data.map((item: any) => ({
        label: item.drug_category_name,
        value: item.drug_category_name,
      }))
    : [];
};

export const mapListDrugSubcategory = (data: IDrugSubcategoryItem[]) => {
  return data.map((item: IDrugSubcategoryItem) => ({
    id: item.id,
    name: item.name || [],
    subcategoryIcon: item.icon || '-',
    subcategoryName: item.name || '-',
    createdDate: item.createdAt
      ? formatDate(item.createdAt * 1000, ' ', 'MMM')
      : '-',
  }));
};
