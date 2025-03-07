import MaskInput from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';

import { BaseTextInput } from '@/src/components';
import { formatUnmaskInput } from '@/src/utils/formatInput/formatInput';

import type { ITextInputMaskProps } from '@/src/types/components/textInput';

const beforeMaskedStateChange = ({ nextState }) => {
  let { value } = nextState;
  if (value.endsWith('-')) value = value.slice(0, -1);
  return { ...nextState, value };
};

const TextInputMask = (props: ITextInputMaskProps) => {
  return <BaseTextInput {...props}>{renderTextInputMask(props)}</BaseTextInput>;
};

const renderTextInputMask = (props: ITextInputMaskProps) => {
  if (props.variant === 'currency') {
    const {
      id,
      name,
      type,
      value,
      defaultValue,
      isRequired,
      placeholder,
      ...rest
    } = props;
    return (
      <CurrencyInput
        id={id}
        name={name}
        type={type}
        value={value}
        min={rest.min}
        max={rest.max}
        ref={rest.innerRef}
        prefix={rest.prefix}
        required={isRequired}
        placeholder={placeholder}
        disabled={rest.isDisabled}
        defaultValue={defaultValue}
        onKeyDown={(event) => rest.onKeyDown && rest.onKeyDown(event)}
        onValueChange={(value) => rest.onValueChange(value || '')}
        intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
        style={{
          backgroundColor:
            rest.isDisabled && !rest.backgroundColor ? '#F5F5F5' : '',
        }}
        className='w-full focus:outline-none tracking-[0.5] text-base font-normal text-blackText placeholder:text-grayTertiary'
      />
    );
  }

  if (props.variant === 'mask') {
    const {
      id,
      name,
      type,
      value,
      defaultValue,
      isRequired,
      placeholder,
      ...rest
    } = props;
    return (
      <MaskInput
        id={id}
        name={name}
        type={type}
        value={value}
        min={rest.min}
        max={rest.max}
        mask={props.mask}
        ref={rest.innerRef}
        required={isRequired}
        maskPlaceholder={null}
        alwaysShowMask={false}
        placeholder={placeholder}
        disabled={rest.isDisabled}
        defaultValue={defaultValue}
        onChange={({ target }) =>
          rest.onChange(formatUnmaskInput(target.value))
        }
        beforeMaskedStateChange={beforeMaskedStateChange}
        style={{
          backgroundColor:
            rest.isDisabled && !rest.backgroundColor ? '#F5F5F5' : '',
        }}
        className='w-full focus:outline-none tracking-[0.5] text-base font-normal text-blackText placeholder:text-grayTertiary'
      />
    );
  }

  return <></>;
};

TextInputMask.defaultProps = {
  prefix: ' ',
  isValid: true,
  type: 'number',
  errorMessage: '',
  isRequired: false,
  isDisabled: false,
  styleRightIcon: '',
  roundedVariant: '',
  customClassName: '',
  backgroundColor: '',
  wrapperContainer: '',
  wrapperTextInput: '',
  labelVariant: 'normal',
  placeholder: '',
  onChange: () => {},
  onKeyDown: () => {},
  onValueChange: () => {},
  onClickRightIcon: () => {},
};

export default TextInputMask;
