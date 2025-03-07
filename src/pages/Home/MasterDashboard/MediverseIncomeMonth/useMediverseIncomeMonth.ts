import {mapIncome} from '@/src/mappers/dashboard';
import {resolveGetIncomeMediverse} from '@/src/store/dashboard/dashboard.reducer';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';


const useMediverseIncomeMonth = () => {
  const dispatch = useDispatch();
  const {
    dashboardFinance,
  } = useSelector((state: RootStateOrAny) => state.dashboard);

  const handleIncome = () => {
    dispatch(resolveGetIncomeMediverse());
  };

  const dataIncome = mapIncome(dashboardFinance.income);

  return {
    data: {
      dataIncome,
    },
    method: {
      handleIncome,
    },
  };
};

export default useMediverseIncomeMonth;
