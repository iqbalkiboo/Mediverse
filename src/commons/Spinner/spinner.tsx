import React from 'react';
import cx from 'classnames';
import styles from './spinner.module.css';
import Spinner from '@/components/Spinner';

interface Props {
  open: boolean
};

const SpinnerScreen: React.FC<Props> = (props) => {
  return props.open ? (
    <>
      <div className={cx(styles.overlay)}>
        <Spinner
          width={'w-20'}
          height={'h-20'}
        />
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : <></>;
};

export default SpinnerScreen;
