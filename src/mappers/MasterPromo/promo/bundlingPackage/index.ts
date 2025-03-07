import {isArray, isEmpty} from 'lodash';
import {formatRupiah} from '@/src/utils/fromatCurrency';
import {formatDate, formatIndonesianTimezone} from '@/src/utils/formatDate';
import {capitalizeFirstLetter} from '@/src/utils/formatText';
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

export const mapListBundlingPackage = (data: any, sellingFactor: number, ppn: number) => {
  return isArray(data) ? data?.map((item: any) => {
    const customerPrice = sellingFactor ? formatCustomerPrice(item?.metadata?.totalPackagePrice, sellingFactor, ppn) :
    parseInt(item?.metadata?.totalPackagePrice) || 0;

    const result = {
      id: item?.id || null,
      name: item?.name || '-',
      products: item?.metadata?.drugItems || [],
      type: item?.type === 'bundling' ? capitalizeFirstLetter('Paket Bundling') : '' || '',
      startPeriodDate: formatDate(item?.start_date, ' ', 'MMM') || '-',
      startPeriodTime: formatIndonesianTimezone(item?.start_date) || '-',
      endPeriodDate: formatDate(item?.end_date, ' ', 'MMM') || '-',
      endPeriodTime: formatIndonesianTimezone(item?.end_date),
      totalPackagePrice: formatRupiah(item?.metadata?.totalPackagePrice) || 0,
      totalDiscount: item?.metadata?.totalDiscount || 0,
      status: item?.status === 'disable' ? 'disable' : status(item?.start_date, item?.end_date) || '-',
      healthFacility: item?.metadata?.healthFacility?.name || '-',
      serviceNames: item?.metadata?.drugItems || [],
      customerPrice: customerPrice,
    };

    return result;
  }) : [];
};

export const mapDetailBundlingPackage = (data: any, sellingFactor: number, ppn: number) => {
  const mapListProduct = (items) => {
    return isArray(items) ? items?.map((item) => {
      const customerPrice = sellingFactor ? formatCustomerPrice(item?.price, sellingFactor, ppn) :
      parseInt(item?.price) || 0;

      const result = {
        id: item?.id || null,
        sku: item?.sku || '-',
        name: item?.name || '-',
        normalPrice: formatRupiah(item?.price || 0) || 0,
        customerPrice: formatRupiah(customerPrice),
        stock: item?.stock || 0,
        packagePrice: formatRupiah(item?.packagePrice || 0) || 0,
        serviceGroup: item?.treatmentGroup || '-',
      };

      return result;
    }) : [];
  };

  return ({
    id: data?.id,
    name: data?.name || '-',
    type: data?.type === 'bundling' ? capitalizeFirstLetter('Paket Bundling') : '' || '',
    status: data?.status === 'disable' ? 'disable' : status(data.start_date, data.end_date) || '-',
    startPeriodDate: formatDate(data.start_date, ' ', 'MMM') || '-',
    endPeriodDate: formatDate(data.end_date, ' ', 'MMM') || '-',
    startPeriodTime: formatIndonesianTimezone(data.start_date) || '-',
    endPeriodTime: formatIndonesianTimezone(data.end_date) || '-',
    totalPackagePrice: formatRupiah(data?.metadata?.totalPackagePrice || 0) || 0,
    totalDiscount: data?.metadata?.totalDiscount || 0,
    listProduct: mapListProduct(data?.metadata?.drugItems || []),
  });
};

export const mapListDrug = (data: any, params: any, providerId: any, sellingFactor: number, ppn: number) => {
  let result = data.length > 0 ? data.map((item: any) => {
    const customerPrice = sellingFactor ? formatCustomerPrice(item?.price, sellingFactor, ppn) :
    parseInt(item?.price) || 0;

    return {
      id: item?.id || '-',
      variantId: item?.item?.id || '',
      sku: item?.item?.sku || '-',
      itemId: item?.item_id || null,
      name: item?.item?.nameWithvariant || '-',
      drugCategory: item?.item?.item?.category || '-',
      drugType: item?.item?.item?.type || '-',
      price: item?.price || 0,
      customerPrice: customerPrice,
      stock: item?.item?.stock || 0,
      itemType: item?.item_type || null,
      providerId: item?.provider_id || 0,
      unit: item?.item?.unit || '-',
      hasVoucher: item?.item?.voucher?.map((item) => !isEmpty(item?.items)).includes(true),
    };
  }).filter((item: any) => {
    return (
      item?.itemType === 'drug' &&
      (item?.stock != '' || item?.stock != 0) &&
      item.providerId === Number(providerId) &&
      item.hasVoucher === false
    );
  }) : [];

  // Grouping Drug By Variant Id
  result = Object.values(
      result.reduce((acc, current) => {
        acc[current.variantId] = acc[current.variantId] ?? [];
        acc[current.variantId].push(current);
        return acc;
      }, {}),
  );

  // Calculate Stock After Grouping Drug By Variant Id
  result = result.map((item) => {
    return item.reduce((acc, curValue) => {
      return {
        ...curValue,
        stock: acc.stock + curValue.stock,
      };
    });
  });

  if (params?.drugType || params?.drugCategory) {
    return result.filter((item) => {
      if (params?.drugType !== '' && params?.drugCategory !== '') {
        return (
          item?.drugType?.toLowerCase() === params.drugType.toLowerCase() &&
          item?.drugCategory?.toLowerCase() === params.drugCategory.toLowerCase()
        );
      }

      if (params?.drugType !== '') {
        return item?.drugType?.toLowerCase() === params.drugType.toLowerCase();
      }

      if (params?.drugCategory !== '') {
        return item?.drugCategory?.toLowerCase() === params.drugCategory.toLowerCase();
      }
    });
  }

  return result;
};

export const mapListSelectDrugCategory = (data) => {
  const listSelectDrugCategory = isArray(data) ? data.map((item: any) => {
    return {
      title: item?.name || '',
      value: item?.name || '',
    };
  }) : [];

  return [{title: 'Semua Kategori Obat', value: ''}, ...listSelectDrugCategory];
};

