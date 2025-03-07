import React from 'react';
import cx from 'classnames';

import {mainLogo} from '@/assets/images';
import {useWindowSize} from '@/src/hooks/useWindowSize';

const Header = () => {
  const {isMobile} = useWindowSize();

  return (
    <div className={cx('w-full', {
      'py-7 px-5': isMobile,
      'py-7 px-12': !isMobile,
    })}>
      <div className={cx('w-28')}>
        <img src={mainLogo}/>
      </div>
    </div>
  );
};

export default Header;
