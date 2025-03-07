import React, {lazy} from 'react';
const EmailInput = lazy(() => import('./EmailInput'));
const PasswprdInput = lazy(() => import('./PasswordInput'));

interface Props {
    type: string,
    label: string,
    isValidate?: boolean,
    textAlert?: string,
    onInput?: any
}

const Input: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      {props.type == 'email' ?
      <EmailInput
        label={props.label}/> :
        <PasswprdInput
          label={props.label}
          isValidate={props.isValidate}
          textAlert={props.textAlert}
          onInput={props.onInput}/>}
    </React.Fragment>
  );
};

export default Input;
