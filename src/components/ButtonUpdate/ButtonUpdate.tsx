import React from 'react';
import cx from 'classnames';
import {UpdateIcon} from '@/src/assets/images/svg';
import Tooltip from '@/src/components/Tooltip';
import {func, number} from 'prop-types';

const ButtonUpdate = (props) => {
  return (
    <Tooltip
      message={'Update'}
      marginTop={props.marginTop || 0}
    >
      <button
        onClick={props.onClick}
        className={cx('w-9 h-9 p-2 rounded-lg bg-[#FDE6D8] flex justify-center items-center')}
      >
        <UpdateIcon />
      </button>
    </Tooltip>
  );
};

ButtonUpdate.propTypes = {
  marginTop: number,
  onClick: func,
};

export default ButtonUpdate;
