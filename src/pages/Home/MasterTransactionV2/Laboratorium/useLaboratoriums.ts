import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { resolveListCancelReason } from '@/store/transaction/transaction.reducer';
import {
  resolveGetDetailTransaction,
  resolveListLaboratory,
  clearFormCancelReason,
  clearModalVaccination,
  clearParams,
  clearStateVaccination,
  setFormCancelReason,
  setModalVaccination,
  setParams,
  resolvePutServiceTransaction,
} from '@/src/store/laboratorium/laboratorium.reducer';
import { getDataListCancelReason } from '@/client/transaction';
import { formatDateEng } from '@/utils/formatDate';
import { mapListTransaction, mapOptionsIcd } from '@/src/mappers/Transaction';
import cookieUtils from '@/utils/cookieUtils';
import useDebounce from '@/utils/debounce';

const { role } = (await cookieUtils.getPermission()) || {
  role: {},
};

const useLaboratoriums = () => {
  const dispatch = useDispatch();

  const { moduleCancelReason } = useSelector(
    (state: RootStateOrAny) => state.transaction
  );
  const {
    params,
    metadata,
    modalLaboratory,
    laboratoriums,
    laboratorium,
    formCancelReason,
  } = useSelector((state: RootStateOrAny) => state.laboratorium);

  const handleSetParams = (name, value) => {
    dispatch(setParams({ name, value }));
  };

  const handleSetModalLaboratorium = (field: string, value: any) => {
    dispatch(setModalVaccination({ field, value }));
  };

  const handleSetFormCancelReason = (section: string, value: any) => {
    dispatch(setFormCancelReason({ section, value }));
  };

  const handleClearStateVaccination = () => {
    dispatch(clearStateVaccination());
  };

  const handleClearFormCancelReason = () => {
    dispatch(clearFormCancelReason());
  };

  const handleClearParams = () => {
    dispatch(clearParams());
  };

  const handleClearModalVaccination = () => {
    dispatch(clearModalVaccination());
  };

  const handleListLaboratorium = () => {
    const payload = {
      search: params.search,
      status: params.status,
      statusPayment: params.serviceType,
      start: params.page === 1 ? 0 : (params.page - 1) * params.limit,
      pageLength: params.limit,
      fromDate: params.startDate ? formatDateEng(params.startDate) : '',
      endDate: params.endDate ? formatDateEng(params.endDate) : '',
    };
    dispatch(resolveListLaboratory(payload));
  };

  const handleGetDetailTransaction = (id: string) => {
    dispatch(resolveGetDetailTransaction({ id }));
  };

  const handleGetListCancelReason = async () => {
    dispatch(resolveListCancelReason());
  };

  const handleSearchListCancelReason = async (search, callback) => {
    const response = await getDataListCancelReason({ search });
    if (response.status === 200) {
      const result = response?.data?.data || [];
      return callback(mapOptionsIcd(result));
    }
  };

  const handleCancelVaccination = async () => {
    const payload = {
      service_transaction_status: 'Batal',
      action_reason: formCancelReason?.actionReason,
      description: formCancelReason?.description,
    };
    dispatch(
      resolvePutServiceTransaction({
        transactionId: modalLaboratory?.transactionId,
        data: payload,
      })
    );
  };

  const handleUpadetStatusLabs = async () => {
    const payload = {
      service_transaction_status: 'Menunggu Tindakan',
    };
    dispatch(
      resolvePutServiceTransaction({
        transactionId: modalLaboratory?.transactionId,
        data: payload,
      })
    );
  };

  const handleChangeSearch = ({ target }: { target: any }) => {
    handleSetParams('search', target.value);
  };

  const debouncedSearchTerm = useDebounce(params.search, 500);

  const dataVaccinations = mapListTransaction(laboratoriums.data);
  const dataVaccinationDetail = laboratorium.data;
  const listSelectCancelReason = mapOptionsIcd(moduleCancelReason?.data);

  return {
    data: {
      role,
      metadata,
      params,
      laboratoriums,
      dataVaccinations,
      laboratorium,
      dataVaccinationDetail,
      modalLaboratory,
      listSelectCancelReason,
      formCancelReason,
    },
    method: {
      handleChangeSearch,
      handleListLaboratorium,
      handleGetDetailTransaction,
      handleGetListCancelReason,
      handleSearchListCancelReason,
      handleClearStateVaccination,
      handleClearFormCancelReason,
      handleSetParams,
      handleSetModalLaboratorium,
      handleSetFormCancelReason,
      handleClearParams,
      handleClearModalVaccination,
      handleCancelVaccination,
      handleUpadetStatusLabs,
      debouncedSearchTerm,
    },
  };
};

export default useLaboratoriums;
