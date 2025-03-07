import {mapEstimationExpenseProvider} from '@/src/mappers/dashboard';
import {RootStateOrAny, useSelector} from 'react-redux';

const useExpenseStatistics = () => {
  const {
    currentMonthEstimationExpense,
  } = useSelector((state: RootStateOrAny) => state.dashboard);

  return {
    data: {
      currentMonthEstimationExpense: mapEstimationExpenseProvider(currentMonthEstimationExpense.data),
    },
    method: {},
  };
};

export default useExpenseStatistics;
