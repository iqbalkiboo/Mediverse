import {
  mapIncomeHistory,
  mapIncomeHistoryProvider,
} from '@/src/mappers/dashboard';
import {
  resolveGetIncomeHistoryMediverse,
  resolveGetIncomeHistoryProvider,
} from '@/src/store/dashboard/dashboard.reducer';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import cookieUtils from '@/src/utils/cookieUtils';
import {ROLES_NAME} from '@/src/constants';

const {role} = (await cookieUtils.getPermission()) || {
  role: {},
};

export const FINANCE_APOTEK = [
  ROLES_NAME.FINANCE_APOTEK,
  ROLES_NAME.FINANCE_PROVIDER,
];

const useIncomeHistories = () => {
  const isProvider = FINANCE_APOTEK.includes(role?.name);
  const dispatch = useDispatch();
  const {
    dashboardFinance,
  } = useSelector((state: RootStateOrAny) => state.dashboard);

  const handleIncomeHistory = () => {
    if (isProvider) {
      dispatch(resolveGetIncomeHistoryProvider());
      return;
    }
    dispatch(resolveGetIncomeHistoryMediverse());
  };

  const dataIncomeHistories = isProvider ? mapIncomeHistoryProvider(dashboardFinance.incomeHistory) :
    mapIncomeHistory(dashboardFinance);

  return {
    data: {
      dataIncomeHistories,
      status: dashboardFinance.statusIncomeHistory,
      isProvider,
    },
    method: {
      handleIncomeHistory,
    },
  };
};

export default useIncomeHistories;
