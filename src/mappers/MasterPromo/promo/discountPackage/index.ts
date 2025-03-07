import {isArray, isEmpty} from 'lodash';
import {formatRupiah} from '@/src/utils/fromatCurrency';
import {formatDate, formatIndonesianTimezone} from '@/src/utils/formatDate';
import {formatCustomerPrice} from '@/src/utils/formatNumber';

const status = (startDate, endDate) => {
  const now = new Date().getTime();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (end <= now) {
    return 'finish';
  } else if (start >= now) {
    return 'incoming';
  } else {
    return 'active';
  }
};

export const mapListDiscountPackage = (data: any[]) => {
  return isArray(data) ? data?.map((item: any) => {
    const result = {
      id: item?.id,
      name: item?.name || '-',
      product: item?.metadata?.[0]?.name || '-',
      startPeriodDate: formatDate(item.start_date, ' ', 'MMM') || '-',
      startPeriodTime: formatIndonesianTimezone(item.start_date) || '-',
      endPeriodDate: formatDate(item.end_date, ' ', 'MMM') || '-',
      endPeriodTime: formatIndonesianTimezone(item.end_date) || '-',
      discountPackage: item?.packages || [],
      status: item?.status === 'disable' ? 'disable' : status(item.start_date, item.end_date) || '-',
    };

    return result;
  }) : [];
};

export const mapListProductDiscountPackage = (data: any[], sellingFactor: number, ppn: number) => {
  return isArray(data) ? data?.map((item: any) => {
    const customerPrice = sellingFactor ? formatCustomerPrice(item?.price, sellingFactor, ppn) :
    parseInt(item?.price) || 0;

    const result ={
      id: item?.id,
      sku: item?.sku || '-',
      name: item.name || '-',
      price: formatRupiah(item.price) || '-',
      customerPrice: customerPrice,
      stock: item.stock || '-',
      packagePrice: formatRupiah(item.packagePrice) || '-',
      discountPackage: item.discountPackage,
    };

    return result;
  }) : [];
};

export const mapListDrug = (data: any, providerId: number, sellingFactor: number, ppn: number) => {
  const result = isArray(data) ? data.map((item: any) => {
    const customerPrice = sellingFactor ? formatCustomerPrice(item?.price, sellingFactor, ppn) :
      parseInt(item?.price) || 0;

    return {
      id: item?.item_id || '-',
      sku: item?.item?.sku || '-',
      drugType: item?.item?.item?.type || item?.drugType || '-',
      name: item?.item?.name || item?.name || '-',
      drugCategory: item?.item?.item?.category || item?.drugCategory || '-',
      productStock: item?.stock || item?.productStock || 0,
      price: item?.price || 0,
      customerPrice: customerPrice,
      is_banned: item?.is_banned || item?.is_banned || false,
      itemType: item?.item_type || null,
      providerId: item?.provider_id || 0,
      unit: item?.item?.unit || '-',
      hasVoucher: item?.item?.voucher?.map((item) => !isEmpty(item?.items)).includes(true),
    };
  }).filter((item) => {
    return (
      item?.itemType === 'drug' &&
      (item?.productStock != '' || item?.productStock != 0) &&
      item.providerId === Number(providerId) &&
      item.hasVoucher === false
    );
  }) : [];

  return result;
};

export const mapSelectedDrug = (data: any, addDiscountPackage: any, sellingFactor: number, ppn: number) => {
  return isArray(data) ? data.map((item: any) => {
    const customerPrice = sellingFactor ? formatCustomerPrice(item?.price, sellingFactor, ppn) :
      parseInt(item?.price) || 0;
    return {
      id: item?.id || '-',
      sku: item?.sku || '-',
      name: item?.item?.item?.name || item?.name || '-',
      price: item?.item?.price || item?.price || 0,
      customerPrice: customerPrice,
      stock: item?.stock || item?.productStock || 0,
      unitPrice: item?.item?.price || item?.price || 0,
      packagePrice: item?.item?.price || item?.price || 0,
      discountPackage: addDiscountPackage || 'Beli -, Diskon -%',
    };
  }) : [];
};

export const mapPackages = (data: any) => {
  return isArray(data) ? data.map((item) => {
    return {
      id: item?.id || '-',
      countItem: item?.count_item || 0,
      discount: item?.discount || 0,
    };
  }) : [];
};

export const mapDetailDiscountPackage = (data: any) => {
  return {
    id: data?.id || '-',
    name: data?.name || '-',
    startPeriodDate: formatDate(data.start_date, ' ', 'MMM') || '-',
    startPeriodTime: formatIndonesianTimezone(data.start_date) || '-',
    endPeriodDate: formatDate(data.end_date, ' ', 'MMM') || '-',
    endPeriodTime: formatIndonesianTimezone(data.end_date) || '-',
    packages: mapPackages(data?.packages || []),
    discountPackage: data?.packages || [],
    status: data?.status === 'disable' ? 'disable' : status(data.start_date, data.end_date) || '-',
  };
};

