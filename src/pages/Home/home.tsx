import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import cx from 'classnames';

import { Typography } from '@/src/components';
import {
  ADMIN_FINANCE_MEDPHARM,
  ADMIN_FINANCE_PROVIDER,
  ADMIN_MARKETING_ROLE,
  APOTEK_ROLE,
  MEDIVERSE_ROLE,
  OPERATOR_FASKES,
  OPERATOR_MEDPOINT_ROLE,
  PROVIDER_MEDPHARM_ROLE,
} from '@/pages/Home/MasterDashboard/useDashboardHooks';
import { ROLES } from '@/src/constants';
import homeRoute from '@/pages/Home/home.routes';
import cookieUtils from '@/src/utils/cookieUtils';

import { isEmpty } from 'lodash';

const { role } = (await cookieUtils.getPermission()) || {
  role: {},
};

const dashboardRole = [
  ...ADMIN_FINANCE_MEDPHARM,
  ...ADMIN_FINANCE_PROVIDER,
  ...ADMIN_MARKETING_ROLE,
  ...APOTEK_ROLE,
  ...MEDIVERSE_ROLE,
  ...OPERATOR_FASKES,
  ...OPERATOR_MEDPOINT_ROLE,
  ...PROVIDER_MEDPHARM_ROLE,
];

const Home = () => (
  <>
    <Typography variant={'h1'} color='text-primary' customClass={cx('mt-2')}>
      Dashboard
    </Typography>
  </>
);

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Redirect to first page when the role not on the list
     */
    if (!dashboardRole.includes(role?.name) && !isEmpty(menus)) {
      if ([ROLES.DOKTER].includes(role?.id)) {
        navigate('/doctors');
      } else {
        navigate(menus[0].routes);
      }
    }
  }, []);

  const menus = homeRoute.filter(
    (item) => item.active && item.isAuthenticated && item.parent !== ''
  );

  const isDisableProduction = import.meta.env
    .VITE_APP_DISABLE_DASHBOARD_PRODUCTION;

  if (Number(isDisableProduction)) {
    return (
      <Typography variant={'h1'} color='text-primary' customClass={cx('mt-2')}>
        Dashboard
      </Typography>
    );
  }

  return <Home />;
};

export default Dashboard;
