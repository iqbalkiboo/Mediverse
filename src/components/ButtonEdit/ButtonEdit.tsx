import React from 'react';
import cx from 'classnames';
import {EditIcon} from '@/src/assets/images/svg';
import Tooltip from '@/src/components/Tooltip';
import {any, func, number, string} from 'prop-types';

const ButtonEdit = (props) => {
  return (
    <Tooltip
      message={props.message}
      marginTop={props.marginTop}
    >
      <button
        onClick={props.onClick}
        className={cx('w-9 h-9 p-2 rounded-lg bg-[#D1F7F5] flex justify-center items-center')}
      >
        {
          props.icon
        }
      </button>
    </Tooltip>
  );
};

ButtonEdit.defaultProps = {
  icon: <EditIcon color='#004BBB' width='16' height='16'/>,
  message: 'Edit',
};

ButtonEdit.propTypes = {
  marginTop: number,
  onClick: func,
  icon: any,
  message: string,
};

export default ButtonEdit;
