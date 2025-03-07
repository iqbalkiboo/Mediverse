import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  resolveGetDetailTransaction,
  resolveListClinicOutpatient,
  resolvePutServiceTransaction,
  resolvePostCancelTransaction,
  setParams,
  clearParams,
  clearStateClinicOutpatient,
  clearModalClinicOutpatient,
  clearFormCancelReason,
  setModalClinicOutpatient,
  setFormCancelReason,
} from '@/src/store/clinicOutpatient/clinicOutpatient.reducer';
import { formatDateEng } from '@/utils/formatDate';
import { mapListTransaction } from '@/src/mappers/Transaction';
import useDebounce from '@/src/utils/debounce';

const useClinicOutpatient = () => {
  const dispatch = useDispatch();

  const {
    params,
    metadata,
    modalClinicOutpatient,
    clinicOutpatients,
    clinicOutpatient,
    formCancelReason,
  } = useSelector((state: RootStateOrAny) => state.clinicOutpatient);

  const handleSetParams = (name, value) => {
    dispatch(setParams({ name, value }));
  };

  const handleSetModalClinicOutpatient = (field: string, value: any) => {
    dispatch(setModalClinicOutpatient({ field, value }));
  };

  const handleSetFormCancelReason = (name: string, value: any) => {
    dispatch(setFormCancelReason({ name, value }));
  };

  const handleClearParams = () => {
    dispatch(clearParams());
  };

  const handleClearStateClinicOutpatient = () => {
    dispatch(clearStateClinicOutpatient());
  };

  const handleClearModalClinicOutpatient = () => {
    dispatch(clearModalClinicOutpatient());
  };

  const handleClearFormCancelReason = () => {
    dispatch(clearFormCancelReason());
  };

  const handleGetListClinicOutpatient = () => {
    const payload = {
      search: params.search,
      status: params.status,
      statusPayment: params.serviceType,
      start: params.page === 1 ? 0 : (params.page - 1) * params.limit,
      pageLength: params.limit,
      fromDate: params.startDate ? formatDateEng(params.startDate) : '',
      endDate: params.endDate ? formatDateEng(params.endDate) : '',
    };
    dispatch(resolveListClinicOutpatient(payload));
  };

  const handleGetDetailTransaction = (id: string) => {
    dispatch(resolveGetDetailTransaction({ id }));
  };

  const handleCancelClinicOutpatient = async () => {
    const payload = {
      transaction_name: modalClinicOutpatient?.transactionId,
      service_transaction_status: 'Batal',
      description: formCancelReason?.description,
      action_reason: '',
    };
    dispatch(
      resolvePostCancelTransaction({
        data: payload,
      })
    );
  };

  const handleFinishClinicOutpatient = async () => {
    const payload = {
      service_transaction_status: 'Selesai',
    };
    dispatch(
      resolvePutServiceTransaction({
        transactionId: modalClinicOutpatient?.transactionId,
        data: payload,
      })
    );
  };

  const handleChangeSearch = ({ target }: { target: any }) => {
    handleSetParams('search', target.value);
  };

  const debouncedSearchTerm = useDebounce(params.search, 500);

  const dataClinicOutpatients = mapListTransaction(clinicOutpatients.data);
  const dataClinicOutpatientDetail = clinicOutpatient.data;

  return {
    data: {
      metadata,
      params,
      clinicOutpatients,
      dataClinicOutpatients,
      clinicOutpatient,
      dataClinicOutpatientDetail,
      modalClinicOutpatient,
      formCancelReason,
    },
    method: {
      handleChangeSearch,
      handleGetListClinicOutpatient,
      handleGetDetailTransaction,
      handleSetParams,
      handleSetModalClinicOutpatient,
      handleSetFormCancelReason,
      handleClearParams,
      handleClearStateClinicOutpatient,
      handleClearModalClinicOutpatient,
      handleClearFormCancelReason,
      handleCancelClinicOutpatient,
      handleFinishClinicOutpatient,
      debouncedSearchTerm,
    },
  };
};

export default useClinicOutpatient;
