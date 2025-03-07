import React, {useState} from 'react';
import {closeEyeIcon, keyIcon, openEyeIcon} from '@/assets/images';
import './Input.css';
import cx from 'classnames';
import AlertInput from './AlertInput';

interface Props {
  label: string,
  isValidate?: boolean,
  textAlert?: string,
  onInput?: any
}

const PasswordInput: React.FC<Props> = (props) => {
  const [type, setType] = useState('password');
  const visibilityPassword = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };
  const buttonClass = cx({
    'iconInput rounded-r-md pr-4 border-l-0': true,
  });
  return (
    <div className={cx('flex flex-col')}>
      <label
        className={cx('mt-6 font-medium')}
        htmlFor="password">{props.label}</label>
      <div className={cx('input__contianer', {
        'border-red-600 border-[1px]': !props.isValidate,
      })}>
        <div className={cx('iconInput')}>
          <img width={24} className={cx('font-bold')} src={keyIcon}/>
        </div>
        <input
          className='input'
          placeholder='Masukkan kata sandi'
          type={type}
          name="password"
          onInput={props.onInput}
        />
        <button
          onClick={visibilityPassword}
          className={buttonClass}>
          <img src={type === 'password' ? openEyeIcon : closeEyeIcon}/>
        </button>
      </div>
      {props.isValidate ?
      <></> : <AlertInput text={props.textAlert}/>}
    </div>
  );
};

export default PasswordInput;
