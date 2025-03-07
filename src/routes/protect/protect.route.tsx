import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NProgress from 'nprogress';

import cookieUtils from '@/src/utils/cookieUtils';

import 'nprogress/nprogress.css';

import { isEmpty } from 'lodash';

const BaseLayout = lazy(() => import('@/home/BaseLayout'));

const LazyLoad = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return <></>;
};

const ProtectRoute = () => {
  return (
    <Suspense fallback={<LazyLoad />}>
      {!isEmpty(cookieUtils.getAuth()) ? (
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      ) : (
        <Navigate to={'/login'} />
      )}
    </Suspense>
  );
};

export default ProtectRoute;
