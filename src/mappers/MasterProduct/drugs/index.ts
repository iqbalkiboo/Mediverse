/* eslint-disable max-len */
import { isArray } from 'lodash';

import { formatRupiah } from '@/src/utils/fromatCurrency';
import { formatDate } from '@/src/utils/formatDate';
import { formatCustomerPrice } from '@/src/utils/formatNumber';
import { outletDocumentId } from '@/src/utils/getDocumentId';

export const mapVariant = (variants, key: string) => {
  if (isArray(variants) && variants.length > 0) {
    const result = variants.map((item) => item[key]);
    return [...new Set(result)].join(',');
  } else {
    return;
  }
};

export const mapListDrugByChannelId = (
  data: any,
  sellingFactor: number,
  ppn: number
) => {
  const customerPrice = (price) =>
    sellingFactor
      ? formatCustomerPrice(price, sellingFactor, ppn)
      : parseInt(price) || 0;

  const mapPrice = (prices) => {
    if (isArray(prices) && prices.length > 1) {
      const minPrice = Math.min(...prices.map((item) => item.price));
      const maxPrice = Math.max(...prices.map((item) => item.price));
      return [
        formatRupiah(customerPrice(minPrice)),
        formatRupiah(customerPrice(maxPrice)),
      ].join('-');
    } else if (prices.length === 1) {
      return formatRupiah(customerPrice(prices[0].price));
    } else {
      return '-';
    }
  };

  const mapOutlet = (variants) => {
    if (isArray(variants) && variants.length > 0) {
      const outlets = variants
        .map((item) => item?.outletName)
        .filter((item) => item !== '');
      if (outlets.length > 3) {
        outlets.splice(3, 1, 'Lainnya');
        return outlets;
      }
      return outlets;
    } else {
      return '-';
    }
  };

  const mapStock = (variants) => {
    if (isArray(variants) && variants.length > 0) {
      return variants.reduce((acc, curValue) => acc + curValue.stock, 0);
    } else {
      return 0;
    }
  };

  return isArray(data)
    ? data.map((item: any) => ({
        id: item?.itemId || '-',
        sku: item?.itemId || '-',
        providerName: item?.providerName || '-',
        name: item?.itemName || '-',
        pharmacy: mapOutlet(item?.variants) || '-',
        stock: mapStock(item?.variants) || 0,
        status: item?.itemStatus,
        category: item?.category || '-',
        customerPrice: item?.variants ? mapPrice(item?.variants) : 0,
        variantIds: mapVariant(item?.variants, 'itemVariantID') || [],
      }))
    : [];
};

// for external provider
export const mapListDrugSearch = (
  data: any,
  params: any,
  providerID: any,
  sellingFactor: number,
  ppn: number
) => {
  const parentId = outletDocumentId(providerID, params.outletId);
  return isArray(data)
    ? data
        .map((item: any) => {
          const customerPrice = sellingFactor
            ? formatCustomerPrice(item?.price, sellingFactor, ppn)
            : parseInt(item?.price) || 0;
          return {
            id: item?.id || '-',
            providerId: item?.provider_id || '-',
            sku: item?.item?.sku || '-',
            providerName: params.providerName || '-',
            name: item?.item?.name || '-',
            pharmacy: item?.item?.outletName || '-',
            itemId: item?.item?.id || '-',
            stock: item?.stock || 0,
            status: !item?.is_banned,
            category: item?.item?.item?.category || '-',
            customerPrice: formatRupiah(customerPrice) || '-',
            variantIds: item?.id || [],
            parentId: item?.parent_id,
            description: item?.item?.description || '-',
            manufacturers: item?.item?.manufacturers || '-',
            noIzinEdar: item?.item?.noIzinEdar || '-',
            unit: item?.item?.unit || '-',
            weight: item?.item?.weight || '-',
            type: item?.item?.type || '-',
            drugPhoto: item?.item?.imageUrls || [],
          };
        })
        .filter((item) => {
          if (params.outletId && params.category) {
            return (
              item.parentId === parentId &&
              item.category === params.category &&
              item.providerId === Number(providerID)
            );
          } else if (params.outletId) {
            return item.parentId === parentId;
          } else if (params.category) {
            return item.category === params.category;
          } else {
            return item.providerId === Number(providerID);
          }
        })
    : [];
};

export const mapDetailDrugByChannelId = (data) => {
  return {
    id: data?.id || null,
    name: data?.name || '-',
    status: data?.status,
    information: {
      description: data?.description || '-',
      providerName: data?.providerName || '-',
      pharmacyName: data?.pharmacyName || '-',
      drugCategories: data?.category || [],
      drugSubcategories: data?.subcategory || [],
      drugType: data?.type || '-',
    },
  };
};

export const mapListDrugByOutletId = (
  data: any,
  detailUser: any,
  params: any,
  sellingFactor: number,
  ppn: number
) => {
  const resultElastic =
    data.length > 0
      ? data
          .map((item: any) => {
            const customerPrice = sellingFactor
              ? formatCustomerPrice(item?.price, sellingFactor, ppn)
              : parseInt(item?.price) || 0;
            return {
              id: item?.id || null,
              itemId: item?.item?.id || '-',
              sku: item?.item?.sku || '-',
              name: item?.item?.name || '-',
              category: item?.item?.item?.category || '-',
              stock: item?.stock || 0,
              customerPrice: formatRupiah(customerPrice) || 0,
              status: !item?.is_banned,
              itemType: item?.item_type || null,
              parentId: item?.parent_id || '',
            };
          })
          .filter((item: any) => {
            const outletDocId = outletDocumentId(
              detailUser?.provider_id,
              detailUser.outlet_id
            );
            // filter by category
            if (params.category) {
              return (
                item?.category === params.category &&
                item?.itemType === 'drug' &&
                item?.parentId === outletDocId
              );
            }
            if (!params.category) {
              return (
                item?.itemType === 'drug' && item?.parentId === outletDocId
              );
            }
            return false;
          })
      : [];

  const resultDrug =
    data.length > 0
      ? data.map((item: any) => {
          const customerPrice = sellingFactor
            ? formatCustomerPrice(item?.price, sellingFactor, ppn)
            : parseInt(item?.price) || 0;
          return {
            id: item?.id || '-',
            sku: item?.sku || '-',
            providerName: item?.provider_name || '-',
            itemId: item?.item?.id || '-',
            name: item?.item?.name || '-',
            variant: item?.nameWithvariant || '-',
            category: item?.item?.category || '-',
            stock: item?.stock || 0,
            customerPrice: formatRupiah(customerPrice) || 0,
            status: true,
          };
        })
      : [];

  switch (detailUser?.type) {
    case 'external':
      return resultElastic;
    case 'internal':
      return resultDrug;
    default:
      return;
  }
};

export const mapListVariantDrug = (
  data: any,
  sellingFactor: number,
  ppn: number
) => {
  return data.length > 0
    ? data.map((item: any) => {
        const customerPrice = formatCustomerPrice(
          item?.price,
          sellingFactor,
          ppn
        );
        return {
          id: item?.id || '-',
          itemId: item?.item_id || null,
          outletId: item?.item?.outletId || null,
          outletName: item?.item?.outletName || '-',
          sku: item?.sku || item?.item?.sku || '-',
          variant: item?.item?.nameWithvariant || item?.variant || '-',
          plt:
            `${item?.item?.length || item?.length || '0'},${
              item?.item?.width || item?.width || '0'
            },${item?.item?.height || item?.height || '0'}` || '-',
          weight: item?.item?.weight || item?.weight || 0,
          minQty: item?.item?.minQty || item?.minQty || 0,
          stock: item?.stock || item?.item?.stock || 0,
          batchNumber: item?.item?.batchNumber || item?.batchNumber || '-',
          price: formatRupiah(item?.item?.price || item?.price) || 0,
          sellingFactor: item?.item?.sellingFactor || '-',
          priceInMediverse: sellingFactor
            ? customerPrice
            : parseInt(item?.price) || 0,
          expiredDate:
            data?.item?.expiredDate ||
            formatDate(item?.item?.expiredDate, '/') ||
            formatDate(item?.expiredDate?.toString(), '/') ||
            '',
        };
      })
    : [];
};

export const mapDetailVariant = (
  data: any,
  type,
  sellingFactor: number,
  ppn: number
) => {
  const dataPrice = data?.price || 0;
  const customerPrice = formatCustomerPrice(dataPrice, sellingFactor, ppn);

  const resultDrug = {
    id: data?.id || '-',
    sku: data?.sku || '-',
    variant: data?.variant?.name || '-',
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
    expiredDate: data?.expiredDate || '-',
    batchNumber: data?.batchNumber || '-',
    stock: data?.stock || 0,
    price: formatRupiah(customerPrice) || 0,
    drugPhoto: data?.imageUrls || [],
    composition: data?.composition || '-',
    dosageForm: data?.dosageForm || '-',
  };

  const resultElastic = {
    id: data?.id || '-',
    sku: data?.item?.sku || '-',
    variant: data?.item?.name || '-',
    producer: data?.item?.manufacturer?.name || '-',
    permitNumber: data?.item?.noIzinEdar || '-',
    length: data?.item?.length || 0,
    width: data?.item?.width || 0,
    height: data?.item?.height || 0,
    weight: data?.item?.weight || 0,
    minQuantity: data?.item?.minQty || 0,
    sideEffect: data?.item?.sideEffect || '-',
    dosage: data?.item?.dosage || '-',
    usage: data?.item?.howToUse || '-',
    indication: data?.item?.indication || '-',
    storage: data?.item?.storage || '-',
    contradiction: data?.item?.contraIndication || '-',
    specialTreatment: data?.item?.specialTreatment || '-',
    expiredDate: data?.item?.expiredDate || '-',
    batchNumber: data?.item?.batchNumber || '-',
    stock: data?.stock || 0,
    price: formatRupiah(customerPrice) || 0,
    drugPhoto: data?.item?.imageUrls || [],
    composition: data?.item?.composition || '-',
    dosageForm: data?.item?.dosageForm || '-',
  };

  switch (type) {
    case 'external':
      return resultElastic;
    case 'internal':
      return resultDrug;
    default:
      return;
  }
};

export const mapFormDetailVariant = (
  data,
  sellingFactor: number,
  ppn: number
) => {
  const customerPrice = sellingFactor
    ? formatCustomerPrice(data?.price, sellingFactor, ppn)
    : parseInt(data?.price) || 0;

  return {
    id: data?.id || '',
    variant: data.variant || '',
    sku: data.sku || '',
    produceBy: data.produceBy || '',
    noIzinEdar: data.noIzinEdar || '',
    length: !isNaN(data.length) ? data.length : '',
    width: !isNaN(data.width) ? data.width : '',
    height: !isNaN(data.height) ? data.height : '',
    weight: !isNaN(data.weight) ? data.weight : '',
    price: !isNaN(data.price) ? data.price : '',
    minQty: !isNaN(data.minQty) ? data.minQty : '',
    customerPrice: customerPrice || 0,
    dosage: data.dosage || '',
    sideEffect: data.sideEffect || '',
    indication: data.indication || '',
    howToUse: data.howToUse || '',
    contraIndication: data.contraIndication || '',
    storage: data.storage || '',
    specialAttention: data.specialAttention || '',
    batchNumber: data.batchNumber || '',
    expiredDate: data.expiredDate || '',
    unit: data.unit || '',
    composition: data.composition || '',
    dosageForm: data.dosageForm || '',
    photo: [
      data.photo.photo1,
      data.photo.photo2,
      data.photo.photo3,
      data.photo.photo4,
      data.photo.photo5,
    ],
  };
};

export const mapPayloadPostDrug = (data) => {
  const variants = isArray(data.formVariants.variants)
    ? data.formVariants.variants.map((item: any) => {
        const photos = [
          item?.photo.photo1 !== '' ? item?.photo.photo1 : null,
          item?.photo.photo2 !== '' ? item?.photo.photo2 : null,
          item?.photo.photo3 !== '' ? item?.photo.photo3 : null,
          item?.photo.photo4 !== '' ? item?.photo.photo4 : null,
          item?.photo.photo5 !== '' ? item?.photo.photo5 : null,
        ].filter((item) => {
          return item !== null;
        });

        return {
          id: item?.id,
          sku: item?.sku,
          name: item?.variant,
          nameWithvariant: item?.variant,
          noIzinEdar: item?.noIzinEdar,
          length: item?.length,
          width: item?.width,
          height: item?.height,
          weight: item?.weight,
          minQty: item?.minQty,
          sideEffect: item?.sideEffect,
          dosage: item?.dosage,
          howToUse: item?.howToUse,
          indication: item?.indication,
          storage: item?.storage,
          contraIndication: item?.contraIndication,
          specialTreatment: item?.specialTreatment,
          expiredDate: item?.expiredDate,
          batchNumber: item?.batchNumber,
          price: item?.price,
          customerPrice: item?.customerPrice,
          imageUrls: photos,
          unit: item?.unit,
          variant: {
            name: item?.variant,
          },
          manufacturer: {
            name: item?.produceBy,
          },
          composition: item?.composition,
          dosageForm: item?.dosageForm,
          specialAttention: item?.specialAttention,
        };
      })
    : [];

  return {
    name: data.formInformation.name,
    description: data.formInformation.description,
    category: data.formInformation.category,
    subcategory: data.formInformation.subcategory,
    type: data.formInformation.type,
    variants: variants,
  };
};

export const mapPayloadUpdateVariant = (data) => {
  const photos = [
    data?.photo.photo1 !== '' ? data?.photo.photo1 : null,
    data?.photo.photo2 !== '' ? data?.photo.photo2 : null,
    data?.photo.photo3 !== '' ? data?.photo.photo3 : null,
    data?.photo.photo4 !== '' ? data?.photo.photo4 : null,
    data?.photo.photo5 !== '' ? data?.photo.photo5 : null,
  ].filter((item) => {
    return item !== null;
  });

  return {
    id: data?.id,
    sku: data?.sku,
    name: data?.variant,
    nameWithvariant: data?.variant,
    noIzinEdar: data?.noIzinEdar,
    length: data?.length,
    width: data?.width,
    height: data?.height,
    weight: data?.weight,
    minQty: data?.minQty,
    sideEffect: data?.sideEffect,
    dosage: data?.dosage,
    howToUse: data?.howToUse,
    indication: data?.indication,
    storage: data?.storage,
    contraIndication: data?.contraIndication,
    specialTreatment: data?.specialTreatment,
    expiredDate: data?.expiredDate,
    batchNumber: data?.batchNumber,
    price: data?.price,
    customerPrice: data?.customerPrice,
    imageUrls: photos,
    variantID: data?.variantID,
    variant: {
      name: data?.variant,
    },
    unit: data?.unit,
    manufacturerID: data?.manufacturer?.id,
    manufacturer: {
      name: data?.produceBy,
    },
    composition: data?.composition,
    dosageForm: data?.dosageForm,
    specialAttention: data?.specialAttention,
  };
};

export const mapDetailProvider = (provider, outlets) => {
  const mapOutlet = (outlets) => {
    if (isArray(outlets)) {
      return outlets?.map((item) => item?.name);
    } else {
      return '-';
    }
  };

  return {
    providerName: provider.name,
    pharmacy: mapOutlet(outlets),
  };
};
