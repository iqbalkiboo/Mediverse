import React from 'react';
import cx from 'classnames';
import {DetailIcon} from '@/src/assets/images/svg';
import Tooltip from '@/src/components/Tooltip';
import {func, number, string} from 'prop-types';

const ButtonDetail = (props) => {
  return (
    <Tooltip
      message={'Detail'}
      marginTop={props.marginTop || 0}
    >
      <button
        id={props.id}
        onClick={props.onClick}
        className={cx('w-9 h-9 p-2 rounded-lg bg-[#DDCCFA] flex justify-center items-center')}
      >
        <DetailIcon />
      </button>
    </Tooltip>
  );
};

ButtonDetail.propTypes = {
  id: string,
  marginTop: number,
  onClick: func,
};

export default ButtonDetail;
