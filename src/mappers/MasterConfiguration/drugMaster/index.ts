import {isArray} from 'lodash';
import {formatDate} from '@/src/utils/formatDate';
import {capitalizeFirstLetter} from '@/src/utils/formatText';

export const mapListDrugMaster = (data: any[]) => {
  const result = isArray(data) ? data.map((item: any) => {
    return {
      id: item?.id || null,
      name: item?.name || '-',
      smallItem: item?.smallItem || '-',
      totalVariant: item?.totalVariant || 0,
      status: item?.status || false,
    };
  }) : [];

  return result;
};

export const mapListDrugMasterInformation = (data: any) => {
  return {
    id: data?.id || null,
    name: data?.name || '-',
    description: data?.description || '-',
    categories: isArray(data?.categories) ? data?.categories : [],
    drugType: data?.drugType || '-',
    isActive: data?.isActive || false,
  };
};

export const mapListVariantInDrugMaster = (data: any[]) => {
  const result = isArray(data) ? data.map((item:any) => {
    return {
      sku: item?.sku || null,
      variants: item?.variants || '-',
      size: `P:  ${item?.size.p} L:  ${item?.size.l} T:  ${item?.size.t}` || '-',
      weight: item?.weight || '-',
      minQuantity: item?.qty || '-',
      batchNumber: item?.batch || '-',
      expiredDate: item?.expired || '-',
    };
  }) : [];
  return result;
};

export const mapListProviderInDrugMaster = (data: any[]) => {
  const result = isArray(data) ? data.map((item:any) => {
    return {
      providerId: item?.id || null,
      providerName: item?.name || '-',
      providerType: item?.providerType || '-',
      type: capitalizeFirstLetter(item?.type) || '-',
    };
  }) : [];
  return result;
};

export const mapDetailVariantDrugMaster = (data: any) => {
  const result ={
    id: data?.id || null,
    production: data?.production || '-',
    permitionNumber: data?.permitionNumber || '-',
    variantLength: data?.variantLength || 0,
    variantWidth: data?.variantWidth || 0,
    variantHeight: data?.variantHeight || 0,
    variantWeight: data?.variantWeight || 0,
    variantQuantityMinimum: data?.production || 0,
    variantSideEffect: data?.variantSideEffect || '-',
    variantDose: data?.variantDose || '-',
    variantHowToUse: data?.variantHowToUse || '-',
    variantIndication: data?.variantIndication || '-',
    variantDrugStorage: data?.variantDrugStorage || '-',
    variantContradiction: data?.variantContradiction || '-',
    variantSpecialAttention: data?.variantSpecialAttention || '-',
    variantExpiredDate: data?.variantExpiredDate || '-',
    variantBatchNumber: data?.variantBatchNumber || '-',
    imageUrls: data?.imageUrls || [],
  };
  return result;
};

export const mapListPharmacyInVariantDrugMaster = (data: any[]) => {
  const result = isArray(data) ? data.map((item:any) => {
    return {
      id: item?.id || null,
      pharmacyName: item?.pharmacyName || '-',
      providerName: item?.providerName || '-',
      stock: item?.stock || '-',
    };
  }) : [];
  return result;
};

export const mapListvariantDrug = (data: any) => {
  const sufix = (value) => {
    switch (value) {
      case 'Strip':
        return 'Tablet';
      case 'Kapsul':
        return 'Kapsul';
      default:
        return 'ml';
    }
  };
  const result = data ? data?.map((item: any) => ({
    sku: item.sku || '-',
    plt: `P: ${item.length || '0'} \xa0 L: ${item.width || '0'} \xa0 T: ${item.height || '0'}`,
    weight: item.weight || 0,
    height: item.height || 0,
    minQty: item.minQty || 0,
    batchNumber: item.batchNumber || 0,
    variants: `${item.smallestUnit}-${item.size} ${sufix(item.smallestUnit)}`,
    expiredDate: formatDate(item.expiredDate, '/'),
  })) : [];
  return result;
};

export const mapListDataVariant = (data: any) => {
  const result = data ? data.map((item) => ({
    batchNumber: item.batchNumber || '-',
    contradiction: item.contradiction || '-',
    distributionNumber: item.distributionNumber || 0,
    dosage: item.dosage || '-',
    expiredDate: formatDate(item.expiredDate, '/') || '-',
    height: item.height || 0,
    howToUse: item.howToUse || '-',
    imageUrls: item.imageUrls || [],
    indication: item.indication || '-',
    length: item.length || 0,
    minQty: item.minQty || 0,
    producedBy: item.producedBy || '-',
    sideEffects: item.sideEffects || '-',
    size: item.size || '-',
    sku: item.sku || '-',
    smallestUnit: item.smallestUnit || '-',
    specialAttention: item.specialAttention || '-',
    weight: item.weight || 0,
    drugStorage: item.drugStorage || '-',
    width: item.width || 0,
  })) : [];
  return result;
};
