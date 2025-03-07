import React from 'react';
import cx from 'classnames';
import CreatableSelect from 'react-select/creatable';
import {AlertIcon} from '@/src/assets/images/svg';
import {string} from 'prop-types';

interface Props {
  options?: {value: any; label: string}[] | {options: any; label: string}[];
  onChange?: any;
  isClearable?: boolean;
  placeholder?: string;
  className?: string;
  name?: string;
  isDisabled?: boolean;
  defaultValue?: any;
  value?: any;
  maxMenuHeight?: number;
  label?: string;
  inputRef?: any;
  required?: boolean;
  wraperStyle?: string;
  withCheckbox?: boolean;
  errorMessage?: any;
  handleInputChange?: any;
};

const CreateSelectBox: React.FC<Props> = (props) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      'backgroundColor': 'white',
      'border': '1px solid rgb(224 224 224)',
      'borderRadius': '8px',
      'fontSize': '15px',
      'fontWeight': '400',
      'letterSpacing': '0.5px',
      'color': '#B3B3B3',
      'boxShadow': 'none',
      'padding': '2px',
      '&:hover': {
        border: '1px solid rgb(224 224 224)',
      },
    }),
    placeholder: (styles) => ({
      ...styles,
      color: props.withCheckbox ? cx('text-blackNeutral') : '#B3B3B3',
      fontSize: '15px',
      fontWeight: '400',
      letterSpacing: '0.5px',
    }),
    option: (styles, {isDisabled, isFocused, isSelected}) => {
      return {
        ...styles,
        'backgroundColor': isDisabled ? null :
                          isSelected && !props.withCheckbox ? '#D2D2D2' :
                          isFocused ? '#EDEDED' : null,
        'color': '#1B1B28',
        'cursor': isDisabled ? 'not-allowed' : 'pointer',
        'fontSize': '15px',
        'fontWeight': '400',
        'letterSpacing': '0.5px',
        'boxShadow': 'none',
        '&:active': {
          backgroundColor: isDisabled ? null : isFocused ? '#D2D2D2' : null,
        },
      };
    },
    menuPortal: (base) => ({...base, zIndex: 9999}),
    dropdownIndicator: (style, state) => ({
      ...style,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    }),
  };

  return (
    <div className={cx(props.wraperStyle)}>
      {props?.label && (
        <div className={cx('mb-2')}>
          {props?.label}
          {
            props?.required && ( <span className={cx('text-danger')}>*</span>)
          }
        </div>
      )}
      <div data-testid="test-create-table-select">
        <CreatableSelect
          ref={props.inputRef}
          options={props.options}
          onChange={props.onChange}
          onInputChange={(value, action) => {
            if (action.action === 'input-change') props.handleInputChange(value);
          }}
          styles={colourStyles}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          value={props.value}
        />
      </div>
      {props?.errorMessage && (
        <div className={cx('flex mt-2 items-center')}>
          <div className={cx('w-5 h-5 mr-1 flex items-center')}>
            <AlertIcon color='#921919' />
          </div>
          <span className={cx('text-danger text-xs')}>
            {props.errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

CreateSelectBox.propTypes = {
  label: string,
};

CreateSelectBox.defaultProps = {
  options: [],
  isClearable: false,
  placeholder: 'Select...',
  maxMenuHeight: 170,
  label: '',
};

export default CreateSelectBox;
