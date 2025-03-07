/* eslint-disable max-len */
import React from 'react';
import cx from 'classnames';
import '@/src/components/ToastNotif/ToastNotif.css';
import {NotifMediverseIcon} from '@/src/assets/images/svg';
import Typography from '@/src/components/Typography';
import {useWindowSize} from '@/src/hooks/useWindowSize';

interface Props {
  title: string,
  description: string,
  isOpen: boolean,
  time: string,
  onClick?: () => void;
}

const ToastNotif = (props: Props) => {
  const {isMobile} = useWindowSize();
  return (
    <div className={cx({'container__notif': !isMobile},
        {'container__notif__mobile': isMobile},
        {'notif__fade': props.isOpen})}
    // TODO: Handle when integration
    onClick={props.onClick}
    >
      <div className={cx('flex justify-between mb-3')}>
        {/* notification image */}
        <div className={cx('flex gap-x-2 items-center')}>
          <NotifMediverseIcon />
          <Typography variant={'h4'} color=''>Mediverse</Typography>
          <span className={cx('elipse')}></span>
          <Typography variant={'bodyXSmall'} color={'text[#696F7A]'}>{props.time}</Typography>
        </div>
      </div>
      <div>
        <Typography variant={isMobile ? 'h5' : 'h3'} color=''>
          {props.title}
        </Typography>
        <Typography variant={isMobile ? 'bodyXxSmall' : 'bodySmall'} color='' customClass='truncate'>
          {props.description}
        </Typography>
      </div>
    </div>
  );
};


export default ToastNotif;
