import {
  PROMO_CATEGORY,
  PROMO_CATEGORY_RESPONSE,
  PROMO_TARGET,
  PROMO_TARGET_RESPONSE,
} from '@/src/constants';

export const promoTargetText = (text: string) => {
  switch (text) {
    case PROMO_TARGET_RESPONSE.PUBLIC:
      return PROMO_TARGET.PUBLIC;
    case PROMO_TARGET_RESPONSE.SPECIFIC:
      return PROMO_TARGET.SPECIFIC;
    default:
      return text;
  }
};

export const promoCategoryText = (text: string) => {
  switch (text) {
    case PROMO_CATEGORY_RESPONSE.DISCOUNT_PRODUCT:
      return PROMO_CATEGORY.DISCOUNT_PRODUCT;
    case PROMO_CATEGORY_RESPONSE.PACKET_DISCOUNT:
      return PROMO_CATEGORY.PACKET_DISCOUNT;
    case PROMO_CATEGORY_RESPONSE.FREE_DELIVERY:
      return PROMO_CATEGORY.FREE_DELIVERY;
    case PROMO_CATEGORY_RESPONSE.FLASH_SALE:
      return PROMO_CATEGORY.FLASH_SALE;
    case PROMO_CATEGORY_RESPONSE.VOUCHER_CASHBACK:
      return PROMO_CATEGORY.VOUCHER_CASHBACK;
    case PROMO_CATEGORY_RESPONSE.BUNDLING:
      return PROMO_CATEGORY.BUNDLING;
    case PROMO_CATEGORY_RESPONSE.REFERRAL_CODE:
      return PROMO_CATEGORY.REFERRAL_CODE;
    default:
      return text;
  }
};
