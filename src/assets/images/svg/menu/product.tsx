/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ProductIcon = ({color}) => {
  const fill = color ? color : '#757575';
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.25 5C0.25 4.03349 1.03349 3.25 2 3.25H12C12.9665 3.25 13.75 4.03349 13.75 5V20C13.75 20.9665 12.9665 21.75 12 21.75H2C1.03349 21.75 0.25 20.9665 0.25 20V5ZM2 4.75C1.86191 4.75 1.75 4.86191 1.75 5V20C1.75 20.1381 1.86191 20.25 2 20.25H12C12.1381 20.25 12.25 20.1381 12.25 20V5C12.25 4.86191 12.1381 4.75 12 4.75H2Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0.25 8C0.25 7.58579 0.585786 7.25 1 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H1C0.585786 8.75 0.25 8.41421 0.25 8Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1 5.75C1.41421 5.75 1.75 6.08579 1.75 6.5V9.5C1.75 9.91421 1.41421 10.25 1 10.25C0.585786 10.25 0.25 9.91421 0.25 9.5V6.5C0.25 6.08579 0.585786 5.75 1 5.75Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13 5.75C13.4142 5.75 13.75 6.08579 13.75 6.5V9.5C13.75 9.91421 13.4142 10.25 13 10.25C12.5858 10.25 12.25 9.91421 12.25 9.5V6.5C12.25 6.08579 12.5858 5.75 13 5.75Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.25 1C2.25 0.585786 2.58579 0.25 3 0.25H11C11.4142 0.25 11.75 0.585786 11.75 1V4C11.75 4.41421 11.4142 4.75 11 4.75H3C2.58579 4.75 2.25 4.41421 2.25 4V1ZM3.75 1.75V3.25H10.25V1.75H3.75Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.25 14.5C4.25 14.0858 4.58579 13.75 5 13.75H9C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 14.9142 9.41421 15.25 9 15.25H5C4.58579 15.25 4.25 14.9142 4.25 14.5Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 11.75C7.41421 11.75 7.75 12.0858 7.75 12.5V16.5C7.75 16.9142 7.41421 17.25 7 17.25C6.58579 17.25 6.25 16.9142 6.25 16.5V12.5C6.25 12.0858 6.58579 11.75 7 11.75Z" fill={fill}/>
    </svg>
  );
};

ProductIcon.propTypes = {
  color: string,
};


export default ProductIcon;
