/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const StethoscopeIconSquare = ({color = '#3AD149'}) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0.25H5C2.38 0.25 0.25 2.38 0.25 5V15C0.25 17.62 2.38 19.75 5 19.75H15C17.62 19.75 19.75 17.62 19.75 15V5C19.75 2.38 17.62 0.25 15 0.25ZM15.75 8C15.75 9.25 14.9 10.3 13.75 10.63V11.5C13.75 13.84 11.84 15.75 9.5 15.75C7.16 15.75 5.34 13.92 5.26 11.64C4.1 11.32 3.25 10.26 3.25 9C3.25 7.48 4.48 6.25 6 6.25C7.52 6.25 8.75 7.48 8.75 9C8.75 10.25 7.91 11.3 6.76 11.63C6.83 13.09 8.02 14.25 9.5 14.25C10.98 14.25 12.25 13.02 12.25 11.5V10.63C11.1 10.3 10.25 9.25 10.25 8V6C10.25 5.59 10.59 5.25 11 5.25C11.41 5.25 11.75 5.59 11.75 6V8C11.75 8.69 12.31 9.25 13 9.25C13.69 9.25 14.25 8.69 14.25 8V6C14.25 5.59 14.59 5.25 15 5.25C15.41 5.25 15.75 5.59 15.75 6V8Z" fill={color}/>
    </svg>
  );
};

StethoscopeIconSquare.propTypes = {
  color: string,
};

export default StethoscopeIconSquare;
