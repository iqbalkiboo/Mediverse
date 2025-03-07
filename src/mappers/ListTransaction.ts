export const mapListAllTransaction = (data: any) => {
  return data.map((item) => {
    return {
      date: item.date,
      name: item.name,
      transactionType: item.transactionType,
      transaction: item.transaction,
      description: item.description,
    };
  });
};

export const mapAllBalanceExpedition = (data: any) => {
  return data.map((item) => {
    return {
      name: item.name,
      income: item.income,
      havePayed: item.havePayed,
      haveToPay: item.haveToPay,
      balance: item.balance,
    };
  });
};

export const mapExpeditionProviderPayment = (data: any) => {
  return data.map((item) => {
    return {
      date: item.date,
      purpose: item.purpose,
      total: item.total,
      pic: item.pic,
    };
  });
};

