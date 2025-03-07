import Select, { components } from 'react-select';
import cx from 'classnames';

import { AlertIcon } from '@/src/assets/images/svg';
import { Typography } from '@/src/components';
import { formatRupiah } from '@/utils/fromatCurrency';

interface SelectBoxProps {
  id?: string;
  className?: string;
  classNamePrefix?: string;
  defaultValue?: any;
  errorMessage?: any;
  formatGroupLabel?: any;
  inputRef?: any;
  isClearable?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  isOptionDisabled?: any;
  isOptionSelected?: any;
  isRtl?: boolean;
  isSearchable?: boolean;
  label?: string;
  tralingLabel?: string;
  maxMenuHeight?: number;
  name?: string;
  onChange?: any;
  options?: { value: any; label: string }[] | { options: any; label: string }[];
  placeholder?: string;
  required?: boolean;
  value?: any;
  withCheckbox?: boolean;
  wraperStyle?: string;
  backgroundColor?: string;
  borderRadius?: any;
  labelElement?: React.ReactNode;
}

const SelectBox: React.FC<SelectBoxProps> = (props) => {
  const Option = (prop: any) => {
    return (
      <div>
        <components.Option {...prop}>
          <div className='flex gap-4 items-center'>
            {props.withCheckbox && (
              <input
                type='checkbox'
                className={cx(
                  'h-5 w-5 rounded border-gray-300 text-indigo-600',
                  {
                    'cursor-pointer': !props.isDisabled,
                  }
                )}
                checked={prop?.isSelected}
                onChange={() => {}}
              />
            )}
            <div className='w-full flex'>
              <div>{prop?.label}</div>
              {props.tralingLabel && (
                <div className='mr-0 ml-auto'>
                  {formatRupiah(prop?.value[props.tralingLabel], 'Rp')}
                </div>
              )}
            </div>
          </div>
        </components.Option>
      </div>
    );
  };

  const ValueContainer = (prop: any) => {
    const { children } = prop;

    return (
      <components.ValueContainer
        className={cx('text-left', { 'cursor-pointer': !props.isDisabled })}
        {...prop}
      >
        <div className='flex items-center'>
          {children}
          {props.labelElement ? props.labelElement : ''}
        </div>
      </components.ValueContainer>
    );
  };

  const colourStyles = {
    control: (styles, { isDisabled }) => ({
      ...styles,
      pointerEvents: 'auto',
      cursor: isDisabled ? '' : 'pointer',
      backgroundColor: isDisabled ? '#E0E0E0' : `${props.backgroundColor}`,
      border: '1px solid #C2C2C2',
      borderRadius: props.borderRadius ? props.borderRadius : '8px',
      fontSize: '16px',
      fontWeight: '400',
      letterSpacing: '0.15px',
      color: '#B3B3B3',
      boxShadow: 'none',
      shadow: 'none',
      padding: '3px',
      height: '100%',
      '&:hover': {
        border: !isDisabled && '1px solid rgb(224 224 224)',
      },
    }),
    placeholder: (styles, { isDisabled }) => ({
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      color: props.withCheckbox ? 'text-blackNeutral' : '#B3B3B3',
      fontSize: '16px',
      fontWeight: '400',
      letterSpacing: '0.15px',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected && !props.withCheckbox
          ? '#D2D2D2'
          : isFocused
          ? '#EDEDED'
          : null,
        color: '#1B1B28',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        fontWeight: '400',
        letterSpacing: '0.15px',
        boxShadow: 'none',
        '&:active': {
          backgroundColor: isDisabled ? null : isFocused ? '#D2D2D2' : null,
        },
      };
    },
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    dropdownIndicator: (style: any, state: any) => ({
      ...style,
      color: '#0A0A0A',
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#7859EE',
      borderRadius: '4px',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: 'white',
      padding: '6px',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      display: 'none',
    }),
  };

  return (
    <div className={cx(props.wraperStyle)}>
      {props?.label && (
        <div className='mb-2 flex'>
          <Typography variant='bodySmall' color=''>
            {props?.label}
          </Typography>
          {props?.required && (
            <Typography variant='bodySmall' color='text-danger'>
              *
            </Typography>
          )}
        </div>
      )}
      <Select
        id={props.id}
        components={{
          Option,
          ValueContainer,
          IndicatorSeparator: () => null,
        }}
        menuPortalTarget={document.body}
        ref={props.inputRef}
        name={props.name}
        placeholder={props.placeholder}
        className={props.className}
        classNamePrefix={props.classNamePrefix}
        options={props.options}
        value={props.value}
        defaultValue={props.defaultValue}
        formatGroupLabel={props.formatGroupLabel}
        maxMenuHeight={props.maxMenuHeight}
        onChange={props.onChange}
        hideSelectedOptions={false}
        isClearable={props.isClearable}
        isDisabled={props.isDisabled}
        isMulti={props.isMulti}
        isOptionDisabled={props.isOptionDisabled}
        isRtl={props.isRtl}
        isSearchable={props.isSearchable}
        closeMenuOnSelect={!props.isMulti}
        styles={colourStyles}
      />
      {props?.errorMessage && (
        <div className='flex mt-2 items-center'>
          <div className='w-5 h-5 mr-1 flex items-center'>
            <AlertIcon color='#921919' />
          </div>
          <span className='text-danger text-xs'>{props.errorMessage}</span>
        </div>
      )}
    </div>
  );
};

SelectBox.defaultProps = {
  isClearable: false,
  isMulti: false,
  label: '',
  maxMenuHeight: 170,
  options: [],
  placeholder: 'Select...',
  withCheckbox: false,
  backgroundColor: 'white',
  borderRadius: '',
};

export default SelectBox;
