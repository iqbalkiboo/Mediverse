import cx from 'classnames';

import { Typography } from '@/components/index';
import { CloseIcon } from '@/src/assets/images/svg';
import { orderStatus } from '@/src/utils/orderStatus';
import { reservationStatus } from '@/src/utils/reservationStatus';

import { bool, func, string } from 'prop-types';

const Badges = ({
  status,
  type = '',
  message,
  customClassName,
  onClose,
  reservation = false,
  customClassText,
  disabled,
}) => {
  return (
    <div
      className={cx(
        `${
          reservation ? reservationStatus(status) : orderStatus(status, type)
        }`,
        'flex w-auto min-w-4 px-3 py-1 mr-4 rounded-full justify-center text-center items-center',
        `${customClassName || ''}`
      )}
    >
      <Typography variant='bodyXxSmall' color={customClassText}>
        {message}
      </Typography>
      {!disabled && onClose && (
        <div
          data-testid='test-icon-close'
          onClick={onClose}
          className={cx('cursor-pointer')}
        >
          <CloseIcon color='#0D1C2E' />
        </div>
      )}
    </div>
  );
};

Badges.propTypes = {
  status: string,
  type: string,
  message: string,
  customClassName: string,
  onClose: func,
  reservation: bool,
  customClassText: string,
  disabled: bool,
};

export default Badges;
