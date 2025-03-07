import React from 'react';
import cx from 'classnames';
import {any, bool, func} from 'prop-types';

import {
  Button,
  Modal,
  TextInput,
  Typography,
  UploadImageFile,
} from '@/src/components';

import {
  ModalConfirmation,
  ModalError,
  ModalSuccess,
} from '@/src/commons';

import {useWindowSize} from '@/src/hooks/useWindowSize';
import useProfileUser from '../../useProfileUser';

const ModalEditProfileUser = ({open, setModal, data}) => {
  const {isMobile} = useWindowSize();

  const {
    data: {
      formMe,
      errorsFormMe,
    },
    method: {
      handleGetMe,
      registerFormMe,
      handleSetModal,
      handleSetFormMe,
      onHandleSubmitMe,
      handleResetFormMe,
      handleSubmitEditMe,
    },
  } = useProfileUser();

  return (
    <>
      <Modal
        open={open}
        onClose={setModal}
        style={cx(`${isMobile ? 'w-[320px]' : 'w-1/3'} overflow-auto`)}
        header={(
          <Typography variant={'h2'} color=''>Edit Profil</Typography>
        )}
      >
        <div className={cx('grid gap-4 mt-4 mb-10')}>
          <TextInput
            required
            size='sm'
            name='name'
            label='Nama'
            placeholder='Masukkan nama'
            register={registerFormMe}
            defaultValue={formMe?.form?.name || data?.name}
            isValid={errorsFormMe?.name?.message}
            errorMessage={errorsFormMe?.name?.message?.toString()}
            onInput={({target}) =>handleSetFormMe('name', target.value)}
          />

          <TextInput
            required
            size='sm'
            name='email'
            label='Email'
            placeholder='Masukan email'
            register={registerFormMe}
            defaultValue={formMe?.form?.email || data?.email}
            isValid={errorsFormMe?.email?.message}
            errorMessage={errorsFormMe?.email?.message?.toString()}
            onInput={({target}) =>handleSetFormMe('email', target.value)}
          />

          <UploadImageFile
            placeHolder={'Pilih Foto Profil'}
            label={'Foto Profil'}
            name={'photoProfile'}
            errorMessage={''}
            handleSetImage={handleSetFormMe}
            editImageUrl={data.photo_profile}
          />
        </div>
        <div className={cx('flex items-center gap-4')}>
          <Button
            size="md"
            class="secondary"
            onClick={setModal}
            customClassName="w-full"
            text={'Batal'}
          />
          <Button
            size="md"
            class="primary"
            customClassName="w-full"
            onClick={onHandleSubmitMe(() => handleSetModal('formMe', 'isConfirmation', true))}
            text={'Edit'}
          />
        </div>
      </Modal>

      {/* Modal Confirmation Update Profil */}
      <ModalConfirmation
        isOpen={formMe.isConfirmation}
        title={'Konfirmasi Update Profil'}
        isLoadingSubmit={formMe.isLoading}
        description={'Apakah anda yakin untuk mengupdate profil ini?'}
        onCancel={() => handleSetModal('formMe', 'isConfirmation', false)}
        onSubmit={() => handleSubmitEditMe()}
      />

      {/* Modal Error */}
      <ModalError
        title={'Gagal!'}
        isOpen={formMe.isError}
        description={'Gagal merubah profil'}
        onCancel={() => {
          handleSetModal('formMe', 'isError', false);
          handleSetModal('formMe', 'isConfirmation', false);
        }}
      />

      {/* Modal Success */}
      <ModalSuccess
        title={'Sukses!'}
        isOpen={formMe.isSuccess}
        description={'Sukses merubah profil'}
        onCancel={() => {
          handleResetFormMe();
          handleSetModal('formMe', 'isOpen', false);
          handleSetModal('formMe', 'isSuccess', false);
          handleSetModal('formMe', 'isConfirmation', false);
          handleGetMe();
        }}
      />
    </>
  );
};

ModalEditProfileUser.propTypes = {
  open: bool,
  setModal: func,
  data: any,
};

export default ModalEditProfileUser;
