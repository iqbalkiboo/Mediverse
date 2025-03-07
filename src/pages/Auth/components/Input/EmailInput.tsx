import React, {lazy, useState} from 'react';
import {emailIcon} from '@/assets/images';
import './Input.css';
import cx from 'classnames';
const AlertInput = lazy(() => import('./AlertInput'));

interface Props {
  label: string,
}

const EmailInput: React.FC<Props> = (props) => {
  const [isEmail, setIsEmail] = useState(true);
  const changeHandler = (e:any) => {
    const pattren = /@/;
    setIsEmail(pattren.test(e.target.value));
  };
  return (
    <div className={cx('flex flex-col')}>
      <label
        className={cx('mt-6 font-medium')}
        htmlFor="password">{props.label}</label>
      <div className={cx('input__contianer',
          {
            'border-red-600 border-[1px]': !isEmail,
          })}>
        <div className={cx('iconInput')}>
          <img className={cx('h-6 w-6')} src={emailIcon}/>
        </div>
        <input
          onInput={changeHandler}
          className={cx('input')}
          placeholder='Masukkan email'
          type="email"
          name="email"
          id="email" />
      </div>
      {isEmail ?
        <></> : <AlertInput text='Input Harus Email'/>}
    </div>
  );
};

export default EmailInput;
