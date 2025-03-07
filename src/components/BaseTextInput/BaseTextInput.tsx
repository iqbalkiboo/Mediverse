import React from 'react';
import cx from 'classnames';

import {
  Typography,
} from '@/src/components';

import {
  AlertIcon,
} from '@/src/assets/images/svg';

type IBaseInputProps = {
  label?: string,
  leftIcon?: any,
  rightIcon?: any,
  isValid?: boolean,
  isRequired?: boolean,
  isDisabled?: boolean,
  errorMessage?: string,
  styleRightIcon?: string,
  customClassName?: string,
  backgroundColor?: string,
  wrapperContainer?: string,
  wrapperTextInput?: string,
  roundedVariant?: 'rounded'
  children: React.ReactElement,
  labelVariant?: 'normal' | 'bold',
  onClickRightIcon?: () => void,
}

const BaseTextInput = (props: IBaseInputProps) => {
  const {children, label, labelVariant, isRequired, errorMessage, ...rest} = props;

  const LeftIcon = rest.leftIcon;
  const RightIcon = rest.rightIcon;

  return (
    <div className={cx('w-full', rest.wrapperContainer)}>
      {/* Label Text Input */}
      {label && (
        <div className={cx('mb-2 flex')}>
          <Typography variant={labelVariant === 'bold' ? 'h4' : 'bodySmall'} color=''>
            {label}
          </Typography>
          {isRequired &&
            <Typography variant={labelVariant === 'bold' ? 'h4' : 'bodySmall'} color='text-danger'>
              *
            </Typography>
          }
        </div>
      )}

      {/* Render Text Input */}
      <div className={cx(
          'flex gap-1 items-center px-4 w-full h-11 border border-grayNeutral', rest.wrapperTextInput, {
            'border-1 border-red-500': !props.isValid,
            'rounded-full': props.roundedVariant === 'rounded',
            'rounded-lg': !props.roundedVariant,
            'bg-whiteNeutral': props.isDisabled && !props.backgroundColor,
            'bg-white': !props.isDisabled && !props.backgroundColor,
          },
      )}>
        {/* Left Icon */}
        {rest.leftIcon && (
          <div className={cx('flex items-center w-fit h-5')}>
            <LeftIcon />
          </div>
        )}

        {/* Content Text Input */}
        {children}

        {/* Right Icon */}
        {props.rightIcon && (
          <div
            className={cx('flex items-center w-fit h-5 cursor-pointer', rest.styleRightIcon)}
            onClick={rest?.onClickRightIcon}>
            <RightIcon />
          </div>
        )}
      </div>

      {/* Error Message Text Input */}
      {errorMessage && (
        <div className={cx('flex mt-2 items-center')}>
          <div className={cx('w-5 h-5 mr-1 flex items-center')}>
            <AlertIcon color='#921919' />
          </div>
          <Typography variant='bodyXSmall' color='text-danger'>
            {errorMessage}
          </Typography>
        </div>
      )}
    </div>
  );
};

BaseTextInput.defaultProps = {
  label: '',
  isValid: false,
  errorMessage: '',
  isRequired: false,
  isDisabled: false,
  roundedVariant: '',
  styleRightIcon: '',
  customClassName: '',
  backgroundColor: '',
  wrapperContainer: '',
  wrapperTextInput: '',
  labelVariant: 'normal',
  onClickRightIcon: () => {},
};

export default BaseTextInput;
