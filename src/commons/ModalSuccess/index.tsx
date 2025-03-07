import cx from 'classnames';

import { Button, Modal, Typography } from '@/src/components/';
import { modalSuccessIcon } from '@/src/assets/images';
import { useWindowSize } from '@/src/hooks/useWindowSize';

import { bool, func, string } from 'prop-types';

const ModalSuccess = ({
  title,
  description,
  isOpen,
  onCancel,
  closeIcon = true,
}) => {
  const { isMobile } = useWindowSize();

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      style={`${isMobile ? 'w-[320px]' : 'w-1/4'} h-70 p-6`}
      closeIcon={closeIcon}
    >
      <div className={cx('flex flex-col justify-center items-center')}>
        <div className={cx('w-[120px] h-[120px]')}>
          <img src={modalSuccessIcon} />
        </div>
        <div className={cx('mt-2 text-center')}>
          <Typography variant={'subtitle4'} color=''>
            {title ? title : 'Sukses!'}
          </Typography>
          <div className={cx('mt-1')}>
            <Typography variant={'bodySmall'} color='text-gray-500'>
              {description}
            </Typography>
          </div>
        </div>
        <div className={cx('flex w-full flex-end justify-end mt-8')}>
          <div className={cx('w-full')}>
            <Button class='primary' text='Oke' size='sm' onClick={onCancel} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalSuccess.propTypes = {
  title: string,
  description: string,
  isOpen: bool,
  onSubmit: func,
  onCancel: func,
  closeIcon: bool,
};

export default ModalSuccess;
