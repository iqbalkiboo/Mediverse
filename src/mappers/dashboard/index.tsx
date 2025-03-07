/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import dayjs from 'dayjs';

import { capitalizeFirstLetter } from '@/src/utils/formatText';
import { formatDateWithTime } from '@/src/utils/formatDate';
import { getCountDate } from '@/src/utils/dates';
import { getPercentage } from '@/src/utils/getPercentage';

import { isArray, isEmpty } from 'lodash';

import type {
  CurrentMonthActivityProviderType,
  CurrentMonthIncomeProviderType,
  EstimationExpenseProviderType,
  PurchaseCurrentMonthType,
  StatisticCurrentMonthResultType,
  StatisticCurrentMonthType,
  TransactionFunnelType,
  TransactionSaleType,
} from '@/src/types/home';

const checkOwnProperty = (object: any, property: string) => {
  const isAvailable = object?.hasOwnProperty(property);
  return isAvailable ? object[property] : 0;
};

export const mapTransactionSale = (
  data: TransactionSaleType
): TransactionSaleType => {
  const defaultValue = {
    product: 0,
    service: 0,
    transaction_complaint: 0,
    transaction_complete: 0,
    transaction_refund: {
      count: 0,
      total_amount: 0,
    },
    transaction_type: {
      medevo: 0,
      percentage_medevo: 0,
      medpharm: 0,
      percentage_medpharm: 0,
      medpoint: 0,
      percentage_medpoint: 0,
      grand_total: 0,
    },
  };

  if (isEmpty(data)) return defaultValue;

  const medevo = checkOwnProperty(data.transaction_type, 'medevo');
  const medpharm = checkOwnProperty(data.transaction_type, 'medpharm');
  const medpoint = checkOwnProperty(data.transaction_type, 'medpoint');
  const grandTotal = medevo + medpharm + medpoint;

  return {
    product: checkOwnProperty(data, 'product'),
    service: checkOwnProperty(data, 'service'),
    transaction_complaint: checkOwnProperty(data, 'transaction_complaint'),
    transaction_complete: checkOwnProperty(data, 'transaction_complete'),
    transaction_refund: {
      count: checkOwnProperty(data.transaction_refund, 'count'),
      total_amount: checkOwnProperty(data.transaction_refund, 'total_amount'),
    },
    transaction_type: {
      medevo: medevo,
      percentage_medevo: getPercentage(medevo, grandTotal).toFixed(2),
      medpharm: medpharm,
      percentage_medpharm: getPercentage(medpharm, grandTotal).toFixed(2),
      medpoint: medpoint,
      percentage_medpoint: getPercentage(medpoint, grandTotal).toFixed(2),
      grand_total: grandTotal,
    },
  };
};

export const mapTodayActivityPharmacy = (data: any) => {
  if (isEmpty(data)) {
    return {
      newTransactionEprees: 0,
      newTransaction: 0,
      readyPickUp: 0,
      complaintTransactionAll: 0,
      completeTransaction: 0,
      complaintTransactionAccept: 0,
    };
  }

  return {
    newTransactionEprees: checkOwnProperty(data, 'new_transaction_epress'),
    newTransaction: checkOwnProperty(data, 'new_transaction'),
    readyPickUp: checkOwnProperty(data, 'ready_picking_up_transaction'),
    complaintTransactionAll: checkOwnProperty(
      data,
      'complaint_transaction_all'
    ),
    complaintTransactionAccept: checkOwnProperty(
      data,
      'complaint_transaction_accept'
    ),
    completeTransaction: checkOwnProperty(data, 'completed_transaction'),
  };
};

export const mapTransactionFunnel = (
  data: TransactionFunnelType
): TransactionFunnelType => {
  const defaultValue = {
    transaction_created: 0,
    transaction_ongoing: 0,
    transaction_complete: 0,
  };

  if (isEmpty(data)) return defaultValue;

  const created = checkOwnProperty(data, 'transaction_created');
  const ongoing = checkOwnProperty(data, 'transaction_ongoing');
  const complete = checkOwnProperty(data, 'transaction_complete');

  return {
    transaction_created: created,
    transaction_ongoing: ongoing,
    transaction_complete: complete,
  };
};

export const mapPurchaseCurrentMonth = (
  data: PurchaseCurrentMonthType
): PurchaseCurrentMonthType => {
  const defaultValue = {
    gmv: {
      current_month: 0,
      previous_month: 0,
      comparison_percentage: 0,
    },
    nmv: {
      current_month: 0,
      previous_month: 0,
      comparison_percentage: 0,
    },
  };

  if (isEmpty(data)) return defaultValue;

  const gmvCurrent = checkOwnProperty(data.gmv, 'current_month');
  const gmvPrevious = checkOwnProperty(data.gmv, 'previous_month');
  const gmvPercentage = checkOwnProperty(data.gmv, 'comparison_percentage');

  const nmvCurrent = checkOwnProperty(data.nmv, 'current_month');
  const nmvPrevious = checkOwnProperty(data.nmv, 'previous_month');
  const nmvPercentage = checkOwnProperty(data.nmv, 'comparison_percentage');

  return {
    gmv: {
      current_month: gmvCurrent,
      previous_month: gmvPrevious,
      comparison_percentage: gmvPercentage,
    },
    nmv: {
      current_month: nmvCurrent,
      previous_month: nmvPrevious,
      comparison_percentage: nmvPercentage,
    },
  };
};

export const mapStatisticCurrentMonth = (
  data: StatisticCurrentMonthType[],
  year: number
): StatisticCurrentMonthResultType[] => {
  const defaultValue = [
    { x: `Jan ${year}`, y: 0 },
    { x: `Feb ${year}`, y: 0 },
    { x: `Mar ${year}`, y: 0 },
    { x: `Apr ${year}`, y: 0 },
    { x: `Mei ${year}`, y: 0 },
    { x: `Jun ${year}`, y: 0 },
    { x: `Jul ${year}`, y: 0 },
    { x: `Agu ${year}`, y: 0 },
    { x: `Sep ${year}`, y: 0 },
    { x: `Okt ${year}`, y: 0 },
    { x: `Nov ${year}`, y: 0 },
    { x: `Des ${year}`, y: 0 },
  ];

  if (isEmpty(data)) return defaultValue;

  const getMonthData = (month) => {
    const findData = data.find(
      (statistic: StatisticCurrentMonthType) => statistic.month === month
    ) || { amount: 0 };
    return isEmpty(findData) ? 0 : findData.amount;
  };

  return defaultValue.map((item, idx) => ({
    x: item.x,
    y: getMonthData(idx + 1) || 0,
  }));
};

export const mapStatisticPotentialSale = (
  data: any,
  month: number,
  year: number
) => {
  type value = {
    x: string;
    y: number;
  };
  const days = getCountDate(`${year}-${month}-01`);
  const defaultValue: value[] = [];
  for (let i = 1; i <= days; i++) {
    defaultValue.push({ x: `${i}/${month}`, y: 0 });
  }
  if (isEmpty(data)) return defaultValue;

  const getDateData = (day) => {
    const findData = data.find((statistic: any) => statistic.day === day);
    return isEmpty(findData) ? 0 : findData.amount;
  };

  return defaultValue.map((item, index) => ({
    x: item.x,
    y: getDateData(index + 1) || 0,
  }));
};

export const mapStatisticProductSold = (
  data: any,
  month: any,
  year: number
) => {
  type value = {
    x: string;
    y: number;
  };
  const days = getCountDate(`${year}-${month}-01`);
  const defaultValue: value[] = [];
  for (let i = 1; i <= days; i++) {
    defaultValue.push({ x: `${i}/${month}`, y: 0 });
  }

  if (isEmpty(data)) return defaultValue;

  const getDateData = (day) => {
    const findData = data.find((statistic: any) => statistic.day === day);
    return isEmpty(findData) ? 0 : findData.qty;
  };

  return defaultValue.map((item, index) => ({
    x: item.x,
    y: getDateData(index + 1) || 0,
  }));
};

export const mapCurrentMonthIncomeProvider = (
  data: CurrentMonthIncomeProviderType
): CurrentMonthIncomeProviderType => {
  const activity = {
    comparison_percentage: 0,
    current_month: 0,
    last_month: 0,
  };

  const defaultValue = {
    discount: activity,
    income: activity,
    service_fee: activity,
  };

  if (isEmpty(data)) return defaultValue;

  return {
    discount: {
      comparison_percentage: checkOwnProperty(
        data.discount,
        'comparison_percentage'
      ),
      current_month: checkOwnProperty(data.discount, 'current_month'),
      last_month: checkOwnProperty(data.discount, 'last_month'),
    },
    income: {
      comparison_percentage: checkOwnProperty(
        data.income,
        'comparison_percentage'
      ),
      current_month: checkOwnProperty(data.income, 'current_month'),
      last_month: checkOwnProperty(data.income, 'last_month'),
    },
    service_fee: {
      comparison_percentage: checkOwnProperty(
        data['service_fee'],
        'comparison_percentage'
      ),
      current_month: checkOwnProperty(data['service_fee'], 'current_month'),
      last_month: checkOwnProperty(data['service_fee'], 'last_month'),
    },
  };
};

export const mapCurrentMonthActivityProvider = (
  data: CurrentMonthActivityProviderType
): CurrentMonthActivityProviderType => {
  const activity = {
    comparison_percentage: 0,
    current_month: 0,
    previous_month: 0,
  };

  const defaultValue = {
    count: activity,
    potential: activity,
  };

  if (isEmpty(data)) return defaultValue;

  return {
    count: {
      comparison_percentage: checkOwnProperty(
        data.count,
        'comparison_percentage'
      ),
      current_month: checkOwnProperty(data.count, 'current_month'),
      previous_month: checkOwnProperty(data.count, 'previous_month'),
    },
    potential: {
      comparison_percentage: checkOwnProperty(
        data.potential,
        'comparison_percentage'
      ),
      current_month: checkOwnProperty(data.potential, 'current_month'),
      previous_month: checkOwnProperty(data.potential, 'previous_month'),
    },
  };
};

export const mapTodayActivityHealthFacility = (data: any) => {
  return {
    reservationConsultation: data?.consultation || 0,
    reservationMedicalAction: data?.treatment || 0,
    reservationLabTest: data?.lab || 0,
    reservationVaccination: data?.vaccine || 0,
  };
};

export const mapEstimationExpenseProvider = (
  data: EstimationExpenseProviderType
): EstimationExpenseProviderType => {
  const spendingValue = {
    spending: 0,
    spending_estimation: 0,
  };
  const defaultValue: EstimationExpenseProviderType = {
    bundling: spendingValue,
    cashback: spendingValue,
    discount: spendingValue,
    free_delivery: spendingValue,
    product: spendingValue,
    referral: spendingValue,
    total_spending: 0,
    total_spending_estimation: 0,
  };

  if (isEmpty(data)) return defaultValue;

  return {
    bundling: {
      spending: checkOwnProperty(data.bundling, 'spending'),
      spending_estimation: checkOwnProperty(
        data.bundling,
        'spending_estimation'
      ),
    },
    cashback: {
      spending: checkOwnProperty(data.cashback, 'spending'),
      spending_estimation: checkOwnProperty(
        data.cashback,
        'spending_estimation'
      ),
    },
    discount: {
      spending: checkOwnProperty(data.discount, 'spending'),
      spending_estimation: checkOwnProperty(
        data.discount,
        'spending_estimation'
      ),
    },
    free_delivery: {
      spending: checkOwnProperty(data.free_delivery, 'spending'),
      spending_estimation: checkOwnProperty(
        data.free_delivery,
        'spending_estimation'
      ),
    },
    product: {
      spending: checkOwnProperty(data.product, 'spending'),
      spending_estimation: checkOwnProperty(
        data.product,
        'spending_estimation'
      ),
    },
    referral: {
      spending: checkOwnProperty(data.referral, 'spending'),
      spending_estimation: checkOwnProperty(
        data.referral,
        'spending_estimation'
      ),
    },
    total_spending: checkOwnProperty(data, 'total_spending'),
    total_spending_estimation: checkOwnProperty(
      data,
      'total_spending_estimation'
    ),
  };
};

export const mapVoucher = (data: any) => {
  if (isEmpty(data)) {
    return {
      count_total: 0,
      amount_total: 0,
      count_used: 0,
      amount_used: 0,
    };
  }
  return {
    count_total: data.count_total,
    amount_total: data.amount_total,
    count_used: data.count_used,
    amount_used: data.amount_used,
  };
};

export const mapChartActivityPotentialOrder = (data: any, year: any) => {
  const defaultValue = [
    { x: `Jan ${year}`, y: 0 },
    { x: `Feb ${year}`, y: 0 },
    { x: `Mar ${year}`, y: 0 },
    { x: `Apr ${year}`, y: 0 },
    { x: `Mei ${year}`, y: 0 },
    { x: `Jun ${year}`, y: 0 },
    { x: `Jul ${year}`, y: 0 },
    { x: `Agu ${year}`, y: 0 },
    { x: `Sep ${year}`, y: 0 },
    { x: `Okt ${year}`, y: 0 },
    { x: `Nov ${year}`, y: 0 },
    { x: `Des ${year}`, y: 0 },
  ];

  if (isEmpty(data)) return defaultValue;

  const getMonthData = (month) => {
    const findData = data?.find(
      (chartActivity: any) => chartActivity?.month === month
    );
    return isEmpty(findData) ? 0 : findData?.amount;
  };

  return defaultValue.map((item, index) => ({
    x: item.x,
    y: getMonthData(index + 1) || 0,
  }));
};

export const mapChartActivityTreatmentCompleted = (data: any, year: any) => {
  const defaultValue = [
    { x: `Jan ${year}`, y: 0 },
    { x: `Feb ${year}`, y: 0 },
    { x: `Mar ${year}`, y: 0 },
    { x: `Apr ${year}`, y: 0 },
    { x: `Mei ${year}`, y: 0 },
    { x: `Jun ${year}`, y: 0 },
    { x: `Jul ${year}`, y: 0 },
    { x: `Agu ${year}`, y: 0 },
    { x: `Sep ${year}`, y: 0 },
    { x: `Okt ${year}`, y: 0 },
    { x: `Nov ${year}`, y: 0 },
    { x: `Des ${year}`, y: 0 },
  ];

  if (isEmpty(data)) return defaultValue;

  const getMonthData = (month) => {
    const findData = data?.find(
      (chartActivity: any) => chartActivity?.month === month
    );
    return isEmpty(findData) ? 0 : findData?.qty;
  };

  return defaultValue.map((item, index) => ({
    x: item.x,
    y: getMonthData(index + 1) || 0,
  }));
};

const mapIncomeHistories = (data) => {
  return isArray(data.incomeHistory)
    ? data.incomeHistory.flatMap((items) => {
        return items.transaction_details.map((item) => {
          return {
            ...item,
            payment_provider_name: items.payment_provider_name,
            provider_type: items.provider_type,
            total: items.total,
            transaction_code: items.transaction_code,
            remaining_balance:
              item.payment_provider_name === 'nicepay'
                ? data.income.saldoNicePay
                : data.income.saldoMidtrans,
          };
        });
      })
    : [];
};

export const mapIncomeHistory = (data) => {
  return mapIncomeHistories(data).map((item) => {
    return {
      transactionDate:
        formatDateWithTime(item?.transaction_date) + ' WIB' || '-',
      transactionNumber: checkOwnProperty(item, 'transaction_code'),
      accountName: capitalizeFirstLetter(
        checkOwnProperty(item, 'payment_provider_name')
      ),
      transactionAmount: checkOwnProperty(item, 'amount'),
      note: capitalizeFirstLetter(checkOwnProperty(item, 'description')),
      remainingBalance: checkOwnProperty(item, 'transaction_balance'),
    };
  });
};

export const mapIncomeHistoryProvider = (data) => {
  if (isEmpty(data)) return [];

  return data
    .map((item) => {
      return {
        transactionDate:
          formatDateWithTime(item?.transaction_date) + ' WIB' || '-',
        transactionNumber: checkOwnProperty(item, 'type_transaksi'),
        accountName: checkOwnProperty(item, 'account_name'),
        transactionAmount: checkOwnProperty(item, 'amount'),
        note: capitalizeFirstLetter(checkOwnProperty(item, 'description')),
        remainingBalance: checkOwnProperty(item, 'transaction_balance'),
      };
    })
    .slice(0, 10);
};

export const mapIncome = (data) => {
  return {
    saldoMidtrans: data?.midtrans_total || 0,
    saldoNicePay: data?.nicepay_total || 0,
  };
};

export const mapIncomeProvider = (data, saldo) => {
  return {
    currentIncome: saldo?.total_saldo || 0,
    totalIncome: {
      amount: data?.income?.current_month || 0,
      percentage: data?.income?.comparison_percentage || 0,
    },
    serviceFee: {
      amount: data?.['service-fee']?.current_month || 0,
      percentage: data?.['service-fee']?.comparison_percentage || 0,
    },
    discount: {
      amount: data?.discount?.current_month || 0,
      percentage: data?.discount?.comparison_percentage || 0,
    },
  };
};

export const mapDataPurchasePerMonth = (data) => {
  const defaultValue = [
    { id: 1, title: 'Value per Transaction', value: 0 },
    { id: 2, title: 'Average Revenue per User', value: 0 },
  ];

  if (data.length === 0) return defaultValue;

  let valueAmount = 0;

  data?.forEach((item) => {
    valueAmount += item?.item?.amount || 0;
  });

  const avgValueMonth = valueAmount / data.length;

  return [
    { id: 1, title: 'Value per Transaction', value: valueAmount || 0 },
    { id: 2, title: 'Average Revenue per User', value: avgValueMonth || 0 },
  ];
};

export const mapDataUserActivity = (data, month) => {
  const defaultValue = [
    { id: 1, title: 'Registered User', value: 0 },
    { id: 2, title: 'Monthly Active User', value: 0 },
    { id: 3, title: 'Daily Active User', value: 0 },
  ];

  const day = dayjs().day();

  const currentDay = () => {
    if (day === 0) {
      return 7;
    }
    return day;
  };

  if (data.length === 0) return defaultValue;
  const monthlyData = data.filter((item) => item.month === month);
  const dailyData = data.filter((item) => item.day === currentDay());

  let registeredUser = data.length;
  let monthlyActiveUser = monthlyData.length;
  let dailyActiveUser = dailyData.length;

  return [
    { id: 1, title: 'Registered User', value: registeredUser || 0 },
    { id: 2, title: 'Monthly Active User', value: monthlyActiveUser || 0 },
    { id: 3, title: 'Daily Active User', value: dailyActiveUser || 0 },
  ];
};

export const mapDataUserActive = (data, month?: number) => {
  const defaultValue = [
    { id: 1, title: 'Monthly Active User', value: 0 },
    { id: 2, title: 'Daily Active User', value: 0 },
    { id: 3, title: 'Avg. Screen Time/sesion', value: `${0} Minutes` },
    { id: 4, title: 'Avg. Apps Launched/day', value: `${0} Times` },
    { id: 5, title: 'Avg. Apps Launched/month', value: `${0} Times` },
  ];

  if (data.length === 0) return defaultValue;

  const day = dayjs().day();

  const currentDay = () => {
    if (day === 0) {
      return 7;
    }
    return day;
  };

  const monthlyActiveUser = data.filter((item) => item.month === month);
  const dailyActiveUser = data.filter((item) => item.day === currentDay());

  let avgScreenTime = 0;
  data.forEach((item) => {
    avgScreenTime += item.item.avarage_time || 0;
  });

  const monthlyAvgLaunched = data.filter(
    (item) => item.sub_type === 'launched_app'
  );

  return [
    {
      id: 1,
      title: 'Monthly Active User',
      value: monthlyActiveUser.length || 0,
    },
    { id: 2, title: 'Daily Active User', value: dailyActiveUser.length || 0 },
    {
      id: 3,
      title: 'Avg. Screen Time/sesion',
      value: `${avgScreenTime / 60 || 0} Minutes`,
    },
    {
      id: 4,
      title: 'Avg. Apps Launched/day',
      value: `${(monthlyAvgLaunched.length / 30).toFixed(2) || 0} Times`,
    },
    {
      id: 5,
      title: 'Avg. Apps Launched/month',
      value: `${monthlyAvgLaunched.length.toFixed(2) || 0} Times`,
    },
  ];
};

export const mapDataUserActiveConversion = (
  dataTransaction,
  dataUser,
  month
) => {
  const defaultValue = [
    { id: 1, title: 'Monthly Active User', value: 0 },
    { id: 2, title: 'Purchased user', value: 0 },
    { id: 3, title: 'Conversion from active user', value: `${0}%` },
    { id: 4, title: 'Transaction/customer/month', value: `${0}` },
    { id: 5, title: 'Successful Transaction', value: `${0}` },
  ];

  if (dataTransaction.length === 0) return defaultValue;

  const transactionPerMonth = dataTransaction.filter(
    (item) => item.month === month
  );
  const successTransaction = dataTransaction.filter(
    (item) => item.item.status === 'completed'
  );
  const monthlyActiveUser = isArray(dataUser)
    ? dataUser?.filter((item) => item.month === month)
    : [];
  const grandTotal = dataUser?.length + dataTransaction.length;
  const conversionFromUser = getPercentage(dataUser?.length, grandTotal);

  return [
    {
      id: 1,
      title: 'Monthly Active User',
      value: monthlyActiveUser.length || 0,
    },
    { id: 2, title: 'Purchased user', value: dataTransaction.length || 0 },
    {
      id: 3,
      title: 'Conversion from active user',
      value: `${conversionFromUser.toFixed(2) || 0}%`,
    },
    {
      id: 4,
      title: 'Transaction/customer/month',
      value: `${transactionPerMonth.length || 0}`,
    },
    {
      id: 5,
      title: 'Successful Transaction',
      value: `${successTransaction.length || 0}`,
    },
  ];
};

export const mapDeviceUsed = (data) => {
  const defaultValue = {
    android: 0,
    iphone: 0,
  };
  if (data.length === 0) return defaultValue;

  const androidAmount = data?.filter(
    (item) => item.item.device.toLowerCase() === 'android'
  );
  const iphoneAmount = data?.filter(
    (item) =>
      item.item.device?.toLowerCase() === 'iphone' ||
      item.item.device?.toLowerCase() === 'ios'
  );

  const grandTotal = androidAmount.length + iphoneAmount.length;

  const percentageAndroid = getPercentage(androidAmount.length, grandTotal);
  const percentageIphone = getPercentage(iphoneAmount.length, grandTotal);

  return {
    android: percentageAndroid.toFixed(2),
    iphone: percentageIphone.toFixed(2),
  };
};

export const mapDataMostVisitedFeature = (data) => {
  const defaultValue = [
    { x: 'Medwell', y: data?.item?.medwell || 0 },
    { x: 'Medpoint', y: data?.item?.medpoint || 0 },
    { x: 'Medevo', y: data?.item?.medevo || 0 },
    { x: 'Medpharm', y: data?.item?.medpharm || 0 },
    { x: 'Mednews', y: data?.item?.mednews || 0 },
  ];
  if (data.length === 0) return defaultValue;

  let medwell = 0;
  let medpoint = 0;
  let medevo = 0;
  let medpharm = 0;
  let mednews = 0;

  data.forEach((item) => {
    medevo += item.item.medevo || item.item.MEDEVO || 0;
    medpharm += item.item.medpharm || item.item.MEDPHARM || 0;
    medpoint += item.item.medpoint || item.item.MEDPOINT || 0;
    medwell += item.item.medwell || item.item.MEDWELL || 0;
    mednews += item.item.mednews || item.item.MEDNEWS || 0;
  });

  const dataMap = [
    { x: 'Medwell', y: medwell },
    { x: 'Medpoint', y: medpoint },
    { x: 'Medevo', y: medevo },
    { x: 'Medpharm', y: medpharm },
    { x: 'Mednews', y: mednews },
  ];

  return dataMap.sort((a, b) => a.y - b.y);
};

export const mapDataMostReadArticle = (data) => {
  const defaultValue = [
    { x: 'Kesehatan', y: 0 },
    { x: 'Gaya Hidup', y: 0 },
    { x: 'Kehamilan', y: 0 },
    { x: 'Olahraga', y: 0 },
    { x: 'Obat', y: 0 },
  ];

  if (data.length === 0) return defaultValue;

  let kesehatan = 0;
  let gaya_hidup = 0;
  let kehamilan = 0;
  let olahraga = 0;
  let obat = 0;

  data.forEach((item) => {
    kesehatan += item?.item?.kesehatan || 0;
    gaya_hidup += item?.item?.gaya_hidup || 0;
    kehamilan += item?.item?.kehamilan || 0;
    olahraga += item?.item?.olahraga || 0;
    obat += item?.item?.obat || 0;
  });

  const dataMap = [
    { x: 'Kesehatan', y: kesehatan },
    { x: 'Gaya Hidup', y: gaya_hidup },
    { x: 'Kehamilan', y: kehamilan },
    { x: 'Olahraga', y: olahraga },
    { x: 'Obat', y: obat },
  ];

  return dataMap.sort((a, b) => a.y - b.y);
};

export const mapDataMostUsedFeature = (data) => {
  const defaultValue = [
    { x: 'Mednews', y: 0 },
    { x: 'Medpharm', y: 0 },
    { x: 'Medevo', y: 0 },
    { x: 'Medpoint', y: 0 },
    { x: 'Medwell', y: 0 },
  ];

  if (data.length === 0) return defaultValue;

  let medwell = 0;
  let medpoint = 0;
  let medevo = 0;
  let medpharm = 0;
  let mednews = 0;

  data.forEach((item) => {
    medevo += item.item.medevo || item.item.MEDEVO || 0;
    medpharm += item.item.medpharm || item.item.MEDPHARM || 0;
    medpoint += item.item.medpoint || item.item.MEDPOINT || 0;
    medwell += item.item.medwell || item.item.MEDWELL || 0;
    mednews += item.item.mednews || item.item.MEDNEWS || 0;
  });

  const result = [
    { x: 'Mednews', y: mednews },
    { x: 'Medpharm', y: medpharm },
    { x: 'Medevo', y: medevo },
    { x: 'Medpoint', y: medpoint },
    { x: 'Medwell', y: medwell },
  ];

  return result.sort((a, b) => a.y - b.y);
};

export const mapChartPerformanceYear = (data) => {
  const defaultValue = [
    { x: 'Januari', y: 0 },
    { x: 'Februari', y: 0 },
    { x: 'Maret', y: 0 },
    { x: 'April', y: 0 },
    { x: 'Mei', y: 0 },
    { x: 'Juni', y: 0 },
    { x: 'Juli', y: 0 },
    { x: 'Agustus', y: 0 },
    { x: 'September', y: 0 },
    { x: 'Oktober', y: 0 },
    { x: 'November', y: 0 },
    { x: 'Desember', y: 0 },
  ];

  if (data.length === 0) return defaultValue;

  const getMonthData = (month) => {
    const findData = data.filter((chart) => chart?.month === month);
    return findData.length;
  };

  return defaultValue.map((item, index) => ({
    x: item.x,
    y: getMonthData(index + 1) || 0,
  }));
};

export const mapDataChartActiveUser = (data) => {
  const defaultValue = [
    { x: 'Januari', y: 0 },
    { x: 'Februari', y: 0 },
    { x: 'Maret', y: 0 },
    { x: 'April', y: 0 },
    { x: 'Mei', y: 0 },
    { x: 'Juni', y: 0 },
    { x: 'Juli', y: 0 },
    { x: 'Agustus', y: 0 },
    { x: 'September', y: 0 },
    { x: 'Oktober', y: 0 },
    { x: 'November', y: 0 },
    { x: 'Desember', y: 0 },
  ];

  if (data.length === 0) return defaultValue;

  const getMonthData = (month) => {
    const findData = data.filter((chart) => chart?.month === month);
    return findData.length;
  };

  return defaultValue.map((item, index) => ({
    x: item.x,
    y: getMonthData(index + 1) || 0,
  }));
};

export const mapDataChartCumulativeActiveUser = (data) => {
  const defaultValue = [
    { x: 'Januari', y: 0 },
    { x: 'Februari', y: 0 },
    { x: 'Maret', y: 0 },
    { x: 'April', y: 0 },
    { x: 'Mei', y: 0 },
    { x: 'Juni', y: 0 },
    { x: 'Juli', y: 0 },
    { x: 'Agustus', y: 0 },
    { x: 'September', y: 0 },
    { x: 'Oktober', y: 0 },
    { x: 'November', y: 0 },
    { x: 'Desember', y: 0 },
  ];

  if (data.length === 0) return defaultValue;

  const getMonthData = (month) => {
    const findData = data.filter((chart) => chart?.month === month);
    return findData.length;
  };

  let totalAmount = 0;
  return defaultValue.map((item, index) => {
    totalAmount += getMonthData(index + 1);
    return {
      x: item.x,
      y: totalAmount,
    };
  });
};

export const mapChartCumulativePerformanceYear = (data) => {
  const defaultValue = [
    { x: 'Januari', y: 0 },
    { x: 'Februari', y: 0 },
    { x: 'Maret', y: 0 },
    { x: 'April', y: 0 },
    { x: 'Mei', y: 0 },
    { x: 'Juni', y: 0 },
    { x: 'Juli', y: 0 },
    { x: 'Agustus', y: 0 },
    { x: 'September', y: 0 },
    { x: 'Oktober', y: 0 },
    { x: 'November', y: 0 },
    { x: 'Desember', y: 0 },
  ];

  if (data.length === 0) return defaultValue;

  const getMonthData = (month) => {
    const findData = data.filter((chart) => chart?.month === month);
    return findData.length;
  };

  let totalAmount = 0;
  return defaultValue.map((item, index) => {
    totalAmount += getMonthData(index + 1);
    return {
      x: item.x,
      y: totalAmount,
    };
  });
};

export const mapChartPurchaseUser = (data) => {
  const defaultValue = [
    { x: 'Januari', y: 0 },
    { x: 'Februari', y: 0 },
    { x: 'Maret', y: 0 },
    { x: 'April', y: 0 },
    { x: 'Mei', y: 0 },
    { x: 'Juni', y: 0 },
    { x: 'Juli', y: 0 },
    { x: 'Agustus', y: 0 },
    { x: 'September', y: 0 },
    { x: 'Oktober', y: 0 },
    { x: 'November', y: 0 },
    { x: 'Desember', y: 0 },
  ];

  if (data.length === 0) return defaultValue;

  const getMonthData = (month) => {
    const findData = data.filter((chart) => chart?.month === month);
    return findData.length;
  };

  return defaultValue.map((item, index) => ({
    x: item.x,
    y: getMonthData(index + 1) || 0,
  }));
};

export const mapChartCumulativePurchaseUser = (data) => {
  const defaultValue = [
    { x: 'Januari', y: 0 },
    { x: 'Februari', y: 0 },
    { x: 'Maret', y: 0 },
    { x: 'April', y: 0 },
    { x: 'Mei', y: 0 },
    { x: 'Juni', y: 0 },
    { x: 'Juli', y: 0 },
    { x: 'Agustus', y: 0 },
    { x: 'September', y: 0 },
    { x: 'Oktober', y: 0 },
    { x: 'November', y: 0 },
    { x: 'Desember', y: 0 },
  ];

  if (data.length === 0) return defaultValue;

  const getMonthData = (month) => {
    const findData = data.filter((chart) => chart?.month === month);
    return findData.length;
  };

  let totalAmount = 0;
  return defaultValue.map((item, index) => {
    totalAmount += getMonthData(index + 1);
    return {
      x: item.x,
      y: totalAmount,
    };
  });
};

export const mapChartGender = (data) => {
  const defaultValue = {
    male: 0,
    female: 0,
    grand_total: 0,
    percentage_male: getPercentage(data?.male, 0),
    percentage_female: getPercentage(data?.female, 0),
  };

  if (data.length === 0) return defaultValue;

  const genderMale = data.filter(
    (item) => (item.item.gender || '').toLowerCase() === 'laki-laki'
  );
  const genderFemale = data.filter(
    (item) => (item.item.gender || '').toLowerCase() === 'perempuan'
  );
  const grandTotal = genderMale.length + genderFemale.length;

  return {
    male: genderMale.length,
    female: genderFemale.length,
    grand_total: grandTotal,
    percentage_male: getPercentage(genderMale.length, grandTotal),
    percentage_female: getPercentage(genderFemale.length, grandTotal),
  };
};

export const mapChartAge = (data) => {
  const defaultValue = [
    { x: '21-25', y: data?.item?.['21-25'] || 0 },
    { x: '25-30', y: data?.item?.['26-30'] || 0 },
    { x: '31-35', y: data?.item?.['31-35'] || 0 },
    { x: '36-40', y: data?.item?.['36-40'] || 0 },
    { x: '41-45', y: data?.item?.['41-45'] || 0 },
    { x: '46-50', y: data?.item?.['46-50'] || 0 },
  ];

  if (data.length === 0) return defaultValue;

  const age21_25 = data.filter(
    (item) => item.item.age >= 21 && item.item.age <= 25
  );
  const age26_30 = data.filter(
    (item) => item.item.age >= 26 && item.item.age <= 30
  );
  const age31_35 = data.filter(
    (item) => item.item.age >= 31 && item.item.age <= 35
  );
  const age36_40 = data.filter(
    (item) => item.item.age >= 36 && item.item.age <= 40
  );
  const age41_45 = data.filter(
    (item) => item.item.age >= 41 && item.item.age <= 45
  );
  const age46_50 = data.filter(
    (item) => item.item.age >= 46 && item.item.age <= 50
  );

  return [
    { x: '21-25', y: age21_25.length || 0 },
    { x: '26-30', y: age26_30.length || 0 },
    { x: '31-35', y: age31_35.length || 0 },
    { x: '36-40', y: age36_40.length || 0 },
    { x: '41-45', y: age41_45.length || 0 },
    { x: '46-50', y: age46_50.length || 0 },
  ];
};
