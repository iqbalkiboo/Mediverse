import Axios from '@/src/client/services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {formatDateEng} from '@/src/utils/formatDate';
import dayjs from 'dayjs';

const pathMediversePayment = paths.mediversePayment;
const pathTransactionV2 = paths.transactionV2;

const startMonth = dayjs().startOf('month');
const endMonth = dayjs().endOf('month');

export const getCardEscrowMidtrans = async () => {
  try {
    const path = `${pathMediversePayment}/check_balance/midtrans`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getCardEscrowNicepay = async () => {
  try {
    const path = `${pathMediversePayment}/check_balance/nicepay`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getListEscrow = async (params) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      limit: params.limit,
      search: params.search,
      transaction_category: params.transactionCategory !== '' ? params.transactionCategory : '',
      start_date: params.startDate ? formatDateEng(params.startDate) : '',
      end_date: params.endDate ? formatDateEng(params.endDate) : '',
      order: params.order,
      sort: params.sort,
    });
    const path = `${pathTransactionV2}/cms/transaction/escrow${queryParams}`;

    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailEscrow = async (category, id) => {
  const path = `${pathTransactionV2}/cms/transaction/escrow/${category}/${id}`;
  try {
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailListEscrow = async (params) => {
  try {
    const queryParams = buildParams({
      page: params.page,
      limit: params.limit,
      search: params.search,
      start_date: params.startDate === '' ? formatDateEng(startMonth) : formatDateEng(params.startDate),
      end_date: params.endDate === '' ? formatDateEng(endMonth) : formatDateEng(params.endDate),
      transaction_category: params.transactionCategory !== '' ? params.transactionCategory : '',
    });
    const path = `${pathTransactionV2}/cms/transaction/escrow/category${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailPaymentEscrow = async (params) => {
  try {
    const queryParams = buildParams({
      payment_provider: params.paymentProvider,
    });
    const path = `${pathTransactionV2}/cms/transaction/escrow/${params.category}/${params.name}${queryParams}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const getDetailPaymentProviderEscrow = async (params) => {
  try {
    const path = `${pathTransactionV2}/cms/transaction/escrow/${params.category}/${params.id}`;
    return await Axios.get(path);
  } catch (error: any) {
    return error.response;
  }
};

export const postPaymentEscrow = async (params) => {
  try {
    const queryParams = buildParams({
      payment_provider: params.paymentProvider,
    });
    const path = `${pathTransactionV2}/cms/transaction/escrow/${params.category}/${params.name}${queryParams}`;
    return await Axios.post(path, {});
  } catch (error: any) {
    return error.response;
  }
};

export const patchPaymentRefundEscrow = async (params) => {
  try {
    const path = `${pathTransactionV2}/cms/transaction/refund/${params.refundNo}`;
    return await Axios.patch(path, {
      status: 'paid',
    });
  } catch (error: any) {
    return error.response;
  }
};
