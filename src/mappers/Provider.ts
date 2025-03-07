import { isArray } from 'lodash';

import { capitalizeFirstLetter, formatAddress } from '@/src/utils/formatText';
import { decryptCFBMode } from '@/src/mappers/aes/decrypt';
import secure from '@/src/utils/secure';

import type { MetaDataHealthCareStore } from '@/src/types/MetaData';
import type { Provider, ProviderData } from '@/src/types/Provider';

export const mapProvider = (data: Provider): Provider => ({
  code: data.code,
  data: mapProviderData(data.data),
  metadata: mapMetaData(data.metadata),
});

export const mapProviderData = (data: ProviderData[]): ProviderData[] => {
  return data.map((item) => ({
    address: item.address,
    description: item.description,
    email: item.email,
    id: item.id,
    isActive: item.isActive,
    name: item.name,
    phoneNumber: item.phoneNumber,
    pic: item.pic,
    providerType: item.providerType,
    type: item.type,
    createdAt: item.createdAt,
    isOfficial: item.isOfficial || false,
  }));
};

export const mapProviderInformationData = (data) => {
  return {
    address: data.address,
    description: data.description,
    email: data.email,
    id: data.id,
    image: data.image,
    name: data.name,
    phoneNumber: data.phoneNumber,
    pic: data.pic,
    providerType: data.providerType,
    type: data.type,
    integrationOption: data.integrationSchema,
    isOfficial: data.isOfficial ? 'Iya' : 'Tidak',
  };
};

export const mapProviderPaymentData = (data) => {
  return {
    id: data.id ?? '-',
    user_id: data.user_id ?? '-',
    account_number: data.account_number ?? '-',
    alias_name: data.alias_name ?? '-',
    bank_name: data.bank_name ?? '-',
    email: data.email ?? '-',
    name: data.name ?? '-',
    channel_id: data.channel_id ?? '-',
    created_at: data.created_at ?? '-',
    updated_at: data.updated_at ?? '-',
  };
};

export const mapPlatformFeeServices = (data) => {
  return data.map((item) => ({
    label: capitalizeFirstLetter(
      `${item.service_type}-${item.type}-${item.value}`
    ),
    value: item.id,
  }));
};

export const mapDetailPlatformFeeServices = (data) => {
  return data.map((item) => ({
    label: capitalizeFirstLetter(item.serviceType),
    value: item.id,
  }));
};

export const mapMetaData = (
  data: MetaDataHealthCareStore
): MetaDataHealthCareStore => ({
  page: data.page,
  size: data.size,
  totalData: data.totalData,
  totalPage: data.totalPage,
});

export const mapPayloadBusinessSchema = (data, type) => {
  if (type === 'sharing-share' || data.type === 'sharing-share') {
    return {
      periode: data.periode,
      sharingShare: [],
      startDuration: new Date(data.startDuration).getTime(),
      endDuration: new Date(data.endDuration).getTime(),
      type: type || data.type,
      unit: 'bulan',
    };
  } else {
    return {
      periode: data.PeriodeSharingFlat,
      sharingFlat: {},
      startDuration: new Date(data.startDuration).getTime(),
      endDuration: new Date(data.endDuration).getTime(),
      type: type || data.type,
      unit: 'bulan',
    };
  }
};

export const mapBusinessSchemaData = (data) => {
  if (data?.type === 'sharing-share') {
    const mapSharingShare = data.sharingShare.map((item) => {
      return {
        id: item.id,
        minAmount: item.minAmount,
        maxAmount: item.maxAmount,
        percentage: item.percentage,
        percentageWithPpn: item.percentageWithPpn || 0,
      };
    });

    return {
      id: data.id,
      startDuration: data.startDuration,
      endDuration: data.endDuration,
      type: data.type || '',
      sharingShare: mapSharingShare,
      periode: data.periode,
      unit: data.unit,
    };
  }

  if (data?.type === 'sharing-flat') {
    return {
      id: data.id,
      startDuration: data.startDuration,
      endDuration: data.endDuration,
      type: data.type || '',
      sharingFlat: {
        percentage: data.sharingFlat.percentage,
        percentageWithPpn: data.sharingFlat.percentageWithPpn,
      },
      periode: data.periode,
      unit: data.unit,
    };
  }
};

export const mapSellingFactor = (data: any) => {
  if (data.id) {
    return {
      startDuration: data?.startDuration || '-',
      endDuration: data?.endDuration || '-',
      percentage: data?.percentage || 0,
      percentageWithPpn: data?.percentageWithPpn || 0,
      id: data?.id || '-',
    };
  } else {
    return {};
  }
};

export const mapPlatformFee = (data) => {
  if (data.id) {
    return {
      channelID: data.channelID ?? '-',
      createdAt: data.createdAt ?? 0,
      deletedAt: data.deletedAt ?? 0,
      endDuration: data.endDuration ?? 0,
      id: data.id ?? '-',
      plans: data.plans ?? [],
      services: data.services ?? [],
      startDuration: data.startDuration ?? 0,
      updatedAt: data.updatedAt ?? 0,
    };
  }
};

export const mapDataList = (data: any) => {
  return {
    getCityByProvinceUrl: data?.getCityByProvinceUrl || '-',
    getDistrictByCityUrl: data?.getDistrictByCityUrl || '-',
    getDrugByCategoryUrl: data?.getDrugByCategoryUrl || '-',
    getDrugCategoryByGroupUrl: data?.getDrugCategoryByGroupUrl || '-',
    getDrugGroupUrl: data?.getDrugGroupUrl || '-',
    getDrugRecomendedUrl: data?.getDrugRecomendedUrl || '-',
    getOutleByCityUrl: data?.getOutleByCityUrl || '-',
    getProvinceUrl: data?.getProvinceUrl || '-',
    getVillageByDistrictUrl: data?.getVillageByDistrictUrl || '-',
    placementOrderCanceledUrl: data?.placementOrderCanceledUrl || '-',
    placementOrderComplitedUrl: data?.placementOrderComplitedUrl || '-',
    placementOrderUrl: data?.placementOrderUrl || '-',
    secret: data?.secret || '-',
  };
};

export const mapDetailDataListNonApi = (data: any) => {
  const result = {
    productFileName: {
      label: 'Nama File Produk',
      value: data?.productFileName || '-',
    },
    outletFileName: {
      label: 'Nama File Outlet',
      value: data?.outletFileName || '-',
    },
    referenceFileName: {
      label: 'Nama File Reference',
      value: data?.productMappingFileName || '-',
    },
    mappingProduct: [
      { label: 'Product Name', value: data?.productMapping?.name || '-' },
      { label: 'Category', value: data?.productMapping?.category || '-' },
      { label: 'Type', value: data?.productMapping?.type || '-' },
      { label: 'Description', value: data?.productMapping?.description || '-' },
      { label: 'SKU', value: data?.productMapping?.sku || '-' },
      {
        label: 'Manufacturer',
        value: data?.productMapping?.manufacturer || '-',
      },
      { label: 'No Izin Edar', value: data?.productMapping?.noIzinEdar || '-' },
      { label: 'Length', value: data?.productMapping?.length || '-' },
      { label: 'Width', value: data?.productMapping?.width || '-' },
      { label: 'Height', value: data?.productMapping?.height || '-' },
      { label: 'Weight', value: data?.productMapping?.weight || '-' },
      {
        label: 'Minimum Quantity',
        value: data?.productMapping?.minimumQuatity || '-',
      },
      { label: 'Dosage', value: data?.productMapping?.dosage || '-' },
      { label: 'Side Effect', value: data?.productMapping?.sideEffect || '-' },
      {
        label: 'Contra Indication',
        value: data?.productMapping?.contraIndication || '-',
      },
      { label: 'Indication', value: data?.productMapping?.indication || '-' },
      { label: 'How to Use', value: data?.productMapping?.howToUse || '-' },
      { label: 'Storage', value: data?.productMapping?.storage || '-' },
      {
        label: 'Special Attention',
        value: data?.productMapping?.specialAttention || '-',
      },
      {
        label: 'Batch Number',
        value: data?.productMapping?.batchNumber || '-',
      },
      {
        label: 'Expired Date',
        value: data?.productMapping?.expiredDate || '-',
      },
      { label: 'Image URL', value: data?.productMapping?.imageUrl || '-' },
      { label: 'Unit', value: data?.productMapping?.unit || '-' },
      { label: 'Composition', value: data?.productMapping?.composition || '-' },
      { label: 'Dosage Form', value: data?.productMapping?.dosageForm || '-' },
    ],
    mappingOutlet: [
      { label: 'Code', value: data?.outletMapping?.code || '-' },
      { label: 'Name', value: data?.outletMapping?.name || '-' },
      { label: 'No Hp', value: data?.outletMapping?.phoneNumber || '-' },
      { label: 'PIC', value: data?.outletMapping?.pic || '-' },
      { label: 'APA', value: data?.outletMapping?.apa || '-' },
      { label: 'SIPA', value: data?.outletMapping?.sipa || '-' },
      {
        label: 'Accepts Instant Delivery',
        value: data?.outletMapping?.acceptsInstantDelivery || '-',
      },
      {
        label: 'Is Pickup Outlet Available',
        value: data?.outletMapping?.isPickupOutletAvailable || '-',
      },
      {
        label: 'Delivery Service Available',
        value: data?.outletMapping?.deliveryServiceAvailable || '-',
      },
      { label: 'Picture', value: data?.outletMapping?.image || '-' },
      {
        label: 'Province Code',
        value: data?.outletMapping?.provinceCode || '-',
      },
      { label: 'Province', value: data?.outletMapping?.province || '-' },
      { label: 'City Code', value: data?.outletMapping?.cityCode || '-' },
      { label: 'City', value: data?.outletMapping?.city || '-' },
      {
        label: 'District Code',
        value: data?.outletMapping?.districtCode || '-',
      },
      { label: 'District', value: data?.outletMapping?.district || '-' },
      { label: 'Village Code', value: data?.outletMapping?.villageCode || '-' },
      { label: 'Village', value: data?.outletMapping?.village || '-' },
      { label: 'Postcode', value: data?.outletMapping?.postcode || '-' },
      { label: 'Longitude', value: data?.outletMapping?.longitude || '-' },
      { label: 'Latitude', value: data?.outletMapping?.latitude || '-' },
      { label: 'Street', value: data?.outletMapping?.street || '-' },
      { label: 'HUB', value: data?.outletMapping?.isHub || '-' },
      { label: 'Open Hours', value: data?.outletMapping?.openHours || '-' },
      {
        label: 'Practice Hours',
        value: data?.outletMapping?.practiceHours || '-',
      },
    ],
    mappingReference: [
      {
        label: 'Outlet Code',
        value: data?.productRelatedMapping?.outletCode || '-',
      },
      {
        label: 'Product SKU',
        value: data?.productRelatedMapping?.productSku || '-',
      },
      { label: 'Stock', value: data?.productRelatedMapping?.Stock || '-' },
      { label: 'Price', value: data?.productRelatedMapping?.Price || '-' },
    ],
  };

  return result;
};

export const mapDetalilDataListApi = (data) => {
  const PROVIDER_KEY = secure.decrypt(import.meta.env.VITE_APP_PROVIDER_KEY);
  const decryptedData = decryptCFBMode(PROVIDER_KEY, data?.authConfig);
  return {
    type: decryptedData?.type || '',
    username: decryptedData?.basicConfig?.username || '',
    password: decryptedData?.basicConfig?.password || '',
    key: decryptedData?.apiKeyConfig?.headerKey || '',
    secret: decryptedData?.apiKeyConfig?.secretKey || '',
    authUrl: decryptedData?.bearerConfig?.body?.authUrl || '',
    usernameToken: decryptedData?.bearerConfig?.body?.usernameToken || '',
    passwordToken: decryptedData?.bearerConfig?.body?.passwordToken || '',
    refreshUrl: decryptedData?.bearerConfig?.body?.refreshUrl || '',
    refreshDuration: decryptedData?.bearerConfig?.body?.refreshDuration || '',
    productUrl: { label: 'Link API Produk', value: data?.productUrl || '-' },
    outletUrl: { label: 'Link API Outlet', value: data?.outletUrl || '-' },
    productRelatedUrl: {
      label: 'Link API Reference',
      value: data?.productRelatedUrl || '-',
    },
    placementOrderMethod: {
      label: 'Method',
      value: data?.placementOrderRequestMapping?.method || '-',
    },
    updateStatusMethod: {
      label: 'Method',
      value: data?.updateStatusRequestMapping?.method || '-',
    },
    placementOrderUrl: {
      label: 'Link API Placement Order',
      value: data?.placementOrderUrl || '-',
    },
    updateStatusUrl: {
      label: 'Link API Update Status',
      value: data?.updateStatusUrl || '-',
    },
    mappingApiProduct: [
      {
        label: 'Request Page',
        value: data?.productRequestMapping?.query?.page || '-',
      },
      {
        label: 'Request Limit',
        value: data?.productRequestMapping?.query?.limit || '-',
      },
      {
        label: 'Request Total Page',
        value: data?.productRequestMapping?.query?.totalPage || '-',
      },
      {
        label: 'Response Page',
        value: data?.productResponseMapping?.page || '-',
      },
      {
        label: 'Response Limit',
        value: data?.productResponseMapping?.limit || '-',
      },
      {
        label: 'Response Total Page',
        value: data?.productResponseMapping?.totalPage || '-',
      },
    ],
    mappingApiOutlet: [
      {
        label: 'Request Page',
        value: data?.outletRequestMapping?.query?.page || '-',
      },
      {
        label: 'Request Limit',
        value: data?.outletRequestMapping?.query?.limit || '-',
      },
      {
        label: 'Request Total Page',
        value: data?.outletRequestMapping?.query?.totalPage || '-',
      },
      {
        label: 'Response Page',
        value: data?.outletResponseMapping?.page || '-',
      },
      {
        label: 'Response Limit',
        value: data?.outletResponseMapping?.limit || '-',
      },
      {
        label: 'Response Total Page',
        value: data?.outletResponseMapping?.totalPage || '-',
      },
    ],
    mappingApiReference: [
      {
        label: 'Request Page',
        value: data?.productRelatedRequestMapping?.query?.page || '-',
      },
      {
        label: 'Request Limit',
        value: data?.productRelatedRequestMapping?.query?.limit || '-',
      },
      {
        label: 'Request Total Page',
        value: data?.productRelatedRequestMapping?.query?.totalPage || '-',
      },
      {
        label: 'Response Page',
        value: data?.productRelatedResponseMapping?.page || '-',
      },
      {
        label: 'Response Limit',
        value: data?.productRelatedResponseMapping?.limit || '-',
      },
      {
        label: 'Response Total Page',
        value: data?.productRelatedResponseMapping?.totalPage || '-',
      },
    ],
    mappingApiPlacementOrder: [
      {
        label: 'Method:',
        value: data?.placementOrderRequestMapping?.method || '-',
      },
      {
        label: 'Response Order Id:',
        value: data?.placementOrderResponseMapping?.transactionPartnerID || '-',
      },
      {
        label: 'Header Key:',
        value:
          data !== undefined
            ? Object?.keys(data?.placementOrderRequestMapping?.header)[0]
            : '-',
      },
      {
        label: 'Header Value:',
        value:
          data !== undefined
            ? Object?.values(data?.placementOrderRequestMapping?.header)[0]
            : '-',
      },
      {
        label: 'Query Key:',
        value:
          data !== undefined
            ? Object?.keys(data?.placementOrderRequestMapping?.query)[0]
            : '-',
      },
      {
        label: 'Query Value',
        value:
          data !== undefined
            ? Object?.values(data?.placementOrderRequestMapping?.query)[0]
            : '-',
      },
    ],
    mappingApiUpdateStatus: [
      {
        label: 'Header Key:',
        value:
          data !== undefined
            ? Object?.keys(data?.updateStatusRequestMapping?.header)[0]
            : '-',
      },
      {
        label: 'Header Value:',
        value:
          data !== undefined
            ? Object?.values(data?.updateStatusRequestMapping?.header)[0]
            : '-',
      },
      {
        label: 'Query Key:',
        value:
          data !== undefined
            ? Object?.keys(data?.updateStatusRequestMapping?.query)[0]
            : '-',
      },
      {
        label: 'Query Value',
        value:
          data !== undefined
            ? Object?.values(data?.updateStatusRequestMapping?.query)[0]
            : '-',
      },
    ],
    mappingProduct: [
      { label: 'Product Name', value: data?.productMapping?.name || '-' },
      { label: 'Category', value: data?.productMapping?.category || '-' },
      { label: 'Type', value: data?.productMapping?.type || '-' },
      { label: 'Description', value: data?.productMapping?.description || '-' },
      { label: 'SKU', value: data?.productMapping?.sku || '-' },
      {
        label: 'Manufacturer',
        value: data?.productMapping?.manufacturer || '-',
      },
      { label: 'No Izin Edar', value: data?.productMapping?.noIzinEdar || '-' },
      { label: 'Length', value: data?.productMapping?.length || '-' },
      { label: 'Width', value: data?.productMapping?.width || '-' },
      { label: 'Height', value: data?.productMapping?.height || '-' },
      { label: 'Weight', value: data?.productMapping?.weight || '-' },
      {
        label: 'Minimum Quantity',
        value: data?.productMapping?.minimumQuatity || '-',
      },
      { label: 'Dosage', value: data?.productMapping?.dosage || '-' },
      { label: 'Side Effect', value: data?.productMapping?.sideEffect || '-' },
      {
        label: 'Contra Indication',
        value: data?.productMapping?.contraIndication || '-',
      },
      { label: 'Indication', value: data?.productMapping?.indication || '-' },
      { label: 'How to Use', value: data?.productMapping?.howToUse || '-' },
      { label: 'Storage', value: data?.productMapping?.storage || '-' },
      {
        label: 'Special Attention',
        value: data?.productMapping?.specialAttention || '-',
      },
      {
        label: 'Batch Number',
        value: data?.productMapping?.batchNumber || '-',
      },
      {
        label: 'Expired Date',
        value: data?.productMapping?.expiredDate || '-',
      },
      { label: 'Image URL', value: data?.productMapping?.imageUrl || '-' },
      { label: 'Unit', value: data?.productMapping?.unit || '-' },
      { label: 'Price', value: data?.productMapping?.price || '-' },
      { label: 'Composition', value: data?.productMapping?.composition || '-' },
      { label: 'Dosage Form', value: data?.productMapping?.dosageForm || '-' },
    ],
    mappingOutlet: [
      { label: 'Code', value: data?.outletMapping?.code || '-' },
      { label: 'Name', value: data?.outletMapping?.name || '-' },
      { label: 'No Hp', value: data?.outletMapping?.phoneNumber || '-' },
      { label: 'PIC', value: data?.outletMapping?.pic || '-' },
      { label: 'APA', value: data?.outletMapping?.apa || '-' },
      { label: 'SIPA', value: data?.outletMapping?.sipa || '-' },
      {
        label: 'Accepts Instant Delivery',
        value: data?.outletMapping?.acceptsInstantDelivery || '-',
      },
      {
        label: 'Is Pickup Outlet Available',
        value: data?.outletMapping?.isPickupOutletAvailable || '-',
      },
      {
        label: 'Delivery Service Available',
        value: data?.outletMapping?.deliveryServiceAvailable || '-',
      },
      { label: 'Picture', value: data?.outletMapping?.image || '-' },
      {
        label: 'Province Code',
        value: data?.outletMapping?.provinceCode || '-',
      },
      { label: 'Province', value: data?.outletMapping?.province || '-' },
      { label: 'City Code', value: data?.outletMapping?.cityCode || '-' },
      { label: 'City', value: data?.outletMapping?.city || '-' },
      {
        label: 'District Code',
        value: data?.outletMapping?.districtCode || '-',
      },
      { label: 'District', value: data?.outletMapping?.district || '-' },
      { label: 'Village Code', value: data?.outletMapping?.villageCode || '-' },
      { label: 'Village', value: data?.outletMapping?.village || '-' },
      { label: 'Postcode', value: data?.outletMapping?.postcode || '-' },
      { label: 'Longitude', value: data?.outletMapping?.longitude || '-' },
      { label: 'Latitude', value: data?.outletMapping?.latitude || '-' },
      { label: 'Street', value: data?.outletMapping?.street || '-' },
      { label: 'HUB', value: data?.outletMapping?.isHub || '-' },
      { label: 'Open Hours', value: data?.outletMapping?.openHours || '-' },
      {
        label: 'Practice Hours',
        value: data?.outletMapping?.practiceHours || '-',
      },
    ],
    mappingReference: [
      {
        label: 'Outlet Code',
        value: data?.productRelatedMapping?.outletCode || '-',
      },
      {
        label: 'Product SKU',
        value: data?.productRelatedMapping?.productSku || '-',
      },
      { label: 'Stock', value: data?.productRelatedMapping?.Stock || '-' },
      { label: 'Price', value: data?.productRelatedMapping?.Price || '-' },
    ],
    mappingPlacementOrder: [
      { label: 'Id', value: data?.placementOrderMapping?.transactionID || '-' },
      {
        label: 'Outlet Id',
        value: data?.placementOrderMapping?.outletID || '-',
      },
      {
        label: 'username',
        value: data?.placementOrderMapping?.buyerName || '-',
      },
      {
        label: 'Phone Number',
        value: data?.placementOrderMapping?.buyerPhoneNumber || '-',
      },
      {
        label: 'Latitude',
        value: data?.placementOrderMapping?.addressLatitude || '-',
      },
      {
        label: 'Logintude',
        value: data?.placementOrderMapping?.addresslongitude || '-',
      },
      { label: 'Item Key', value: data?.placementOrderMapping?.itemKey || '-' },
      { label: 'Item Id', value: data?.placementOrderMapping?.itemID || '-' },
      { label: 'Item Qty', value: data?.placementOrderMapping?.itemQty || '-' },
      {
        label: 'Item Price',
        value: data?.placementOrderMapping?.itemPrice || '-',
      },
      {
        label: 'Delivery Type',
        value: data?.placementOrderMapping?.deliveryType || '-',
      },
      {
        label: 'Order Time',
        value: data?.placementOrderMapping?.orderTime || '-',
      },
    ],
    mappingUpdateStatus: [
      { label: 'Status', value: data?.updateStatusMapping?.status || '-' },
      { label: 'Id', value: data?.updateStatusMapping?.transactionID || '-' },
    ],
  };
};

export const mapDataCredential = (data: any) => {
  const PROVIDER_KEY = secure.decrypt(import.meta.env.VITE_APP_PROVIDER_KEY);
  const decryptedData = decryptCFBMode(PROVIDER_KEY, data);

  return {
    username: decryptedData?.username || '-',
    password: decryptedData?.password || '',
    url: decryptedData?.host || '-',
    port: decryptedData?.port || '-',
  };
};

export const mapMemberListProvider = (data: any) => {
  return {
    ...data,
    data:
      data?.data.length > 0
        ? data?.data.map((item: any) => {
            const address = item?.item?.address
              ? formatAddress(item?.item?.address)
              : '-';
            const slicedAddress =
              address.length > 50 ? address.slice(0, 50) + '...' : address;

            return {
              id: item?.id || '-',
              name: item?.item?.name || item?.item?.nama || '-',
              type: capitalizeFirstLetter(item?.provider_type) || '-',
              address: slicedAddress,
              status: !item?.is_banned,
            };
          })
        : [],
  };
};

export const mapBankList = (data) => {
  return data.map((item) => ({
    value: item.code,
    label: item.name,
  }));
};

export const mapDetailInfromation = (data) => {
  return {
    name: data?.name || '-',
    providerType: data?.providerType || '-',
    type: data?.type || '-',
    phoneNumber: data?.phoneNumber || '-',
    email: data?.email || '-',
    pic: data?.pic || '-',
    description: data?.description || '-',
  };
};

export const mapBankAccount = (data) => {
  return isArray(data)
    ? data.map((item) => {
        return {
          value: item,
          label: item.name,
        };
      })
    : [];
};

export const mapDetalilDataListApiMedpoint = (data) => {
  const PROVIDER_KEY = secure.decrypt(import.meta.env.VITE_APP_PROVIDER_KEY);
  const decryptedData = decryptCFBMode(PROVIDER_KEY, data?.auth);
  return {
    auth: {
      type: decryptedData?.type || 'basic',
      basic: {
        username: decryptedData?.basic?.username,
        password: decryptedData?.basic?.password,
      },
      apikey: {
        location: decryptedData?.apiKey?.location || 'header',
        key: decryptedData?.apiKey?.key || '',
        secret: decryptedData?.apiKey?.secret || '',
      },
      token: {
        authUrl: decryptedData?.token?.authUrl,
        username: decryptedData?.token?.usernameToken,
        password: decryptedData?.token?.passwordToken,
        refreshUrl: decryptedData?.token?.refreshUrl,
        refreshDuration: decryptedData?.token?.refreshDuration,
      },
    },
    clinic: {
      url: { label: 'Url', value: data?.clinic?.url || '-' },
      api: [
        {
          label: 'Request Page',
          value: data?.clinic?.query?.pageAttribute || '-',
        },
        {
          label: 'Request Limit',
          value: data?.clinic?.query?.limitAttribute || '-',
        },
        {
          label: 'Response Data',
          value: data?.clinic?.response?.dataAttribute || '-',
        },
        {
          label: 'Response Page',
          value: data?.clinic?.response?.totalPageAttribute || '-',
        },
        {
          label: 'Response Limit',
          value: data?.clinic?.response?.pageLimitAttribute || '-',
        },
        {
          label: 'Response Total Page',
          value: data?.clinic?.response?.responseTotalPage || '-',
        },
      ],
      property: [
        { label: 'id', value: data?.clinic?.data?.id || '-' },
        { label: 'name', value: data?.clinic?.data?.name || '-' },
        { label: 'email', value: data?.clinic?.data?.email || '-' },
        { label: 'phoneNumber', value: data?.clinic?.data?.phoneNumber || '-' },
        {
          label: 'village',
          value: data?.clinic?.data?.address?.village || '-',
        },
        {
          label: 'villageId',
          value: data?.clinic?.data?.address?.villageId || '-',
        },
        {
          label: 'district',
          value: data?.clinic?.data?.address?.district || '-',
        },
        {
          label: 'districtId',
          value: data?.clinic?.data?.address?.districtId || '-',
        },
        {
          label: 'subDistrict',
          value: data?.clinic?.data?.address?.subDistrict || '-',
        },
        {
          label: 'subDistrictId',
          value: data?.clinic?.data?.address?.subDistrictId || '-',
        },
        { label: 'city', value: data?.clinic?.data?.address?.city || '-' },
        { label: 'cityId', value: data?.clinic?.data?.address?.cityId || '-' },
        {
          label: 'province',
          value: data?.clinic?.data?.address?.province || '-',
        },
        {
          label: 'provinceId',
          value: data?.clinic?.data?.address?.provinceId || '-',
        },
        { label: 'street', value: data?.clinic?.data?.address?.street || '-' },
        {
          label: 'postcode',
          value: data?.clinic?.data?.address?.postcode || '-',
        },
        {
          label: 'longitude',
          value: data?.clinic?.data?.address?.longitude || '-',
        },
        {
          label: 'latitude',
          value: data?.clinic?.data?.address?.latitude || '-',
        },
        { label: 'openHours', value: data?.clinic?.data?.openHours || '-' },
        { label: 'type', value: data?.clinic?.data?.type || '-' },
        { label: 'image', value: data?.clinic?.data?.image || '-' },
      ],
    },
    doctor: {
      url: { label: 'Url', value: data?.doctor?.url || '-' },
      api: [
        {
          label: 'Request Page',
          value: data?.doctor?.query?.pageAttribute || '-',
        },
        {
          label: 'Request Limit',
          value: data?.doctor?.query?.limitAttribute || '-',
        },
        {
          label: 'Response Data',
          value: data?.doctor?.response?.dataAttribute || '-',
        },
        {
          label: 'Response Page',
          value: data?.doctor?.response?.totalPageAttribute || '-',
        },
        {
          label: 'Response Limit',
          value: data?.doctor?.response?.pageLimitAttribute || '-',
        },
        {
          label: 'Response Total Page',
          value: data?.doctor?.response?.responseTotalPage || '-',
        },
      ],
      property: [
        { label: 'id', value: data?.doctor?.data?.id || '-' },
        { label: 'name', value: data?.doctor?.data?.name || '-' },
        { label: 'email', value: data?.doctor?.data?.email || '-' },
        { label: 'phoneNumber', value: data?.doctor?.data?.phoneNumber || '-' },
        { label: 'foto', value: data?.doctor?.data?.foto || '-' },
        { label: 'gender', value: data?.doctor?.data?.gender || '-' },
        { label: 'nomorSip', value: data?.doctor?.data?.nomorSip || '-' },
        { label: 'nomorStr', value: data?.doctor?.data?.nomorStr || '-' },
        { label: 'specialis', value: data?.doctor?.data?.specialis || '-' },
        {
          label: 'tanggalLahir',
          value: data?.doctor?.data?.tanggalLahir || '-',
        },
        { label: 'tempatLahir', value: data?.doctor?.data?.tempatLahir || '-' },
        { label: 'bahasa', value: data?.doctor?.data?.bahasa || '-' },
        { label: 'biografi', value: data?.doctor?.data?.biografi || '-' },
        { label: 'clinic', value: data?.doctor?.data?.doctor || '-' },
        { label: 'treatments', value: data?.doctor?.data?.treatments || '-' },
      ],
    },
    poly: {
      url: { label: 'Url', value: data?.poly?.url || '-' },
      api: [
        {
          label: 'Request Page',
          value: data?.poly?.query?.pageAttribute || '-',
        },
        {
          label: 'Request Limit',
          value: data?.poly?.query?.limitAttribute || '-',
        },
        {
          label: 'Response Data',
          value: data?.poly?.response?.dataAttribute || '-',
        },
        {
          label: 'Response Page',
          value: data?.poly?.response?.totalPageAttribute || '-',
        },
        {
          label: 'Response Limit',
          value: data?.poly?.response?.pageLimitAttribute || '-',
        },
        {
          label: 'Response Total Page',
          value: data?.poly?.response?.responseTotalPage || '-',
        },
      ],
      property: [
        { label: 'id', value: data?.poly?.data?.id || '-' },
        { label: 'name', value: data?.poly?.data?.name || '-' },
        { label: 'code', value: data?.poly?.data?.code || '-' },
        { label: 'category', value: data?.poly?.data?.category || '-' },
        { label: 'image', value: data?.poly?.data?.image || '-' },
        { label: 'clinic', value: data?.poly?.data?.clinic || '-' },
      ],
    },
    treatment: {
      url: { label: 'Url', value: data?.treatment?.url || '-' },
      api: [
        {
          label: 'Request Page',
          value: data?.treatment?.query?.pageAttribute || '-',
        },
        {
          label: 'Request Limit',
          value: data?.treatment?.query?.limitAttribute || '-',
        },
        {
          label: 'Response Data',
          value: data?.treatment?.response?.dataAttribute || '-',
        },
        {
          label: 'Response Page',
          value: data?.treatment?.response?.totalPageAttribute || '-',
        },
        {
          label: 'Response Limit',
          value: data?.treatment?.response?.pageLimitAttribute || '-',
        },
        {
          label: 'Response Total Page',
          value: data?.treatment?.response?.responseTotalPage || '-',
        },
      ],
      property: [
        { label: 'id', value: data?.treatment?.data?.id || '-' },
        { label: 'name', value: data?.treatment?.data?.name || '-' },
        { label: 'code', value: data?.treatment?.data?.code || '-' },
        { label: 'benefit', value: data?.treatment?.data?.benefit || '-' },
        {
          label: 'description',
          value: data?.treatment?.data?.description || '-',
        },
        {
          label: 'preparation',
          value: data?.treatment?.data?.preparation || '-',
        },
        { label: 'procedure', value: data?.treatment?.data?.procedure || '-' },
        { label: 'price', value: data?.treatment?.data?.price || '-' },
        {
          label: 'customerPrice',
          value: data?.treatment?.data?.customerPrice || '-',
        },
        { label: 'type', value: data?.treatment?.data?.type || '-' },
        { label: 'image', value: data?.treatment?.data?.image || '-' },
        { label: 'clinic', value: data?.treatment?.data?.clinic || '-' },
        { label: 'poly', value: data?.treatment?.data?.poly || '-' },
        { label: 'doctors', value: data?.treatment?.data?.doctors || '-' },
      ],
    },
    placementOrder: {
      url: { label: 'Url', value: data?.placementOrder?.url || '-' },
      api: [],
      property: [],
    },
    placementOrderCompleted: {
      url: { label: 'Url', value: data?.placementOrderCompleted?.url || '-' },
      api: [],
      property: [],
    },
  };
};
