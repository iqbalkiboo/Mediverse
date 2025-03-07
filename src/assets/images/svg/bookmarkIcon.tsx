/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const BookmarkIcon = ({color = '#757575'}) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.33398 3.83333C3.33398 3.09695 3.93094 2.5 4.66732 2.5H11.334C12.0704 2.5 12.6673 3.09695 12.6673 3.83333V14.5L8.00065 12.1667L3.33398 14.5V3.83333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

BookmarkIcon.propTypes = {
  color: string,
};

export default BookmarkIcon;
