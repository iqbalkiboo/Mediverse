import { formatCustomerPrice } from '@/src/utils/formatNumber';

export const mapListDrugsStock = (
  data: any,
  sellingFactor: number,
  ppn: number
) => {
  return data.length > 0
    ? data.map((item: any) => ({
        id: item?.id || '-',
        sku: item?.sku || '-',
        name: item?.name || '-',
        stock: item?.stock || 0,
        price: item?.price || 0,
        customerPrice: sellingFactor
          ? formatCustomerPrice(item?.price, sellingFactor, ppn)
          : parseInt(item?.price) || 0,
        itemId: item?.itemID || '-',
        variant: item?.nameWithvariant || '-',
        category: item?.item?.category || '-',
      }))
    : [];
};

export const mapDetailDrugStock = (data: any) => {
  return {
    id: data?.id || '-',
    sku: data?.sku || '-',
    variant: data?.nameWithvariant || '-',
    producer: data?.manufacturer?.name || '-',
    permitNumber: data?.noIzinEdar || '-',
    length: data?.length || 0,
    width: data?.width || 0,
    height: data?.height || 0,
    weight: data?.weight || 0,
    minQuantity: data?.minQty || 0,
    sideEffect: data?.sideEffect || '-',
    dosage: data?.dosage || '-',
    usage: data?.howToUse || '-',
    indication: data?.indication || '-',
    storage: data?.storage || '-',
    contradiction: data?.contraIndication || '-',
    specialTreatment: data?.specialTreatment || '-',
    expireDate: data?.expiredDate || '-',
    batchNumber: data?.batchNumber || '-',
    composition: data?.composition || '-',
    dosageForm: data?.dosageForm || '-',
    drugPhoto: data?.imageUrls || [],
  };
};

export const mapModalUpdateVariants = (
  data: any,
  sellingFactor: number,
  ppn: number
) => {
  return {
    stock: data?.stock || 0,
    updateStock: data?.updateStock || '',
    totalStock: data?.stock + Number(data?.updateStock) || 0,
    price: data?.price || '',
    sellingFactor: sellingFactor || 0,
    priceInMediverse: sellingFactor
      ? formatCustomerPrice(data?.price, sellingFactor, ppn)
      : parseInt(data?.price) || 0,
  };
};
