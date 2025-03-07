import React from 'react';
import {alertRed} from '@/assets/images';
import cx from 'classnames';

interface Props {
  text: any
}

const AlertInput:React.FC<Props> = (props) => {
  return (
    <div className={cx('flex justify-start items-center mt-1')}>
      <img className={cx('h-3 w-3 mr-2')} src={alertRed} alt="" />
      <span className={cx('text-xs text-red-600')}>{props.text}</span>
    </div>
  );
};

export default AlertInput;
