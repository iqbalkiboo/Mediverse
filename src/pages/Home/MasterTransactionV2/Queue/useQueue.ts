import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  resolveListQueue,
  resolveListTransaction,
  clearParams,
  clearStateQueue,
  setParams,
} from '@/src/store/queue/queue.reducer';
import { formatDateEng } from '@/utils/formatDate';
import { mapListQueue } from '@/src/mappers/MasterTransaction/queue';
import { mapListTransaction } from '@/src/mappers/Transaction';
import useDebounce from '@/utils/debounce';

const useQueue = () => {
  const dispatch = useDispatch();

  const { params, metadata, queues, transactions } = useSelector(
    (state: RootStateOrAny) => state.queue
  );

  const handleClearStateQueue = () => {
    dispatch(clearStateQueue());
  };

  const handleSetParams = (name, value) => {
    dispatch(setParams({ name, value }));
  };

  const handleClearParams = () => {
    dispatch(clearParams());
  };

  const handleGetListQueue = () => {
    const payload = {
      typeRegistration: 'Dibantu Oleh Petugas',
      appointment_status: 'Menunggu Antrian',
      fromDate: params.startDate ? formatDateEng(params.startDate) : '',
      endDate: params.endDate ? formatDateEng(params.endDate) : '',
    };
    dispatch(resolveListQueue(payload));
  };

  const handleGetListTransaction = () => {
    const payload = {
      search: params.search,
      status: params.status,
      statusPayment: params.serviceType,
      queueType: params.queueType,
      start: params.page === 1 ? 0 : (params.page - 1) * params.limit,
      pageLength: params.limit,
      fromDate: params.startDate ? formatDateEng(params.startDate) : '',
      endDate: params.endDate ? formatDateEng(params.endDate) : '',
    };
    dispatch(resolveListTransaction(payload));
  };

  const handleChangeSearch = ({ target }: { target: any }) => {
    handleSetParams('search', target.value);
  };

  const debouncedSearchTerm = useDebounce(params.search, 500);

  const dataQueues = mapListQueue(queues.data);
  const dataTransactions = mapListTransaction(transactions.data);

  return {
    data: {
      metadata,
      params,
      queues,
      transactions,
      dataQueues,
      dataTransactions,
    },
    method: {
      handleChangeSearch,
      handleGetListQueue,
      handleGetListTransaction,
      handleClearStateQueue,
      handleSetParams,
      handleClearParams,
      debouncedSearchTerm,
    },
  };
};

export default useQueue;
