import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {
  CheckOneIcon,
  ChevronDownIcon,
  TrashBigIcon,
} from '@/src/assets/images/svg';
import Button from '@/components/Button/Button';

const ButtonActive = () => {
  const [state, setState] = useState({
    activeTab: 'information',
    isOpenButton: false,
    showEditPharmacy: false,
  });

  const handleClick = (e) => {
    if (
      !e.target.closest('.dropdown__active') && state.isOpenButton
    ) {
      setState({
        ...state,
        isOpenButton: !state.isOpenButton,
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className={cx('dropdown__active')}>
      <div data-testid="button-active">
        <Button
          onClick={() => {
            setState({
              ...state,
              isOpenButton: !state.isOpenButton,
            });
          }}
          text='Aktif'
          iconButton={ChevronDownIcon}
          class='outline'
          suffixIcon={true}
          customClassName='!w-28'
        />
      </div>
      {state.isOpenButton && (
        <div className={cx('container__dropdown')}>
          <ul className={cx('text-left')}>
            <li
              className={cx('wrapper__dropdown')}
              onClick={() => {
                setState({
                  ...state,
                  isOpenButton: !state.isOpenButton,
                });
              }}
            >
              <div className={cx('w-1/4')}>
                <div>
                  <CheckOneIcon />
                </div>
              </div>
              <p>Aktif</p>
            </li>
            <li
              className={cx('wrapper__dropdown')}
              onClick={() => {
                setState({
                  ...state,
                  isOpenButton: !state.isOpenButton,
                });
              }}
            >
              <div className={cx('w-1/4')}>
                <div>
                  <CheckOneIcon />
                </div>
              </div>
              <p>Non Aktif</p>
            </li>
            <li
              className={cx('wrapper__dropdown')}
              onClick={() => {
                setState({
                  ...state,
                  isOpenButton: !state.isOpenButton,
                });
              }}
            >
              <div className={cx('w-1/4')}>
                <div>
                  <TrashBigIcon />
                </div>
              </div>
              <p>Hapus Data</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ButtonActive;
