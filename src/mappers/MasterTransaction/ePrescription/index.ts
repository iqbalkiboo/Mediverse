import dayjs from 'dayjs';

import {
  getTotalPriceBySellingFactorItems,
  transformCustomerPricePrescription,
} from '@/src/utils/transactionEPrescription';
import { formatCustomerPrice } from '@/src/utils/formatNumber';
import { TRANSACTION_STATUS_RESPONSE } from '@/src/constants';

import { isArray, isEmpty, uniqBy } from 'lodash';

const mapAddress = (data) => {
  const address = JSON.parse(data);
  return address
    ? [
        address?.street || '',
        address?.village || '',
        address?.district || '',
        address?.city || '',
        address?.province || '',
        address?.postal_code || '',
      ]
        .filter((item) => item !== '')
        .join(', ')
    : '-';
};

const statusEpres = (status: string, transactionId: string) => {
  let result = status;
  if (transactionId && status === TRANSACTION_STATUS_RESPONSE.SETTLEMENT) {
    result = TRANSACTION_STATUS_RESPONSE.IN_PROGRESS;
  } else if (status === TRANSACTION_STATUS_RESPONSE.IN_PROGRESS) {
    result = TRANSACTION_STATUS_RESPONSE.IN_PROGRESS_PRESCRIPTION;
  }

  return result;
};

export const mapListEPrescription = (data: any[], search?: string) => {
  const result = isArray(data)
    ? data?.map((item: any) => {
        const parseDelivery = !isEmpty(item.delivery_metadata)
          ? JSON.parse(item.delivery_metadata)
          : '';
        return {
          item: {
            id: item?.id || '0',
            itemId: item?.item_id || '0',
            itemName: item?.item_name || '-',
            paymentTotal: item?.amount || 0,
            itemImage: item?.attachment || '',
            itemTotal: item?.item_total || 0,
            isBuyAgain: !item?.attachment?.includes('storage-proxy'),
            idAttachmentBuyAgain:
              item?.attachment?.split('/')?.[
                item?.attachment?.split('/').length - 2
              ] || null,
            status: statusEpres(item?.status, item?.transaction_id),
            transactionId: item?.transaction_id,
            namePatient: item?.pasien_name || '-',
            pharmacy: item?.outlet_name || '-',
            deliveryId: item?.delivery_id || '-',
            createdDate: item?.created_at || '',
            paymentLimit: dayjs.unix(item?.updated_at) || dayjs.unix(0),
            itemVariant: item?.item_variant || '-',
            deliveryType: parseDelivery.serviceType || '-',
            providerType: item?.provider_type || '-',
            deliveryAddress: mapAddress(item?.address_metadata),
            phoneNumber: JSON.parse(item?.address_metadata).phone_number,
            isCountdown: (item?.updated_at && item?.created_at) ?? false,
            paymentTotalFee:
              Array.isArray(item?.item) && item?.item.length
                ? getTotalPriceBySellingFactorItems(item.item)
                : 0,
            transaction: isEmpty(item.transaction)
              ? {
                  completed_at: '',
                  created_at: '',
                  id: '',
                  payment_id: '',
                  payment_provider_id: '',
                  status: '',
                  updated_at: '',
                }
              : {
                  completed_at: item.transaction.completed_at,
                  created_at: item.transaction.created_at,
                  id: item.transaction.id,
                  payment_id: item.transaction.payment_id,
                  payment_provider_id: item.transaction.payment_provider_id,
                  status: item.transaction.status,
                  updated_at: item.transaction.updated_at,
                },
            items:
              item?.item?.map((itemVariant) => ({
                id: itemVariant?.id,
                name: itemVariant?.item_variant_name,
                quantity: itemVariant?.prescribed_amount,
              })) || [],
          },
        };
      })
    : [];

  return result.filter((item) => String(item.item.id).includes(search));
};

export const mapDetailEPrescription = (
  data: any,
  sellingFactor: number,
  ppn: number
) => {
  const result = {
    id: data?.id || '-',
    isBuyAgain: !data?.attachment?.includes('storage-proxy'),
    idAttachmentBuyAgain:
      data?.attachment?.split('/')?.[data?.attachment?.split('/').length - 2] ||
      null,
    cartId: data?.cart_id || '',
    transactionNumber: data?.transaction_no || '-',
    attachment: data?.attachment || '-',
    attachmentCopyRecipe: data?.attachment_copy_recipe || '',
    outletName: data?.outlet_name || '-',
    items: [] as any,
    delivery: {
      patientName: data?.user?.pasien_name || '-',
      age: data?.user?.age ? `${data?.user?.age} tahun` : '-',
      recipient: data?.delivery?.receiver_name,
      phoneNumber: data?.user?.phone_number || '-',
      address: data?.delivery?.address || '-',
      serviceType: data?.delivery?.service_type || '',
      amount: data?.delivery?.amount || 0,
    },
    transaction: {
      code: data?.transaction?.code || '',
      status: data?.transaction?.status || '',
      is_prescription: data?.transaction?.is_prescription,
    },
    status: statusEpres(data?.status, data?.transaction?.id),
    cretatedAt: data?.created_at || '-',
    payment: data?.payment || null,
    totalCost: data?.total_cost || 0,
    updatedAt: data?.updated_at || dayjs.unix(0),
  };
  data?.item_data
    ? data?.item_data.map((item) => {
        const customerPrice = sellingFactor
          ? formatCustomerPrice(
              item?.price || item?.itemPrice || item?.amount,
              sellingFactor,
              ppn
            )
          : parseInt(item?.price || item?.itemPrice || item?.amount) || 0;

        // const sellingFactorFee = Math.floor(item?.selling_factor_fee / 100) * 100;
        if (!item?.mixture_drug) {
          result.items.push({
            id: item?.item_id,
            name: item?.item_variant_name || '',
            image: item?.image_drug || '',
            dosage: item?.dosage || '',
            unit: item?.unit || '',
            stock: item?.stock || 0,
            totalRecipe: item?.qty_prescribed || 0,
            totalBought: item?.qty_bought || 0,
            totalPrice: item?.amount * item?.qty_bought || 0,
            itemPrice: item?.amount || '',
            substitutionDrug: item?.subtitution_drug || '',
            isDeleted: item?.is_deleted || false,
            isConcoction: false,
            howToUse: item?.how_to_use || '',
            isEdit: false,
            isSubtitute: false,
            sellingFactorFee: sellingFactor || 0,
            totalPriceFee: customerPrice * item?.qty_bought || 0,
            customerPrice: customerPrice || 0,
          });
        } else {
          const parent = result.items.find(
            (drug) => drug.id === 'parent' + item?.mixture_drug
          );
          !parent
            ? result.items.push({
                id: 'parent' + item?.mixture_drug,
                isConcoction: true,
                recipeName: item?.mixture_drug,
                totalConcoction:
                  data?.item_mixture_data?.map(
                    (item) => item.qty_prescribed
                  )[0] || 0,
                totalBought:
                  data?.item_mixture_data?.map((item) => item.qty_bought)[0] ||
                  0,
                isEdit: false,
                totalPrice: 0,
                isDeleted: item?.is_deleted,
                howToUse: item?.how_to_use || '',
                totalPriceFee: 0,
                items: [
                  {
                    isConcoction: true,
                    id: item?.item_id,
                    name: item?.item_variant_name || '',
                    image: item?.image_drug || '',
                    dosage: item?.dosage || '',
                    unit: item?.unit || '',
                    stock: item?.stock || 0,
                    totalRecipe: item?.qty_prescribed || 0,
                    totalBought: item?.qty_bought || 0,
                    totalPrice: item?.amount * item?.qty_bought || 0,
                    itemPrice: item?.amount || '',
                    isDeleted: item?.is_deleted,
                    isChecked: true,
                    isSubstitute: false,
                    substitutionDrug: item?.subtitution_drug || '',
                    maxTotalBought: false,
                    sellingFactorFee: sellingFactor || 0,
                    totalPriceFee: customerPrice * item?.qty_bought || 0,
                    customerPrice: customerPrice || 0,
                  },
                ],
              })
            : parent.items.push({
                isConcoction: true,
                id: item?.item_id,
                name: item?.item_variant_name || '',
                image: item?.image_drug || '',
                dosage: item?.dosage || '',
                unit: item?.unit || '',
                stock: item?.stock || 0,
                totalRecipe: item?.qty_prescribed || 0,
                totalBought: item?.qty_bought || 0,
                totalPrice: item?.amount * item?.qty_bought || 0,
                itemPrice: item?.amount || '',
                isDeleted: false,
                isChecked: true,
                substitutionDrug: item?.subtitution_drug || '',
                sellingFactorFee: sellingFactor || 0,
                totalPriceFee: customerPrice * item?.qty_bought || 0,
                customerPrice: customerPrice || 0,
              });
        }
      })
    : [];
  return result;
};

export const mapListDrug = (
  data,
  parentId,
  sellingFactor: number,
  ppn: number
) => {
  const result = isArray(data)
    ? data?.map((item) => {
        const customerPrice = sellingFactor
          ? formatCustomerPrice(item?.price, sellingFactor, ppn)
          : parseInt(item?.price) || 0;
        return {
          id: item?.id,
          isAvailable: item?.is_available,
          isBanned: item?.is_banned,
          sku: item?.item?.sku || '-',
          name: item?.item?.nameWithvariant || '',
          image: item?.item?.imageUrls?.map((items) => items) || '',
          dosage: item?.item?.dosage || '',
          unit: item?.item?.unit || '-',
          stock: item?.item?.stock || 0,
          itemPrice: item?.item?.price || 0,
          parentId: item?.parent_id || '',
          sellingFactorFee: sellingFactor || 0,
          customerPrice: customerPrice || 0,
          feeComponents:
            Array.isArray(item?.fee_components) &&
            item?.fee_components.length > 0
              ? item?.fee_components
              : [],
        };
      })
    : [];

  const filter = result.filter((item) => {
    return (
      item?.parentId === parentId &&
      item?.isAvailable &&
      !item.isBanned &&
      (item?.stock !== '' || item?.stock !== 0)
    );
  });

  return transformCustomerPricePrescription(filter);
};

export const mapListDrugEPrescription = (data) => {
  return isArray(data)
    ? data.map((item) => {
        return {
          id: item?.id,
          sku: item?.sku || '-',
          name: item?.name || '',
          image: item?.image || '',
          dosage: item?.dosage || '',
          item: item?.item || '',
          stock: item?.stock || 0,
          totalRecipe: item?.totalRecipe || 0,
          totalPrice: item?.totalPrice || 0,
          itemPrice: item?.itemPrice || '',
          isDeleted: item?.isDeleted,
        };
      })
    : [];
};

export const mapDataCopyRecipe = (data: any) => {
  const mapDrugItems = (
    type: 'nonMixtureDrug' | 'mixtureDrug',
    itemData: any[],
    itemMixtureData?: any[]
  ) => {
    if (type === 'nonMixtureDrug') {
      const filteredData = itemData?.filter(
        (item) => !item.hasOwnProperty('mixture_drug')
      );
      return filteredData?.map((item) => {
        return {
          name: item?.item_variant_name || '',
          qtyPurchased: item?.qty_bought || null,
          qtyPrescribed: item?.qty_prescribed || null,
          howToUse: item?.how_to_use || '',
        };
      });
    }

    if (type === 'mixtureDrug') {
      const filteredData = itemData?.filter((item) =>
        item.hasOwnProperty('mixture_drug')
      );

      const result = itemMixtureData?.map((itemMixture) => {
        return {
          mixtureName: itemMixture?.mixture_drug || '',
          qtyPurchased: itemMixture?.qty_bought || null,
          qtyPrescribed: itemMixture?.qty_prescribed || null,
          howToUse: itemMixture?.how_to_use || '',

          items: filteredData.map((item) => {
            if (itemMixture.mixture_drug === item.mixture_drug) {
              return { drugName: item?.item_variant_name || '' };
            }
          }),
        };
      });

      return uniqBy(result, 'mixtureName');
    }
  };

  return {
    id: data?.id || null,
    image: data?.attachment || '',
    user: {
      userId: data?.user?.user_id || '',
    },
    nonMixtureDrug: mapDrugItems('nonMixtureDrug', data?.item_data) || [],
    mixtureDrug:
      mapDrugItems('mixtureDrug', data?.item_data, data?.item_mixture_data) ||
      [],
    delivery: {
      serviceType: data?.delivery?.service_type,
    },
    transaction: {
      id: data?.transaction?.id,
      status: data?.transaction?.status,
    },
  };
};
