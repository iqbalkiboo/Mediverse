import React from 'react';
import cx from 'classnames';
import CreatableSelect from 'react-select/creatable';
import {AlertIcon} from '@/src/assets/images/svg';

type ISelectBoxCreatable = {
  value?:any,
  name?: string,
  options?: any,
  label?: string,
  inputRef?: any,
  handleChange: any,
  required?: boolean,
  placeholder: string,
  errorMessage?: string,
  handleInputChange: any,
  disable: boolean,
}

const SelectBoxCreatable = ({
  name,
  label,
  value,
  options,
  required,
  inputRef,
  placeholder,
  handleChange,
  errorMessage,
  handleInputChange,
  disable,
}: ISelectBoxCreatable) => {
  return (
    <>
      {label && (
        <div className={cx('mb-2')}>
          {label}
          {required && <span className={cx('text-danger')}>*</span>}
        </div>
      )}
      <CreatableSelect
        isClearable
        name={name}
        value={value}
        isDisabled={disable}
        ref={inputRef}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        onInputChange={handleInputChange}
      />
      {errorMessage && (
        <div className={cx('flex mt-2 items-center')}>
          <div className={cx('w-5 h-5 mr-1 flex items-center')}>
            <AlertIcon color='#921919' />
          </div>
          <span className={cx('text-danger text-xs')}>
            {errorMessage}
          </span>
        </div>
      )}
    </>
  );
};

export default SelectBoxCreatable;
