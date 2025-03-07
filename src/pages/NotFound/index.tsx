import cx from 'classnames';

import { Typography } from '@/src/components';

import BgNotFound from '@/assets/images/bg-not-found.png';

const NotFound = () => {
  return (
    <div className={cx('w-full min-h-screen overflow-hidden flex flex-col')}>
      <div className={cx('flex justify-center items-center grow')}>
        <div className={cx('w-[405px] flex flex-col items-center')}>
          {/* Header */}
          <img
            src={BgNotFound}
            alt={'bg-not-found'}
            className={cx('w-80 h-80')}
          />
          <div className={cx('text-center')}>
            <Typography
              variant='xh3'
              color=''
              customClass='text-[32px] text-primary mb-4'
            >
              Halaman Tidak Ditemukan
            </Typography>
            <Typography
              variant='bodyBase'
              color=''
              customClass='text-grayTertiary'
            >
              Maaf...Halaman yang Anda inginkan tidak dapat ditemukan.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
