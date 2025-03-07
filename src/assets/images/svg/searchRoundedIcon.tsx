/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const SearchRoundedIcon = ({color = '#5600E8'}) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill={color}/>
      <path d="M22 22L18 18M19.3333 14.6667C19.3333 17.244 17.244 19.3333 14.6667 19.3333C12.0893 19.3333 10 17.244 10 14.6667C10 12.0893 12.0893 10 14.6667 10C17.244 10 19.3333 12.0893 19.3333 14.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
};

SearchRoundedIcon.propTypes = {
  color: string,
};

export default SearchRoundedIcon;
