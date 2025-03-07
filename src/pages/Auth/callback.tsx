import React, {lazy, useEffect, useState} from 'react';
import cookie from '@/src/utils/cookieUtils';
import {Navigate} from 'react-router';
import cx from 'classnames';
const Header = lazy(() => import('@/pages/Auth/components/Header/Header'));

const Callback = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (cookie.getAuth() && cookie.getPermission()) {
      setIsAuth(true);
    } else {
      setIsAuth(true);
    }
  }, [cookie.getAuth(), cookie.getPermission()]);

  return isAuth ?
    <Navigate to={'/'}/> :
    <div>
      <Header/>
      <div
        className={cx('flex flex-col justify-center items-center',
            'mt-20')}>
        <h1 className={cx('text-center')}>
          Please wait you will be redirecting to dashboard
        </h1>
      </div>
    </div>;
};

export default Callback;
