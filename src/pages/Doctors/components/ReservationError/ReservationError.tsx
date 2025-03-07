import cx from 'classnames';

import { Typography } from '@/src/components';
import { reservationError } from '@/assets/images/index';

import { string } from 'prop-types';

const ReservationError = ({ size }) => {
  return (
    <div
      className={cx(
        'flex flex-col justify-center items-center px-4 pb-4 h-auto w-full bg-white rounded-b-lg'
      )}
    >
      <img
        src={reservationError}
        className={cx(
          size === 'sm' ? 'w-[110px] h-[110px]' : 'w-[341px] h-[341px]'
        )}
      />
      <Typography
        variant={`${size === 'sm' ? 'h4' : 'h1'}`}
        color='text-[#E5000C]'
      >
        Terjadi Kesalahan
      </Typography>
      <Typography
        variant={`${size === 'sm' ? 'bodyXSmall' : 'subtitle2'}`}
        color='text-[#9E9E9E]'
        customClass={cx('mt-1')}
      >
        Silahkan refresh halaman kembali
      </Typography>
    </div>
  );
};

ReservationError.propTypes = {
  size: string,
};

export default ReservationError;
