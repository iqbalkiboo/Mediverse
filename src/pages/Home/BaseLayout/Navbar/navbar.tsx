import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import cx from 'classnames';

import { Avatar, Button, Typography } from '@/src/components/';
import { ArrowDownIcon } from '@/src/assets/images/svg/';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { useNotifications } from '@/src/hooks/useNotifications';
import { userLogout } from '@/src/client/user';
import { ROUTES_NOTIFICATION, ROUTES_PROFILE } from '@/src/constants';
import LogoLgImage from '@/assets/images/logo-lg.png';
import LogoSmImage from '@/assets/images/logo-sm.png';
import NotificationIcon from '@/src/assets/images/svg/notificationIcon';
import cookieUtils from '@/src/utils/cookieUtils';

import './navbar.css';

const userDetails = await cookieUtils.getUser();
const { role } = (await cookieUtils.getPermission()) || {
  role: {},
};

interface NavbarProps {
  isCollapse: boolean;
  isOpenDrawer: boolean;
  setIsOpenDrawer: (val: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isCollapse,
  isOpenDrawer,
  setIsOpenDrawer,
}) => {
  const navigate = useNavigate();

  const { isMobile } = useWindowSize();

  const {
    data: {
      metadata,
      updateNotification,
      modalUpdateStatusMedpharm,
      excludeNotification,
    },
    method: { handleNotif, handleGetListNotification },
  } = useNotifications();

  const onLogout = async () => {
    await userLogout()
      .then(() => {
        cookieUtils.resetCookies();
        navigate('/login');
      })
      .catch((e) => console.log('error = ', e));
  };

  const onRedirectNotif = () => {
    // navigate(ROUTES_TRANSACTION.EPRESCRIPTION_ORDERS + '?tab=new');
  };

  useEffect(() => {
    // TODO: hide in role super admin and admin mediverse
    if (!isMobile && !excludeNotification.includes(role.id)) {
      handleGetListNotification();
    }
  }, [updateNotification.isSuccess, modalUpdateStatusMedpharm.isSuccess]);

  return (
    <div className={cx('navbar')}>
      {!isMobile && (
        <div
          className={cx('logo-img', 'mt-4', {
            'ml-16': isCollapse,
            'ml-4': !isCollapse,
          })}
        >
          <div onClick={() => navigate('/')} className={cx('')}>
            {isCollapse ? (
              <div className={cx('w-28')}>
                <img src={LogoLgImage} />
              </div>
            ) : (
              <img src={LogoSmImage} className={cx('img-link')} />
            )}
          </div>
        </div>
      )}

      {isMobile && (
        <div className={cx('flex justify-center items-center ml-4')}>
          <div
            className={cx('mr-4')}
            onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          >
            {!isOpenDrawer && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            )}
            {isOpenDrawer && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            )}
          </div>
          <div className={cx('mb-2')}>
            <img src={LogoLgImage} width={90} />
          </div>
        </div>
      )}

      <div className={cx('flex justify-center items-center')}>
        <div className={cx('md:relative')}>
          <input
            hidden
            type='checkbox'
            name='notification'
            id='notification'
            onClick={() => {
              isMobile
                ? navigate(ROUTES_NOTIFICATION.LIST_NOTIFICATION)
                : handleNotif();
            }}
          />
          <label
            className='relative inline-block ml-8 cursor-pointer'
            onClick={() => onRedirectNotif()}
            htmlFor='notification'
          >
            <div className='relative'>
              <div className='flex gap-x-2 items-center'>
                <div className={cx('relative')}>
                  <NotificationIcon />
                  {/*
                if has notification that not read yet, show bullets
              */}
                  {/* TODO: hide notification in role super admin and admin mediverse */}
                  {metadata.unreadCount > 0 &&
                    !excludeNotification.includes(role?.id) && (
                      <span
                        className={cx(`absolute top-1 right-0 inline-block w-2 h-2
                  transform -translate-y-1/2 bg-red-600 rounded-full`)}
                      ></span>
                    )}
                </div>
                {/* TODO: hide notification in role super admin and admin mediverse */}
                {metadata.unreadCount > 0 &&
                  !isMobile &&
                  !excludeNotification.includes(role?.id) && (
                    <div>
                      <Typography
                        variant={'xSmallMedium'}
                        color={''}
                        customClass={'font-bold'}
                      >
                        {metadata.unreadCount}
                      </Typography>
                    </div>
                  )}
              </div>
            </div>
          </label>
        </div>

        <div className={cx('navbar-body')}>
          <div className={cx('dropdown relative')}>
            <div
              className={cx(
                'p-[6px] hover:bg-[#F2F3F3] rounded-full cursor-pointer'
              )}
            >
              <div className={cx('flex gap-2 items-center')}>
                <Avatar
                  text={userDetails?.full_name}
                  img={userDetails?.profile_photo}
                  size={isMobile ? 'sm' : 'lg'}
                />
                {!isMobile && <ArrowDownIcon height='20' width='20' />}
              </div>
            </div>
            <div className={cx('dropdown-menu absolute right-0')}>
              <div className={cx('navbar-menu w-80 p-5')}>
                <div className={cx('flex flex-col items-center mb-4')}>
                  <Avatar
                    text={userDetails?.full_name}
                    img={userDetails?.profile_photo}
                    size={isMobile ? 'sm' : 'lg'}
                  />
                </div>
                <div className={cx('flex flex-col items-center mb-6')}>
                  <Typography
                    variant={'h2'}
                    color='text-blackPrimary'
                    customClass='font-bold mb-1 text-center'
                  >
                    {userDetails?.full_name}
                  </Typography>
                  <Typography
                    variant={'bodySmall'}
                    color=''
                    customClass='text-blackPrimary'
                  >
                    {role?.name}
                  </Typography>
                </div>

                <div className={cx('flex items-center gap-4')}>
                  <Button
                    size='sm'
                    text='Profile'
                    class={cx('primary')}
                    customClassName={'!rounded-md'}
                    onClick={() => navigate(ROUTES_PROFILE.PROFILE_USER)}
                  />
                  <Button
                    size='sm'
                    text='Logout'
                    class={cx('secondary')}
                    customClassName={'!rounded-md'}
                    onClick={() => onLogout()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
