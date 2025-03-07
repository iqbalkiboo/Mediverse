import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router-dom';

import {loginBackground, loginModel} from '@/assets/images';

import {
  EyeCloseIcon,
  EyeIcon,
  KeyIcon,
  LoginIcon,
  MailIcon,
} from '@/src/assets/images/svg';

import {Button, TextInput, Typography} from '@/src/components';

import {ModalConfirmation} from '@/src/commons';
import Header from '@/pages/Auth/components/Header/Header';

import './login.css';
import useAuth from '@/pages/Auth/useAuth';
import useFormAuth from '@/src/pages/Auth/useFormAuth';
import {useWindowSize} from '@/src/hooks/useWindowSize';

const Login = () => {
  const {isMobile, isDesktopWidth} = useWindowSize();

  const {isOpenPassword, setIsOpenPassword, isLoading, validation} =
    useAuth();

  const {
    register,
    handleSubmit,
    errors,
    errorMessage,
    isError,
    username,
    password,
    handleActionLogin,
    handleUsername,
    handleSetPassword,
    handleOnKeyDown,
    handleSetErrorMessage,
    isSuspenseAccount,
  } = useFormAuth();

  return (
    <>
      {/* Modal Confirmation Error Login */}
      <ModalConfirmation
        title={isSuspenseAccount ? 'Akun Anda Disuspend' : 'Akun Belum Sesuai'}
        description={
          isSuspenseAccount ?
            `Akun Anda disuspand karena melakukan pelanggaran dari ketentuan Mediverse.
         Hubungi Mediverse untuk informasi lebih lanjut.` :
            'Akun Mediverse yang Anda masukkan belum sesuai. Silahkan coba lagi.'
        }
        isOpen={errorMessage !== ''}
        onCancel={() => handleSetErrorMessage('')}
        cancelText={'Kembali'}
      />

      <div className={cx('container__login')}>
        <div className={cx('grow flex flex-col w-1/4')}>
          <Header />
          <div className={cx('container__main')}>
            <div
              className={cx('pb-14', {
                'px-5': isMobile,
                'px-10': !isMobile,
              })}
            >
              <div
                className={cx({
                  'mb-8': isMobile,
                  'mb-14': !isMobile,
                })}
              >
                <Typography
                  variant={isMobile ? 'h1' : 'xh2'}
                  color=''
                  customClass='mb-4'
                >
                  Selamat Datang
                </Typography>
                <Typography
                  variant={isMobile ? 'bodySmall' : 'bodyBase'}
                  color='text-[#6C6866]'
                  customClass={`${isMobile ? 'font-medium' : 'font-bold'}`}
                >
                  Masuk dan kelola dashboard mediverse anda sekarang.
                </Typography>
              </div>

              <div className={cx('flex flex-col gap-4 mb-4')}>
                <TextInput
                  id='email-user-input'
                  placeholder='Masukan Email'
                  label='Email'
                  labelBold
                  name='username'
                  leftIcon={MailIcon}
                  isValid={!isError || !validation.username}
                  disabled={isLoading}
                  value={username}
                  register={register}
                  onInput={({target}) => handleUsername(target.value)}
                  onKeyDown={handleOnKeyDown}
                  errorMessage={errors.username?.message?.toString()}
                />
                <TextInput
                  id='password-user-input'
                  placeholder='Masukan Kata Sandi'
                  label='Kata Sandi'
                  labelBold
                  name='password'
                  leftIcon={KeyIcon}
                  type={isOpenPassword ? 'text' : 'password'}
                  isValid={!isError || !validation.password}
                  disabled={isLoading}
                  value={password}
                  onKeyDown={handleOnKeyDown}
                  register={register}
                  onInput={({target}) => handleSetPassword(target.value)}
                  errorMessage={errors.password?.message?.toString()}
                  onClickRight={() => setIsOpenPassword(!isOpenPassword)}
                  rightIcon={isOpenPassword ? EyeIcon : EyeCloseIcon}
                />
              </div>

              <div className={cx('flex justify-end mb-10')}>
                <Link to='/forgot-password'>
                  <Typography
                    variant={'bodyXSmall'}
                    color=''
                    customClass='mb-2 font-semibold'
                  >
                    Lupa Kata Sandi?
                  </Typography>
                </Link>
              </div>

              <div>
                <Button
                  id='login-btn'
                  loading={isLoading}
                  text='Masuk Sekarang'
                  size='lg'
                  class='primary'
                  suffixIcon={true}
                  iconButton={LoginIcon}
                  disabled={!validation.isValid}
                  onClick={handleSubmit((data) => handleActionLogin(data))}
                />
              </div>
            </div>
          </div>
        </div>

        {isDesktopWidth && (
          <div className={cx('right__wraper')}>
            <div
              style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${loginBackground})`,
                backgroundRepeat: 'no-repeat',
              }}
              className={cx(
                  'rounded-md h-full justify-center',
                  'flex flex-col items-center',
              )}
            >
              <img src={loginModel} height={'10vh'} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
