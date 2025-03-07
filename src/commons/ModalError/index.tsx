import React from 'react';
import {
  Button,
  Modal,
  Typography,
} from '@/src/components/';

import {
  bool,
  func,
  string,
} from 'prop-types';
import cx from 'classnames';
import {modalErrorIcon} from '@/src/assets/images';

import {useWindowSize} from '@/src/hooks/useWindowSize';

const ModalError = ({
  title,
  description,
  isOpen,
  onCancel,
  isLoading,
  closeIcon = true,
  buttonText = 'Oke',
}) => {
  const {isMobile} = useWindowSize();

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      style={`${isMobile ? 'w-[320px]' : 'w-1/4'} h-70 p-6`}
      closeIcon={closeIcon}
    >
      <div className={cx('flex flex-col justify-center items-center')}>
        <div className={cx('w-[120px] h-[120px]')}>
          <img src={modalErrorIcon} alt="" />
        </div>
        <div className={cx('mt-2 text-center')}>
          <Typography variant={'subtitle4'} color=''>
            {title ? title : 'Gagal!'}
          </Typography>
          <div className={cx('mt-1')}>
            <Typography variant={'bodySmall'} color='text-gray-500'>
              {description}
            </Typography>
          </div>
        </div>
        <div className={cx('flex w-full flex-end justify-end mt-8')}>
          <div className={cx('w-full')}>
            <Button
              class='primary'
              text={isLoading ? 'Loading' : buttonText}
              size='sm'
              onClick={onCancel}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalError.propTypes = {
  title: string,
  description: string,
  isOpen: bool,
  onCancel: func,
  isLoading: bool,
  closeIcon: bool,
  buttonText: string,
};


export default ModalError;
