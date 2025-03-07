import { useNavigate } from 'react-router-dom';
import cx from 'classnames';

import homeRoute from '@/pages/Home/home.routes';

import { func } from 'prop-types';

const Drawer = ({ setIsOpenDrawer }) => {
  const navigate = useNavigate();

  const menus = homeRoute.filter(
    (item) => item.active && item.isAuthenticated && item.parent !== ''
  );

  const handleNavigate = (to: string) => {
    setIsOpenDrawer(false);
    navigate(to);
  };

  return (
    <div className={cx('h-full w-screen z-100 fixed bg-white')}>
      <div className={cx('px-4')}>
        <div
          onClick={() => handleNavigate('/')}
          className={cx('mt-2 border-b-1 py-3 text-[#1D2433]')}
        >
          Dashboard
        </div>
        {menus.map((menu, idx) => (
          <div
            key={idx}
            className={cx('border-b-1 py-3 text-[#1D2433] text-sm')}
            onClick={() => handleNavigate(menu.routes)}
          >
            {menu.title}
          </div>
        ))}
      </div>
    </div>
  );
};

Drawer.propTypes = {
  setIsOpenDrawer: func,
};

export default Drawer;
