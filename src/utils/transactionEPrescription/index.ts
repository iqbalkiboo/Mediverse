import {TRANSACTION_STATUS, TRANSACTION_STATUS_RESPONSE} from '@/src/constants';
import {formatCustomerPrice} from '@/src/utils/formatNumber';
import {formatRupiah} from '@/src/utils/formatRupiah';

export const statusEPrescriptionText = (text: string, type: string) => {
  switch (text) {
    case TRANSACTION_STATUS_RESPONSE.SETTLEMENT_PRESCRIPTION:
      return 'Siapkan Resep';
    case TRANSACTION_STATUS_RESPONSE.PENDING:
      return TRANSACTION_STATUS.WAITING_FOR_PAYMENT;
    case TRANSACTION_STATUS_RESPONSE.IN_PROGRESS:
      switch (type) {
        case 'transaction':
          return TRANSACTION_STATUS.READY_PICKING_UP;
        case 'prescription':
          return TRANSACTION_STATUS.IN_PROGRESS_PRESCRIPTION;
        default:
          return text;
      }
    case TRANSACTION_STATUS_RESPONSE.IN_DELIVERY:
      return TRANSACTION_STATUS.IN_DELIVERY;
    case TRANSACTION_STATUS_RESPONSE.READY_PICKING_UP:
      return TRANSACTION_STATUS.READY_PICKING_UP;
    case TRANSACTION_STATUS_RESPONSE.PICKING_UP:
      return TRANSACTION_STATUS.READY_PICKING_UP;
    case TRANSACTION_STATUS_RESPONSE.ORDER_ACCEPTED:
      return TRANSACTION_STATUS.ORDER_ACCEPTED;
    case TRANSACTION_STATUS_RESPONSE.COMPLETED:
      return TRANSACTION_STATUS.COMPLETED;
    case TRANSACTION_STATUS_RESPONSE.FAILED:
    case TRANSACTION_STATUS_RESPONSE.CANCELLED:
    case TRANSACTION_STATUS_RESPONSE.EXPIRE:
      return TRANSACTION_STATUS.FAILED;
    case TRANSACTION_STATUS_RESPONSE.CONFIRMED:
      return TRANSACTION_STATUS.CONFIRMED;
    case TRANSACTION_STATUS_RESPONSE.ADMIN_CONFIRMATION:
      return TRANSACTION_STATUS.PRESCRIPTION_CONFIRMATION;
    case TRANSACTION_STATUS_RESPONSE.NEED_CONFIRMATION:
      return TRANSACTION_STATUS.NEED_CONFIRMATION;
    case TRANSACTION_STATUS_RESPONSE.IN_PROGRESS_PRESCRIPTION:
      return TRANSACTION_STATUS.WAITING_FOR_CONFIRMATION;
    case TRANSACTION_STATUS_RESPONSE.REJECTED:
      return TRANSACTION_STATUS.EPRES_REJECTED;
    case TRANSACTION_STATUS_RESPONSE.SYSTEM_CONFIRMATION:
      return TRANSACTION_STATUS.NEED_CONFIRMATION;
    case TRANSACTION_STATUS_RESPONSE.IN_PROGRESS_PRESCRIPTION:
      return TRANSACTION_STATUS.READY_PICKING_UP;
    case TRANSACTION_STATUS_RESPONSE.NEW:
      return TRANSACTION_STATUS.NEW;
    default:
      return text;
  }
};

export const transformStatusPrescription = (status: string) => {
  switch (status) {
    case TRANSACTION_STATUS_RESPONSE.FAILED:
      return TRANSACTION_STATUS_RESPONSE.COMPLETED;
    case TRANSACTION_STATUS_RESPONSE.NEW:
      return TRANSACTION_STATUS_RESPONSE.IN_PROGRESS;
    case TRANSACTION_STATUS_RESPONSE.ADMIN_CONFIRMATION:
      return TRANSACTION_STATUS_RESPONSE.NEED_CONFIRMATION;
    case undefined:
      return TRANSACTION_STATUS_RESPONSE.NEW;
    default:
      return status;
  }
};

export const getTotalPriceBySellingFactorItems = (items: any[]) => {
  const itemsCount = items;
  let totalPrice = 0;

  for (let index = 0; index < itemsCount.length; index++) {
    const element = itemsCount[index];
    if ('selling_factor_fee' in element) {
      totalPrice += element?.selling_factor_fee * element.qty_bought;
    }
  }

  return formatRupiah(totalPrice);
};

const getPriceBySellingFactor = (feeComponent: any[] = [], itemPrice: number) => {
  const sellingFactor = feeComponent.find((fc) => fc.title === 'selling_factor_fee') || 0;
  const ppn = feeComponent.find((fc) => fc.title === 'ppn') || 0;
  const countPrice = formatCustomerPrice(itemPrice, sellingFactor?.value, ppn?.value) || 0;
  return countPrice;
};

const getSellingFactor = (feeComponent) => feeComponent.some((fc) => fc.title === 'selling_factor_fee');

export const transformCustomerPricePrescription = (drugs: any[] = []) => {
  const newDrugs: any[] = [] as any;
  const arrDrugs = drugs;
  if (drugs.length < 1) {
    return drugs;
  }

  for (let index = 0; index < arrDrugs.length; index++) {
    let element = arrDrugs[index];
    const isSellingFactor = getSellingFactor(element.feeComponents);
    if (isSellingFactor) {
      element = {
        ...element,
        customerPrice: getPriceBySellingFactor(element.feeComponents, element.itemPrice) || null,
      };
    }
    newDrugs.push(element);
  }
  return newDrugs;
};
