import cx from 'classnames';

import { Button, Modal, Typography } from '@/src/components/';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface ModalConfirmationProps {
  isOpen: boolean;
  title: string;
  description?: string;
  cancelText?: string;
  submitText?: string;
  isLoadingSubmit?: boolean;
  disableButtonSubmit?: boolean;
  onSubmit?: () => void;
  onCancel: () => void;
  children?: any;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  isOpen,
  isLoadingSubmit = false,
  title,
  description,
  cancelText = 'Batal',
  submitText = 'Oke',
  disableButtonSubmit = false,
  onSubmit,
  onCancel,
  children,
}) => {
  const { isMobile } = useWindowSize();

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      style={`${isMobile ? 'w-[320px]' : 'w-[405px]'} ${
        children || isMobile ? 'h-auto' : 'h-56'
      }`}
      title={title}
    >
      <div
        className={cx(
          'h-full flex flex-col justify-between',
          children ? '' : 'items-center'
        )}
      >
        <div
          className={cx(
            'flex flex-col',
            children ? 'mt-8 mb-6' : 'text-center mt-12',
            {
              'mb-6': isMobile,
            }
          )}
        >
          <Typography variant='bodyBase' color='' customClass='text-center'>
            {description}
          </Typography>

          {children}
        </div>

        <div
          className={cx('flex gap-x-4 w-full flex-end justify-end', {
            'flex-col-reverse gap-2': isMobile,
          })}
        >
          {onCancel && (
            <div className='w-full'>
              <Button
                class='outline'
                size='sm'
                text={cancelText}
                onClick={onCancel}
              />
            </div>
          )}
          {onSubmit && (
            <div className='w-full'>
              <Button
                class='primary'
                size='sm'
                text={submitText}
                loading={isLoadingSubmit}
                disabled={disableButtonSubmit}
                onClick={onSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmation;
