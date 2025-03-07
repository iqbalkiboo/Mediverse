import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  resolveListPayment,
  resolvePostCancelTransaction,
  clearParams,
  clearStatePayment,
  setParams,
  setModalPayment,
  clearModalPayment,
} from '@/src/store/payment/payment.reducer';
import { mapListPayment } from '@/src/mappers/MasterTransaction/payment';
import { formatDateEng } from '@/utils/formatDate';
import useDebounce from '@/utils/debounce';

const usePayment = () => {
  const dispatch = useDispatch();

  const { params, metadata, payments, modalPayment } = useSelector(
    (state: RootStateOrAny) => state.payment
  );

  const handleClearStatePayment = () => {
    dispatch(clearStatePayment());
  };

  const handleSetParams = (name, value) => {
    dispatch(setParams({ name, value }));
  };

  const handleClearParams = () => {
    dispatch(clearParams());
  };

  const handleClearModalPayment = () => {
    dispatch(clearModalPayment());
  };

  const handleGetListPayment = () => {
    const payload = {
      status:
        params.status !== 'Registrasi'
          ? params.status === 'Lunas'
            ? 'Completed'
            : params.status
          : '',
      start: params.page === 1 ? 0 : (params.page - 1) * params.limit,
      pageLength: params.limit,
      queueType: params.serviceType,
      fromDate: params.startDate ? formatDateEng(params.startDate) : '',
      endDate: params.endDate ? formatDateEng(params.endDate) : '',
      search: params.search,
    };
    dispatch(resolveListPayment(payload));
  };

  const handleCancelPayment = async (description: string) => {
    const payload = {
      transaction_name: modalPayment?.transactionId,
      service_transaction_status: 'Batal',
      description: description,
      action_reason: '',
    };
    dispatch(
      resolvePostCancelTransaction({
        data: payload,
      })
    );
  };

  const handleChangeSearch = ({ target }: { target: any }) => {
    handleSetParams('search', target.value);
  };

  const handleSetModalPayment = (field: string, value: any) => {
    dispatch(setModalPayment({ field, value }));
  };

  const debouncedSearchTerm = useDebounce(params.search, 500);

  const dataPayments = mapListPayment(payments.data);

  return {
    data: { metadata, params, payments, dataPayments, modalPayment },
    method: {
      handleChangeSearch,
      handleGetListPayment,
      handleClearStatePayment,
      handleClearParams,
      handleClearModalPayment,
      handleSetParams,
      handleSetModalPayment,
      handleCancelPayment,
      debouncedSearchTerm,
    },
  };
};

export default usePayment;
