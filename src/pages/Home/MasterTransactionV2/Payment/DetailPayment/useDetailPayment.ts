import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  resolveAddPaymentEntry,
  resolveDetailPayment,
  resolveGetListBankAccount,
  resolveGetListModePayment,
  resolvePostDirectSalesOrder,
  resolveUpdateSalesOrder,
  resolveUpdateStatusSalesOrder,
  setModalPaymentForm,
} from '@/src/store/payment/payment.reducer';
import {
  mapDetailPayment,
  mapDirectPayment,
  mapListPayment,
} from '@/src/mappers/MasterTransaction/payment';
import { schemaCustomer } from './validation';

import type { RootStateOrAny } from 'react-redux';

const useDetailPayment = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    params,
    metadata,
    payments,
    payment,
    paymentForm,
    formSalesOrder,
    listModePayment,
    listBankAccount,
  } = useSelector((state: RootStateOrAny) => state.payment);

  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaCustomer),
  });

  const handleGetListModePayment = async () => {
    dispatch(resolveGetListModePayment());
  };

  const handleGetListBankAccount = async () => {
    dispatch(resolveGetListBankAccount());
  };

  const handleGetDetailPayment = () => {
    const payload = {
      queue: id || '',
    };
    dispatch(resolveDetailPayment(payload));
  };

  const handleUpdateStatusSalesOrder = async (status) => {
    const payload = {
      salesOrder: payment.data.sales_order.name,
      status: status,
    };
    await dispatch(resolveUpdateStatusSalesOrder(payload));
  };

  const handleUpdateSalesOrder = async (data) => {
    const dataPayload = data?.map((item) => ({
      item_code: item.item_code,
      qty: item.qty,
      rate: item.rate - (item.totalDiscount || 0),
      discount_percentage: Number(item.discount),
      discount_amount: item.totalDiscount,
    }));
    const payload = {
      paymentId: payment.data.sales_order.name,
      data: { items: dataPayload },
    };
    await dispatch(resolveUpdateSalesOrder(payload));
  };

  const handleAddDirectSalesOrder = async (
    customer,
    data,
    paymentMode,
    paidAmount,
    bankAccount,
    bankNumber
  ) => {
    const payload = mapDirectPayment(
      customer,
      data,
      paymentMode,
      paidAmount,
      bankAccount,
      bankNumber
    );
    dispatch(
      resolvePostDirectSalesOrder({
        data: {
          data: payload,
        },
      })
    );
  };

  const handleAddPaymentEntry = async (
    paymentMode,
    paidAmount,
    bankAccount,
    bankNumber
  ) => {
    const payload = {
      salesOrder: payment.data.sales_order.name,
      paymentMode: paymentMode,
      paidAmount: paidAmount,
      bankAccount: bankAccount,
      bankNumber: bankNumber,
    };
    await dispatch(resolveAddPaymentEntry(payload));
  };

  const handleSetModalPaymentForm = (field: string, value: boolean) => {
    dispatch(setModalPaymentForm({ field, value }));
  };

  const dataPayments = mapListPayment(payments.data);
  const dataPayment = mapDetailPayment(payment.data);

  return {
    data: {
      id,
      metadata,
      params,
      payments,
      dataPayments,
      payment,
      dataPayment,
      paymentForm,
      formSalesOrder,
      listModePayment,
      listBankAccount,
      listModePaymentData: listModePayment?.data,
      listBankAccountData: listBankAccount?.data,
      control,
      errors,
      isValid,
    },
    method: {
      handleGetListModePayment,
      handleGetListBankAccount,
      handleGetDetailPayment,
      handleUpdateStatusSalesOrder,
      handleUpdateSalesOrder,
      handleAddDirectSalesOrder,
      handleAddPaymentEntry,
      handleSetModalPaymentForm,
      handleSubmit,
      register,
    },
  };
};

export default useDetailPayment;
