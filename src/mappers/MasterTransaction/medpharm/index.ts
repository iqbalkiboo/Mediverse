import { isArray } from 'lodash';

import {
  IComplainReasonItem,
  IDetailMedpharm,
  IDetailMedpharmItemData,
  IMedpharmItem,
} from '@/src/types/MasterTransaction/medpharm';

export const mapListMedpharm = (data: IMedpharmItem[]) => {
  return isArray(data)
    ? data?.map((item: IMedpharmItem) => {
        return {
          item: {
            id: item?.id || '',
            bill: item?.bill || 0,
            itemId: item?.item_id || '',
            itemName: item?.item_name || '',
            paymentTotal: item?.amount || 0,
            itemImage: item?.item_image || '',
            itemTotal: item?.item_total || 0,
            paymentStatus: item?.status || '',
            namePatient: item?.recipient_metadata?.full_name || '',
            pharmacy: item?.provider_name || '',
            deliveryId: item?.delivery_id || '',
            createdDate: item?.created_at || '',
            paymentLimit: item?.expired_at || '',
            itemVariant: item?.item_variant || '',
            deliveryType: item?.delivery_type || '',
            providerType: item?.provider_type || '',
            deliveryAddress: item?.delivery_address || '',
            transactionDetailIds: item?.transaction_detail_ids || [],
          },
        };
      })
    : [];
};

export const mapDetailMedpharm = (data: IDetailMedpharm) => {
  const items = isArray(data?.item)
    ? data?.item?.map((item: IDetailMedpharmItemData) => {
        return {
          itemId: item?.item_id || '',
          itemQty: item?.item_qty || 0,
          delivery: {
            deliveryId: item.delivery?.delivery_id || '',
            deliveryProvider: item.delivery?.delivery_provider || '',
            deliveryServiceType: item.delivery?.delivery_service_type || '',
            deliveryRecipientName: item.delivery?.delivery_recipient_name || '',
            deliveryDestinationAddress:
              item.delivery?.delivery_destination_address || '',
          },
          itemName: item?.item_name || '',
          itemType: item?.item_type || '',
          outletId: item?.outlet_id || '',
          itemImage: item?.item_image || '',
          itemAmount: item?.item_amount || 0,
          deliveryId: item?.delivery_id || '',
          providerId: item?.provider_id || '',
          outletName: item?.outlet_name || '',
          itemVariant: item?.item_variant || '',
          providerName: item?.provider_name || '',
          providerType: item?.provider_type || '',
          providerAddress: item?.provider_address || '',
          userPlatformFee: item?.user_platform_fee || 0,
          sellingFactorFee: item?.selling_factor_fee || 0,
          transactionDetailId: item?.transaction_detail_id || '',
          transactionDetailStatus: item?.transaction_detail_status || '',
          recipeId: item?.recipe_id || '',
        };
      })
    : [];

  /** TODO:
   * const totalPromoMultipleOutlet = data?.payment_per_outlet?.reduce((acc, curValue) => {
    return acc + (curValue?.total_promo || 0);
  }, 0) || 0;
  const totalPaymentMultipleOutlet = data?.payment_per_outlet?.reduce((acc, curValue) => {
    return acc + (curValue?.total_price || 0);
  }, 0) || 0;
   */

  const totalPromoMediverse = data?.payment?.total_promo;
  const totalPriceNonMultiple = data?.payment?.total_price;

  return {
    consultation: {},
    doctor: {},
    item: items,
    payment: {
      totalPromo: totalPromoMediverse,
      totalPrice: totalPriceNonMultiple,
      paymentId: data?.payment?.payment_id || 0,
      paymentName: data?.payment?.payment_name || '',
      paymentType: data?.payment?.payment_type || '',
      totalAmount: data?.payment?.total_amount || 0,
      platformFee: data?.payment?.platform_fee || 0,
      totalDeliveryAmount:
        data?.payment_per_outlet?.reduce((acc, curValue) => {
          return (acc || 0) + (curValue?.total_delivery_amount || 0);
        }, 0) || 0,
    },
    transaction: {
      createdAt: data?.transaction?.created_at || '',
      expiredAt: data?.transaction?.expired_at || '',
      id: data?.transaction?.id || '',
      status: data?.transaction?.status || '',
    },
    user: {
      id: data?.user?.id || '',
      userName: data?.user?.user_name || '',
      bornDate: data?.user?.born_date || '',
      sex: data?.user?.sex || '',
    },
    delivery: {
      deliveryId: data.delivery?.delivery_id || '',
      deliveryProvider: data.delivery?.delivery_provider || '',
      deliveryServiceType: data.delivery?.delivery_service_type || '',
      deliveryRecipientName: data.delivery?.delivery_recipient_name || '',
      deliveryDestinationAddress:
        data.delivery?.delivery_destination_address || '',
    },
    transactionComplaint: {
      attachmentUrls: Array.isArray(data?.transaction_complaint?.attachment_url)
        ? data?.transaction_complaint?.attachment_url
        : [],
      complaint: data?.transaction_complaint?.complaint || '',
      notes: data?.transaction_complaint?.notes || '',
    },
    transactionDetailIds: items.map((item) => item.transactionDetailId),
    recipient: {
      full_name: data.recipient_metadata?.full_name || '',
      address: data.recipient_metadata?.address || '',
      email: data.recipient_metadata?.email || '',
      no_telp: data.recipient_metadata?.username || '',
    },
    consultationId: data?.consultation_id,
    isRecipe: data?.is_recipe,
  };
};

export const mapListComplainReason = (data: IComplainReasonItem[]) => {
  return isArray(data)
    ? data?.map((item: IComplainReasonItem) => {
        return {
          id: item?.id || '',
          title: item?.title || '',
        };
      })
    : [];
};
