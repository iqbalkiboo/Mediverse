import {mapIncomeProvider} from '@/src/mappers/dashboard';
import {resolveGetIncomeProvider, resolveGetProviderSaldo} from '@/src/store/dashboard/dashboard.reducer';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';


const useIncomeMonthProvid = () => {
  const dispatch = useDispatch();
  const {
    dashboardFinance,
  } = useSelector((state: RootStateOrAny) => state.dashboard);

  const handleIncomeProvider = () => {
    dispatch(resolveGetIncomeProvider());
  };

  const handleSaldoProvider = () => {
    dispatch(resolveGetProviderSaldo());
  };

  const dataIncomeProvider = mapIncomeProvider(dashboardFinance.incomeProvider, dashboardFinance.providerSaldo);

  return {
    data: {
      dataIncomeProvider,
    },
    method: {
      handleIncomeProvider,
      handleSaldoProvider,
    },
  };
};

export default useIncomeMonthProvid;
