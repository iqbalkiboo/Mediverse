import { isArray, isEmpty } from 'lodash';

import { formatDate, formatIndonesianTimezone } from '@/src/utils/formatDate';
import { formatRupiah } from '@/src/utils/fromatCurrency';
import { formatCustomerPrice } from '@/src/utils/formatNumber';

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

export const type = (type) => {
  switch (type) {
    case 'cashback':
      return 'Cashback';
    case 'free_delivery':
      return 'Gratis Ongkir';
    case 'discount':
      return 'Discount';
    default:
      return '-';
  }
};

export const target = (target) => {
  switch (target) {
    case 'public':
      return 'Publik';
    case 'private':
      return 'Khusus';
    default:
      return '-';
  }
};

export const mapListProductCoupon = (data: any[]) => {
  return isArray(data)
    ? data.map((item) => {
        return {
          id: item.id || '-',
          name: item.name || '-',
          target: target(item.target_user),
          type: type(item.coupon_type),
          startPeriodDate: formatDate(item.start_date, ' ', 'MMM') || '-',
          startPeriodTime: formatIndonesianTimezone(item.start_date) || '-',
          endPeriodDate: formatDate(item.end_date, ' ', 'MMM') || '-',
          endPeriodTime: formatIndonesianTimezone(item.end_date) || '-',
          quota: item.quota || '-',
          status:
            item?.status === 'disable'
              ? 'disable'
              : status(item.start_date, item.end_date) || '-',
          minimalTransactionAmount: item.minimal_transaction_amount,
          usageQuota: isArray(item.usages) ? item.usages.length : 0,
          amount: item.amount,
          targetUser: item.target_user,
          code: item?.code,
          maxDiscount: item?.maximum_discount || 0,
        };
      })
    : [];
};

export const mapListSoldProduct = (data) => {
  return isArray(data)
    ? data.map((item) => {
        return {
          sku: item?.sku || '-',
          name: item?.name || '-',
          category: item?.drugCategory || '-',
          type: item?.drugType || '-',
          minPrice: formatRupiah(item?.minPrice || 0),
          maxPrice: formatRupiah(item?.maxPrice || 0),
          price: formatRupiah(item?.price || 0),
          stock: item?.productStock || 0,
          soldProduct: item?.soldProduct || 0,
          outletName: item?.outletName || '-',
        };
      })
    : [];
};

export const mapDetailProductCoupon = (data) => {
  return {
    id: data.id || '-',
    name: data?.name || '-',
    amount: data.amount,
    type: type(data.coupon_type),
    startPeriodDate: formatDate(data?.start_date, ' ', 'MMM') || '-',
    startPeriodTime: formatIndonesianTimezone(data?.start_date) || '-',
    endPeriodDate: formatDate(data?.end_date, ' ', 'MMM') || '-',
    endPeriodTime: formatIndonesianTimezone(data?.end_date) || '-',
    couponTarget: target(data?.target_user) || '-',
    couponType: type(data?.coupon_type) || '-',
    totalCoupon: data?.quota || 0,
    usedCoupon: isArray(data?.usages) ? data?.usages.length : 0,
    status:
      data?.status === 'disable'
        ? 'disable'
        : status(data.start_date, data.end_date) || '-',
    listProduct: mapListSoldProduct(data?.metadata?.drugItems),
    targetUser: data?.target_user,
    voucherCode: data?.code,
    discountType: data?.discount_type || '',
    maxDiscount: data?.maximum_discount || 0,
  };
};

// const groupById = (data, key) => {
//   return data.reduce((total, value) => {
//     (total[value[key]] = total[value[key]] || []).push(value);
//     return total;
//   }, {});
// };

// const totalStock = (data) => {
//   let total = 0;
//   data.forEach((item) => {
//     if (item.stock) {
//       total += parseInt(item.stock);
//     }
//   });
//   return total;
// };

export const mapListDrug = (
  data: any,
  params: any,
  providerId: any,
  sellingFactor: number,
  ppn: number
) => {
  const result = isArray(data)
    ? data
        .map((item) => {
          const customerPrice = sellingFactor
            ? formatCustomerPrice(item?.price, sellingFactor, ppn)
            : parseInt(item?.price) || 0;

          return {
            id: item?.item_id || '-',
            sku: item?.item?.sku || '-',
            drugType:
              item?.item?.item?.type ||
              item?.item?.type ||
              item?.drugType ||
              '-',
            name:
              item?.item?.item?.name || item?.item?.name || item?.name || '-',
            drugCategory:
              item?.item?.item?.category ||
              item?.item?.category ||
              item?.drugCategory ||
              '-',
            productStock: item?.stock || item?.productStock || 0,
            price: item?.price || 0,
            customerPrice: customerPrice,
            is_banned: item?.is_banned || item?.is_banned || false,
            unit: item?.item?.unit || '-',
            hasVoucher: item?.item?.voucher
              ?.map((item) => !isEmpty(item?.items))
              .includes(true),
            providerId: item?.provider_id,
            parentId: item?.parent_id,
            outletName: item?.item?.outletName,
          };
        })
        .filter((item) => {
          return (
            (item.productStock !== '' || item.productStock !== 0) &&
            item.providerId === Number(providerId) &&
            item.hasVoucher === false
          );
        })
    : [];

  if (params?.drugType || params?.drugCategory) {
    return result.filter((item) => {
      if (params?.drugType !== '' && params?.drugCategory !== '') {
        return (
          item?.drugType?.toLowerCase() === params.drugType.toLowerCase() &&
          item?.drugCategory?.toLowerCase() ===
            params.drugCategory.toLowerCase()
        );
      }

      if (params?.drugType !== '') {
        return item?.drugType?.toLowerCase() === params.drugType.toLowerCase();
      }

      if (params?.drugCategory !== '') {
        return (
          item?.drugCategory?.toLowerCase() ===
          params.drugCategory.toLowerCase()
        );
      }
    });
  }

  return result;
};

export const mapPayloadItems = (data: any) => {
  return isArray(data)
    ? data.map((item) => {
        return {
          variant_id: parseInt(item.id || item.variant_id),
          parent_id: item?.parentId || '',
        };
      })
    : [];
};

export const mapListDrugAdded = (
  data: any,
  sellingFactor: number,
  ppn: number
) => {
  return isArray(data)
    ? data.map((item) => {
        const customerPrice = sellingFactor
          ? formatCustomerPrice(item?.price, sellingFactor, ppn)
          : parseInt(item?.price) || 0;

        return {
          id: item?.id || '',
          sku: item?.sku || '-',
          name: item?.name || '-',
          drugCategory: item?.drugCategory || '-',
          drugType: item?.drugType || '-',
          price: item?.price || 0,
          customerPrice: customerPrice,
          productStock: item?.productStock || '-',
          parentId: item?.parentId || '',
          outletName: item?.outletName || '-',
        };
      })
    : [];
};

export const mapListSelectDrugCategory = (data) => {
  const listSelectDrugCategory = isArray(data)
    ? data.map((item: any) => {
        return {
          title: item?.name || '',
          value: item?.name || '',
        };
      })
    : [];

  return [
    { title: 'Semua Kategori Obat', value: '' },
    ...listSelectDrugCategory,
  ];
};
