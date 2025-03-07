import { useCallback, useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import _debounce from 'lodash/debounce';

import { AlertIcon } from '@/src/assets/images/svg';

import { any, arrayOf, bool, func, shape, string } from 'prop-types';

const AsyncSelectComponent = ({
  id,
  name,
  defaultValue,
  errorMessage,
  isMulti = false,
  isDisabled = false,
  isLoading = false,
  label,
  loadOptions,
  onChange,
  options,
  placeholder,
  required,
  updateTriger,
  resetTriger,
  isSearchable = true,
  isPaginate = false,
  isValid = true,
  isSetValue = true,
  hideDropdown,
  key,
  onMenuOpen,
  height,
  minHeight,
  noOptionsMessage,
  menuIsOpen,
  customMenuList,
  customOption,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const colourStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: state.isDisabled ? '#E0E0E0' : 'white',
      border: `1px solid ${isValid ? '#C2C2C2' : 'rgb(239 68 68)'}`,
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '400',
      letterSpacing: '0.5px',
      color: '#B3B3B3',
      boxShadow: 'none',
      padding: '2px',
      height: height ? height : '',
      minHeight: minHeight ? minHeight : '',
      '&:hover': {
        border: `1px solid ${isValid ? 'rgb(213,213,213)' : 'rgb(239 68 68)'}`,
      },
    }),
    placeholder: (styles) => ({
      ...styles,
      color: '#B3B3B3',
      fontSize: '16px',
      fontWeight: '400',
      letterSpacing: '0.15px',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? ''
          : isFocused
          ? ''
          : null,
        color: '#1B1B28',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontSize: '15px',
        fontWeight: '400',
        letterSpacing: '0.5px',
        position: 'relative',
        boxShadow: 'none',
        '&:active': {
          backgroundColor: isFocused ? '#D2D2D2' : null,
        },
      };
    },
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    indicatorsContainer: (base) => ({
      ...base,
      display: hideDropdown ? 'none' : 'flex',
    }),
  };

  useEffect(() => {
    setSelectedValue(null);
  }, [resetTriger]);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleChange = (value) => {
    if (isSetValue) setSelectedValue(value);
    onChange(value);
  };

  const debounceOnChange = useCallback(_debounce(handleInputChange, 1000), []);
  const debounceFn = useCallback(_debounce(loadOptions, 500), [
    updateTriger,
    inputValue,
  ]);

  return (
    <>
      {label && (
        <div className='mb-2 text-sm'>
          {label}
          {required && <span className='text-danger'>*</span>}
        </div>
      )}
      {isPaginate ? (
        <AsyncPaginate
          id={id}
          name={name}
          key={key}
          // cacheOptions
          styles={colourStyles}
          isMulti={isMulti}
          placeholder={placeholder}
          value={selectedValue ? selectedValue : defaultValue}
          getOptionLabel={(e: any) => e.title}
          getOptionValue={(e: any) => e.value}
          loadOptions={loadOptions}
          debounceTimeout={500}
          onInputChange={debounceOnChange}
          onChange={handleChange}
          onMenuOpen={onMenuOpen}
          menuPortalTarget={document.body}
          isDisabled={isDisabled}
          components={{
            IndicatorSeparator: () => null,
            MenuList: customMenuList || components.MenuList,
            Option: customOption || components.Option,
          }}
          isSearchable={isSearchable}
          additional={{
            page: 1,
          }}
          cacheUniqs={[options]}
        />
      ) : (
        <AsyncSelect
          id={id}
          name={name}
          key={key}
          // cacheOptions
          styles={colourStyles}
          isMulti={isMulti}
          defaultOptions={options}
          placeholder={placeholder}
          options={options}
          value={selectedValue ? selectedValue : defaultValue}
          getOptionLabel={(e: any) => e.title}
          getOptionValue={(e: any) => e.value}
          loadOptions={debounceFn}
          onInputChange={debounceOnChange}
          onChange={handleChange}
          onMenuOpen={onMenuOpen}
          menuPortalTarget={document.body}
          isDisabled={isDisabled}
          components={{
            IndicatorSeparator: () => null,
            MenuList: customMenuList || components.MenuList,
            Option: customOption || components.Option,
          }}
          isLoading={isLoading}
          isSearchable={isSearchable}
          noOptionsMessage={noOptionsMessage}
          menuIsOpen={menuIsOpen}
        />
      )}
      {errorMessage && (
        <div className='flex mt-2 items-center'>
          <div className='w-5 h-5 mr-1 flex items-center'>
            <AlertIcon color='#921919' />
          </div>
          <span className='text-danger text-xs'>{errorMessage}</span>
        </div>
      )}
    </>
  );
};

AsyncSelectComponent.propTypes = {
  id: string,
  name: string,
  label: string,
  required: bool,
  placeholder: string,
  options: arrayOf(
    shape({
      value: any,
      title: string,
    })
  ),
  onChange: func,
  loadOptions: func,
  errorMessage: string,
  updateTriger: any,
  resetTriger: any,
  defaultValue: any,
  isDisabled: bool,
  isLoading: bool,
  isMulti: bool,
  isSearchable: bool,
  isPaginate: bool,
  isValid: bool,
  isSetValue: bool,
  hideDropdown: bool,
  key: string,
  onMenuOpen: func,
  height: string,
  minHeight: string,
  noOptionsMessage: func,
  menuIsOpen: bool,
  customMenuList: any,
  customOption: any,
};

AsyncSelectComponent.defaultProps = {
  id: 'async-select',
};

export default AsyncSelectComponent;
