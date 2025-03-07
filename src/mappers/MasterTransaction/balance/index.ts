/* eslint-disable no-tabs */
import {
  isArray,
} from 'lodash';
import {formatDateWithTime} from '@/utils/formatDate';
import {formatRupiah} from '@/src/utils/formatRupiah';
import {capitalizeFirstLetter} from '@/utils/formatText';

export const mapMediverseBalance = (data: any) => {
  return {
    midtrans: {
      balance: data?.midtrans_total || '0',
      income: data?.midtrans_income || '0',
      expedition: data?.midtrans_delivery || '0',
      activeTransaction: data?.midtrans_active_transaction || '0',
    },
    nicePay: {
      balance: data?.nicepay_total || '0',
      income: data?.nicepay_income || '0',
      expedition: data?.nicepay_delivery || '0',
      activeTransaction: data?.nicepay_active_transaction || '0',
    },
    providerBalance: data?.total_provider_amount || '0',
    expeditionCost: data?.total_delivery_amount || '0',
    marketingBalance: data?.total_marketing_amount || '0',
  };
};

export const mapProviderBalance = (data: any) => {
  return {
    balance: data?.total_saldo || 0,
  };
};

export const mapFinanceRecapitulation = (data: any) => {
  return {
    success: data?.transaction_completed || '0',
    successCount: data?.transaction_completed_count || '0',
    canceled: data?.transaction_cancelled || '0',
    canceledCount: data?.transaction_cancelled_count || '0',
    refund: data?.transaction_refund || '0',
    refundCount: data?.transaction_refund_count || '0',
    promoFee: data?.transaction_promo_fee || '0',
    promoFeeCount: data?.transaction_promo_fee_count || '0',
    provider: data?.transaction_provider || '0',
    delivery: data?.transaction_delivery || '0',
    balance: data?.transaction_saldo || '0',
  };
};

export const mapListPaymentTypeTransaction = (data: any) => {
  return data.map((item: any) => {
    return {
      createdAt: formatDateWithTime(item.transaction_date) || '-',
      accountName: capitalizeFirstLetter(item.account_name) || '-',
      transactionType: item.transaction_type || '-',
      transactionAmount: item.amount || 0,
      transactionDescription: capitalizeFirstLetter(item.description) || '-',
    };
  });
};

export const mapListMediverseIncome = (data: any) => {
  const mapDetailIncomes = (detail) => {
    if (isArray(detail) && detail.length > 0) {
      return detail.map((income) => {
        return {
          account_name: income?.account_name || '-',
          total: income?.amount || 0,
          transaction_type: income?.transaction_type,
          description: income?.description,
        };
      });
    }
  };

  const result = isArray(data) ? data.map((item) => {
    return {
      id: item?.id || '-',
      payment_provider_name: item?.payment_provider_name || '-',
      provider_type: item?.provider_type || 0,
      transaction_code: item?.transaction_code || '-',
      created_at: item?.created_at || '-',
      total_income: item?.total,
      detail: mapDetailIncomes(item?.transaction_details),
    };
  }): [];

  return result;
};

export const mapListProviderSale = (data: any) => {
  const mapDetailSales = (detail) => {
    if (isArray(detail) && detail.length > 0) {
      return detail.map((sales) => {
        return {
          account_name: sales?.account_name || '-',
          total: sales?.amount || 0,
          transaction_type: sales?.transaction_type,
          description: sales?.description,
        };
      });
    }
  };

  const result = isArray(data) ? data.map((item) => {
    return {
      id: item?.id || '-',
      payment_provider_name: item?.payment_provider_name || '-',
      provider_type: item?.provider_type || 0,
      transaction_code: item?.transaction_code || '-',
      created_at: item?.created_at || '-',
      total_sales: item?.total,
      detail: mapDetailSales(item?.transaction_details),
    };
  }): [];

  return result;
};

export const mapListAllTransaction = (data: any) => {
  return data.map((item) => {
    return {
      createdAt: formatDateWithTime(item.transaction_date) || '-',
      accountName: capitalizeFirstLetter(item.account_name) || '-',
      transactionType: item.type_transaksi || '-',
      transactionAmount: item.amount || 0,
      transactionDescription: capitalizeFirstLetter(item.description) || '-',
      remainingBalance: formatRupiah(item.transaction_balance) || '-',
    };
  });
};

export const mapListBalanceEarningProvider = (data: any) => {
  const result = isArray(data) ? data.map((item: any) => {
    return {
      id: item?.id || '-',
      providerName: item?.provider_name || '-',
      transactionPeriod: item?.total_transaction_count || 0,
      currentBalance: formatRupiah(item?.total_transaction || 0) || 0,
      totalBalanceWithdrawal: formatRupiah(item?.total_withdraw_amount || 0) || 0,
    };
  }) : [];
  return result;
};

export const mapListExpeditionBalance = (data: any) => {
  return data.map((item) => {
    return {
      expeditionName: item?.delivery_provider_name,
      amount: item?.total_transaction_count,
      income: formatRupiah(item.total_transaction),
    };
  });
};

export const mapListBankProvider = (data: any) => {
  const result = data.map((item) => {
    return {
      id: item?.id,
      bankName: item?.bank_name || '-',
      accountNumber: item?.account_number || '-',
      accountName: item?.name || '-',
      providerType: item?.provider_type || '',
      aliasName: item?.alias_name || '',

    };
  });
  return result;
};

export const mapListSelectBank = (data: any[]) => {
  const listSelectBank = isArray(data) ? data.map((item) => {
    return {
      label: item?.name || '-',
      value: item?.code || '',
    };
  }) : [];

  return listSelectBank;
};
