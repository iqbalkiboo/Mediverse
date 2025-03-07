import { isArray } from 'lodash';
import { formatCustomerPrice } from '@/utils/formatNumber';

export const mapListProducts = (data: any) => {
  return data.length > 0
    ? data.map((item: any) => {
        return {
          id: item?.id,
          image: item?.img_urls
            ? Array.isArray(item?.img_urls)
              ? item?.img_urls
              : [item?.img_urls]
            : [''],
          sku: item?.sku || '-',
          name: item?.name || '-',
          category: item?.category || '-',
          subcategory: item?.subcategory || '-',
          variant: item?.variant || '-',
          description: item?.description || '-',
          manufacturer: item?.manufacturer || '-',
          composition: item?.composition || '-',
          contraIndication: item?.contra_indication || '-',
          dosage: item?.dosage || '-',
          dosageForm: item?.dosage_form || '-',
          expiredDate: item?.expired_date,
          howToUse: item?.how_to_use,
          indication: item?.indication || '-',
          noIzinEdar: item?.no_izin_edar || '-',
          sideEffect: item?.side_effect || '-',
          specialAttention: item?.special_attention || '-',
          storage: item?.storage || '-',
          type: item?.type || '-',
          unit: item?.unit || '-',
          usage: item?.usage || '-',
          height: item?.height || '-',
          length: item?.length || '-',
          weight: item?.weight || '-',
          width: item?.width || '-',
          plt: `${item.length || '0'}, ${item.width || '0'}, ${
            item.height || '0'
          }`,
        };
      })
    : [];
};

export const mapListMappingProducts = (data: any) => {
  return data.length > 0
    ? data.map((item: any) => {
        return {
          id: item?.id,
          image: item?.img_urls
            ? Array.isArray(item?.img_urls)
              ? item?.img_urls
              : [item?.img_urls]
            : [''],
          sku: item?.sku || '-',
          name: item?.name || '-',
          category: item?.category || '-',
          subcategory: item?.subcategory || '-',
          variant: item?.variant || '-',
          description: item?.description || '-',
          manufacturer: item?.manufacturer || '-',
          composition: item?.composition || '-',
          contraIndication: item?.contra_indication || '-',
          dosage: item?.dosage || '-',
          dosageForm: item?.dosage_form || '-',
          expiredDate: item?.expired_date || '-',
          indication: item?.indication || '-',
          noIzinEdar: item?.no_izin_edar || '-',
          sideEffect: item?.side_effect || '-',
          specialAttention: item?.special_attention || '-',
          storage: item?.storage || '-',
          type: item?.type || '-',
          unit: item?.unit || '-',
          usage: item?.usage || '-',
          height: item?.height || '-',
          length: item?.length || '-',
          weight: item?.weight || '-',
          width: item?.width || '-',
          plt: `${item.length || '0'}, ${item.width || '0'}, ${
            item.height || '0'
          }`,
        };
      })
    : [];
};

export const mapPayloadProductCatalog = (data) => {
  const photos = [
    data?.photo.photo1 !== '' ? data?.photo.photo1 : null,
    data?.photo.photo2 !== '' ? data?.photo.photo2 : null,
    data?.photo.photo3 !== '' ? data?.photo.photo3 : null,
    data?.photo.photo4 !== '' ? data?.photo.photo4 : null,
    data?.photo.photo5 !== '' ? data?.photo.photo5 : null,
  ]
    .filter((item) => item !== null)
    .join(',');

  return {
    sku: data.formInformation.sku,
    name: data.formInformation.name,
    manufacturer: data.formInformation.produceBy,
    category: data.formInformation.category,
    subcategory: data.formInformation.subcategory.join(','),
    no_izin_edar: data.formInformation.noIzinEdar,
    unit: data.formInformation.unit,
    type: data.formInformation.type,
    img_urls: photos,
    description: data.formDescription.description,
    length: data.formDescription.length,
    width: data.formDescription.width,
    height: data.formDescription.height,
    weight: data.formDescription.weight,
    dosage: data.formDescription.dosage,
    side_effect: data.formDescription.sideEffect,
    indication: data.formDescription.indication,
    how_to_use: data.formDescription.howToUse,
    contra_indication: data.formDescription.contraIndication,
    storage: data.formDescription.storage,
    special_attention: data.formDescription.specialAttention,
  };
};

export const mapDetailProductCatalog = (data) => {
  const photos = data?.img_urls?.split(',');
  return {
    formInformation: {
      sku: data?.sku,
      name: data?.name,
      produceBy: data?.manufacturer,
      category: data?.category,
      subcategory: data?.subcategory?.split(','),
      noIzinEdar: data?.no_izin_edar,
      unit: data?.unit,
      type: data?.type,
    },
    formDescription: {
      description: data?.description,
      length: data?.length,
      width: data?.width,
      height: data?.height,
      weight: data?.weight,
      dosage: data?.dosage,
      sideEffect: data?.side_effect,
      indication: data?.indication,
      howToUse: data?.how_to_use,
      contraIndication: data?.contra_indication,
      storage: data?.storage,
      specialAttention: data?.special_attention,
    },
    photo: {
      photo1: photos[0],
      photo2: photos[1],
      photo3: photos[2],
      photo4: photos[3],
      photo5: photos[4],
    },
  };
};

export const mapDetailProductDrug = (data) => {
  const variant = data?.variants[0] ? data?.variants[0] : [];
  const photos = variant ? variant.imageUrls : [];

  return {
    formInformation: {
      id: data?.id || '',
      is_active: data?.is_active || '',
      name: data?.name || '',
      category: data?.category || '',
      subcategory: data?.subcategory || '',
      produceBy: variant?.manufacturer?.name || '',
      noIzinEdar: variant?.noIzinEdar || '',
      unit: variant?.unit || '',
      type: data?.type || '',
    },
    formDescription: {
      description: data?.description || '',
      dosage: variant?.dosage || '',
      sideEffect: variant?.sideEffect || '',
      indication: variant?.indication || '',
      howToUse: variant?.howToUse || '',
      contraIndication: variant?.contraIndication || '',
      storage: variant?.storage || '',
      specialAttention: variant?.specialAttention || '',
    },
    photo: {
      photo1: photos[0] || '',
      photo2: photos[1] || '',
      photo3: photos[2] || '',
      photo4: photos[3] || '',
      photo5: photos[4] || '',
    },
    formVariants: data?.variants?.map((item) => ({
      id: item?.id || '',
      sku: item?.sku || '',
      variant: item?.variant?.name || '',
      length: item?.length || '',
      width: item?.width || '',
      height: item?.height || '',
      weight: item?.weight || '',
      minQty: item?.minQty || '',
      stock: item?.stock || '',
      batchNumber: item?.batchNumber || '',
      expiredDate: item?.expiredDate || '',
      price: item?.price || '',
      is_active: item?.is_active,
      mapCatalog: item?.mapCatalog,
      itemID: item?.itemID,
      itemVariantID: item?.variant?.itemVariantID,
      slug: item?.slug,
    })),
  };
};

export const mapPayloadFormProductDrug = (data, sellingFactor, ppn) => {
  const photos = [
    data?.photo?.photo1 !== '' ? data?.photo?.photo1 : null,
    data?.photo?.photo2 !== '' ? data?.photo?.photo2 : null,
    data?.photo?.photo3 !== '' ? data?.photo?.photo3 : null,
    data?.photo?.photo4 !== '' ? data?.photo?.photo4 : null,
    data?.photo?.photo5 !== '' ? data?.photo?.photo5 : null,
  ].filter((item) => {
    return item !== null;
  });

  const variants = isArray(data.formVariants)
    ? data.formVariants.map((item: any) => {
        const customerPrice = sellingFactor
          ? formatCustomerPrice(item?.price, sellingFactor, ppn)
          : parseInt(item?.price);

        return {
          id: item?.id,
          name: item?.variant,
          sku: item?.sku,
          nameWithvariant: item?.variant,
          length: item?.length,
          width: item?.width,
          height: item?.height,
          weight: item?.weight,
          minQty: item?.minQty,
          specialTreatment: item?.specialTreatment,
          expiredDate: item?.expiredDate,
          batchNumber: item?.batchNumber,
          price: item?.price,
          stock: item?.stock,
          customerPrice: customerPrice,
          composition: item?.composition,
          dosageForm: item?.dosageForm,
          variant: {
            name: item?.variant,
            id: item?.id,
            itemVariantID: item?.itemVariantID,
          },
          manufacturer: {
            name: data?.formInformation?.produceBy,
            id: item?.id,
            itemVariantID: item?.itemVariantID,
          },
          noIzinEdar: data?.formInformation?.noIzinEdar,
          unit: data?.formInformation?.unit,
          dosage: data?.formDescription?.dosage,
          sideEffect: data?.formDescription?.sideEffect,
          indication: data?.formDescription?.indication,
          howToUse: data?.formDescription?.howToUse,
          contraIndication: data?.formDescription?.contraIndication,
          storage: data?.formDescription?.storage,
          specialAttention: data?.formDescription?.specialAttention,
          is_active: data?.is_active,
          mapCatalog: data?.mapCatalog,
          itemID: data?.itemID,
          slug: data?.slug,
          variantID: item?.id,
          imageUrls: photos,
        };
      })
    : [];

  return {
    id: data?.formInformation?.id,
    is_active: data?.formInformation?.is_active,
    name: data?.formInformation?.name,
    description: data?.formDescription?.description,
    category: data?.formInformation?.category,
    subcategory: data?.formInformation?.subcategory,
    type: data?.formInformation?.type,
    variants: variants,
  };
};

export const mapPayloadPostProduct = (data, price) => {
  return {
    name: data?.name,
    description: data?.description,
    category: data?.category,
    subcategory: data?.subcategory?.split(','),
    type: data?.type,
    isMapping: true,
    variants: [
      {
        id: '',
        sku: data?.sku,
        name: data?.name,
        nameWithvariant: data?.name,
        noIzinEdar: data?.noIzinEdar,
        length: data?.length,
        width: data?.width,
        height: data?.height,
        weight: data?.weight,
        sideEffect: data?.sideEffect,
        dosage: data?.dosage,
        howToUse: data?.howToUse,
        indication: data?.indication,
        storage: data?.storage,
        contraIndication: data?.contraIndication,
        expiredDate: data?.expiredDate,
        price: price,
        imageUrls: data?.image,
        unit: data?.unit,
        variant: {
          name: data?.name,
        },
        manufacturer: {
          name: data?.manufacturer,
        },
        specialAttention: data?.specialAttention,
      },
    ],
  };
};

export const mapPayloadPostMappingProduct = (data, channelId) => {
  return {
    internal_sku: data?.sku,
    external_sku: data?.skuExternal,
    channel_id: Number(channelId),
  };
};

export const mapPayloadPostCategoryProduct = (data, channelId) => {
  return {
    category: data?.category,
    channel_id: Number(channelId),
    sku: data?.sku,
    sub_category: data?.subcategory?.join(','),
    type: '',
  };
};
