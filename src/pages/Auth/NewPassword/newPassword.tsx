import React, {lazy} from 'react';
import cx from 'classnames';
import {
  EyeCloseIcon,
  EyeIcon,
  KeyIcon,
  SuccessIcon,
} from '@/src/assets/images/svg';

import useAuth from '@/pages/Auth/useAuth';
const Header = lazy(() => import('@/pages/Auth/components/Header/Header'));
const Modal = lazy(() => import('@/components/Modal/Modal'));

const Heading = lazy(() => import('@/src/components/Heading'));
const Button = lazy(() => import('@/src/components/Button'));
const TextInput = lazy(() => import('@/src/components/TextInput'));

const NewPassword = () => {
  const {
    handleSetNewPassword,
    newPassword,
    newPasswordValidation,
    isOpenPassword,
    setIsOpenPassword,
    isOpenRePassword,
    setIsOpenRePassword,
  } = useAuth();
  const submitHandler = () => { };

  const modal = cx(
      'bg-white',
      'w-3/12',
      'p-7',
      'rounded-md',
  );

  const ModalHeader = () => {
    return (
      <div className={cx('flex')}>
        <div className={cx('mr-2 bg-green')}>
          <SuccessIcon />
        </div>
        <Heading
          customClassName={cx('text-green-500')}
          title={'Berhasil'}
          size="2xl"
        />
      </div>
    );
  };

  return (
    <div className={cx(
        'w-full',
        'min-h-screen',
        'overflow-hidden',
        'flex flex-col',
    )}>
      <Header/>
      <div className={cx(
          'flex',
          'justify-center',
          'items-center',
          'grow',
      )}>
        <div className={cx(
            'w-1/3',
            'bg-slate-100',
            'px-24 py-16',
            'rounded-md',
        )}>
          <Heading
            title={'Buat kata Sandi Baru'}
            size="2xl"
          />
          <p className={cx('text-blackNeutral')}>
            Kata sandi baru siap di buat! <br />
            Yuk atur ulang kata sandi anda sekarang
          </p>
          <div className={cx('flex flex-col mt-8')}>
            <TextInput
              leftIcon={KeyIcon}
              rightIcon={isOpenPassword ? EyeIcon : EyeCloseIcon}
              onClickRight={() => setIsOpenPassword(!isOpenPassword)}
              value={newPassword.password}
              isValid={newPasswordValidation('password')?.status}
              errorMessage={newPasswordValidation('password')?.message }
              onChange={
                ({target}) => handleSetNewPassword(target.value, 'password')}
              label='Kata Sandi Baru'
              placeholder='Masukan Kata Sandi Baru'
              type={isOpenPassword ? 'text' : 'password'}
            />
            <TextInput
              leftIcon={KeyIcon}
              rightIcon={isOpenRePassword ? EyeIcon : EyeCloseIcon}
              onClickRight={() => setIsOpenRePassword(!isOpenRePassword)}
              value={newPassword.rePassword}
              customClassName='mt-4'
              isValid={newPasswordValidation('rePassword')?.status}
              errorMessage={newPasswordValidation('rePassword')?.message }
              onChange={
                ({target}) => handleSetNewPassword(target.value, 'rePassword')}
              label='Konfirmasi Kata Sandi'
              placeholder='Konfirmasi Sandi Baru'
              type={isOpenRePassword ? 'text' : 'password'}
            />
            <Button
              customClassName="mt-8"
              size='md'
              text='Atur Kata Sandi'
              onClick={submitHandler}
            />
          </div>
        </div>
      </div>
      <Modal
        onClose={() => {}}
        open={false}
        style={modal}
        header={<ModalHeader/>}
        footer={
          <Button
            customClassName='mt-8 w-full'
            text='Login Account'
            size='md'
            onClick={() => {}}
          />
        }>
        <p className={cx('mt-3 text-blackNeutral')}>
          Selamat! Kata sandi baru anda berhasil di buat. </p>
      </Modal>
    </div>
  );
};

export default NewPassword;
