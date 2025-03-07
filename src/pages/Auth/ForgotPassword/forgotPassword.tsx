import React, {useEffect} from 'react';
import cx from 'classnames';
import {Link} from 'react-router-dom';

import {
  Button,
  TextInput,
  Typography,
} from '@/src/components';

import {
  ModalError,
  ModalSuccess,
} from '@/src/commons';

import Header from '@/pages/Auth/components/Header/Header';

import {
  ArrowLeftIcon,
  MailIcon,
} from '@/src/assets/images/svg';

import useAuth from '@/pages/Auth/useAuth';
import {useNavigate} from 'react-router-dom';
import {useWindowSize} from '@/src/hooks/useWindowSize';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {isMobile} = useWindowSize();

  const {
    forgot,
    handleSetForgotEmail,
    handleForgotPassword,
    handleResetForgotPassword,
    handleResetForgotStatus,
  } = useAuth();

  useEffect(() => {
    return () => {
      handleResetForgotPassword();
    };
  }, []);

  return (
    <div className={cx('w-full min-h-screen overflow-hidden flex flex-col')}>
      <Header/>

      <div className={cx('flex justify-center items-center grow')}>
        <div className={cx({
          'px-5': isMobile,
          'w-[550px] bg-electricPurpleSecondary px-24 py-16 rounded-3xl': !isMobile,
        })}>
          <div className={cx({
            'mb-8': isMobile,
            'mb-14': !isMobile,
          })}>
            <Typography variant={isMobile ? 'h1' : 'xh3'} color='' customClass='mb-2'>
              Atur Kata Sandi
            </Typography>
            <Typography
              variant={isMobile ? 'bodySmall' : 'bodyBase'}
              color='text-[#6C6866]'
              customClass={`${isMobile ? 'font-medium' : 'font-bold'}`}
            >
              Masukkan alamat email Anda. Kami akan mengirimkan link ke email untuk mengatur ulang kata sandi
            </Typography>
          </div>

          <div className={ cx('mb-10')}>
            <TextInput
              required
              label='Email'
              placeholder='Masukkan Email'
              leftIcon={MailIcon}
              isValid={!forgot.validation}
              errorMessage={
                forgot.validation ?
                'email yang anda masukkan belum sesuai' : ''
              }
              onChange={({target}) => handleSetForgotEmail(target.value)}
            />
          </div>

          <div className={cx('flex justify-center mb-8')}>
            <div className={cx({
              'w-full': isMobile,
              'w-[230px]': !isMobile,
            })}>
              <Button
                text='Kirim ke Email'
                loading={forgot.isLoading}
                disabled={forgot.validation || !forgot.email}
                onClick={() => handleForgotPassword()}
              />
            </div>
          </div>

          <div className={cx('flex justify-center')}>
            <Link to='/login'>
              <div className={cx('flex items-center gap-4')}>
                <ArrowLeftIcon />
                <Typography variant='bodySmall' color='' customClass='font-semibold'>
                  Kembali
                </Typography>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Modal Success Reset Password */}
      <ModalSuccess
        isOpen={forgot.isSuccess}
        description={'Cek email untuk malakukan reset password'}
        onCancel={() => {
          handleResetForgotStatus();
          navigate('/login');
        }}
      />
      {/* Modal Error Reset Password */}
      <ModalError
        isOpen={forgot.isError}
        onCancel={handleResetForgotStatus}
      />
    </div>
  );
};

export default ForgotPassword;
