import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router';

import BaseLayout from '@/src/pages/Home/BaseLayout';
import LoginDoctor from '@/src/pages/Doctors/LoginDoctor';
import cookieUtils from '@/src/utils/cookieUtils';

import { isEmpty } from 'lodash';

const DoctorRoute = () => {
  const clinicId = new URLSearchParams(location?.search).get('clinicId');

  const renderView = () => {
    if (!isEmpty(cookieUtils.getAuth())) {
      if (clinicId) {
        return (
          <BaseLayout>
            <Outlet />
          </BaseLayout>
        );
      } else {
        return (
          <BaseLayout>
            <LoginDoctor />
          </BaseLayout>
        );
      }
    } else {
      return <Navigate to={'/login'} />;
    }
  };

  return <Suspense fallback={<span>Loading...</span>}>{renderView()}</Suspense>;
};

export default DoctorRoute;
