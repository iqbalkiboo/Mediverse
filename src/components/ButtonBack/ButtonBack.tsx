import React from 'react';
import {
  ChevronLeftIcon,
} from '@/src/assets/images/svg';
import cx from 'classnames';
import {useNavigate} from 'react-router';
import {string} from 'prop-types';

const ButtonBack = ({id, path}) => {
  const navigate = useNavigate();
  const toPath = path || -1;
  return (
    <button
      id={id}
      onClick={() => navigate(toPath)}
    >
      <div className={cx('flex capitalize tracking-[1.25px] items-center')}>
        <div className={cx('mr-4')}>
          <ChevronLeftIcon color={'#0A0A0A'}/>
        </div>
        <p className={cx('text-sm font-bold')}>kembali</p>
      </div>
    </button>
  );
};

ButtonBack.propTypes = {
  id: string,
  path: string,
};

ButtonBack.defaultProps = {
  id: 'back-button',
};

export default ButtonBack;

