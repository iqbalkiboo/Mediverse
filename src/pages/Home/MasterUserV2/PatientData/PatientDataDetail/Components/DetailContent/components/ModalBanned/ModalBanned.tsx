import React from 'react';
import cx from 'classnames';

import {
  ModalConfirmation,
  ModalError,
  ModalSuccess,
} from '@/src/commons';

import {
  RadioButton,
  TextInput,
} from '@/src/components';

// import useMediverseUsers from '../../../useMediverseUsers';

type ModalBannedProps = {
  id: string,
  isOpen: boolean,
}

const ModalBanned = ({id, isOpen}: ModalBannedProps) => {
  // const {
  //   data: {
  //     userBanned,
  //     reasonBannedUserOptions,
  //   },
  //   method: {
  //     handleGetDetailUser,
  //     handleSetBannedText,
  //     handlePostBannedUser,
  //     handleSetBannedReason,
  //     handleSetClearBannedUser,
  //   },
  // } = useMediverseUsers();

  return (
    <>
      <ModalSuccess
        title={'Sukses!'}
        isOpen={userBanned.isSuccess}
        description={`User berhasil ${userBanned.status === 'aktif' ? 'diaktifkan' : 'dinonaktifkan'}`}
        onCancel={() => {
          handleSetClearBannedUser();
          handleGetDetailUser(id);
        }}
      />
      <ModalError
        title={'Gagal!'}
        isOpen={userBanned.isError}
        description={`User berhasil ${userBanned.status === 'aktif' ? 'diaktifkan' : 'dinonaktifkan'}`}
        onCancel={() => {
          handleSetClearBannedUser();
          handleGetDetailUser(id);
        }}
      />
      {userBanned.status === 'nonaktif' ? (
        <ModalConfirmation
          isOpen={isOpen}
          title={'Alasan Nonaktifkan User'}
          onCancel={() => handleSetClearBannedUser()}
          onSubmit={() => handlePostBannedUser(id, false)}
          disableButtonSubmit={userBanned.reason ? false : true}
        >
          <div className={cx('grid gap-y-1')}>
            {reasonBannedUserOptions.map((item: any, index: number) => {
              return (
                <RadioButton
                  key={index}
                  id={item.id}
                  value={item.value}
                  label={item.label}
                  htmlFor={item.htmlFor}
                  checked={item.value === userBanned.reason}
                  onChange={({target}) => {
                    handleSetBannedReason(target.value);
                  }}
                />
              );
            })}
            {userBanned.reason === 'Alasan lainnya' &&
              <div className={cx('mt-3 w-full')}>
                <TextInput
                  name="reason"
                  type="textarea"
                  customClassName="h-20"
                  placeholder="Tulis disini"
                  onInput={({target}) => handleSetBannedText(target.value)}
                />
              </div>
            }
          </div>
        </ModalConfirmation>
      ) : (
        <ModalConfirmation
          isOpen={isOpen}
          title={'Aktifkan User'}
          onCancel={() => handleSetClearBannedUser()}
          onSubmit={() => handlePostBannedUser(id, true)}
          description={'Apakah anda yakin mengaktifkan user ini?'}
        />
      )}
    </>
  );
};

export default ModalBanned;
