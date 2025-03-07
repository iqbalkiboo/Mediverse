import { lazy } from 'react';

const DashboardIcon = lazy(
  () => import('@/src/assets/images/svg/menu/dashboard')
);
const ServiceIcon = lazy(() => import('@/src/assets/images/svg/menu/service'));
const UserIcon = lazy(() => import('@/src/assets/images/svg/menu/users'));
const MedevoIcon = lazy(() => import('@/src/assets/images/svg/menu/medevo'));
const TransactionIcon = lazy(
  () => import('@/src/assets/images/svg/menu/transaction')
);

export { DashboardIcon, ServiceIcon, UserIcon, MedevoIcon, TransactionIcon };
