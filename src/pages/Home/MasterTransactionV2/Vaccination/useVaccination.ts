import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  resolveGetDetailTransaction,
  resolveListVaccination,
  resolvePostCancelTransaction,
  resolvePostKipi,
  clearFormCancelReason,
  clearFormObservationReason,
  clearModalVaccination,
  clearParams,
  clearStateVaccination,
  setFormCancelReason,
  setModalVaccination,
  setParams,
  setFormObservationReason,
} from '@/src/store/vaccination/vaccination.reducer';
import { formatDateEng } from '@/utils/formatDate';
import { mapListTransaction } from '@/src/mappers/Transaction';
import useDebounce from '@/utils/debounce';

const useVaccination = () => {
  const dispatch = useDispatch();

  const {
    params,
    metadata,
    modalVaccination,
    vaccinations,
    vaccination,
    formCancelReason,
    formObservationReason,
  } = useSelector((state: RootStateOrAny) => state.vaccination);

  const handleSetParams = (name, value) => {
    dispatch(setParams({ name, value }));
  };

  const handleSetModalVaccination = (field: string, value: any) => {
    dispatch(setModalVaccination({ field, value }));
  };

  const handleSetFormCancelReason = (name: string, value: any) => {
    dispatch(setFormCancelReason({ name, value }));
  };

  const handleSetFormObservationReason = (name: string, value: any) => {
    dispatch(setFormObservationReason({ name, value }));
  };

  const handleClearStateVaccination = () => {
    dispatch(clearStateVaccination());
  };

  const handleClearFormCancelReason = () => {
    dispatch(clearFormCancelReason());
  };

  const handleClearFormObservationReason = () => {
    dispatch(clearFormObservationReason());
  };

  const handleClearParams = () => {
    dispatch(clearParams());
  };

  const handleClearModalVaccination = () => {
    dispatch(clearModalVaccination());
  };

  const handleGetListVaccination = () => {
    const payload = {
      search: params.search,
      status: params.status,
      statusPayment: params.serviceType,
      start: params.page === 1 ? 0 : (params.page - 1) * params.limit,
      pageLength: params.limit,
      fromDate: params.startDate ? formatDateEng(params.startDate) : '',
      endDate: params.endDate ? formatDateEng(params.endDate) : '',
    };
    dispatch(resolveListVaccination(payload));
  };

  const handleGetDetailTransaction = (id: string) => {
    dispatch(resolveGetDetailTransaction({ id }));
  };

  const handleCancelVaccination = async () => {
    const payload = {
      transaction_name: modalVaccination?.transactionId,
      service_transaction_status: 'Batal',
      action_reason: formCancelReason?.actionReason,
      description: formCancelReason?.description,
    };
    dispatch(
      resolvePostCancelTransaction({
        data: payload,
      })
    );
  };

  const handleObservationVaccination = () => {
    const payload = {
      doctype: 'KIPI',
      is_complaint: formObservationReason.have_complaint ? 1 : 0,
      complaint: formObservationReason.have_complaint
        ? formObservationReason.reason?.map((item) => ({
            reason: item?.value?.name,
            display: item?.value?.display,
            system_uri: item?.value?.system_uri,
            code: item?.value?.code_value,
          }))
        : [],
      transaction: modalVaccination?.transactionId,
    };
    dispatch(
      resolvePostKipi({
        data: payload,
      })
    );
  };

  const handleChangeSearch = ({ target }: { target: any }) => {
    handleSetParams('search', target.value);
  };

  const debouncedSearchTerm = useDebounce(params.search, 500);

  const dataVaccinations = mapListTransaction(vaccinations.data);
  const dataVaccinationDetail = vaccination.data;

  return {
    data: {
      metadata,
      params,
      vaccinations,
      dataVaccinations,
      vaccination,
      dataVaccinationDetail,
      modalVaccination,
      formCancelReason,
      formObservationReason,
    },
    method: {
      handleChangeSearch,
      handleGetListVaccination,
      handleGetDetailTransaction,
      handleSetParams,
      handleSetModalVaccination,
      handleSetFormCancelReason,
      handleSetFormObservationReason,
      handleClearStateVaccination,
      handleClearFormCancelReason,
      handleClearFormObservationReason,
      handleClearParams,
      handleClearModalVaccination,
      handleCancelVaccination,
      handleObservationVaccination,
      debouncedSearchTerm,
    },
  };
};

export default useVaccination;
