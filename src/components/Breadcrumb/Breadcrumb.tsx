import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import cx from 'classnames';

import Typography from '@/src/components/Typography';
import routes from '@/home/home.routes';

const Breadcrumb = () => {
  const [parent, setParent] = useState('');
  const [child, setChild] = useState('');
  const [detail, setDetail] = useState('');
  const [navRoute, setNavRoute] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const pathnameLocation = location.pathname.split('/');

  useEffect(() => {
    routes.map((route) => {
      const routePath = route.routes.split('/');
      if (route.routes === location.pathname) {
        setParent(route.parent.charAt(0).toUpperCase() + route.parent.slice(1));
        setChild(route.title);
        setDetail('');
      } else if (
        pathnameLocation[1] === routePath[1] &&
        pathnameLocation[2] === routePath[2]
      ) {
        setParent(route.parent.charAt(0).toUpperCase() + route.parent.slice(1));
        setChild(route.subParent || '');
        setDetail(route.title);
        routes.map((child) => {
          if (child.title === route.subParent) {
            setNavRoute(child.routes);
          }
        });
      } else {
        return;
      }
    });
  }, []);

  return (
    <>
      <div className={cx('flex items-center')}>
        {parent === 'Dashboard' ? (
          <Typography variant={'bodySmall'} color='text-primary'>
            <button
              onClick={() => navigate('/')}
              className={cx('font-semibold')}
            >
              {parent}
            </button>
          </Typography>
        ) : (
          <Typography variant={'bodySmall'} color='text-[#ABAFB3]'>
            {parent}
          </Typography>
        )}
        <div className={cx('mx-2 mb-1 text-[#ABAFB3]')}>-</div>
        {detail !== '' ? (
          <Typography variant={'bodySmall'} color='text-primary'>
            <button
              onClick={() => navigate(navRoute)}
              className={cx('font-semibold')}
            >
              {child}
            </button>
          </Typography>
        ) : (
          <Typography variant={'bodySmall'} color='text-[#ABAFB3]'>
            {child}
          </Typography>
        )}
        {detail !== '' && (
          <>
            <div className={cx('mx-2 mb-1 text-[#ABAFB3]')}>-</div>
            <Typography variant={'bodySmall'} color='text-[#ABAFB3]'>
              {detail}
            </Typography>
          </>
        )}
      </div>
    </>
  );
};

export default Breadcrumb;
