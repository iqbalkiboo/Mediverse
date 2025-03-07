import React from 'react';
import cx from 'classnames';

type IRadioButtonProps = {
  id?: string;
  name?: string;
  label: string;
  checked: boolean;
  htmlFor?: string;
  disabled?: boolean;
  value: string | number;
  containerClass?: string;
  customClassName?: string;
  onChange: ({ target }: any) => void;
  onClick: ({ target }: any) => void;
};

const RadioButton = ({
  name,
  id,
  value,
  checked,
  onChange,
  htmlFor,
  label = 'Label',
  disabled = false,
  containerClass,
  customClassName,
  onClick,
}: IRadioButtonProps) => {
  return (
    <div
      className={cx('flex items-center gap-2', containerClass)}
      onClick={onClick}
    >
      <input
        type='radio'
        name={name}
        id={id}
        value={value}
        className={cx('accent-primary', customClassName)}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  );
};

RadioButton.defaultProps = {
  onClick: () => {},
  onChange: () => {},
};

export default RadioButton;
