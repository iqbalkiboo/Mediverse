import React from 'react';
import classNames from 'classnames/bind';
import {string} from 'prop-types';
import styles from './Pill.module.css';

const cx = classNames.bind(styles);

const Pill = (props) => {
  const {text, size, variant} = props;

  const pillSize = {
    xl: '',
    lg: '',
    md: '',
    sm: 'px-4 text-sm py-[3px] mx-1',
  };

  return (
    <div className={cx('pill', pillSize[size], `pill__${variant}`)}>
      {text}
    </div>
  );
};

Pill.propTypes = {
  text: string,
  size: string,
  variant: string,
};

Pill.defaultProps = {
  text: '',
  size: 'sm',
  variant: 'outline',
};

export default Pill;
