import cx from 'classnames';

import styles from './checkbox.module.css';

interface InputCheckboxProps {
  id?: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  register?: any;
  required?: boolean;
  onChange?: (val: boolean) => void;
  onClickCheckboxes?: () => void;
  customClassName?: any;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  id,
  label,
  name,
  disabled,
  checked,
  onChange,
  register,
  required,
  onClickCheckboxes,
  customClassName,
}) => {
  const onChangeCheckboxes = (event) => {
    const isChecked = event.target.checked;
    onChange && onChange(isChecked);
  };

  const checkboxClass = disabled ? 'styles.checkbox-disabled' : styles.checkbox;

  return (
    <div className='input__checkbox'>
      <label className={cx(checkboxClass)}>
        {register && (
          <input
            id={id || 'input-checkbox'}
            type='checkbox'
            name={name}
            disabled={disabled}
            checked={checked}
            onChange={onChangeCheckboxes}
            onClick={onClickCheckboxes}
            {...register(name, {
              required: required,
            })}
            className={cx(customClassName)}
          />
        )}
        {!register && (
          <input
            id={id}
            type='checkbox'
            name={name}
            disabled={disabled}
            checked={checked}
            onChange={onChangeCheckboxes}
            className={cx(customClassName)}
          />
        )}
        {label && (
          <>
            <span className='label ml-2'>{label}</span>
            {required && <span className='label text-danger'>*</span>}
          </>
        )}
      </label>
    </div>
  );
};

export default InputCheckbox;
