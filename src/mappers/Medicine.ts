import {formatRupiah} from '@/src/utils/fromatCurrency';

export const mapVariantMedicine = (data: any, stock) => {
  return data.length > 0 ? data.map((item: any) => ({
    id: item.id,
    sku: item.sku || '-',
    variant: item.nameWithvariant || '-',
    plt: `${item.length || '0'},${item.width || '0'},${item.height || '0'}`,
    weight: item.weight || 0,
    minQty: item.minQty || 0,
    stock: item.stock || stock || 0,
    batchNumber: item.batchNumber,
    price: formatRupiah(item.price) || 0,
    sellingFactor: item.sellingFactor || 0,
    priceInMediverse: formatRupiah(item.customerPrice) || 0,
  })) : [];
};

export const mapListVariant = (data: any, stock) => {
  return data.length > 0 ? data.map((item: any) => ({
    id: item.id,
    sku: item.sku || '-',
    variant: item.nameWithvariant || '-',
    plt: `${item.length || '0'},${item.width || '0'},${item.height || '0'}`,
    weight: item.weight || 0,
    minQty: item.minQty || 0,
    stock: item.stock || stock || 0,
    batchNumber: item.batchNumber,
    price: formatRupiah(item.price) || 0,
    sellingFactor: item.sellingFactor || 0,
    priceInMediverse: formatRupiah(item.customerPrice) || 0,
  })) : [];
};

export const mapListVariantMedicine = (data: any) => {
  return data.length > 0 ? data.map((item: any) => ({
    id: item?.id,
    variant: item?.nameWithvariant || '-',
    sku: item?.sku || '-',
    stock: item?.stock || 0,
    price: formatRupiah(item?.price) || 0,
    sellingFactor: item?.sellingFactor || 0,
    priceMediverse: formatRupiah(item?.customerPrice) || 0,
    status: item?.status || '-',
  })) : [];
};

export const mapMedicinesNonAdmin = (data: any) => {
  return data.length > 0 ? data.map((item: any) => ({
    id: item?.id || '-',
    name: item?.name || '-',
    provider_type: item?.sku || '-',
    stock: item?.stock || 0,
    price: formatRupiah(item?.price) || 0,
    is_banned: false,
  })) : [];
};

export const mapDetailMedicineNonAdmin = (data: any, providerId) => {
  return {
    provider_type: providerId || '-',
    name: data?.name || '-',
    id: data?.id || '-',
    description: data?.description || '-',
    providerId: providerId || '-',
  };
};

export const mapMedicines = (data: any) => {
  return data.length > 0 ? data.map((item: any) => ({
    id: item?.id || '-',
    name: item?.item?.item?.name || '-',
    provider_type: item?.provider_type || '-',
    stock: item?.stock || 0,
    price: item?.price || 0,
    is_banned: item?.is_banned,
  })) : [];
};
