import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import cx from 'classnames';

import { AlertIcon } from '@/src/assets/images/svg';
import { Typography } from '@/src/components';
import { Badges } from '@/components/index';

import '@/src/components/TextInput/TextInput.css';

import type { ReactNode } from 'react';

interface TextInputProps {
  alwaysShowMask?: any;
  backgroundColor?: any;
  beforeMaskedStateChange?: any;
  className?: string;
  containerStyle?: any;
  customClassName?: string;
  defaultValue?: any;
  disabled?: boolean;
  disabledLeft?: boolean;
  disabledRight?: boolean;
  errorMessage?: string;
  getValueMulti?: any;
  iconRightStyle?: string;
  inputRef?: any;
  isValid?: boolean;
  label?: string | ReactNode;
  labelBold?: boolean;
  labelRow?: any;
  leftIcon?: any;
  mask?: any;
  maskchar?: any;
  maskChar?: any;
  maskPlaceholder?: any;
  max?: any;
  min?: any;
  name?: string;
  onChange?: any;
  onClickLeft?: any;
  onClickRight?: any;
  onInput?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  onFocus?: any;
  onBlur?: any;
  placeholder?: string;
  register?: any;
  required?: boolean;
  rightIcon?: any;
  rows?: number;
  size?: string;
  styleInput?: string;
  type?: string;
  value?: any;
  key?: string;
  id?: string;
  trailingText?: string;
  customClassBadge?: string;
  customTextBadge?: string;
  customStyle?: React.CSSProperties;
}

const Input = (props: TextInputProps) => {
  return (
    <>
      <input
        id={props.id}
        key={props.key}
        ref={props.inputRef}
        onKeyUp={props.onKeyUp}
        onKeyDown={props.onKeyDown}
        min={props.min}
        max={props.max}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name || 'input'}
        value={props.value}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        type={props.type || 'text'}
        onInput={props.onInput}
        {...props.register(props.name, {
          required: props.required,
        })}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onWheel={(event) => event.currentTarget.blur()}
        style={{
          backgroundColor:
            props.disabled && !props.backgroundColor && '#F5F5F5',
        }}
        className={cx(
          `
            w-full focus:outline-none
            text__input ${props.styleInput} ${props.backgroundColor}`
        )}
      />
      {props.trailingText && (
        <div className='ml-2'>
          <p>{props.trailingText}</p>
        </div>
      )}
    </>
  );
};

const TextArea = (props: TextInputProps) => {
  return (
    <textarea
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className={cx(
        'shadow-sm px-4 py-3 bg-white block w-full border border-gray-300 rounded-md',
        'sm:text-sm',
        props.customClassName,
        props.rows ? '' : 'h-40',
        {
          'border-1 border-red-500': props.isValid === false,
          'bg-whiteNeutral': props.disabled && !props.backgroundColor,
          'bg-white': !props.disabled && !props.backgroundColor,
        }
      )}
      onInput={props.onInput}
      {...props.register(props.name, {
        required: props.required,
      })}
      defaultValue={props.defaultValue}
      rows={props.rows}
      placeholder={props.placeholder}
      disabled={props.disabled}
      style={props.customStyle}
    />
  );
};

const InputMsk = (props: TextInputProps) => {
  return (
    <InputMask
      maskPlaceholder={' '}
      maskchar={props.maskchar}
      alwaysShowMask={false}
      beforeMaskedStateChange={props.beforeMaskedStateChange}
      mask={props.mask}
      onKeyUp={props.onKeyUp}
      onChange={props.onChange}
      placeholder={props.placeholder}
      name={props.name || 'input'}
      value={props.value}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      type={props.type || 'text'}
      onInput={props.onInput}
      {...props.register(props.name, {
        required: props.required,
      })}
      className={cx(
        `
            w-full focus:outline-none
            text__input ${props.styleInput}`,
        {
          '': props.isValid,
          'bg-whiteNeutral': props.disabled,
          'bg-white': !props.disabled,
        }
      )}
    />
  );
};

const InputMulti = (props: TextInputProps) => {
  const [state, setState] = useState<any>(props.defaultValue || []);

  useEffect(() => {
    if (props.type === 'multi') props.getValueMulti(state);
  }, [state]);

  useEffect(() => {
    if (props?.defaultValue) setState(props.defaultValue);
  }, [props?.defaultValue]);

  const checkInput = (e) => {
    const value = e.target.value.trim();
    if (e.keyCode === 13 && value) {
      setState([...state, value]);
      e.target.value = '';
    }
  };

  const removeState = (index) => {
    const newArray = state.filter((item) => {
      return state.indexOf(item) !== index;
    });
    setState(newArray);
  };

  return (
    <div
      className={cx('w-full flex flex-wrap gap-y-2')}
      data-testid='test-text-input-close'
    >
      {state.map((e, idx) => {
        return (
          <Badges
            customClassName={cx(
              `border-1  min-w-fit ${props.customClassBadge}`
            )}
            customClassText={props.customTextBadge}
            key={idx}
            message={e}
            disabled={props.disabled}
            onClose={() => {
              removeState(idx);
            }}
          />
        );
      })}
      {!props.disabled && (
        <input
          ref={props.inputRef}
          className={cx('focus:outline-none flex-1')}
          type='text'
          onKeyDown={checkInput}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      )}
    </div>
  );
};

const TextInput: React.FC<TextInputProps> = (props) => {
  const LeftIcon = props.leftIcon;
  const RightIcon = props.rightIcon;

  const renderInput = () => {
    switch (props.type) {
      case 'input-mask':
        return <InputMsk inputRef={props.inputRef} {...props} />;
      case 'multi':
        return <InputMulti {...props} />;
      default:
        return <Input {...props} />;
    }
  };

  return (
    <div className={cx('w-full', props.customClassName)}>
      {props.label && (
        <div className={cx('mb-2 flex')}>
          <Typography variant={props.labelBold ? 'h4' : 'bodySmall'} color=''>
            {props.label}
          </Typography>
          {props.required && (
            <Typography
              variant={props.labelBold ? 'h4' : 'bodySmall'}
              color='text-danger'
            >
              *
            </Typography>
          )}
        </div>
      )}
      {props.labelRow && (
        <div className={cx('flex min-w-56 w-56 justify-between items-center')}>
          <Typography
            variant={'bodySmall'}
            color='text-grayText'
            customClass='mr-2'
          >
            {props.labelRow}
          </Typography>
          <Typography
            variant={'bodySmall'}
            color='text-grayText'
            customClass='mr-4'
          >
            :
          </Typography>
        </div>
      )}
      {props.type === 'textarea' && <TextArea {...props} />}
      {props.type !== 'textarea' && (
        <div
          className={cx(
            'container__input',
            props.containerStyle,
            props.backgroundColor,
            {
              'border-1 border-red-500': props.isValid === false,
              'rounded-full min-w-20': props.className === 'rounded',
              'rounded-lg': props.className === '',
              'bg-whiteNeutral': props.disabled && !props.backgroundColor,
              'bg-white': !props.disabled && !props.backgroundColor,
            }
          )}
        >
          {props.leftIcon && (
            <div className={cx('w-fit h-5 mr-2 flex items-center')}>
              <LeftIcon />
            </div>
          )}
          {renderInput()}
          {props.rightIcon && (
            <div
              className={cx(
                'cursor-pointer w-5 h-5 ml-2 flex items-center',
                props.iconRightStyle ?? ''
              )}
              onClick={props?.onClickRight}
            >
              <RightIcon />
            </div>
          )}
        </div>
      )}
      {props?.errorMessage && (
        <div className={cx('flex mt-2 items-center')}>
          <div className={cx('w-5 h-5 mr-1 flex items-center')}>
            <AlertIcon color='#921919' />
          </div>
          <Typography variant='bodyXSmall' color='text-danger'>
            {props.errorMessage}
          </Typography>
        </div>
      )}
    </div>
  );
};

TextInput.defaultProps = {
  register: () => {},
};

export default TextInput;
