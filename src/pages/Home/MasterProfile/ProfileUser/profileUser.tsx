import { useEffect } from 'react';
import cx from 'classnames';

import {
  Avatar,
  Breadcrumb,
  Button,
  ButtonBack,
  Card,
  TextInput,
  Typography,
} from '@/src/components';
import { SpinnerScreen } from '@/src/commons';
import { ModalChangePassword, ModalEditProfileUser } from './components';
import { EditIcon, KeyOffIcon } from '@/src/assets/images/svg';
import { USER_ROLES } from '@/src/constants';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import useProfileUser from './useProfileUser';
import cookieUtils from '@/src/utils/cookieUtils';

const detailUser = await cookieUtils.getUser();
const { role } = (await cookieUtils.getPermission()) || {
  role: {},
};

const ProfileUser = () => {
  const { isMobile } = useWindowSize();

  const {
    data: { me, formMe, formChangePassword, DATA_DETAIL_PROFILE_USER },
    method: { handleGetMe, handleSetModal },
  } = useProfileUser();

  useEffect(() => {
    handleGetMe();
  }, []);

  const pathBackButton = (role) => {
    if (role.toLowerCase() === USER_ROLES.ADMIN_PASIEN.toLowerCase()) {
      return '/front-office';
    } else if (role.toLowerCase() === USER_ROLES.DOKTER.toLowerCase()) {
      return '/doctors?tab=scheduled';
    } else {
      return '/';
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <SpinnerScreen open={me.isLoading} />

      <ModalEditProfileUser
        open={formMe.isOpen}
        setModal={() => handleSetModal('formMe', 'isOpen', false)}
        data={DATA_DETAIL_PROFILE_USER}
      />

      <ModalChangePassword
        open={formChangePassword.isOpen}
        setModal={() => handleSetModal('formChangePassword', 'isOpen', false)}
      />

      {/* Breadcrumb */}
      <div className={cx('flex justify-between mb-2')}>
        <Breadcrumb />
        {!isMobile && <ButtonBack path={pathBackButton(role?.name)} />}
      </div>

      {/* Header */}
      <div className={cx('mb-4')}>
        <Typography
          variant={isMobile ? 'bodyBase' : 'h1'}
          color=''
          customClass={`text-primary ${isMobile && 'font-bold'}`}
        >
          Profile Pengguna
        </Typography>
      </div>

      {/* Content */}
      <Card padding={isMobile ? 'p-0' : 'p-4'}>
        <div
          className={cx('flex justify-between items-center', {
            'mb-[18px]': isMobile,
            'mb-6': !isMobile,
          })}
        >
          <div className={cx('flex items-center gap-3')}>
            <div>
              <Avatar
                text={DATA_DETAIL_PROFILE_USER.name}
                img={DATA_DETAIL_PROFILE_USER.photo_profile}
                size={isMobile ? 'sm' : 'lg'}
              />
            </div>
            <div>
              <Typography
                variant={isMobile ? 'h4' : 'subtitle1'}
                color=''
                customClass='mb-2'
              >
                {DATA_DETAIL_PROFILE_USER.name}
              </Typography>
              <Typography
                variant={isMobile ? 'bodyXSmall' : 'bodySmall'}
                color='text-grayTertiary'
              >
                {role?.name}
              </Typography>
            </div>
          </div>
          <div>
            <Button
              text={isMobile ? '' : 'Edit Profile'}
              iconButton={EditIcon}
              class={cx('primary')}
              customClassIcon={'mr-0 px-1'}
              customClassName={cx(isMobile ? 'text-center' : '!w-[263px]')}
              onClick={() => handleSetModal('formMe', 'isOpen', true)}
            />
          </div>
        </div>

        {/* Profile User */}
        <Card
          background='bg-graySeptenary'
          padding='p-4'
          customClassName='grid gap-[10px] mb-6'
        >
          {/* Name */}
          <div
            className={cx('flex gap-2', {
              'flex-col': isMobile,
              'items-center': !isMobile,
            })}
          >
            <div className={cx('w-36 flex justify-between items-center')}>
              <Typography variant='bodySmall' color='text-[#757575]'>
                Nama
              </Typography>
              {!isMobile && <span>:</span>}
            </div>
            <div className={cx('w-full')}>
              <TextInput value={DATA_DETAIL_PROFILE_USER.name} disabled />
            </div>
          </div>

          {/* Email */}
          <div
            className={cx('flex gap-2', {
              'flex-col': isMobile,
              'items-center': !isMobile,
            })}
          >
            <div className={cx('w-36 flex justify-between items-center')}>
              <Typography variant='bodySmall' color='text-[#757575]'>
                Email
              </Typography>
              {!isMobile && <span>:</span>}
            </div>
            <div className={cx('w-full')}>
              <TextInput value={DATA_DETAIL_PROFILE_USER.email} disabled />
            </div>
          </div>

          {/* Provider */}
          <div
            className={cx('flex gap-2', {
              'flex-col': isMobile,
              'items-center': !isMobile,
            })}
          >
            <div className={cx('w-36 flex justify-between items-center')}>
              <Typography variant='bodySmall' color='text-[#757575]'>
                Provider
              </Typography>
              {!isMobile && <span>:</span>}
            </div>
            <div className={cx('w-full')}>
              <TextInput value={detailUser?.provider_name || '-'} disabled />
            </div>
          </div>

          {/* Provider Branch */}
          <div
            className={cx('flex gap-2', {
              'flex-col': isMobile,
              'items-center': !isMobile,
            })}
          >
            <div className={cx('w-36 flex justify-between items-center')}>
              <Typography variant='bodySmall' color='text-[#757575]'>
                Cabang Provider
              </Typography>
              {!isMobile && <span>:</span>}
            </div>
            <div className={cx('w-full')}>
              <TextInput value={detailUser?.outlet_name} disabled />
            </div>
          </div>

          {/* Role */}
          <div
            className={cx('flex gap-2', {
              'flex-col': isMobile,
              'items-center': !isMobile,
            })}
          >
            <div className={cx('w-36 flex justify-between items-center')}>
              <Typography variant='bodySmall' color='text-[#757575]'>
                Role
              </Typography>
              {!isMobile && <span>:</span>}
            </div>
            <div className={cx('w-full')}>
              <TextInput value={role?.name} disabled />
            </div>
          </div>

          {/* Service */}
          <div
            className={cx('flex gap-2', {
              'flex-col': isMobile,
              'items-center': !isMobile,
            })}
          >
            <div className={cx('w-36 flex justify-between items-center')}>
              <Typography variant='bodySmall' color='text-[#757575]'>
                Layanan
              </Typography>
              <span>:</span>
            </div>
            <div className={cx('w-full')}>
              <TextInput
                placeholder='Masukkan Layanan'
                name='service'
                value={DATA_DETAIL_PROFILE_USER.service}
                isValid={true}
                required={true}
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        </Card>

        <Button
          text='UBAH KATA SANDI'
          iconButton={KeyOffIcon}
          customClassName={cx(isMobile ? 'w-full' : '!w-[308px]')}
          onClick={() => handleSetModal('formChangePassword', 'isOpen', true)}
        />
      </Card>
    </>
  );
};

export default ProfileUser;
