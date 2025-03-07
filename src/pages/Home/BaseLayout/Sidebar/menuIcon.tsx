import cx from 'classnames';

import { any, bool } from 'prop-types';

const MenuIcon = ({ icon, isActive }) => {
  const fill = isActive ? '#5600E8' : '#757575';
  const IconMenu = icon;
  return (
    <div className={cx('w-7 h-10 items-center flex justify-center')}>
      <IconMenu color={fill} />
    </div>
  );
};

MenuIcon.propTypes = {
  icon: any,
  isActive: bool,
};

export default MenuIcon;
