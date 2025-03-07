import React from 'react';
import cx from 'classnames';

import {
  Button,
  Modal,
  TextInput,
  Typography,
} from '@/src/components';

import {
  ModalConfirmation,
  ModalError,
  ModalSuccess,
} from '@/src/commons';

import {
  EyeCloseIcon,
  EyeIcon,
} from '@/src/assets/images/svg';

import {useWindowSize} from '@/src/hooks/useWindowSize';
import useProfileUser from '@/src/pages/Home/MasterProfile/ProfileUser/useProfileUser';

type Props = {
  open: boolean,
  setModal: any,
}

const ModalChangePassword = (props: Props) => {
  const {isMobile} = useWindowSize();

  const {
    data: {
      isOpenOldPassword,
      isOpenNewPassword,
      formChangePassword,
      errorsFormChangePassword,
      isOpenConfirmationNewPassword,
    },
    method: {
      handleSetModal,
      resetChangePassword,
      handleSetOpenPassword,
      registerFormChangePassword,
      handleSubmitChangePassword,
      handleSetFormChangePassword,
      onHandleSubmitChangePassword,
      handleResetFormChangePassword,
    },
  } = useProfileUser();

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.setModal}
        style={cx(`${isMobile ? 'w-[320px]' : 'w-1/3'} overflow-auto`)}
        header={(
          <Typography variant={'h2'} color=''>Ubah Password</Typography>
        )}
      >
        <div className={cx('flex flex-col gap-4 mt-4')}>
          {/* Old Password*/}
          <div>
            <TextInput
              size="sm"
              isValid={true}
              name='oldPassword'
              label='Kata Sandi Lama'
              type={isOpenOldPassword ? 'text' : 'password'}
              placeholder='Masukan kata sandi lama'
              register={registerFormChangePassword}
              onInput={({target}) => handleSetFormChangePassword('oldPassword', target.value)}
              onClickRight={() => handleSetOpenPassword('isOpenOldPassword', !isOpenOldPassword)}
              rightIcon={isOpenOldPassword ? EyeIcon : EyeCloseIcon}
              errorMessage={errorsFormChangePassword.oldPassword?.message?.toString()}
            />
          </div>

          {/* Edit New Password*/}
          <div>
            <TextInput
              size="sm"
              isValid={true}
              name='newPassword'
              label='Kata Sandi Baru'
              type={isOpenNewPassword ? 'text' : 'password'}
              placeholder='Masukan kata sandi baru'
              register={registerFormChangePassword}
              onInput={({target}) => handleSetFormChangePassword('newPassword', target.value)}
              onClickRight={() => handleSetOpenPassword('isOpenNewPassword', !isOpenNewPassword)}
              rightIcon={isOpenNewPassword ? EyeIcon : EyeCloseIcon}
              errorMessage={errorsFormChangePassword.newPassword?.message?.toString()}
            />
          </div>

          {/* Edit Confirmation New Password*/}
          <div>
            <TextInput
              size="sm"
              isValid={true}
              name='confirmPassword'
              label='Konfirmasi Kata Sandi Baru'
              type={isOpenConfirmationNewPassword ? 'text' : 'password'}
              placeholder='Masukan konfirmasi kata sandi baru'
              register={registerFormChangePassword}
              onInput={({target}) => handleSetFormChangePassword('confirmationNewPassword', target.value)}
              onClickRight={() => {
                handleSetOpenPassword('isOpenConfirmationNewPassword', !isOpenConfirmationNewPassword);
              }}
              rightIcon={isOpenConfirmationNewPassword ? EyeIcon : EyeCloseIcon}
              errorMessage={errorsFormChangePassword.confirmPassword?.message?.toString()}
            />
          </div>

          <div className={cx('flex items-center gap-4')}>
            <Button
              size="md"
              class="secondary"
              onClick={props.setModal}
              customClassName="w-full"
              text={'Batal'}
            />
            <Button
              size="md"
              text={'Ubah'}
              class="primary"
              customClassName="w-full"
              onClick={onHandleSubmitChangePassword(() => {
                handleSetModal('formChangePassword', 'isConfirmation', true);
              })}
              disabled={
                !(formChangePassword.form.newPassword === formChangePassword.form.confirmationNewPassword) ||
                (!formChangePassword.form.newPassword && !formChangePassword.form.confirmationNewPassword)
              }
            />
          </div>
        </div>
      </Modal>

      {/* Modal Confirmation */}
      <ModalConfirmation
        title={'Ubah Password'}
        isOpen={formChangePassword.isConfirmation}
        description={'Anda yakin merubah Password?'}
        isLoadingSubmit={formChangePassword.isLoading}
        onCancel={() => handleSetModal('formChangePassword', 'isConfirmation', false)}
        onSubmit={() => handleSubmitChangePassword()}
      />

      {/* Modal Error */}
      <ModalError
        title={'Gagal!'}
        isOpen={formChangePassword.isError}
        description={formChangePassword.errorMessage}
        onCancel={() => {
          handleSetModal('formChangePassword', 'isError', false);
          handleSetModal('formChangePassword', 'isConfirmation', false);
        }}
      />

      {/* Modal Success */}
      <ModalSuccess
        title={'Sukses!'}
        isOpen={formChangePassword.isSuccess}
        description={'Sukses merubah password'}
        onCancel={() => {
          resetChangePassword();
          handleResetFormChangePassword();
          handleSetModal('formChangePassword', 'isOpen', false);
          handleSetModal('formChangePassword', 'isSuccess', false);
          handleSetModal('formChangePassword', 'isConfirmation', false);
        }}
      />
    </>
  );
};

export default ModalChangePassword;
