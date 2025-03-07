interface ITextInputCommon {
  id: string;
  name: string;
  innerRef?: any;
  label?: string;
  register?: any,
  leftIcon?: any;
  rightIcon?: any;
  isValid?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  errorMessage?: string;
  min?: string | number,
  max?: string | number,
  styleRightIcon?: string;
  customClassName?: string;
  backgroundColor?: string;
  wrapperContainer?: string;
  wrapperTextInput?: string;
  roundedVariant?: 'rounded';
  onClickRightIcon?: () => {};
  onKeyDown?: (event: any) => void;
  labelVariant?: 'normal' | 'bold';
  type: 'number' | 'text' | 'password';
  value?: string | number | undefined;
  defaultValue?: string | number | undefined;
}

interface ITextInputCurrency extends ITextInputCommon {
  variant: 'currency';
  prefix?: string;
  onValueChange: (value: string) => void;
}

interface ITextInputMask extends ITextInputCommon {
  variant: 'mask';
  mask: string;
  onChange: (value: string) => void;
}

export type ITextInputMaskProps =
  | ITextInputCurrency
  | ITextInputMask
