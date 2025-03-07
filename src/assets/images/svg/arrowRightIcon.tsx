/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ArrowRightIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.6668 7.83334L10.9751 7.83334L6.90843 11.9C6.58343 12.225 6.58343 12.7583 6.90843 13.0833C7.23343 13.4083 7.75843 13.4083 8.08343 13.0833L13.5751 7.59167C13.9001 7.26667 13.9001 6.74167 13.5751 6.41667L8.08343 0.925C7.75843 0.6 7.23343 0.6 6.90843 0.925C6.58343 1.25 6.58343 1.775 6.90843 2.1L10.9751 6.16667L1.6668 6.16667C1.2084 6.16667 0.8334 6.54167 0.8334 7C0.8334 7.45834 1.2084 7.83334 1.6668 7.83334Z"
        fill={color}/>
    </svg>
  );
};

ArrowRightIcon.propTypes = {
  color: string,
};

export default ArrowRightIcon;

/*
  Color arrow right icon in this project
  1. #0A0A0A -> black (default)
  2. #921919 -> red
  3. #FFF -> white
*/
